// CIV layer: Vikings (kit: norse). Glacier-blue accent, madder-red cloth, raven banner, shield wall on the
// top beam, iron helmet with horns and a braided beard for the mascot. All drawings are our own.
const RAVEN = 'M30 6l7 4-4 1c7 4 16 3 25-4-2 12-9 21-18 25l5 15-7-7-3 10-3-10-7 7 5-15C21 28 14 19 12 7c9 7 18 8 25 4-1-2-1-4 1-5z';

const shield = (cx, i) => {
  const cols = [['var(--civ3)', '#f1e6d0'], ['var(--civ2)', '#f1e6d0'], ['#f1e6d0', 'var(--civ3)']][i % 3];
  return `<g transform="translate(${cx} -6)"><g class="pc vsh" style="--dy:-60px;--r:${i % 2 ? 140 : -140}deg;--d:${(1.05 + i * .09).toFixed(2)};--o:0">
    <circle r="14.500" fill="#1a1109"/><circle r="13" fill="${cols[0]}"/><path d="M0-13A13 13 0 0 1 13 0H0zM0 13A13 13 0 0 1-13 0H0z" fill="${cols[1]}"/>
    <circle r="13" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="2"/><circle r="4.200" fill="#59626b" stroke="#14181b"/><circle cx="-1.200" cy="-1.200" r="1.400" fill="#dfe7ee"/>
    <path d="M-9-9a13 13 0 0 1 12-4" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.500" stroke-linecap="round"/></g></g>`;
};

const cloth = (w, h, tail, id) => `
  <defs><clipPath id="${id}"><path class="vcut" d="M2 4H${w - 2}V${h}L${w * .75} ${h + tail}L${w / 2} ${h}L${w * .25} ${h + tail}L2 ${h}Z"/></clipPath>
  <linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/><stop offset=".75" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>`;

const standard = `<svg width="84" height="190" viewBox="0 0 84 190"><g class="unroll" style="--d:1.35"><g class="vsway">
  ${cloth(84, 132, 24, 'vkc')}
  <path d="M10 0v6M42 0v6M74 0v6" stroke="#c8b38a" stroke-width="2.500" stroke-linecap="round"/>
  <g clip-path="url(#vkc)">
    <rect width="84" height="170" fill="var(--civ3)"/>
    <path d="M2 4h80v9H2zM2 4h6v160H2zM76 4h6v160h-6z" fill="#f1e6d0" opacity=".9"/>
    <path d="M10 21h64" stroke="var(--civ)" stroke-width="2"/><path d="M12 27l5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4" fill="none" stroke="var(--civ)" stroke-width="1.300"/>
    <g transform="translate(1.500 34) scale(1.16)"><path d="${RAVEN}" fill="#0c0a09"/><circle cx="33.500" cy="8.300" r="1.100" fill="var(--civ)"/></g>
    <path d="M22 106l20 12 20-12" fill="none" stroke="#f1e6d0" stroke-width="2" opacity=".85"/><path d="M30 122l12 7 12-7" fill="none" stroke="#f1e6d0" stroke-width="1.500" opacity=".6"/>
    <rect class="vsheen" x="-84" width="252" height="170" fill="url(#vkcs)"/>
  </g>
  <path d="M2 4H82V132L63 156L42 132L21 156L2 132Z" fill="none" stroke="#1a0606" stroke-width="1.200"/>
</g></g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.6"><g class="vsway" style="animation-delay:-2s">
  ${cloth(34, 50, 16, 'vkp')}
  <g clip-path="url(#vkp)"><rect width="34" height="70" fill="var(--civ3)"/><path d="M2 4h30v5H2z" fill="#f1e6d0"/>
  <g transform="translate(4 14) scale(.44)"><path d="${RAVEN}" fill="#0c0a09"/></g><rect class="vsheen" x="-34" width="102" height="70" fill="url(#vkps)"/></g>
</g></g></svg>`;

const costume = {
  front: `
  <path d="M44 41C33 39 25 27 27 8c4 11 11 17 21 21z" fill="#efe6cf" stroke="#3a2f1c" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M96 41c11-2 19-14 17-33-4 11-11 17-21 21z" fill="#efe6cf" stroke="#3a2f1c" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M31 22c2 5 6 9 11 12M109 22c-2 5-6 9-11 12" fill="none" stroke="#b9a98a" stroke-width="1"/>
  <path d="M42 47C42 27 54 16 70 16s28 11 28 31z" fill="#66707a" stroke="#14181b" stroke-width="1.300"/>
  <path d="M70 16v31M55 20c-4 8-5 17-5 27M85 20c4 8 5 17 5 27" fill="none" stroke="#2a3036" stroke-width="1.200"/>
  <path d="M50 30c3-6 8-10 15-11" fill="none" stroke="#c4ced6" stroke-width="1.600" stroke-linecap="round" opacity=".8"/>
  <path d="M39 43h62v7H39z" fill="#c9a24f" stroke="#3a2a0c" stroke-width="1"/>
  <path d="M66.500 50h7v11l-3.500 4-3.500-4z" fill="#c9a24f" stroke="#3a2a0c" stroke-width="1"/>
  <g fill="#3a2a0c"><circle cx="46" cy="46.500" r="1.100"/><circle cx="58" cy="46.500" r="1.100"/><circle cx="82" cy="46.500" r="1.100"/><circle cx="94" cy="46.500" r="1.100"/></g>
  <path d="M55 81c5 4 25 4 30 0 1 7-2 12-6 15l-3 7-3-5-3 6-3-6-3 5-3-7c-4-3-7-8-6-15z" fill="#e2b455" stroke="#5a3d10" stroke-width="1" stroke-linejoin="round"/>
  <path d="M63 86l4 4-4 4M77 86l-4 4 4 4M70 85v12" fill="none" stroke="#8a611c" stroke-width="1"/>`,
};

const css = `
#stage[data-civ=vikings] .gob.dressed .tuft{opacity:0}
#stage[data-civ=vikings] .vsway{transform-box:fill-box;transform-origin:50% 0;animation:vSway 5.500s ease-in-out infinite}
@keyframes vSway{0%,100%{transform:rotate(-1.600deg) skewX(1.500deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
#stage[data-civ=vikings] .vsheen{animation:vSheen 4.200s linear infinite}
@keyframes vSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=vikings] .vsh{transform-origin:center}
`;

export default {
  id: 'vikings', name: 'Vikings', kit: 'norse',
  accent: '#8fdcff', accent2: '#2f86c9', cloth: '#a3261f', metal: '#c9a24f',
  standard, pennant, costume, css,
  frame: [34, 64, 94, 124, 154, 184, 214].map(shield).join(''),
};
