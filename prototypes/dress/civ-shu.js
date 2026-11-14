// CIV layer: Shu (kit: eastasia). Lavender accent, violet roof glaze, aubergine cloth. A hanging banner with a
// repeating crossbow and rattan-shield motif and swallowtail points, two rattan shields hung between the right pillar
// and the pole, a crossbow hung on the left pillar, and a scholar's guan cap with a feather fan held at the side for
// the mascot. All drawings are our own.
const f1 = (n) => (+n.toFixed(1)).toString();
const CREAM = '#f1e6c8';

// motif: crossbow pointing up, centred on 0,0 (about 22 x 24)
const xbow = (x, y, s = 1, bow = 'var(--civ)') => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 -6V10" stroke="${CREAM}" stroke-width="2.800" stroke-linecap="round"/>
  <path d="M-10.500 -1.500Q0 -11 10.500 -1.500" fill="none" stroke="${bow}" stroke-width="2.400" stroke-linecap="round"/>
  <path d="M-10.500 -1.500L0 3.500L10.500 -1.500" fill="none" stroke="${CREAM}" stroke-width=".8"/>
  <path d="M0 5l-3.500 4.500" stroke="${CREAM}" stroke-width="1.600" stroke-linecap="round"/>
</g>`;
// motif: round woven rattan shield
const shield = (x, y, r, cls = '') => `<g class="${cls}" transform="translate(${x} ${y})">
  <circle r="${r}" fill="#c9a46a" stroke="#4a2e14" stroke-width="${f1(r * .1)}"/>
  ${[.78, .56, .34].map((k) => `<circle r="${f1(r * k)}" fill="none" stroke="#7a5626" stroke-width="${f1(r * .1)}" stroke-dasharray="${f1(r * .14)} ${f1(r * .1)}"/>`).join('')}
  <circle r="${f1(r * .2)}" fill="var(--civ)" stroke="#3a1f5a" stroke-width="${f1(r * .06)}"/>
  <path d="M${f1(-r * .7)} ${f1(-r * .3)}A${r * .76} ${r * .76} 0 0 1 ${f1(-r * .1)} ${f1(-r * .75)}" fill="none" stroke="#fff6d8" stroke-opacity=".5" stroke-width="${f1(r * .1)}" stroke-linecap="round"/>
</g>`;

const BANNER = 'M18 8H96V128L83 142L70 128L57 142L44 128L31 142L18 128Z';
const standard = `<svg width="112" height="160" viewBox="0 0 112 160">
  <defs><clipPath id="shCl"><path d="${BANNER}"/></clipPath>
  <linearGradient id="shSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".16"/><stop offset=".55" stop-color="#000" stop-opacity=".22"/><stop offset=".8" stop-color="#fff" stop-opacity=".13"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <g class="unroll" style="--d:1.350"><g class="sflut">
    <g clip-path="url(#shCl)">
      <rect x="10" y="0" width="100" height="150" fill="var(--civ3)"/>
      <path d="${BANNER}" fill="none" stroke="var(--civ)" stroke-width="10"/>
      <path d="M26 16H88V124M26 16V124" fill="none" stroke="#e8c06a" stroke-width=".9" opacity=".8"/>
      ${[0, 1, 2, 3].map((row) => [0, 1].map((col) => { const x = 41 + col * 32, y = 32 + row * 26; return (row + col) % 2 ? shield(x, y, 9) : xbow(x, y); }).join('')).join('')}
      <rect class="ssheen" x="-90" y="0" width="300" height="150" fill="url(#shSh)"/>
    </g>
    <path d="${BANNER}" fill="none" stroke="#1d1030" stroke-width="1.100" stroke-linejoin="round"/>
    ${[31, 57, 83].map((x, i) => `<g class="stas" style="--i:${i}"><path d="M${x} 142v4" stroke="#3a1f5a" stroke-width="1.100"/><circle cx="${x}" cy="147" r="2" fill="#e8c06a" stroke="#5a3d10" stroke-width=".5"/><path d="M${x - 2.500} 149h5l1.500 11h-8z" fill="var(--civ)" stroke="#3a1f5a" stroke-width=".5"/></g>`).join('')}
  </g></g>
  <g class="pc" style="--dx:-40px;--d:1.150">
    <rect x="10" y="4" width="92" height="4.500" rx="2" fill="#3a2a1a" stroke="#120a04" stroke-width=".6"/>
    <path d="M102 2.500l5 3.700-5 3.700-3-3.700z" fill="#e8c06a" stroke="#5a3d10" stroke-width=".6"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <g class="unroll" style="--d:1.600"><g class="sflut" style="animation-delay:-2s">
    <path d="M5 5H29V58L23 66L17 58L11 66L5 58Z" fill="var(--civ3)" stroke="var(--civ)" stroke-width="2.400" stroke-linejoin="round"/>
    ${xbow(17, 21, .7)}${shield(17, 45, 7)}
  </g></g>
  <rect x="2" y="2" width="30" height="3.500" rx="1.500" fill="#3a2a1a"/>
</svg>`;

// frame: two rattan shields hung on cords from the upper strut; a crossbow hung on the left pillar
const frame = `<g class="pc" style="--dy:-80px;--r:-90deg;--d:1.100;--o:0"><g class="shang">
  <path d="M430 45L436 54M442 45L436 54" stroke="#4a2e14" stroke-width="1"/>
  ${shield(436, 68, 14)}
  <path d="M436 82v6" stroke="#4a2e14" stroke-width="1"/>
  ${shield(436, 100, 12)}
</g></g>
<g class="pc" style="--dx:-60px;--r:40deg;--d:1.180;--o:0"><g class="shang" style="animation-delay:-1.700s">
  <path d="M-11 34v12" stroke="#4a2e14" stroke-width="1.200"/><circle cx="-11" cy="34" r="2" fill="#e8c06a" stroke="#5a3d10" stroke-width=".5"/>
  <g transform="translate(-11 80) scale(1.600)">
    <path d="M0 -16V18" stroke="#3a2412" stroke-width="5" stroke-linecap="round"/><path d="M0 -16V18" stroke="#8a5a2c" stroke-width="3.200" stroke-linecap="round"/>
    <path d="M-12 -12Q0 -24 12 -12" fill="none" stroke="#1d1030" stroke-width="3.400" stroke-linecap="round"/><path d="M-12 -12Q0 -24 12 -12" fill="none" stroke="var(--civ)" stroke-width="2" stroke-linecap="round"/>
    <path d="M-12 -12L0 -5L12 -12" fill="none" stroke="${CREAM}" stroke-width=".7"/>
    <rect x="-2.500" y="-7" width="5" height="5" rx="1" fill="#c9a24f" stroke="#5a3d10" stroke-width=".5"/><path d="M0 0l-4 6" stroke="#3a2412" stroke-width="1.400" stroke-linecap="round"/>
  </g>
</g></g>`;

const costume = {
  back: `
  <g class="srib"><path d="M60 22C50 30 44 44 40 62L44 63C47 47 52 34 62 25Z" fill="var(--civ)" stroke="#3a1f5a" stroke-width=".6"/></g>
  <g class="srib r"><path d="M80 22C90 30 96 44 100 62L96 63C93 47 88 34 78 25Z" fill="var(--civ)" stroke="#3a1f5a" stroke-width=".6"/></g>`,
  front: `
  <path d="M45 36C55 33 85 33 95 36V41C85 38 55 38 45 41Z" fill="#141018" stroke="#000" stroke-width=".8"/>
  <path d="M60 34L61.500 16Q70 11 78.500 16L80 34Z" fill="#17131c" stroke="#000" stroke-width="1"/>
  <path d="M64 33.500l.5-16M70 33.500V14M76 33.500l-.5-16" stroke="#6a5f78" stroke-width=".7"/>
  <path d="M62.500 30Q70 27 77.500 30" fill="none" stroke="var(--civ)" stroke-width="1.200"/>
  <path d="M63 20c1-3 3-4 6-4.500" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.200" stroke-linecap="round"/>
  <path d="M50 31H90" stroke="#5a3d10" stroke-width="3"/><path d="M50 31H90" stroke="#e8c06a" stroke-width="1.800"/>
  <circle cx="49" cy="31" r="2.300" fill="#e8c06a" stroke="#5a3d10" stroke-width=".6"/><circle cx="91" cy="31" r="2.300" fill="var(--civ)" stroke="#3a1f5a" stroke-width=".6"/>
  <g class="sfan"><g transform="translate(104 91)">
    <path d="M0 0L5 -20" stroke="#3a2412" stroke-width="3.400" stroke-linecap="round"/><path d="M0 0L5 -20" stroke="#8a5a2c" stroke-width="2" stroke-linecap="round"/>
    <circle cx="0" cy="1" r="1.800" fill="var(--civ)"/><path d="M0 2l-2 9M0 2l1 9" stroke="var(--civ)" stroke-width="1"/>
    <path d="M5 -20C-6 -34 -2 -56 14 -62C30 -64 40 -48 34 -30C28 -22 14 -18 5 -20Z" fill="#f6f2ea" stroke="#5a5048" stroke-width="1"/>
    ${[-62, -48, -34, -20, -6, 8, 22].map((a) => { const rad = (a - 90) * Math.PI / 180; return `<path d="M5 -20L${f1(12 + Math.cos(rad) * 36)} ${f1(-36 + Math.sin(rad) * 26)}" stroke="#c8beb0" stroke-width=".8"/>`; }).join('')}
    <path d="M-1 -40C1 -54 8 -61 14 -62C22 -63 30 -59 34 -50C30 -56 22 -58 14 -57C8 -56 3 -50 -1 -40Z" fill="var(--civ2)" opacity=".85"/>
    <path d="M2 -25C3 -22 4 -21 5 -20" stroke="#5a5048" stroke-width=".8"/>
    <rect x="1" y="-24" width="8" height="5" rx="1.500" fill="#e8c06a" stroke="#5a3d10" stroke-width=".6" transform="rotate(14 5 -21)"/>
  </g></g>`,
};

const css = `
#stage[data-civ=shu]{--eaglz:#55467c}
#stage[data-civ=shu] .gob.dressed .tuft{opacity:0}
#stage[data-civ=shu] .sflut{transform-box:fill-box;transform-origin:50% 0;animation:sFlutS 4.200s ease-in-out infinite}
@keyframes sFlutS{0%,100%{transform:skewX(-2deg)}50%{transform:skewX(2.500deg) scaleY(1.010)}}
#stage[data-civ=shu] .ssheen{animation:sSheenS 4.600s linear infinite}
@keyframes sSheenS{from{transform:translateX(0)}to{transform:translateX(100px)}}
#stage[data-civ=shu] .stas{transform-box:fill-box;transform-origin:50% 0;animation:sTas calc(1.800s + var(--i)*.3s) ease-in-out infinite alternate}
@keyframes sTas{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
#stage[data-civ=shu] .shang{transform-box:fill-box;transform-origin:50% 0;animation:sHang 3.400s ease-in-out infinite alternate}
@keyframes sHang{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}
#stage[data-civ=shu] .sfan{transform-box:fill-box;transform-origin:30% 100%;animation:sFan 2.600s ease-in-out infinite alternate}
@keyframes sFan{from{transform:rotate(-7deg)}to{transform:rotate(5deg)}}
#stage[data-civ=shu] .srib{transform-box:fill-box;transform-origin:50% 0;animation:sRib 2.900s ease-in-out infinite alternate}
#stage[data-civ=shu] .srib.r{animation-delay:-1.450s}
@keyframes sRib{from{transform:skewX(-6deg)}to{transform:skewX(6deg)}}
`;

export default {
  id: 'shu', name: 'Shu', kit: 'eastasia',
  accent: '#c58bff', accent2: '#7f3fd1', cloth: '#2d1f4a', metal: '#e8c06a',
  standard, pennant, costume, css, frame,
};
