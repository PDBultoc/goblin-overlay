// CIV layer: Sicilians (kit: med). Coral accent, deep-blue Arab-Norman silk, steel. The standard is a pointed
// silk banner woven with a gold lattice and coral studs, a Norman kite shield hung over it; the frame gets citrus
// branches over the top corners, coral bead strands under the architrave and a lance with a coral pennon between
// column and pole; the mascot wears a Norman nasal helmet with a coral band over a mail coif.
// All drawings are our own (no arms, no script, no religious motif).

import { sideArm } from './kit-med.js';

const CORAL = 'var(--civ)', SILK = 'var(--civ3)', GOLD = '#d8b24a';

const SILKP = 'M20 33H100V120L60 142L20 120Z';
const lattice = (x0, y0, x1, y1, step) => { let d = '';
  for (let k = -(y1 - y0); k < x1 - x0; k += step) d += `M${x0 + k} ${y0}l${y1 - y0} ${y1 - y0}M${x1 - k} ${y0}l${-(y1 - y0)} ${y1 - y0}`;
  return d; };
const studs = (x0, y0, x1, y1, step) => { let s = '';
  for (let y = y0; y <= y1; y += step / 2) for (let x = x0 + ((y - y0) / (step / 2) % 2 ? step / 2 : 0); x <= x1; x += step) s += `<circle cx="${x}" cy="${y}" r="1.500"/>`;
  return s; };
const SHIELD = 'M60 52C73 52 81 56 81 63C81 84 70 104 60 121C50 104 39 84 39 63C39 56 47 52 60 52Z';

const defs = `<defs>
  <linearGradient id="scFold" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".14"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/><stop offset=".75" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
  <linearGradient id="scSh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
  <clipPath id="scCut"><path d="${SILKP}"/></clipPath></defs>`;

const standard = `<svg width="180" height="160" viewBox="0 0 180 160">${defs}${sideArm(29.500)}<g transform="translate(48 0)">
  <g class="unroll" style="--d:1.350"><g class="scsway">
    <g clip-path="url(#scCut)">
      <rect x="10" y="30" width="100" height="120" fill="${SILK}"/>
      <path d="${lattice(20, 33, 100, 142, 14)}" stroke="${GOLD}" stroke-width=".9" opacity=".75"/>
      <g fill="${CORAL}">${studs(20, 33, 100, 142, 14)}</g>
      <path d="${SILKP}" fill="none" stroke="${CORAL}" stroke-width="8"/>
      <path d="M24 37h72" stroke="${GOLD}" stroke-width="1.300" stroke-dasharray="3 2"/>
      <rect class="scsheen" x="-60" y="30" width="300" height="120" fill="url(#scFold)"/>
    </g>
    <path d="${SILKP}" fill="none" stroke="#0a1426" stroke-width="1.200"/>
    <circle cx="60" cy="146" r="2.400" fill="${GOLD}"/><path d="M60 148l-3.500 10h7z" fill="${CORAL}" stroke="#5a1020" stroke-width=".5"/>
  </g></g>
  <rect x="12" y="27" width="96" height="5" rx="2.500" fill="#3a3f45" stroke="#14181b" stroke-width=".7"/>
  <circle cx="12" cy="29.500" r="3.400" fill="${GOLD}" stroke="#5a3e08" stroke-width=".6"/><circle cx="108" cy="29.500" r="3.400" fill="${GOLD}" stroke="#5a3e08" stroke-width=".6"/>
  <g class="pc" style="--sc:.2;--r:-200deg;--d:1.450"><g class="scshield">
    <path d="${SHIELD}" fill="${CORAL}" stroke="#2a0a10" stroke-width="1.200"/>
    <path d="${SHIELD}" fill="url(#scSh)"/>
    <path d="M60 56C71 56 77 59 77 64C77 83 68 100 60 114C52 100 43 83 43 64C43 59 49 56 60 56Z" fill="none" stroke="${GOLD}" stroke-width="2"/>
    <path d="M48 70c4-6 9-6 12 0s8 6 12 0M50 88c3-5 7-5 10 0s7 5 10 0" fill="none" stroke="#fff2e6" stroke-width="1.400" stroke-linecap="round" opacity=".85"/>
    <circle cx="60" cy="79" r="5.500" fill="${GOLD}" stroke="#5a3e08" stroke-width=".8"/><circle cx="58.500" cy="77.500" r="1.600" fill="#fff" opacity=".7"/>
    ${[[60, 58], [46, 64], [74, 64], [60, 106]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.300" fill="${GOLD}" stroke="#5a3e08" stroke-width=".4"/>`).join('')}
  </g></g>
</g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><defs><clipPath id="scPc"><path d="M3 5H31V50L17 66L3 50Z"/></clipPath></defs>
  <g class="unroll" style="--d:1.600"><g class="scsway">
    <g clip-path="url(#scPc)"><rect width="34" height="70" fill="${SILK}"/><path d="${lattice(3, 5, 31, 66, 9)}" stroke="${GOLD}" stroke-width=".7" opacity=".75"/>
      <path d="M3 5H31V50L17 66L3 50Z" fill="none" stroke="${CORAL}" stroke-width="5"/>
      <path d="M17 18C22 18 25 19.500 25 22C25 29 21 35 17 41C13 35 9 29 9 22C9 19.500 12 18 17 18Z" fill="${CORAL}" stroke="#2a0a10" stroke-width=".8"/><circle cx="17" cy="26" r="2" fill="${GOLD}"/></g>
    <path d="M3 5H31V50L17 66L3 50Z" fill="none" stroke="#0a1426" stroke-width=".9"/>
  </g></g>
  <rect x="1" y="1" width="32" height="4.500" rx="2.200" fill="#3a3f45" stroke="#14181b" stroke-width=".6"/>
</svg>`;

// citrus branch: twig, leaves, lemons, one blossom; drawn for the left corner, mirrored for the right
const leaf = (x, y, a, s = 1) => `<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0c4-4 11-4 15 0-4 4-11 4-15 0z" fill="#3f6b33" stroke="#1d3517" stroke-width=".6"/>`;
const lemon = (x, y, a, c = '#ffd84a') => `<g transform="translate(${x} ${y}) rotate(${a})"><ellipse rx="6.500" ry="5" fill="${c}" stroke="#8a6a10" stroke-width=".7"/><path d="M6.500 0l2-1" stroke="#8a6a10" stroke-width="1"/><ellipse cx="-2" cy="-1.800" rx="2.200" ry="1.200" fill="#fff" opacity=".55"/></g>`;
// laid along the top edge of the picture: nothing reaches more than ~18 px into the camera
const branch = (flip, d) => `<g transform="translate(${flip ? 400 : 0} 0) scale(${flip ? -1.250 : 1.250} 1.250)"><g class="pc" style="--dx:-50px;--dy:-30px;--r:-50deg;--d:${d};--o:0"><g class="scbr">
  <path d="M-22 1C0 3 24 6 56 4" fill="none" stroke="#4a3220" stroke-width="2" stroke-linecap="round"/>
  ${leaf(-8, 2, 25)}${leaf(4, 3, -20, .9)}${leaf(16, 4, 30)}${leaf(28, 5, -15, .9)}${leaf(40, 5, 20, .85)}${leaf(50, 4, -25, .8)}
  ${lemon(10, 9, 70)}${lemon(34, 10, 100)}${lemon(-4, 8, 80, '#ff9a3a')}
  <g transform="translate(22 4)"><circle r="3.400" fill="#fffaf0" stroke="#d8c8a8" stroke-width=".5"/><circle r="1.300" fill="${CORAL}"/></g>
</g></g></g>`;

const strand = (x, n, i) => `<g class="scbead" style="--i:${i}">${Array.from({ length: n }, (_, k) => `<circle cx="${x}" cy="${3 + k * 4.400}" r="2.300" fill="${k % 4 === 3 ? GOLD : CORAL}" stroke="#5a1020" stroke-width=".5"/>`).join('')}
  <g transform="translate(${x} ${1 + n * 4.400}) scale(.6)"><path d="M0 0v9M0 4l-4 4M0 6l4 3M-4 8l-1.500 3M4 9l1 3" stroke="${CORAL}" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M0 0v9M0 4l-4 4M0 6l4 3" stroke="#fff" stroke-opacity=".35" stroke-width=".6" fill="none"/></g></g>`;

const frame = `
<g class="pc" style="--dy:-40px;--d:1.050;--o:0">${[96, 160, 240, 304].map((x, i) => strand(x, 2, i)).join('')}</g>
<g class="pc" style="--dy:-90px;--d:1.200;--o:0">
  <path d="M441 34V218" stroke="#5a3a1a" stroke-width="2.400"/><path d="M441 22l3 12h-6z" fill="#c9d1d8" stroke="#3a3f45" stroke-width=".6"/>
  <g class="scpen"><path d="M442 36h20l-20 12z" fill="${CORAL}" stroke="#5a1020" stroke-width=".7"/><path d="M442 40h10" stroke="${GOLD}" stroke-width=".8"/></g>
</g>
${branch(false, 1.100)}${branch(true, 1.180)}`;

const costume = {
  back: `<defs><pattern id="scMail" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="#59626b"/><circle cx="1.500" cy="1.500" r="1.100" fill="none" stroke="#c9d1d8" stroke-width=".6"/></pattern></defs>
    <path d="M35 44C32 60 34 74 39 84H101C106 74 108 60 105 44Z" fill="url(#scMail)" stroke="#2a3036" stroke-width="1"/>`,
  front: `<defs><linearGradient id="scSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".45" stop-color="#aab4bc"/><stop offset="1" stop-color="#4c545b"/></linearGradient></defs>
  <path d="M41 45C42 30 56 12 70 1C84 12 98 30 99 45Z" fill="url(#scSteel)" stroke="#1d2226" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M70 2V44M57 13C52 23 50 34 50 44M83 13C88 23 90 34 90 44" fill="none" stroke="${GOLD}" stroke-width="1.600"/>
  <path d="M62 10c-4 5-7 11-9 17" stroke="#fff" stroke-opacity=".75" stroke-width="1.500" stroke-linecap="round" fill="none"/>
  <path d="M40 41C52 45 88 45 100 41V47C88 51 52 51 40 47Z" fill="${CORAL}" stroke="#2a0a10" stroke-width="1"/>
  <g fill="${GOLD}" stroke="#5a3e08" stroke-width=".4"><circle cx="46" cy="45.300" r="1.200"/><circle cx="58" cy="47" r="1.200"/><circle cx="82" cy="47" r="1.200"/><circle cx="94" cy="45.300" r="1.200"/></g>
  <path d="M67.600 46H72.400V55.500L70 59.500L67.600 55.500Z" fill="url(#scSteel)" stroke="#1d2226" stroke-width=".9" stroke-linejoin="round"/>`,
};

const css = `
#stage[data-civ=sicilians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=sicilians] .scsway{transform-box:fill-box;transform-origin:50% 0;animation:scSway 5.400s ease-in-out infinite}
@keyframes scSway{0%,100%{transform:rotate(-1.500deg) skewX(1.500deg)}50%{transform:rotate(1.800deg) skewX(-2.400deg)}}
#stage[data-civ=sicilians] .scsheen{animation:scSheen 4s linear infinite}
@keyframes scSheen{from{transform:translateX(0)}to{transform:translateX(-75px)}}
#stage[data-civ=sicilians] .scshield{transform-box:fill-box;transform-origin:50% 0;animation:scSwing 5.400s -.6s ease-in-out infinite}
@keyframes scSwing{0%,100%{transform:rotate(2deg)}50%{transform:rotate(-2.500deg)}}
#stage[data-civ=sicilians] .scbr{transform-box:fill-box;transform-origin:0 0;animation:scBr 4.600s ease-in-out infinite alternate}
@keyframes scBr{from{transform:rotate(-2deg)}to{transform:rotate(3deg)}}
#stage[data-civ=sicilians] .scbead{transform-box:fill-box;transform-origin:50% 0;animation:scBead calc(2.600s + var(--i)*.4s) ease-in-out infinite alternate}
@keyframes scBead{from{transform:rotate(-7deg)}to{transform:rotate(7deg)}}
#stage[data-civ=sicilians] .scpen{transform-box:fill-box;transform-origin:0 50%;animation:scPen 1.700s ease-in-out infinite alternate}
@keyframes scPen{from{transform:skewY(-8deg) scaleX(.9)}to{transform:skewY(6deg) scaleX(1.050)}}
`;

export default {
  id: 'sicilians', name: 'Sicilians', kit: 'med',
  accent: '#ff5f7e', accent2: '#c23552', cloth: '#1f3f6e', metal: GOLD,
  standard, pennant, costume, css, frame,
};
