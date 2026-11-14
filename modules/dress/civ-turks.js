// CIV layer: Turks (kit: mideast). Crimson accent, crimson silk, gold. A double-tailed crimson pennon with
// tulip motifs flying from the pole, tulip tiles set into the posts, a round woven cane shield by the pole,
// and a janissary bork (tall white felt cap, folded flap, brass front holder) for the mascot. All drawings are our own.
const GOLD = '#e8c25a', CREAM = '#f6efe0';

// a tulip: cup of three petals on a stem with two leaves, base at (0,0); petal colour, line colour
const tulip = (x, y, s, petal, line, inner) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 0V-9M0 -3c-4-1-7-4-8-8 4 1 7 4 8 8zM0 -5c4-1 6-4 7-7-4 1-6 3-7 7z" fill="${line}" stroke="${line}" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M0 -9c-6-1-8-7-7-14l3 4 1-7 3 6 3-6 1 7 3-4c1 7-1 13-7 14z" fill="${petal}" stroke="${line}" stroke-width=".9" stroke-linejoin="round"/>
  <path d="M0 -10c-2-3-2-7 0-10 2 3 2 7 0 10z" fill="${inner}"/></g>`;

const PEN = 'M12 0C56 4 104 8 152 12L120 25L150 42C104 40 58 44 12 48Z';
const standard = `<svg width="150" height="60" viewBox="0 0 150 60">
  <defs><clipPath id="tkCut"><path d="${PEN}"/></clipPath>
    <linearGradient id="tkSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".2" stop-color="#fff" stop-opacity=".18"/><stop offset=".4" stop-color="#000" stop-opacity=".3"/><stop offset=".6" stop-color="#fff" stop-opacity=".18"/><stop offset=".8" stop-color="#000" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient></defs>
  <g class="tkfly"><g class="unroll" style="--d:1.350"><g class="tkwave">
    <g clip-path="url(#tkCut)">
      <rect width="160" height="50" fill="var(--civ3)"/>
      <path d="M12 3.500C56 7.500 104 11 150 15M12 44.500C58 40.500 104 37 148 38.500" fill="none" stroke="${GOLD}" stroke-width="2.200"/>
      <path d="M12 0h8v48h-8z" fill="${GOLD}"/><path d="M14 4v40" stroke="#8a611c" stroke-width="1" stroke-dasharray="2 2"/>
      ${tulip(38, 34, 1, CREAM, GOLD, 'var(--civ)')}${tulip(68, 33, .88, CREAM, GOLD, 'var(--civ)')}${tulip(95, 31, .74, CREAM, GOLD, 'var(--civ)')}
      ${[52, 82, 108].map((x, i) => `<circle cx="${x}" cy="${24 - i}" r="1.500" fill="${GOLD}"/>`).join('')}
      <rect class="tksheen" x="-30" width="450" height="50" fill="url(#tkSh)"/>
    </g>
    <path d="${PEN}" fill="none" stroke="#3a0408" stroke-width="1.100"/>
  </g></g></g>
  <g class="pc" style="--sc:.2;--d:1.150">${[2, 24, 44].map((y) => `<rect x="7" y="${y}" width="10" height="4.500" rx="2" fill="${GOLD}" stroke="#5a3e08" stroke-width=".7"/>`).join('')}</g>
</svg>`;

const PP = 'M5 4H29V66L17 52L5 66Z';
const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="tkPc"><path d="${PP}"/></clipPath></defs>
  <path d="M2 2.500h30" stroke="${GOLD}" stroke-width="2.600" stroke-linecap="round"/>
  <g class="unroll" style="--d:1.600"><g class="tksway">
    <g clip-path="url(#tkPc)"><rect width="34" height="70" fill="var(--civ3)"/><path d="M5 4h24v4H5z" fill="${GOLD}"/><path d="M8 8v50M26 8v50" stroke="${GOLD}" stroke-width="1.200"/>
      ${tulip(17, 38, .9, CREAM, GOLD, 'var(--civ)')}</g>
    <path d="${PP}" fill="none" stroke="#3a0408" stroke-width="1"/>
  </g></g>
</svg>`;

// tulip tiles set into both posts, a woven cane shield (kalkan) by the pole
const tile = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:0;--r:-90deg;--d:${d};--o:0">
  <rect x="-10" y="-13" width="20" height="26" rx="1.500" fill="${CREAM}" stroke="#123f86" stroke-width="1.600"/>
  <rect x="-7.500" y="-10.500" width="15" height="21" fill="none" stroke="#2aa6b8" stroke-width=".7"/>
  ${tulip(0, 9, .72, 'var(--civ)', '#123f86', CREAM)}</g></g>`;
const ring = (r, col, w, dash) => `<circle r="${r}" fill="none" stroke="${col}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const frame = `
${[[-10, 40, 1.050], [-10, 112, 1.120], [-10, 184, 1.190], [410, 40, 1.080], [410, 112, 1.150], [410, 184, 1.220]].map(([x, y, d]) => tile(x, y, d)).join('')}
<g transform="translate(434 120)"><g class="pc" style="--dx:60px;--r:200deg;--d:1.150;--o:0"><g class="tkshield">
  <circle r="18" fill="#3a0408"/>${ring(16, 'var(--civ3)', 4)}${ring(16, GOLD, 4, '2 3')}${ring(11.500, '#7a1018', 4)}${ring(11.500, GOLD, 4, '1.500 2.500')}${ring(7.500, 'var(--civ3)', 3)}
  <circle r="17.500" fill="none" stroke="${GOLD}" stroke-width="1.200"/>
  <circle r="5.500" fill="${GOLD}" stroke="#5a3e08" stroke-width="1"/><circle r="2.400" fill="var(--civ)"/><circle cx="-1.800" cy="-2" r="1.200" fill="#fff" opacity=".85"/>
  <path d="M-11 -12a16 16 0 0 1 12-5" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.600" stroke-linecap="round"/>
</g></g></g>`;

const costume = {
  back: `<path d="M80 4C96 -1 109 8 111 22C113 34 111 48 106 60L97 58C100 45 98 30 92 19C88 13 84 10 80 9Z" fill="#e7dfcc" stroke="#6b5f4a" stroke-width="1.100" stroke-linejoin="round"/>
    <path d="M95 14c6 10 8 26 6 40" fill="none" stroke="#bfb397" stroke-width="1.100"/>`,
  front: `
  <path d="M47 44C46 28 50 12 58 4C64-1 78-1 84 4C92 14 94 30 93 44Z" fill="${CREAM}" stroke="#6b5f4a" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M55 42c-1-12 1-26 6-35M85 42c1-12-1-24-5-33" fill="none" stroke="#d9cfb8" stroke-width="1.300"/>
  <path d="M52 26c1-8 4-15 8-19" fill="none" stroke="#fff" stroke-width="1.600" stroke-linecap="round" opacity=".9"/>
  <path d="M40 47C46 39 94 39 100 47L100 53C92 46 48 46 40 53Z" fill="${GOLD}" stroke="#5a3e08" stroke-width="1.100" stroke-linejoin="round"/>
  <g fill="var(--civ3)" stroke="#5a3e08" stroke-width=".5">${[47, 56, 84, 93].map((x) => `<path d="M${x} 47l2.500-2.500 2.500 2.500-2.500 2.500z"/>`).join('')}</g>
  <path d="M66 44V17c0-3 8-3 8 0v27z" fill="url(#tkBr)" stroke="#5a3e08" stroke-width=".9"/>
  <defs><linearGradient id="tkBr" x1="0" x2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".5" stop-color="#e0b24a"/><stop offset="1" stop-color="#7d5414"/></linearGradient></defs>
  <path d="M64 17h12l-2-6h-8z" fill="url(#tkBr)" stroke="#5a3e08" stroke-width=".9" stroke-linejoin="round"/>
  <path d="M66 24h8M66 31h8M66 38h8" stroke="#7d5414" stroke-width="1"/>
  <circle cx="70" cy="27.500" r="1.800" fill="var(--civ)" stroke="#5a3e08" stroke-width=".5"/>`,
};

const css = `
#stage[data-civ=turks] .gob.dressed .tuft{opacity:0}
#stage[data-civ=turks] .tkfly{transform-box:fill-box;transform-origin:0 50%;animation:tkFly 3.400s ease-in-out infinite}
@keyframes tkFly{0%,100%{transform:rotate(3deg)}50%{transform:rotate(9deg)}}
#stage[data-civ=turks] .tkwave{transform-box:fill-box;transform-origin:0 50%;animation:tkWave 1.900s ease-in-out infinite alternate}
@keyframes tkWave{from{transform:skewY(-5deg) scaleX(.97)}to{transform:skewY(6deg) scaleX(1.020)}}
#stage[data-civ=turks] .tksheen{animation:tkSheen 1.900s linear infinite}
@keyframes tkSheen{from{transform:translateX(0)}to{transform:translateX(-40%)}}
#stage[data-civ=turks] .tksway{transform-box:fill-box;transform-origin:50% 0;animation:tkSway 4.800s -2s ease-in-out infinite}
@keyframes tkSway{0%,100%{transform:rotate(-2deg) skewX(2deg)}50%{transform:rotate(2deg) skewX(-3deg)}}
#stage[data-civ=turks] .tkshield{animation:tkGl 5s ease-in-out infinite}
@keyframes tkGl{50%{filter:drop-shadow(0 0 5px color-mix(in srgb,var(--civ) 70%,transparent))}}
`;

export default {
  id: 'turks', name: 'Turks', kit: 'mideast',
  accent: '#ff4d4d', accent2: '#c41e2e', cloth: '#a8121f', metal: GOLD,
  standard, pennant, costume, css, frame,
};
