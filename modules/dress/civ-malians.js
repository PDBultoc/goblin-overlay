// CIV layer: Malians (kit: africa). Warm orange accent, mud-dyed bogolan cloth, gold.
// Standard: a bogolan mud-cloth banner with geometric marks and leather tassels. Headgear: a quilted cavalry cap
// with a band of cowrie shells. Frame pieces: a woven straw shade mat on the lintel, a cavalry lance with a
// horsehair tassel against the left tower, glints of gold dust on the mud. All drawings are our own.

const MUD = '#3b2314', CREAM = '#ecdcb8', GOLD = '#f2c04a';
const cowrie = (x, y, rot = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><ellipse rx="1.700" ry="2.400" fill="#f6eedb" stroke="#6b5636" stroke-width=".5"/><path d="M0 -1.600v3.200" stroke="#8a7350" stroke-width=".6"/><ellipse cx="-.6" cy="-.8" rx=".5" ry=".8" fill="#fff" opacity=".8"/></g>`;
const zig = (x0, x1, y, h, step) => { let d = `M${x0} ${y}`; for (let x = x0; x + step <= x1; x += step) d += `l${step / 2} ${-h} ${step / 2} ${h}`; return d; };
const sheen = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".25" stop-color="#ffd9a8" stop-opacity=".14"/><stop offset=".5" stop-color="#000" stop-opacity=".26"/><stop offset=".75" stop-color="#ffd9a8" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>`;

const tassel = (x, y, i) => `<g transform="translate(${x} ${y})"><g class="mltas" style="--i:${i}"><path d="M0 0v5" stroke="#7a4a22" stroke-width="1.400"/><circle cy="6" r="2" fill="#7a4a22" stroke="#2a160a" stroke-width=".5"/>
  <path d="M-1.600 7.500l-1 12M0 8v13M1.600 7.500l1 12" stroke="#5a3218" stroke-width="1.100" stroke-linecap="round"/></g></g>`;

const marks = `
  <rect x="6" y="10" width="76" height="134" fill="none" stroke="${CREAM}" stroke-width="1.200"/>
  <path d="${[...Array(19)].map((_, i) => `M6 ${14 + i * 7}h3M79 ${14 + i * 7}h3`).join('')}" stroke="${CREAM}" stroke-width="1"/>
  <path d="${zig(12, 77, 28, 10, 10)}" fill="none" stroke="${CREAM}" stroke-width="2"/>
  ${[22, 44, 66].map((x) => `<path d="M${x} 34l10 10-10 10-10-10z" fill="none" stroke="${CREAM}" stroke-width="1.600"/><path d="M${x} 39.500l4.500 4.500-4.500 4.500-4.500-4.500z" fill="${CREAM}"/>`).join('')}
  ${[...Array(12)].map((_, i) => `<circle cx="${11 + i * 6}" cy="60" r="1.400" fill="${CREAM}"/>`).join('')}
  <path d="M14 66v32M20 66v32M74 66v32M68 66v32" stroke="${CREAM}" stroke-width="1.100"/><path d="${[...Array(8)].map((_, i) => `M14 ${69 + i * 4}h6M68 ${69 + i * 4}h6`).join('')}" stroke="${CREAM}" stroke-width="1"/>
  ${[30, 44, 58].map((x) => [72, 82, 92].map((y) => `<circle cx="${x}" cy="${y}" r="3.600" fill="none" stroke="${CREAM}" stroke-width="1.200"/><circle cx="${x}" cy="${y}" r="1.100" fill="${CREAM}"/>`).join('')).join('')}
  <path d="M10 102h68" stroke="var(--civ)" stroke-width="1.600" stroke-dasharray="4 2.500"/>
  ${[...Array(9)].map((_, i) => `<path d="M${10 + i * 7.600} ${i % 2 ? 108 : 122}l3.800 ${i % 2 ? 14 : -14} 3.800 ${i % 2 ? -14 : 14}z" fill="${CREAM}"/>`).join('')}
  <path d="${zig(12, 77, 136, -6, 8)}" fill="none" stroke="${CREAM}" stroke-width="1.500"/>${[...Array(9)].map((_, i) => `<circle cx="${16 + i * 8}" cy="134" r="1" fill="var(--civ)"/>`).join('')}`;

const standard = `<svg width="88" height="186" viewBox="0 0 88 186">
  <defs><clipPath id="mlC"><path d="M2 6H86V150H2Z"/></clipPath>${sheen('mlS')}
    <filter id="mlB" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="3" seed="12"/><feColorMatrix values="0 0 0 0 .12  0 0 0 0 .06  0 0 0 0 .02  0 0 0 -1.200 .7"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter></defs>
  <g class="unroll" style="--d:1.350"><g class="mlsway">
    <path d="M12 0v8M44 0v8M76 0v8" stroke="#7a4a22" stroke-width="2.400" stroke-linecap="round"/>
    <g clip-path="url(#mlC)">
      <rect width="88" height="152" fill="${MUD}" filter="url(#mlB)"/>
      <g opacity=".92">${marks}</g>
      <rect class="mlsheen" x="-88" width="264" height="152" fill="url(#mlS)"/>
    </g>
    <path d="M2 6H86V150H2Z" fill="none" stroke="#1a0c04" stroke-width="1.200"/>
    ${[10, 27, 44, 61, 78].map((x, i) => tassel(x, 150, i)).join('')}
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="mlPc"><path d="M2 4H32V50H2Z"/></clipPath>${sheen('mlPs')}</defs>
  <g class="unroll" style="--d:1.600"><g class="mlsway" style="animation-delay:-2s">
    <g clip-path="url(#mlPc)"><rect width="34" height="54" fill="${MUD}"/>
      <rect x="4" y="7" width="26" height="41" fill="none" stroke="${CREAM}" stroke-width=".9"/>
      <path d="${zig(7, 27, 18, 6, 5)}" fill="none" stroke="${CREAM}" stroke-width="1.300"/>
      ${[11, 17, 23].map((x) => `<circle cx="${x}" cy="27" r="2.300" fill="none" stroke="${CREAM}" stroke-width=".9"/><circle cx="${x}" cy="27" r=".7" fill="${CREAM}"/>`).join('')}
      <path d="M6 34h22" stroke="var(--civ)" stroke-width="1.100" stroke-dasharray="3 2"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M${6 + i * 5.500} ${i % 2 ? 38 : 45}l2.750 ${i % 2 ? 7 : -7} 2.750 ${i % 2 ? -7 : 7}z" fill="${CREAM}"/>`).join('')}
      <rect class="mlsheen" x="-34" width="102" height="54" fill="url(#mlPs)"/></g>
    <path d="M2 4H32V50H2Z" fill="none" stroke="#1a0c04" stroke-width=".8"/>
    ${tassel(9, 50, 1)}${tassel(25, 50, 3)}
  </g></g>
  <rect x="4" y="0" width="26" height="5" rx="2" fill="#7a5a34" stroke="#2a1a0c" stroke-width=".7"/>
</svg>`;

// woven straw shade mat draped on the lintel (stays on the frame: ends 8 px into the picture at most)
let straw = ''; for (let x = 20, i = 0; x <= 190; x += 3.400, i++) straw += `M${x.toFixed(1)} 0c${i % 2 ? .6 : -.6} 3 ${i % 2 ? -.4 : .4} 5 ${(i % 3) - 1} ${6 + (i % 3) * 1.200}`;
const mat = `<g class="pc" style="--dy:-70px;--r:-6deg;--d:1.050;--o:0">
  <path d="M30 -38L28 -24M180 -38L182 -24" stroke="#5a3a1c" stroke-width="1.300"/>
  <path d="M18 -26L192 -26L194 0Q105 3 16 0Z" fill="url(#mlMat)" stroke="#5a3a14" stroke-width="1"/>
  <path d="M18 -19.500L193 -19.500" stroke="#8a3a1a" stroke-width="2.600" opacity=".85"/><path d="M18 -15.500L193 -15.500" stroke="var(--civ)" stroke-width="1.600"/><path d="M17 -7L194 -7" stroke="#2a160a" stroke-width="2.200" opacity=".7"/>
  <path d="M20 -24.500L190 -24.500" stroke="#f3dc9a" stroke-width=".8" opacity=".6"/>
  <g class="mlfr"><path d="${straw}" fill="none" stroke="#d9b56a" stroke-width="1" stroke-linecap="round"/></g>
  <path d="M24 -27c2 4 6 4 8 0M176 -27c2 4 6 4 8 0" fill="none" stroke="#3a2412" stroke-width="1.400"/>
</g>`;

let hair = ''; for (let i = 0; i < 11; i++) { const dx = (i - 5) * .9, l = 26 + (i % 3) * 5; hair += `<path class="mlh" style="--i:${i}" d="M${(-12 + dx * .4).toFixed(1)} -111c${dx.toFixed(1)} ${l * .35} ${(dx * 1.6).toFixed(1)} ${l * .7} ${(dx * 1.3 + (i % 2 ? 2 : -2)).toFixed(1)} ${l}" stroke="${['var(--civ)', '#1a1008', '#c4561a'][i % 3]}" stroke-width="1.600"/>`; }
const lance = `<g class="pc" style="--dy:260px;--d:.85;--o:0">
  <path d="M-12 250V-112" stroke="#3a2412" stroke-width="3.600" stroke-linecap="round"/><path d="M-12.800 248V-112" stroke="#8a6a44" stroke-width="1" opacity=".8"/>
  <path d="M-14 90h4M-14 94h4M-14 98h4M-14 102h4" stroke="#a3401c" stroke-width="1.300"/>
  <path d="M-12 -146C-8 -138 -7.500 -126 -10 -118H-14C-16.500 -126 -16 -138 -12 -146z" fill="url(#mlIron)" stroke="#1a1c1e" stroke-width=".8"/><path d="M-12 -144V-119" stroke="#e8eef2" stroke-width=".6" opacity=".7"/>
  <rect x="-14.500" y="-118" width="5" height="6" rx="1" fill="${GOLD}" stroke="#6b4a10" stroke-width=".6"/>
  <g fill="none" stroke-linecap="round">${hair}</g>
</g>`;

const glints = [[40, -6], [130, -12], [230, -4], [-14, 30], [-6, 150], [408, 90], [420, 200], [90, 236], [250, 232], [350, 238], [100, -12]];
const frame = `<defs>
  <pattern id="mlMat" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#c49a52"/><path d="M0 2h4M4 6h4" stroke="#e6c886" stroke-width="2.400"/><path d="M6 0v4M2 4v4" stroke="#a87e3e" stroke-width="2.400"/></pattern>
  <linearGradient id="mlIron" x1="0" x2="1"><stop offset="0" stop-color="#c7d0d6"/><stop offset="1" stop-color="#4f585e"/></linearGradient>
  <radialGradient id="mlGd"><stop offset="0" stop-color="#fff6d0"/><stop offset=".35" stop-color="${GOLD}"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/></radialGradient></defs>
  ${mat}${lance}
  <g class="fin" style="--d:2.100">${glints.map(([x, y], i) => `<g transform="translate(${x} ${y})"><circle class="mlgl" style="--i:${i}" r="3.400" fill="url(#mlGd)"/></g>`).join('')}</g>`;

// quilted cavalry cap: indigo cotton dome, diamond quilting, a padded leather roll with cowries
const capClip = 'M41 47C41 27 54 15 70 15s29 12 29 32z';
let quilt = ''; for (let k = -40; k <= 60; k += 7) quilt += `M${k + 30} 47l${30} -32M${k + 50} 47l${-30} -32`;
const brimY = (x) => 44.500 - 3 * (1 - ((x - 70) / 30) ** 2);
const costume = {
  front: `
  <defs><clipPath id="mlCap"><path d="${capClip}"/></clipPath></defs>
  <path d="${capClip}" fill="#33407a" stroke="#141a36" stroke-width="1.200"/>
  <g clip-path="url(#mlCap)"><path d="${quilt}" stroke="#e8dcc0" stroke-width=".8" stroke-dasharray="1.800 1.200" opacity=".75"/><path d="M45 34c4-10 12-16 22-17" fill="none" stroke="#8a96d0" stroke-width="2" opacity=".5" stroke-linecap="round"/></g>
  <path d="M70 15c-2-4-1-7 0-9 1 2 2 5 0 9z" fill="#7a4a22" stroke="#2a160a" stroke-width=".7"/>${cowrie(70, 8, 0, 1)}
  <path d="M38 48c4-7 60-7 64 0l-1.500 4.500c-8-5.500-53-5.500-61 0z" fill="#7a4a22" stroke="#2a160a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M40 47.500c6-5.500 54-5.500 60 0" fill="none" stroke="var(--civ)" stroke-width="1"/>
  ${[46, 52, 58, 64, 70, 76, 82, 88, 94].map((x) => cowrie(x, brimY(x) + 3.200, 0, .95)).join('')}
  <path d="M41 50.500C40 55 38.500 59 37.500 64M99 50.500c1 4.500 2.500 8.500 3.500 13.500" fill="none" stroke="#5a3218" stroke-width=".9"/>
  ${cowrie(40.400, 54.500, 12, .85)}${cowrie(38.800, 59.500, 12, .85)}${cowrie(37.400, 64.500, 12, .9)}
  ${cowrie(99.600, 54.500, -12, .85)}${cowrie(101.200, 59.500, -12, .85)}${cowrie(102.600, 64.500, -12, .9)}
  <path d="M54 86c6 5 26 5 32 0" fill="none" stroke="#5a3218" stroke-width="1"/>
  ${[57, 63, 70, 77, 83].map((x) => cowrie(x, x === 70 ? 90.600 : (x === 63 || x === 77 ? 89.600 : 87.800), (70 - x) * 2, .95)).join('')}
  <circle cx="70" cy="93.500" r="2.400" fill="${GOLD}" stroke="#6b4a10" stroke-width=".6"/>`,
};

const css = `
#stage[data-civ=malians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=malians] .mlsway{transform-box:fill-box;transform-origin:50% 0;animation:mlSway 6s ease-in-out infinite}
@keyframes mlSway{0%,100%{transform:rotate(-1.300deg) skewX(1.200deg)}50%{transform:rotate(1.700deg) skewX(-2deg)}}
#stage[data-civ=malians] .mlsheen{animation:mlSheen 5s linear infinite}
@keyframes mlSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=malians] .mltas{transform-box:fill-box;transform-origin:50% 0;animation:mlTas calc(1.600s + var(--i)*.13s) calc(var(--i)*-.4s) ease-in-out infinite alternate}
@keyframes mlTas{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
#stage[data-civ=malians] .mlfr{transform-box:fill-box;transform-origin:50% 0;animation:mlFr 2.300s ease-in-out infinite alternate}
@keyframes mlFr{from{transform:skewX(-10deg)}to{transform:skewX(8deg)}}
#stage[data-civ=malians] .mlh{transform-box:fill-box;transform-origin:50% 0;animation:mlHair calc(1.500s + var(--i)*.08s) calc(var(--i)*-.17s) ease-in-out infinite alternate}
@keyframes mlHair{from{transform:rotate(-7deg)}to{transform:rotate(12deg)}}
#stage[data-civ=malians] .mlgl{transform-box:fill-box;transform-origin:center;animation:mlGl 3.200s calc(var(--i)*-.71s) ease-in-out infinite}
@keyframes mlGl{0%,60%,100%{transform:scale(.25);opacity:.2}75%{transform:scale(1.150);opacity:1}85%{transform:scale(.6);opacity:.6}}
`;

export default {
  id: 'malians', name: 'Malians', kit: 'africa',
  accent: '#ff9a3c', accent2: '#d1601a', cloth: MUD, metal: GOLD,
  standard, pennant, costume, css, frame,
};
