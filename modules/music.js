// music: Spotify now-playing + scrolling waveform (prototype music-1-waveform.html).
// Data comes from the local GoblinMusic app (SSE on 127.0.0.1:47800): `np` events
// carry the song, `lv` events carry loudness levels (40/s) of Spotify's own audio.
// Shares the bottom strip with the challenges board: hidden while that holds it (bus `strip`).
const CSS = `
[data-mod=music] .mu{position:absolute;left:905px;top:928px;width:560px;height:120px;box-sizing:border-box;
  display:grid;grid-template-columns:76px 1fr;gap:12px;padding:10px 14px;transition:opacity .5s,transform .5s}
[data-mod=music] .mu.off{opacity:0;transform:translateY(14px)}
[data-mod=music] .mu img{width:76px;height:76px;border-radius:4px;margin-top:2px;object-fit:cover;background:#111}
[data-mod=music] .rt{display:grid;grid-template-rows:auto 1fr auto;min-width:0}
[data-mod=music] .t{font:700 16px/1.2 Inter,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-mod=music] .t em{font-style:normal;color:var(--acid);font:800 12px Oxanium,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-left:8px}
[data-mod=music] canvas{width:100%;height:100%;display:block}
[data-mod=music] .tm{display:flex;justify-content:space-between;font:700 12px Oxanium,sans-serif;color:var(--mute)}
`;

const LEVEL_MS = 25; // the app sends 40 levels per second
const RETRY_MS = 3000;

export const visible = ({ connected, status, busy }) => Boolean(connected && status === 'playing' && !busy);

// Song position (s) now, from the last `np` snapshot (pos at epoch ms `at`).
export function posAt(np, now = Date.now()) {
  if (!np) return 0;
  const pos = Number(np.pos) || 0, dur = Number(np.dur) || 0;
  const p = np.status === 'playing' ? pos + (now - (Number(np.at) || now)) / 1000 : pos;
  return dur > 0 ? Math.min(dur, Math.max(0, p)) : Math.max(0, p);
}

// Queue a batch of levels; the last one is "now", earlier ones LEVEL_MS apart.
export function stampLevels(queue, levels, now) {
  if (!Array.isArray(levels)) return queue;
  const n = levels.length;
  levels.forEach((v, i) => {
    const x = Number(v);
    queue.push({ t: now - (n - 1 - i) * LEVEL_MS, v: Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0 });
  });
  return queue;
}

// Take the levels whose time + delay has come (removes them from the queue).
export function dueLevels(queue, now, delayMs = 0) {
  const out = [];
  while (queue.length && queue[0].t + delayMs <= now) out.push(queue.shift().v);
  return out;
}

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

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
  box.innerHTML = '<img alt="" style="visibility:hidden"><div class="rt"><div class="t"><span class="tt"></span><em class="ar"></em></div>'
    + '<canvas width="440" height="56"></canvas><div class="tm"><span class="t1"></span><span class="t2"></span></div></div>';
  const wrap = document.createElement('div');
  wrap.className = 'gx';
  wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  wrap.appendChild(box);
  root.appendChild(wrap);
  const $ = (s) => box.querySelector(s);
  const img = $('img'), tt = $('.tt'), ar = $('.ar'), t1 = $('.t1'), t2 = $('.t2'), cv = $('canvas');
  const g = cv.getContext('2d'), W = cv.width, H = cv.height, STEP = 3, MAX = Math.floor(W / STEP);

  let connected = false, busy = false, np = null, artKey = '', es = null, retry = 0, raf = 0, dead = false;
  const queue = [], hist = [];

  function apply() { box.classList.toggle('off', !visible({ connected, status: np && np.status, busy })); }

  function onNp(p) {
    np = p;
    tt.textContent = p.title || '';
    ar.textContent = p.artist || '';
    const key = p.art || '';
    if (key !== artKey) { artKey = key; img.src = key ? base + key : ''; img.style.visibility = key ? 'visible' : 'hidden'; }
    t2.textContent = p.dur ? fmt(p.dur) : '';
    apply();
  }

  function connect() {
    if (dead || typeof EventSource !== 'function') return;
    es = new EventSource(base + '/stream');
    es.onopen = () => { connected = true; apply(); };
    es.addEventListener('np', (ev) => { try { onNp(JSON.parse(ev.data)); } catch { /* bad frame */ } });
    es.addEventListener('lv', (ev) => {
      try { stampLevels(queue, JSON.parse(ev.data).l, performance.now()); } catch { /* bad frame */ }
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
    for (const v of dueLevels(queue, performance.now(), delayMs)) { hist.push(v); if (hist.length > MAX) hist.shift(); }
    g.clearRect(0, 0, W, H);
    const mid = H / 2;
    hist.forEach((v, i) => {
      const x = W - (hist.length - i) * STEP, h = Math.max(2, v * (H - 4));
      g.fillStyle = i > hist.length - 6 ? '#eaffc8' : `rgba(168,255,31,${0.35 + 0.65 * (i / hist.length)})`;
      g.fillRect(x, mid - h / 2, STEP - 1, h);
    });
    g.fillStyle = 'rgba(168,255,31,.25)'; g.fillRect(0, mid, W, 1);
    if (np) t1.textContent = fmt(posAt(np));
    raf = requestAnimationFrame(draw);
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
