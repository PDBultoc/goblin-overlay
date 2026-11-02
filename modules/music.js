// music: Spotify now-playing + "Windows Media Player" waves (prototype music-2-wmp.html,
// Paul's pick 2026-11-03): the whole strip is a screen with three overlapping neon waves
// and feedback trails; round cover, title and artist bottom-left.
// Data comes from the local GoblinMusic app (SSE on 127.0.0.1:47800): `np` events carry the
// song, `lv` events carry 40 frames/s of Spotify's own audio — loudness `l` and an 8-band
// spectrum shape `b`. Bass swells the long waves, treble ripples the short ones.
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
export const NBANDS = 8;

export const visible = ({ connected, status, busy }) => Boolean(connected && status === 'playing' && !busy);

const clamp01 = (x) => { const v = Number(x); return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0; };

// Queue a batch of frames; the last one is "now", earlier ones FRAME_MS apart.
export function stampFrames(queue, levels, bands, now) {
  if (!Array.isArray(levels)) return queue;
  const n = levels.length;
  levels.forEach((v, i) => {
    const b = Array.isArray(bands) && Array.isArray(bands[i]) ? bands[i] : [];
    queue.push({ t: now - (n - 1 - i) * FRAME_MS, v: clamp01(v), b: Array.from({ length: NBANDS }, (_, k) => clamp01(b[k])) });
  });
  return queue;
}

// Take the frames whose time + delay has come (removes them from the queue).
export function dueFrames(queue, now, delayMs = 0) {
  const out = [];
  while (queue.length && queue[0].t + delayMs <= now) out.push(queue.shift());
  return out;
}

// Fast attack, slow release, so the waves jump with a beat and settle smoothly.
export const follow = (cur, target, attack = 0.55, release = 0.12) => cur + (target - cur) * (target > cur ? attack : release);

// One wave: a sum of sines, band k = (1.6 + 0.6k) cycles across the strip, weighted by the
// band's share of the spectrum, scaled by loudness. Values stay in [-1, 1].
// Normalised by the bands' energy (sqrt of the sum of squares), not their sum: sines of
// different lengths partly cancel, and a sum-normalised wave looked flat on real music.
export function waveShape(bands, level, phases, n, offset = 0) {
  let wsum = 0;
  for (let k = 0; k < NBANDS; k++) wsum += (bands[k] || 0) ** 2;
  wsum = Math.sqrt(wsum) * 1.1;
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    const x = n > 1 ? i / (n - 1) : 0;
    let y = 0;
    for (let k = 0; k < NBANDS; k++) {
      const a = bands[k] || 0;
      if (a) y += a * Math.sin(2 * Math.PI * (1.6 + 0.6 * k) * x + (phases[k] || 0) + offset * (1 + k * 0.15));
    }
    out[i] = wsum > 0 ? Math.max(-1, Math.min(1, (y / wsum) * level)) : 0;
  }
  return out;
}

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
  const g = cv.getContext('2d'), W = cv.width, H = cv.height, PTS = 140;
  const LAYERS = [['#a8ff1f', 1, 0], ['#5dff9e', 0.7, 1.7], ['#e8ff6a', 0.5, 3.1]];

  let connected = false, busy = false, np = null, artKey = '', es = null, retry = 0, raf = 0, dead = false;
  const queue = [];
  let lv = 0;
  const bands = new Array(NBANDS).fill(0), phases = new Array(NBANDS).fill(0);

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
      try { const d = JSON.parse(ev.data); stampFrames(queue, d.l, d.b, performance.now()); } catch { /* bad frame */ }
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
      lv = follow(lv, f.v);
      for (let k = 0; k < NBANDS; k++) bands[k] = follow(bands[k], f.b[k], 0.4, 0.1);
    }
    if (!due.length) lv *= 0.97; // stream gap: let the waves settle
    if (!shown()) return;
    for (let k = 0; k < NBANDS; k++) phases[k] += (0.02 + 0.012 * k) * (0.5 + lv);
    // WMP "Ambience" feel: the previous frame zooms out and fades into trails.
    g.globalAlpha = 0.88;
    g.drawImage(cv, -6, -3, W + 12, H + 6);
    g.globalAlpha = 1;
    g.fillStyle = 'rgba(0,8,2,.18)'; g.fillRect(0, 0, W, H);
    for (const [col, amp, off] of LAYERS) {
      const w = waveShape(bands, lv, phases, PTS, off);
      g.beginPath();
      w.forEach((v, i) => {
        const x = i / (PTS - 1) * W, y = H * 0.45 + v * amp * H * 0.42;
        i ? g.lineTo(x, y) : g.moveTo(x, y);
      });
      g.strokeStyle = col; g.lineWidth = 2; g.shadowColor = col; g.shadowBlur = 10; g.stroke();
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
