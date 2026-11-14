// CIV layer: Saxons (kit: feudal). Bone-silver accent, slate-blue cloth, gold and garnet. A three-tongued banner
// with a wyvern on the lance, spears standing in the crenels, garnet-and-gold saucer brooches on the gate's corners and
// a seax on the left jamb; a spangenhelm with nasal and mail aventail, and a seax worn across the belt, for the mascot.
// All drawings are our own.

// the wyvern faces left (towards the lance): head, neck, body, one raised wing, two legs, a barbed tail
const WYVERN = `
  <path d="M46 36C56 38 63 46 59 53 55 57 48 53 52 48" fill="none" stroke="currentColor" stroke-width="3.400" stroke-linecap="round"/>
  <path d="M52 48l-6 1 4-6z" fill="currentColor"/>
  <path d="M36 28C38 16 42 8 51 1c0 6 3 9 8 9-4 4-2 8 2 10-6 2-10 4-14 10z" fill="currentColor"/>
  <path d="M24 31c5-7 18-8 24-1 4 6 0 12-8 13-8 1-16-3-16-12z" fill="currentColor"/>
  <path d="M28 31c-6-6-8-14-12-19H7L3 14l7 2-4 4 9-2c2 5 4 10 7 15z" fill="currentColor"/>
  <path d="M30 40l-2 10-4 3h7l2-12zM41 41l2 9-4 3h7l-1-12z" fill="currentColor"/>
  <circle cx="13" cy="14" r="1.300" fill="var(--civ3)"/>
  <path d="M40 22c3-6 6-11 10-16M44 25c4-3 8-5 12-6" fill="none" stroke="var(--civ3)" stroke-width="1" opacity=".7"/>`;
const wyvern = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" style="color:var(--civ)" stroke="#1b2333" stroke-width=".5">${WYVERN}</g>`;

// two-strand braid used as the banner's border
const braid = (x0, x1, y) => { const st = (ph) => { let d = ''; for (let x = x0; x <= x1; x += 2) d += (x === x0 ? 'M' : 'L') + x + ' ' + (y + Math.sin((x - x0) / 7 * Math.PI + ph) * 2.200).toFixed(1); return d; };
  return `<path d="${st(0)}" fill="none" stroke="var(--civm)" stroke-width="1.100"/><path d="${st(Math.PI)}" fill="none" stroke="var(--civm)" stroke-width="1.100"/>`; };

const BAN = 'M8 14H100L126 24L100 37L126 50L100 63L126 76L100 86H8Z';
const standard = `<svg width="130" height="100" viewBox="0 0 130 100"><g class="sunf"><g class="swave">
  <defs><clipPath id="sxBc"><path d="${BAN}"/></clipPath>
  <linearGradient id="sxBs" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".25" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity=".28"/><stop offset=".75" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <g clip-path="url(#sxBc)">
    <rect width="130" height="100" fill="var(--civ3)"/>
    ${braid(10, 98, 19)}${braid(10, 98, 81)}
    ${wyvern(18, 19, 1.150)}
    <rect class="ssheen" x="-130" width="390" height="100" fill="url(#sxBs)"/>
  </g>
  <path d="${BAN}" fill="none" stroke="#0e1420" stroke-width="1.200" stroke-linejoin="round"/>
</g></g>
<path d="M2 16h8M2 50h8M2 84h8" stroke="#2a2e33" stroke-width="3.400" stroke-linecap="round"/><path d="M2 15.200h8M2 49.200h8M2 83.200h8" stroke="#c9d1d8" stroke-width=".8" stroke-linecap="round"/>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="0" y="0" width="34" height="5" rx="2" fill="#4a301b" stroke="#1b130b" stroke-width=".8"/>
  <g class="unroll" style="--d:1.600"><g class="ssway">
  <defs><clipPath id="sxQc"><path d="M2 4H32V54L27 64 22 54 17 64 12 54 7 64 2 54Z"/></clipPath></defs>
  <g clip-path="url(#sxQc)"><rect width="34" height="70" fill="var(--civ3)"/>${braid(2, 32, 8)}${wyvern(2, 18, .5)}</g>
  <path d="M2 4H32V54L27 64 22 54 17 64 12 54 7 64 2 54Z" fill="none" stroke="#0e1420" stroke-width="1"/></g></g></svg>`;

// saucer brooch: gold rim, garnet cells, shell boss
const brooch = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:2.600;--r:120deg;--d:${d};--o:0"><g class="sbr">
  <circle r="11" fill="#e3b55a" stroke="#3a2a0c" stroke-width="1.200"/>
  ${Array.from({ length: 8 }, (_, i) => `<path transform="rotate(${i * 45})" d="M0-9.200A9.200 9.200 0 0 1 6.500-6.500L3.200-3.200A4.500 4.500 0 0 0 0-4.500Z" fill="${i % 2 ? '#a3112b' : '#c8203d'}" stroke="#e3b55a" stroke-width=".8"/>`).join('')}
  <circle r="3.600" fill="#efe6d2" stroke="#e3b55a" stroke-width="1"/><circle r="1.300" fill="#a3112b"/>
  <path d="M-7-6a9 9 0 0 1 6-3" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.200" stroke-linecap="round"/></g></g></g>`;
const spear = (x, d, h) => `<g class="pc" style="--dy:60px;--d:${d};--o:0"><g class="sspear">
  <path d="M${x} -46V${-86 - h}" stroke="#2a1a0c" stroke-width="3.200" stroke-linecap="round"/><path d="M${x - .6} -46V${-86 - h}" stroke="#8a5a2c" stroke-width="1.400"/>
  <path d="M${x} ${-110 - h}c4 6 5 14 0 22-5-8-4-16 0-22z" fill="url(#sxSt)" stroke="#1b1f24" stroke-width=".9"/><path d="M${x} ${-107 - h}v17" stroke="#fff" stroke-opacity=".5" stroke-width=".8"/>
  <path d="M${x - 2.200} ${-88 - h}h4.400v5h-4.400z" fill="#e3b55a" stroke="#3a2a0c" stroke-width=".6"/></g></g>`;

const frame = `
<defs><linearGradient id="sxSt" x1="0" x2="1"><stop offset="0" stop-color="#5a636c"/><stop offset=".45" stop-color="#e8eef3"/><stop offset="1" stop-color="#4a5259"/></linearGradient></defs>
${spear(41, 1.000, 0)}${spear(117, 1.080, 8)}${spear(193, 1.160, 2)}${spear(269, 1.240, 10)}
<g transform="translate(-10 138)"><g class="pc" style="--dx:-80px;--r:-60deg;--d:1.300;--o:0">
  <path d="M-3.500 0h7v16h-7z" fill="#3a2412" stroke="#140c05" stroke-width=".8"/><path d="M-3.500 4h7M-3.500 8h7M-3.500 12h7" stroke="#e3b55a" stroke-width=".8"/>
  <path d="M-6 -2h12v3H-6zM-5 16h10v3H-5z" fill="#e3b55a" stroke="#3a2a0c" stroke-width=".7"/>
  <path d="M-4 19h8v38l-4 16-4-6z" fill="url(#sxSt)" stroke="#1b1f24" stroke-width="1"/><path d="M-1.500 21v44" stroke="#2a2e33" stroke-width=".8"/>
</g></g>
${brooch(-10, -4, 1.200)}${brooch(410, -4, 1.260)}${brooch(410, 226, 1.320)}
`;

const costume = {
  front: `
  <defs><linearGradient id="sxHm" x1="0" x2="1"><stop offset="0" stop-color="#3f464d"/><stop offset=".35" stop-color="#d6dde3"/><stop offset=".6" stop-color="#8c969f"/><stop offset="1" stop-color="#353b41"/></linearGradient>
  <pattern id="sxMail" width="4" height="3.400" patternUnits="userSpaceOnUse"><rect width="4" height="3.400" fill="#4c535a"/><circle cx="2" cy="1.700" r="1.300" fill="none" stroke="#b9c2ca" stroke-width=".7"/><circle cx="0" cy="0" r="1.300" fill="none" stroke="#8a939b" stroke-width=".6"/><circle cx="4" cy="0" r="1.300" fill="none" stroke="#8a939b" stroke-width=".6"/></pattern></defs>
  <g class="smail"><path d="M33 44h13v24c0 6-1 10-3 14l-3-2-3 3-2-3-3 2c-1-12 0-26 1-38z" fill="url(#sxMail)" stroke="#23282d" stroke-width="1"/>
  <path d="M107 44H94v24c0 6 1 10 3 14l3-2 3 3 2-3 3 2c1-12 0-26-1-38z" fill="url(#sxMail)" stroke="#23282d" stroke-width="1"/></g>
  <path d="M43 47C44 30 55 14 70 6c15 8 26 24 27 41z" fill="url(#sxHm)" stroke="#16191c" stroke-width="1.300" stroke-linejoin="round"/>
  <path d="M56 45C57 30 62 18 70 7M84 45C83 30 78 18 70 7" fill="none" stroke="#3a2a0c" stroke-width="4.200" stroke-linecap="round"/>
  <path d="M56 45C57 30 62 18 70 7M84 45C83 30 78 18 70 7" fill="none" stroke="#e3b55a" stroke-width="2.600" stroke-linecap="round"/>
  <g fill="#fff3c4"><circle cx="57" cy="36" r=".9"/><circle cx="60" cy="24" r=".9"/><circle cx="83" cy="36" r=".9"/><circle cx="80" cy="24" r=".9"/></g>
  <path d="M50 30c3-8 9-15 16-19" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.400" stroke-linecap="round"/>
  <circle cx="70" cy="6" r="3" fill="#e3b55a" stroke="#3a2a0c" stroke-width=".9"/>
  <path d="M41 42h58v6H41z" fill="#e3b55a" stroke="#3a2a0c" stroke-width="1"/><path d="M43 45h54" stroke="#8a611c" stroke-width="1" stroke-dasharray="2.500 2"/>
  <path d="M67 47h6l-.6 11-2.400 3.400-2.400-3.400z" fill="url(#sxHm)" stroke="#16191c" stroke-width="1" stroke-linejoin="round"/>
  <g class="sseax"><path d="M54 86h32l7 2.200-7 3H54z" fill="#4a2f17" stroke="#1b130b" stroke-width="1" stroke-linejoin="round"/>
  <path d="M56 87.200h30" stroke="#e3b55a" stroke-width=".8" stroke-dasharray="1 2.500"/><path d="M60 86v5.200M80 86v5.200" stroke="#e3b55a" stroke-width="1.600"/>
  <path d="M43 86.800h10v3.600H43z" fill="#3a2412" stroke="#140c05" stroke-width=".8"/><path d="M52 85.400h2.600v6.400H52zM40.500 86.200h3v4.800h-3z" fill="#e3b55a" stroke="#3a2a0c" stroke-width=".6"/></g>`,
};

const css = `
#stage[data-civ=saxons] .gob.dressed .tuft{opacity:0}
#stage[data-civ=saxons] .sunf{transform-box:fill-box;transform-origin:0 50%}
#stage[data-civ=saxons] [data-mod=dress][data-phase=in] .sunf{animation:sxUnf 1.100s 1.350s cubic-bezier(.3,1.400,.4,1) both}
#stage[data-civ=saxons] [data-mod=dress][data-phase=out] .sunf{animation:sxFurl .4s cubic-bezier(.6,0,.9,.4) both}
@keyframes sxUnf{from{transform:scaleX(0) skewY(-25deg)}to{transform:none}}
@keyframes sxFurl{to{transform:scaleX(0)}}
#stage[data-civ=saxons] .swave{transform-box:fill-box;transform-origin:0 50%;animation:sxWave 3.100s ease-in-out infinite}
@keyframes sxWave{0%,100%{transform:skewY(2.500deg) scaleX(.95)}50%{transform:skewY(-3.500deg) scaleX(1.02)}}
#stage[data-civ=saxons] .ssheen{animation:sxSheen 2.300s linear infinite}
@keyframes sxSheen{from{transform:translateX(0)}to{transform:translateX(130px)}}
#stage[data-civ=saxons] .ssway{transform-box:fill-box;transform-origin:50% 0;animation:sxSway 4.600s ease-in-out infinite}
@keyframes sxSway{0%,100%{transform:rotate(-2deg) skewX(2deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
#stage[data-civ=saxons] .sbr{animation:sxGlint 4.800s ease-in-out infinite}
@keyframes sxGlint{0%,72%,100%{filter:none}82%{filter:brightness(1.5) drop-shadow(0 0 5px #ff5a6e)}}
#stage[data-civ=saxons] .sspear{transform-box:fill-box;transform-origin:50% 100%;animation:sxSpear 5.500s ease-in-out infinite}
#stage[data-civ=saxons] .pc:nth-of-type(2n) .sspear{animation-delay:-2.700s}
@keyframes sxSpear{0%,100%{transform:rotate(-1.200deg)}50%{transform:rotate(1.200deg)}}
#stage[data-civ=saxons] .smail{transform-box:fill-box;transform-origin:50% 0;animation:sxMail 3.200s ease-in-out infinite}
@keyframes sxMail{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.035)}}
`;

export default {
  id: 'saxons', name: 'Saxons', kit: 'feudal',
  accent: '#dfe6ee', accent2: '#8fa0b3', cloth: '#2d3e5c', metal: '#e3b55a',
  standard, pennant, costume, css, frame,
};
