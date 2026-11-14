// CIV layer: Malay (kit: sea). Sea-blue accent, songket maroon with gold thread. A crab-claw sail on the pole,
// a songket swag under the thatch, a fishing net with glass floats over the bottom-right corner, a folded
// tengkolok headcloth and a keris hilt in a sash for the mascot. All drawings are our own.
const V = [64, 178]; // the sail's foot on the pole

// crab-claw sail: two curved spars meeting at the foot, the cloth between them, a deep curve between the tips
const SAIL = 'M64 178C40 136 20 80 12 24C36 46 52 58 68 60C86 58 104 48 118 28C112 88 90 138 64 178z';
const panels = (() => { const top = [[-10, 0], [22, 40], [44, 56], [66, 64], [88, 58], [108, 42], [130, 20], [130, 0]]; let s = '';
  for (let i = 0; i < top.length - 1; i++) { const c = ['var(--civ3)', '#f3e6c8', 'var(--civ2)', '#f3e6c8'][i % 4];
    s += `<path d="M${V[0]} ${V[1]}L${top[i][0]} ${top[i][1]}L${top[i + 1][0]} ${top[i + 1][1]}z" fill="${c}"/>`; } return s; })();

const standard = `<svg width="120" height="250" viewBox="0 0 120 250">
  <defs><clipPath id="mlSc"><path d="${SAIL}"/></clipPath>
    <linearGradient id="mlSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".4" stop-color="#fff" stop-opacity=".2"/><stop offset=".7" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <g class="unroll" style="--d:1.300"><g class="mlsail">
    <g clip-path="url(#mlSc)">${panels}
      <path d="M64 178L33 50M64 178L55 62M64 178L77 62M64 178L98 52" stroke="#3a1a10" stroke-width=".7" opacity=".55"/>
      <path d="M22 66c24 14 64 14 90-4M36 116c16 6 38 6 58-4" stroke="var(--civm)" stroke-width="1.400" fill="none" stroke-dasharray="4 3"/>
      <rect class="mlsheen" x="0" y="0" width="240" height="190" fill="url(#mlSh)"/>
    </g>
    <path d="M64 178C40 136 20 80 12 24" stroke="#3d2a10" stroke-width="4.500" fill="none" stroke-linecap="round"/><path d="M64 178C40 136 20 80 12 24" stroke="#d6bd76" stroke-width="2.200" fill="none" stroke-linecap="round"/>
    <path d="M64 178C90 138 112 88 118 28" stroke="#3d2a10" stroke-width="4.500" fill="none" stroke-linecap="round"/><path d="M64 178C90 138 112 88 118 28" stroke="#d6bd76" stroke-width="2.200" fill="none" stroke-linecap="round"/>
    <path d="M12 24c-1-7 4-10 8-7M118 28c1-7-4-10-8-7" stroke="#d6bd76" stroke-width="2" fill="none" stroke-linecap="round"/>
    <g class="mlstr"><path d="M118 27c4-8 2-16 8-24-1 8 1 14-4 24z" fill="var(--civ)" stroke="#0b4a66" stroke-width=".6"/></g>
  </g></g>
  <path class="fin" style="--d:2" d="M114 36L62 64M16 30L58 64" stroke="#3d2a10" stroke-width=".9"/>
  <g class="pc" style="--sc:.3;--d:1.100"><circle cx="60" cy="60" r="4.500" fill="var(--civm)" stroke="#5a3e08"/><path d="M58 58.500a2.500 2.500 0 0 1 3-1.500" stroke="#fff" stroke-width=".9" fill="none"/></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="15" y="0" width="4" height="72" rx="2" fill="#c2a856" stroke="#2d240c" stroke-width=".7"/>
  <g class="unroll" style="--d:1.600"><g class="mlsail" style="animation-delay:-1.200s">
    <path d="M17 66C12 48 7 28 4 6c6 12 11 22 15 24 5-4 9-12 12-22-2 22-8 42-14 58z" fill="var(--civ3)" stroke="#3d2a10" stroke-width="1.200"/>
    <path d="M17 66L9 26M17 66l8-42" stroke="#f3e6c8" stroke-width="2.200"/><path d="M8 34c6 4 14 4 20-2" stroke="var(--civm)" stroke-width="1" fill="none" stroke-dasharray="2 2"/>
  </g></g></svg>`;

// songket swag hung under the thatch, fishing net with glass floats over the bottom-right corner
const SWAG = 'M12 8Q74 36 136 8Q198 36 260 8L260 16Q198 46 136 16Q74 46 12 16z';
const knot = (x, i) => `<g transform="translate(${x} 12)"><circle r="5" fill="var(--civm)" stroke="#5a3e08" stroke-width=".8"/><circle r="2" fill="var(--civ)"/>
  <g class="mltas" style="--i:${i}"><path d="M0 5v8" stroke="var(--civm)" stroke-width="1.200"/><path d="M-2.500 13h5l1 10h-7z" fill="var(--civ3)" stroke="#3a0d22" stroke-width=".6"/></g></g>`;
const float = (x, y, r, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:.2;--d:${d};--o:0">
  <circle r="${r}" fill="url(#mlGl)" stroke="#0b4a66" stroke-width=".8"/><path d="M${-r} 0h${2 * r}M0 ${-r}v${2 * r}" stroke="#6b5a3a" stroke-width="1" opacity=".75"/>
  <ellipse class="mlglint" cx="${-r * .35}" cy="${-r * .4}" rx="${r * .3}" ry="${r * .18}" fill="#fff" transform="rotate(-35 ${-r * .35} ${-r * .4})"/></g></g>`;
const net = (() => { let d = ''; for (let k = -120; k < 140; k += 7) d += `M${300 + k} 250l120-120M${300 + k} 130l120 120`; return d; })();
const frame = `<defs><clipPath id="mlNc"><path d="M326 244Q380 236 426 150V244z"/></clipPath>
  <pattern id="mlSk" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="var(--civ3)"/><path d="M5 1l4 4-4 4-4-4z" fill="none" stroke="var(--civm)" stroke-width=".9"/><circle cx="5" cy="5" r=".9" fill="var(--civ)"/></pattern>
  <radialGradient id="mlGl" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#e9fbff"/><stop offset=".45" stop-color="var(--civ)" stop-opacity=".85"/><stop offset="1" stop-color="#0b4a66" stop-opacity=".9"/></radialGradient></defs>
<g class="pc" style="--dy:-50px;--d:1.050;--o:0"><g class="mlswag">
  <path d="${SWAG}" fill="url(#mlSk)" stroke="#3a0d22" stroke-width="1"/><path d="M12 12Q74 41 136 12Q198 41 260 12" stroke="var(--civm)" stroke-width="1" fill="none" opacity=".8"/>
  ${[12, 136, 260].map(knot).join('')}
</g></g>
<g class="pc" style="--dx:60px;--dy:40px;--d:1.200;--o:0">
  <g clip-path="url(#mlNc)"><path d="${net}" stroke="#d9c79a" stroke-width=".9" opacity=".85"/></g>
  <path d="M326 244Q380 236 426 150" stroke="#b49a62" stroke-width="2" fill="none"/>
</g>
${float(410, 172, 8, 1.35)}${float(388, 214, 7, 1.45)}${float(352, 236, 6.500, 1.55)}`;

const costume = {
  front: `
  <path d="M38 48c2-11 14-16 32-16s30 5 32 16l-2 6c-8-6-52-6-60 0z" fill="url(#mlSkC)" stroke="#3a0d22" stroke-width="1.100" stroke-linejoin="round"/>
  <defs><pattern id="mlSkC" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="var(--civ3)"/><path d="M4 1l3 3-3 3-3-3z" fill="none" stroke="var(--civm)" stroke-width=".8"/></pattern></defs>
  <path d="M44 40C44 26 48 14 56 3c6 12 14 22 30 31-14-2-28 0-42 6z" fill="var(--civ3)" stroke="#3a0d22" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M56 3C55 18 52 30 48 38M56 3c4 14 10 24 22 31" stroke="var(--civm)" stroke-width="1.300" fill="none"/>
  <path d="M60 36c2-7 6-13 11-17 5 6 11 11 21 16-10-1-22-1-32 1z" fill="color-mix(in srgb,var(--civ3) 70%,#000)" stroke="#3a0d22" stroke-width="1"/>
  <path d="M71 19l4 16" stroke="var(--civm)" stroke-width="1" opacity=".8"/>
  <path d="M38 48c10-5 54-5 64 0" stroke="var(--civm)" stroke-width="1.600" fill="none"/>
  <path d="M51 89c12 3 26 3 38 0l1 6c-12 2-28 2-40 0z" fill="url(#mlSkC)" stroke="#3a0d22" stroke-width=".9"/>
  <path d="M80 93c-1-4 0-7 3-9 2-1 4 0 4 2 0 1-1 2-3 2 1 2 1 4 0 5z" fill="#7a4a22" stroke="#2a1608" stroke-width=".8"/>
  <path d="M74 93c5-1 12-1 17-2l2-2c0 3-2 6-5 6H77c-2 0-3-1-3-2z" fill="#a8743a" stroke="#2a1608" stroke-width=".8"/><path d="M76 92.500h14" stroke="var(--civm)" stroke-width=".7"/>`,
};

const css = `
#stage[data-civ=malay] .gob.dressed .tuft{opacity:0}
#stage[data-civ=malay] .mlsail{transform-box:view-box;transform-origin:64px 178px;animation:mlSail 4.200s ease-in-out infinite alternate}
@keyframes mlSail{from{transform:rotate(-2deg) scaleX(.96)}to{transform:rotate(2.500deg) scaleX(1.04)}}
#stage[data-civ=malay] .mlsheen{animation:mlSheen 4.600s linear infinite}
@keyframes mlSheen{from{transform:translateX(-120px)}to{transform:translateX(0)}}
#stage[data-civ=malay] .mlstr{transform-box:fill-box;transform-origin:0 100%;animation:mlStr 1.100s ease-in-out infinite alternate}
@keyframes mlStr{from{transform:skewX(-14deg) scaleY(.92)}to{transform:skewX(12deg) scaleY(1.05)}}
#stage[data-civ=malay] .mlswag{transform-box:fill-box;transform-origin:50% 0;animation:mlSwag 4.400s ease-in-out infinite alternate}
@keyframes mlSwag{from{transform:skewX(-3deg)}to{transform:skewX(3deg)}}
#stage[data-civ=malay] .mltas{transform-box:fill-box;transform-origin:50% 0;animation:mlTas calc(1.500s + var(--i)*.3s) ease-in-out infinite alternate}
@keyframes mlTas{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
#stage[data-civ=malay] .mlglint{animation:mlGlint 4s ease-in-out infinite}
@keyframes mlGlint{0%,100%{opacity:.35}50%{opacity:.95}}
`;

export default {
  id: 'malay', name: 'Malay', kit: 'sea',
  accent: '#4ad6ff', accent2: '#1b8fc4', cloth: '#7a1f4f', metal: '#e8c15a',
  standard, pennant, costume, css, frame,
};
