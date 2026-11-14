// CIV layer: Incas (kit: andes). Bright yellow accent, red, black-and-white checks.
// Standard: a checkerboard tocapu tunic (unku) with a stepped red yoke, hung from the crossbar.
// Frame: an aryballos storage jar slung on cords between the jamb and the pole, gold sheet plaques with
// checked inlays set into the left jamb. Mascot: a braided llautu headband with a red fringe across the
// forehead and a checked tunic collar. All drawings are our own.
import { tocapu } from './kit-andes.js';

const RED = 'var(--civ3)', GOLD = '#f2c14e', CREAM = '#efe4cc', INK = '#1b1410';

const standard = `<svg width="90" height="140" viewBox="0 0 90 140">
  <defs>
    <pattern id="incasChk" width="16" height="16" patternUnits="userSpaceOnUse" x="5" y="4"><rect width="16" height="16" fill="${CREAM}"/><path d="M0 0h8v8H0zM8 8h8v8H8z" fill="${INK}"/></pattern>
    <linearGradient id="incasFold" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".2" stop-color="#000" stop-opacity="0"/><stop offset=".55" stop-color="#fff" stop-opacity=".1"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
  </defs>
  <path d="M14 0v6M45 0v5M76 0v6" stroke="#5a3a22" stroke-width="1.600"/>
  <g class="unroll" style="--d:1.350"><g class="acs" style="--k:.3">
    <path d="M7 4H83L86 118H4z" fill="url(#incasChk)" stroke="${INK}" stroke-width="1.200"/>
    <path d="M7 4H83V10H75V16H67V22H59V28H52V34H38V28H31V22H23V16H15V10H7z" fill="${RED}" stroke="${INK}" stroke-width="1"/>
    <path d="M38 34H52M40 4v5h10V4" fill="none" stroke="${CREAM}" stroke-width="1"/>
    <path d="M7 4L4 118M83 4L86 118" stroke="var(--civ)" stroke-width="2.400"/>
    <rect x="3" y="104" width="84" height="15" fill="${INK}"/>${Array.from({ length: 6 }, (_, k) => tocapu(4 + k * 14, 105, 13, k + 1)).join('')}
    <path d="M7 4H83L86 118H4z" fill="url(#incasFold)"/>
    <g class="fin" style="--d:2">${Array.from({ length: 14 }, (_, i) => `<path d="M${6 + i * 6} 119v${7 + (i % 3) * 2}" stroke="${i % 2 ? 'var(--civ)' : RED}" stroke-width="2.200" stroke-linecap="round"/>`).join('')}</g>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="5" y="0" width="24" height="5" rx="2.500" fill="#6e4a2a" stroke="#2a1d14" stroke-width=".7"/>
  <g class="unroll" style="--d:1.600"><g class="acs" style="--k:.7">
    <rect x="9" y="5" width="16" height="48" fill="${INK}"/>${[0, 1, 2].map((k) => tocapu(10, 6 + k * 15.500, 14, k * 2 + 1)).join('')}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${10.500 + i * 2.600} 53v${10 + (i % 2) * 4}" stroke="${RED}" stroke-width="2.200" stroke-linecap="round"/>`).join('')}
  </g></g>
</svg>`;

// aryballos jar on cords from the pole; gold plaques with checked inlay on the left jamb
const plaque = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:2.600;--r:30deg;--d:${d};--o:0">
  <rect x="-8" y="-11" width="16" height="22" rx="1.500" fill="${GOLD}" stroke="#5a3e08" stroke-width="1"/>
  <rect x="-5" y="-8" width="10" height="16" fill="url(#incasChkS)" stroke="#5a3e08" stroke-width=".6"/>
  <path class="incglint" d="M-6 -9.500l4 0" stroke="#fff" stroke-width="1.400" stroke-linecap="round"/></g></g>`;
const frame = `<defs><pattern id="incasChkS" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="${INK}"/><path d="M0 0h2.500v2.500H0zM2.500 2.500H5V5H2.500z" fill="var(--civ)"/></pattern>
  <radialGradient id="incasJar" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#e0703f"/><stop offset=".6" stop-color="#a8432a"/><stop offset="1" stop-color="#5e2314"/></radialGradient></defs>
${plaque(-8, 66, 1.100)}${plaque(-12, 176, 1.180)}
<g class="pc" style="--dy:-80px;--r:-30deg;--d:1.050;--o:0">
  <path d="M458 88L441 104M458 88L452 112" stroke="#c9a77a" stroke-width="1.200"/>
  <g transform="translate(440 0)"><g class="acs" style="--k:.5">
    <path d="M-3 100h6l-1 6c7 1 12 8 12 18 0 10-6 18-14 24-8-6-14-14-14-24 0-10 5-17 12-18z" fill="url(#incasJar)" stroke="#2a1006" stroke-width="1.100" stroke-linejoin="round"/>
    <path d="M-5 99h10l-1.500 2.500h-7z" fill="#c25534" stroke="#2a1006" stroke-width=".8"/>
    <path d="M-10 118h20M-11 125h22" stroke="${CREAM}" stroke-width="1.300"/>
    <path d="M-9 121.500l3-2.500 3 2.500 3-2.500 3 2.500 3-2.500 3 2.500" fill="none" stroke="${INK}" stroke-width="1"/>
    <path d="M-1 127l1 4 1-4M-1 135l1 4 1-4" stroke="var(--civ)" stroke-width="1.200" fill="none"/>
    <path d="M-12 123q-4 2-2 6M12 123q4 2 2 6" fill="none" stroke="#5e2314" stroke-width="2"/>
    <path d="M-7 112a9 9 0 0 1 6-4" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.400" stroke-linecap="round"/>
  </g></g>
</g>`;

const costume = {
  front: `
  <path d="M40 44c8-8 52-8 60 0l-.6 5.600c-8-6.600-50.800-6.600-58.800 0z" fill="#5a3a22" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
  <path d="M41 46.800c8-7 50-7 58 0" fill="none" stroke="var(--civ)" stroke-width="2.400" stroke-dasharray="3 3"/>
  <path d="M41 46.800c8-7 50-7 58 0" fill="none" stroke="${RED}" stroke-width="2.400" stroke-dasharray="3 3" stroke-dashoffset="3"/>
  <path d="M41 44.300c8-7 50-7 58 0M41 49.300c8-7 50-7 58 0" fill="none" stroke="${INK}" stroke-width=".6" opacity=".7"/>
  <g class="incfr">${Array.from({ length: 11 }, (_, i) => { const x = 58 + i * 2.400, top = 41.300 + Math.abs(i - 5) * .12; return `<rect x="${(x - .9).toFixed(1)}" y="${top.toFixed(1)}" width="1.800" height="2.400" fill="${GOLD}" stroke="#5a3e08" stroke-width=".3"/><path d="M${x.toFixed(1)} ${(top + 2.400).toFixed(1)}V52.300" stroke="#9e1a14" stroke-width="2.200"/><path d="M${x.toFixed(1)} ${(top + 2.400).toFixed(1)}V52.300" stroke="#e0412c" stroke-width="1.100"/>`; }).join('')}</g>
  <path d="M51 96l2-9.500c6-2 28-2 34 0l2 9.500z" fill="url(#incasChkM)" stroke="${INK}" stroke-width="1"/>
  <path d="M53 86.500h34l-2 3h-4l-2 3h-12l-2-3h-4z" fill="${RED}" stroke="${INK}" stroke-width=".7"/>
  <path d="M51 96l2-9.500M89 96l-2-9.500" stroke="var(--civ)" stroke-width="1.600"/>
  <defs><pattern id="incasChkM" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="${CREAM}"/><path d="M0 0h3v3H0zM3 3h3v3H3z" fill="${INK}"/></pattern></defs>`,
};

const css = `
#stage[data-civ=incas] .incglint{animation:incGlint 3.800s ease-in-out infinite}
#stage[data-civ=incas] .pc:nth-of-type(2) .incglint{animation-delay:-1.700s}
@keyframes incGlint{0%,70%,100%{opacity:.15}82%{opacity:1}}
#stage[data-civ=incas] .incfr{transform-box:fill-box;transform-origin:50% 0;animation:incFr 2.400s ease-in-out infinite alternate}
@keyframes incFr{from{transform:skewX(-4deg)}to{transform:skewX(4deg)}}
`;

export default {
  id: 'incas', name: 'Incas', kit: 'andes',
  accent: '#ffe14d', accent2: '#d9a514', cloth: '#c8302a', metal: GOLD,
  standard, pennant, costume, css, frame,
};
