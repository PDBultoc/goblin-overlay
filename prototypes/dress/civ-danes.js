// CIV layer: Danes (kit: norse). Warm-gold accent, deep-sea blue cloth. Standard: a gilded bronze ship's weather
// vane clamped to the mast (quarter-circle plate, openwork beast, a cast beast on top, streamers from the curved
// edge), turning in the wind. Frame: oars laid on the top beam, a coiled rope, two iron-bound chests (one open,
// heaped with silver). Mascot: a spectacle helm with mail cheek curtains and a twisted silver neck ring.
// All drawings are our own; no flags, no crosses.

// the vane's beast, built from strokes [d, width] (cut as openwork in the plate, cast solid on top)
const BEAST = [
  ['M18 82C25 76 35 75 43 77', 9], ['M19 84c-2 5-3 9-4 14h6', 3.6], ['M41 81c1 5 2 10 4 17h6', 3.6],
  ['M42 77C46 72 49 67 51 62', 5.5], ['M49 62c3-4 9-5 14-2l-3 3h-7', 4.5], ['M51 58l-2-6 5 4', 2],
  ['M17 80C9 78 6 70 10 64c3-5 10-4 10 1 0 3-3 5-5 3', 2.8],
];
const TENDRILS = [['M10 64C8 60 9 56 12 53', 2], ['M60 59c3-2 4-4 4-6', 2], ['M24 86c4 4 10 4 13 0', 2], ['M7 98H52', 2.6], ['M58 63c6 2 10 7 10 13', 2]];
const strokes = (list, col, add = 0) => list.map(([d, w]) => `<path d="${d}" stroke="${col}" stroke-width="${w + add}"/>`).join('');

const QUARTER = 'M0 46H80A80 80 0 0 1 0 126Z';
const WINDOW = 'M7 53H72.660A73 73 0 0 1 7 118.660Z';
// streamer holes on the curved edge (r 76.5 around the corner 0,46)
const HOLES = [15, 35, 55, 75].map((a) => [76.5 * Math.cos(a * Math.PI / 180), 46 + 76.5 * Math.sin(a * Math.PI / 180)]);

const streamer = ([x, y], i) => {
  const len = [40, 48, 42, 34][i], col = i % 2 ? '#f0c45a' : 'var(--civ3)';
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><g class="dnstr" style="animation-delay:${(-i * .7).toFixed(1)}s;animation-duration:${(2.300 + i * .35).toFixed(2)}s">
    <path d="M-1.800 0h3.600l1.200 ${len}-3-4-3 4z" fill="${col}" stroke="#1b1206" stroke-width=".6"/>
    <path d="M0 2v${len - 6}" stroke="#fff" stroke-opacity=".25" stroke-width=".8"/></g></g>`;
};

const standard = `<svg width="110" height="220" viewBox="0 0 110 220"><defs>
  <linearGradient id="dnG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".3" stop-color="#f0c45a"/><stop offset=".62" stop-color="#a8721c"/><stop offset=".85" stop-color="#e9b94e"/><stop offset="1" stop-color="#7a4f12"/></linearGradient>
  <linearGradient id="dnSh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="dnI" x1="0" x2="1"><stop offset="0" stop-color="#7c868e"/><stop offset=".5" stop-color="#3a4147"/><stop offset="1" stop-color="#1c2023"/></linearGradient>
  <mask id="dnVm" maskUnits="userSpaceOnUse" x="-10" y="0" width="110" height="140"><path d="${QUARTER}" fill="#fff"/><path d="${WINDOW}" fill="#000"/>
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">${strokes(BEAST, '#fff')}${strokes(TENDRILS, '#fff')}</g></mask>
</defs>
  <g class="pc" style="--dy:-40px;--sc:.6;--d:1.15">
    <rect x="-14" y="10" width="13" height="5" rx="1" fill="#22272b" stroke="#596168"/><rect x="-14" y="160" width="13" height="5" rx="1" fill="#22272b" stroke="#596168"/>
    <rect x="-6.500" y="0" width="5" height="172" rx="1.500" fill="url(#dnI)" stroke="#111" stroke-width=".6"/>
    <circle cx="-4" cy="172" r="3.400" fill="url(#dnG)" stroke="#5a3a0c" stroke-width=".7"/>
  </g>
  <g transform="scale(1.25)"><g class="unroll" style="--d:1.35"><g class="dnturn">
    ${HOLES.map(streamer).join('')}
    <g class="dnbody">
      <rect x="-2" y="44" width="84" height="84" fill="url(#dnG)" mask="url(#dnVm)"/>
      <g mask="url(#dnVm)"><rect class="dnsheen" x="-40" y="40" width="34" height="92" fill="url(#dnSh)" transform="skewX(-18)"/></g>
      <path d="${QUARTER}" fill="none" stroke="#5a3a0c" stroke-width="1.100"/><path d="${WINDOW}" fill="none" stroke="#5a3a0c" stroke-width=".9"/>
      <path d="M3.500 49.500H76.300A76.500 76.500 0 0 1 3.500 122.300" fill="none" stroke="#fff3c4" stroke-opacity=".55" stroke-width=".7" stroke-dasharray="1.200 2.200"/>
      ${HOLES.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.600" fill="#2a1a06"/>`).join('')}
      <circle cx="55.500" cy="60.500" r="1.100" fill="#2a1a06"/>
      <path d="M22 80c6-3 13-3 19-1" fill="none" stroke="#5a3a0c" stroke-width=".8"/>
    </g>
    <g transform="translate(22 -14.800) scale(.62)" fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${strokes(BEAST, '#3a2506', 2.400)}${strokes(BEAST, 'url(#dnG)')}<path d="M10 98H62" stroke="#3a2506" stroke-width="5"/><path d="M10 98H62" stroke="url(#dnG)" stroke-width="2.600"/>
      <circle cx="55.500" cy="60.500" r="1.400" fill="#2a1a06" stroke="none"/>
    </g>
    <circle cx="0" cy="52" r="3" fill="none" stroke="#3a4147" stroke-width="1.800"/><circle cx="0" cy="120" r="3" fill="none" stroke="#3a4147" stroke-width="1.800"/>
    <g transform="translate(78 47)"><path class="dnglint" style="animation-delay:-.4s" d="M0-5L1.200-1.200 5 0 1.200 1.200 0 5-1.200 1.200-5 0-1.200-1.200z" fill="#fff"/></g>
    <g transform="translate(33 22)"><path class="dnglint" style="animation-delay:-1.500s" d="M0-4L1-1 4 0 1 1 0 4-1 1-4 0-1-1z" fill="#fff"/></g>
  </g></g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.6"><g class="dnpsway">
  <defs><clipPath id="dnPc"><path d="M2 4H32V44L17 70 13 52 2 66Z"/></clipPath>
    <linearGradient id="dnPg" x1="0" x2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".5" stop-color="#e6b445"/><stop offset="1" stop-color="#8a5d14"/></linearGradient></defs>
  <g clip-path="url(#dnPc)"><rect width="34" height="74" fill="var(--civ3)"/><path d="M2 4h30v5H2z" fill="url(#dnPg)"/>
    <path d="M9 16H25A16 16 0 0 1 9 32Z" fill="url(#dnPg)" stroke="#5a3a0c" stroke-width=".6"/><path d="M11.500 18.500H21A10 10 0 0 1 11.500 28.500Z" fill="var(--civ3)"/>
    <path d="M12 26c2-3 5-4 7-3" fill="none" stroke="url(#dnPg)" stroke-width="1.600" stroke-linecap="round"/>
    <path d="M2 38h30" stroke="url(#dnPg)" stroke-width="1.200"/><path d="M2 42h30" stroke="url(#dnPg)" stroke-width=".6"/></g>
  <path d="M2 4H32V44L17 70 13 52 2 66Z" fill="none" stroke="#0c1530" stroke-width="1"/>
</g></g></svg>`;

// ---------- frame pieces on the longship (camera-local coordinates) ----------
const oar = (y, dx) => `
  <path d="M${14 + dx} ${y}H${258 + dx}" stroke="#2a1809" stroke-width="4.800" stroke-linecap="round"/>
  <path d="M${14 + dx} ${y}H${258 + dx}" stroke="#a87a48" stroke-width="2.800" stroke-linecap="round"/>
  <path d="M${16 + dx} ${y - .7}H${250 + dx}" stroke="#e8c290" stroke-width=".7" opacity=".6"/>
  <path d="M${244 + dx} ${y}H${258 + dx}" stroke="#4a2c14" stroke-width="3.400" stroke-linecap="round"/>
  <path d="M${16 + dx} ${y - 1.5}C${6 + dx} ${y - 5.500} ${-6 + dx} ${y - 5.500} ${-18 + dx} ${y - 3.500}L${-18 + dx} ${y + 3.500}C${-6 + dx} ${y + 5.500} ${6 + dx} ${y + 5.500} ${16 + dx} ${y + 1.500}z" fill="#9b6c3c" stroke="#2a1809" stroke-width=".9"/>
  <path d="M${-17 + dx} ${y - 3.200}v6.400M${-12 + dx} ${y - 4}v8" stroke="var(--civ3)" stroke-width="2.400"/><path d="M${-8 + dx} ${y - 4.300}v8.600" stroke="#f0c45a" stroke-width="1.200"/>`;

const rope = () => { let s = '';
  for (let k = 0; k < 4; k++) { const cy = -3 - k * 4.200, rx = 21 - k * 2.400;
    s += `<ellipse cx="0" cy="${cy}" rx="${rx}" ry="5" fill="none" stroke="#3b2a14" stroke-width="5.400"/><ellipse cx="0" cy="${cy}" rx="${rx}" ry="5" fill="none" stroke="#c9a46a" stroke-width="3.800"/>
      <ellipse cx="0" cy="${cy}" rx="${rx}" ry="5" fill="none" stroke="#6e5230" stroke-width="3.800" stroke-dasharray="1.300 2.100"/>`; }
  return s + `<ellipse cx="0" cy="-15.600" rx="9" ry="2.600" fill="#1d1408"/>
    <path d="M19 -4c5 4 7 11 5 20 2 6 1 10-2 13" fill="none" stroke="#3b2a14" stroke-width="5"/><path d="M19 -4c5 4 7 11 5 20 2 6 1 10-2 13" fill="none" stroke="#c9a46a" stroke-width="3.400"/>
    <path d="M19 -4c5 4 7 11 5 20 2 6 1 10-2 13" fill="none" stroke="#6e5230" stroke-width="3.400" stroke-dasharray="1.300 2.100"/>
    <path d="M22 29l-2 4M22 29l1 4M22 29l-4 2" stroke="#c9a46a" stroke-width="1"/>`; };

const band = (x, y0, y1) => `<rect x="${x}" y="${y0}" width="4" height="${y1 - y0}" fill="#2a2f33" stroke="#5d666d" stroke-width=".7"/><circle cx="${x + 2}" cy="${y0 + 3}" r="1" fill="#aab4bc"/><circle cx="${x + 2}" cy="${y1 - 3}" r="1" fill="#aab4bc"/>`;
const lock = (y) => `<rect x="-4.500" y="${y}" width="9" height="9" rx="1" fill="url(#dnFG)" stroke="#5a3a0c" stroke-width=".7"/><path d="M0 ${y + 3}v3.500" stroke="#3a2506" stroke-width="1.400" stroke-linecap="round"/>`;
const glint = (x, y, dl, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="dnglint" style="animation-delay:${dl}s" d="M0-5L1.200-1.200 5 0 1.200 1.200 0 5-1.200 1.200-5 0-1.200-1.200z" fill="#fff"/></g>`;
const coin = (x, y, r = 2.600) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#dnFS)" stroke="#4d555c" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="${(r * .5).toFixed(2)}" fill="none" stroke="#7d878f" stroke-width=".4"/>`;

const frame = `
<defs>
  <linearGradient id="dnFW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5f36"/><stop offset=".6" stop-color="#55361c"/><stop offset="1" stop-color="#2b1a0b"/></linearGradient>
  <linearGradient id="dnFS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#c9d1d8"/><stop offset="1" stop-color="#6b747c"/></linearGradient>
  <linearGradient id="dnFG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".5" stop-color="#e6b445"/><stop offset="1" stop-color="#8a5d14"/></linearGradient>
</defs>
<g class="pc" style="--dx:-300px;--d:1.0;--o:0">${oar(-27, 4)}${oar(-21.500, 0)}</g>
<g transform="translate(44 -16)"><g class="pc" style="--dx:-140px;--dy:-60px;--r:-220deg;--d:1.12;--o:0">${rope()}</g></g>
<g transform="translate(111 -16)"><g class="pc" style="--dy:-150px;--r:14deg;--d:1.22;--o:0">
  <rect x="-27" y="-24" width="54" height="24" fill="url(#dnFW)" stroke="#1a0f06" stroke-width="1"/>
  <path d="M-26 -12h52" stroke="#1a0f06" stroke-width=".7" opacity=".6"/>
  <path d="M-28.500 -24C-28.500 -35 28.500 -35 28.500 -24Z" fill="#6b4626" stroke="#1a0f06" stroke-width="1"/><path d="M-24 -28c14-5 34-5 48 0" fill="none" stroke="#d2a56c" stroke-width=".8" opacity=".5"/>
  ${band(-21, -32, 0)}${band(17, -32, 0)}${lock(-26)}
</g></g>
<g transform="translate(196 -16)"><g class="pc" style="--dy:-170px;--r:-12deg;--d:1.32;--o:0">
  <path d="M-33 -22L-27 -47Q0 -53 27 -47L33 -22Z" fill="#3e2714" stroke="#1a0f06" stroke-width="1"/><path d="M-27 -45Q0 -50 27 -45" fill="none" stroke="#2a2f33" stroke-width="3"/>
  <path d="M-31 -21C-25 -33 -9 -38 1 -34 13 -38 26 -31 31 -21Z" fill="url(#dnFS)" stroke="#4d555c" stroke-width=".8"/>
  ${coin(-20, -26)}${coin(-11, -31)}${coin(-2, -28)}${coin(9, -33)}${coin(17, -27)}${coin(4, -24)}${coin(24, -24)}${coin(-25, -22.500, 2.200)}
  <path d="M-8 -35l6-2 1 4-6 1zM12 -31l5 1-2 4z" fill="#dfe6ec" stroke="#4d555c" stroke-width=".5"/>
  <rect x="-34" y="-22" width="68" height="22" fill="url(#dnFW)" stroke="#1a0f06" stroke-width="1"/>
  ${band(-27, -22, 0)}${band(23, -22, 0)}${lock(-20)}
  <ellipse cx="13" cy="-13" rx="6" ry="8" fill="none" stroke="#4d555c" stroke-width="3.400"/><ellipse cx="13" cy="-13" rx="6" ry="8" fill="none" stroke="url(#dnFS)" stroke-width="2.200"/>
  ${coin(40, -1.500, 2.400)}${coin(46, -.8, 2.200)}
  ${glint(-12, -33, -.3)}${glint(10, -36, -1.2, .8)}${glint(22, -28, -1.900, .7)}${glint(13, -21, -.9, .6)}
</g></g>
${glint(111, -42, -2.200, .6)}
`;

const costume = {
  front: `
  <defs>
    <pattern id="dnMail" width="3.200" height="2.800" patternUnits="userSpaceOnUse"><rect width="3.200" height="2.800" fill="#262b30"/>
      <circle cx="1.600" cy="1.400" r="1.150" fill="none" stroke="#b3bcc3" stroke-width=".55"/><circle cx="0" cy="0" r="1.150" fill="none" stroke="#7d878f" stroke-width=".55"/>
      <circle cx="3.200" cy="0" r="1.150" fill="none" stroke="#7d878f" stroke-width=".55"/><circle cx="0" cy="2.800" r="1.150" fill="none" stroke="#7d878f" stroke-width=".55"/><circle cx="3.200" cy="2.800" r="1.150" fill="none" stroke="#7d878f" stroke-width=".55"/></pattern>
    <linearGradient id="dnHelm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a7b0b8"/><stop offset=".45" stop-color="#555d64"/><stop offset="1" stop-color="#1f2428"/></linearGradient>
  </defs>
  <path d="M36 45H49V57C49 61 47 63 46 65V85L43.500 83 41 86 38.500 83 36 86 34.500 83C33.500 70 34 56 36 45Z" fill="url(#dnMail)" stroke="#14181b" stroke-width=".9" stroke-linejoin="round"/>
  <path d="M104 45H91V57C91 61 93 63 94 65V85L96.500 83 99 86 101.500 83 104 86 105.500 83C106.500 70 106 56 104 45Z" fill="url(#dnMail)" stroke="#14181b" stroke-width=".9" stroke-linejoin="round"/>
  <path d="M40 50C39 29 52 13 70 13S101 29 100 50Z" fill="url(#dnHelm)" stroke="#14181b" stroke-width="1.300"/>
  <path d="M66.500 14L70 5.500 73.500 14Z" fill="#555d64" stroke="#14181b" stroke-width="1"/><circle cx="70" cy="5.500" r="1.800" fill="#ffcf5a" stroke="#5a3a0c" stroke-width=".6"/>
  <path d="M70 14V46M70 14C60 20 54 32 53 46M70 14C80 20 86 32 87 46" fill="none" stroke="#1d2226" stroke-width="3.600"/>
  <path d="M70 15V45M69 15C60 21 55 32 54 45M71 15C80 21 85 32 86 45" fill="none" stroke="#8d979f" stroke-width=".9" opacity=".8"/>
  <path d="M48 26c4-7 10-10 16-11" fill="none" stroke="#dfe7ee" stroke-width="1.500" stroke-linecap="round" opacity=".7"/>
  <path d="M38.500 44.500H101.500V50.500H38.500Z" fill="#30363b" stroke="#14181b" stroke-width="1"/><path d="M39 45.500h62" stroke="#9aa4ac" stroke-width=".7" opacity=".7"/>
  <g fill="#ffcf5a" stroke="#5a3a0c" stroke-width=".4"><circle cx="43" cy="47.500" r="1.200"/><circle cx="53" cy="47.500" r="1.200"/><circle cx="63" cy="47.500" r="1.200"/><circle cx="77" cy="47.500" r="1.200"/><circle cx="87" cy="47.500" r="1.200"/><circle cx="97" cy="47.500" r="1.200"/>
    <circle cx="70" cy="32" r="1"/><circle cx="70" cy="22" r="1"/></g>
  <g fill="none" stroke-linejoin="round">
    <path d="M47.200 50.500H68.800V58C68.800 61.800 66 64.300 62 64.300H54C50 64.300 47.200 61.500 47.200 57.500Z" stroke="#1d2226" stroke-width="3"/>
    <path d="M92.800 50.500H71.200V58C71.200 61.800 74 64.300 78 64.300H86C90 64.300 92.800 61.500 92.800 57.500Z" stroke="#1d2226" stroke-width="3"/>
    <path d="M47.200 50.500H68.800V58C68.800 61.800 66 64.300 62 64.300H54C50 64.300 47.200 61.500 47.200 57.500Z" stroke="#7e8890" stroke-width="1.100"/>
    <path d="M92.800 50.500H71.200V58C71.200 61.800 74 64.300 78 64.300H86C90 64.300 92.800 61.500 92.800 57.500Z" stroke="#7e8890" stroke-width="1.100"/>
  </g>
  <path d="M68.800 50.500h2.400V64l-1.200 1.600-1.200-1.600z" fill="#30363b" stroke="#14181b" stroke-width=".6"/>
  <path d="M55 86Q70 95 85 86" fill="none" stroke="#454c52" stroke-width="4.600" stroke-linecap="round"/>
  <path d="M55 86Q70 95 85 86" fill="none" stroke="#dfe6ec" stroke-width="3" stroke-linecap="round"/>
  <path d="M55 86Q70 95 85 86" fill="none" stroke="#7d878f" stroke-width="3" stroke-dasharray="1.400 1.600"/>
  <circle cx="55" cy="86" r="2.600" fill="url(#dnMail)" stroke="#454c52"/><circle cx="85" cy="86" r="2.600" fill="url(#dnMail)" stroke="#454c52"/>
  <circle cx="55" cy="86" r="2.300" fill="#ffcf5a" stroke="#5a3a0c" stroke-width=".6"/><circle cx="85" cy="86" r="2.300" fill="#ffcf5a" stroke="#5a3a0c" stroke-width=".6"/>`,
};

const css = `
#stage[data-civ=danes] .gob.dressed .tuft{opacity:0}
#stage[data-civ=danes] .dnturn{transform-box:view-box;transform-origin:-3px 0;animation:dnTurn 8s ease-in-out infinite}
@keyframes dnTurn{0%,100%{transform:scaleX(1)}35%{transform:scaleX(.72)}55%{transform:scaleX(.97)}80%{transform:scaleX(.84)}}
#stage[data-civ=danes] .dnstr{transform-box:fill-box;transform-origin:50% 0;animation:dnStr 2.600s ease-in-out infinite alternate}
@keyframes dnStr{from{transform:rotate(-8deg) skewX(5deg)}to{transform:rotate(10deg) skewX(-6deg)}}
#stage[data-civ=danes] .dnsheen{animation:dnSheen 4.200s ease-in-out infinite}
@keyframes dnSheen{0%{translate:-30px 0}55%,100%{translate:150px 0}}
#stage[data-civ=danes] .dnglint{transform-box:fill-box;transform-origin:center;animation:dnGl 2.600s ease-in-out infinite;filter:drop-shadow(0 0 3px #ffe9a8)}
@keyframes dnGl{0%,62%,100%{transform:scale(0) rotate(0);opacity:0}76%{transform:scale(1.1) rotate(45deg);opacity:1}88%{transform:scale(.3) rotate(90deg);opacity:.3}}
#stage[data-civ=danes] .dnpsway{transform-box:fill-box;transform-origin:50% 0;animation:dnPs 4.800s ease-in-out infinite}
@keyframes dnPs{0%,100%{transform:rotate(-2deg) skewX(2deg)}50%{transform:rotate(3deg) skewX(-4deg)}}
`;

export default {
  id: 'danes', name: 'Danes', kit: 'norse',
  accent: '#ffcf5a', accent2: '#c8891c', cloth: '#233a78', metal: '#e0b04a',
  standard, pennant, costume, css, frame,
};
