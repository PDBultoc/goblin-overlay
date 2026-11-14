// CIV layer: Romans (kit: med). Scarlet accent, red wool, bronze and iron. The standard is a fringed vexillum:
// a square red cloth on a crossbar with a gold laurel wreath, ribbons from the bar ends and a gilded wreath ring
// on the pole; the frame gets laurel festoons with scarlet ribbons under the architrave and a curved scutum leaning
// between column and pole; the mascot wears a galea helmet with a transverse red crest.
// All drawings are our own (no eagle, no SPQR, no thunderbolt).

import { sideArm } from './kit-med.js';

const SCAR = 'var(--civ)', WOOL = 'var(--civ3)', GOLD = '#e0b54a', LAUREL = '#e8c25a';

// leaves along a quadratic curve, alternating sides
const laurel = (x0, y0, cx, cy, x1, y1, n, s = 1, fill = LAUREL, stroke = '#7a5212') => Array.from({ length: n }, (_, i) => {
  const t = (i + .5) / n, u = 1 - t;
  const x = u * u * x0 + 2 * u * t * cx + t * t * x1, y = u * u * y0 + 2 * u * t * cy + t * t * y1;
  const dx = 2 * u * (cx - x0) + 2 * t * (x1 - cx), dy = 2 * u * (cy - y0) + 2 * t * (y1 - cy);
  const a = Math.atan2(dy, dx) * 180 / Math.PI + (i % 2 ? 35 : -35);
  return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(4.200 * s).toFixed(2)}" ry="${(1.700 * s).toFixed(2)}" transform="rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${fill}" stroke="${stroke}" stroke-width=".5"/>`;
}).join('');
const wreath = (cx, cy, r, s = 1) => `<path d="M${cx - 3} ${cy + r}A${r} ${r} 0 1 1 ${cx + 3} ${cy + r}" fill="none" stroke="#7a5212" stroke-width="${.9 * s}"/>
  ${laurel(cx - 3, cy + r, cx - r * 1.5, cy + r * .2, cx - 2, cy - r, 9, s)}${laurel(cx + 3, cy + r, cx + r * 1.5, cy + r * .2, cx + 2, cy - r, 9, s)}
  <path d="M${cx - 4} ${cy + r + 1}l-5 ${7 * s}M${cx + 4} ${cy + r + 1}l5 ${7 * s}" stroke="${SCAR}" stroke-width="${2 * s}" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy + r}" r="${2.200 * s}" fill="${SCAR}" stroke="#4a0606" stroke-width=".5"/>`;

const fringe = (x0, x1, y, h) => { let d = ''; for (let x = x0; x <= x1; x += 1.600) d += `M${x.toFixed(1)} ${y}v${h}`; return d; };

const defs = `<defs><linearGradient id="rmFold" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".25" stop-color="#fff" stop-opacity=".14"/><stop offset=".5" stop-color="#000" stop-opacity=".26"/><stop offset=".75" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
  <clipPath id="rmCut"><rect x="22" y="33" width="76" height="72"/></clipPath></defs>`;

const standard = `<svg width="180" height="150" viewBox="0 0 180 150">${defs}${sideArm(29.500)}
  <g class="pc" style="--sc:.2;--r:180deg;--d:1.200">
    <circle cx="60" cy="13" r="9" fill="none" stroke="#7a5212" stroke-width="1"/>${laurel(51, 13, 51, 1, 60, 4, 5, .8)}${laurel(69, 13, 69, 1, 60, 4, 5, .8)}${laurel(51, 13, 51, 25, 60, 22, 5, .8)}${laurel(69, 13, 69, 25, 60, 22, 5, .8)}
  </g>
  <g transform="translate(48 0)">
  <g class="unroll" style="--d:1.350"><g class="rmsway">
    <g clip-path="url(#rmCut)">
      <rect x="20" y="30" width="80" height="80" fill="${WOOL}"/>
      <rect x="26" y="38" width="68" height="62" fill="none" stroke="${GOLD}" stroke-width="1.600"/><rect x="29" y="41" width="62" height="56" fill="none" stroke="${GOLD}" stroke-width=".6"/>
      ${wreath(60, 66, 15)}
      <rect class="rmsheen" x="-60" y="30" width="300" height="80" fill="url(#rmFold)"/>
    </g>
    <rect x="22" y="33" width="76" height="72" fill="none" stroke="#3a0404" stroke-width="1.100"/>
    <g class="rmfringe"><path d="${fringe(22.500, 97.500, 105, 11)}" stroke="${GOLD}" stroke-width="1"/><path d="M22 105.500H98" stroke="#7a5212" stroke-width="1.400"/></g>
  </g></g>
  <rect x="12" y="27" width="96" height="5" rx="2.500" fill="${GOLD}" stroke="#6b440c" stroke-width=".7"/>
  <path d="M12 26l-4 3.500 4 3.500 2-3.500zM108 26l4 3.500-4 3.500-2-3.500z" fill="${GOLD}" stroke="#6b440c" stroke-width=".6"/>
  <g class="unroll" style="--d:1.650"><g class="rmrib"><path d="M15 32c-3 12 2 22-1 34-1 6 1 10 3 14l-3-1c-3-5-4-9-3-14 3-12-2-22 1-33z" fill="${SCAR}" stroke="#4a0606" stroke-width=".5"/><path d="M11.500 79l4 1" stroke="${GOLD}" stroke-width="1.400"/></g></g>
  <g class="unroll" style="--d:1.720"><g class="rmrib"><path d="M105 32c3 12-2 22 1 34 1 6-1 10-3 14l3-1c3-5 4-9 3-14-3-12 2-22-1-33z" fill="${SCAR}" stroke="#4a0606" stroke-width=".5"/><path d="M108.500 79l-4 1" stroke="${GOLD}" stroke-width="1.400"/></g></g>
</g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <g class="unroll" style="--d:1.600"><g class="rmsway">
    <rect x="4" y="5" width="26" height="40" fill="${WOOL}" stroke="#3a0404" stroke-width=".9"/><rect x="7" y="8" width="20" height="34" fill="none" stroke="${GOLD}" stroke-width=".8"/>
    ${wreath(17, 24, 7, .55)}
    <g class="rmfringe"><path d="${fringe(4.500, 29.500, 45, 9)}" stroke="${GOLD}" stroke-width=".9"/></g>
  </g></g>
  <rect x="1" y="1" width="32" height="4.500" rx="2.200" fill="${GOLD}" stroke="#6b440c" stroke-width=".6"/>
</svg>`;

const hangs = [8, 136, 264, 392];
const frame = `
<g class="pc" style="--dy:-50px;--d:1.050;--o:0"><g class="rmfest">
  ${hangs.slice(0, -1).map((x, i) => `<path d="M${x} 3Q${(x + hangs[i + 1]) / 2} 27 ${hangs[i + 1]} 3" fill="none" stroke="#3d5a2a" stroke-width="2.400"/>
    ${laurel(x, 3, (x + hangs[i + 1]) / 2, 27, hangs[i + 1], 3, 26, 1.050, '#5d8a3e', '#22381a')}${laurel(x, 5, (x + hangs[i + 1]) / 2, 29, hangs[i + 1], 5, 13, .8)}`).join('')}
  ${hangs.map((x, i) => `<g class="rmbow" style="--i:${i}"><path d="M${x} 4c-6-5-9 1-5 3M${x} 4c6-5 9 1 5 3" fill="${SCAR}" stroke="#4a0606" stroke-width=".7"/><path d="M${x - 1} 6c-2 4-1 7-3 11M${x + 1} 6c2 4 1 7 3 11" fill="none" stroke="${SCAR}" stroke-width="2" stroke-linecap="round"/><circle cx="${x}" cy="4.500" r="2" fill="${GOLD}"/></g>`).join('')}
</g></g>
<g transform="translate(442 186)"><g class="pc" style="--dy:-90px;--r:-30deg;--d:1.200;--o:0">
  <path d="M-14 -36C-10 -38 10 -38 14 -36V34C10 36 -10 36 -14 34Z" fill="${WOOL}" stroke="#2a0303" stroke-width="1.100"/>
  <path d="M-14 -36C-10 -38 10 -38 14 -36V34C10 36 -10 36 -14 34Z" fill="url(#rmFSh)"/>
  <path d="M-11.500 -33C-8 -34.500 8 -34.500 11.500 -33V31C8 32.500 -8 32.500 -11.500 31Z" fill="none" stroke="${GOLD}" stroke-width="1.600"/>
  <path d="M-8 -22c5 6 11 6 16 0M-8 22c5-6 11-6 16 0" fill="none" stroke="${GOLD}" stroke-width="1.300"/>
  <circle r="6.500" fill="${GOLD}" stroke="#6b440c" stroke-width=".8"/><circle r="3.500" fill="none" stroke="#fff3b0" stroke-opacity=".8" stroke-width=".8"/><circle class="rmglint" cx="-2" cy="-2" r="1.400" fill="#fff"/>
</g></g>
<defs><linearGradient id="rmFSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset=".45" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient></defs>`;

const costume = {
  back: `<path d="M23 27C22 -3 118 -3 117 27C104 19 36 19 23 27Z" fill="${SCAR}" stroke="#4a0606" stroke-width="1.100"/>
    <path d="${Array.from({ length: 17 }, (_, i) => { const a = Math.PI * (1 - i / 16); return `M70 24L${(70 + Math.cos(a) * 44).toFixed(1)} ${(24 - Math.sin(a) * 22).toFixed(1)}`; }).join('')}" stroke="#7a0a0a" stroke-width=".8" opacity=".7"/>
    <path d="M30 18C40 4 100 4 110 18" fill="none" stroke="#ff9a9a" stroke-opacity=".55" stroke-width="1.300"/>
    <path d="M38 44C34 47 35 51 41 52H99C105 51 106 47 102 44Z" fill="#c9952e" stroke="#5a3e08" stroke-width=".9"/>`,
  front: `<defs><linearGradient id="rmIron" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef2f5"/><stop offset=".45" stop-color="#9aa4ac"/><stop offset="1" stop-color="#454c52"/></linearGradient>
    <linearGradient id="rmBr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset=".5" stop-color="#d1a03a"/><stop offset="1" stop-color="#7a5212"/></linearGradient></defs>
  <rect x="60" y="15" width="20" height="5" rx="1" fill="url(#rmBr)" stroke="#5a3e08" stroke-width=".7"/>
  <path d="M45 44C45 26 56 17 70 17s25 9 25 27Z" fill="url(#rmIron)" stroke="#1d2226" stroke-width="1.200"/>
  <path d="M53 30c2-6 7-9 13-10" stroke="#fff" stroke-opacity=".75" stroke-width="1.500" stroke-linecap="round" fill="none"/>
  <path d="M43 38C55 32 85 32 97 38V43C85 37 55 37 43 43Z" fill="url(#rmBr)" stroke="#5a3e08" stroke-width=".9"/>
  <g fill="url(#rmBr)" stroke="#5a3e08" stroke-width=".4"><circle cx="58" cy="35.300" r="1.300"/><circle cx="70" cy="34.300" r="1.300"/><circle cx="82" cy="35.300" r="1.300"/></g>
  <path d="M43 42C40 49 40 58 44 66C46 65 48 60 48 52L47.500 43Z" fill="url(#rmIron)" stroke="#1d2226" stroke-width="1"/>
  <path d="M97 42C100 49 100 58 96 66C94 65 92 60 92 52L92.500 43Z" fill="url(#rmIron)" stroke="#1d2226" stroke-width="1"/>
  <circle cx="45" cy="53" r="1.500" fill="url(#rmBr)" stroke="#5a3e08" stroke-width=".4"/><circle cx="95" cy="53" r="1.500" fill="url(#rmBr)" stroke="#5a3e08" stroke-width=".4"/>`,
};

const css = `
#stage[data-civ=romans] .gob.dressed .tuft{opacity:0}
#stage[data-civ=romans] .rmsway{transform-box:fill-box;transform-origin:50% 0;animation:rmSway 5s ease-in-out infinite}
@keyframes rmSway{0%,100%{transform:rotate(-1.500deg) skewX(1.500deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
#stage[data-civ=romans] .rmsheen{animation:rmSheen 4s linear infinite}
@keyframes rmSheen{from{transform:translateX(0)}to{transform:translateX(-75px)}}
#stage[data-civ=romans] .rmfringe{transform-box:fill-box;transform-origin:50% 0;animation:rmFr 1.400s ease-in-out infinite alternate}
@keyframes rmFr{from{transform:skewX(-8deg)}to{transform:skewX(8deg)}}
#stage[data-civ=romans] .rmrib{transform-box:fill-box;transform-origin:50% 0;animation:rmRib 2.300s ease-in-out infinite alternate}
@keyframes rmRib{from{transform:rotate(-5deg) skewX(4deg)}to{transform:rotate(5deg) skewX(-4deg)}}
#stage[data-civ=romans] .rmfest{transform-box:fill-box;transform-origin:50% 0;animation:rmFest 5.200s ease-in-out infinite}
@keyframes rmFest{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.050)}}
#stage[data-civ=romans] .rmbow{transform-box:fill-box;transform-origin:50% 0;animation:rmRib calc(2s + var(--i)*.3s) ease-in-out infinite alternate}
#stage[data-civ=romans] .rmglint{transform-box:fill-box;transform-origin:center;animation:rmGl 3.800s ease-in-out infinite}
@keyframes rmGl{0%,70%,100%{opacity:.2;transform:scale(.6)}82%{opacity:1;transform:scale(1.800)}}
`;

export default {
  id: 'romans', name: 'Romans', kit: 'med',
  accent: '#ff3b3b', accent2: '#b81e1e', cloth: '#a0151a', metal: GOLD,
  standard, pennant, costume, css, frame,
};
