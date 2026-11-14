// CIV layer: Wei (kit: eastasia). Indigo-blue accent, indigo roof glaze, deep indigo cloth, steel. A halberd (ji)
// crowns the pole with a red horsehair ring and long streamers, a war drum on a cradle stands on the left of the roof
// and throbs with its own beat, indigo streamers are tied to both pillars, and the mascot wears a steel helmet with a
// gilded tiger face. All drawings are our own.
const f1 = (n) => (+n.toFixed(1)).toString();
const STEEL = '#c3cad4';

// a long streamer hanging from (x,y), drifting to the right, length len, width w
const streamer = (x, y, len, w, fill, i) => {
  const p = [[0, 0], [len * .28, len * .18], [len * .42, len * .5], [len * .7, len * .62], [len * .82, len * .9], [len, len * .98]];
  const top = p.map(([a, b]) => `${f1(x + a)} ${f1(y + b)}`), bot = p.slice().reverse().map(([a, b], k) => `${f1(x + a - w * (1 - k / 6) * .3)} ${f1(y + b + w * (.4 + k / 10))}`);
  return `<g class="wst" style="--i:${i}"><path d="M${top[0]}C${top[1]} ${top[2]} ${top[3]}S${top[4]} ${top[5]}L${f1(x + len - 6)} ${f1(y + len * .98 + w * .7)}L${bot[0]}C${bot[1]} ${bot[2]} ${bot[3]}S${bot[4]} ${bot[5]}Z" fill="${fill}" stroke="#0b1236" stroke-width=".6" stroke-linejoin="round"/></g>`;
};

const ji = (sc) => `<g transform="translate(${f1(12 - 12 * sc)} 0) scale(${sc})">
  <path d="M12 -60C16.500 -47 17 -30 15 -8H9C7 -30 7.500 -47 12 -60Z" fill="url(#weSt)" stroke="#2a2f38" stroke-width="1" stroke-linejoin="round"/>
  <path d="M12 -55V-10" stroke="#fff" stroke-opacity=".6" stroke-width=".8"/>
  <path d="M15 -17H40C45 -17 48 -13 47 -8C39 -10 30 -9 15 -6Z" fill="url(#weSt)" stroke="#2a2f38" stroke-width="1" stroke-linejoin="round"/>
  <path d="M17 -14H40" stroke="#fff" stroke-opacity=".5" stroke-width=".7"/>
  <rect x="8" y="-9" width="8" height="20" rx="1.500" fill="#59616d" stroke="#1a1d22" stroke-width=".8"/>
  <path d="M8 -4h8M8 6h8" stroke="#c9a24f" stroke-width="1.600"/>
</g>`;

const standard = `<svg width="130" height="200" viewBox="0 0 130 200">
  <defs><linearGradient id="weSt" x1="0" x2="1"><stop offset="0" stop-color="#eef2f7"/><stop offset=".5" stop-color="${STEEL}"/><stop offset="1" stop-color="#6a727e"/></linearGradient></defs>
  <g class="unroll" style="--d:1.400">
    ${streamer(14, 12, 116, 9, 'var(--civ3)', 0)}${streamer(14, 14, 96, 8, 'var(--civ)', 1)}${streamer(14, 16, 104, 6, '#eef0f8', 2)}${streamer(13, 18, 78, 7, 'var(--civ2)', 3)}
  </g>
  <g class="fin" style="--d:1.600"><g class="whair">${Array.from({ length: 9 }, (_, i) => `<path d="M${8 + i} 12q${f1((i - 4) * .8)} 8 ${f1((i - 4) * 1.600)} 15" fill="none" stroke="${['#c8161d', '#e0262c', '#a01016'][i % 3]}" stroke-width="1.800" stroke-linecap="round"/>`).join('')}</g></g>
  <g class="pc" style="--dy:-90px;--sc:.4;--d:1.100"><g class="wjig">${ji(1.100)}</g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <path d="M8 22V74" stroke="#5a3a1e" stroke-width="2.200" stroke-linecap="round"/>
  <g transform="translate(-1.600 24) scale(.8)">${ji(.6)}</g>
  <g class="unroll" style="--d:1.600">${streamer(9, 28, 24, 4, 'var(--civ)', 0)}${streamer(9, 30, 20, 3, 'var(--civ3)', 1)}</g>
</svg>`;

// war drum on a cradle at the left of the roof ridge; streamers tied to both pillars
const drum = `<g class="pc" style="--dy:-120px;--sc:.3;--d:1.050;--o:0">
  <path d="M54 -62L60 -76M106 -62L100 -76" stroke="#3a1a0a" stroke-width="3.200" stroke-linecap="round"/>
  <path d="M56 -76Q80 -66 104 -76" fill="none" stroke="#5a2a10" stroke-width="4" stroke-linecap="round"/>
  <g class="wdrum">
    <path d="M56 -121C68 -125 92 -125 104 -121C108 -108 108 -90 104 -77C92 -73 68 -73 56 -77C52 -90 52 -108 56 -121Z" fill="url(#eaRh)" stroke="#3d0a0c" stroke-width="1.200"/>
    <path d="M62 -112h36M62 -86h36" stroke="var(--civ)" stroke-width="2.200"/><path d="M62 -99h36" stroke="#e2b04a" stroke-width="1"/>
    ${[-117, -81].map((y) => Array.from({ length: 9 }, (_, i) => `<circle cx="${60 + i * 5}" cy="${y}" r="1.200" fill="#f0c66e" stroke="#5a3d10" stroke-width=".4"/>`).join('')).join('')}
    <ellipse cx="56" cy="-99" rx="5" ry="22" fill="#e9d9b0" stroke="#7a5a2a" stroke-width="1"/><ellipse cx="104" cy="-99" rx="4" ry="22" fill="#cbb98e" stroke="#7a5a2a" stroke-width="1"/>
    <path d="M64 -120c10-2 22-2 32 0" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.500" stroke-linecap="round"/>
  </g>
  <path class="wring" d="M48 -112q-6 13 0 26" fill="none" stroke="var(--civ)" stroke-width="2" stroke-linecap="round"/>
  <path class="wring" style="animation-delay:-.6s" d="M44 -116q-8 17 0 34" fill="none" stroke="var(--civ)" stroke-width="1.500" stroke-linecap="round"/>
  <path d="M60 -134l10 12M70 -136l4 13" stroke="#5a2a10" stroke-width="2.400" stroke-linecap="round"/><circle cx="60" cy="-134" r="2.600" fill="var(--civ3)"/><circle cx="70" cy="-136" r="2.600" fill="var(--civ3)"/>
</g>`;
// flip = -1 makes the ribbons drift outwards (left pillar), so they never cross Goblin's face
const pillarRibbons = (x, d, flip = 1) => `<g class="pc" style="--sc:.2;--d:${d};--o:0"><g transform="translate(${flip < 0 ? 2 * x : 0} 0) scale(${flip} 1)">
  <g class="wpr">${streamer(x, 4, 40, 6, 'var(--civ3)', 0)}</g><g class="wpr" style="animation-delay:-1s">${streamer(x + 1, 6, 30, 5, 'var(--civ)', 1)}</g>
  <circle cx="${x}" cy="5" r="3" fill="#c9a24f" stroke="#5a3d10" stroke-width=".6"/>
</g></g>`;
const frame = `${drum}${pillarRibbons(-12, 1.2, -1)}${pillarRibbons(410, 1.28)}`;

const costume = {
  front: `
  <path d="M34 40C34 52 36 62 40 70L47 66C44 58 44 50 45 44ZM106 40C106 52 104 62 100 70L93 66C96 58 96 50 95 44Z" fill="var(--civ3)" stroke="#0b1236" stroke-width="1" stroke-linejoin="round"/>
  <path d="M38 48c0 6 1 12 4 18M102 48c0 6-1 12-4 18" fill="none" stroke="var(--civ)" stroke-width="1" opacity=".7"/>
  <path d="M47 22C44 12 50 6 58 12ZM93 22C96 12 90 6 82 12Z" fill="#d9922e" stroke="#4a2a08" stroke-width="1" stroke-linejoin="round"/>
  <path d="M49 18C48 13 51 11 55 13M91 18C92 13 89 11 85 13" fill="none" stroke="#4a2a08" stroke-width="1.200"/>
  <path d="M42 46C42 26 54 15 70 15S98 26 98 46Z" fill="#59616d" stroke="#1a1d22" stroke-width="1.300"/>
  <path d="M51 24c3-5 8-8 13-9" fill="none" stroke="#eef2f7" stroke-width="1.500" stroke-linecap="round" opacity=".7"/>
  <path d="M55 44C53 34 58 22 70 22S87 34 85 44Z" fill="#e0a03a" stroke="#4a2a08" stroke-width="1" stroke-linejoin="round"/>
  <path d="M60 27l4 4M80 27l-4 4M57 34l5 1M83 34l-5 1M70 23v4M66 24l1 3M74 24l-1 3" stroke="#3a1f06" stroke-width="1.400" stroke-linecap="round"/>
  <path d="M60 36q3-3 6 0q-3 2-6 0zM74 36q3-3 6 0q-3 2-6 0z" fill="#fff2b0" stroke="#3a1f06" stroke-width=".8"/><circle cx="63" cy="36" r=".9" fill="#1a0f04"/><circle cx="77" cy="36" r=".9" fill="#1a0f04"/>
  <path d="M67.500 38.500h5l-2.500 3z" fill="#3a1f06"/><path d="M70 41.500v1.500M70 43q-3 1.500-5 0M70 43q3 1.500 5 0" fill="none" stroke="#3a1f06" stroke-width=".8"/>
  <path d="M40 44h60v6H40z" fill="var(--civ3)" stroke="#0b1236" stroke-width="1"/>
  <path d="M63 50l2 4.500 2-4.500zM73 50l2 4.500 2-4.500z" fill="#f6f2ea" stroke="#5a5048" stroke-width=".5"/>
  <g fill="${STEEL}"><circle cx="45" cy="47" r="1.200"/><circle cx="53" cy="47" r="1.200"/><circle cx="87" cy="47" r="1.200"/><circle cx="95" cy="47" r="1.200"/></g>`,
};

const css = `
#stage[data-civ=wei]{--eaglz:#33427e}
#stage[data-civ=wei] .gob.dressed .tuft{opacity:0}
#stage[data-civ=wei] .wst{transform-box:fill-box;transform-origin:0 0;animation:weSt calc(2.200s + var(--i)*.35s) calc(var(--i)*-.5s) ease-in-out infinite alternate}
@keyframes weSt{from{transform:rotate(-7deg) skewX(6deg)}to{transform:rotate(6deg) skewX(-8deg) scaleY(.94)}}
#stage[data-civ=wei] .whair{transform-box:fill-box;transform-origin:50% 0;animation:weHair 1.600s ease-in-out infinite alternate}
@keyframes weHair{from{transform:skewX(-10deg)}to{transform:skewX(12deg)}}
#stage[data-civ=wei] .wjig{filter:drop-shadow(0 0 4px color-mix(in srgb,var(--civ) 60%,transparent))}
#stage[data-civ=wei] .wdrum{transform-box:fill-box;transform-origin:center;animation:weBeat 1.400s ease-out infinite}
@keyframes weBeat{0%,40%,100%{transform:scale(1)}5%,45%{transform:scale(1.050)}}
#stage[data-civ=wei] .wring{transform-box:fill-box;transform-origin:center;opacity:0;animation:weRing 1.400s ease-out infinite}
@keyframes weRing{0%{opacity:.8;transform:scale(1)}60%,100%{opacity:0;transform:scale(1.600)}}
#stage[data-civ=wei] .wpr{transform-box:fill-box;transform-origin:0 0;animation:weSt 2.600s ease-in-out infinite alternate}
`;

export default {
  id: 'wei', name: 'Wei', kit: 'eastasia',
  accent: '#7f9cff', accent2: '#3f5bd9', cloth: '#1d2a5e', metal: STEEL,
  standard, pennant, costume, css, frame,
};
