// Monk Mode: Wololo sweep, saffron tint on .gx, hooded mascot, mm:ss countdown.
// Never started from donations; only cfg.startedAt (resume) or bus monk-start.
export function monkRemaining(startedAt, minutes, nowMs) {
  if (typeof startedAt !== 'number' || !isFinite(startedAt)) return 0;
  const end = startedAt + (Number(minutes) || 0) * 60000;
  return Math.max(0, end - nowMs);
}

export function fmtClock(ms) {
  const s = Math.ceil(Math.max(0, ms) / 1000);
  const p = (n) => String(n).padStart(2, '0');
  return p(Math.floor(s / 60)) + ':' + p(s % 60);
}

const CSS = `
.gx .monkb{left:440px;top:790px}
.gx .monk-hood{width:46px;height:50px;flex:none;filter:drop-shadow(0 0 8px var(--a35))}
`;

const HOOD = '<svg class="monk-hood" viewBox="14 0 92 100" aria-hidden="true">'
  + '<path d="M60 6C30 6 22 40 24 70L36 96H84L96 70C98 40 90 6 60 6Z M60 30C44 30 38 44 38 60C38 78 48 90 60 90C72 90 82 78 82 60C82 44 76 30 60 30Z" fill="#6b4626" stroke="var(--acid)" stroke-width="3" fill-rule="evenodd"/>'
  + '<ellipse cx="50" cy="60" rx="4" ry="3" fill="var(--acid)"/><ellipse cx="70" cy="60" rx="4" ry="3" fill="var(--acid)"/></svg>';

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  const cfg = (ctx && ctx.cfg) || {};
  const bus = ctx && ctx.bus;
  if (!document.querySelector('style[data-mod=monk]')) {
    const st = document.createElement('style');
    st.dataset.mod = 'monk'; st.textContent = CSS; document.head.appendChild(st);
  }
  const stage = (root.closest && root.closest('.gx')) || document.querySelector('.gx');

  const badge = document.createElement('div');
  badge.className = 'pn monkb';
  badge.innerHTML = HOOD + '<div><div class="k">MONK MODE</div><div class="clk">00:00</div></div><div class="mbar"><i style="width:100%"></i></div><div class="ring"></div>';
  root.appendChild(badge);
  const clk = badge.querySelector('.clk');
  const bar = badge.querySelector('.mbar i');

  let startedAt = null, minutes = Number(cfg.minutes) || 60, timer = null;

  function sweep(on) {
    const w = document.createElement('div');
    w.className = 'wl' + (on ? '' : ' back');
    w.innerHTML = '<div class="band"></div><div class="word">WOLOLO</div><div class="sub">'
      + (on ? 'MONK MODE' : 'MONK MODE OVER') + '</div>';
    root.appendChild(w);
    setTimeout(() => w.remove(), 2300);
  }
  function tick() {
    const rem = monkRemaining(startedAt, minutes, Date.now());
    clk.textContent = fmtClock(rem);
    bar.style.width = (minutes > 0 ? (rem / (minutes * 60000)) * 100 : 0) + '%';
    if (rem <= 0) end(true);
  }
  function begin(animate) {
    if (timer) clearInterval(timer);
    if (stage) stage.classList.add('monk');
    badge.classList.add('on');
    if (animate) sweep(true);
    timer = setInterval(tick, 1000);
    tick();
  }
  function end(animate) {
    const was = startedAt !== null;
    startedAt = null;
    if (timer) { clearInterval(timer); timer = null; }
    if (stage) stage.classList.remove('monk');
    badge.classList.remove('on');
    if (was && animate) sweep(false);
  }

  // resume after reload
  if (monkRemaining(cfg.startedAt, minutes, Date.now()) > 0) {
    startedAt = cfg.startedAt; begin(false);
  }

  const offs = [];
  if (bus && bus.on) {
    offs.push(bus.on('monk-start', (p) => {
      p = p || {};
      startedAt = typeof p.startedAt === 'number' ? p.startedAt : Date.now();
      minutes = Number(p.minutes) || Number(cfg.minutes) || 60;
      if (monkRemaining(startedAt, minutes, Date.now()) <= 0) { startedAt = null; return; }
      begin(true);
    }));
    offs.push(bus.on('monk-stop', () => end(true)));
  }

  return {
    unmount() {
      offs.forEach((o) => { try { o && o(); } catch (e) { /* ignore */ } });
      if (timer) clearInterval(timer);
      if (stage) stage.classList.remove('monk');
      badge.remove();
      root.querySelectorAll('.wl').forEach((n) => n.remove());
    },
  };
}
