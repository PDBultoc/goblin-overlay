// CIV layer: Gurjaras (kit: india). Magenta accent, turmeric cloth, silver; a mirror-work (shisha) embroidered banner
// with a camel, a mirror-work valance under the arch and strings of camel bells on the pole, a tall bandhani
// (tie-dye) turban with a trailing end and a tall dark plume for the mascot. All drawings are our own.
const f = (n) => +n.toFixed(1);

// camel facing right with a saddle cloth, in a 70x56 box
const CAMEL = `
  <path d="M12 24C7 27 6 33 8 37" fill="none" stroke="#3a2410" stroke-width="1.600" stroke-linecap="round"/>
  <path d="M16 30l-2 12 1 12M22 31l1 11-1 12M40 31l2 11-1 12M46 30l3 12 0 12" fill="none" stroke="#3a2410" stroke-width="4" stroke-linecap="round"/>
  <path d="M16 30l-2 12 1 12M22 31l1 11-1 12M40 31l2 11-1 12M46 30l3 12 0 12" fill="none" stroke="#d9a05a" stroke-width="2.400" stroke-linecap="round"/>
  <path d="M11 26C12 19 17 17 21 17C24 6 36 5 40 16C45 16 49 19 50 23C54 18 55 9 59 5L66 5C69 7 69 10 65 11L62 11C59 17 57 26 51 31C44 34 20 34 11 26Z" fill="#d9a05a" stroke="#3a2410" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M60 4l1-3 2 3" fill="#d9a05a" stroke="#3a2410" stroke-width=".8"/><circle cx="62" cy="7.500" r="1" fill="#3a2410"/>
  <path d="M22 17C26 22 36 22 40 17L42 28H20Z" style="fill:var(--civ)" stroke="#3a2410" stroke-width=".9"/>
  <path d="M22 28l2 4 2-4 2 4 2-4 2 4 2-4 2 4 2-4 2 4 2-4" fill="none" stroke="var(--civ3)" stroke-width="1.100"/>
  <circle class="gjmir" cx="31" cy="23.500" r="2.200"/><path d="M50 22c3-1 5-3 6-6" fill="none" style="stroke:var(--civ)" stroke-width="1.600"/>`;

const mirror = (x, y, r = 2.600) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r + 1.100}" fill="none" stroke="var(--civ3)" stroke-width="1.100"/><circle class="gjmir" cx="${f(x)}" cy="${f(y)}" r="${r}"/>`;
const zigzag = (x0, x1, y, h, col) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += 6) d += `l3 ${-h}l3 ${h}`; return `<path d="${d}" fill="none" stroke="${col}" stroke-width="1.300"/>`; };
// lower edge: five triangular flaps with pompoms
const FLAPS = (() => { let d = 'M34 28H122V132'; for (let i = 5; i > 0; i--) d += `L${f(34 + (i - .5) * 17.600)} 150L${f(34 + (i - 1) * 17.600)} 132`; return d + 'Z'; })();

const standard = `<svg width="130" height="210" viewBox="0 0 130 210">
  <defs><clipPath id="gjClip"><path d="${FLAPS}"/></clipPath>
    <linearGradient id="gjSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".12"/><stop offset=".55" stop-color="#000" stop-opacity=".25"/><stop offset=".8" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <rect x="28" y="10" width="4" height="22" fill="#9aa4ac"/>
  <g class="pc" style="--dy:-30px;--sc:.3;--d:1.150"><path d="M30 -6l5 9-5 9-5-9z" fill="var(--civm)" stroke="#3a4048" stroke-width=".8"/><circle cx="30" cy="3" r="1.800" class="gjmir"/><rect x="26" y="12" width="8" height="4" rx="1" fill="var(--civm)" stroke="#3a4048" stroke-width=".6"/></g>
  <g class="pc" style="--dx:-40px;--d:1.200"><rect x="24" y="22" width="102" height="6" rx="3" fill="#6a3a1a" stroke="#2a1606" stroke-width=".8"/>
    ${[38, 60, 82, 104].map((x) => `<circle cx="${x}" cy="25" r="1.600" fill="var(--civm)"/>`).join('')}<circle cx="125" cy="25" r="3.600" fill="var(--civm)" stroke="#3a4048" stroke-width=".7"/></g>
  <g class="unroll" style="--d:1.350"><g class="gjsway">
    <g clip-path="url(#gjClip)">
      <rect x="34" y="28" width="88" height="124" fill="#1b1430"/>
      <rect x="34" y="28" width="88" height="12" style="fill:var(--civ2)"/>${zigzag(36, 120, 37, 5, 'var(--civ3)')}
      ${zigzag(36, 120, 132, 5, 'var(--civ)')}
      <path d="M40 46H116V126H40Z" fill="none" style="stroke:var(--civ)" stroke-width="1.400"/><path d="M43 49H113V123H43Z" fill="none" stroke="var(--civ3)" stroke-width="1" stroke-dasharray="3 2"/>
      ${[52, 66, 80, 94, 108].map((x) => mirror(x, 56)).join('')}${[52, 66, 80, 94, 108].map((x) => mirror(x, 116)).join('')}
      ${[0, 1, 2, 3, 4].map((i) => mirror(37.800 + i * 17.600 + 8.800, 138, 2.200)).join('')}
      <g class="gjstride"><g transform="translate(45 61) scale(.94)">${CAMEL}</g></g>
      <rect class="gjsheen" x="-54" y="28" width="264" height="124" fill="url(#gjSh)"/>
    </g>
    <path d="${FLAPS}" fill="none" stroke="#0e0a18" stroke-width="1.200" stroke-linejoin="round"/>
    ${[0, 1, 2, 3, 4].map((i) => `<circle class="gjpom" style="--i:${i}" cx="${f(34 + (i + .5) * 17.600)}" cy="153" r="3.600" fill="${i % 2 ? 'var(--civ3)' : 'var(--civ)'}" stroke="#0006" stroke-width=".6"/>`).join('')}
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.600"><g class="gjsway" style="animation-delay:-2s">
  <path d="M2 2H32V48L24.500 60L17 48L9.500 60L2 48Z" fill="#1b1430" stroke="#0e0a18" stroke-width="1" stroke-linejoin="round"/>
  <rect x="2" y="2" width="30" height="7" style="fill:var(--civ2)"/>${zigzag(3, 31, 8, 3, 'var(--civ3)')}
  ${mirror(10, 18)}${mirror(24, 18)}${mirror(17, 30, 3.200)}${mirror(10, 42)}${mirror(24, 42)}
  <path d="M6 12H28V46H6Z" fill="none" style="stroke:var(--civ)" stroke-width="1"/>
  <circle cx="9.500" cy="61" r="2.400" style="fill:var(--civ)"/><circle cx="24.500" cy="61" r="2.400" fill="var(--civ3)"/>
</g></g></svg>`;

// mirror-work valance hung under the lintel: embroidered band with triangular flaps, a mirror in each
const valance = (() => {
  let flaps = '', mirrors = '';
  for (let i = 0; i < 20; i++) { const x = i * 20;
    flaps += `<path class="gjflap" style="--i:${i}" d="M${x} 11h20l-10 15z" fill="${i % 2 ? 'var(--civ2)' : '#1b1430'}" stroke="#0e0a18" stroke-width=".7"/>`;
    mirrors += `<circle class="gjmir" style="--i:${i}" cx="${x + 10}" cy="16" r="2.300"/>`; }
  // hung 19 px higher than drawn: the band sits on the balcony recess above the picture, the flaps end ~7 px into it
  return `<g transform="translate(0 -19)"><g class="fin" style="--d:1.650">${flaps}${mirrors}
    <rect x="-2" y="3" width="404" height="9" fill="#1b1430" stroke="#0e0a18" stroke-width=".8"/>${zigzag(0, 400, 10, 5, 'var(--civ)')}
    ${Array.from({ length: 40 }, (_, i) => `<circle cx="${5 + i * 10}" cy="7.500" r="1.100" fill="var(--civ3)"/>`).join('')}</g></g>`;
})();
// camel bells on a cloth cord, one string each side of the pole
const bells = (x, y0, n, i0) => { let s = `<path d="M${x} ${y0}v${n * 16}" stroke="var(--civ2)" stroke-width="2.200"/>`;
  for (let i = 0; i < n; i++) { const y = y0 + 8 + i * 16;
    s += `<g class="gjbell" style="--i:${i0 + i}"><path d="M${x - 4.500} ${y + 7}C${x - 4.500} ${y} ${x + 4.500} ${y} ${x + 4.500} ${y + 7}Z" fill="#c9a24a" stroke="#4a300a" stroke-width=".7"/>
      <path d="M${x - 5.500} ${y + 7}h11" stroke="#4a300a" stroke-width="1"/><circle cx="${x}" cy="${y + 8.800}" r="1.300" fill="#4a300a"/></g>
      <circle cx="${x + (i % 2 ? 4 : -4)}" cy="${y - 1}" r="2.400" fill="${i % 2 ? 'var(--civ3)' : 'var(--civ)'}"/>`; }
  return s; };

const frame = `${valance}
<g class="pc" style="--dy:-50px;--d:1.100;--o:0"><g class="gjstring">${bells(434, 46, 5, 0)}</g><g class="gjstring" style="animation-delay:-1.300s">${bells(459, 46, 6, 5)}</g>
  <rect x="428" y="42" width="36" height="5" rx="2" style="fill:var(--civ2)" stroke="#2a0620" stroke-width=".6"/></g>`;

const costume = {
  back: `<g class="gjtail"><path d="M44 30C28 40 22 60 26 88L36 86C33 64 38 46 52 36Z" fill="url(#gjBd)" stroke="#4a0626" stroke-width="1"/>
    <path d="M26 88l2 6 3-5 3 5 2-6" fill="none" stroke="var(--civm)" stroke-width="1.200"/></g>`,
  front: `
  <defs><pattern id="gjBd" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#d4145a"/>
    <circle cx="1.800" cy="1.800" r=".85" fill="#fff4f8"/><circle cx="3.600" cy="1.800" r=".85" fill="#fff4f8"/><circle cx="2.700" cy="3.300" r=".85" fill="#fff4f8"/><circle cx="5.600" cy="5.400" r=".8" fill="#ffd34d"/></pattern></defs>
  <path d="M38 50C34 36 38 22 48 14C58 6 72 0 86 -5C95 5 102 18 103 32L102 50C88 44 52 44 38 50Z" fill="url(#gjBd)" stroke="#4a0626" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M40 44C56 30 76 16 97 9M40 36C54 24 70 12 89 2M45 26C54 18 66 8 80 1M56 46C70 36 86 26 102 22M73 46C83 40 94 35 103 33" fill="none" stroke="#7a0838" stroke-width="1.600" opacity=".75"/>
  <path d="M41 41C55 28 75 15 96 8" fill="none" stroke="#ffd34d" stroke-width="1.300" opacity=".85"/>
  <path d="M37.500 49C50 43.500 90 43.500 102.500 49L101.500 52C90 47 50 47 38.500 52Z" fill="var(--civ3)" stroke="#4a0626" stroke-width=".8"/>
  <g class="gjplume"><path d="M87 -4C82 -18 84 -34 92 -46C97 -34 95 -18 90 -4Z" fill="#1a1a26" stroke="#000" stroke-width=".6"/>
    <path d="M92 -44C91 -32 90 -18 88.500 -4" fill="none" stroke="#6a6a80" stroke-width=".7"/><path d="M92 -46c-2-4 0-8 3-9" fill="none" stroke="#fff" stroke-width="1.400" stroke-linecap="round"/>
    <path d="M88 -6C85 -14 86 -22 90 -28C92 -22 91 -14 89.500 -6Z" style="fill:var(--civ)" opacity=".9"/></g>
  <path d="M84 -6l4-3 4 3-1 6h-6z" fill="var(--civm)" stroke="#3a4048" stroke-width=".7"/><circle class="gjmir" cx="88" cy="-2" r="1.700"/>
  <path d="M86 1c-1 5-1 9 0 13M90 1c1 4 1 7 0 10" fill="none" stroke="var(--civm)" stroke-width=".9" stroke-dasharray="1.400 1.200"/>`,
};

const css = `
#stage[data-civ=gurjaras] .gob.dressed .tuft{opacity:0}
#stage[data-civ=gurjaras] .gjmir{fill:#cfd6dc;stroke:#5a6068;stroke-width:.5;animation:gjMir 3.400s calc(var(--i,0)*-.37s) ease-in-out infinite}
@keyframes gjMir{0%,60%,100%{fill:#b7c0c8}75%{fill:#ffffff}}
#stage[data-civ=gurjaras] .gjsway{transform-box:fill-box;transform-origin:50% 0;animation:gjSway 5.600s ease-in-out infinite}
@keyframes gjSway{0%,100%{transform:rotate(-1.500deg) skewX(1.500deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
#stage[data-civ=gurjaras] .gjsheen{animation:gjSheen 4.400s linear infinite}
@keyframes gjSheen{from{transform:translateX(0)}to{transform:translateX(88px)}}
#stage[data-civ=gurjaras] .gjstride{transform-box:fill-box;transform-origin:50% 100%;animation:gjStride 2.800s ease-in-out infinite}
@keyframes gjStride{0%,100%{transform:rotate(-1.200deg)}50%{transform:rotate(1.500deg) translateY(-1.500px)}}
#stage[data-civ=gurjaras] .gjpom{transform-box:fill-box;transform-origin:50% 0;animation:gjPom 1.900s calc(var(--i)*-.4s) ease-in-out infinite alternate}
@keyframes gjPom{from{transform:translateX(-1.500px)}to{transform:translateX(1.500px)}}
#stage[data-civ=gurjaras] .gjflap{transform-box:fill-box;transform-origin:50% 0;animation:gjFlap calc(2.200s + var(--i)*.05s) calc(var(--i)*-.31s) ease-in-out infinite alternate}
@keyframes gjFlap{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
#stage[data-civ=gurjaras] .gjstring{transform-box:fill-box;transform-origin:50% 0;animation:gjString 3.200s ease-in-out infinite alternate}
@keyframes gjString{from{transform:rotate(-2.500deg)}to{transform:rotate(2.500deg)}}
#stage[data-civ=gurjaras] .gjbell{transform-box:fill-box;transform-origin:50% 0;animation:gjBell 1.100s calc(var(--i)*-.23s) ease-in-out infinite alternate}
@keyframes gjBell{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
#stage[data-civ=gurjaras] .gjtail{transform-box:fill-box;transform-origin:80% 0;animation:gjTail 3.400s ease-in-out infinite alternate}
@keyframes gjTail{from{transform:rotate(-4deg)}to{transform:rotate(5deg)}}
#stage[data-civ=gurjaras] .gjplume{transform-box:fill-box;transform-origin:30% 100%;animation:gjPlume 2.300s ease-in-out infinite alternate}
@keyframes gjPlume{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
`;

export default {
  id: 'gurjaras', name: 'Gurjaras', kit: 'india',
  accent: '#ff5fd2', accent2: '#c02f9a', cloth: '#f2a228', metal: '#d8dde2',
  standard, pennant, costume, css, frame,
};
