// matchbar: owns the aoe2 poller (only while mounted), re-emits match events, renders the bar.
import { createPoller } from '../core/aoe2.js';
import { visibleCiv, civMinutes, anyHidden } from './civdelay.js';

export function flagEmoji(cc) {
  if (!cc || !/^[A-Za-z]{2}$/.test(cc)) return '';
  return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}
export const avgElo = (players) => {
  const r = players.map((p) => p.rating).filter((x) => x != null);
  return r.length ? Math.round(r.reduce((a, b) => a + b, 0) / r.length) : null;
};
export const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);

const CSS = `
.mb{left:560px;top:62px;width:800px;height:58px;display:grid;grid-template-columns:1fr 70px 1fr;align-items:center;
  overflow:visible;animation:mbIn .8s cubic-bezier(.2,1.4,.4,1) both}
.mb .s{display:flex;align-items:center;gap:10px;padding:0 16px;min-width:0;height:56px}
.mb .s.o{flex-direction:row-reverse;text-align:right}
.mb .s .who{line-height:1;min-width:0}
.mb .nm{font:800 21px/1 Oxanium,sans-serif;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:250px}
.mb .s.g .nm{color:var(--acid);text-shadow:0 0 12px var(--a35)}
.mb .civ{font:500 16px/1 Inter,sans-serif;color:var(--mute);margin-top:6px}
.mb .fl{font-size:26px;line-height:1}
.mb .elo{margin-left:auto;font:800 24px/1 Oxanium,sans-serif;font-variant-numeric:tabular-nums}
.mb .s.o .elo{margin-left:0;margin-right:auto}
.mb .s.g .elo{color:var(--acid)}
.mb .vs{text-align:center;font:800 22px/1 Oxanium,sans-serif;letter-spacing:.12em;color:var(--mute)}
.mb.tg{height:auto;min-height:58px;width:760px;left:580px;grid-template-columns:1fr 1fr;padding:4px 0 6px}
.mb .col{padding:0 16px;min-width:0}
.mb .col+.col{border-left:1px solid rgba(255,255,255,.08)}
.mb .col.g{background:var(--a15)}
.mb .ch{font:800 15px/1 Oxanium,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);height:20px;display:flex;justify-content:space-between;align-items:center}
.mb .col.g .ch{color:var(--acid)}
.mb .pl{display:grid;grid-template-columns:1fr 1fr;gap:2px 10px}
.mb .p{font:600 14px/20px Inter,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mb .p i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px}
.mb .p em{font-style:normal;color:var(--mute);margin-left:5px}
@keyframes mbIn{from{transform:translateY(-70px) scaleY(1.3);opacity:0}to{transform:none;opacity:1}}
`;
function injectCss() {
  if (document.querySelector('style[data-mod=matchbar]')) return;
  const s = document.createElement('style');
  s.dataset.mod = 'matchbar';
  s.textContent = CSS;
  document.head.appendChild(s);
}

function side(m, p, cls, now, min) {
  return `<div class="s ${cls}"><span class="fl">${flagEmoji(p.country)}</span>` +
    `<div class="who"><div class="nm">${esc(p.name)}</div><div class="civ">${esc(visibleCiv(m, p, now, min))}</div></div>` +
    `<span class="elo">${p.rating ?? ''}</span></div>`;
}

// Goblin's in-game name ("SwedishGoblinTwitch") is long; show the brand name set in the panel.
export function withMyName(m, name) {
  if (!m || !name) return m;
  const fix = (p) => (p && p.profileId === m.me.profileId ? { ...p, name } : p);
  return { ...m, me: fix(m.me), myTeam: m.myTeam.map(fix) };
}

export function renderBar(m, now, min) {
  if (m.mode === '1v1') {
    return { cls: 'pn mb slime', html: side(m, m.me, 'g', now, min) + '<div class="vs">VS</div>' + side(m, m.enemies[0][0], 'o', now, min) };
  }
  const col = (players, cls, label) => `<div class="col ${cls}"><div class="ch"><span>${label}</span><span>avg ${avgElo(players) ?? '-'}</span></div><div class="pl">` +
    players.map((p) => `<div class="p"><i style="background:${esc(p.colorHex || '#888')}"></i>${esc(p.name)}<em>${esc(visibleCiv(m, p, now, min))}</em></div>`).join('') + '</div></div>';
  return { cls: 'pn mb tg slime', html: col(m.myTeam, 'g', 'Goblin team') + m.enemies.map((t) => col(t, 'o', 'Enemy')).join('') };
}

export function mount(root, ctx) {
  injectCss();
  const { settings, bus } = ctx;
  const el = document.createElement('div');
  el.style.display = 'none';
  root.appendChild(el);
  let cur = null;
  let shownId = null;
  let tick = null;

  const render = () => {
    if (!cur || !cur.running) { el.style.display = 'none'; shownId = null; return; }
    const min = civMinutes(settings.get());
    const r = renderBar(withMyName(cur, settings.get().modules.cam?.name), Date.now(), min);
    el.className = r.cls;
    if (shownId === cur.id) el.style.animation = 'none';
    else { el.style.animation = ''; shownId = cur.id; }
    el.innerHTML = r.html;
    el.style.display = '';
    if (anyHidden(cur, Date.now(), min)) { if (!tick) tick = setInterval(render, 15000); }
    else if (tick) { clearInterval(tick); tick = null; }
  };

  const offs = [
    bus.on('match-start', (p) => { cur = p.match; render(); }),
    bus.on('match-update', (p) => { cur = p.match; render(); }),
    bus.on('match-end', () => { cur = null; render(); }),
    bus.on('settings', render),
  ];

  const s = settings.get();
  const poller = createPoller({
    profileId: s.profileId,
    intervalSec: s.pollSec,
    onEvents: (evs) => { for (const e of evs) bus.emit(e.type, { match: e.match }); },
    onStatus: (st) => {
      bus.emit('status', st);
      if (st.ok) { const m = poller.latest(); if (m) bus.emit('match-update', { match: m }); }
    },
  });
  poller.start();

  return { unmount() { poller.stop(); offs.forEach((f) => f()); if (tick) clearInterval(tick); el.remove(); } };
}
