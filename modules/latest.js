// latest: newest follower / donation / sub, a strip glued on top of the chat.
// The panel records Streamlabs events into modules.latest (so the values survive
// restarts and reach the overlay through the sync room); this module only shows them.
import { chatTop, playerCount, layout } from './chat.js';

export const LATEST_H = 104;

const CSS = `
[data-mod=latest] .lt{left:1518px;width:396px;height:${LATEST_H}px;padding:8px 14px;display:grid;grid-template-rows:repeat(3,1fr);
  transition:top .8s cubic-bezier(.2,.9,.2,1)}
[data-mod=latest] .lt .r{display:grid;grid-template-columns:96px minmax(0,1fr) auto;align-items:center;gap:10px;min-width:0}
[data-mod=latest] .lt .k{font:800 13px/1 Oxanium,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--acid)}
[data-mod=latest] .lt .v{font:600 17px/1.1 Inter,sans-serif;color:#eef5e8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-mod=latest] .lt .x{font:700 15px/1 Oxanium,sans-serif;color:var(--mute);white-space:nowrap}
[data-mod=latest] .lt .r.new .v{animation:ltNew 1.2s cubic-bezier(.2,.9,.2,1)}
@keyframes ltNew{0%{color:var(--acid);transform:translateX(12px);opacity:0}40%{opacity:1}100%{color:#eef5e8;transform:none}}
`;

// Pure: fold one relayed Streamlabs event into the stored "latest" object.
export function recordLatest(latest, e) {
  const out = { ...(latest || {}) };
  if (!e) return out;
  if (e.type === 'follow') out.follow = { name: e.name };
  else if (e.type === 'donation') out.donation = { name: e.name, amount: e.amount, currency: e.currency };
  else if (e.type === 'sub') out.sub = { name: e.name, months: e.months };
  return out;
}

const SYM = { USD: '$', EUR: '€', GBP: '£', SEK: 'kr ' };
const money = (amount, cur) => (SYM[cur] ?? (cur ? cur + ' ' : '$')) + (Math.round(Number(amount) * 100) / 100);

export function latestRows(l = {}) {
  return [
    { key: 'follow', label: 'Follower', value: l.follow?.name || '—', extra: '' },
    { key: 'donation', label: 'Donation', value: l.donation?.name || '—', extra: l.donation ? money(l.donation.amount, l.donation.currency) : '' },
    { key: 'sub', label: 'Sub', value: l.sub?.name || '—', extra: l.sub ? (Number(l.sub.months) > 1 ? `${l.sub.months} months` : 'new') : '' },
  ];
}

export const latestTop = (players) => chatTop(players) - LATEST_H - 8;

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  if (!document.head.querySelector('style[data-mod="latest"]')) {
    const s = document.createElement('style');
    s.dataset.mod = 'latest'; s.textContent = CSS;
    document.head.appendChild(s);
  }
  const box = document.createElement('div');
  box.className = 'pn lt';
  box.style.top = latestTop(layout.players) + 'px';
  for (const r of latestRows(ctx.cfg || {})) {
    const row = document.createElement('div');
    row.className = 'r';
    const k = document.createElement('span'); k.className = 'k'; k.textContent = r.label;
    const v = document.createElement('span'); v.className = 'v'; v.textContent = r.value;
    const x = document.createElement('span'); x.className = 'x'; x.textContent = r.extra;
    row.append(k, v, x);
    box.appendChild(row);
  }
  root.appendChild(box);
  // Follow the chat: team games push both up.
  const place = (p) => { const n = playerCount(p && p.match); if (n) { layout.players = n; box.style.top = latestTop(n) + 'px'; } };
  const offs = ctx.bus && ctx.bus.on ? [ctx.bus.on('match-start', place), ctx.bus.on('match-update', place)] : [];
  return { unmount() { offs.forEach((o) => typeof o === 'function' && o()); box.remove(); } };
}
