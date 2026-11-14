// CIV layer: Vietnamese (kit: sea). Red accent, gold silk, bronze. A bronze-drum tympanum in the Dong Son manner
// on the pole (rings of hatching, tangent circles and long-beaked birds flying round), red silk ribbons, two silk
// lanterns hanging from the pole tie, a rolled bamboo blind under the thatch, a non la conical hat for the mascot.
// All drawings are our own.
const CX = 60, CY = 50;
const ring = (r, n, fn) => Array.from({ length: n }, (_, i) => fn(i / n * Math.PI * 2, i)).join('');
const pt = (a, r) => [(CX + Math.cos(a) * r).toFixed(1), (CY + Math.sin(a) * r).toFixed(1)];
// a long-beaked bird in flight, drawn along +x (beak forward), centred on 0,0
const BIRD = 'M13 -1L5 -1.200C3 -3 -2 -3 -5 -1.500L-13 -4-10 -.5-14 2-5 1.500C-2 3 3 3 5 1.200L13 1zM-1 -2L-6 -9-2 -8 3 -2zM-1 2L-5 7-1 6 3 2z';

const disc = `
  <circle cx="${CX}" cy="${CY}" r="47" fill="url(#vnBr)" stroke="#3a220c" stroke-width="1.400"/>
  <circle cx="${CX}" cy="${CY}" r="43" fill="none" stroke="#2e1a08" stroke-width="1"/>
  ${ring(43, 60, (a) => { const [x1, y1] = pt(a, 39.500), [x2, y2] = pt(a, 43); return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#4a2e10" stroke-width=".9"/>`; })}
  <circle cx="${CX}" cy="${CY}" r="38.500" fill="none" stroke="#2e1a08" stroke-width="1"/>
  <g class="vnbirds">${ring(30, 6, (a) => { const [x, y] = pt(a, 30); return `<path d="${BIRD}" transform="translate(${x} ${y}) rotate(${(a * 180 / Math.PI + 90).toFixed(1)})" fill="#3a220c"/>`; })}</g>
  <circle cx="${CX}" cy="${CY}" r="22" fill="none" stroke="#2e1a08" stroke-width="1"/>
  ${ring(19, 14, (a) => { const [x, y] = pt(a, 19); return `<circle cx="${x}" cy="${y}" r="3.200" fill="none" stroke="#3a220c" stroke-width=".9"/><circle cx="${x}" cy="${y}" r=".9" fill="#3a220c"/>`; })}
  <circle cx="${CX}" cy="${CY}" r="15.500" fill="none" stroke="#2e1a08" stroke-width="1"/>
  ${ring(14, 28, (a) => { const [x1, y1] = pt(a, 10), [x2, y2] = pt(a + .1, 14); return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#4a2e10" stroke-width=".8"/>`; })}
  <circle cx="${CX}" cy="${CY}" r="8" fill="url(#vnBoss)" stroke="#3a220c" stroke-width="1"/>
  ${ring(8, 10, (a) => { const [x, y] = pt(a, 5); return `<circle cx="${x}" cy="${y}" r=".9" fill="#3a220c"/>`; })}
  <path class="vnglint" d="M24 26a44 44 0 0 1 24-17" stroke="#fff6d8" stroke-width="2.400" fill="none" stroke-linecap="round"/>`;

const standard = `<svg width="120" height="250" viewBox="0 0 120 250">
  <defs><radialGradient id="vnBr" cx=".38" cy=".32" r=".85"><stop offset="0" stop-color="#e8c486"/><stop offset=".55" stop-color="#b98a4a"/><stop offset="1" stop-color="#6b4518"/></radialGradient>
    <radialGradient id="vnBoss" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0c4"/><stop offset="1" stop-color="#a87a3a"/></radialGradient></defs>
  <g class="fin" style="--d:1.800"><g class="vnrib a"><path d="M62 104C74 116 70 140 84 156l-6 3C64 144 68 120 58 108z" fill="var(--civ)" stroke="#6a0c08" stroke-width=".7"/></g>
    <g class="vnrib b"><path d="M60 106C64 124 56 146 64 168l-6 1C50 148 56 126 56 108z" fill="var(--civ2)" stroke="#6a0c08" stroke-width=".7"/></g></g>
  <g class="pc" style="--sc:.6;--dy:30px;--d:1.150"><path d="M54 92h12l2 14H52z" fill="url(#vnBr)" stroke="#3a220c" stroke-width=".9"/><path d="M52 100h16" stroke="#3a220c" stroke-width="1"/><circle cx="60" cy="104" r="3.500" fill="var(--civ)" stroke="#6a0c08"/></g>
  <g class="pc" style="--sc:.15;--r:-200deg;--d:1.050">${disc}</g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <g class="unroll" style="--d:1.600"><g class="vnrib a"><path d="M15 18C11 34 21 46 14 70l6 1C27 48 18 34 20 18z" fill="var(--civ)" stroke="#6a0c08" stroke-width=".7"/></g></g>
  <g class="pc" style="--sc:.3;--r:-120deg;--d:1.400"><circle cx="17" cy="12" r="11" fill="#b98a4a" stroke="#3a220c"/><circle cx="17" cy="12" r="8" fill="none" stroke="#3a220c" stroke-width=".8"/>
    <circle cx="17" cy="12" r="4.500" fill="none" stroke="#3a220c" stroke-width=".8" stroke-dasharray="1.500 1.200"/><circle cx="17" cy="12" r="2" fill="#e8c486" stroke="#3a220c" stroke-width=".6"/></g></svg>`;

// two silk lanterns from the upper pole tie, a rolled bamboo blind tied with red cords under the thatch
const lantern = (y, i, d) => `<g class="pc" style="--dy:-40px;--d:${d};--o:0"><g class="vnlan" style="--i:${i}">
  <path d="M434 ${y - 12}v12" stroke="#3a220c" stroke-width="1"/>
  <rect x="428" y="${y}" width="12" height="3" rx="1" fill="var(--civm)" stroke="#5a3e08" stroke-width=".6"/>
  <path d="M428 ${y + 3}c-6 4-6 16 0 20h12c6-4 6-16 0-20z" fill="var(--civ)" stroke="#6a0c08" stroke-width=".8" class="vnglow"/>
  <path d="M431 ${y + 3}c-3 5-3 15 0 20M437 ${y + 3}c3 5 3 15 0 20M434 ${y + 3}v20" stroke="var(--civm)" stroke-width=".7" fill="none" opacity=".8"/>
  <ellipse cx="431" cy="${y + 10}" rx="1.800" ry="4" fill="#fff6c0" opacity=".45"/>
  <rect x="428" y="${y + 23}" width="12" height="3" rx="1" fill="var(--civm)" stroke="#5a3e08" stroke-width=".6"/>
  <path d="M434 ${y + 26}v3" stroke="var(--civm)"/><path d="M432 ${y + 29}h4l1 9h-6z" fill="var(--civ)" stroke="#6a0c08" stroke-width=".5"/></g></g>`;
const cord = (x, i) => `<g class="vncord" style="--i:${i}"><path d="M${x} 6v8c0 2-3 3-3 5M${x} 14c0 2 3 3 3 5" stroke="var(--civ)" stroke-width="1.400" fill="none"/>
  <path d="M${x - 4.500} 19h3l.5 10h-4zM${x + 1.500} 19h3l.5 10h-4z" fill="var(--civ)" stroke="#6a0c08" stroke-width=".5"/></g>`;
const frame = `<defs><linearGradient id="vnRoll" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eedc96"/><stop offset=".5" stop-color="#b59a4c"/><stop offset="1" stop-color="#5e4a1a"/></linearGradient></defs>
<g class="pc" style="--dx:-120px;--d:1.050;--o:0">
  <rect x="6" y="2" width="262" height="11" rx="5.500" fill="url(#vnRoll)" stroke="#3d3010" stroke-width=".8"/>
  <path d="${Array.from({ length: 52 }, (_, i) => `M${10 + i * 5} 3v9`).join('')}" stroke="#7a6428" stroke-width=".6" opacity=".7"/>
  ${cord(46, 0)}${cord(228, 1)}
</g>
${lantern(58, 0, 1.200)}${lantern(102, 1, 1.300)}`;

const costume = {
  front: `
  <path d="M18 46C34 34 52 19 70 6c18 13 36 28 52 40-12 5-92 5-104 0z" fill="#ead8a2" stroke="#5e4a1a" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M28 42c26 3 58 3 84 0M38 35c20 2.500 44 2.500 64 0M48 27c14 2 30 2 44 0M58 19c8 1 16 1 24 0" stroke="#a98a4a" stroke-width="1" fill="none"/>
  <path d="M70 6L44 44M70 6L96 44M70 6v39" stroke="#c9b06a" stroke-width=".7" opacity=".7"/>
  <path d="M60 14c3-3 6-6 10-8" stroke="#fffbe6" stroke-width="1.600" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M18 46c12 5 92 5 104 0l-2 3c-14 5-86 5-100 0z" fill="#9c7f3c" stroke="#5e4a1a" stroke-width=".8"/>
  <path d="M43 50c-3 10-3 26 2 37M97 50c3 10 3 26-2 37" stroke="var(--civ)" stroke-width="2" fill="none" stroke-linecap="round"/>`,
};

const css = `
#stage[data-civ=vietnamese] .gob.dressed .tuft{opacity:0}
#stage[data-civ=vietnamese] .vnbirds{transform-box:view-box;transform-origin:${CX}px ${CY}px;animation:vnBirds 36s linear infinite}
@keyframes vnBirds{to{transform:rotate(-360deg)}}
#stage[data-civ=vietnamese] .vnglint{animation:vnGlint 4.800s ease-in-out infinite}
@keyframes vnGlint{0%,100%{opacity:.15}55%{opacity:.85}}
#stage[data-civ=vietnamese] .vnrib{transform-box:fill-box;transform-origin:20% 0;animation:vnRib 2.300s ease-in-out infinite alternate}
#stage[data-civ=vietnamese] .vnrib.b{animation-duration:1.800s;animation-delay:-.8s}
@keyframes vnRib{from{transform:skewX(-9deg) rotate(-4deg)}to{transform:skewX(10deg) rotate(5deg)}}
#stage[data-civ=vietnamese] .vnlan{transform-box:fill-box;transform-origin:50% 0;animation:vnLan calc(2.800s + var(--i)*.5s) calc(var(--i)*-1.100s) ease-in-out infinite alternate}
@keyframes vnLan{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
#stage[data-civ=vietnamese] .vnglow{filter:drop-shadow(0 0 5px var(--civ));animation:vnGlow 2.400s steps(1) infinite}
@keyframes vnGlow{0%{opacity:1}30%{opacity:.86}45%{opacity:1}70%{opacity:.92}}
#stage[data-civ=vietnamese] .vncord{transform-box:fill-box;transform-origin:50% 0;animation:vnLan calc(2s + var(--i)*.4s) ease-in-out infinite alternate}
`;

export default {
  id: 'vietnamese', name: 'Vietnamese', kit: 'sea',
  accent: '#ff4a3d', accent2: '#b81f1a', cloth: '#e9b949', metal: '#d8a84e',
  standard, pennant, costume, css, frame,
};
