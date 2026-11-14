// CIV layer: Mongols (kit: steppe). Gold accent, sky-blue silk, a white horsehair standard (tug) with a blue scarf
// on the pole, a quiver hung on the frame, a fur-brimmed pointed hat for the mascot. All drawings are our own.
let seed = 21; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const hair = (n, x0, x1, y0, len, cols, w) => { let s = ''; for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * i / (n - 1), l = len * (.8 + r() * .3), b = (x - 55) * .35;
  s += `<path class="mh" style="--i:${i};--k:${r().toFixed(2)}" d="M${x.toFixed(1)} ${y0}C${(x + b).toFixed(1)} ${y0 + l * .4} ${(x + b * 1.6 + 3).toFixed(1)} ${y0 + l * .75} ${(x + b * 1.4 + 6).toFixed(1)} ${(y0 + l).toFixed(1)}" stroke="${cols[i % cols.length]}" stroke-width="${(w * (.8 + r() * .5)).toFixed(1)}"/>`; } return s; };

const standard = `<svg width="110" height="230" viewBox="0 0 110 230">
  <g class="unroll" style="--d:1.350"><g class="mgust">
    ${hair(9, 41, 69, 53, 84, ['#9c8f76', '#b7ab90'], 4)}
    ${hair(15, 39, 71, 52, 80, ['#f7f1e3', '#ddd3bd', '#fffaf0', '#c9bea6'], 3)}
  </g></g>
  <g class="pc" style="--sc:.2;--dy:30px;--d:1.150">
    <path d="M55 4C60 15 61 24 55 35 49 24 50 15 55 4z" fill="#f6d06a" stroke="#6b4a10" stroke-width="1"/>
    <path d="M55 35C44 31 39 21 42 11c3 8 7 13 13 17zM55 35c11-4 16-14 13-24-3 8-7 13-13 17z" fill="#e7b944" stroke="#6b4a10" stroke-width="1"/>
    <path d="M40 37q15 9 30 0l-3 7q-12 6-24 0z" fill="#f6d06a" stroke="#6b4a10" stroke-width="1"/>
    <ellipse cx="55" cy="50" rx="18" ry="5.500" fill="#e7b944" stroke="#6b4a10" stroke-width="1"/><ellipse cx="55" cy="49" rx="13" ry="3" fill="#fbe7a6" opacity=".7"/>
    <circle cx="55" cy="18" r="2" fill="var(--civ3)"/>
  </g>
  <g class="fin" style="--d:1.900">
    <path class="mscarf a" fill="var(--civ3)" stroke="#0b2f66" stroke-width=".8" d="M55 144C70 134 84 152 104 140L106 150C88 162 72 144 57 154Z"/>
    <path class="mscarf b" fill="color-mix(in srgb,var(--civ3) 75%,#fff)" stroke="#0b2f66" stroke-width=".8" d="M55 150C66 156 78 148 92 160L90 168C78 158 66 166 56 158Z"/>
    <rect x="50" y="142" width="10" height="14" rx="3" fill="var(--civ3)" stroke="#0b2f66" stroke-width=".8"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="9" y="0" width="16" height="9" rx="2" fill="#e7b944" stroke="#6b4a10"/><path d="M9 4.500h16" stroke="#6b4a10" stroke-width=".8"/>
  <g class="unroll" style="--d:1.600"><g class="mgust">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path class="mh" style="--i:${i};--k:.${3 + i}" d="M${11 + i * 2} 9c${i - 3} 18 ${i - 2} 34 ${i - 1} ${46 + (i % 3) * 5}" stroke="${['#f7f1e3', '#ddd3bd', '#c9bea6'][i % 3]}" stroke-width="2.600"/>`).join('')}</g></g>
  <path d="M8 11h18l-2 5H10z" fill="var(--civ3)" stroke="#0b2f66" stroke-width=".7"/>
</svg>`;

// quiver hung between the right post and the pole
const frame = `<g class="pc mquiver" style="--dy:-70px;--r:-25deg;--d:1.100;--o:0">
  <path d="M424 108l4-74M430 108l1-78M436 108l-2-72" stroke="#caa66a" stroke-width="1.400" fill="none"/>
  <path d="M428 34l-4-12 5 3 2-9 3 9 4-3-3 12zM431 30l-4-13 4 4 2-10 2 10 4-4-4 13z" fill="var(--civ3)" stroke="#0b2f66" stroke-width=".6"/>
  <path d="M434 36l-3-11 4 3 2-8 2 8 4-3-3 11z" fill="#f3ead6" stroke="#5a4a2a" stroke-width=".6"/>
  <path d="M421 100l19-2 2 78q-9 8-19 1z" fill="#7a4d27" stroke="#24150a" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M421 108l19-2M422 150l20-1" stroke="#f0c552" stroke-width="2"/><path d="M426 118l10 22M436 118l-10 22" stroke="#3a2412" stroke-width="1"/>
  <path d="M423 100C416 70 419 52 424 44" fill="none" stroke="#3a2412" stroke-width="1.600"/>
</g>`;

const costume = {
  front: `
  <path d="M70 5c9 2 14 9 13 19" fill="none" stroke="#d4372a" stroke-width="2.600" stroke-linecap="round"/><path d="M81 22l5 5M83 22l0 7M85 21l-3 7" stroke="#d4372a" stroke-width="1.400" stroke-linecap="round"/>
  <path d="M46 42C50 25 60 14 70 6c10 8 20 19 24 36z" fill="var(--civ3)" stroke="#0b2247" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M70 6v36M58 17c-4 8-6 16-7 25M82 17c4 8 6 16 7 25" fill="none" stroke="#f0c552" stroke-width="1.300"/>
  <path d="M63 28l7-6 7 6-7 6z" fill="none" stroke="#f0c552" stroke-width="1.100"/>
  <circle cx="70" cy="5" r="3.400" fill="#f0c552" stroke="#6b4a10" stroke-width=".9"/>
  <path d="M36 47c2-9 12-13 34-13s32 4 34 13l-4 7c-8-6-52-6-60 0z" fill="#6b4a2c" stroke="#24150a" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M41 46l2-5M47 44l1-6M54 42l1-6M62 41v-6M70 41v-6M78 41v-6M86 42l-1-6M93 44l-1-6M99 46l-2-5" stroke="#3a2412" stroke-width="1.100" stroke-linecap="round"/>
  <path d="M40 40c8-5 52-5 60 0" fill="none" stroke="#a8825a" stroke-width="1.200" opacity=".8"/>
  <path d="M38 50l-3 20 7-5 2-13zM102 50l3 20-7-5-2-13z" fill="#6b4a2c" stroke="#24150a" stroke-width="1" stroke-linejoin="round"/>`,
};

const css = `
#stage[data-civ=mongols] .gob.dressed .tuft{opacity:0}
#stage[data-civ=mongols] .mh{fill:none;stroke-linecap:round;transform-box:fill-box;transform-origin:50% 0;
  animation:mHair calc(1.800s + var(--k)*.9s) calc(var(--i)*-.13s) ease-in-out infinite alternate}
@keyframes mHair{from{transform:rotate(-5deg)}to{transform:rotate(13deg)}}
#stage[data-civ=mongols] .mgust{transform-box:fill-box;transform-origin:50% 0;animation:mGust 6.500s ease-in-out infinite}
@keyframes mGust{0%,55%,100%{transform:skewX(0)}70%{transform:skewX(-16deg)}82%{transform:skewX(-6deg)}}
#stage[data-civ=mongols] .mscarf.a{animation:mScA 1.300s ease-in-out infinite alternate}
#stage[data-civ=mongols] .mscarf.b{animation:mScB 1.050s -.4s ease-in-out infinite alternate}
@keyframes mScA{to{d:path("M55 144C70 154 86 132 104 150L106 160C88 142 72 164 57 154Z")}}
@keyframes mScB{to{d:path("M55 150C66 146 78 162 92 152L90 160C78 170 66 154 56 158Z")}}
`;

export default {
  id: 'mongols', name: 'Mongols', kit: 'steppe',
  accent: '#ffcf4a', accent2: '#d98a1a', cloth: '#2f8fe6', metal: '#f0c552',
  standard, pennant, costume, css, frame,
};
