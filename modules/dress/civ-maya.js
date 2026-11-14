// CIV layer: Maya (kit: meso). Warm orange accent, jaguar gold, stucco red and Maya blue, jade beads.
// Standard: a stretched jaguar pelt (rosettes, tail) hung from a carved wooden crossbar with a stepped finial,
// jade bead strands dangling from the bar and the hem. Frame: a painted stucco plinth (red with blue steps)
// under the merlons, a quilted cotton jacket hung on the pole, a blowgun leaning on it. Mascot: a jaguar-pelt
// hood with round ears, a tall wooden frame crest carrying long quetzal plumes that sweep to one side, and a
// quilted cotton collar. All drawings are our own; no writing, no deity faces.

const GOLD = '#e9a63c', RED = 'var(--civ3)', BLUE = '#3a8fd0', JADE = '#2fbf98', CREAM = '#efe4cc';
const WOOD = '#7a4a24', WOODL = '#b37a44', WOODD = '#33200f', INK = '#2a1606';

// rosette pattern (one per svg, ids prefixed per use)
const rosettes = (id, s = 1) => `<pattern id="${id}" width="${20 * s}" height="${18 * s}" patternUnits="userSpaceOnUse">
  <g transform="scale(${s})">
    <circle cx="5" cy="5" r="2.300" fill="#b8621c"/><circle cx="5" cy="5" r="3.300" fill="none" stroke="${INK}" stroke-width="1.500" stroke-dasharray="3.300 1.500"/><circle cx="5.300" cy="5.200" r=".8" fill="${INK}"/>
    <circle cx="15" cy="13.500" r="2" fill="#b8621c"/><circle cx="15" cy="13.500" r="3" fill="none" stroke="${INK}" stroke-width="1.400" stroke-dasharray="2.800 1.700"/>
    <circle cx="14.500" cy="3" r=".9" fill="${INK}"/><circle cx="4" cy="13.500" r="1" fill="${INK}"/><circle cx="10" cy="9.500" r=".6" fill="${INK}"/>
  </g></pattern>`;
const peltGrad = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#a65a1a"/><stop offset=".22" stop-color="${GOLD}"/><stop offset=".5" stop-color="#f6c460"/><stop offset=".78" stop-color="${GOLD}"/><stop offset="1" stop-color="#9a5216"/></linearGradient>`;

// a strand of jade beads hanging from (x, y); swings from its top
const strand = (x, y, n, i, tip = true) => `<g class="mybd" style="--i:${i}">
  <path d="M${x} ${y}v${n * 6 + 2}" stroke="${WOODD}" stroke-width=".8"/>
  ${Array.from({ length: n }, (_, k) => `<circle cx="${x}" cy="${y + 4 + k * 6}" r="${k % 2 ? 2 : 2.700}" fill="${k % 2 ? GOLD : JADE}" stroke="${k % 2 ? '#5a3e08' : '#06382d'}" stroke-width=".6"/>`).join('')}
  ${tip ? `<path d="M${x} ${y + n * 6 + 1}l2.600 5-2.600 2.400-2.600-2.400z" fill="var(--civ)" stroke="${INK}" stroke-width=".5"/>` : ''}</g>`;

// stretched hide: forelegs tied to the bar ends, hind legs splayed at the bottom corners (the left forepaw stays
// at x >= 27: the mascot's right ear tip is just below-left of it)
const HIDE = 'M27 62H37C42 68 48 70 54 68C58 66 62 66 66 66C72 66 76 68 82 69C88 70 94 67 99 62H106L104 70C98 76 96 82 96 92C97 110 97 124 99 134L108 146L113 159L104 156C96 160 84 164 66 165C50 164 38 160 30 156L21 159L26 146L33 134C35 124 35 110 36 92C36 82 34 76 30 70z';

const standard = `<svg width="150" height="250" viewBox="0 0 150 250">
  <defs>${rosettes('mayaRosS', 1.250)}${peltGrad('mayaPeltS')}
    <linearGradient id="mayaWoodS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${WOODL}"/><stop offset=".55" stop-color="${WOOD}"/><stop offset="1" stop-color="${WOODD}"/></linearGradient>
    <linearGradient id="mayaFoldS" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  </defs>
  <g transform="translate(48 22.400) scale(.8)"><g class="unroll" style="--d:1.400"><g class="mysw">
    <g class="mytail"><path d="M66 162C58 176 74 184 67 197C64 203 67 208 72 210" fill="none" stroke="${GOLD}" stroke-width="5.500" stroke-linecap="round"/>
      <path d="M66 162C58 176 74 184 67 197C64 203 67 208 72 210" fill="none" stroke="${INK}" stroke-width="5.900" stroke-dasharray="2.600 5" stroke-dashoffset="-6"/></g>
    <path d="${HIDE}" fill="url(#mayaPeltS)" stroke="${INK}" stroke-width="1.300" stroke-linejoin="round"/>
    <path d="${HIDE}" fill="url(#mayaRosS)"/>
    <path d="M44 76C54 80 78 80 88 76C88 110 86 140 82 156C74 160 58 160 50 156C46 140 44 110 44 76z" fill="#fbe2a8" opacity=".28"/>
    <path d="M66 68C66 100 66 130 66 160" fill="none" stroke="#5a2a08" stroke-width="2" stroke-dasharray="4 3" opacity=".75"/>
    <path d="${HIDE}" fill="url(#mayaFoldS)"/>
    <g fill="${INK}"><path d="M27 62l-2 3h3zM106 62l2 3h-3zM21 159l-2.500 2 3 .5zM113 159l2.500 2-3 .5z"/></g>
    <g fill="none" stroke="${CREAM}" stroke-width="1.200"><path d="M29 59v7M32 59v7M101 59v7M104 59v7"/></g>
    <g class="fin" style="--d:2.100">${strand(21, 159, 2, 7)}${strand(46, 160, 3, 1)}${strand(56, 163, 4, 2)}${strand(78, 163, 4, 3)}${strand(88, 160, 3, 4)}${strand(113, 159, 2, 8)}</g>
  </g></g></g>
  <g class="fin" style="--d:2">${strand(141, 73, 5, 5)}${strand(146, 72, 3, 6)}</g>
  <g class="pc" style="--dx:60px;--r:-25deg;--d:1.150">
    <path d="M62 98L86 74" stroke="${WOODD}" stroke-width="5" stroke-linecap="round"/><path d="M62 98L86 74" stroke="${WOOD}" stroke-width="3.200" stroke-linecap="round"/>
    <path d="M58 66H138l3 2v3l3 0v-3h4v8h-4v-3h-3v3l-3 1H58z" fill="url(#mayaWoodS)" stroke="${WOODD}" stroke-width="1.200" stroke-linejoin="round"/>
    <path d="M66 70h5M101 70h5M112 70h5" stroke="${WOODD}" stroke-width="1.300"/>
    <path d="M65 67.300H137" stroke="#f0c48a" stroke-width=".9" opacity=".6"/>
    ${[78, 90, 124, 132].map((x) => `<circle cx="${x}" cy="70.500" r="1.800" fill="var(--civ)" stroke="${INK}" stroke-width=".5"/>`).join('')}
    <rect x="90.500" y="67.200" width="7" height="7" fill="var(--civ)" stroke="${INK}" stroke-width=".9"/><rect x="92.600" y="69.300" width="2.800" height="2.800" fill="${INK}"/>
    <rect class="myglint" x="91.300" y="67.900" width="2.600" height="1.200" fill="#fff"/>
    <g fill="none" stroke="${CREAM}" stroke-width="1.300"><path d="M56.500 65.500L64 68M56.500 69L64 71.500M56.500 72.500L64 75"/></g>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs>${rosettes('mayaRosP', .8)}${peltGrad('mayaPeltP')}</defs>
  <g class="unroll" style="--d:1.600"><g class="mysw" style="--k:.6">
    <path d="M9 5H25V44L17 52L9 44z" fill="url(#mayaPeltP)" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/>
    <path d="M9 5H25V44L17 52L9 44z" fill="url(#mayaRosP)"/>
    <path d="M9 38h16" stroke="${BLUE}" stroke-width="2.400"/><path d="M9 41h16" stroke="${RED}" stroke-width="1.600"/>
    ${strand(17, 51, 3, 2)}
  </g></g>
  <rect x="5" y="0" width="24" height="6" rx="1.500" fill="${WOOD}" stroke="${WOODD}" stroke-width=".8"/>
  <rect x="14.500" y="1.300" width="5" height="3.400" fill="var(--civ)"/>
</svg>`;

// painted stucco plinth under the merlons: red ground, blue stepped terraces, cream edges
const steps = (() => { let d = ''; for (let x = -22; x + 22 <= 274; x += 24) d += `M${x} -18.500h4v-2.500h3v-2.500h8v2.500h3v2.500h4`; return d; })();
// quilted cotton jacket hung on a peg on the pole
const JACKET = 'M430 76L440 72C443 78 453 78 456 72L466 76L470 92L464 94L463 134C452 138 444 138 433 134L432 94L426 92z';
const frame = `<defs>
  <pattern id="mayaQuilt" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H7M0 0V7" stroke="#8e7a5c" stroke-width=".9"/><path d="M3.500 3.500h.01" stroke="#8e7a5c" stroke-width="1.600" stroke-linecap="round"/></pattern>
  <linearGradient id="mayaCot" x1="0" x2="1"><stop offset="0" stop-color="#cfc2a6"/><stop offset=".45" stop-color="${CREAM}"/><stop offset="1" stop-color="#a8987a"/></linearGradient>
  <linearGradient id="mayaTube" x1="0" x2="1"><stop offset="0" stop-color="#d9b46a"/><stop offset=".5" stop-color="#9c7434"/><stop offset="1" stop-color="#4a3410"/></linearGradient>
</defs>
<g class="pc" style="--dx:-140px;--d:.9;--o:.1">
  <rect x="-24" y="-26.500" width="298" height="9" fill="${RED}" stroke="#3a0d08" stroke-width="1"/>
  <path d="${steps}" fill="${BLUE}" stroke="#0e2a44" stroke-width=".7"/>
  <path d="M-24 -26h298" stroke="${CREAM}" stroke-width="1.300"/><path d="M-24 -18h298" stroke="${CREAM}" stroke-width="1"/>
  <rect class="mysheen" x="-24" y="-26.500" width="298" height="9" fill="url(#mayaSheen)"/>
  <linearGradient id="mayaSheen" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</g>
<g class="pc" style="--dx:80px;--dy:-120px;--r:25deg;--d:1.050;--o:0">
  <g transform="rotate(8 470 130)">
    <rect x="467" y="18" width="7" height="222" rx="3" fill="url(#mayaTube)" stroke="#2a1d0a" stroke-width=".8"/>
    ${[40, 90, 150, 205].map((y) => `<rect x="466" y="${y}" width="9" height="5" fill="var(--civ)" stroke="${INK}" stroke-width=".6"/><path d="M466 ${y + 2.500}h9" stroke="${INK}" stroke-width=".6"/>`).join('')}
    <rect x="465.500" y="14" width="10" height="7" rx="2" fill="${WOODD}"/>
  </g>
</g>
<g class="pc" style="--dy:-90px;--r:-30deg;--d:1.200;--o:0">
  <path d="M452 60v6c0 4 3 5 5 3" fill="none" stroke="${WOODD}" stroke-width="2.400" stroke-linecap="round"/>
  <path d="M452 60v6c0 4 3 5 5 3" fill="none" stroke="${GOLD}" stroke-width="1.100" stroke-linecap="round"/>
  <path d="M448 74C448 68 456 68 456 70" fill="none" stroke="${CREAM}" stroke-width="1.300"/>
  <g class="myjk">
    <path d="${JACKET}" fill="url(#mayaCot)" stroke="#4a3c28" stroke-width="1.100" stroke-linejoin="round"/>
    <path d="${JACKET}" fill="url(#mayaQuilt)" opacity=".8"/>
    <path d="M440 72C443 80 453 80 456 72" fill="none" stroke="var(--civ)" stroke-width="2.400"/>
    <path d="M433 128C444 132 452 132 463 128V134C452 138 444 138 433 134z" fill="${RED}" stroke="#3a0d08" stroke-width=".7"/>
    <path d="${Array.from({ length: 8 }, (_, k) => `M${435 + k * 3.800} 131.500l1.900-2.400 1.900 2.400`).join('')}" fill="none" stroke="${BLUE}" stroke-width="1.100"/>
    ${Array.from({ length: 9 }, (_, k) => `<path d="M${434.500 + k * 3.400} ${135 + (k % 2)}v${6 + (k % 3)}" stroke="${k % 2 ? 'var(--civ)' : CREAM}" stroke-width="1.800" stroke-linecap="round"/>`).join('')}
    <path d="M432 94L426 92M464 94L470 92" stroke="var(--civ)" stroke-width="2"/>
  </g>
</g>`;

// mascot: tall wooden frame crest behind the head with long quetzal plumes sweeping left, jaguar hood in front
// a long tapered plume along a cubic curve: widest at ~60 % of its length, a blue-green eye near the tip
const plume = (p, w, i) => {
  const at = (t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]); };
  const L = [], R = [], N = 18;
  for (let s = 0; s <= N; s++) {
    const t = s / N, a = at(Math.max(0, t - .01)), b = at(Math.min(1, t + .01)), c = at(t);
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const hw = w * (t < .6 ? .25 + .75 * Math.sin(t / .6 * Math.PI / 2) : Math.cos((t - .6) / .4 * Math.PI / 2) * .9 + .1) / 2;
    L.push([c[0] - dy / len * hw, c[1] + dx / len * hw]); R.push([c[0] + dy / len * hw, c[1] - dx / len * hw]);
  }
  const f = (q) => q.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');
  const spine = `M${p[0].join(' ')}C${p[1].join(' ')} ${p[2].join(' ')} ${p[3].join(' ')}`;
  const e = at(.78);
  return `<g class="myplume" style="--i:${i};transform-origin:${p[0][0]}px ${p[0][1]}px">
  <path d="M${f(L)}L${f(R.reverse())}z" fill="url(#mayaQz)" stroke="#0b3a2e" stroke-width=".7" stroke-linejoin="round"/>
  <path d="${spine}" fill="none" stroke="#0b3a2e" stroke-width=".6" opacity=".7"/>
  <ellipse cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" rx="${(w * .22).toFixed(1)}" ry="${(w * .22).toFixed(1)}" fill="#2a6fd6" opacity=".8"/></g>`;
};
const costume = {
  back: `<defs><linearGradient id="mayaQz" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#127a5a"/><stop offset=".55" stop-color="#22c08a"/><stop offset="1" stop-color="#2a7fd6"/></linearGradient>
    <linearGradient id="mayaWoodC" x1="0" x2="1"><stop offset="0" stop-color="${WOODL}"/><stop offset="1" stop-color="${WOODD}"/></linearGradient></defs>
  ${plume([[63, -22], [44, -42], [12, -46], [-16, -24]], 8.500, 1)}
  ${plume([[67, -24], [56, -58], [24, -72], [-4, -62]], 9, 2)}
  ${plume([[71, -24], [72, -56], [60, -78], [38, -90]], 8.500, 3)}
  ${plume([[77, -23], [92, -44], [110, -50], [120, -40]], 7, 4)}
  <g>
    <path d="M58 38L53 -22M82 38L87 -22" stroke="url(#mayaWoodC)" stroke-width="4.400" stroke-linecap="round"/>
    <path d="M58 38L53 -22M82 38L87 -22" stroke="${WOODD}" stroke-width="4.400" stroke-dasharray="1 7" opacity=".7"/>
    ${[[24, 58, 82], [10, 56.800, 83.200], [-4, 55.600, 84.400], [-17, 54.400, 85.600]].map(([y, a, b]) => `<rect x="${a - 3}" y="${y - 2.200}" width="${b - a + 6}" height="4.400" rx="1" fill="${WOOD}" stroke="${WOODD}" stroke-width=".8"/><path d="M${a - 2} ${y - 1.300}H${b + 2}" stroke="#f0c48a" stroke-width=".6" opacity=".6"/>`).join('')}
    <rect x="65" y="12.500" width="10" height="9" fill="var(--civ)" stroke="${INK}" stroke-width=".9"/><rect x="68" y="15.500" width="4" height="3" fill="${INK}"/>
    <rect x="65" y="-1.500" width="10" height="9" fill="${JADE}" stroke="#06382d" stroke-width=".9"/><rect x="68" y="1.500" width="4" height="3" fill="#06382d"/>
    <rect x="49" y="-28" width="42" height="7" rx="1.500" fill="${RED}" stroke="#3a0d08" stroke-width=".8"/>
    <path d="M51 -24.500h4v-2h4v2h4M77 -24.500h4v-2h4v2h4" fill="none" stroke="${BLUE}" stroke-width="1.200"/>
  </g>`,
  front: `<defs>${rosettes('mayaRosC', .75)}${peltGrad('mayaPeltC')}</defs>
  <path d="M35 74C33 64 33 56 36 50L44 49C42 56 42 64 43 72z" fill="url(#mayaPeltC)" stroke="${INK}" stroke-width=".9"/>
  <path d="M105 74C107 64 107 56 104 50L96 49C98 56 98 64 97 72z" fill="url(#mayaPeltC)" stroke="${INK}" stroke-width=".9"/>
  <path d="M35 74C33 64 33 56 36 50L44 49C42 56 42 64 43 72zM105 74C107 64 107 56 104 50L96 49C98 56 98 64 97 72z" fill="url(#mayaRosC)"/>
  <g class="myear" style="transform-origin:51px 34px"><circle cx="50" cy="29" r="6.500" fill="${GOLD}" stroke="${INK}" stroke-width="1"/><circle cx="50.500" cy="29.500" r="3.400" fill="${INK}"/><circle cx="50.500" cy="30" r="1.700" fill="${CREAM}"/></g>
  <g class="myear" style="transform-origin:89px 34px;--i:3"><circle cx="90" cy="29" r="6.500" fill="${GOLD}" stroke="${INK}" stroke-width="1"/><circle cx="89.500" cy="29.500" r="3.400" fill="${INK}"/><circle cx="89.500" cy="30" r="1.700" fill="${CREAM}"/></g>
  <path d="M36 52C34 36 48 24 70 23C92 24 106 36 104 52C96 47 84 45 70 45C56 45 44 47 36 52z" fill="url(#mayaPeltC)" stroke="${INK}" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M36 52C34 36 48 24 70 23C92 24 106 36 104 52C96 47 84 45 70 45C56 45 44 47 36 52z" fill="url(#mayaRosC)"/>
  <path d="M46 31C54 26 62 25 68 25" fill="none" stroke="#fff6d8" stroke-width="1.400" opacity=".5" stroke-linecap="round"/>
  <path d="M36 52C44 47 56 45 70 45C84 45 96 47 104 52" fill="none" stroke="${CREAM}" stroke-width="3.200" stroke-linecap="round"/>
  <path d="M36 52C44 47 56 45 70 45C84 45 96 47 104 52" fill="none" stroke="var(--civ)" stroke-width="3.200" stroke-dasharray="3 5" stroke-linecap="round"/>
  <path d="M53 86C60 89 80 89 87 86L88 94C80 97 60 97 52 94z" fill="${CREAM}" stroke="#4a3c28" stroke-width="1"/>
  <path d="M56 87l4 8M62 88l4 8M68 88.500l4 8M74 88.500l4 8M80 88l4 7M84 87l-4 8M78 88l-4 8M72 88.500l-4 8M66 88.500l-4 8M60 88l-4 7" stroke="#8e7a5c" stroke-width=".6"/>
  <path d="M53 86C60 89 80 89 87 86" fill="none" stroke="var(--civ)" stroke-width="2"/>
  <circle cx="70" cy="92.500" r="2.800" fill="${JADE}" stroke="#06382d" stroke-width=".8"/>`,
};

const css = `
#stage[data-civ=maya] .gob.dressed .tuft{opacity:0}
#stage[data-civ=maya] .mysw{transform-box:fill-box;transform-origin:50% 0;animation:mySw calc(4.200s + var(--k,0)*1s) ease-in-out infinite alternate}
@keyframes mySw{from{transform:skewX(-2.200deg) rotate(.6deg)}to{transform:skewX(2deg) rotate(-.8deg)}}
#stage[data-civ=maya] .mytail{transform-box:fill-box;transform-origin:30% 0;animation:mySw 2.600s ease-in-out infinite alternate-reverse}
#stage[data-civ=maya] .mybd{transform-box:fill-box;transform-origin:50% 0;animation:myBd calc(1.800s + var(--i)*.23s) calc(var(--i)*-.41s) ease-in-out infinite alternate}
@keyframes myBd{from{transform:rotate(-7deg)}to{transform:rotate(7deg)}}
#stage[data-civ=maya] .myjk{transform-box:fill-box;transform-origin:50% 0;animation:myJk 3.400s ease-in-out infinite alternate}
@keyframes myJk{from{transform:rotate(-2deg)}to{transform:rotate(2.400deg)}}
#stage[data-civ=maya] .myplume{transform-box:view-box;animation:myPl calc(2.800s + var(--i)*.35s) calc(var(--i)*-.6s) ease-in-out infinite alternate}
@keyframes myPl{from{transform:rotate(-4deg)}to{transform:rotate(5deg)}}
#stage[data-civ=maya] .myear{transform-box:view-box;animation:myEar 5s calc(var(--i,0)*-.9s) ease-in-out infinite}
@keyframes myEar{0%,80%,100%{transform:none}86%{transform:rotate(-14deg)}92%{transform:rotate(8deg)}}
#stage[data-civ=maya] .myglint{animation:xGlint 4.500s ease-in-out infinite}
#stage[data-civ=maya] .mysheen{transform-box:fill-box;animation:mySheen 6s ease-in-out infinite;transform-origin:0 0}
@keyframes mySheen{0%{transform:translateX(-100%) scaleX(.25);opacity:0}10%{opacity:1}45%{transform:translateX(100%) scaleX(.25);opacity:0}100%{opacity:0}}
`;

export default {
  id: 'maya', name: 'Maya', kit: 'meso',
  accent: '#ff9933', accent2: '#c4621a', cloth: '#b8322a', metal: JADE,
  standard, pennant, costume, css, frame,
};
