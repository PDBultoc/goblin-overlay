// CIV layer: Byzantines (kit: med). Purple accent, Tyrian-purple silk, gold and pearls. The standard is a purple
// silk banner with jewelled gold medallion roundels, a pearl-studded border and three dagged points with pearl
// drops; the frame gets purple court curtains tied back with gold cords and pearl strings swagged under the
// architrave; the mascot wears a jewelled stemma crown with hanging pearl strings (a secular court crown).
// All drawings are our own (no eagle, no chi-rho, no cross).

import { sideArm } from './kit-med.js';

const LIL = 'var(--civ)', PURP = 'var(--civ3)', GOLD = '#f2c14e', RUBY = '#d23a4a', PEARL = '#fbf6ec';

const pearls = (pts, r = 1.400) => pts.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${PEARL}" stroke="#9a8f80" stroke-width=".35"/>`).join('');
const ring = (cx, cy, r, n) => Array.from({ length: n }, (_, i) => [cx + Math.cos(i / n * Math.PI * 2) * r, cy + Math.sin(i / n * Math.PI * 2) * r]);
const along = (x0, y0, cx, cy, x1, y1, n) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t;
  return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1]; });

const medallion = (cx, cy, r, i) => `<g class="bzmed" style="--i:${i}">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#bzGold)" stroke="#6b4a08" stroke-width=".8"/>
  ${pearls(ring(cx, cy, r * .78, Math.round(r * 1.3)), Math.max(.9, r * .08))}
  <circle cx="${cx}" cy="${cy}" r="${(r * .6).toFixed(1)}" fill="#2a0c40" stroke="#6b4a08" stroke-width=".6"/>
  ${Array.from({ length: 8 }, (_, k) => `<ellipse cx="${cx}" cy="${(cy - r * .38).toFixed(1)}" rx="${(r * .1).toFixed(2)}" ry="${(r * .17).toFixed(2)}" transform="rotate(${k * 45} ${cx} ${cy})" fill="${GOLD}"/>`).join('')}
  <ellipse cx="${cx}" cy="${cy}" rx="${(r * .26).toFixed(1)}" ry="${(r * .32).toFixed(1)}" fill="${LIL}" stroke="#3a1060" stroke-width=".6"/>
  <ellipse cx="${(cx - r * .08).toFixed(1)}" cy="${(cy - r * .12).toFixed(1)}" rx="${(r * .08).toFixed(1)}" ry="${(r * .11).toFixed(1)}" fill="#fff" opacity=".75"/></g>`;

const BAN = 'M18 33H102V116L88 133L74 116L60 133L46 116L32 133L18 116Z';
const defs = `<defs>
  <radialGradient id="bzGold" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="${GOLD}"/><stop offset="1" stop-color="#9a6a10"/></radialGradient>
  <linearGradient id="bzFold" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset=".25" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/><stop offset=".75" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>
  <pattern id="bzDamask" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M6 0L12 6L6 12L0 6Z" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width=".8"/><circle cx="6" cy="6" r="1" fill="#fff" fill-opacity=".1"/></pattern>
  <clipPath id="bzCut"><path d="${BAN}"/></clipPath></defs>`;

const standard = `<svg width="180" height="160" viewBox="0 0 180 160">${defs}${sideArm(29.500)}<g transform="translate(50 0)">
  <g class="unroll" style="--d:1.350"><g class="bzsway">
    <g clip-path="url(#bzCut)">
      <rect x="10" y="30" width="100" height="110" fill="${PURP}"/><rect x="10" y="30" width="100" height="110" fill="url(#bzDamask)"/>
      <path d="${BAN}" fill="none" stroke="${GOLD}" stroke-width="7"/>
      ${pearls(along(22, 37, 60, 37, 98, 37, 18))}${pearls(along(22, 40, 22, 78, 22, 112, 16))}${pearls(along(98, 40, 98, 78, 98, 112, 16))}
      ${medallion(60, 64, 17, 0)}${medallion(40, 100, 10, 1)}${medallion(80, 100, 10, 2)}
      <rect class="bzsheen" x="-60" y="30" width="300" height="110" fill="url(#bzFold)"/>
    </g>
    <path d="${BAN}" fill="none" stroke="#1a0626" stroke-width="1.100"/>
    ${[32, 60, 88].map((x) => `<path d="M${x} 133v5" stroke="${GOLD}" stroke-width=".8"/>${pearls([[x, 140]], 2.300)}`).join('')}
  </g></g>
  <rect x="10" y="27" width="100" height="5" rx="2.500" fill="url(#bzGold)" stroke="#6b4a08" stroke-width=".7"/>
  ${pearls([[10, 29.500], [110, 29.500]], 3.200)}
  <g class="unroll" style="--d:1.700"><g class="bzcord">${pearls(along(14, 33, 10, 50, 14, 66, 9), 1.300)}<path d="M14 68l-3 8h6z" fill="${LIL}" stroke="#3a1060" stroke-width=".5"/></g></g>
  <g class="unroll" style="--d:1.750"><g class="bzcord">${pearls(along(106, 33, 110, 50, 106, 66, 9), 1.300)}<path d="M106 68l-3 8h6z" fill="${LIL}" stroke="#3a1060" stroke-width=".5"/></g></g>
</g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><defs><clipPath id="bzPc"><path d="M3 5H31V52L24 62L17 52L10 62L3 52Z"/></clipPath></defs>
  <g class="unroll" style="--d:1.600"><g class="bzsway">
    <g clip-path="url(#bzPc)"><rect width="34" height="70" fill="${PURP}"/><path d="M3 5H31V52L24 62L17 52L10 62L3 52Z" fill="none" stroke="${GOLD}" stroke-width="4"/>
      ${medallion(17, 28, 9, 3)}</g>
    <path d="M3 5H31V52L24 62L17 52L10 62L3 52Z" fill="none" stroke="#1a0626" stroke-width=".9"/>
    ${pearls([[10, 64], [24, 64]], 1.800)}
  </g></g>
  <rect x="1" y="1" width="32" height="4.500" rx="2.200" fill="${GOLD}" stroke="#6b4a08" stroke-width=".6"/>
</svg>`;

// court curtain hung under the architrave, tied back with a gold cord; drawn for the left side, mirrored for the right
// kept within ~20 px of the picture's edge (Goblin's face is in the middle)
const CURT = 'M3 1H22C21 40 17 78 13 106C16 136 19 168 18 208H3Z';
const curtain = (flip, d) => `<g transform="translate(${flip ? 400 : 0} 0) scale(${flip ? -1 : 1} 1)"><g class="pc" style="--dx:-70px;--d:${d};--o:0"><g class="bzcurt">
  <path d="${CURT}" fill="url(#bzFCurt)" stroke="#1a0626" stroke-width="1"/>
  <path d="M8 2C9 40 9 80 8 106C9 140 10 170 9 206M15 2C14 40 12 80 11 106C12 140 14 170 14 206" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1.300"/>
  <path d="M11 2C12 40 11 80 10 106" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.100"/>
  <path d="M21 1C20 40 16 78 12 106C15 136 18 168 17 208" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <path d="M3 104C8 108 13 108 17 102" fill="none" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="16" cy="104" r="2.600" fill="url(#bzFGold)"/><path d="M16 106c1 6 0 10-1 14" stroke="${GOLD}" stroke-width="1.200" fill="none"/><path d="M15 119l-3 9h6z" fill="${GOLD}" stroke="#6b4a08" stroke-width=".5"/>
</g></g></g>`;

const frame = `<defs><radialGradient id="bzFGold" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="${GOLD}"/><stop offset="1" stop-color="#9a6a10"/></radialGradient>
  <linearGradient id="bzFCurt" x1="0" x2="1"><stop offset="0" stop-color="#2a0c40"/><stop offset=".5" stop-color="#5a2384"/><stop offset="1" stop-color="#3a1458"/></linearGradient></defs>
${curtain(false, 1.000)}${curtain(true, 1.080)}
<g class="pc" style="--dy:-40px;--d:1.250;--o:0"><g class="bzswag">
  ${[[40, 120], [120, 200], [200, 280], [280, 360]].map(([a, b]) => pearls(along(a, 3, (a + b) / 2, 22, b, 3, 22), 1.500)).join('')}
  ${[40, 120, 200, 280, 360].map((x) => `<circle cx="${x}" cy="3.500" r="3" fill="${LIL}" stroke="#6b4a08" stroke-width="1"/>`).join('')}
</g></g>`;

const costume = {
  front: `<defs><radialGradient id="bzCg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="${GOLD}"/><stop offset="1" stop-color="#9a6a10"/></radialGradient></defs>
  <path d="M47 35C47 16 93 16 93 35Z" fill="${PURP}" stroke="#1a0626" stroke-width="1"/>
  <path d="M54 26c3-5 9-7 15-7" stroke="#fff" stroke-opacity=".3" stroke-width="1.400" stroke-linecap="round" fill="none"/>
  ${[[48.500, 28], [59, 25], [70, 21], [81, 25], [91.500, 28]].map(([x, top]) => `<path d="M${x - 1.600} 34V${top + 6}h3.200V34z" fill="url(#bzCg)" stroke="#6b4a08" stroke-width=".5"/>
    <circle cx="${x}" cy="${top + 4}" r="4.300" fill="url(#bzCg)" stroke="#6b4a08" stroke-width=".7"/>
    <circle cx="${x}" cy="${top + 4}" r="2" fill="${x === 70 ? LIL : RUBY}" stroke="#3a1060" stroke-width=".4"/>${pearls([[x, top - 1.300]], 1.400)}`).join('')}
  <path d="M42 33C54 30 86 30 98 33V46C86 43 54 43 42 46Z" fill="url(#bzCg)" stroke="#6b4a08" stroke-width="1"/>
  ${pearls(along(44, 33.800, 70, 30.800, 96, 33.800, 12), 1.050)}${pearls(along(44, 45, 70, 42, 96, 45, 12), 1.050)}
  ${[[51, 'r'], [60.500, 'o'], [70, 'r'], [79.500, 'o'], [89, 'r']].map(([x, k]) => (k === 'r'
    ? `<rect x="${x - 3}" y="35.300" width="6" height="6" rx="1" fill="${x === 70 ? LIL : RUBY}" stroke="#6b4a08" stroke-width=".7"/><rect x="${x - 2}" y="36.200" width="1.600" height="1.600" fill="#fff" opacity=".6"/>`
    : `<ellipse cx="${x}" cy="38.300" rx="2.600" ry="3.100" fill="${LIL}" stroke="#6b4a08" stroke-width=".7"/>`)).join('')}
  <g class="bzpend">${pearls(Array.from({ length: 7 }, (_, i) => [43, 47.500 + i * 3]), 1.300)}<path d="M43 68.500c2.200 2.500 2.200 4.500 0 6.500-2.200-2-2.200-4 0-6.500z" fill="${LIL}" stroke="#3a1060" stroke-width=".5"/></g>
  <g class="bzpend" style="animation-delay:-1.300s">${pearls(Array.from({ length: 7 }, (_, i) => [97, 47.500 + i * 3]), 1.300)}<path d="M97 68.500c2.200 2.500 2.200 4.500 0 6.500-2.200-2-2.200-4 0-6.500z" fill="${LIL}" stroke="#3a1060" stroke-width=".5"/></g>`,
};

const css = `
#stage[data-civ=byzantines] .gob.dressed .tuft{opacity:0}
#stage[data-civ=byzantines] .bzsway{transform-box:fill-box;transform-origin:50% 0;animation:bzSway 5.800s ease-in-out infinite}
@keyframes bzSway{0%,100%{transform:rotate(-1.300deg) skewX(1.300deg)}50%{transform:rotate(1.600deg) skewX(-2deg)}}
#stage[data-civ=byzantines] .bzsheen{animation:bzSheen 4.600s linear infinite}
@keyframes bzSheen{from{transform:translateX(0)}to{transform:translateX(-75px)}}
#stage[data-civ=byzantines] .bzmed{animation:bzGlow 4s calc(var(--i)*-1.100s) ease-in-out infinite}
@keyframes bzGlow{0%,72%,100%{filter:none}84%{filter:brightness(1.400) drop-shadow(0 0 4px #fff3b0)}}
#stage[data-civ=byzantines] :is(.bzcord,.bzpend){transform-box:fill-box;transform-origin:50% 0;animation:bzSwing 3s ease-in-out infinite alternate}
@keyframes bzSwing{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
#stage[data-civ=byzantines] .bzcurt{transform-box:fill-box;transform-origin:50% 0;animation:bzCurt 6.500s ease-in-out infinite}
@keyframes bzCurt{0%,100%{transform:skewX(0)}50%{transform:skewX(-2.500deg)}}
#stage[data-civ=byzantines] .bzswag{transform-box:fill-box;transform-origin:50% 0;animation:bzSwag 4.800s ease-in-out infinite}
@keyframes bzSwag{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.100)}}
`;

export default {
  id: 'byzantines', name: 'Byzantines', kit: 'med',
  accent: '#c792ff', accent2: '#7d4bc4', cloth: '#4b1a6e', metal: GOLD,
  standard, pennant, costume, css, frame,
};
