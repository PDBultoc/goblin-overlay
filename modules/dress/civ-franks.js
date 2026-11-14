// CIV layer: Franks (kit: feudal). Gold accent, royal-blue cloth. A swallowtail gonfalon with gold fringe and a
// throwing-axe (francisca) device hangs from an arm on the lance; blue swags with gold fringe on the parapet and
// chevron shields on the jambs; a great helm with mantling and a plume crest for the mascot. All drawings are our own.

// francisca: curved bearded head on a short haft; (0,0) = where head meets haft
const AXE = 'M-1.500-2C-6-4-12-9-15-16C-20-8-21 4-17 13C-12 7-6 4-1.500 4Z';
const axe = (x, y, s, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
  <path d="M-.5-8C1 6 1 20 3 34" fill="none" stroke="#3a2412" stroke-width="5" stroke-linecap="round"/><path d="M-.5-8C1 6 1 20 3 34" fill="none" stroke="#a87443" stroke-width="2.600" stroke-linecap="round"/>
  <path d="${AXE}" fill="var(--civ)" stroke="#5a3d10" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M-15-14C-19-6-19 4-16.500 11" fill="none" stroke="#fff6d6" stroke-width="1.200" stroke-linecap="round" opacity=".8"/>
  <rect x="-3" y="-4" width="5" height="9" rx="1" fill="#8a611c" stroke="#3a2a0c" stroke-width=".7"/></g>`;

const GON = 'M10 18H102V146L56 116L10 146Z';
const standard = `<svg width="112" height="160" viewBox="0 0 112 160">
  <g class="pc" style="--dx:-40px;--sc:.4;--d:1.150">
    <path d="M4 12H106" stroke="#2a1a0c" stroke-width="5" stroke-linecap="round"/><path d="M4 12H106" stroke="#9a6a36" stroke-width="3" stroke-linecap="round"/>
    <circle cx="108" cy="12" r="4" fill="var(--civ)" stroke="#5a3d10"/><path d="M4 22L28 12" stroke="#2a2e33" stroke-width="2.400" stroke-linecap="round"/>
  </g>
  <g class="unroll" style="--d:1.350"><g class="fsway">
    <defs><clipPath id="frGc"><path d="${GON}"/></clipPath>
    <linearGradient id="frGs" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".18"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/><stop offset=".75" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>
    ${[22, 40, 56, 72, 90].map((x) => `<path d="M${x} 12v8" stroke="var(--civ)" stroke-width="2.400" stroke-linecap="round"/>`).join('')}
    <g clip-path="url(#frGc)">
      <rect width="112" height="160" fill="var(--civ3)"/>
      <path d="M10 18H102v8H10z" fill="var(--civ)"/><path d="M15 32H97" stroke="var(--civ)" stroke-width="1.200" stroke-dasharray="3 3"/>
      ${[[24, 44], [88, 44], [24, 100], [88, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="var(--civ)" stroke="#5a3d10" stroke-width=".6"/>`).join('')}
      ${axe(60, 56, 1.500)}
      <path d="M10 146L56 116L102 146" fill="none" stroke="var(--civ)" stroke-width="3"/>
      <rect class="fsheen" x="-112" width="336" height="160" fill="url(#frGs)"/>
    </g>
    <path d="${GON}" fill="none" stroke="#0d1530" stroke-width="1.200" stroke-linejoin="round"/>
    <path class="ffringe" d="M10 148L56 118L102 148" fill="none" stroke="var(--civ)" stroke-width="7" stroke-dasharray="1.400 1.600"/>
    <path d="M10 18V146M102 18V146" fill="none" stroke="var(--civ)" stroke-width="5" stroke-dasharray="1.400 1.600" opacity=".9"/>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="0" y="0" width="34" height="5" rx="2" fill="#9a6a36" stroke="#2a1a0c" stroke-width=".8"/>
  <g class="unroll" style="--d:1.600"><g class="fsway" style="animation-delay:-1.500s">
  <defs><clipPath id="frQc"><path d="M2 4H32V64L17 52L2 64Z"/></clipPath></defs>
  <g clip-path="url(#frQc)"><rect width="34" height="70" fill="var(--civ3)"/><path d="M2 4h30v5H2z" fill="var(--civ)"/>${axe(19, 26, .62)}</g>
  <path d="M2 64L17 52L32 64" fill="none" stroke="var(--civ)" stroke-width="4" stroke-dasharray="1.200 1.400"/>
  <path d="M2 4H32V64L17 52L2 64Z" fill="none" stroke="#0d1530" stroke-width="1"/></g></g></svg>`;

// swags of blue cloth with gold fringe between the merlons, tassels where they hang
const swag = (a, b, d, i) => { const m = (a + b) / 2;
  return `<g class="pc" style="--dy:-50px;--sc:.5;--d:${d};--o:0"><g class="fswag" style="--i:${i}">
  <path d="M${a} -31H${b}C${b - 12} -6 ${a + 12} -6 ${a} -31Z" fill="var(--civ3)" stroke="#0d1530" stroke-width="1"/>
  <path d="M${a + 8} -29C${m - 10} -16 ${m + 10} -16 ${b - 8} -29M${a + 16} -30C${m - 8} -22 ${m + 8} -22 ${b - 16} -30" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="1.400"/>
  <path d="M${a + 5} -27C${m - 12} -13 ${m + 12} -13 ${b - 5} -27" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="1"/>
  <path d="M${a} -31C${a + 12} -6 ${b - 12} -6 ${b} -31" fill="none" stroke="var(--civ)" stroke-width="5" stroke-dasharray="1.300 1.500" transform="translate(0 2)"/>
  </g></g>`; };
const tassel = (x, d) => `<g class="pc" style="--sc:.2;--d:${d};--o:0"><g class="ftas"><circle cx="${x}" cy="-30" r="3" fill="var(--civ)" stroke="#5a3d10" stroke-width=".7"/>
  <path d="M${x - 3} -27h6l2 13h-10z" fill="var(--civ)" stroke="#5a3d10" stroke-width=".7"/><path d="M${x - 1.500} -26v11M${x + 1.500} -26v11" stroke="#8a611c" stroke-width=".7"/></g></g>`;
const heater = (x, y, d, dx) => `<g transform="translate(${x} ${y})"><g class="pc" style="--dx:${dx}px;--r:${dx < 0 ? -40 : 40}deg;--d:${d};--o:0">
  <path d="M-12 0h24v13c0 10-6 16-12 19-6-3-12-9-12-19z" fill="var(--civ3)" stroke="#0d1530" stroke-width="1.200"/>
  <path d="M-12 0h24v13c0 10-6 16-12 19-6-3-12-9-12-19z" fill="none" stroke="var(--civ)" stroke-width="2.200" transform="translate(0 1.500) scale(.85)"/>
  <path d="M-10 20L0 9 10 20" fill="none" stroke="var(--civ)" stroke-width="4.200" stroke-linejoin="miter"/>
  <path d="M-8 2.500h9" stroke="#fff" stroke-opacity=".35" stroke-width="1.400" stroke-linecap="round"/><circle cy="-3" r="2" fill="#2a2e33"/></g></g>`;

const frame = `
${swag(22, 98, 1.000, 0)}${swag(98, 174, 1.080, 1)}${swag(174, 250, 1.160, 2)}
${tassel(22, 1.250)}${tassel(98, 1.300)}${tassel(174, 1.350)}${tassel(250, 1.400)}
${heater(-10, 30, 1.200, -90)}${heater(410, 30, 1.260, 90)}
`;

const costume = {
  back: `
  <g class="fmant l"><path d="M54 10C36 14 26 28 22 46c-3 10-1 22 4 30l4-9 4 10 3-12 5 7c-2-14 0-28 8-42z" fill="var(--civ3)" stroke="#0d1530" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M50 16C38 22 32 34 30 48" fill="none" stroke="var(--civ)" stroke-width="1.600"/></g>
  <g class="fmant r"><path d="M86 10c18 4 28 18 32 36 3 10 1 22-4 30l-4-9-4 10-3-12-5 7c2-14 0-28-8-42z" fill="var(--civ3)" stroke="#0d1530" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M90 16c12 6 18 18 20 32" fill="none" stroke="var(--civ)" stroke-width="1.600"/></g>`,
  front: `
  <defs><linearGradient id="frHm" x1="0" x2="1"><stop offset="0" stop-color="#4b525a"/><stop offset=".3" stop-color="#d7dee4"/><stop offset=".55" stop-color="#8f99a2"/><stop offset="1" stop-color="#3a4047"/></linearGradient></defs>
  <g class="fplume">${[-30, -15, 0, 15, 30].map((a, i) => `<path transform="rotate(${a} 70 4)" d="M70 4C64 -4 65 -16 70 -24c5 8 6 20 0 28z" fill="${i % 2 ? '#fff6e0' : 'var(--civ)'}" stroke="#5a3d10" stroke-width=".8"/>`).join('')}</g>
  <path d="M48 50L49 6Q70 -1 91 6L92 50Z" fill="url(#frHm)" stroke="#16191c" stroke-width="1.300" stroke-linejoin="round"/>
  <path d="M49 6Q70 -1 91 6" fill="none" stroke="#e6edf2" stroke-width="1" opacity=".8"/>
  <path d="M49 14h42v8H49z" fill="#5d656d" stroke="#16191c" stroke-width="1"/>
  <path d="M53 17h14v2.400H53zM73 17h14v2.400H73z" fill="#0b0c0e"/>
  <g fill="#0b0c0e">${[[78, 28], [83, 28], [88, 28], [78, 33], [83, 33], [88, 33], [78, 38], [83, 38]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9"/>`).join('')}</g>
  <path d="M48.500 46h43v4h-43z" fill="var(--civ)" stroke="#5a3d10" stroke-width=".8"/>
  <g fill="#3a2a0c"><circle cx="54" cy="48" r=".9"/><circle cx="62" cy="48" r=".9"/><circle cx="78" cy="48" r=".9"/><circle cx="86" cy="48" r=".9"/></g>
  <path d="M47 4Q70 -4 93 4l1 5Q70 1 46 9z" fill="var(--civ3)" stroke="#0d1530" stroke-width=".9"/>
  ${[52, 60, 68, 76, 84].map((x) => `<path d="M${x} ${x < 70 ? 3 : 2}l4 5" stroke="var(--civ)" stroke-width="2.400"/>`).join('')}`,
};

const css = `
#stage[data-civ=franks] .gob.dressed .tuft{opacity:0}
#stage[data-civ=franks] .fsway{transform-box:fill-box;transform-origin:50% 0;animation:frSway 5.200s ease-in-out infinite}
@keyframes frSway{0%,100%{transform:rotate(-1.800deg) skewX(2deg)}50%{transform:rotate(2deg) skewX(-3deg)}}
#stage[data-civ=franks] .fsheen{animation:frSheen 4s linear infinite}
@keyframes frSheen{from{transform:translateX(0)}to{transform:translateX(112px)}}
#stage[data-civ=franks] .ffringe{animation:frFringe 1.300s ease-in-out infinite alternate}
@keyframes frFringe{from{stroke-width:6}to{stroke-width:8}}
#stage[data-civ=franks] .fswag{transform-box:fill-box;transform-origin:50% 0;animation:frSwag calc(3.600s + var(--i)*.4s) calc(var(--i)*-.9s) ease-in-out infinite alternate}
@keyframes frSwag{from{transform:skewX(-4deg) scaleY(.96)}to{transform:skewX(4deg) scaleY(1.03)}}
#stage[data-civ=franks] .ftas{transform-box:fill-box;transform-origin:50% 0;animation:frTas 2.400s ease-in-out infinite alternate}
@keyframes frTas{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
#stage[data-civ=franks] .fplume{transform-box:fill-box;transform-origin:50% 100%;animation:frPlume 3.100s ease-in-out infinite}
@keyframes frPlume{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg) scaleY(1.04)}}
#stage[data-civ=franks] .fmant{transform-box:fill-box;animation:frMant 4.400s ease-in-out infinite}
#stage[data-civ=franks] .fmant.l{transform-origin:100% 0}#stage[data-civ=franks] .fmant.r{transform-origin:0 0;animation-delay:-2.200s}
@keyframes frMant{0%,100%{transform:rotate(-2.500deg)}50%{transform:rotate(3deg)}}
`;

export default {
  id: 'franks', name: 'Franks', kit: 'feudal',
  accent: '#ffd166', accent2: '#d99a1e', cloth: '#2a3f8f', metal: '#ffd166',
  standard, pennant, costume, css, frame,
};
