// music: Spotify now-playing + "Windows Media Player" waves (prototype music-2-wmp.html,
// Paul's pick 2026-11-03): the whole strip is a screen with three overlapping neon waves
// and feedback trails; round cover, title and artist bottom-left.
// Data comes from the local GoblinMusic app (SSE on 127.0.0.1:47800): `np` events carry the
// song, `lv` events carry 40 frames/s of Spotify's own audio — loudness `l` and a triggered,
// low-passed oscilloscope trace `w` (96 points, -1..1). The waves stand still and move only
// with the music (Paul, 2026-11-03: synthetic scrolling sines read as a repeating pattern);
// the main line is the newest trace, the two fainter ones are the previous traces (echo).
// Shares the bottom strip with the challenges board: hidden while that holds it (bus `strip`).
const CSS = `
[data-mod=music] .mu{position:absolute;left:905px;top:928px;width:560px;height:120px;box-sizing:border-box;overflow:hidden;padding:0;
  transition:opacity .5s,transform .5s}
[data-mod=music] .mu.off{opacity:0;transform:translateY(14px)}
[data-mod=music] .mu canvas{position:absolute;inset:0;width:100%;height:100%}
[data-mod=music] .ov{position:absolute;left:14px;right:14px;bottom:8px;display:flex;align-items:flex-end;gap:10px;min-width:0}
[data-mod=music] .ov img{width:34px;height:34px;border-radius:50%;object-fit:cover;flex:none;box-shadow:0 0 0 1px rgba(168,255,31,.5)}
[data-mod=music] .ov>div{min-width:0}
[data-mod=music] .t{font:700 15px/1.15 Inter,sans-serif;color:#fff;text-shadow:0 1px 4px #000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-mod=music] .a{font:800 11px Oxanium,sans-serif;letter-spacing:.16em;color:var(--acid);text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`;

const FRAME_MS = 25; // the app sends 40 frames per second
const RETRY_MS = 3000;
export const POINTS = 96;

export const visible = ({ connected, status, busy }) => Boolean(connected && status === 'playing' && !busy);

const clamp = (x, lo, hi) => { const v = Number(x); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : 0; };

// Queue a batch of frames; the last one is "now", earlier ones FRAME_MS apart.
// A trace that is missing or the wrong length becomes a flat line.
export function stampFrames(queue, levels, waves, now) {
  if (!Array.isArray(levels)) return queue;
  const n = levels.length;
  levels.forEach((v, i) => {
    const w = Array.isArray(waves) && Array.isArray(waves[i]) && waves[i].length === POINTS ? waves[i] : [];
    queue.push({ t: now - (n - 1 - i) * FRAME_MS, v: clamp(v, 0, 1), w: Array.from({ length: POINTS }, (_, k) => clamp(w[k], -1, 1)) });
  });
  return queue;
}

// Take the frames whose time + delay has come (removes them from the queue).
export function dueFrames(queue, now, delayMs = 0) {
  const out = [];
  while (queue.length && queue[0].t + delayMs <= now) out.push(queue.shift());
  return out;
}

// Ease the drawn trace toward the newest one (k = share of the gap closed per frame), so
// 40 traces/s look like one line moving with the music instead of flicker.
export function easeTrace(cur, target, k = 0.5) {
  for (let i = 0; i < cur.length; i++) cur[i] += ((target[i] || 0) - cur[i]) * k;
  return cur;
}

// Trace -> y per point. Loudness scales it a little (0.55..1) so a quiet verse is calmer than
// the chorus, while the app's own normalisation keeps it from going flat.
export const traceY = (w, level, mid, half) => w.map((v) => mid + v * half * (0.55 + 0.45 * level));

function injectCss(name, css) {
  if (document.head.querySelector(`style[data-mod="${name}"]`)) return;
  const s = document.createElement('style');
  s.dataset.mod = name; s.textContent = css;
  document.head.appendChild(s);
}

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  injectCss('music', CSS);
  const cfg = ctx.cfg || {};
  const base = String(cfg.url || 'http://127.0.0.1:47800').replace(/\/+$/, '');
  const delayMs = Math.max(0, Number(cfg.delayMs) || 0);

  const box = document.createElement('div');
  box.className = 'pn slime mu off';
  box.innerHTML = '<canvas width="560" height="120"></canvas>'
    + '<div class="ov"><img alt="" style="visibility:hidden"><div><div class="t"></div><div class="a"></div></div></div>';
  const wrap = document.createElement('div');
  wrap.className = 'gx';
  wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  wrap.appendChild(box);
  root.appendChild(wrap);
  const $ = (s) => box.querySelector(s);
  const img = $('img'), tt = $('.t'), ar = $('.a'), cv = $('canvas');
  const g = cv.getContext('2d'), W = cv.width, H = cv.height;
  // [colour, line width, how many traces back]: newest bright line + two echoes 75 / 150 ms old.
  const LAYERS = [['#e8ff6a', 1.5, 6], ['#5dff9e', 1.8, 3], ['#a8ff1f', 2.4, 0]];

  let connected = false, busy = false, np = null, artKey = '', es = null, retry = 0, raf = 0, dead = false;
  const queue = [];
  let lv = 0;
  const trace = new Array(POINTS).fill(0), past = [];

  const shown = () => visible({ connected, status: np && np.status, busy });
  function apply() { box.classList.toggle('off', !shown()); }

  function onNp(p) {
    np = p;
    tt.textContent = p.title || '';
    ar.textContent = p.artist || '';
    const key = p.art || '';
    if (key !== artKey) { artKey = key; img.src = key ? base + key : ''; img.style.visibility = key ? 'visible' : 'hidden'; }
    apply();
  }

  function connect() {
    if (dead || typeof EventSource !== 'function') return;
    es = new EventSource(base + '/stream');
    es.onopen = () => { connected = true; apply(); };
    es.addEventListener('np', (ev) => { try { onNp(JSON.parse(ev.data)); } catch { /* bad frame */ } });
    es.addEventListener('lv', (ev) => {
      try { const d = JSON.parse(ev.data); stampFrames(queue, d.l, d.w, performance.now()); } catch { /* bad frame */ }
      if (queue.length > 400) queue.splice(0, queue.length - 400);
    });
    es.onerror = () => {
      // App not running / closed: hide, drop the stream and try again later.
      connected = false; apply();
      es.close(); es = null;
      clearTimeout(retry); retry = setTimeout(connect, RETRY_MS);
    };
  }

  function draw() {
    if (dead) return;
    raf = requestAnimationFrame(draw);
    const due = dueFrames(queue, performance.now(), delayMs);
    for (const f of due) {
      lv += (f.v - lv) * 0.3;
      easeTrace(trace, f.w);
      past.push(trace.slice()); if (past.length > 8) past.shift();
    }
    if (!due.length) { lv *= 0.97; easeTrace(trace, [], 0.08); } // stream gap: settle to flat
    if (!shown()) return;
    // Short glow trails, no motion of their own: the picture moves only with the audio.
    g.fillStyle = 'rgba(0,8,2,.42)'; g.fillRect(0, 0, W, H);
    for (const [col, width, back] of LAYERS) {
      const w = back === 0 ? trace : past[past.length - 1 - back];
      if (!w) continue;
      const ys = traceY(w, lv, H * 0.45, H * 0.4);
      g.beginPath();
      g.moveTo(0, ys[0]);
      for (let i = 1; i < POINTS - 1; i++) {
        const x = i / (POINTS - 1) * W, xn = (i + 1) / (POINTS - 1) * W;
        g.quadraticCurveTo(x, ys[i], (x + xn) / 2, (ys[i] + ys[i + 1]) / 2); // smooth through the points
      }
      g.lineTo(W, ys[POINTS - 1]);
      g.strokeStyle = col; g.lineWidth = width; g.shadowColor = col; g.shadowBlur = 10; g.stroke();
    }
    g.shadowBlur = 0;
  }

  const off = ctx.bus ? ctx.bus.on('strip', (p) => {
    if (!p || p.owner === 'music') return;
    busy = Boolean(p.busy); apply();
  }) : null;
  if (ctx.bus) ctx.bus.emit('strip-request', {});

  connect();
  raf = requestAnimationFrame(draw);

  return {
    unmount() {
      dead = true;
      cancelAnimationFrame(raf); clearTimeout(retry);
      if (es) es.close();
      if (typeof off === 'function') off();
      wrap.remove();
    },
  };
}
