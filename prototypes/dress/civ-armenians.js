// CIV layer: Armenians (kit: caucasus). Apricot accent, pomegranate-red cloth. Standard: a dragon carpet hung from
// the yard (our own drawing in the knotted dragon-carpet manner: a lattice of stepped lozenges, an angular S-dragon,
// palmettes, a fringe). Headgear: a segmented conical helmet with a mail aventail. Frame pieces: a pomegranate
// branch hanging from the top beam, an apricot branch climbing the pole. No church or state symbols.

const f = (v) => +v.toFixed(2);
const lz = (cx, cy, n, s, fill) => { let d = '';
  for (let i = -n; i <= n; i++) { const w = (n - Math.abs(i)) * 2 * s + s; d += `M${f(cx - w / 2)} ${f(cy + i * s - s / 2)}h${f(w)}v${f(s)}h${f(-w)}z`; }
  return `<path d="${d}" fill="${fill}"/>`; };

// the dragon: an angular S of knotted blocks, jaws open at the top, a forked tail at the bottom, spikes along the back
const DRAGON = 'M60 40l-6-4h-9l-6 5-7 0-2 6 6 2 6-3h6l-8 9-9 12-6 13 2 12 8 10 9 10 2 12-5 10-10 6-7-2-3 6 6 4 10-3 9-7 5-12-1-14-8-11-9-10-4-9 3-10 7-9 9-10 8-5 6 3z';
const SPIKES = 'M44 52l-4-6 1 8zM38 60l-6-4 2 8zM32 70l-7-2 4 7zM33 92l-7 2 7 3zM40 102l-6 4 7 1zM49 112l-4 6 6-2z';
const palmette = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${lz(0, 0, 3, 1.6, '#efe2c4')}${lz(0, 0, 2, 1.6, 'var(--civ)')}${lz(0, 0, 0, 1.6, '#1d2a55')}</g>`;

const standard = `<svg width="92" height="236" viewBox="0 0 92 236"><g class="unroll" style="--d:1.35"><g class="asway">
  <defs>
    <clipPath id="armC"><rect x="4" y="8" width="84" height="196"/></clipPath>
    <pattern id="armKn" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 .2h3M.2 0v3" stroke="#000" stroke-opacity=".2" stroke-width=".7"/></pattern>
    <linearGradient id="armSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".14"/><stop offset=".55" stop-color="#000" stop-opacity=".22"/><stop offset=".8" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  </defs>
  <path d="M14 0v9M46 0v9M78 0v9" stroke="#d9c49a" stroke-width="2.4" stroke-linecap="round"/>
  <g clip-path="url(#armC)">
    <rect width="92" height="210" fill="var(--civ3)"/>
    <!-- lattice of serrated lozenges -->
    <path d="M4 40L46 12 88 40M4 40l42 28 42-28M4 132l42-28 42 28M4 132l42 28 42-28M4 40v92M88 40v92" fill="none" stroke="#1d2a55" stroke-width="3.4" opacity=".75"/>
    <path d="M4 40L46 12 88 40M4 40l42 28 42-28M4 132l42-28 42 28M4 132l42 28 42-28" fill="none" stroke="#e0a63e" stroke-width="1" stroke-dasharray="2.4 2.4"/>
    ${palmette(46, 40, 1)}${palmette(46, 132, 1)}${palmette(18, 86, .8)}${palmette(74, 176, .8)}${palmette(18, 186, .7)}
    <!-- the dragon -->
    <g transform="translate(6 18)"><path d="${SPIKES}" fill="#efe2c4"/><path d="${DRAGON}" fill="#1d2a55" stroke="#efe2c4" stroke-width="2.4" stroke-linejoin="miter"/>
      <path d="${DRAGON}" fill="none" stroke="var(--civ)" stroke-width="1.1" stroke-dasharray="3 2" transform="translate(0 0)" opacity=".9"/>
      <path d="M54 36l9-8-2 9zM54 45l9 4-8 0z" fill="var(--civ)" stroke="#2a0a0a" stroke-width=".6"/><rect x="47" y="39" width="3" height="3" fill="var(--civ)" class="aeye"/></g>
    <!-- knotted border -->
    <rect x="4" y="8" width="84" height="196" fill="none" stroke="#1d2a55" stroke-width="12"/>
    <rect x="4" y="8" width="84" height="196" fill="none" stroke="#efe2c4" stroke-width="1.4" stroke-dasharray="2 2"/>
    ${[18, 46, 74].map((x) => lz(x, 11, 1, 1.4, 'var(--civ)')).join('')}${[18, 46, 74].map((x) => lz(x, 201, 1, 1.4, 'var(--civ)')).join('')}
    ${[30, 58, 86, 114, 142, 170].map((y) => lz(7, y, 1, 1.4, '#e0a63e') + lz(85, y, 1, 1.4, '#e0a63e')).join('')}
    <rect width="92" height="210" fill="url(#armKn)"/>
    <rect class="asheen" x="-92" width="276" height="210" fill="url(#armSh)"/>
  </g>
  <rect x="4" y="8" width="84" height="196" fill="none" stroke="#2a0a0a" stroke-width="1"/>
  <rect x="2" y="5" width="88" height="5" rx="2.5" fill="#6a4122" stroke="#2a160a" stroke-width=".8"/>
  ${Array.from({ length: 15 }, (_, i) => `<g transform="translate(${f(7 + i * 5.6)} 204)"><path class="atas" style="--i:${i}" d="M-1.2 0v${12 + (i % 3) * 3}M0 0v${14 + (i % 2) * 3}M1.2 0v${12 + (i % 4) * 2}" stroke="#eadcbc" stroke-width=".9"/></g>`).join('')}
</g></g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.6"><g class="asway" style="animation-delay:-2s">
  <rect x="3" y="4" width="28" height="52" fill="var(--civ3)" stroke="#2a0a0a"/>
  <rect x="3" y="4" width="28" height="52" fill="none" stroke="#1d2a55" stroke-width="5"/><rect x="3" y="4" width="28" height="52" fill="none" stroke="#efe2c4" stroke-width=".9" stroke-dasharray="1.6 1.6"/>
  ${lz(17, 30, 4, 2, '#1d2a55')}${lz(17, 30, 3, 2, '#efe2c4')}${lz(17, 30, 2, 2, 'var(--civ)')}${lz(17, 30, 0, 2, '#7d1a1c')}
  <rect x="1" y="1" width="32" height="4" rx="2" fill="#6a4122"/>
  <path d="M6 56v12M10 56v14M14 56v11M18 56v14M22 56v12M26 56v13M30 56v11" stroke="#eadcbc" stroke-width=".9"/>
</g></g></svg>`;

// pomegranate: round fruit, a small calyx crown, one split open showing seeds
const pom = (x, y, rr, open) => `<g transform="translate(${x} ${y})"><circle r="${rr}" fill="#a3172a" stroke="#3a0610" stroke-width="1"/>
  <path d="M${-rr * .5} ${-rr * .55}a${rr * .7} ${rr * .7} 0 0 1 ${rr * .7}-${rr * .3}" fill="none" stroke="#ff8a8a" stroke-width="1.4" opacity=".7" stroke-linecap="round"/>
  <path d="M-3 ${-rr + 1}l-1-4 2 2 2-3 2 3 2-2-1 4z" fill="#7a1220" stroke="#3a0610" stroke-width=".7"/>
  ${open ? `<path d="M${rr * .1} ${-rr * .2}l${rr * .8} ${rr * .1} ${-rr * .1} ${rr * .8}z" fill="#f2c1a8" stroke="#3a0610" stroke-width=".6"/><g fill="#e0244a">${[[.42, .1], [.6, .3], [.42, .38], [.6, .55], [.3, .25]].map(([a, b]) => `<circle cx="${f(a * rr)}" cy="${f(b * rr)}" r="${f(rr * .1)}"/>`).join('')}</g>` : ''}</g>`;
const leaf = (x, y, rot, fill = '#4f7a35') => `<path transform="translate(${x} ${y}) rotate(${rot})" d="M0 0c4-4 11-4 15 0-4 4-11 4-15 0z" fill="${fill}" stroke="#1f3312" stroke-width=".6"/>`;
const apricot = (x, y, rr) => `<g transform="translate(${x} ${y})"><circle r="${rr}" fill="var(--civ)" stroke="#6a2c06" stroke-width=".8"/><path d="M0 ${-rr}c-1 ${rr * .8}-1 ${rr * 1.4} 0 ${rr * 2}" fill="none" stroke="#c4561a" stroke-width=".7" opacity=".7"/><circle cx="${-rr * .35}" cy="${-rr * .35}" r="${rr * .3}" fill="#ffd3a8" opacity=".6"/></g>`;

const frame = `
<g transform="translate(34 -34) scale(1.4)"><g class="pc" style="--dy:-70px;--r:-20deg;--d:1.05;--o:0"><g class="aswing">
  <path d="M0 0c6 4 14 6 20 6M20 6c10 0 18-2 26-6M20 6v10M46 0v8" stroke="#4a2c14" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  ${leaf(2, 0, 150)}${leaf(26, 5, 20)}${leaf(40, 2, -30)}
  ${pom(20, 22, 8, true)}${pom(46, 16, 7, false)}
</g></g></g>
<g transform="translate(464 210)"><g class="pc" style="--dy:60px;--r:15deg;--d:1.15;--o:0"><g class="aswing" style="animation-delay:-1.5s">
  <path d="M-4 30C4 14-6 4 2-12S0-34 -4-44" stroke="#5a3418" stroke-width="2" fill="none" stroke-linecap="round"/>
  ${leaf(0, -10, -20)}${leaf(-2, -30, 200)}${leaf(2, 6, 10)}${leaf(-3, -42, -50)}
  ${apricot(9, -4, 4.2)}${apricot(-9, -22, 4)}${apricot(7, -36, 3.6)}
</g></g></g>`;

const costume = {
  // the mail aventail hangs behind the head: it shows at the sides and the neck
  back: `<defs><pattern id="armMail" width="4" height="3.4" patternUnits="userSpaceOnUse"><circle cx="2" cy="1.7" r="1.4" fill="none" stroke="#b9c2c9" stroke-width=".8"/><circle cx="0" cy="0" r="1.4" fill="none" stroke="#8a949c" stroke-width=".8"/><circle cx="4" cy="0" r="1.4" fill="none" stroke="#8a949c" stroke-width=".8"/></pattern></defs>
  <path d="M34 42h72l3 40c-8 6-18 9-39 9s-31-3-39-9z" fill="#2c3238"/><path d="M34 42h72l3 40c-8 6-18 9-39 9s-31-3-39-9z" fill="url(#armMail)"/>
  <path d="M33 82c8 6 18 9 37 9s29-3 39-9" fill="none" stroke="#d9a441" stroke-width="1.4"/>`,
  front: `
  <path d="M41 45C42 30 52 14 70 0c18 14 28 30 29 45z" fill="#7d8790" stroke="#14181b" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M70 0v45M58 10c-6 10-8 22-8 35M82 10c6 10 8 22 8 35" fill="none" stroke="#d9a441" stroke-width="2.4"/>
  <path d="M70 0v45M58 10c-6 10-8 22-8 35M82 10c6 10 8 22 8 35" fill="none" stroke="#6b4a10" stroke-width=".6"/>
  <g fill="#f2d68a">${[8, 16, 24, 32, 40].map((y) => `<circle cx="70" cy="${y}" r="1"/>`).join('')}</g>
  <path d="M47 30c3-9 8-15 14-19" fill="none" stroke="#dfe7ee" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>
  <circle cx="70" cy="-1" r="2.6" fill="#d9a441" stroke="#6b4a10" stroke-width=".8"/>
  <path d="M38 41h64l-1 7H39z" fill="#d9a441" stroke="#4a3210" stroke-width="1"/>
  <path d="M42 44.5h56" stroke="var(--civ)" stroke-width="1.6" stroke-dasharray="3 2"/>
  <path d="M38 48l-2 15 9 2 2-17zM102 48l2 15-9 2-2-17z" fill="#2c3238"/><path d="M38 48l-2 15 9 2 2-17zM102 48l2 15-9 2-2-17z" fill="url(#armMail)" stroke="#14181b" stroke-width=".8"/>`,
};

const css = `
#stage[data-civ=armenians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=armenians] .asway{transform-box:fill-box;transform-origin:50% 0;animation:aSway 5.800s ease-in-out infinite}
@keyframes aSway{0%,100%{transform:rotate(-1.4deg) skewX(1.200deg)}50%{transform:rotate(1.800deg) skewX(-2deg)}}
#stage[data-civ=armenians] .asheen{animation:aSheen 4.600s linear infinite}
@keyframes aSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=armenians] .atas{transform-box:fill-box;transform-origin:50% 0;animation:aTas 1.700s calc(var(--i)*-.13s) ease-in-out infinite alternate}
@keyframes aTas{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
#stage[data-civ=armenians] .aswing{transform-box:fill-box;transform-origin:30% 0;animation:aSwing 3.600s ease-in-out infinite alternate}
@keyframes aSwing{from{transform:rotate(-3deg)}to{transform:rotate(3.500deg)}}
#stage[data-civ=armenians] .aeye{animation:aEye 3s ease-in-out infinite}
@keyframes aEye{50%{opacity:.3}}
`;

export default {
  id: 'armenians', name: 'Armenians', kit: 'caucasus',
  accent: '#ff8c42', accent2: '#d0601e', cloth: '#8e1a2c', metal: '#d9a441',
  standard, pennant, costume, css, frame,
};
