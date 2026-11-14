// CIV layer: Bengalis (kit: india). River-cyan accent, indigo cloth, a sheer muslin banner with woven jamdani motifs
// and a caparisoned war elephant, muslin swags under the arch and crossed boat oars by the pole, a quilted cloth
// helmet-cap with ear flaps for the mascot. All drawings are our own.
import { archPts, tassel } from './kit-india.js';

const f = (n) => +n.toFixed(1);

// war elephant facing right, caparison and a small howdah, in a 70x52 box
const ELEPHANT = `
  <path d="M12 22C8 26 7 32 8 37" fill="none" stroke="#0e1640" stroke-width="1.600" stroke-linecap="round"/>
  <g fill="var(--civ3)" stroke="#0e1640" stroke-width="1"><rect x="14" y="30" width="8" height="18" rx="2"/><rect x="40" y="30" width="8" height="18" rx="2"/></g>
  <path d="M11 24C11 13 22 9 36 10C47 11 52 16 52 24L51 34H12Z" fill="var(--civ3)" stroke="#0e1640" stroke-width="1"/>
  <g fill="var(--civ3)" stroke="#0e1640" stroke-width="1"><rect x="20" y="32" width="8" height="18" rx="2"/><rect x="46" y="31" width="8" height="18" rx="2"/></g>
  <circle cx="54" cy="20" r="10.500" fill="var(--civ3)" stroke="#0e1640" stroke-width="1"/>
  <path d="M62 23C67 30 66 39 61 44C59 46 61 49 64 47" fill="none" stroke="#0e1640" stroke-width="6.400" stroke-linecap="round"/>
  <path d="M62 23C67 30 66 39 61 44C59 46 61 49 64 47" fill="none" stroke="var(--civ3)" stroke-width="4.600" stroke-linecap="round"/>
  <path d="M59 29C63 33 67 33 70 30" fill="none" stroke="#fffaf0" stroke-width="2.200" stroke-linecap="round"/>
  <path d="M47 13C40 15 40 28 48 30C52 26 52 17 47 13Z" fill="#202d70" stroke="#0e1640" stroke-width=".9"/>
  <circle cx="57.500" cy="17" r="1.300" fill="#fffaf0"/>
  <path d="M18 10H44V26L40 31H22L18 26Z" style="fill:var(--civ)" stroke="#0e1640" stroke-width="1"/>
  <path d="M20 13H42V25L39 28H23L20 25Z" fill="none" stroke="#e2c46a" stroke-width="1" stroke-dasharray="2 1.500"/>
  <path d="M23 31v3M27 31v4M31 31v3M35 31v4M39 31v3" stroke="#e2c46a" stroke-width="1.300"/>
  <path d="M51 12C56 9 60 11 61 15L56 16Z" fill="#e2c46a" stroke="#5a3a0c" stroke-width=".6"/>
  <rect x="23" y="2" width="16" height="8" fill="#e2c46a" stroke="#5a3a0c" stroke-width=".8"/><path d="M26 2v8M31 2v8M36 2v8" stroke="#8a6420" stroke-width=".7"/>
  <path d="M21 2Q31 -8 41 2Z" style="fill:var(--civ2)" stroke="#0e1640" stroke-width=".8"/><path d="M31 -6v-4" stroke="#e2c46a" stroke-width="1.200"/>`;

// jamdani: small woven motifs on sheer muslin
const MOTIF = (x, y, c) => `<path d="M${x} ${y - 3}l3 3-3 3-3-3z" fill="${c}"/><circle cx="${x - 5}" cy="${y}" r=".9" fill="${c}"/><circle cx="${x + 5}" cy="${y}" r=".9" fill="${c}"/><circle cx="${x}" cy="${y - 5}" r=".9" fill="${c}"/><circle cx="${x}" cy="${y + 5}" r=".9" fill="${c}"/>`;
const motifs = (x0, y0, cols, rows, dx, dy) => { let s = ''; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += MOTIF(x0 + c * dx + (r % 2) * dx / 2, y0 + r * dy, r % 2 ? 'var(--civ3)' : 'var(--civ)'); return s; };
const scallop = (x0, x1, y, n) => { let d = `M${x0} 28H${x1}V${y}`; const w = (x1 - x0) / n; for (let i = n; i > 0; i--) d += `Q${f(x0 + (i - .5) * w)} ${y + 16} ${f(x0 + (i - 1) * w)} ${y}`; return d + 'Z'; };
const BANNER = scallop(34, 122, 138, 3);

const standard = `<svg width="130" height="210" viewBox="0 0 130 210">
  <defs><clipPath id="bnClip"><path d="${BANNER}"/></clipPath>
    <linearGradient id="bnSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".3" stop-color="#fff" stop-opacity=".3"/><stop offset=".55" stop-color="#000" stop-opacity=".12"/><stop offset=".8" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient></defs>
  <rect x="28" y="10" width="4" height="22" fill="#b89a5a"/>
  <g class="pc" style="--dy:-30px;--sc:.3;--d:1.150"><circle cx="30" cy="8" r="5" fill="var(--civm)" stroke="#5a3a0c" stroke-width=".8"/><path d="M30 3v-8" stroke="var(--civm)" stroke-width="1.600"/><circle cx="28.500" cy="6.500" r="1.400" fill="#fff8e0"/></g>
  <g class="pc" style="--dx:-40px;--d:1.200"><rect x="24" y="22" width="102" height="5" rx="2.500" fill="#c9a86a" stroke="#5a4020" stroke-width=".8"/>
    <path d="M30 22v5M44 22v5M58 22v5M72 22v5M86 22v5M100 22v5M114 22v5" stroke="#8a6a3a" stroke-width=".8"/></g>
  <g class="unroll" style="--d:1.350"><g class="bnsway">
    <g clip-path="url(#bnClip)">
      <rect x="34" y="28" width="88" height="130" fill="#f6f1e4" opacity=".93"/>
      <rect x="34" y="28" width="88" height="10" style="fill:var(--civ3)"/><path d="M34 40h88M34 126h88" style="stroke:var(--civ)" stroke-width="1.600"/>
      <g opacity=".85">${motifs(42, 33, 9, 1, 10, 0).replace(/var\(--civ3\)/g, '#fff').replace(/var\(--civ\)/g, '#fff')}${motifs(44, 48, 8, 1, 10, 0)}${motifs(44, 118, 8, 1, 10, 0)}${motifs(44, 134, 8, 2, 10, 8)}</g>
      <g class="bnwalk"><g transform="translate(43 62) scale(1.020)">${ELEPHANT}</g></g>
      <rect class="bnsheen" x="-54" y="28" width="264" height="130" fill="url(#bnSh)"/>
    </g>
    <path d="${BANNER}" fill="none" stroke="#8a7a5a" stroke-width="1"/>
    <path class="bnfringe" d="${Array.from({ length: 30 }, (_, i) => { const x = 35 + i * 2.900, k = ((x - 34) % 29.300) / 29.300, y = 138 + Math.sin(k * Math.PI) * 15.500; return `M${f(x)} ${f(y)}v6`; }).join('')}" stroke="#e8e0cc" stroke-width="1.100"/>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.600"><g class="bnsway" style="animation-delay:-2s">
  <path d="M2 2H32V52Q24 64 17 52Q10 64 2 52Z" fill="#f6f1e4" stroke="#8a7a5a" stroke-width="1"/>
  <rect x="2" y="2" width="30" height="6" style="fill:var(--civ3)"/><path d="M2 10h30" style="stroke:var(--civ)" stroke-width="1.300"/>
  ${motifs(8, 16, 3, 1, 9, 0)}${motifs(8, 46, 3, 1, 9, 0)}
  <g transform="translate(4.500 22) scale(.36)">${ELEPHANT}</g>
</g></g></svg>`;

// sheer muslin swags hung from the arch cusps, and two crossed boat oars by the pole
function swag(a, b, sag, i) {
  const [x0, y0] = archPts[a], [x1, y1] = archPts[b], cx = (x0 + x1) / 2, cy = Math.max(y0, y1) + sag;
  return `<g class="bnswag" style="--i:${i}"><path d="M${f(x0)} ${f(y0)}Q${f(cx)} ${f(cy + sag * .9)} ${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy + sag * .3)} ${f(x0)} ${f(y0)}Z" fill="#f6f1e4" opacity=".82" stroke="#cfc4a8" stroke-width=".6"/>
    <path d="M${f(x0)} ${f(y0)}Q${f(cx)} ${f(cy + sag * .9)} ${f(x1)} ${f(y1)}" fill="none" style="stroke:var(--civ)" stroke-width="1.300" stroke-dasharray="3 3"/>
    <circle cx="${f(x0)}" cy="${f(y0)}" r="2.200" fill="var(--civm)"/><circle cx="${f(x1)}" cy="${f(y1)}" r="2.200" fill="var(--civm)"/></g>`;
}
const oar = (x0, y0, x1, y1) => { const a = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
  return `<path d="M${x0} ${y0}L${x1} ${y1}" stroke="#2a1606" stroke-width="5" stroke-linecap="round"/><path d="M${x0} ${y0}L${x1} ${y1}" stroke="#b07a3e" stroke-width="3.200" stroke-linecap="round"/>
    <g transform="translate(${x1} ${y1}) rotate(${f(a)})"><path d="M-2 -4.500C10 -7 24 -7 30 -3V3C24 7 10 7 -2 4.500Z" fill="#a8703a" stroke="#2a1606" stroke-width="1"/><path d="M4 0H28" stroke="#6a4420" stroke-width="1"/>
    <path d="M18 -5.500V5.500" style="stroke:var(--civ)" stroke-width="2"/></g>`; };

const frame = `
<g class="fin" style="--d:1.800">${swag(3, 5, 10, 0)}${swag(5, 7, 13, 1)}${swag(7, 9, 10, 2)}</g>
<g class="pc" style="--dy:-60px;--r:-18deg;--d:1.100;--o:0">
  ${oar(458, 214, 470, 92)}${oar(470, 214, 482, 92)}
  <path d="M458 168c8-3 16-3 24 0M459 174c8-3 15-3 22 0" fill="none" stroke="#c9a86a" stroke-width="2.200" stroke-linecap="round"/>
  ${tassel(470, 174, 14, 7)}
</g>`;

const costume = {
  front: `
  <defs><clipPath id="bnCap"><path d="M38 50C36 30 50 16 70 16s34 14 32 34C90 44 50 44 38 50Z"/></clipPath>
    <clipPath id="bnFlap"><path d="M36 46C33 53 33 61 38 67C42 68 46 66 47.500 62L47 47ZM104 46C107 53 107 61 102 67C98 68 94 66 92.500 62L93 47Z"/></clipPath></defs>
  <path d="M40 66l-2 12M100 66l2 12" stroke="#e2c46a" stroke-width="1.200" fill="none"/>
  <circle cx="37.500" cy="79" r="1.800" fill="var(--civ)"/><circle cx="102.500" cy="79" r="1.800" fill="var(--civ)"/>
  <path d="M36 46C33 53 33 61 38 67C42 68 46 66 47.500 62L47 47ZM104 46C107 53 107 61 102 67C98 68 94 66 92.500 62L93 47Z" fill="var(--civ3)" stroke="#0e1640" stroke-width="1"/>
  <g clip-path="url(#bnFlap)"><path d="M30 48l22 22M30 56l22 22M30 40l22 22M88 70l22-22M88 78l22-22M88 62l22-22" stroke="#f6f1e4" stroke-width=".8" stroke-dasharray="2 1.600"/></g>
  <path d="M36.500 48C34 54 34 61 38.500 66.500M103.500 48C106 54 106 61 101.500 66.500" fill="none" style="stroke:var(--civ)" stroke-width="1.300"/>
  <path d="M38 50C36 30 50 16 70 16s34 14 32 34C90 44 50 44 38 50Z" fill="var(--civ3)" stroke="#0e1640" stroke-width="1.200"/>
  <g clip-path="url(#bnCap)"><path d="${Array.from({ length: 10 }, (_, i) => `M${30 + i * 8} 10l36 44M${110 - i * 8} 10l-36 44`).join('')}" stroke="#f6f1e4" stroke-width=".8" stroke-dasharray="2.200 1.600" opacity=".85"/>
    <path d="M44 26C52 20 62 18 70 18" fill="none" stroke="#6a7ad0" stroke-width="2.400" stroke-linecap="round" opacity=".7"/></g>
  <path d="M37 47.500C50 41.500 90 41.500 103 47.500L102 52C90 46 50 46 38 52Z" style="fill:var(--civ)" stroke="#0e1640" stroke-width=".9"/>
  <path d="M42 48.500C54 44.500 86 44.500 98 48.500" fill="none" stroke="#f6f1e4" stroke-width=".8" stroke-dasharray="2 2"/>
  <path d="M70 16V8" stroke="#0e1640" stroke-width="3" stroke-linecap="round"/><path d="M70 16V8" stroke="var(--civ3)" stroke-width="1.600" stroke-linecap="round"/>
  <circle cx="70" cy="7" r="3.400" style="fill:var(--civ)" stroke="#0e1640" stroke-width=".9"/><circle class="bnglint" cx="69" cy="6" r="1.100" fill="#fff"/>`,
};

const css = `
#stage[data-civ=bengalis] .gob.dressed .tuft{opacity:0}
#stage[data-civ=bengalis] .bnsway{transform-box:fill-box;transform-origin:50% 0;animation:bnSway 6s ease-in-out infinite}
@keyframes bnSway{0%,100%{transform:rotate(-1.200deg) skewX(2deg)}50%{transform:rotate(1.800deg) skewX(-3deg)}}
#stage[data-civ=bengalis] .bnsheen{animation:bnSheen 5s linear infinite}
@keyframes bnSheen{from{transform:translateX(0)}to{transform:translateX(88px)}}
#stage[data-civ=bengalis] .bnwalk{transform-box:fill-box;transform-origin:50% 100%;animation:bnWalk 3.200s ease-in-out infinite}
@keyframes bnWalk{0%,100%{transform:rotate(-1.500deg) translateY(0)}50%{transform:rotate(1.500deg) translateY(-2px)}}
#stage[data-civ=bengalis] .bnswag{transform-box:fill-box;transform-origin:50% 0;animation:bnSwag calc(3.400s + var(--i)*.5s) calc(var(--i)*-1.100s) ease-in-out infinite alternate}
@keyframes bnSwag{from{transform:skewX(-4deg)}to{transform:skewX(4deg) scaleY(1.080)}}
#stage[data-civ=bengalis] .bnfringe{transform-box:fill-box;transform-origin:50% 0;animation:bnSwag 2.400s ease-in-out infinite alternate}
#stage[data-civ=bengalis] .bnglint{animation:bnGlint 4s ease-in-out infinite}
@keyframes bnGlint{0%,70%,100%{opacity:.3}82%{opacity:1}}
`;

export default {
  id: 'bengalis', name: 'Bengalis', kit: 'india',
  accent: '#4fd8ff', accent2: '#1f8fbf', cloth: '#2b3c8f', metal: '#e2c46a',
  standard, pennant, costume, css, frame,
};
