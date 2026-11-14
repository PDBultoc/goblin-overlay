// CIV layer: Khmer (kit: sea). Warm yellow accent, madder cloth, bronze. A war-elephant goad (ankus) on the pole
// with a tasselled banner bearing an elephant, bronze elephant bells hanging from the thatch, a checked scarf tied
// to the left post, a woven conical cap with a top knot for the mascot. All drawings are our own.
const ELEPHANT = 'M5 13C6 6 13 3 21 3c7 0 11 2 13 7 2 4 2 9 2 13 0 2-1 3-2 3l-1-2c1-1 1-3 1-5l-1-4-2 3v10h-5v-7H15v7h-5v-9c-3-1-5-4-5-8z';

const tassel = (x, y, i) => `<g class="khts" style="--i:${i}"><path d="M${x} ${y}v5" stroke="var(--civm)" stroke-width="1.200"/><circle cx="${x}" cy="${y + 6}" r="2.400" fill="var(--civm)" stroke="#5a3a10" stroke-width=".6"/>
  <path d="M${x - 2.500} ${y + 8}h5l1.500 14h-8z" fill="var(--civ)" stroke="#7a4a10" stroke-width=".6"/><path d="M${x - 1} ${y + 9}v12M${x + 1} ${y + 9}v12" stroke="#7a4a10" stroke-width=".5" opacity=".7"/></g>`;
const diamonds = (x0, x1, y, h, fill) => { let d = ''; for (let x = x0; x + h <= x1; x += h) d += `M${x} ${y}l${h / 2} ${-h / 2}l${h / 2} ${h / 2}l${-h / 2} ${h / 2}z`; return `<path d="${d}" fill="${fill}" stroke="#2a0b05" stroke-width=".6"/>`; };

const standard = `<svg width="120" height="250" viewBox="0 0 120 250">
  <defs><linearGradient id="khSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="#000" stop-opacity=".25"/><stop offset=".8" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <linearGradient id="khMt" x1="0" x2="1"><stop offset="0" stop-color="#f6dc96"/><stop offset=".5" stop-color="#c99a4a"/><stop offset="1" stop-color="#6b4615"/></linearGradient>
    <clipPath id="khBc"><rect x="64" y="68" width="46" height="98"/></clipPath></defs>
  <g class="pc" style="--dy:60px;--sc:.3;--d:1.100">
    <rect x="57" y="30" width="6" height="34" rx="1.500" fill="url(#khMt)" stroke="#4a2e0c" stroke-width=".8"/>
    <path d="M55 36h10M55 46h10M55 56h10" stroke="#4a2e0c" stroke-width="2.200"/><path d="M55 35h10M55 45h10M55 55h10" stroke="#ffe7a8" stroke-width=".8"/>
    <path d="M60 2C65 10 66 20 63 30h-6C54 20 55 10 60 2z" fill="url(#khMt)" stroke="#4a2e0c" stroke-width="1"/><path d="M60 6v22" stroke="#ffe7a8" stroke-width=".8" opacity=".8"/>
    <path d="M57 36C44 34 38 42 40 52c1 5 6 7 9 4-4 0-6-3-5-7 1-5 6-8 13-7z" fill="url(#khMt)" stroke="#4a2e0c" stroke-width="1" stroke-linejoin="round"/>
    <circle class="khgl" cx="60" cy="14" r="2.200" fill="#fff"/>
  </g>
  <g class="pc" style="--dx:30px;--sc:.4;--d:1.250"><rect x="54" y="62" width="62" height="6" rx="3" fill="#6e3a19" stroke="#1d0f05" stroke-width=".8"/><circle cx="115" cy="65" r="4" fill="url(#khMt)" stroke="#4a2e0c" stroke-width=".8"/></g>
  <g class="unroll" style="--d:1.400"><g class="khsway">
    <g clip-path="url(#khBc)">
      <rect x="64" y="68" width="46" height="98" fill="var(--civ3)"/>
      <rect x="64" y="68" width="46" height="12" fill="#2a0b05"/>${diamonds(64, 110, 74, 7.600, 'var(--civ)')}
      <rect x="64" y="154" width="46" height="12" fill="#2a0b05"/>${diamonds(64, 110, 160, 7.600, 'var(--civ)')}
      <path d="M67 84v66M107 84v66" stroke="var(--civ)" stroke-width="1.200" stroke-dasharray="3 2"/>
      <g transform="translate(68 100) scale(1.050)"><path d="${ELEPHANT}" fill="var(--civ)" stroke="#2a0b05" stroke-width="1"/><path d="M24 7c-4 1-5 6-3 10 3 0 5-3 5-6z" fill="var(--civ2)"/><circle cx="29" cy="9" r="1.100" fill="#2a0b05"/><path d="M31 16l5 2-5 0z" fill="#fff8e0"/></g>
      <rect class="khsheen" x="18" y="68" width="138" height="98" fill="url(#khSh)"/>
    </g>
    <rect x="64" y="68" width="46" height="98" fill="none" stroke="#2a0b05" stroke-width="1.200"/>
    ${[68, 77, 87, 97, 106].map((x, i) => tassel(x, 166, i)).join('')}
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="3" y="0" width="28" height="5" rx="2.500" fill="#6e3a19" stroke="#1d0f05"/>
  <g class="unroll" style="--d:1.600"><g class="khsway" style="animation-delay:-1.500s">
    <rect x="6" y="5" width="22" height="42" fill="var(--civ3)" stroke="#2a0b05"/><rect x="6" y="5" width="22" height="8" fill="#2a0b05"/>${diamonds(6, 28, 9, 5.500, 'var(--civ)')}
    <path d="M17 18l6 9-6 9-6-9z" fill="var(--civ)" stroke="#2a0b05" stroke-width=".7"/><circle cx="17" cy="27" r="2" fill="#2a0b05"/>
    ${[9, 17, 25].map((x, i) => tassel(x, 47, i)).join('')}
  </g></g></svg>`;

// bronze elephant bells hanging from the thatch, a checked scarf knotted on the left post
const bell = (x, i) => `<g transform="translate(${x} 0)"><g class="pc" style="--dy:-50px;--d:${(1.05 + i * .08).toFixed(2)};--o:0"><g class="khb" style="--i:${i}">
  <path d="M0 -2V13" stroke="#3b2a10" stroke-width="1.200"/><circle cy="13" r="2" fill="none" stroke="var(--civm)" stroke-width="1.200"/>
  <path d="M-6 27c0-8 2-12 6-12s6 4 6 12c1 1 1 2 0 3H-6c-1-1-1-2 0-3z" fill="url(#khBl)" stroke="#4a2e0c" stroke-width=".9"/>
  <path d="M-4 22h8M0 25v5" stroke="#4a2e0c" stroke-width=".8"/><path d="M-3.500 19c1-2 2-3 3-3" stroke="#fff3c8" stroke-width="1" fill="none" stroke-linecap="round"/>
  <circle cy="32" r="1.800" fill="#6b4615"/></g></g></g>`;
const frame = `<defs><radialGradient id="khBl" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffe6a3"/><stop offset=".5" stop-color="#c99a4a"/><stop offset="1" stop-color="#5a3a10"/></radialGradient>
  <pattern id="khKr" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="var(--civ3)"/><rect width="3" height="7" fill="#f6ead0" fill-opacity=".75"/><rect width="7" height="3" fill="#f6ead0" fill-opacity=".55"/><rect width="3" height="3" fill="var(--civ)" fill-opacity=".8"/></pattern></defs>
${[40, 92, 144, 196, 248].map(bell).join('')}
<g transform="translate(-6 50) scale(1.400) translate(6 -50)"><g class="pc" style="--dx:-60px;--r:-20deg;--d:1.200;--o:0">
  <g class="khtail"><path d="M-12 68C-18 90-20 116-16 140l9-3c-2-22 0-46 2-66z" fill="url(#khKr)" stroke="#2a0b05" stroke-width=".9"/><path d="M-16 140l9-3 1 6-9 3z" fill="var(--civ)"/></g>
  <g class="khtail b"><path d="M-2 68C2 86 6 104 4 124l-8-1c1-18-2-36-6-52z" fill="url(#khKr)" stroke="#2a0b05" stroke-width=".9"/><path d="M4 124l-8-1-1 5 9 1z" fill="var(--civ)"/></g>
  <path d="M-20 58h24v10h-24z" fill="url(#khKr)" stroke="#2a0b05" stroke-width=".9"/>
  <ellipse cx="-7" cy="68" rx="7" ry="6" fill="url(#khKr)" stroke="#2a0b05" stroke-width="1"/><path d="M-11 65c2 2 6 2 8 0" stroke="#2a0b05" stroke-width=".8" fill="none"/>
</g></g>`;

const costume = {
  front: `
  <defs><clipPath id="khCap"><path d="M43 47C49 34 59 21 70 12c11 9 21 22 27 35z"/></clipPath></defs>
  <path d="M43 47C49 34 59 21 70 12c11 9 21 22 27 35z" fill="#c9a560" stroke="#4a3412" stroke-width="1.200" stroke-linejoin="round"/>
  <g clip-path="url(#khCap)" stroke="#7a5a22" stroke-width="1.100" opacity=".85">
    <path d="M30 50l40-40M38 50l40-40M46 50l40-40M54 50l40-40M62 50l40-40M70 50l40-40"/>
    <path d="M110 50L70 10M102 50L62 10M94 50L54 10M86 50L46 10M78 50L38 10M70 50L30 10" stroke="#e8cf8c" stroke-width=".8"/>
  </g>
  <path d="M60 22c3-4 6-7 10-10" stroke="#fff3c8" stroke-width="1.400" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M40 46c8-6 52-6 60 0l-1 6c-8-5-50-5-58 0z" fill="var(--civ3)" stroke="#2a0b05" stroke-width="1" stroke-linejoin="round"/>
  <path d="M43 47.500c8-4 46-4 54 0" stroke="var(--civ)" stroke-width="1.600" fill="none" stroke-dasharray="3 2"/>
  <path d="M66 13c-1-4 1-7 4-7s5 3 4 7z" fill="#a98140" stroke="#4a3412" stroke-width="1"/>
  <circle cx="70" cy="5" r="4" fill="var(--civ3)" stroke="#2a0b05" stroke-width="1"/><path d="M68 3.500c1-1 2-1.500 3-1.500" stroke="#fff" stroke-opacity=".6" stroke-width="1" fill="none"/>
  <path d="M74 6c5 1 8 4 8 9" stroke="var(--civ3)" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="82" cy="16" r="1.800" fill="var(--civ)"/>`,
};

const css = `
#stage[data-civ=khmer] .gob.dressed .tuft{opacity:0}
#stage[data-civ=khmer] .khsway{transform-box:fill-box;transform-origin:50% 0;animation:khSway 4.800s ease-in-out infinite}
@keyframes khSway{0%,100%{transform:rotate(-1.500deg) skewX(1.500deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
#stage[data-civ=khmer] .khsheen{animation:khSheen 4.400s linear infinite}
@keyframes khSheen{from{transform:translateX(-46px)}to{transform:translateX(0)}}
#stage[data-civ=khmer] .khts{transform-box:fill-box;transform-origin:50% 0;animation:khTs calc(1.300s + var(--i)*.17s) calc(var(--i)*-.3s) ease-in-out infinite alternate}
@keyframes khTs{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
#stage[data-civ=khmer] .khb{transform-box:fill-box;transform-origin:50% 0;animation:khBell calc(2.200s + var(--i)*.23s) calc(var(--i)*-.55s) ease-in-out infinite alternate}
@keyframes khBell{from{transform:rotate(-11deg)}to{transform:rotate(11deg)}}
#stage[data-civ=khmer] .khtail{transform-box:fill-box;transform-origin:50% 0;animation:khTail 3.600s ease-in-out infinite alternate}
#stage[data-civ=khmer] .khtail.b{animation-duration:2.900s;animation-delay:-1s}
@keyframes khTail{from{transform:skewX(-5deg)}to{transform:skewX(6deg)}}
#stage[data-civ=khmer] .khgl{animation:khGl 3.800s ease-in-out infinite}
@keyframes khGl{0%,70%,100%{opacity:0}82%{opacity:.95}}
`;

export default {
  id: 'khmer', name: 'Khmer', kit: 'sea',
  accent: '#ffc857', accent2: '#d9922a', cloth: '#8e2a1e', metal: '#c99a4a',
  standard, pennant, costume, css, frame,
};
