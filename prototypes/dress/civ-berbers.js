// CIV layer: Berbers (kit: mideast). Terracotta accent, indigo cloth, silver. A woven rug banner with diamond
// lozenges and wool tassels hoisted on the pole, bead-and-tassel pendants hanging from the lintel, a tall tooled
// leather shield by the pole, and an indigo veil wrap (head and chin edge only) for the mascot. All drawings are our own.
import { dia } from './kit-mideast.js';

const CREAM = '#f1e4c8', SAFFRON = '#e8a93a', INK = '#1a1410', SILVER = '#d5dce2';
const zig = (x0, x1, y, h, step) => { let d = `M${x0} ${y}`; for (let x = x0, k = 0; x < x1; x += step, k++) d += `L${x + step} ${k % 2 ? y : y - h}`; return d; };
const loz = (cx, cy, h, w) => `<path d="${dia(cx, cy, h, w)}" fill="var(--civ)" stroke="${INK}" stroke-width="1"/>
  <path d="${dia(cx, cy, h * .7, w * .7)}" fill="${CREAM}"/><path d="${dia(cx, cy, h * .45, w * .45)}" fill="var(--civ3)"/>
  <path d="${dia(cx, cy, h * .2, w * .2)}" fill="${SAFFRON}"/>`;
const tassels = (x, ys, len, cls) => ys.map((y, i) => `<g class="${cls}" style="--i:${i}"><path d="M${x} ${y}h4" stroke="${INK}" stroke-width="1.200"/>
  <path d="M${x + 3} ${y - 2.500}l${len} -2v7z" fill="${[SAFFRON, 'var(--civ)', 'var(--civ3)'][i % 3]}" stroke="#0006" stroke-width=".5"/></g>`).join('');

const RUG = { x: 14, y: 4, w: 88, h: 76 };
const standard = `<svg width="120" height="90" viewBox="0 0 120 90">
  <defs><clipPath id="beCut"><rect x="${RUG.x}" y="${RUG.y}" width="${RUG.w}" height="${RUG.h}"/></clipPath>
    <linearGradient id="beSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".25" stop-color="#fff" stop-opacity=".12"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/><stop offset=".75" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <pattern id="beWv" patternUnits="userSpaceOnUse" width="3" height="3"><rect width="3" height="3" fill="none"/><path d="M0 0h3" stroke="#000" stroke-opacity=".14" stroke-width="1"/></pattern></defs>
  <g class="unroll" style="--d:1.350"><g class="bewave">
    <g clip-path="url(#beCut)">
      <rect x="${RUG.x}" y="${RUG.y}" width="${RUG.w}" height="${RUG.h}" fill="#7a2e1c"/>
      <rect x="${RUG.x}" y="${RUG.y}" width="${RUG.w}" height="11" fill="${CREAM}"/><rect x="${RUG.x}" y="${RUG.y + RUG.h - 11}" width="${RUG.w}" height="11" fill="${CREAM}"/>
      <path d="${zig(14, 102, 13, 6, 6)}" fill="none" stroke="${INK}" stroke-width="2"/><path d="${zig(14, 102, 77, 6, 6)}" fill="none" stroke="${INK}" stroke-width="2"/>
      <path d="M14 17h88M14 67h88" stroke="var(--civ3)" stroke-width="3"/>
      ${loz(36, 42, 20, 14)}${loz(80, 42, 20, 14)}
      <path d="${dia(58, 42, 9, 7)}" fill="${SAFFRON}" stroke="${INK}" stroke-width="1"/><path d="${dia(58, 42, 4, 3)}" fill="${INK}"/>
      <path d="M50 24l8 6 8-6M50 60l8-6 8 6M18 24l4 6M18 60l4-6M98 24l-4 6M98 60l-4-6" fill="none" stroke="${CREAM}" stroke-width="1.600"/>
      <rect x="${RUG.x}" y="${RUG.y}" width="${RUG.w}" height="${RUG.h}" fill="url(#beWv)"/>
      <rect class="besheen" x="-60" y="0" width="352" height="90" fill="url(#beSh)"/>
    </g>
    <rect x="${RUG.x}" y="${RUG.y}" width="${RUG.w}" height="${RUG.h}" fill="none" stroke="${INK}" stroke-width="1.200"/>
    ${tassels(101, [10, 22, 34, 46, 58, 70], 17, 'betas')}
  </g></g>
  <g class="pc" style="--sc:.2;--d:1.150">${[6, 30, 54, 76].map((y) => `<rect x="7" y="${y}" width="10" height="4.500" rx="2" fill="${SILVER}" stroke="#4a545c" stroke-width=".7"/>`).join('')}</g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <path d="M2 2.500h30" stroke="${SILVER}" stroke-width="2.600" stroke-linecap="round"/>
  <g class="unroll" style="--d:1.600"><g class="besway">
    <rect x="6" y="4" width="22" height="52" fill="#7a2e1c" stroke="${INK}" stroke-width="1"/>
    <rect x="6" y="4" width="22" height="6" fill="${CREAM}"/><rect x="6" y="50" width="22" height="6" fill="${CREAM}"/>
    <path d="M6 10h22M6 50h22" stroke="var(--civ3)" stroke-width="2"/>
    ${loz(17, 23, 9, 7)}${loz(17, 39, 6, 5)}
    ${[8, 12, 16, 20, 24].map((x, i) => `<path d="M${x + 1} 56l-1.500 ${12 + (i % 2) * 3}h3z" fill="${[SAFFRON, 'var(--civ)', 'var(--civ3)'][i % 3]}"/>`).join('')}
  </g></g>
</svg>`;

// bead-and-tassel pendants from the lintel; a tall tooled leather shield by the pole
const pendant = (x, len, i) => `<g transform="translate(${x} -24) scale(1.500)"><g class="pc" style="--dy:-50px;--d:${(1.05 + i * .07).toFixed(2)};--o:0"><g class="bepend" style="--i:${i}">
  <path d="M0 0V${len}" stroke="${INK}" stroke-width="1"/>
  <circle cy="${len * .35}" r="2.300" fill="${SILVER}" stroke="#4a545c" stroke-width=".5"/><circle cy="${len * .62}" r="3" fill="#d98b2b" stroke="#6b3a0a" stroke-width=".5"/>
  <path d="${dia(0, len * .82, 3.200, 2.400)}" fill="${SILVER}" stroke="#4a545c" stroke-width=".5"/>
  <path d="M-2 ${len}h4l3.500 13h-11z" fill="${[SAFFRON, 'var(--civ)', 'var(--civ3)'][i % 3]}" stroke="#0006" stroke-width=".5"/>
  <path d="M-2.500 ${len + 2}h5" stroke="${INK}" stroke-width="1.200"/></g></g></g>`;
const frame = `
${[[28, 14], [56, 17], [84, 10], [112, 16], [140, 12]].map(([x, l], i) => pendant(x, l, i)).join('')}
<g transform="translate(435 128) rotate(-5)"><g class="pc" style="--dy:-80px;--r:-40deg;--d:1.150;--o:0"><g class="beshield">
  <rect x="-14" y="-52" width="28" height="104" rx="10" fill="#b07a44" stroke="#3a2412" stroke-width="1.400"/>
  <rect x="-10.500" y="-48" width="21" height="96" rx="7" fill="none" stroke="#6b3f1c" stroke-width="1.200" stroke-dasharray="3 2"/>
  ${[-30, 0, 30].map((y) => `<path d="${dia(0, y, 11, 8)}" fill="none" stroke="#3a2412" stroke-width="1.600"/><path d="${dia(0, y, 6, 4.400)}" fill="var(--civ)" stroke="#3a2412" stroke-width=".8"/>`).join('')}
  <path d="M-10 -15h20M-10 15h20" stroke="#3a2412" stroke-width="1" stroke-dasharray="2 2"/>
  ${[[-9, -44], [9, -44], [-9, 44], [9, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.700" fill="${SILVER}" stroke="#4a545c" stroke-width=".4"/>`).join('')}
  <path d="M-11 -40c1-6 4-9 8-10" fill="none" stroke="#f0d2a6" stroke-width="1.200" opacity=".7" stroke-linecap="round"/>
</g></g></g>`;

const costume = {
  front: `
  <path class="betail" d="M40 47C31 52 27 64 29 80L35 81C34 67 37 57 44 51Z" fill="var(--civ3)" stroke="#0a0f2a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M37 52C33 30 50 15 70 15C90 15 107 30 103 52C97 45 85 42 70 42C55 42 43 45 37 52Z" fill="var(--civ3)" stroke="#0a0f2a" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M42 36c10-8 30-12 52-4M40 44c12-8 34-10 58-2M48 24c10-5 24-6 38-2" fill="none" stroke="#0a0f2a" stroke-width="1.100" opacity=".7"/>
  <path d="M46 28c8-6 18-8 28-8M44 39c8-4 16-6 24-6" fill="none" stroke="#8f9cf0" stroke-width="1.300" stroke-linecap="round" opacity=".55"/>
  <path d="M37 52C36 64 38 76 44 86L52 91C47 82 44 68 45 54C42 52 40 51 37 52Z" fill="var(--civ3)" stroke="#0a0f2a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M103 52C104 64 102 76 96 86L88 91C93 82 96 68 95 54C98 52 100 51 103 52Z" fill="var(--civ3)" stroke="#0a0f2a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M50 86C60 91 80 91 90 86L89 93C79 97 61 97 51 93Z" fill="var(--civ3)" stroke="#0a0f2a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M56 91c8 2 20 2 28 0" fill="none" stroke="#8f9cf0" stroke-width="1" opacity=".5"/>
  <path d="${dia(70, 32, 5.500, 4.200)}" fill="${SILVER}" stroke="#4a545c" stroke-width=".8"/><path d="${dia(70, 32, 2.400, 1.800)}" fill="var(--civ)"/>`,
};

const css = `
#stage[data-civ=berbers] .gob.dressed .tuft{opacity:0}
#stage[data-civ=berbers] .bewave{transform-box:fill-box;transform-origin:0 50%;animation:beWave 2.600s ease-in-out infinite alternate}
@keyframes beWave{from{transform:skewY(-3deg) scaleX(.97)}to{transform:skewY(4deg) scaleX(1.010)}}
#stage[data-civ=berbers] .besheen{animation:beSheen 2.600s ease-in-out infinite alternate}
@keyframes beSheen{from{transform:translateX(0)}to{transform:translateX(-50px)}}
#stage[data-civ=berbers] .betas{transform-box:fill-box;transform-origin:0 50%;animation:beTas calc(1.100s + var(--i)*.13s) calc(var(--i)*-.3s) ease-in-out infinite alternate}
@keyframes beTas{from{transform:rotate(-12deg)}to{transform:rotate(14deg)}}
#stage[data-civ=berbers] .besway{transform-box:fill-box;transform-origin:50% 0;animation:beSway 4.600s -1.500s ease-in-out infinite}
@keyframes beSway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
#stage[data-civ=berbers] .bepend{transform-box:fill-box;transform-origin:50% 0;animation:bePend calc(2.400s + var(--i)*.23s) calc(var(--i)*-.7s) ease-in-out infinite alternate}
@keyframes bePend{from{transform:rotate(-7deg)}to{transform:rotate(7deg)}}
#stage[data-civ=berbers] .betail{transform-box:fill-box;transform-origin:100% 0;animation:bePend 3.100s ease-in-out infinite alternate}
#stage[data-civ=berbers] .beshield{animation:beGl 5s ease-in-out infinite}
@keyframes beGl{50%{filter:drop-shadow(0 0 5px color-mix(in srgb,var(--civ) 70%,transparent))}}
`;

export default {
  id: 'berbers', name: 'Berbers', kit: 'mideast',
  accent: '#ff9b54', accent2: '#d0612a', cloth: '#26337a', metal: SILVER,
  standard, pennant, costume, css, frame,
};
