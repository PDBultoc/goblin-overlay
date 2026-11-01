// Alerts: follow / sub / bits / donation. Queued, one at a time (~5 s), never overlapping.
// Position: .al = left 460, top 180, 1000x150 (y 180..330; clear of y>=868).
export const SHOW_MS = 8000;
// How long one alert stays: the panel's "Seconds" (2–30), else 8 s (Paul: 5 s was too short).
export const showMs = (cfg) => {
  const s = Number(cfg && cfg.seconds);
  return Number.isFinite(s) && s > 0 ? Math.min(30, Math.max(2, s)) * 1000 : SHOW_MS;
};
export const OUT_MS = 450;

const ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ENT[c]);

// run(item, done) starts an item; done() must be called once it is finished.
export function alertQueue(run) {
  const items = [];
  let busy = false;
  function next() {
    const it = items.shift();
    if (!it) { busy = false; return; }
    busy = true;
    let called = false;
    run(it, () => { if (called) return; called = true; next(); });
  }
  return {
    push(it) { items.push(it); if (!busy) next(); },
    busy: () => busy,
    size: () => items.length,
    clear() { items.length = 0; },
  };
}

// Returns display data (all user text already escaped) or null when the type is off/unknown.
export function describeAlert(type, p, cfg) {
  p = p || {}; cfg = cfg || {};
  if (!['follow', 'sub', 'bits', 'donation'].includes(type) || cfg[type] !== true) return null;
  const name = esc(p.name || 'Anonymous');
  if (type === 'follow') {
    return { cls: '', badge: '<div class="big">+1</div><div class="sm">FOLLOW</div>', kick: 'NEW FOLLOWER', title: name, msg: '' };
  }
  if (type === 'sub') {
    const m = Number(p.months) || 1;
    return { cls: '', badge: '<div class="big">' + esc(m) + '</div><div class="sm">' + (m === 1 ? 'MONTH' : 'MONTHS') + '</div>',
      kick: m > 1 ? 'RESUBSCRIBED' : 'NEW SUBSCRIBER', title: name, msg: '' };
  }
  const a = Number(p.amount) || 0;
  if (type === 'bits') {
    return { cls: a >= 500 ? 'bigd' : '', badge: '<div class="big">' + esc(a) + '</div><div class="sm">BITS</div>',
      kick: 'CHEERED', title: name, msg: '' };
  }
  const cur = esc(p.currency || '');
  return { cls: a >= 20 ? 'bigd' : '', badge: '<div class="big">' + esc(a) + '</div><div class="sm">' + (cur || 'DONATED') + '</div>',
    kick: 'DONATED', title: name, msg: esc(p.message || '') };
}

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  const cfg = (ctx && ctx.cfg) || {};
  const bus = ctx && ctx.bus;
  const timers = new Set();
  let live = null;
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };

  const q = alertQueue((a, done) => {
    const el = document.createElement('div');
    el.className = 'al ' + a.cls;
    el.innerHTML = '<div class="in"><div class="pn slime pnl"><div class="bd">' + a.badge + '</div>'
      + '<div class="bx"><div class="kick">' + a.kick + '</div><div class="ttl">' + a.title + '</div>'
      + (a.msg ? '<div class="msg2">' + a.msg + '</div>' : '') + '</div><div class="sl"></div></div></div>';
    root.appendChild(el);
    live = el;
    const show = showMs(cfg);
    later(() => el.classList.add('out'), show - OUT_MS);
    later(() => { el.remove(); if (live === el) live = null; done(); }, show);
  });

  const offs = [];
  if (bus && bus.on) {
    for (const type of ['follow', 'sub', 'bits', 'donation']) {
      offs.push(bus.on(type, (p) => {
        const d = describeAlert(type, p, cfg);
        if (d) q.push(d);
      }));
    }
  }
  return {
    unmount() {
      offs.forEach((o) => { try { o && o(); } catch (e) { /* ignore */ } });
      timers.forEach(clearTimeout);
      timers.clear();
      q.clear();
      if (live) live.remove();
    },
  };
}
