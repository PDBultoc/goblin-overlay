// intro: VS card on match-start (Codex layout, toxic skin).
import { visibleCiv, civMinutes } from './civdelay.js';
import { flagEmoji, avgElo, esc } from './matchbar.js';

const CSS = `
.in{left:260px;top:300px;width:1400px;height:340px;display:flex;align-items:stretch;justify-content:center;overflow:visible;
  background:none;border:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.in::before,.in::after{display:none}
.in .cd{position:relative;flex:1;max-width:560px;padding:22px 28px;display:flex;flex-direction:column;border-radius:3px;
  background:linear-gradient(180deg,rgba(20,25,18,.88),rgba(4,6,4,.94));border:1px solid var(--a35);
  box-shadow:0 0 40px -8px var(--a35),inset 0 1px 0 rgba(255,255,255,.05);opacity:0}
.in .cd::before{content:'';position:absolute;left:14px;right:14px;top:-1px;height:1px;background:linear-gradient(90deg,transparent,var(--acid),transparent);box-shadow:0 0 10px var(--a60)}
.in.show .cd.l{animation:inL .75s .1s cubic-bezier(.2,1.3,.4,1) forwards}
.in.show .cd.r{animation:inR .75s .1s cubic-bezier(.2,1.3,.4,1) forwards}
.in .cd .pn2{font:800 34px/1.1 Oxanium,sans-serif;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px}
.in .cd.l .pn2{color:var(--acid);text-shadow:0 0 16px var(--a60)}
.in .cd .pc{font:500 20px/1.3 Inter,sans-serif;color:var(--mute)}
.in .cd .pc b{color:var(--text);font-weight:600}
.in .cd .e{font:700 18px/1 Oxanium,sans-serif;letter-spacing:.2em;color:var(--acid);margin-top:14px;text-transform:uppercase}
.in .cd .s{font:800 64px/1 Oxanium,sans-serif;margin-top:auto;font-variant-numeric:tabular-nums}
.in .cd.l .s{color:var(--acid);text-shadow:0 0 24px var(--a60)}
.in .vs{position:relative;width:170px;display:grid;place-items:center;z-index:3;margin:0 -8px;opacity:0;
  font:800 76px/1 Oxanium,sans-serif;color:var(--acid);text-shadow:0 0 30px var(--a60),0 0 6px var(--acid)}
.in.show .vs{animation:inV .6s .7s cubic-bezier(.2,1.5,.4,1) forwards}
.in .tag{position:absolute;top:-52px;left:50%;transform:translateX(-50%);white-space:nowrap;font:700 20px/1 Oxanium,sans-serif;letter-spacing:.4em;text-transform:uppercase;color:var(--acid);opacity:0}
.in.show .tag{animation:inT .6s 1s forwards}
.in.out{transition:opacity .5s;opacity:0}
@keyframes inL{from{opacity:0;transform:translateX(-700px) rotate(-5deg)}to{opacity:1;transform:none}}
@keyframes inR{from{opacity:0;transform:translateX(700px) rotate(5deg)}to{opacity:1;transform:none}}
@keyframes inV{from{opacity:0;transform:scale(2.6) rotate(-14deg)}to{opacity:1;transform:none}}
@keyframes inT{to{opacity:1}}
`;
function injectCss() {
  if (document.querySelector('style[data-mod=intro]')) return;
  const s = document.createElement('style');
  s.dataset.mod = 'intro';
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function mount(root, ctx) {
  injectCss();
  const { settings, bus } = ctx;
  const secs = Number(ctx.cfg && ctx.cfg.seconds) || 3.5;
  let el = null;
  const timers = [];
  const clear = () => { if (el) el.remove(); el = null; };

  const card = (m, players, cls, label, now, min) => {
    const lines = players.map((p) => `<div class="pc">${flagEmoji(p.country)} <b>${esc(p.name)}</b> &middot; ${esc(visibleCiv(m, p, now, min))}</div>`).join('');
    const elo = players.length === 1 ? players[0].rating : avgElo(players);
    return `<div class="cd ${cls}"><div class="pn2">${esc(label)}</div>${lines}<div class="e">${players.length === 1 ? 'ELO' : 'Avg ELO'}</div><div class="s">${elo ?? '-'}</div></div>`;
  };

  const off = bus.on('match-start', (p) => {
    const m = p && p.match;
    if (!m) return;
    clear();
    const all = settings.get();
    const min = civMinutes(all);
    const now = Date.now();
    const one = m.mode === '1v1';
    const foe = m.enemies[0] || [];
    const g = all.modules.series;
    const n = g && g.opponentId != null ? (g.manual.me || 0) + (g.manual.opp || 0) + 1 : null;
    const tag = [m.map, n ? `Game ${n}` : null].filter(Boolean).join(' · ');
    el = document.createElement('div');
    el.className = 'pn in';
    el.innerHTML = `<div class="tag">${esc(tag)}</div>` +
      card(m, m.myTeam, 'l', one ? m.me.name : 'Goblin team', now, min) + '<div class="vs">VS</div>' +
      card(m, foe, 'r', one ? foe[0].name : 'Enemy team', now, min);
    root.appendChild(el);
    const mine = el;
    requestAnimationFrame(() => mine.classList.add('show'));
    timers.push(setTimeout(() => mine.classList.add('out'), Math.max(1000, secs * 1000 - 500)));
    timers.push(setTimeout(() => { if (el === mine) clear(); }, secs * 1000));
  });
  return { unmount() { off(); timers.forEach(clearTimeout); clear(); } };
}
