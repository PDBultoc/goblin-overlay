// CIV layer: Celts (kit: feudal). Woad-blue accent, madder cloth, bronze. A boar-headed war horn (carnyx) lashed to
// the lance with a cloth of La Tene spiral work beneath it, long bronze-faced shields on both jambs and spiral discs on
// the merlons; for the mascot no metal at all: limed spiky hair, woad stripes on the cheeks, a gold torc.
// All drawings are our own.

// Archimedean spiral from the centre outwards (turns, radius); returns a path string at (cx,cy)
const spiral = (cx, cy, rad, turns = 2.250, rot = 0) => { let d = ''; const n = Math.round(turns * 20);
  for (let i = 0; i <= n; i++) { const t = i / n, a = rot + t * turns * Math.PI * 2, rr = t * rad; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1); }
  return d; };

const BRONZE = 'url(#ceBz)';
const standard = `<svg width="96" height="130" viewBox="0 0 96 130">
  <defs><linearGradient id="ceBz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d27a"/><stop offset=".45" stop-color="#c58b34"/><stop offset="1" stop-color="#6e4314"/></linearGradient>
  <linearGradient id="ceCs" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".3" stop-color="#fff" stop-opacity=".14"/><stop offset=".55" stop-color="#000" stop-opacity=".28"/><stop offset=".8" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
  <clipPath id="ceCc"><path d="M22 8H90V96L84 92 78 98 72 92 66 98 60 92 54 98 48 92 42 98 36 92 30 98 22 94Z"/></clipPath></defs>
  <g class="pc" style="--dy:-120px;--d:1.100">
    <path d="M15 -32V112q0 10 8 12" fill="none" stroke="#3a2208" stroke-width="7" stroke-linecap="round"/><path d="M15 -32V112q0 10 8 12" fill="none" stroke="#c58b34" stroke-width="5" stroke-linecap="round"/>
    <path d="M13.500 -30V110" stroke="#fff3c4" stroke-width="1" opacity=".55"/>
    <path d="M4 2h14M4 58h14M4 100h14" stroke="#4a2f17" stroke-width="3.200" stroke-linecap="round"/>
    <path d="M18 4H92" stroke="#2a1a0c" stroke-width="4.400" stroke-linecap="round"/><path d="M18 4H92" stroke="#8a5a2c" stroke-width="2.600" stroke-linecap="round"/>
    <g class="cboar">
      <path d="M22 -61l-5-13 12 8z" fill="${BRONZE}" stroke="#3a2208" stroke-width="1"/>
      <path d="M10 -30C7 -46 15 -60 30 -62c10-1 20 2 29 7l6 3-2 4-11 1c-6 0-12 2-18 6z" fill="${BRONZE}" stroke="#3a2208" stroke-width="1.200" stroke-linejoin="round"/>
      <path d="M12 -50l-4-9 7 5v-10l5 8 2-10 4 9 4-8 2 9" fill="none" stroke="#3a2208" stroke-width="1.400" stroke-linejoin="round"/>
      <path d="M52 -50c3 1 6 3 7 6M26 -50c6-4 14-6 22-5" fill="none" stroke="#3a2208" stroke-width="1"/>
      <path d="${spiral(30, -45, 5, 1.750)}" fill="none" stroke="#3a2208" stroke-width=".9"/>
      <circle class="ceye" cx="38" cy="-55" r="2.200"/>
      <path d="M55 -45l5 7-7-3z" fill="#f6efdc" stroke="#3a2208" stroke-width=".6"/>
      <g class="cjaw"><path d="M14 -30c8-5 19-9 31-9l13 2-2 5c-11 2-24 4-36 9z" fill="${BRONZE}" stroke="#3a2208" stroke-width="1.200" stroke-linejoin="round"/>
      <path d="M40 -38l14 1" stroke="var(--civ)" stroke-width="2" stroke-linecap="round"/></g>
    </g>
  </g>
  <g class="unroll" style="--d:1.450"><g class="csway">
    <g clip-path="url(#ceCc)">
      <rect width="96" height="110" fill="var(--civ3)"/>
      <path d="M22 12H90M22 88H90" stroke="var(--civ)" stroke-width="2"/>
      ${[30, 42, 54, 66, 78].map((x) => `<path d="M${x} 13l3 3-3 3-3-3z M${x} 85l3 3-3 3-3-3z" fill="#f2d48a"/>`).join('')}
      <path d="${spiral(40, 40, 11, 2.250, 0)}" fill="none" stroke="var(--civ)" stroke-width="2.400" stroke-linecap="round"/>
      <path d="${spiral(72, 40, 11, 2.250, Math.PI)}" fill="none" stroke="var(--civ)" stroke-width="2.400" stroke-linecap="round"/>
      <path d="${spiral(56, 66, 11, 2.250, Math.PI / 2)}" fill="none" stroke="var(--civ)" stroke-width="2.400" stroke-linecap="round"/>
      <path d="M51 40C56 30 62 30 61 40M46 50C46 60 50 62 56 55M66 50C68 60 64 62 58 57" fill="none" stroke="#f2d48a" stroke-width="1.600" stroke-linecap="round"/>
      <rect class="csheen" x="-96" width="288" height="110" fill="url(#ceCs)"/>
    </g>
    <path d="M22 8H90V96L84 92 78 98 72 92 66 98 60 92 54 98 48 92 42 98 36 92 30 98 22 94Z" fill="none" stroke="#2a1206" stroke-width="1.200" stroke-linejoin="round"/>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="0" y="0" width="34" height="5" rx="2" fill="#8a5a2c" stroke="#2a1a0c" stroke-width=".8"/>
  <g class="unroll" style="--d:1.600"><g class="csway" style="animation-delay:-2s">
  <defs><clipPath id="ceQc"><path d="M2 4H32V58L27 55 22 60 17 55 12 60 7 55 2 58Z"/></clipPath></defs>
  <g clip-path="url(#ceQc)"><rect width="34" height="70" fill="var(--civ3)"/><path d="M2 8H32M2 52H32" stroke="var(--civ)" stroke-width="1.600"/>
  <path d="${spiral(17, 30, 9, 2.250)}" fill="none" stroke="var(--civ)" stroke-width="2" stroke-linecap="round"/></g>
  <path d="M2 4H32V58L27 55 22 60 17 55 12 60 7 55 2 58Z" fill="none" stroke="#2a1206" stroke-width="1"/></g></g></svg>`;

const SHIELD = 'M0 -36C10 -36 13 -25 12 -13 11 -5 9 4 11 13 13 25 10 36 0 36-10 36-13 25-11 13-9 4-11-5-12-13-13-25-10-36 0-36Z';
const shield = (x, y, d, dx) => `<g transform="translate(${x} ${y})"><g class="pc" style="--dx:${dx}px;--r:${dx < 0 ? -30 : 30}deg;--d:${d};--o:0">
  <path d="${SHIELD}" fill="url(#ceFz)" stroke="#3a2208" stroke-width="1.400"/>
  <path d="${SHIELD}" fill="none" stroke="#f3d27a" stroke-width="1" transform="scale(.86)" opacity=".7"/>
  <path d="M0 -30V30" stroke="#6e4314" stroke-width="4" stroke-linecap="round"/><path d="M-.8 -30V30" stroke="#f3d27a" stroke-width="1.200" opacity=".7"/>
  <circle r="7.500" fill="url(#ceFz)" stroke="#3a2208" stroke-width="1.200"/><circle r="3.400" fill="var(--civ)" class="cenam"/>
  <path d="${spiral(0, -20, 5.500, 1.750)}" fill="none" stroke="var(--civ)" stroke-width="1.400"/><path d="${spiral(0, 20, 5.500, 1.750, Math.PI)}" fill="none" stroke="var(--civ)" stroke-width="1.400"/>
</g></g>`;
const disc = (x, d, i) => `<g class="pc" style="--sc:.1;--r:180deg;--d:${d};--o:0"><g class="cdisc" style="--i:${i}">
  <circle cx="${x}" cy="-55" r="7.500" fill="url(#ceFz)" stroke="#3a2208" stroke-width="1"/><path d="${spiral(x, -55, 5.500, 2, i)}" fill="none" stroke="#3a2208" stroke-width="1"/>
  <circle cx="${x}" cy="-55" r="1.600" fill="var(--civ)"/></g></g>`;

const frame = `
<defs><linearGradient id="ceFz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d27a"/><stop offset=".45" stop-color="#c58b34"/><stop offset="1" stop-color="#6e4314"/></linearGradient></defs>
${shield(-9, 172, 1.150, -90)}${shield(409, 172, 1.220, 90)}
${disc(60, 1.300, 0)}${disc(136, 1.360, 1)}${disc(212, 1.420, 2)}
`;

const costume = {
  front: `
  <defs><linearGradient id="ceHair" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7a5630"/><stop offset=".45" stop-color="#d8c9a4"/><stop offset="1" stop-color="#fbf8ee"/></linearGradient></defs>
  <g class="chair"><path d="M44 40L40 18 52 30 50 6 61 26 66 0 72 24 80 2 84 26 93 8 92 30 102 16 97 40C88 33 52 33 44 40Z" fill="url(#ceHair)" stroke="#3a2a14" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M50 30l-2-14M61 26l1-16M72 24l4-16M84 26l4-14" stroke="#fff" stroke-opacity=".6" stroke-width="1" fill="none"/></g>
  <g fill="none" stroke="#2a5fae" stroke-width="2.200" stroke-linecap="round" opacity=".9"><path d="M40 63l6 1.500M40.500 67l5.500 1.300M41.500 71l4 1"/><path d="M100 63l-6 1.500M99.500 67l-5.500 1.300M98.500 71l-4 1"/></g>
  <g class="ctorc"><path d="M62 91C50 91 42 89 39 84M78 91C90 91 98 89 101 84" fill="none" stroke="#5a3d10" stroke-width="5" stroke-linecap="round"/>
  <path d="M62 91C50 91 42 89 39 84M78 91C90 91 98 89 101 84" fill="none" stroke="#f2c14e" stroke-width="3.200" stroke-linecap="round"/>
  <path d="M62 91C50 91 42 89 39 84M78 91C90 91 98 89 101 84" fill="none" stroke="#8a611c" stroke-width="3.200" stroke-dasharray="1 2"/>
  <circle cx="63" cy="91" r="3.400" fill="#f2c14e" stroke="#5a3d10" stroke-width=".9"/><circle cx="77" cy="91" r="3.400" fill="#f2c14e" stroke="#5a3d10" stroke-width=".9"/>
  <circle cx="62" cy="90" r="1.100" fill="#fff6d6"/><circle cx="76" cy="90" r="1.100" fill="#fff6d6"/></g>`,
};

const css = `
#stage[data-civ=celts] .gob.dressed .tuft{opacity:0}
#stage[data-civ=celts] .csway{transform-box:fill-box;transform-origin:50% 0;animation:ceSway 5.400s ease-in-out infinite}
@keyframes ceSway{0%,100%{transform:rotate(-1.800deg) skewX(2deg)}50%{transform:rotate(2deg) skewX(-3deg)}}
#stage[data-civ=celts] .csheen{animation:ceSheen 4.400s linear infinite}
@keyframes ceSheen{from{transform:translateX(0)}to{transform:translateX(96px)}}
/* the boar blows: the jaw drops, the tongue flicks, the eye glows */
#stage[data-civ=celts] .cjaw{transform-box:fill-box;transform-origin:0 0;animation:ceJaw 3.800s ease-in-out infinite}
@keyframes ceJaw{0%,55%,100%{transform:rotate(0)}65%{transform:rotate(9deg)}80%{transform:rotate(6deg)}}
#stage[data-civ=celts] .cboar{transform-box:fill-box;transform-origin:0 100%;animation:ceBoar 3.800s ease-in-out infinite}
@keyframes ceBoar{0%,55%,100%{transform:rotate(0)}65%{transform:rotate(-3deg)}}
#stage[data-civ=celts] .ceye{fill:var(--civ);filter:drop-shadow(0 0 3px var(--civ));animation:ceEye 3.800s ease-in-out infinite}
@keyframes ceEye{0%,50%,100%{opacity:.6}66%{opacity:1}}
#stage[data-civ=celts] .cdisc{animation:ceGlint 5s calc(var(--i)*.6s) ease-in-out infinite}
@keyframes ceGlint{0%,70%,100%{filter:none}80%{filter:brightness(1.6) drop-shadow(0 0 4px #ffe7a0)}}
#stage[data-civ=celts] .cenam{filter:drop-shadow(0 0 3px var(--civ))}
#stage[data-civ=celts] .chair{transform-box:fill-box;transform-origin:50% 100%;animation:ceHair 2.800s ease-in-out infinite}
@keyframes ceHair{0%,100%{transform:scaleY(1) skewX(0)}50%{transform:scaleY(1.05) skewX(-2deg)}}
#stage[data-civ=celts] .ctorc{animation:ceTorc 4.600s ease-in-out infinite}
@keyframes ceTorc{0%,75%,100%{filter:none}85%{filter:brightness(1.5) drop-shadow(0 0 3px #ffe7a0)}}
`;

export default {
  id: 'celts', name: 'Celts', kit: 'feudal',
  accent: '#4fb6ff', accent2: '#1f6fd0', cloth: '#9a4a1c', metal: '#d9a441',
  standard, pennant, costume, css, frame,
};
