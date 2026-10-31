// cam: 400x225 frame at (24,640), name plate, perched mascot (blink + ear twitch).
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
  wrap.append(cam, g.firstElementChild);
  root.appendChild(wrap);
  return { unmount() { wrap.remove(); } };
}
