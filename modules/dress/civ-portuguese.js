// CIV layer: Portuguese (kit: med). Ocean-cyan accent, sail canvas, blue-and-white tiles. The standard is a
// caravel's square sail on its yard with rigging, a tile border and a band of sea waves; the frame gets hemp rope
// swags under the architrave, a tile band on the sill and a navigator's sandglass between column and pole; the
// mascot wears a wide-brim navigator's hat with a streaming ribbon. All drawings are our own
// (no armillary sphere, no cross, no anchor).

import { sideArm } from './kit-med.js';

const CYAN = 'var(--civ)', CANVAS = 'var(--civ3)', BLUE = '#1f5fb0', NAVY = '#123a73', GOLD = '#d6a845';

const tile = (id) => `<pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse">
  <rect width="9" height="9" fill="#f4f6fa"/><path d="M4.500 1.200L7.800 4.500L4.500 7.800L1.200 4.500Z" fill="none" stroke="${BLUE}" stroke-width=".9"/>
  <circle cx="4.500" cy="4.500" r="1.100" fill="${BLUE}"/><path d="M0 1.800A1.800 1.800 0 0 0 1.800 0M7.200 0A1.800 1.800 0 0 0 9 1.800M9 7.200A1.800 1.800 0 0 0 7.200 9M1.800 9A1.800 1.800 0 0 0 0 7.200" fill="none" stroke="${NAVY}" stroke-width=".9"/>
  <rect width="9" height="9" fill="none" stroke="#b9c4d4" stroke-width=".4"/></pattern>`;

const waves = (x0, x1, y, w, col, sw) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += w) d += `q${w / 4} ${-w / 2.2} ${w / 2} 0t${w / 2} 0`; return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`; };

const SAIL = 'M18 33H102C107 60 107 90 100 115C80 121 40 121 20 115C13 90 13 60 18 33Z';
const INNER = 'M27 42H93C97 64 97 88 92 106C76 111 44 111 28 106C23 88 23 64 27 42Z';

const standard = `<svg width="180" height="160" viewBox="0 0 180 160"><defs>${tile('ptTile')}
  <radialGradient id="ptBelly" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3a2a10" stop-opacity=".3"/></radialGradient>
  <linearGradient id="ptWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98a52"/><stop offset="1" stop-color="#5a3a1a"/></linearGradient>
  <clipPath id="ptSc"><path d="${SAIL}"/></clipPath><clipPath id="ptIn"><path d="${INNER}"/></clipPath></defs>
  ${sideArm(29.700)}
  <g class="fin" style="--d:1.800" stroke="#2c2014" stroke-width=".8" fill="none">
    <path d="M60 -4L161 29M60 -4L112 29"/><path d="M71 116L60 146"/>
    <circle cx="110" cy="12.500" r="1.800" fill="#5a3a1a"/><circle cx="65" cy="131" r="1.800" fill="#5a3a1a"/>
  </g>
  <g transform="translate(51 0)">
  <g class="unroll" style="--d:1.350"><g class="ptbelly">
    <path d="${SAIL}" fill="url(#ptTile)" stroke="#16243a" stroke-width="1.100"/>
    <path d="${INNER}" fill="${CANVAS}" stroke="${NAVY}" stroke-width="1"/>
    <g clip-path="url(#ptIn)">
      <rect x="20" y="42" width="80" height="6" fill="${CYAN}"/><rect x="20" y="48" width="80" height="1.500" fill="${NAVY}"/>
      <path d="M36 43v68M52 43v68M68 43v68M84 43v68" stroke="#0002" stroke-width="1.100"/>
      <path d="M28 82q8-7 16 0t16 0t16 0t16 0V115H28Z" fill="${BLUE}"/><path d="M28 92q8-7 16 0t16 0t16 0t16 0V115H28Z" fill="${NAVY}"/>
      ${waves(28, 92, 82, 16, CYAN, 2.400)}${waves(20, 96, 92, 16, CYAN, 1.600)}${waves(28, 92, 101, 12, '#7fd9ff', 1.100)}
    </g>
    <g transform="translate(40 58)"><path d="M0 5q5-6 10 0q5-6 10 0" fill="none" stroke="${NAVY}" stroke-width="1.600" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g transform="translate(64 66)"><path d="M0 4q4-5 8 0q4-5 8 0" fill="none" stroke="${NAVY}" stroke-width="1.400" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g clip-path="url(#ptSc)"><rect class="ptsheen" x="0" y="30" width="120" height="95" fill="url(#ptBelly)"/></g>
  </g></g>
  <rect x="9" y="27" width="102" height="5.500" rx="2.700" fill="url(#ptWood)" stroke="#2c2014" stroke-width=".7"/>
  <circle cx="9.500" cy="29.700" r="2.300" fill="${GOLD}"/><circle cx="110.500" cy="29.700" r="2.300" fill="${GOLD}"/>
  <g class="unroll" style="--d:1.600"><g class="ptstream"><path d="M110 30c6 2 12 0 18 3l-2 3 4 2c-7 0-13-2-19-3z" fill="${CYAN}" stroke="${NAVY}" stroke-width=".6"/></g></g>
</g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><defs>${tile('ptPt')}</defs>
  <g class="unroll" style="--d:1.600"><g class="ptbelly">
    <path d="M4 6H30C32 24 32 42 29 56C22 59 12 59 5 56C2 42 2 24 4 6Z" fill="url(#ptPt)" stroke="#16243a" stroke-width=".9"/>
    <path d="M9 11H25C27 25 27 38 25 49C20 51 14 51 9 49C7 38 7 25 9 11Z" fill="${CANVAS}"/>
    ${waves(9, 25, 42, 8, CYAN, 1.600)}${waves(9, 25, 36, 8, BLUE, 1.300)}
  </g></g>
  <rect x="1" y="2" width="32" height="4.500" rx="2.200" fill="#8a6234" stroke="#2c2014" stroke-width=".6"/>
</svg>`;

// hemp rope: a light strand with a dark twist laid over it
const rope = (d) => `<path d="${d}" fill="none" stroke="#5c4422" stroke-width="4.200" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#c49a5c" stroke-width="3" stroke-linecap="round"/>
  <path d="${d}" fill="none" stroke="#6d4f27" stroke-width="3" stroke-dasharray="1.300 2.200"/>`;
const swags = [8, 104, 200, 296, 392];
const frame = `<defs>${tile('ptFTile')}</defs>
<g class="pc" style="--dy:60px;--d:1.000;--o:0">
  <rect x="-38" y="223.500" width="476" height="11" fill="url(#ptFTile)"/><rect x="-38" y="222.500" width="476" height="1.600" fill="${GOLD}"/><rect x="-38" y="234" width="476" height="1.200" fill="${NAVY}"/>
</g>
<g class="pc" style="--dy:-50px;--d:1.100;--o:0"><g class="ptswag">
  ${swags.slice(0, -1).map((x, i) => rope(`M${x} 3Q${x + 48} 26 ${swags[i + 1]} 3`)).join('')}
  ${swags.map((x) => `<circle cx="${x}" cy="3.500" r="3.800" fill="#a47c44" stroke="#5c4422" stroke-width="1"/>${rope(`M${x} 6c-2 3 1 5-1 8`)}`).join('')}
</g></g>
<g transform="translate(441 50)"><g class="pc" style="--dy:-60px;--r:-40deg;--d:1.200;--o:0"><g class="ptglass">
  <path d="M0 0v9" stroke="#5c4422" stroke-width="1.600"/>
  <rect x="-11" y="9" width="22" height="4" rx="1" fill="${GOLD}" stroke="#5a3e08" stroke-width=".6"/><rect x="-11" y="47" width="22" height="4" rx="1" fill="${GOLD}" stroke="#5a3e08" stroke-width=".6"/>
  <path d="M-9 13v34M9 13v34" stroke="#7a5212" stroke-width="2"/>
  <path d="M-7 13C-7 24 -1.500 26 -1 30C-1.500 34 -7 36 -7 47H7C7 36 1.500 34 1 30C1.500 26 7 24 7 13Z" fill="#cfefff" fill-opacity=".35" stroke="#e8f6ff" stroke-width=".8"/>
  <path d="M-5 20C-4 25 -1 26.500 0 28.500C1 26.500 4 25 5 20Z" fill="#e3c27a"/>
  <path d="M-6 47C-5 41 -2 39 0 38C2 39 5 41 6 47Z" fill="#e3c27a"/>
  <path class="ptsand" d="M0 29v10" stroke="#e3c27a" stroke-width="1.100" stroke-dasharray="1.200 1.200"/>
  <path d="M-5 16c0 4 1 6 2.500 8" stroke="#fff" stroke-opacity=".7" stroke-width=".8" fill="none"/>
</g></g></g>`;

const costume = {
  back: `<g class="ptstream"><path d="M92 36c10-3 20 2 30-4-2 5-6 8-10 9 5 2 10 1 14 4-11 3-24 0-34-3z" fill="${CYAN}" stroke="${NAVY}" stroke-width=".8"/>
    <path d="M96 37c8-1 16 1 24-2" stroke="#fff" stroke-opacity=".6" stroke-width=".7" fill="none"/></g>`,
  front: `<defs><linearGradient id="ptFelt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4258"/><stop offset="1" stop-color="#1b1722"/></linearGradient>
    <radialGradient id="ptBrim" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#5a5168"/><stop offset="1" stop-color="#211c29"/></radialGradient></defs>
  <ellipse cx="70" cy="42.500" rx="55" ry="8.500" fill="#120f17"/>
  <ellipse cx="70" cy="41" rx="55" ry="8.500" fill="url(#ptBrim)" stroke="#0c0a0f" stroke-width="1.100"/>
  <path d="M17 41.500c6 6 30 9 53 9s47-3 53-9" fill="none" stroke="${CYAN}" stroke-width="1" opacity=".8"/>
  <path d="M47 41C46 26 52 14 70 14s24 12 23 27c-6 3-40 3-46 0z" fill="url(#ptFelt)" stroke="#0c0a0f" stroke-width="1.100"/>
  <path d="M60 16c4 3 16 3 20 0" stroke="#0008" stroke-width="1.200" fill="none"/>
  <path d="M51 26c1-5 4-8 9-10" stroke="#fff" stroke-opacity=".35" stroke-width="1.300" stroke-linecap="round" fill="none"/>
  <path d="M47 33.500c6 2.500 40 2.500 46 0v5.500c-6 2.500-40 2.500-46 0z" fill="${CYAN}" stroke="${NAVY}" stroke-width=".7"/>
  <rect x="64.500" y="34.300" width="11" height="6.400" rx="1" fill="none" stroke="${GOLD}" stroke-width="1.400"/><path d="M70 35v5" stroke="${GOLD}" stroke-width="1"/>`,
};

const css = `
#stage[data-civ=portuguese] .gob.dressed .tuft{opacity:0}
#stage[data-civ=portuguese] .ptbelly{transform-box:fill-box;transform-origin:50% 0;animation:ptBelly 4.200s ease-in-out infinite}
@keyframes ptBelly{0%,100%{transform:scaleX(.965) skewX(1.500deg)}50%{transform:scaleX(1.025) skewX(-2deg)}}
#stage[data-civ=portuguese] .ptsheen{animation:ptSheen 4.200s ease-in-out infinite}
@keyframes ptSheen{0%,100%{transform:translateX(-10px)}50%{transform:translateX(10px)}}
#stage[data-civ=portuguese] .ptstream{transform-box:fill-box;transform-origin:0 50%;animation:ptStream 1.600s ease-in-out infinite alternate}
@keyframes ptStream{from{transform:skewY(-6deg) scaleX(.92)}to{transform:skewY(5deg) scaleX(1.050)}}
#stage[data-civ=portuguese] .ptswag{transform-box:fill-box;transform-origin:50% 0;animation:ptSwag 5.500s ease-in-out infinite}
@keyframes ptSwag{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.080)}}
#stage[data-civ=portuguese] .ptglass{transform-box:fill-box;transform-origin:50% 0;animation:ptGlass 4.800s ease-in-out infinite}
@keyframes ptGlass{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
#stage[data-civ=portuguese] .ptsand{animation:ptSand .5s linear infinite}
@keyframes ptSand{to{stroke-dashoffset:-2.400}}
`;

export default {
  id: 'portuguese', name: 'Portuguese', kit: 'med',
  accent: '#3fe0ff', accent2: '#1a8fb5', cloth: '#f1ead8', metal: GOLD,
  standard, pennant, costume, css, frame,
};
