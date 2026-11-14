// CIV layer: Georgians (kit: caucasus). Wine-pink accent, deep wine cloth. Standard: a scalloped wine banner with a
// galloping horse rider (cape streaming) and grape clusters hanging from vine borders. Headgear: a tall sheepskin
// hat. Frame pieces: a clay wine jug and a silver-mounted drinking horn resting on the top beam, a grape cluster on
// the pole. All drawings are our own; no state, church or religious symbols.

const f = (v) => +v.toFixed(2);
// grape cluster: berries in a hanging triangle, a stalk, one leaf
const grapes = (x, y, s, leafSide = 1) => { const rows = [4, 3, 3, 2, 1]; let b = '';
  rows.forEach((n, j) => { for (let i = 0; i < n; i++) { const cx = (i - (n - 1) / 2) * 4.2, cy = 3 + j * 3.6;
    b += `<circle cx="${f(cx)}" cy="${f(cy)}" r="2.3" fill="${(i + j) % 3 ? '#4a1440' : '#6a1f5c'}" stroke="#1e0618" stroke-width=".5"/><circle cx="${f(cx - .7)}" cy="${f(cy - .8)}" r=".6" fill="#f4c6dc" opacity=".8"/>`; } });
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v2M0 -1c${3 * leafSide} -3 ${6 * leafSide} -3 ${8 * leafSide} -1" stroke="#4a2c14" stroke-width="1" fill="none"/>
    <path transform="translate(${3 * leafSide} -4) scale(${leafSide} 1)" d="M0 0c2-5 7-6 9-3 3-2 6 1 4 4 3 1 2 5-2 5-1 3-5 3-6 0-3 1-6-2-5-6z" fill="#4f7a35" stroke="#1f3312" stroke-width=".6"/>
    ${b}</g>`; };
const vine = (x0, y0, x1, y1, n) => { let d = `M${x0} ${y0}`; for (let i = 1; i <= n; i++) { const t = i / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t, o = (i % 2 ? 3 : -3);
  d += `Q${f(x0 + (x1 - x0) * (t - .5 / n) + (y1 !== y0 ? o : 0))} ${f(y0 + (y1 - y0) * (t - .5 / n) + (y1 === y0 ? o : 0))} ${f(x)} ${f(y)}`; } return d; };

// horse and rider in profile, galloping right; the rider's cape streams back (no lance, nothing crossing)
const RIDER = `
  <path class="gcape" d="M27 10c-8 2-16 1-24 6 6 1 12 0 18 2-5 3-9 7-14 8 8 0 14-4 20-8z" fill="var(--civ)" stroke="#2a0a1a" stroke-width=".7"/>
  <path d="M14 22c2-5 10-8 20-8 6 0 9 1 11 3l5-7c2-3 5-5 8-4l4 3-1 3-4-1-2 4-6 9c-1 3-3 5-6 6l3 6 4 3-2 2-5-4-4-6c-5 1-11 1-15 0l-4 5 1 6-3 1-2-7 1-6c-3-1-4-4-4-7l-5 3c-3 2-6 6-7 10-1-6 2-11 6-14z" fill="#efe2c4" stroke="#2a0a1a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M46 16l4 6M48 13l4 5M50 11l3 4" stroke="#2a0a1a" stroke-width=".8" stroke-linecap="round"/>
  <circle cx="58.500" cy="9" r=".9" fill="#2a0a1a"/>
  <path d="M28 14c-1-4 0-8 2-11l4 1c1 3 0 7-1 10z" fill="var(--civ2)" stroke="#2a0a1a" stroke-width=".8"/>
  <circle cx="32" cy="0" r="3.400" fill="#efe2c4" stroke="#2a0a1a" stroke-width=".8"/><path d="M29 -2c0-4 6-5 7-1z" fill="#3a2a22"/>
  <path d="M33 6l7 3 4-2" fill="none" stroke="#efe2c4" stroke-width="2.200" stroke-linecap="round"/><path d="M33 6l7 3 4-2" fill="none" stroke="#2a0a1a" stroke-width=".5"/>
  <path d="M26 15c0 5 2 8 6 9" fill="none" stroke="#3a2a22" stroke-width="2.400" stroke-linecap="round"/>`;

const standard = `<svg width="96" height="222" viewBox="0 0 96 222"><g class="unroll" style="--d:1.35"><g class="gsway">
  <defs>
    <clipPath id="geoC"><path d="M4 8H92V176Q81 194 70 180Q59 196 48 182Q37 196 26 180Q15 194 4 176Z"/></clipPath>
    <linearGradient id="geoSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".28" stop-color="#fff" stop-opacity=".16"/><stop offset=".55" stop-color="#000" stop-opacity=".25"/><stop offset=".8" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
    <radialGradient id="geoGl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="var(--civ)" stop-opacity=".35"/><stop offset="1" stop-color="var(--civ)" stop-opacity="0"/></radialGradient>
  </defs>
  <path d="M16 0v9M48 0v9M80 0v9" stroke="#cfd4d8" stroke-width="2.400" stroke-linecap="round"/>
  <g clip-path="url(#geoC)">
    <rect width="96" height="200" fill="var(--civ3)"/>
    <path d="M4 8h88v6H4z" fill="#d8c8a8"/><path d="M4 16h88" stroke="var(--civ)" stroke-width="1.400"/>
    <path d="${vine(10, 24, 10, 168, 9)}${vine(86, 24, 86, 168, 9)}" fill="none" stroke="#8fae5a" stroke-width="1.600" opacity=".9"/>
    ${[40, 72, 104, 136].map((y) => `<path transform="translate(10 ${y}) rotate(-30)" d="M0 0c3-3 8-3 10 0-2 3-7 3-10 0z" fill="#4f7a35"/><path transform="translate(86 ${y + 14}) rotate(210)" d="M0 0c3-3 8-3 10 0-2 3-7 3-10 0z" fill="#4f7a35"/>`).join('')}
    <ellipse cx="48" cy="90" rx="40" ry="34" fill="url(#geoGl)"/>
    <g transform="translate(17 74)"><g class="grider">${RIDER}</g></g>
    <path d="M18 128h60" stroke="#d8c8a8" stroke-width="1" stroke-dasharray="1 3" stroke-linecap="round"/>
    ${grapes(30, 140, 1.15, -1)}${grapes(66, 140, 1.15, 1)}
    <rect class="gsheen" x="-96" width="288" height="200" fill="url(#geoSh)"/>
  </g>
  <path d="M4 8H92V176Q81 194 70 180Q59 196 48 182Q37 196 26 180Q15 194 4 176Z" fill="none" stroke="#1e0618" stroke-width="1.200"/>
  <rect x="2" y="5" width="92" height="5" rx="2.500" fill="#cfd4d8" stroke="#4a4f55" stroke-width=".8"/>
  ${[[4, 176], [26, 180], [48, 182], [70, 180], [92, 176]].map(([x, y], i) => `<g transform="translate(${x} ${y + 1})"><g class="gbob" style="--i:${i}"><path d="M0 0v6" stroke="#4a2c14" stroke-width=".9"/>${grapes(0, 6, .62, i % 2 ? 1 : -1)}</g></g>`).join('')}
</g></g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.6"><g class="gsway" style="animation-delay:-2s">
  <path d="M3 4H31V50Q24 60 17 52Q10 60 3 50Z" fill="var(--civ3)" stroke="#1e0618"/>
  <path d="M3 4h28v4H3z" fill="#d8c8a8"/><path d="M3 10h28" stroke="var(--civ)" stroke-width="1"/>
  ${grapes(17, 22, .95, 1)}
  <rect x="1" y="1" width="32" height="4" rx="2" fill="#cfd4d8"/>
</g></g></svg>`;

// clay jug and drinking horn resting on the top beam (beam top = y -42), a grape cluster hung on the pole
const frame = `
<g transform="translate(36 -42)"><g class="pc" style="--dy:-80px;--r:-25deg;--d:1.05;--o:0">
  <ellipse cx="0" cy="0" rx="14" ry="2.500" fill="#000" opacity=".35"/>
  <path d="M-6 -38h12l-2 5c9 4 13 13 12 21-1 7-5 11-10 12H-6c-5-1-9-5-10-12-1-8 3-17 12-21z" fill="#b5603c" stroke="#3a160a" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M-8 -38h16v3H-8z" fill="#8e4428" stroke="#3a160a" stroke-width=".8"/>
  <path d="M9 -30c9-1 12 6 9 12-2 4-5 5-7 5" fill="none" stroke="#3a160a" stroke-width="3.400" stroke-linecap="round"/><path d="M9 -30c9-1 12 6 9 12-2 4-5 5-7 5" fill="none" stroke="#b5603c" stroke-width="1.800" stroke-linecap="round"/>
  <path d="M-12 -18c7 3 17 3 24 0M-12 -12c7 3 17 3 24 0" fill="none" stroke="#e8c39a" stroke-width="1" opacity=".8"/>
  <path d="M-11 -15l3-3 3 3 3-3 3 3 3-3 3 3 3-3" fill="none" stroke="#3a160a" stroke-width=".8"/>
  <path d="M-9 -26c-2 4-2 9 0 14" fill="none" stroke="#f1c9a6" stroke-width="1.600" stroke-linecap="round" opacity=".7"/>
</g></g>
<g transform="translate(64 -42)"><g class="pc" style="--dx:-60px;--dy:-70px;--r:40deg;--d:1.15;--o:0">
  <path d="M0 -2C14 -3 34 -8 52 -24c2 3 1 6-1 8C36 -4 16 2 0 2z" fill="#3a2418" stroke="#140a05" stroke-width="1"/>
  <path d="M2 -1C16 -2 32 -7 49 -21" fill="none" stroke="#9a6a44" stroke-width="1.200" opacity=".8"/>
  <path d="M-2 -4h7v8h-7z" fill="#cfd4d8" stroke="#4a4f55" stroke-width=".8"/><path d="M20 -8l5-1v7l-5 2zM40 -16l4-3 2 5-4 3z" fill="#cfd4d8" stroke="#4a4f55" stroke-width=".7"/>
  <path d="M50 -23l4-5 2 3-2 4z" fill="#cfd4d8" stroke="#4a4f55" stroke-width=".7"/>
  <path d="M5 -4c8 -8 22 -8 32 -12" fill="none" stroke="#cfd4d8" stroke-width=".7" opacity=".6"/>
</g></g>
<g transform="translate(468 164)"><g class="pc" style="--dy:60px;--r:15deg;--d:1.2;--o:0"><g class="gbob" style="--i:3">
  <path d="M-6 0h4M-10 0c0-4 6-5 8-1" stroke="#cfd4d8" stroke-width="1.400" fill="none"/><path d="M-2 0v6" stroke="#4a2c14" stroke-width="1"/>
  ${grapes(-2, 6, 1.5, 1)}
</g></g></g>`;

// tall sheepskin hat: a tall drum of curly wool, a cloth crown on top
const curls = () => { let s = ''; for (let y = 10; y <= 42; y += 5.2) for (let x = 46 + ((y / 5.2) % 2) * 3; x <= 94; x += 6.2) s += `M${f(x - 2.4)} ${f(y + 1)}a2.400 2.200 0 1 1 ${f(4.8)} 0`; return s; };
const costume = {
  front: `
  <path d="M43 46C42 32 43 18 46 6c8-4 40-4 48 0 3 12 4 26 3 40-9-3-45-3-54 0z" fill="#2e2622" stroke="#0c0806" stroke-width="1.300" stroke-linejoin="round"/>
  <path d="${curls()}" fill="none" stroke="#6b5c52" stroke-width="1.300" stroke-linecap="round"/>
  <path d="${curls()}" fill="none" stroke="#a89484" stroke-width=".5" stroke-linecap="round" transform="translate(.5 -.6)"/>
  <ellipse cx="70" cy="6" rx="24" ry="4.500" fill="var(--civ3)" stroke="#0c0806" stroke-width="1.100"/>
  <path d="M52 5c6-2 30-2 36 0" fill="none" stroke="var(--civ)" stroke-width="1.100" opacity=".9"/>
  <path d="M48 12c-2 10-2 22-1 32" fill="none" stroke="#8d7a6c" stroke-width="2" stroke-linecap="round" opacity=".55"/>
  <path d="M43 46c9-3 45-3 54 0" fill="none" stroke="#0c0806" stroke-width="1.800"/>`,
};

const css = `
#stage[data-civ=georgians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=georgians] .gsway{transform-box:fill-box;transform-origin:50% 0;animation:gSway 5.200s ease-in-out infinite}
@keyframes gSway{0%,100%{transform:rotate(-1.800deg) skewX(1.500deg)}50%{transform:rotate(2deg) skewX(-2.400deg)}}
#stage[data-civ=georgians] .gsheen{animation:gSheen 4.200s linear infinite}
@keyframes gSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=georgians] .grider{transform-box:fill-box;transform-origin:50% 100%;animation:gGallop .55s ease-in-out infinite alternate}
@keyframes gGallop{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-2.500px) rotate(2deg)}}
#stage[data-civ=georgians] .gcape{transform-box:fill-box;transform-origin:100% 30%;animation:gCape .42s ease-in-out infinite alternate}
@keyframes gCape{from{transform:skewY(-6deg) scaleX(.94)}to{transform:skewY(5deg) scaleX(1.05)}}
#stage[data-civ=georgians] .gbob{transform-box:fill-box;transform-origin:50% 0;animation:gBob calc(1.900s + var(--i,0)*.2s) calc(var(--i,0)*-.35s) ease-in-out infinite alternate}
@keyframes gBob{from{transform:rotate(-7deg)}to{transform:rotate(8deg)}}
`;

export default {
  id: 'georgians', name: 'Georgians', kit: 'caucasus',
  accent: '#ff4f7b', accent2: '#c22350', cloth: '#4a1232', metal: '#cfd4d8',
  standard, pennant, costume, css, frame,
};
