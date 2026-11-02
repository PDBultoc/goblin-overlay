// challenges: "Force Goblin to..." board; rotates tiers, donation unlocks the highest tier hit.
const CSS = `
[data-mod=challenges] .ch .tier .alt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-mod=challenges] .ch .tab.on::after{animation-duration:var(--dur,6s)}
[data-mod=challenges] .unl{position:absolute;right:14px;top:50px;z-index:3;max-width:330px;padding:6px 12px;
  border:3px double var(--acid);color:var(--acid);background:color-mix(in srgb,var(--acid) 12%,rgba(0,0,0,.6));
  box-shadow:0 0 18px var(--a35);font:800 17px/1.1 Oxanium,sans-serif;letter-spacing:.1em;text-transform:uppercase;text-align:center;
  white-space:nowrap;transform:rotate(-4deg);animation:unlStamp .5s cubic-bezier(.3,1.6,.5,1) both}
[data-mod=challenges] .unl small{display:block;margin-top:3px;font-size:13px;letter-spacing:.14em;opacity:.85;overflow:hidden;text-overflow:ellipsis}
[data-mod=challenges] .ch{transition:opacity .5s,transform .5s}
[data-mod=challenges] .ch.gone{opacity:0;transform:translateY(14px)}
[data-mod=challenges] .unl.out{animation:unlOut .4s ease-in forwards}
/* bottom strip: between Goblin's left HUD box and the minimap, where his own goal bar sits today (Paul, 2026-10-31) */
/* x 900–1500: right of the game's selection panel, left of the minimap (Goblin's live HUD, 2026-10-31) */
[data-mod=challenges] .ch.bottom{left:905px;top:928px;width:560px;height:120px}
[data-mod=challenges] .ch.bottom .hd,[data-mod=challenges] .ch.bottom .tabs{width:240px}
[data-mod=challenges] .ch.bottom .hd .t{white-space:nowrap;letter-spacing:.06em;font-size:14px}
[data-mod=challenges] .ch.bottom .ct{left:258px;right:12px;top:18px;bottom:10px}
[data-mod=challenges] .ch.bottom .tier li{-webkit-line-clamp:3}
[data-mod=challenges] .ch.bottom .tier li{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
[data-mod=challenges] .ch.bottom .unl{top:-34px}
@keyframes unlStamp{from{transform:rotate(-14deg) scale(2.4);opacity:0}to{transform:rotate(-4deg) scale(1);opacity:1}}
@keyframes unlOut{to{opacity:0;transform:rotate(-4deg) scale(.9)}}
`;

const STAMP_MS = 6000;

// Pure: highest tier whose amount <= donation amount, else null. Tier order does not matter.
export function tierFor(amount, tiers) {
  const a = Number(amount);
  if (!Number.isFinite(a) || !Array.isArray(tiers)) return null;
  let best = null;
  for (const t of tiers) {
    const ta = Number(t && t.amount);
    if (!Number.isFinite(ta) || ta > a) continue;
    if (best === null || ta > Number(best.amount)) best = t;
  }
  return best;
}

// Schedule (Paul, 2026-11-02): every 20 min, 10 s per tier, two rounds, then hide
// so the music widget gets the strip. schedule:'always' keeps the old behaviour.
export function scheduleOf(cfg = {}, nTiers = 0) {
  const every = cfg.schedule !== 'always';
  const perTierMs = Math.max(3, Number(cfg.perTierSec) || 10) * 1000;
  const rounds = Math.max(1, Number(cfg.rounds) || 2);
  const everyMs = Math.max(1, Number(cfg.everyMin) || 20) * 60000;
  return { every, perTierMs, everyMs, slotMs: Math.max(1, nTiers) * perTierMs * rounds };
}
// Pure: is the board in its visible slot at `now`? Slots start at `start`, then every everyMs.
export const inSlot = (now, start, s) => !s.every || ((now - start) % s.everyMs + s.everyMs) % s.everyMs < s.slotMs;

function injectCss(name, css) {
  if (document.head.querySelector(`style[data-mod="${name}"]`)) return;
  const s = document.createElement('style');
  s.dataset.mod = name; s.textContent = css;
  document.head.appendChild(s);
}

const money = (n) => '$' + (Math.round(Number(n) * 100) / 100);

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  injectCss('challenges', CSS);
  const cfg = ctx.cfg || {};
  const tiers = (Array.isArray(cfg.tiers) ? cfg.tiers : []).filter((t) => t && Number.isFinite(Number(t.amount)))
    .slice().sort((a, b) => a.amount - b.amount);
  const sched = scheduleOf(cfg, tiers.length);
  const rotateMs = sched.every ? sched.perTierMs : Math.max(2, Number(cfg.rotateSec) || 12) * 1000;

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  const wrap = el('div', 'gx');
  wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  const ch = el('div', cfg.position === 'left' ? 'pn ch' : 'pn ch bottom');
  const hd = el('div', 'hd');
  hd.appendChild(el('span', 't', 'Force Goblin to…'));
  const tabsEl = el('div', 'tabs');
  const tabs = tiers.map((x) => tabsEl.appendChild(el('div', 'tab', money(x.amount))));
  const ct = el('div', 'ct');
  ch.append(hd, tabsEl, ct);
  wrap.appendChild(ch);
  root.appendChild(wrap);

  let idx = -1, timer = 0, stampTimers = [], stampEl = null, dead = false;

  function show(i) {
    idx = i;
    tabs.forEach((tb, k) => {
      tb.classList.remove('on');
      if (k === i) { void tb.offsetWidth; tb.style.setProperty('--dur', rotateMs + 'ms'); tb.classList.add('on'); }
    });
    ct.querySelectorAll('.tier').forEach((o) => { o.classList.remove('in'); o.classList.add('out'); setTimeout(() => o.remove(), 360); });
    const box = el('div', 'tier in');
    box.appendChild(el('div', 'alt', 'for ' + money(tiers[i].amount) + ' or more'));
    const ul = el('ul');
    ul.appendChild(el('li', '', String(tiers[i].text == null ? '' : tiers[i].text)));
    box.appendChild(ul);
    ct.appendChild(box);
  }
  function startRotation() {
    clearInterval(timer);
    if (tiers.length > 1) timer = setInterval(() => show((idx + 1) % tiers.length), rotateMs);
  }
  function clearStamp() {
    stampTimers.forEach(clearTimeout); stampTimers = [];
    if (stampEl) { stampEl.remove(); stampEl = null; }
  }

  // Scheduled mode: slots anchored to the wall clock (:00/:20/:40 by default), so a
  // reload or settings change never restarts the cycle. Outside a slot the board hides
  // and gives the bottom strip to the music widget (bus 'strip').
  let inView = !sched.every, stamping = false, shown = null, tick = 0;
  const emitStrip = () => { if (ctx.bus) ctx.bus.emit('strip', { owner: 'challenges', busy: Boolean(shown) }); };
  function setShown(v) {
    if (v === shown) return;
    shown = v; ch.classList.toggle('gone', !v); emitStrip();
  }
  const tierNow = () => (tiers.length ? Math.floor((Date.now() % sched.everyMs) / sched.perTierMs) % tiers.length : 0);
  function evaluate() {
    if (dead) return;
    const v = !sched.every || inSlot(Date.now(), 0, sched);
    if (v && !inView && !stamping && tiers.length) { show(tierNow()); startRotation(); }
    if (!v && inView && !stamping) clearInterval(timer);
    inView = v;
    setShown(v || stamping);
  }

  if (tiers.length) { show(sched.every ? tierNow() : 0); if (inView) startRotation(); }
  else ct.appendChild(el('div', 'tier in')).appendChild(el('div', 'alt', 'no challenges set'));
  evaluate();
  if (sched.every) tick = setInterval(evaluate, 1000);
  const offReq = ctx.bus ? ctx.bus.on('strip-request', emitStrip) : null;

  const off = ctx.bus ? ctx.bus.on('donation', (p) => {
    if (dead || !p) return;
    const hit = tierFor(p.amount, tiers);
    if (!hit) return;
    clearInterval(timer); clearStamp();
    stamping = true; setShown(true);
    show(tiers.indexOf(hit));
    const s = el('div', 'unl', 'Challenge unlocked');
    s.appendChild(el('small', '', String(p.name == null ? '' : p.name)));
    ch.appendChild(s); stampEl = s;
    stampTimers.push(setTimeout(() => s.classList.add('out'), STAMP_MS - 400));
    stampTimers.push(setTimeout(() => {
      clearStamp(); stamping = false;
      if (dead) return;
      if (inView) { show((idx + 1) % tiers.length); startRotation(); }
      evaluate();
    }, STAMP_MS));
  }) : null;

  return {
    unmount() {
      dead = true; clearInterval(timer); clearInterval(tick); clearStamp();
      if (typeof offReq === 'function') offReq();
      if (shown && ctx.bus) ctx.bus.emit('strip', { owner: 'challenges', busy: false });
      if (typeof off === 'function') off();
      wrap.remove();
    },
  };
}
