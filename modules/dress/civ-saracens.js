// CIV layer: Saracens (kit: mideast). Sand-gold accent, mulberry silk, brass. A fringed silk banner with a
// geometric star-tile pattern on a crossbar, a dagged silk valance over the lintel, a scimitar in its scabbard
// hung beside the pole, and a turban wound round a spiked helmet for the mascot. All drawings are our own.
import { star8, oct, dia } from './kit-mideast.js';

const GOLD = '#e8c25a';
const sheen = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#000" stop-opacity=".28"/><stop offset=".75" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>`;
// star-tile pattern woven into the silk (gold octagons, accent stars)
const silk = (id, s, x, y) => `<pattern id="${id}" patternUnits="userSpaceOnUse" x="${x}" y="${y}" width="${s}" height="${s}">
  <path d="${oct(s / 2, s / 2, s / 2)}" fill="none" stroke="${GOLD}" stroke-width=".8" opacity=".85"/>
  ${[[0, 0], [s, 0], [0, s], [s, s]].map(([a, b]) => `<path d="${dia(a, b, s * .2929)}" fill="#0004"/>`).join('')}
  <path d="${star8(s / 2, s / 2, s * .32)}" fill="var(--civ)" opacity=".9"/></pattern>`;
const fringe = (pts) => pts.map(([x, y]) => `<path d="M${x} ${y}v7" />`).join('');
const edgeFringe = (x0, y0, x1, y1, n) => fringe(Array.from({ length: n }, (_, i) => [+(x0 + (x1 - x0) * i / (n - 1)).toFixed(1), +(y0 + (y1 - y0) * i / (n - 1)).toFixed(1)]));

const standard = `<svg width="104" height="160" viewBox="0 0 104 160">
  <defs><clipPath id="saCut"><path d="M18 4H90V108L54 134L18 108Z"/></clipPath>${sheen('saSh')}${silk('saPat', 14, 26, 18)}</defs>
  <g class="pc" style="--dx:-30px;--sc:.3;--d:1.150">
    <path d="M8 2.500h90" stroke="#4a320c" stroke-width="4.200" stroke-linecap="round"/><path d="M8 2.500h90" stroke="${GOLD}" stroke-width="2.600" stroke-linecap="round"/>
    <circle cx="99" cy="2.500" r="3.400" fill="${GOLD}" stroke="#4a320c" stroke-width=".7"/>
  </g>
  <g class="unroll" style="--d:1.350"><g class="sasway">
    <g clip-path="url(#saCut)">
      <rect x="0" y="0" width="104" height="140" fill="var(--civ3)"/>
      <rect x="26" y="18" width="56" height="84" fill="url(#saPat)"/>
      <path d="M18 4h72v9H18zM18 4h7v130h-7zM83 4h7v130h-7z" fill="${GOLD}" opacity=".95"/>
      <path d="M21.500 16v90M86.500 16v90" stroke="#7d5414" stroke-width="2.400" stroke-dasharray="2.500 3"/>
      <path d="${oct(54, 60, 19)}" fill="var(--civ3)" stroke="${GOLD}" stroke-width="2"/>
      <path d="${star8(54, 60, 16.500)}" fill="var(--civ)" stroke="#fff4d8" stroke-width="1"/>
      <path d="${star8(54, 60, 8)}" fill="var(--civ3)" stroke="${GOLD}" stroke-width="1.200"/><circle cx="54" cy="60" r="2.600" fill="${GOLD}"/>
      <path d="M26 108L54 128L82 108" fill="none" stroke="${GOLD}" stroke-width="1.600" opacity=".9"/>
      <rect class="sasheen" x="-104" width="312" height="140" fill="url(#saSh)"/>
    </g>
    <path d="M18 4H90V108L54 134L18 108Z" fill="none" stroke="#2a0814" stroke-width="1.200"/>
    <g stroke="${GOLD}" stroke-width="1.500" stroke-linecap="round" class="safr">${edgeFringe(19, 109, 53, 134, 9)}${edgeFringe(55, 134, 89, 109, 9)}</g>
    <path d="M54 134v8" stroke="${GOLD}" stroke-width="1.400"/><circle cx="54" cy="143" r="2.400" fill="${GOLD}" stroke="#4a320c" stroke-width=".6"/><path d="M52 145h4l1.500 9h-7z" fill="var(--civ)" stroke="#0005" stroke-width=".5"/>
  </g></g>
  <g class="fin" style="--d:1.900"><g class="satas">
    <path d="M97 5c1 10-1 18 1 26" fill="none" stroke="${GOLD}" stroke-width="1.300"/><circle cx="98" cy="32" r="2.300" fill="${GOLD}"/><path d="M96 34h4l2 12h-8z" fill="var(--civ3)" stroke="#0005" stroke-width=".5"/>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="saPc"><path d="M5 4H29V46L17 60L5 46Z"/></clipPath>${sheen('saPs')}</defs>
  <path d="M1 2.500h32" stroke="${GOLD}" stroke-width="2.400" stroke-linecap="round"/>
  <g class="unroll" style="--d:1.600"><g class="sasway" style="animation-delay:-2s">
    <g clip-path="url(#saPc)"><rect width="34" height="64" fill="var(--civ3)"/><path d="M5 4h24v4H5zM5 4h3v60H5zM26 4h3v60h-3z" fill="${GOLD}"/>
      <path d="${star8(17, 28, 9)}" fill="var(--civ)" stroke="#fff4d8" stroke-width=".8"/><path d="${star8(17, 28, 4)}" fill="var(--civ3)"/>
      <rect class="sasheen" x="-34" width="102" height="64" fill="url(#saPs)"/></g>
    <g stroke="${GOLD}" stroke-width="1.200" stroke-linecap="round">${edgeFringe(6, 47, 16, 59, 5)}${edgeFringe(18, 59, 28, 47, 5)}</g>
  </g></g>
</svg>`;

// dagged silk valance on the lintel's left half + a sheathed scimitar beside the pole
const frame = `
<g class="pc" style="--dy:-60px;--sc:.8;--d:1.050;--o:0"><g class="saval">
  <path d="M22 -24H154V-3L148 6L142 -3${Array.from({ length: 10 }, (_, i) => { const x = 142 - i * 12; return `L${x - 6} 6L${x - 12} -3`; }).join('')}Z" fill="var(--civ3)" stroke="#2a0814" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M22 -20H154M22 -7H154" stroke="${GOLD}" stroke-width="2"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="${dia(28 + i * 12, -13.500, 4, 3.200)}" fill="var(--civ)" stroke="${GOLD}" stroke-width=".6"/>`).join('')}
  ${Array.from({ length: 11 }, (_, i) => `<circle cx="${28 + i * 12}" cy="6.800" r="1.500" fill="${GOLD}"/>`).join('')}
</g></g>
<defs><linearGradient id="saSteel" x1="0" x2="1"><stop offset="0" stop-color="#e9eef2"/><stop offset="1" stop-color="#6d7780"/></linearGradient></defs>
<g class="pc" style="--dy:-80px;--r:-30deg;--d:1.150;--o:0">
  <path d="M440 58c4 46 1 92-12 134" fill="none" stroke="#2a0814" stroke-width="8.500" stroke-linecap="round"/>
  <path d="M440 58c4 46 1 92-12 134" fill="none" stroke="var(--civ3)" stroke-width="6.500" stroke-linecap="round"/>
  <path d="M438.500 62c3 40 1 80-9 118" fill="none" stroke="#fff" stroke-width="1" opacity=".25"/>
  <path d="M436 58h9l1 13h-10z" fill="${GOLD}" stroke="#4a320c" stroke-width=".7"/><path d="M437 116h8.500l-.5 9h-8z" fill="${GOLD}" stroke="#4a320c" stroke-width=".7"/>
  <path d="M432 178l6 3-7 16-5-3z" fill="${GOLD}" stroke="#4a320c" stroke-width=".7"/>
  <ellipse cx="440.500" cy="56" rx="7" ry="2.600" fill="${GOLD}" stroke="#4a320c" stroke-width=".7"/>
  <path d="M439 54c-1-7 0-13 2-18" stroke="#3a1f0c" stroke-width="4.200" stroke-linecap="round" fill="none"/>
  <path d="M439 54c-1-7 0-13 2-18" stroke="#7a4a26" stroke-width="2.200" stroke-dasharray="1.400 1.400" fill="none"/>
  <path d="M441 36c-1-4 2-7 6-6" fill="none" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>
  <path d="M440 70c-5 2-8 0-9-4" fill="none" stroke="${GOLD}" stroke-width="1.100"/>
</g>`;

const costume = {
  back: `<g class="satail"><path d="M95 40c9 4 14 14 15 30-3 6-7 8-11 8 2-12-1-24-8-32z" fill="#efe4c8" stroke="#6b5532" stroke-width="1" stroke-linejoin="round"/>
    <path d="M100 52c3 6 4 13 3 21" fill="none" stroke="#b9a578" stroke-width="1"/></g>`,
  front: `
  <path d="M51 40C51 22 60 12 70 10c10 2 19 12 19 30z" fill="url(#saHelm)" stroke="#20262b" stroke-width="1.200"/>
  <defs><linearGradient id="saHelm" x1="0" x2="1"><stop offset="0" stop-color="#c7d0d7"/><stop offset=".45" stop-color="#7f8a94"/><stop offset="1" stop-color="#3c444b"/></linearGradient></defs>
  <path d="M70 11v28M62 15c-3 7-5 15-5 24M78 15c3 7 5 15 5 24" fill="none" stroke="#2a3036" stroke-width="1"/>
  <path d="M56 26c2-6 6-10 11-12" fill="none" stroke="#f1f5f8" stroke-width="1.500" stroke-linecap="round" opacity=".8"/>
  <path d="M67.500 12L70-9l2.500 21z" fill="url(#saHelm)" stroke="#20262b" stroke-width=".9" stroke-linejoin="round"/>
  <circle cx="70" cy="12" r="3.200" fill="${GOLD}" stroke="#4a320c" stroke-width=".8"/>
  <path d="M38 46c1-10 16-15 32-15s31 5 32 15c-2 5-16 4-32 4s-30 1-32-4z" fill="#f3ead6" stroke="#6b5532" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M41 41c10 6 24 7 34-3M48 47c12 0 24-4 31-12M62 49c10-1 22-5 30-13M86 48c5-2 10-5 13-9M40 45c4-5 10-8 16-9" fill="none" stroke="#c4b48e" stroke-width="1.100" stroke-linecap="round"/>
  <path d="M38 46c1-10 16-15 32-15" fill="none" stroke="#fff" stroke-width="1" opacity=".7"/>
  <path d="M43 38c8-5 18-7 27-7" fill="none" stroke="var(--civ3)" stroke-width="2.400" stroke-linecap="round"/>
  <path d="M65 36l5-5 5 5-5 5z" fill="${GOLD}" stroke="#4a320c" stroke-width=".8"/><circle cx="70" cy="36" r="2.200" fill="var(--civ)" stroke="#4a320c" stroke-width=".5"/>`,
};

const css = `
#stage[data-civ=saracens] .gob.dressed .tuft{opacity:0}
#stage[data-civ=saracens] .sasway{transform-box:fill-box;transform-origin:50% 0;animation:saSway 5.200s ease-in-out infinite}
@keyframes saSway{0%,100%{transform:rotate(-1.800deg) skewX(1.800deg)}50%{transform:rotate(2deg) skewX(-2.600deg)}}
#stage[data-civ=saracens] .sasheen{animation:saSheen 4s linear infinite}
@keyframes saSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=saracens] .safr{transform-box:fill-box;transform-origin:50% 0;animation:saFr 1.700s ease-in-out infinite alternate}
@keyframes saFr{from{transform:skewX(-6deg)}to{transform:skewX(6deg)}}
#stage[data-civ=saracens] .satas{transform-box:fill-box;transform-origin:50% 0;animation:saFr 2.300s -.6s ease-in-out infinite alternate}
#stage[data-civ=saracens] .saval{transform-box:fill-box;transform-origin:50% 0;animation:saVal 4.400s ease-in-out infinite}
@keyframes saVal{0%,100%{transform:skewX(0) scaleY(1)}50%{transform:skewX(-1.500deg) scaleY(1.040)}}
#stage[data-civ=saracens] .satail{transform-box:fill-box;transform-origin:0 0;animation:saTail 3.600s ease-in-out infinite alternate}
@keyframes saTail{from{transform:rotate(-3deg)}to{transform:rotate(5deg)}}
`;

export default {
  id: 'saracens', name: 'Saracens', kit: 'mideast',
  accent: '#ffe08a', accent2: '#d4a12c', cloth: '#7a1f3d', metal: GOLD,
  standard, pennant, costume, css, frame,
};
