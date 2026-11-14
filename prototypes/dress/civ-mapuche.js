// CIV layer: Mapuche (kit: andes). Blue accent, woven wool in deep red, black and white, silver.
// Standard: a woven textile with stepped lozenges and striped borders (a weaving, not any flag).
// Frame: a long colihue cane lance with a wool tassel leaning on the pole, a woven trarihue sash draped over the
// left end of the lintel. Mascot: a silver trarilonko headband with hanging discs, a woven poncho at the bottom.
// All drawings are our own.

const RED = 'var(--civ3)', INK = '#17120f', WOOL = '#efe7d6', SILVER = '#dfe4ea';

// stepped lozenge built from bars: centre cx,cy, n steps of s px; layers [colour, inset in steps]
const loz = (cx, cy, n, s, layers) => layers.map(([col, k]) => { const m = n - k; let r = '';
  for (let j = -m; j <= m; j++) { const w = (m - Math.abs(j)) * 2 * s + s; r += `M${(cx - w / 2).toFixed(1)} ${(cy + j * s - s / 2).toFixed(1)}h${w}v${s}h${-w}z`; }
  return `<path d="${r}" fill="${col}"/>`; }).join('');

const standard = `<svg width="90" height="140" viewBox="0 0 90 140">
  <path d="M12 0v6M45 0v5M78 0v6" stroke="#5a3a22" stroke-width="1.600"/>
  <g class="unroll" style="--d:1.350"><g class="acs" style="--k:.45">
    <rect x="6" y="4" width="78" height="114" fill="${INK}" stroke="#000" stroke-width="1"/>
    <path d="M6 4h78v5H6zM6 113h78v5H6z" fill="${RED}"/><path d="M6 10.500h78M6 111.500h78" stroke="${WOOL}" stroke-width="1.400"/>
    <path d="M10 4v114M80 4v114" stroke="${RED}" stroke-width="3"/><path d="M13 4v114M77 4v114" stroke="var(--civ)" stroke-width="1.400"/>
    ${loz(45, 36, 5, 3, [[WOOL, 0], [RED, 1], [INK, 2], ['var(--civ)', 3]])}
    ${loz(45, 86, 5, 3, [[WOOL, 0], ['var(--civ)', 1], [INK, 2], [RED, 3]])}
    ${loz(45, 61, 2, 3, [[WOOL, 0], [RED, 1]])}
    ${[[22, 61], [68, 61]].map(([x, y]) => loz(x, y, 3, 3, [[WOOL, 0], [INK, 1], ['var(--civ)', 2]])).join('')}
    ${[[22, 24], [68, 24], [22, 98], [68, 98]].map(([x, y]) => loz(x, y, 1, 3, [[RED, 0]])).join('')}
    <path d="M6 4v114" stroke="#fff" stroke-opacity=".08" stroke-width="10"/>
    <g class="fin" style="--d:2">${Array.from({ length: 19 }, (_, i) => `<path d="M${8 + i * 4.100} 118v${7 + (i % 3) * 2}" stroke="${i % 2 ? RED : INK}" stroke-width="1.800" stroke-linecap="round"/>`).join('')}</g>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="6" y="0" width="22" height="5" rx="2.500" fill="#6e4a2a" stroke="#2a1d14" stroke-width=".7"/>
  <g class="unroll" style="--d:1.600"><g class="acs" style="--k:.8">
    <rect x="10" y="5" width="14" height="50" fill="${RED}"/><path d="M11.500 5v50M22.500 5v50" stroke="${WOOL}" stroke-width="1"/>
    ${[17, 30, 43].map((y, i) => loz(17, y, 2, 2, [[INK, 0], [i % 2 ? 'var(--civ)' : WOOL, 1]])).join('')}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${11 + i * 2.400} 55v${9 + (i % 2) * 4}" stroke="${i % 2 ? INK : RED}" stroke-width="1.600" stroke-linecap="round"/>`).join('')}
  </g></g>
</svg>`;

// lance leaning against the pole; woven sash draped over the lintel's left end, hanging down the left jamb
const frame = `<defs><linearGradient id="mapucheCane" x1="0" x2="1"><stop offset="0" stop-color="#e3cf8e"/><stop offset=".6" stop-color="#b59a52"/><stop offset="1" stop-color="#6e5a26"/></linearGradient>
  <linearGradient id="mapucheBlade" x1="0" x2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".5" stop-color="#aab3bd"/><stop offset="1" stop-color="#5d666f"/></linearGradient></defs>
<g class="pc" style="--dx:120px;--dy:-60px;--r:20deg;--d:1.050;--o:0"><g transform="rotate(-9.500 474 250)">
  <rect x="471.500" y="-170" width="5" height="420" rx="2.500" fill="url(#mapucheCane)" stroke="#4a3c18" stroke-width=".6"/>
  ${[-120, -40, 40, 120, 200].map((y) => `<path d="M471.500 ${y}h5" stroke="#6e5a26" stroke-width="1.400"/>`).join('')}
  <path d="M474 -196l4.500 14-2 12h-5l-2-12z" fill="url(#mapucheBlade)" stroke="#33393f" stroke-width=".8" stroke-linejoin="round"/>
  <path d="M474 -192v20" stroke="#fff" stroke-opacity=".6" stroke-width=".7"/>
  <rect x="470.500" y="-171" width="7" height="6" rx="1.500" fill="${RED}" stroke="${INK}" stroke-width=".6"/>
  <g transform="translate(474 -165)"><g class="mapt">${[-3, -1.500, 0, 1.500, 3].map((x, i) => `<path d="M${x} 0q${x * .6} 9 ${x * 1.400} ${16 + (i % 2) * 4}" fill="none" stroke="${i % 2 ? 'var(--civ)' : RED}" stroke-width="1.700" stroke-linecap="round"/>`).join('')}</g></g>
</g></g>
<g class="pc" style="--dy:-90px;--d:1.120;--o:0">
  <path d="M-12 -27.500Q0 -32 12 -27.500L12 4H-12z" fill="${RED}" stroke="${INK}" stroke-width=".9"/>
  <path d="M-8 -28.500v32M8 -28.500v32" stroke="${WOOL}" stroke-width="1"/>
  <g transform="translate(0 4)"><g class="acs" style="--k:.2">
    <path d="M-10 0h18l-1 96h-17z" fill="${RED}" stroke="${INK}" stroke-width=".9"/>
    <path d="M-8 0v96M6 0v96" stroke="${WOOL}" stroke-width="1"/>
    ${[12, 30, 48, 66, 84].map((y, i) => loz(-1.500, y, 2, 2.400, [[INK, 0], [i % 2 ? WOOL : 'var(--civ)', 1]])).join('')}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-8.500 + i * 3} 96v${8 + (i % 2) * 4}" stroke="${i % 2 ? INK : RED}" stroke-width="1.500" stroke-linecap="round"/>`).join('')}
  </g></g>
</g>`;

const costume = {
  front: `
  <defs><linearGradient id="mapucheSil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="${SILVER}"/><stop offset="1" stop-color="#8a939c"/></linearGradient></defs>
  <path d="M41 43.500c8-7.500 50-7.500 58 0l-.4 4c-8-6.600-49.200-6.600-57.200 0z" fill="url(#mapucheSil)" stroke="#4b535b" stroke-width=".9" stroke-linejoin="round"/>
  <path d="M42 45.300c8-6.800 48-6.800 56 0" fill="none" stroke="#6d757e" stroke-width=".6" stroke-dasharray="1.400 1.200"/>
  ${[48, 55, 62.500, 70, 77.500, 85, 92].map((x, i) => { const y = 46.400 - (3 - Math.abs(3 - i)) * 1.150; return `<g class="mapd" style="--i:${i}"><path d="M${x} ${y.toFixed(1)}v1.300" stroke="#6d757e" stroke-width=".6"/>
    <circle cx="${x}" cy="${(y + 3.200).toFixed(1)}" r="2.100" fill="url(#mapucheSil)" stroke="#4b535b" stroke-width=".6"/><circle cx="${x - .6}" cy="${(y + 2.600).toFixed(1)}" r=".6" fill="#fff"/></g>`; }).join('')}
  <path d="M38 96l4-8.500c8-3 48-3 56 0l4 8.500z" fill="${INK}" stroke="#000" stroke-width="1" stroke-linejoin="round"/>
  <path d="M41 93h58M40 95h60" stroke="${RED}" stroke-width="1.300"/>
  <path d="M45 89.500c6-1.600 44-1.600 50 0" fill="none" stroke="var(--civ)" stroke-width="1.200"/>
  ${loz(70, 92.500, 2, 1.700, [[WOOL, 0], [RED, 1]])}${loz(53, 92.500, 1, 1.700, [['var(--civ)', 0]])}${loz(87, 92.500, 1, 1.700, [['var(--civ)', 0]])}
  <path d="M64 87q6 2.500 12 0" fill="none" stroke="#000" stroke-width="1.200"/>`,
};

const css = `
#stage[data-civ=mapuche] .mapd{transform-box:fill-box;transform-origin:50% 0;animation:mapD calc(1.600s + var(--i)*.11s) calc(var(--i)*-.29s) ease-in-out infinite alternate}
@keyframes mapD{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}
#stage[data-civ=mapuche] .mapt{transform-box:fill-box;transform-origin:50% 0;animation:mapD 1.900s ease-in-out infinite alternate}
`;

export default {
  id: 'mapuche', name: 'Mapuche', kit: 'andes',
  accent: '#4fa8ff', accent2: '#2a6fcf', cloth: '#a11f2b', metal: SILVER,
  standard, pennant, costume, css, frame,
};
