// CIV layer: Teutons (kit: central). Steel-white accent, black-and-white cloth. Standard: a side-hung black-and-white
// banner with a great-helm-and-horns crest outline (no cross). Frame: a mail curtain on the top beam, articulated
// steel lames on both posts. Mascot: barrel great helm with a striped horn crest. All drawings are our own.

// great helm with horn crest, drawn as an outline (used on the banner and the pennant)
const CREST = `
  <path d="M-14 -2V-26C-14 -31 -8 -33 0 -33C8 -33 14 -31 14 -26V-2Z" fill="none" stroke-width="3.200" stroke-linejoin="round"/>
  <path d="M-14 -18H-2M2 -18H14M-9 -9h2M-4 -9h2M2 -9h2M7 -9h2" stroke-width="2.600" stroke-linecap="round"/>
  <path d="M-7 -33C-14 -42 -18 -52 -26 -58C-20 -50 -17 -42 -11 -33" fill="none" stroke-width="2.600" stroke-linejoin="round"/>
  <path d="M7 -33C14 -42 18 -52 26 -58C20 -50 17 -42 11 -33" fill="none" stroke-width="2.600" stroke-linejoin="round"/>
  <path d="M-9 -34h18" stroke-width="3" stroke-dasharray="3 2"/>`;

const standard = `<svg width="130" height="220" viewBox="0 0 130 220">
  <defs>
    <clipPath id="teuStdC"><path d="M33 8H122L106 70L122 132H33Z"/></clipPath>
    <linearGradient id="teuStdS" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".25" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#000" stop-opacity=".28"/><stop offset=".75" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
  </defs>
  <g class="unroll" style="--d:1.350"><g class="tflag">
    <g clip-path="url(#teuStdC)">
      <rect x="30" y="0" width="100" height="140" fill="#f4f6fa"/>
      <path d="M33 8H122V16H33zM33 124H122V132H33z" fill="#111216"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => `<rect x="${33 + (i % 2) * 7}" y="${16 + i * 7.700}" width="7" height="7.700" fill="#111216"/>`).join('')}
      <path d="M33 16H47V124H33" fill="none" stroke="#111216" stroke-width="1.200"/>
      <g transform="translate(84 104)" stroke="#111216">${CREST}</g>
      <path d="M58 112h52" stroke="#111216" stroke-width="1.400"/><path d="M62 117l4-3 4 3 4-3 4 3 4-3 4 3 4-3 4 3 4-3 4 3 4-3" fill="none" stroke="#111216" stroke-width="1.100"/>
      <rect class="tsheen" x="-70" y="0" width="300" height="140" fill="url(#teuStdS)"/>
    </g>
    <path d="M33 8H122L106 70L122 132H33" fill="none" stroke="#050506" stroke-width="1.200"/>
  </g></g>
  ${[12, 46, 80, 114].map((y) => `<g class="pc" style="--sc:0;--d:${(1.200 + y / 400).toFixed(2)}"><ellipse cx="30" cy="${y}" rx="6.500" ry="2.600" fill="none" stroke="#c8d0da" stroke-width="2"/><ellipse cx="30" cy="${y}" rx="6.500" ry="2.600" fill="none" stroke="#fff" stroke-width=".6" stroke-dasharray="4 18"/></g>`).join('')}
  <g class="fin" style="--d:2"><g class="ttail">
    <path d="M30 140c-2 10 1 20-3 32c4-4 6-3 7 0c0-12-2-22-4-32z" fill="#111216" stroke="#000" stroke-width=".6"/>
    <path d="M31 140c3 9 6 17 4 28c3-3 5-2 6 1c0-11-5-20-10-29z" fill="#f4f6fa" stroke="#000" stroke-width=".6"/>
    <rect x="25" y="136" width="10" height="7" rx="2" fill="#c8d0da" stroke="#2a2e32" stroke-width=".7"/>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="teuPenC"><path d="M2 4H32V56L17 46L2 56Z"/></clipPath></defs>
  <rect x="0" y="0" width="34" height="5" rx="2" fill="#c8d0da" stroke="#2a2e32" stroke-width=".7"/>
  <g class="unroll" style="--d:1.600"><g class="tflag" style="animation-delay:-1.700s">
    <g clip-path="url(#teuPenC)"><rect width="34" height="60" fill="#f4f6fa"/><path d="M2 4H32V10H2z" fill="#111216"/>
      <path d="M6 20l11 8 11-8M6 30l11 8 11-8" fill="none" stroke="#111216" stroke-width="3.200"/></g>
    <path d="M2 4H32V56L17 46L2 56Z" fill="none" stroke="#050506" stroke-width="1"/>
  </g></g>
</svg>`;

// mail curtain on the top beam (between the left spandrel and the mascot) and steel lames round both posts
const mailRows = () => { let s = ''; for (let r = 0; r < 4; r++) for (let x = 82 + (r % 2) * 2.500; x < 262; x += 5) s += `M${(x + 2).toFixed(1)} ${2 + r * 4}a2 2 0 1 0 .1 0`;
  return s; };
const lames = (x0, w) => [0, 1, 2].map((i) => `<path d="M${x0} ${100 + i * 9}h${w}v8c-${w / 2} 3-${w / 2} 3-${w} 0z" fill="url(#teuSteel)" stroke="#1a1d20" stroke-width=".8"/><circle cx="${x0 + 4}" cy="${104 + i * 9}" r="1.200" fill="#f4f6fa"/><circle cx="${x0 + w - 4}" cy="${104 + i * 9}" r="1.200" fill="#f4f6fa"/>`).join('');
const frame = `
<defs>
  <linearGradient id="teuSteel" x1="0" x2="1"><stop offset="0" stop-color="#59626b"/><stop offset=".35" stop-color="#eef3f8"/><stop offset=".6" stop-color="#9aa4ae"/><stop offset="1" stop-color="#3a4046"/></linearGradient>
  <clipPath id="teuMailC"><path d="M80 0H264V12C258 18 252 18 246 13C240 19 232 19 226 14C220 20 212 20 206 15C200 21 192 21 186 15C180 21 172 21 166 15C160 20 152 20 146 14C140 19 132 19 126 13C120 18 112 18 106 12C100 16 92 16 86 11L80 9Z"/></clipPath>
  <linearGradient id="teuMailS" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs>
<g class="pc" style="--dy:-50px;--d:1.050;--o:0"><g clip-path="url(#teuMailC)">
  <rect x="78" y="0" width="190" height="24" fill="#20252a"/>
  <path d="${mailRows()}" fill="none" stroke="#aeb8c2" stroke-width="1"/>
  <rect class="tmail" x="40" y="0" width="40" height="24" fill="url(#teuMailS)"/>
</g><path d="M80 1.500H264" stroke="#c8d0da" stroke-width="2.400"/>${[90, 130, 170, 210, 250].map((x) => `<circle cx="${x}" cy="1.500" r="2" fill="#eef3f8" stroke="#2a2e32" stroke-width=".6"/>`).join('')}</g>
<g class="pc" style="--dx:-40px;--sc:1.400;--d:1.150;--o:0">${lames(-23, 29)}</g>
<g class="pc" style="--dx:40px;--sc:1.400;--d:1.200;--o:0">${lames(394, 29)}</g>`;

const costume = {
  front: `
  <defs>
    <linearGradient id="teuHelm" x1="0" x2="1"><stop offset="0" stop-color="#4f5861"/><stop offset=".3" stop-color="#e9eff5"/><stop offset=".55" stop-color="#a6b0ba"/><stop offset="1" stop-color="#3c434a"/></linearGradient>
    <clipPath id="teuHornL"><path d="M54 15C46 3 40-9 28-16C35-5 39 6 47 18Z"/></clipPath>
    <clipPath id="teuHornR"><path d="M86 15C94 3 100-9 112-16C105-5 101 6 93 18Z"/></clipPath>
  </defs>
  <g class="thorns">
    <g clip-path="url(#teuHornL)"><rect x="24" y="-20" width="34" height="42" fill="#f4f6fa"/><path d="M50 18C44 6 38-4 29-14" fill="none" stroke="#111216" stroke-width="16" stroke-dasharray="5 5"/></g>
    <path d="M54 15C46 3 40-9 28-16C35-5 39 6 47 18Z" fill="none" stroke="#14181b" stroke-width="1.100" stroke-linejoin="round"/>
    <g clip-path="url(#teuHornR)"><rect x="82" y="-20" width="34" height="42" fill="#f4f6fa"/><path d="M90 18C96 6 102-4 111-14" fill="none" stroke="#111216" stroke-width="16" stroke-dasharray="5 5"/></g>
    <path d="M86 15C94 3 100-9 112-16C105-5 101 6 93 18Z" fill="none" stroke="#14181b" stroke-width="1.100" stroke-linejoin="round"/>
  </g>
  <path d="M42 51V21C42 15 55 12 70 12S98 15 98 21V51Z" fill="url(#teuHelm)" stroke="#14181b" stroke-width="1.300" stroke-linejoin="round"/>
  <ellipse cx="70" cy="15" rx="26" ry="3.600" fill="#d7dee6" stroke="#14181b" stroke-width="1"/>
  <path d="M46 16c-2 3-2 6 0 8" fill="none" stroke="#fff" stroke-width="1.400" opacity=".7"/>
  <path d="M42 25H98V30H42zM42 45H98V51H42z" fill="#c9a24f" stroke="#3a2a0c" stroke-width="1"/>
  <g fill="#3a2a0c">${[48, 58, 70, 82, 92].map((x) => `<circle cx="${x}" cy="27.500" r="1"/><circle cx="${x}" cy="48" r="1"/>`).join('')}</g>
  <g fill="#14181b">${[52, 57, 62, 78, 83, 88].map((x) => `<circle cx="${x}" cy="38" r="1.200"/>`).join('')}</g>
  <path d="M60 12.500c3-1.500 17-1.500 20 0l-1 3h-18z" fill="#111216"/><path d="M62 12.400l2 3M66 12l2 3.400M70 12l2 3.400M74 12l2 3.400" stroke="#f4f6fa" stroke-width="1.400"/>`,
};

const css = `
#stage[data-civ=teutons] .gob.dressed .tuft{opacity:0}
#stage[data-civ=teutons] .tflag{transform-box:fill-box;transform-origin:0 50%;animation:tFlag 4.800s ease-in-out infinite}
@keyframes tFlag{0%,100%{transform:skewY(-2deg) scaleX(.97)}50%{transform:skewY(2.500deg) scaleX(1)}}
#stage[data-civ=teutons] .tsheen{animation:tSheen 4.200s linear infinite}
@keyframes tSheen{from{transform:translateX(0)}to{transform:translateX(100px)}}
#stage[data-civ=teutons] .ttail{transform-box:fill-box;transform-origin:50% 0;animation:tTail 2.600s ease-in-out infinite alternate}
@keyframes tTail{from{transform:rotate(-7deg)}to{transform:rotate(9deg)}}
#stage[data-civ=teutons] .tmail{animation:tMail 3.800s ease-in-out infinite}
@keyframes tMail{0%{transform:translateX(0)}60%,100%{transform:translateX(240px)}}
#stage[data-civ=teutons] .thorns{transform-box:fill-box;transform-origin:50% 100%;animation:tHorn 3.400s ease-in-out infinite}
@keyframes tHorn{0%,100%{transform:rotate(0)}50%{transform:rotate(1.500deg) translateY(-.5px)}}
`;

export default {
  id: 'teutons', name: 'Teutons', kit: 'central',
  accent: '#e9f1ff', accent2: '#8a9bb8', cloth: '#16171b', metal: '#c8d0da',
  standard, pennant, costume, css, frame,
};
