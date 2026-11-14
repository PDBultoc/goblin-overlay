// cam: 400x225 frame at (24,640), name plate, perched mascot (blink + ear twitch).
// The mascot perches on the goal bar; with the goal module off it sits on the camera frame.
const CSS = `
[data-mod=cam] .gob .ear{transform-box:fill-box}
[data-mod=cam] .gob .ear.l{transform-origin:100% 60%;animation:earTwL 9s infinite}
[data-mod=cam] .gob .ear.r{transform-origin:0 60%;animation:earTwR 9s 4.2s infinite}
@keyframes earTwL{0%,90%,100%{transform:none}92%{transform:rotate(-9deg)}94%{transform:rotate(5deg)}96%{transform:rotate(-4deg)}}
@keyframes earTwR{0%,90%,100%{transform:none}92%{transform:rotate(9deg)}94%{transform:rotate(-5deg)}96%{transform:rotate(4deg)}}
`;

const GOBLIN = `<svg class="gob" viewBox="0 0 140 96" aria-hidden="true"><g class="body">
  <path class="sil tuft" d="M55 36 58 15l7 14 6-19 6 19 7-13 2 20z"/>
  <path class="sil" d="M40 88C35 60 41 30 70 29c29 1 35 31 30 59z"/>
  <path class="hood" d="M29 89C25 42 44 21 70 21s45 21 41 68H99c2-31-9-48-29-48S39 58 41 89z"/>
  <path class="sil ear l" d="M45 46 3 18l13 14L1 33l20 10-11 6 33 13z"/>
  <path class="sil ear r" d="M95 46l42-28-13 14 15 1-20 10 11 6-33 13z"/>
  <g class="eyes"><path d="M50 53l15 4-1.5 5.5c-6 .5-11.5-3.5-13.5-9.5z"/><path d="M90 53l-15 4 1.5 5.5c6 .5 11.5-3.5 13.5-9.5z"/></g>
  <path class="mouth" d="M47 68c8 4 38 4 46 0-4 10-12 15-23 15s-19-5-23-15z"/>
  <path class="fang" d="M53 70.4l3 8 3-7.2zM81 71.2l3 7.2 3-8zM66 71.8l2 4.4 2-4.4zM72 71.8l2 4.4 2-4.4z"/>
  <path class="sil" d="M28 91c0-8 7-12 16-10 6 1 9 5 9 10l-1.5 5-3-4-3 4.5-3-4.5-3 4.5-3-4.5-3 4-2.5-5z"/>
  <path class="sil" transform="translate(60 0)" d="M28 91c0-8 7-12 16-10 6 1 9 5 9 10l-1.5 5-3-4-3 4.5-3-4.5-3 4.5-3-4.5-3 4-2.5-5z"/>
</g></svg>`;

// Where the mascot sits: 'goal' = on the goal bar, 'cam' = on the camera frame's top edge.
export function perchOf(s) {
  const g = s && s.modules && s.modules.goal;
  return g && g.enabled ? 'goal' : 'cam';
}

// The walk: every 4-7 minutes the mascot waddles along its perch to the left corner,
// looks around and comes back (9 s, CSS only: .gob.walk in toxic.css).
export function walkDelayMs(rnd) {
  const r = Number.isFinite(rnd) ? Math.min(1, Math.max(0, rnd)) : 0;
  return 240000 + Math.round(r * 180000);
}
export const walkOn = (cfg) => !(cfg && cfg.walk === false);
// Events that put something big on screen; the walk freezes (or waits) for that long.
export const HOLD_EVENTS = ['follow', 'sub', 'bits', 'donation', 'match-start', 'match-end'];
export function holdMs(type, s) {
  const m = (s && s.modules) || {};
  if (type === 'match-start') {
    const i = m.intro || {};
    return i.enabled ? (Number(i.seconds) || 3.5) * 1000 + 500 : 0;
  }
  if (type === 'match-end') return m.result && m.result.enabled ? 5500 : 0;
  if (['follow', 'sub', 'bits', 'donation'].includes(type)) {
    const sec = Number(m.alerts && m.alerts.seconds);
    return Number.isFinite(sec) && sec > 0 ? sec * 1000 : 8000;
  }
  return 0;
}

function injectCss(name, css) {
  if (document.head.querySelector(`style[data-mod="${name}"]`)) return;
  const s = document.createElement('style');
  s.dataset.mod = name; s.textContent = css;
  document.head.appendChild(s);
}

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  injectCss('cam', CSS);
  const cfg = ctx.cfg || {};
  const wrap = document.createElement('div');
  wrap.className = 'gx';
  wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none';

  const cam = document.createElement('div');
  cam.className = 'cam';
  for (const c of ['br tl', 'br tr', 'br bl', 'br brr']) {
    const i = document.createElement('i'); i.className = c; cam.appendChild(i);
  }
  const plate = document.createElement('div');
  plate.className = 'plate';
  const dot = document.createElement('span'); dot.className = 'dot';
  plate.append(dot, document.createTextNode(String(cfg.name == null ? '' : cfg.name).toUpperCase()));
  cam.appendChild(plate);

  const g = document.createElement('div');
  g.innerHTML = GOBLIN; // static markup, no user input
  const gob = g.firstElementChild;
  wrap.append(cam, gob);
  root.appendChild(wrap);

  // cam is not re-mounted when the goal module is switched, so follow the settings here.
  const st = ctx.settings;
  const place = () => gob.classList.toggle('on-cam', perchOf(st && st.get ? st.get() : null) === 'cam');
  place();
  const off = st && st.onChange ? st.onChange(place) : null;

  // Walk now and then. `hold` pauses the CSS animation while an alert, the intro
  // card or the result card is up; a walk that falls due meanwhile starts afterwards.
  const offs = [];
  let walkTimer = null, holdTimer = null, heldUntil = 0, due = false;
  const start = () => { due = false; gob.classList.add('walk'); };
  const tryWalk = () => { if (Date.now() < heldUntil) due = true; else start(); };
  const schedule = () => { clearTimeout(walkTimer); walkTimer = setTimeout(tryWalk, walkDelayMs(Math.random())); };
  const hold = (ms) => {
    if (!(ms > 0)) return;
    heldUntil = Math.max(heldUntil, Date.now() + ms);
    gob.classList.add('hold');
    clearTimeout(holdTimer);
    holdTimer = setTimeout(() => { gob.classList.remove('hold'); if (due) start(); }, heldUntil - Date.now());
  };
  if (walkOn(cfg)) {
    gob.addEventListener('animationend', (e) => {
      if (e.animationName !== 'gobWalk') return;
      gob.classList.remove('walk');
      schedule();
    });
    schedule();
    if (ctx.bus && ctx.bus.on) {
      for (const type of HOLD_EVENTS) {
        offs.push(ctx.bus.on(type, () => hold(holdMs(type, st && st.get ? st.get() : null))));
      }
      // panel button "Walk now" (also handy for checking the animation)
      offs.push(ctx.bus.on('mascot-walk', () => { if (!gob.classList.contains('walk')) tryWalk(); }));
    }
  }
  return {
    unmount() {
      if (typeof off === 'function') off();
      offs.forEach((o) => { try { o && o(); } catch (e) { /* ignore */ } });
      clearTimeout(walkTimer); clearTimeout(holdTimer);
      wrap.remove();
    },
  };
}
