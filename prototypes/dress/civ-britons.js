// CIV layer: Britons (kit: feudal). Scarlet accent, navy cloth. A quartered swallowtail pennon on the lance with a
// longbow and a bound sheaf of arrows, arrows thunked into the gatehouse stone, a longbow hung on the corbels and
// a full quiver on the left jamb; a kettle hat (chapel de fer) with a long feather for the mascot. All drawings are our own.

// one arrow stuck in the stone: tip at (x,y), shaft leaning back at angle a; flies in along its own line
const arrow = (x, y, a, d, i) => `<g transform="translate(${x} ${y}) rotate(${a})"><g class="pc" style="--dx:-170px;--d:${d};--o:0"><g class="btw" style="--d:${d}">
  <path d="M1.500-2.500l-3 2.500 3 2.500M2-1h2.500M2 1.500h2" stroke="#2a2118" stroke-width=".9" fill="none" opacity=".8"/>
  <path d="M0 0H-40" stroke="#3a2412" stroke-width="2.400" stroke-linecap="round"/><path d="M0-.5H-40" stroke="#b98a52" stroke-width="1.100"/>
  <path d="M-31 0l-9-4.500h-3.500l3.500 4.500-3.500 4.500h3.500z" fill="${i % 2 ? '#efe6d2' : 'var(--civ)'}" stroke="#2a1010" stroke-width=".7" stroke-linejoin="round"/>
  <path d="M-43.500 0h-2" stroke="#2a1a0c" stroke-width="2.200" stroke-linecap="round"/>
</g></g></g>`;

const device = (cx, cy, s) => `<g transform="translate(${cx} ${cy}) scale(${s})">
  <circle r="19" fill="var(--civ3)" stroke="#efe6d2" stroke-width="2"/><circle r="15.500" fill="none" stroke="var(--civ)" stroke-width=".9" stroke-dasharray="2 2"/>
  <path d="M-6-15q-10 15 0 30" fill="none" stroke="#3a2412" stroke-width="3.400" stroke-linecap="round"/><path d="M-6-15q-10 15 0 30" fill="none" stroke="#e8c27a" stroke-width="1.800" stroke-linecap="round"/>
  <path d="M-6-15V15" stroke="#efe6d2" stroke-width=".7"/>
  ${[-1, 3, 7].map((x) => `<path d="M${x} 14V-11" stroke="#efe6d2" stroke-width="1.300"/><path d="M${x - 2} -10l2-5 2 5z" fill="#cfd6dc"/><path d="M${x} 9l-2 6M${x} 9l2 6" stroke="var(--civ)" stroke-width="1.400"/>`).join('')}
  <rect x="-3" y="-1.500" width="12" height="3.500" rx="1" fill="#e3b55a" stroke="#5a3d10" stroke-width=".6"/>
</g>`;

const PEN = 'M8 14L124 37L98 49L124 61L8 84Z';
const standard = `<svg width="130" height="100" viewBox="0 0 130 100"><g class="bunf"><g class="bwave">
  <defs><clipPath id="brPc"><path d="${PEN}"/></clipPath>
  <linearGradient id="brPs" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".25" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#000" stop-opacity=".28"/><stop offset=".75" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <g clip-path="url(#brPc)">
    <rect x="0" y="0" width="130" height="100" fill="#efe6d2"/>
    <rect x="0" y="0" width="62" height="49" fill="var(--civ)"/><rect x="62" y="49" width="70" height="51" fill="var(--civ)"/>
    <path d="M8 16L124 39" stroke="#e3b55a" stroke-width="2"/><path d="M8 82L124 59" stroke="#e3b55a" stroke-width="2"/>
    ${device(60, 49, 1.050)}
    <rect class="bsheen" x="-130" y="0" width="390" height="100" fill="url(#brPs)"/>
  </g>
  <path d="${PEN}" fill="none" stroke="#2a0808" stroke-width="1.200" stroke-linejoin="round"/>
</g></g>
<path d="M2 16h8M2 48h8M2 80h8" stroke="#2a2e33" stroke-width="3.400" stroke-linecap="round"/><path d="M2 15.200h8M2 47.200h8M2 79.200h8" stroke="#c9d1d8" stroke-width=".8" stroke-linecap="round"/>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="0" y="0" width="34" height="5" rx="2" fill="#4a301b" stroke="#1b130b" stroke-width=".8"/>
  <g class="unroll" style="--d:1.600"><g class="bsway">
  <defs><clipPath id="brQc"><path d="M2 4H32V60L17 50L2 60Z"/></clipPath></defs>
  <g clip-path="url(#brQc)"><rect width="34" height="70" fill="#efe6d2"/><rect width="17" height="30" fill="var(--civ)"/><rect x="17" y="30" width="17" height="40" fill="var(--civ)"/>${device(17, 28, .52)}</g>
  <path d="M2 4H32V60L17 50L2 60Z" fill="none" stroke="#2a0808" stroke-width="1"/></g></g></svg>`;

// the frame: arrows in the stone, a longbow on two pegs under the parapet, a quiver on the left jamb
const frame = `
<g class="pc" style="--dy:-60px;--r:-8deg;--d:1.050;--o:0">
  <path d="M62 -23v6M168 -23v6" stroke="#1d1f22" stroke-width="3" stroke-linecap="round"/>
  <path d="M40 -22Q115 -2 190 -22" fill="none" stroke="#2a1a0c" stroke-width="5" stroke-linecap="round"/><path d="M40 -22Q115 -2 190 -22" fill="none" stroke="#9a6a36" stroke-width="3" stroke-linecap="round"/>
  <path d="M42 -23Q115 -5 188 -23" fill="none" stroke="#e3b878" stroke-width=".8" opacity=".7"/>
  <path d="M40 -22H190" stroke="#efe6d2" stroke-width=".8"/><path d="M108 -14h14v4h-14z" fill="var(--civ)" stroke="#2a0808" stroke-width=".6"/>
</g>
<g class="pc" style="--dx:-60px;--r:-12deg;--d:1.150;--o:0">
<g transform="translate(4 0)">
  <path d="M-23 -8l-2-14M-18 -9v-16M-13 -8l2-13" stroke="#b98a52" stroke-width="1.400"/>
  ${[-25, -18, -11].map((x, i) => `<path d="M${x} ${-20 - (i % 2) * 4}l-2.500-8 2.500 3 2.500-3z" fill="${i === 1 ? '#efe6d2' : 'var(--civ)'}" stroke="#2a0808" stroke-width=".6"/>`).join('')}
  <path d="M-26 -10h18l-2 58q-7 4-14 0z" fill="#6b4126" stroke="#1f1206" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M-25 -4h16M-24 38h14" stroke="var(--civ)" stroke-width="2.200"/><path d="M-20 4l5 8-5 8 5 8" fill="none" stroke="#e3b55a" stroke-width="1"/>
  <path d="M-8 -6q6 10 2 24" fill="none" stroke="#3a2412" stroke-width="1.400"/></g>
</g>
${arrow(30, -37, 28, 1.250, 0)}${arrow(150, -39, 22, 1.320, 1)}${arrow(222, -55, 34, 1.390, 0)}${arrow(255, -3, 18, 1.460, 1)}${arrow(-8, 168, 62, 1.530, 0)}${arrow(409, 214, 95, 1.600, 1)}
`;

const costume = {
  front: `
  <defs><linearGradient id="brKa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d1d8"/><stop offset=".45" stop-color="#7d868f"/><stop offset="1" stop-color="#3a4047"/></linearGradient></defs>
  <g class="bfeath"><path d="M86 31C90 17 102 5 124 -3C120 9 108 23 92 35z" fill="var(--civ)" stroke="#4a0c0c" stroke-width="1" stroke-linejoin="round"/>
  <path d="M89 32C98 20 108 10 121 0" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1"/>
  <path d="M96 22l-1 7M102 16l-1 7M108 11l-1 6M114 6l-1 5" stroke="#4a0c0c" stroke-width=".8" opacity=".6"/></g>
  <path d="M45 41C45 26 56 17 70 17s25 9 25 24z" fill="url(#brKa)" stroke="#16191c" stroke-width="1.300"/>
  <path d="M70 17v22" stroke="#16191c" stroke-width="1.200"/><path d="M52 30c3-6 8-9 14-10" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.600" stroke-linecap="round"/>
  <path d="M44 36h52v5H44z" fill="#5a3a1e" stroke="#1f1206" stroke-width="1"/>
  <path d="M24 46C32 39 50 37 70 37s38 2 46 9c-3 4-9 5-13 4-9-3-21-4-33-4s-24 1-33 4c-4 1-10 0-13-4z" fill="url(#brKa)" stroke="#16191c" stroke-width="1.300" stroke-linejoin="round"/>
  <path d="M30 45c10-4 24-5 40-5s30 1 40 5" fill="none" stroke="#e6edf2" stroke-opacity=".55" stroke-width="1"/>
  <g fill="#1d2126"><circle cx="34" cy="46" r="1"/><circle cx="48" cy="43" r="1"/><circle cx="62" cy="42" r="1"/><circle cx="78" cy="42" r="1"/><circle cx="92" cy="43" r="1"/><circle cx="106" cy="46" r="1"/></g>`,
};

const css = `
#stage[data-civ=britons] .gob.dressed .tuft{opacity:0}
#stage[data-civ=britons] .bunf{transform-box:fill-box;transform-origin:0 50%}
#stage[data-civ=britons] [data-mod=dress][data-phase=in] .bunf{animation:brUnf 1s 1.350s cubic-bezier(.3,1.4,.4,1) both}
#stage[data-civ=britons] [data-mod=dress][data-phase=out] .bunf{animation:brFurl .4s cubic-bezier(.6,0,.9,.4) both}
@keyframes brUnf{from{transform:scaleX(0) skewY(30deg)}to{transform:none}}
@keyframes brFurl{to{transform:scaleX(0)}}
#stage[data-civ=britons] .bwave{transform-box:fill-box;transform-origin:0 50%;animation:brWave 2.600s ease-in-out infinite}
@keyframes brWave{0%,100%{transform:skewY(-3deg) scaleX(.95)}50%{transform:skewY(4deg) scaleX(1.02)}}
#stage[data-civ=britons] .bsheen{animation:brSheen 1.900s linear infinite}
@keyframes brSheen{from{transform:translateX(0)}to{transform:translateX(130px)}}
#stage[data-civ=britons] .bsway{transform-box:fill-box;transform-origin:50% 0;animation:brSway 4.800s ease-in-out infinite}
@keyframes brSway{0%,100%{transform:rotate(-2deg) skewX(2deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
/* each arrow quivers once when it lands */
#stage[data-civ=britons] .btw{transform-box:view-box;transform-origin:0 0}
#stage[data-civ=britons] [data-mod=dress][data-phase=in] .btw{animation:brTw .6s calc(var(--d)*1s + .7s) ease-out both}
@keyframes brTw{0%{transform:rotate(0)}20%{transform:rotate(-5deg)}40%{transform:rotate(3.500deg)}60%{transform:rotate(-2deg)}80%{transform:rotate(1deg)}100%{transform:rotate(0)}}
#stage[data-civ=britons] .bfeath{transform-box:fill-box;transform-origin:0 100%;animation:brFeath 3.300s ease-in-out infinite}
@keyframes brFeath{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}
`;

export default {
  id: 'britons', name: 'Britons', kit: 'feudal',
  accent: '#ff5d5d', accent2: '#c8302f', cloth: '#26407a', metal: '#e3b55a',
  standard, pennant, costume, css, frame,
};
