// goal: title, current/target bar, surge when current increases; adds Streamlabs donations.
import { createSettings } from '../core/settings.js';

const SEEN_MAX = 50;
let lastShown; // survives re-mounts so a settings change still animates the increase

// Pure: state {current, seen[]} + donation payload -> {current, seen, added}.
export function applyDonation(state, p) {
  const seen = Array.isArray(state && state.seen) ? state.seen.slice() : [];
  const current = Number(state && state.current) || 0;
  const amount = Number(p && p.amount);
  if (!Number.isFinite(amount) || amount <= 0) return { current, seen, added: false };
  const id = p && p.id != null ? String(p.id) : null;
  if (id !== null && seen.includes(id)) return { current, seen, added: false };
  if (id !== null) { seen.push(id); while (seen.length > SEEN_MAX) seen.shift(); }
  return { current: Math.round((current + amount) * 100) / 100, seen, added: true };
}

const money = (n) => '$' + (Math.round(n * 100) / 100).toLocaleString('en-US', { maximumFractionDigits: 2 });

function lipSvg(w, drips) {
  const d = drips.map(([x, L]) => `M${x - 4} 0Q${x - 2.4} .5 ${x - 2.4} ${L - 2.4}A2.4 2.4 0 0 0 ${x + 2.4} ${L - 2.4}Q${x + 2.4} .5 ${x + 4} 0Z`).join('');
  return `<svg class="lip" width="${w}" height="14" viewBox="0 0 ${w} 14" aria-hidden="true"><path d="${d}"/></svg>`;
}

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  const cfg = ctx.cfg || {};
  const target = Number(cfg.target) > 0 ? Number(cfg.target) : 100;
  const to = Number(cfg.current) || 0;

  const wrap = document.createElement('div');
  wrap.className = 'gx';
  wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  const goal = document.createElement('div');
  goal.className = 'pn slime goal';
  const row = document.createElement('div'); row.className = 'row';
  const ttl = document.createElement('div'); ttl.className = 'ttl';
  const em = document.createElement('em'); em.textContent = '♥';
  ttl.append(em, document.createTextNode(String(cfg.title == null ? '' : cfg.title)));
  const amt = document.createElement('div'); amt.className = 'amt';
  const b = document.createElement('b');
  amt.append(b, document.createTextNode(' / ' + money(target)));
  row.append(ttl, amt);
  const bar = document.createElement('div'); bar.className = 'bar';
  const fill = document.createElement('div'); fill.className = 'fill';
  bar.appendChild(fill);
  const lipHost = document.createElement('div');
  lipHost.innerHTML = lipSvg(400, [[60, 7], [74, 4], [190, 10], [330, 6]]); // static markup
  goal.append(row, bar, lipHost.firstElementChild);
  wrap.appendChild(goal);
  root.appendChild(wrap);

  const pct = (v) => Math.max(0, Math.min(100, v / target * 100)) + '%';
  const from = typeof lastShown === 'number' ? lastShown : to;
  b.textContent = money(from);
  fill.style.width = pct(from);

  let raf = 0, timer = 0, dead = false;
  function drop(x, delay, big) {
    const d = document.createElement('i');
    d.className = 'drop' + (big ? ' big' : '');
    d.style.left = x + 'px'; d.style.animationDelay = delay + 'ms';
    goal.appendChild(d); setTimeout(() => d.remove(), 1600 + delay);
  }
  function surge() {
    goal.classList.remove('surge'); void goal.offsetWidth; goal.classList.add('surge');
    const t0 = performance.now(), dur = 1500;
    const step = (now) => {
      if (dead) return;
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      b.textContent = money(from + (to - from) * e);
      if (k < 1) raf = requestAnimationFrame(step); else b.textContent = money(to);
    };
    raf = requestAnimationFrame(step);
    timer = setTimeout(() => { b.textContent = money(to); }, dur + 150);
    const fx = 14 + Math.min(1, to / target) * 372;
    drop(Math.max(30, fx - 6), 500, true); drop(Math.max(40, fx - 40), 850, false);
  }
  if (to > from) {
    requestAnimationFrame(() => { if (!dead) { fill.style.width = pct(to); surge(); } });
  } else {
    b.textContent = money(to); fill.style.width = pct(to);
  }
  lastShown = to;

  let off = null;
  if (cfg.source === 'streamlabs' && ctx.bus) {
    off = ctx.bus.on('donation', (p) => {
      // read fresh state: another tab (panel) may have changed settings since ctx.settings loaded
      let store = ctx.settings;
      try { if (typeof localStorage !== 'undefined') store = createSettings(); } catch { /* keep ctx.settings */ }
      const g = (store.get().modules || {}).goal || {};
      const r = applyDonation({ current: g.current, seen: g.seen }, p);
      if (!r.added) return;
      store.set('modules.goal.seen', r.seen);
      store.set('modules.goal.current', r.current);
      ctx.bus.emit('settings', store.get());
    });
  }

  return {
    unmount() {
      dead = true; cancelAnimationFrame(raf); clearTimeout(timer);
      if (typeof off === 'function') off();
      wrap.remove();
    },
  };
}
