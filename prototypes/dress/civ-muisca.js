// CIV layer: Muisca (kit: andes). Tumbaga copper accent, painted cotton in red-brown and black, hammered gold.
// Standard: a painted cotton mantle with stamped spirals and sewn-on hammered-gold plaques.
// Frame: a row of hammered tumbaga plaques dangling under the lintel, a striped woven cotton bag hung on the pole.
// Mascot: a wide, low feather crown behind a broad hammered-gold forehead plate. All drawings are our own.
import { plume } from './kit-andes.js';

const PAINT = 'var(--civ3)', INK = '#2a1d14', COTTON = '#f1e8d4', GOLD = '#e8b25a';

// a stamped spiral (Archimedean), centre x,y, radius r
const spiral = (x, y, r, col, w = 1.300) => { let d = ''; for (let a = 0; a <= Math.PI * 5; a += .35) { const q = r * a / (Math.PI * 5);
  d += (a ? 'L' : 'M') + (x + Math.cos(a) * q).toFixed(1) + ' ' + (y + Math.sin(a) * q).toFixed(1); } return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`; };
const plaque = (x, y, r, i) => `<g class="musq" style="--i:${i}"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#muiscaGold)" stroke="#6b3a10" stroke-width=".7"/>
  <circle cx="${x}" cy="${y}" r="${(r * .55).toFixed(1)}" fill="none" stroke="#6b3a10" stroke-width=".4" stroke-dasharray=".8 1"/></g>`;

const standard = `<svg width="90" height="140" viewBox="0 0 90 140">
  <defs><radialGradient id="muiscaGold" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe1a6"/><stop offset=".5" stop-color="${GOLD}"/><stop offset="1" stop-color="#9a5a1c"/></radialGradient>
    <pattern id="muiscaWeave" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="${COTTON}"/><path d="M0 .5h3M1.500 0v3" stroke="#d9cdb3" stroke-width=".5"/></pattern></defs>
  <path d="M10 0v6M45 0v5M80 0v6" stroke="#5a3a22" stroke-width="1.600"/>
  <g class="unroll" style="--d:1.350"><g class="acs" style="--k:.6">
    <path d="M5 4H85Q87 60 84 116Q65 122 45 117Q25 122 6 116Q3 60 5 4z" fill="url(#muiscaWeave)" stroke="${INK}" stroke-width="1.100"/>
    <path d="M10 10H80M10 13H80M10 107H80M10 110H80M10 10V110M80 10V110" stroke="${PAINT}" stroke-width="1.600" fill="none"/>
    <path d="M14 18H76V102H14z" fill="none" stroke="${INK}" stroke-width=".9" stroke-dasharray="3 2"/>
    ${[0, 1, 2, 3].map((row) => [0, 1, 2].map((c) => spiral(26 + c * 19 + (row % 2) * 2, 30 + row * 20, 7, row % 2 ? INK : PAINT)).join('')).join('')}
    ${[[35.5, 40, 0], [54.5, 40, 1], [35.5, 80, 2], [54.5, 80, 3], [16.5, 60, 4], [73.5, 60, 5]].map(([x, y, i]) => plaque(x, y, 3.400, i)).join('')}
    <path d="M5 4Q7 60 6 116" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="4"/>
    <g class="fin" style="--d:2">${Array.from({ length: 13 }, (_, i) => `<path d="M${9 + i * 6} ${118 - Math.abs(6 - i) * .5}v${6 + (i % 2) * 3}" stroke="${i % 3 ? COTTON : PAINT}" stroke-width="1.800" stroke-linecap="round"/>`).join('')}</g>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <path d="M5 2h24" stroke="#c9a77a" stroke-width="2.400" stroke-linecap="round"/>
  <g class="unroll" style="--d:1.600">${[0, 1, 2].map((i) => `<g class="acs" style="--k:.${3 + i * 2}"><path d="M${10 + i * 7} 2V${26 + (i % 2) * 14}" stroke="#c9a77a" stroke-width="1"/>
    <rect x="${6 + i * 7}" y="${26 + (i % 2) * 14}" width="8" height="${18 - (i % 2) * 6}" rx="1" fill="url(#muiscaGoldP)" stroke="#6b3a10" stroke-width=".7"/>
    <path class="musq" style="--i:${i + 6}" d="M${7.500 + i * 7} ${28 + (i % 2) * 14}h5" stroke="#fff" stroke-width="1.100" stroke-linecap="round"/></g>`).join('')}</g>
  <defs><linearGradient id="muiscaGoldP" x1="0" x2="1"><stop offset="0" stop-color="#9a5a1c"/><stop offset=".45" stop-color="#ffd890"/><stop offset="1" stop-color="#b06a24"/></linearGradient></defs>
</svg>`;

// tumbaga plaques dangling under the lintel; a woven cotton bag on the pole
const dangle = (x, i) => { const len = 8 + (i % 3) * 3, sq = i % 2;
  return `<g transform="translate(${x} 5)"><g class="musw" style="--i:${i}"><path d="M0 0V${len}" stroke="#c9a77a" stroke-width=".9"/>
    ${sq ? `<rect x="-3.500" y="${len}" width="7" height="9" rx=".8" fill="url(#muiscaGoldF)" stroke="#6b3a10" stroke-width=".6"/>` : `<circle cx="0" cy="${len + 4}" r="4" fill="url(#muiscaGoldF)" stroke="#6b3a10" stroke-width=".6"/>`}
    <path class="musq" style="--i:${i}" d="M-2 ${len + 2}h3" stroke="#fff" stroke-width="1" stroke-linecap="round"/></g></g>`; };
const frame = `<defs><radialGradient id="muiscaGoldF" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe1a6"/><stop offset=".5" stop-color="${GOLD}"/><stop offset="1" stop-color="#8a4c16"/></radialGradient></defs>
<g class="pc" style="--dy:-40px;--d:1.100;--o:0"><path d="M18 5.500H200" stroke="#5a3a22" stroke-width="1.400"/>${Array.from({ length: 10 }, (_, i) => dangle(26 + i * 19, i)).join('')}</g>
<g class="pc" style="--dy:-80px;--r:25deg;--d:1.050;--o:0">
  <path d="M458 28L436 62M458 28L452 62" stroke="#7a5232" stroke-width="1.600" fill="none"/>
  <g transform="translate(444 0)"><g class="acs" style="--k:.4">
    <path d="M-10 60h20l2 34q-12 5-24 0z" fill="${COTTON}" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
    <path d="M-10 66h20M-10.300 72h20.600M-10.700 80h21.400M-11 88h22" stroke="${PAINT}" stroke-width="2"/>
    <path d="M-10 69h20M-10.500 76h21M-10.800 84h21.600" stroke="${INK}" stroke-width=".9"/>
    <path d="M-7 92v7M-3 93v7M1 93v7M5 93v7M9 92v7" stroke="${PAINT}" stroke-width="1.300" stroke-linecap="round"/>
  </g></g>
</g>`;

// crown: a low, wide fan behind the head; a broad hammered plate on the forehead
const fan = [-82, -64, -46, -30, -15, 0, 15, 30, 46, 64, 82];
const costume = {
  back: fan.map((a, i) => `<g transform="rotate(${a} 70 47) translate(70 37)">${plume(25 + (5 - Math.abs(5 - i)) * 1.600, 5.200, i % 2 ? COTTON : 'var(--civ)', i % 2 ? '#5a3a22' : PAINT, 'af', i)}</g>`).join(''),
  front: `
  <defs><linearGradient id="muiscaPlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3a8"/><stop offset=".45" stop-color="${GOLD}"/><stop offset="1" stop-color="#a0601e"/></linearGradient></defs>
  <path d="M43 47.500L47 34Q70 27 93 34L97 47.500Q70 42.500 43 47.500z" fill="url(#muiscaPlate)" stroke="#6b3a10" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M49 37Q70 31.500 91 37" fill="none" stroke="#6b3a10" stroke-width=".8" stroke-dasharray="1 1.800"/>
  <path d="M47 44Q70 39.500 93 44" fill="none" stroke="#6b3a10" stroke-width=".8" stroke-dasharray="1 1.800"/>
  ${[56, 63, 70, 77, 84].map((x, i) => `<circle cx="${x}" cy="${40.500 - (2 - Math.abs(2 - i)) * .4}" r="1.500" fill="none" stroke="#6b3a10" stroke-width=".7"/>`).join('')}
  <path class="musq" style="--i:3" d="M51 35.500Q60 33 66 32.800" fill="none" stroke="#fff" stroke-width="1.400" stroke-linecap="round"/>
  <g class="musw" style="--i:2"><path d="M45 47v2" stroke="#6b3a10" stroke-width=".7"/><rect x="42.500" y="48.500" width="5" height="3.800" rx=".6" fill="${GOLD}" stroke="#6b3a10" stroke-width=".5"/></g>
  <g class="musw" style="--i:5"><path d="M95 47v2" stroke="#6b3a10" stroke-width=".7"/><rect x="92.500" y="48.500" width="5" height="3.800" rx=".6" fill="${GOLD}" stroke="#6b3a10" stroke-width=".5"/></g>`,
};

const css = `
#stage[data-civ=muisca] .gob.dressed .tuft{opacity:0}
#stage[data-civ=muisca] .musq{animation:musGlint 3.600s calc(var(--i)*-.53s) ease-in-out infinite}
@keyframes musGlint{0%,68%,100%{opacity:.35}80%{opacity:1;filter:drop-shadow(0 0 2px #fff)}}
#stage[data-civ=muisca] .musw{transform-box:fill-box;transform-origin:50% 0;animation:musSw calc(1.900s + var(--i)*.13s) calc(var(--i)*-.37s) ease-in-out infinite alternate}
@keyframes musSw{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
`;

export default {
  id: 'muisca', name: 'Muisca', kit: 'andes',
  accent: '#ff9a52', accent2: '#d9661f', cloth: '#9c3a24', metal: GOLD,
  standard, pennant, costume, css, frame,
};
