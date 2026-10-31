// result: banner on match-end, "VICTORY +17" / "DEFEAT -20".
const CSS = `
.rs{left:660px;top:128px;width:600px;height:96px;display:grid;place-items:center;overflow:visible;
  font:800 56px/1 Oxanium,sans-serif;letter-spacing:.14em;text-transform:uppercase;
  animation:rsIn .8s cubic-bezier(.2,1.5,.4,1) both}
.rs.out{animation:rsOut .6s cubic-bezier(.5,0,1,.5) forwards}
.rs.win{color:var(--acid);text-shadow:0 0 28px var(--a60),0 0 6px var(--acid);border-bottom:2px solid var(--acid)}
.rs.loss{color:#ff5a4d;text-shadow:0 0 24px rgba(255,90,77,.6);border-bottom:2px solid #ff5a4d}
.rs small{font-size:34px;margin-left:18px;letter-spacing:.06em}
@keyframes rsIn{0%{transform:translateY(-120px) scale(1.2,.6);opacity:0}55%{transform:translateY(8px) scale(.96,1.08);opacity:1}100%{transform:none;opacity:1}}
@keyframes rsOut{to{transform:translateY(60px) scaleY(.6);opacity:0}}
`;
function injectCss() {
  if (document.querySelector('style[data-mod=result]')) return;
  const s = document.createElement('style');
  s.dataset.mod = 'result';
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function resultText(match) {
  if (!match || (match.won !== true && match.won !== false)) return null;
  const d = match.ratingDiff;
  const diff = d == null ? '' : (d >= 0 ? '+' : '−') + Math.abs(d);
  return { win: match.won, label: match.won ? 'VICTORY' : 'DEFEAT', diff };
}

export function mount(root, ctx) {
  injectCss();
  let el = null;
  const timers = [];
  const clear = () => { if (el) el.remove(); el = null; };
  const off = ctx.bus.on('match-end', (p) => {
    const r = resultText(p && p.match);
    if (!r) return;
    clear();
    el = document.createElement('div');
    el.className = `pn rs ${r.win ? 'win' : 'loss'}`;
    el.innerHTML = `<div>${r.label}${r.diff ? `<small>${r.diff}</small>` : ''}</div>`;
    root.appendChild(el);
    const mine = el;
    timers.push(setTimeout(() => mine.classList.add('out'), 4400));
    timers.push(setTimeout(() => { if (el === mine) clear(); }, 5000));
  });
  return { unmount() { off(); timers.forEach(clearTimeout); clear(); } };
}
