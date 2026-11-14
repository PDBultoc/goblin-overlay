// CIV layer: Varangians (kit: norse). Imperial-purple accent and silk. Standard: a purple silk banner with three
// rounded tongues, pearl-bordered gold roundels and a long-hafted Dane axe worked in gold thread. Frame: silk
// cushions on the top beam, strings of silver coins swagged along it, a lamellar cuirass hung on the mast.
// Mascot: a tall conical helm with gilded ribs, a gilded brow band over a fur cap edge, a silk collar.
// All drawings are our own; no eagles, no crosses, no flags.

const roundel = (x, y, r = 10) => {
  let pearls = '';
  for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; pearls += `<circle cx="${(x + Math.cos(a) * (r - 2.200)).toFixed(1)}" cy="${(y + Math.sin(a) * (r - 2.200)).toFixed(1)}" r=".9" fill="#fff7e0"/>`; }
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#vgG)" stroke="#5a3a0c" stroke-width=".7"/><circle cx="${x}" cy="${y}" r="${r - 4.200}" fill="var(--civ3)" stroke="#5a3a0c" stroke-width=".5"/>${pearls}
    <path d="M${x} ${y + 4}C${x - 4} ${y + 1} ${x - 3} ${y - 4} ${x} ${y - 4.500}C${x + 3} ${y - 4} ${x + 4} ${y + 1} ${x} ${y + 4}Z" fill="url(#vgG)"/><path d="M${x} ${y + 3}V${y - 3}" stroke="var(--civ3)" stroke-width=".6"/>`;
};

const TONGUES = 'M2 4H82V136C82 158 56 158 56 136C56 158 28 158 28 136C28 158 2 158 2 136Z';

const standard = `<svg width="84" height="176" viewBox="0 0 84 176"><defs>
  <clipPath id="vgClip"><path d="${TONGUES}"/></clipPath>
  <linearGradient id="vgG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".45" stop-color="#e6b445"/><stop offset="1" stop-color="#8a5d14"/></linearGradient>
  <linearGradient id="vgSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/><stop offset=".75" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
  <pattern id="vgDam" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M6 1L11 6 6 11 1 6Z" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="1"/><circle cx="6" cy="6" r="1.200" fill="#fff" fill-opacity=".07"/></pattern>
</defs>
<g class="unroll" style="--d:1.35"><g class="vgsway">
  <g fill="none" stroke="url(#vgG)" stroke-width="2.200"><circle cx="12" cy="2.500" r="3"/><circle cx="42" cy="2.500" r="3"/><circle cx="72" cy="2.500" r="3"/></g>
  <g clip-path="url(#vgClip)">
    <rect width="84" height="170" fill="var(--civ3)"/><rect width="84" height="170" fill="url(#vgDam)"/>
    <path d="M2 4h80v10H2z" fill="url(#vgG)"/><path d="M6 9l4-3 4 3-4 3zM18 9l4-3 4 3-4 3zM30 9l4-3 4 3-4 3zM46 9l4-3 4 3-4 3zM58 9l4-3 4 3-4 3zM70 9l4-3 4 3-4 3z" fill="var(--civ3)"/>
    <path d="M5 14V140M79 14V140" stroke="url(#vgG)" stroke-width="1.600"/>
    <rect x="40.500" y="24" width="3" height="122" rx="1.500" fill="#8a5d14"/><rect x="41" y="24" width="1.200" height="122" fill="#f6d77e"/>
    <path d="M40.500 40h3M40.500 62h3M40.500 84h3M40.500 106h3M40.500 128h3" stroke="var(--civ)" stroke-width="2.400"/>
    <path d="M44 25L52 27C59 23 64 24 69 20 72 33 71 47 66 58 62 51 56 49 52 49L44 47Z" fill="url(#vgG)" stroke="#5a3a0c" stroke-width=".9" stroke-linejoin="round"/>
    <path d="M68 22c2 12 1 24-3 34" fill="none" stroke="#fff7e0" stroke-width="1.300" stroke-linecap="round" opacity=".85"/>
    <path d="M47 30h4M47 42h4" stroke="#5a3a0c" stroke-width=".8"/><circle cx="42" cy="22" r="2.400" fill="url(#vgG)" stroke="#5a3a0c" stroke-width=".6"/>
    ${roundel(20, 40)}${roundel(20, 78)}${roundel(20, 116)}${roundel(64, 82)}${roundel(64, 120)}
    <rect class="vgsheen" x="-84" width="252" height="170" fill="url(#vgSh)"/>
  </g>
  <path d="${TONGUES}" fill="none" stroke="#1d0a33" stroke-width="1.200"/>
  <g class="vgtas">${[15, 42, 69].map((x, i) => `<g transform="translate(${x} 153)"><g class="vgt" style="animation-delay:${-i * .6}s">
    <circle r="2.400" fill="url(#vgG)" stroke="#5a3a0c" stroke-width=".5"/><path d="M-2.200 1.500L-3 13H3L2.200 1.500Z" fill="url(#vgG)" stroke="#5a3a0c" stroke-width=".5"/><path d="M-1.500 4v8M0 4v9M1.500 4v8" stroke="#8a5d14" stroke-width=".5"/></g></g>`).join('')}</g>
</g></g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.6"><g class="vgsway" style="animation-delay:-2s">
  <defs><clipPath id="vgPc"><path d="M2 4H32V48C32 62 17 70 17 70S2 62 2 48Z"/></clipPath>
    <linearGradient id="vgPg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".45" stop-color="#e6b445"/><stop offset="1" stop-color="#8a5d14"/></linearGradient></defs>
  <g clip-path="url(#vgPc)"><rect width="34" height="74" fill="var(--civ3)"/><path d="M2 4h30v5H2z" fill="url(#vgPg)"/>
    <circle cx="17" cy="30" r="9" fill="url(#vgPg)"/><circle cx="17" cy="30" r="5.500" fill="var(--civ3)"/>
    <path d="M17 34c-3-2-2.500-6 0-7 2.500 1 3 5 0 7z" fill="url(#vgPg)"/>
    <path d="M2 50h30M2 54h30" stroke="url(#vgPg)" stroke-width="1"/></g>
  <path d="M2 4H32V48C32 62 17 70 17 70S2 62 2 48Z" fill="none" stroke="#1d0a33" stroke-width="1"/>
</g></g></svg>`;

// ---------- frame pieces (camera-local coordinates) ----------
const tassel = (x, y, dl) => `<g transform="translate(${x} ${y})"><g class="vgt" style="animation-delay:${dl}s"><circle r="1.800" fill="url(#vgFG)"/><path d="M-1.600 1L-2.200 8H2.200L1.600 1Z" fill="url(#vgFG)" stroke="#5a3a0c" stroke-width=".4"/></g></g>`;
const cushion = (cx, w, h, fill, rot, d, dy, motif) => `<g transform="translate(${cx} -16) rotate(${rot})"><g class="pc" style="--dy:${dy}px;--r:${rot * -6}deg;--d:${d};--o:0">
  <path d="M${-w / 2} -1C${-w / 2 - 3} ${-h * .45} ${-w / 2 - 1} ${-h} ${-w / 2 + 3} ${-h - 1}C${-w / 6} ${-h - 4} ${w / 6} ${-h - 4} ${w / 2 - 3} ${-h - 1}C${w / 2 + 1} ${-h} ${w / 2 + 3} ${-h * .45} ${w / 2} -1C${w / 6} 1.500 ${-w / 6} 1.500 ${-w / 2} -1Z"
    fill="${fill}" stroke="#1d0a33" stroke-width="1"/>
  <path d="M${-w / 2 + 3} ${-h - 1}C${-w / 6} ${-h - 4} ${w / 6} ${-h - 4} ${w / 2 - 3} ${-h - 1}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.400"/>
  <path d="M${-w / 2} -1C${-w / 6} 1.500 ${w / 6} 1.500 ${w / 2} -1" fill="none" stroke="url(#vgFG)" stroke-width="1.200"/>
  ${motif}
  ${tassel(-w / 2, -2, -.3)}${tassel(w / 2, -2, -1.1)}${tassel(-w / 2 + 3, -h - 1, -.7)}${tassel(w / 2 - 3, -h - 1, -1.5)}
</g></g>`;

// a swag of silver coins between two studs on the beam front
const swag = (x0, x1, i) => {
  const y0 = -4, cy = 28, xm = (x0 + x1) / 2; let coins = '';
  for (let k = 1; k < 12; k++) { const t = k / 12, x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * xm + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y0;
    coins += `<circle class="vgcoin" style="animation-delay:${(k * .12 + i * .7).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.300" fill="url(#vgFS)" stroke="#3c4349" stroke-width=".5"/>`; }
  return `<path d="M${x0} ${y0}Q${xm} ${cy} ${x1} ${y0}" fill="none" stroke="#c9b27a" stroke-width=".7"/>${coins}
    <g transform="translate(${xm} 12)"><g class="vgpend" style="animation-delay:${-i * .8}s"><path d="M0 0v3" stroke="#c9b27a" stroke-width=".7"/>
      <circle cy="6.800" r="3.800" fill="url(#vgFS)" stroke="url(#vgFG)" stroke-width="1.100"/><circle cy="6.800" r="1.600" fill="none" stroke="#6b747c" stroke-width=".5"/></g></g>`;
};
const stud = (x) => `<circle cx="${x}" cy="-4" r="2.200" fill="url(#vgFG)" stroke="#5a3a0c" stroke-width=".6"/>`;

let lam = '';
for (let row = 0; row < 12; row++) { const y = 3 + row * 5.400, off = row % 2 ? 2.300 : 0;
  for (let x = -24 + off; x < 24; x += 4.600) lam += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="4" height="6.400" rx="1.300" fill="url(#vgFL)" stroke="#16191c" stroke-width=".45"/>`;
  lam += `<path d="M-24 ${(y + 1.200).toFixed(1)}H24" stroke="var(--civ3)" stroke-width=".7" stroke-dasharray="1 3.600"/>`; }
const TORSO = 'M-20 8C-22 4-18 0-12 0L-6 4H6L12 0C18 0 22 4 20 8L18 30C19 46 16 60 14 66H-14C-16 60-19 46-18 30Z';

const frame = `
<defs>
  <linearGradient id="vgFG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#e2b043"/><stop offset="1" stop-color="#8a5d14"/></linearGradient>
  <linearGradient id="vgFS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#c3cbd2"/><stop offset="1" stop-color="#5f686f"/></linearGradient>
  <linearGradient id="vgFL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d7dee4"/><stop offset=".5" stop-color="#78828a"/><stop offset="1" stop-color="#3a4248"/></linearGradient>
  <radialGradient id="vgFP" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#9a6ad8"/><stop offset=".6" stop-color="#5b2a8c"/><stop offset="1" stop-color="#2c1048"/></radialGradient>
  <radialGradient id="vgFR" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#d85a7a"/><stop offset=".6" stop-color="#8a1f45"/><stop offset="1" stop-color="#3e0a1f"/></radialGradient>
  <radialGradient id="vgFO" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#fff0a8"/><stop offset=".6" stop-color="#d8a33a"/><stop offset="1" stop-color="#7a4f12"/></radialGradient>
  <clipPath id="vgTorso"><path d="${TORSO}"/></clipPath>
</defs>
${cushion(52, 70, 22, 'url(#vgFP)', -2, 1.05, -150,
  `<circle cx="0" cy="-11" r="6" fill="none" stroke="url(#vgFG)" stroke-width="1.400"/><circle cx="0" cy="-11" r="2" fill="url(#vgFG)"/><path d="M-28 -11h18M10 -11h18" stroke="url(#vgFG)" stroke-width=".8" stroke-dasharray="2 2"/>`)}
${cushion(128, 60, 18, 'url(#vgFR)', 3, 1.17, -170,
  `<path d="M-20 -9l5-4 5 4-5 4zM-5 -9l5-4 5 4-5 4zM10 -9l5-4 5 4-5 4z" fill="none" stroke="url(#vgFG)" stroke-width="1"/>`)}
${cushion(196, 46, 15, 'url(#vgFO)', -4, 1.29, -190,
  `<path d="M-15 -7.500h30" stroke="#5b2a8c" stroke-width="2.200"/><path d="M-15 -7.500h30" stroke="#b48cff" stroke-width=".7" stroke-dasharray="1.500 1.500"/>`)}
<g class="pc" style="--dy:-60px;--sc:.4;--d:1.45;--o:0">
  ${swag(12, 92, 0)}${swag(92, 172, 1)}${swag(172, 252, 2)}${stud(12)}${stud(92)}${stud(172)}${stud(252)}
</g>
<g class="pc" style="--dx:120px;--r:25deg;--d:1.55;--o:0">
  <circle cx="431.500" cy="133" r="2.400" fill="url(#vgFG)" stroke="#5a3a0c" stroke-width=".6"/>
  <g transform="translate(431.500 138)"><g class="vgcui">
    <path d="M0 -5L-12 1M0 -5L12 1" stroke="#3a2412" stroke-width="1.600" stroke-linecap="round"/>
    <g clip-path="url(#vgTorso)"><rect x="-24" y="0" width="48" height="70" fill="#1e1a24"/>${lam}</g>
    <path d="${TORSO}" fill="none" stroke="var(--civ3)" stroke-width="2.600" stroke-linejoin="round"/>
    <path d="${TORSO}" fill="none" stroke="url(#vgFG)" stroke-width=".7" stroke-linejoin="round"/>
    <path d="M-6 4C-4 8 4 8 6 4" fill="none" stroke="url(#vgFG)" stroke-width="1.600"/>
    <path d="M-17 40H17" stroke="var(--civ3)" stroke-width="3.400"/><path d="M-17 40H17" stroke="url(#vgFG)" stroke-width=".8" stroke-dasharray="2 2"/>
    <g>${[-12, -6, 0, 6, 12].map((x) => `<path d="M${x - 2.300} 66h4.600v11l-2.300 2-2.300-2z" fill="var(--civ3)" stroke="#1d0a33" stroke-width=".5"/><path d="M${x - 2.300} 74h4.600" stroke="url(#vgFG)" stroke-width="1"/>`).join('')}</g>
  </g></g>
</g>
`;

const costume = {
  front: `
  <defs>
    <linearGradient id="vgHelm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f363c"/><stop offset=".33" stop-color="#cfd8df"/><stop offset=".58" stop-color="#6b757d"/><stop offset="1" stop-color="#22282c"/></linearGradient>
    <linearGradient id="vgGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#e2b043"/><stop offset="1" stop-color="#8a5d14"/></linearGradient>
  </defs>
  <path d="M35 51.500C33 47 36 42 41 42 44 39 49 40 51 42 55 39 60 40 63 42 67 39 73 39 77 42 80 40 85 39 89 42 91 40 96 39 99 42 104 42 107 47 105 51.500 100 52 96 50.500 92 51.500 87 50.500 82 52 77 51.500 72 52 67 50.500 62 51.500 57 50.500 52 52 47 51.500 42 52 38 50.500 35 51.500Z"
    fill="#5a3d24" stroke="#22160b" stroke-width="1"/>
  <path d="M38 47l3-3M44 48l2-4M52 47l3-3M60 48l2-4M78 48l2-4M86 47l3-3M94 48l2-4M100 47l3-3" stroke="#a88258" stroke-width="1" stroke-linecap="round"/>
  <path d="M45 44C49 28 62 13 70 4 78 13 91 28 95 44Z" fill="url(#vgHelm)" stroke="#14181b" stroke-width="1.300" stroke-linejoin="round"/>
  <path d="M70 5V43M70 6C64 15 58 28 57 43M70 6C76 15 82 28 83 43" fill="none" stroke="url(#vgGold)" stroke-width="2.400"/>
  <path d="M70 6C64 15 58 28 57 43M70 6C76 15 82 28 83 43M70 5V43" fill="none" stroke="#5a3a0c" stroke-width=".5" opacity=".6"/>
  <g fill="#fff0a8"><circle cx="70" cy="18" r=".9"/><circle cx="70" cy="30" r=".9"/><circle cx="62.500" cy="24" r=".9"/><circle cx="77.500" cy="24" r=".9"/><circle cx="58.500" cy="35" r=".9"/><circle cx="81.500" cy="35" r=".9"/></g>
  <path d="M50 34c3-9 8-16 13-21" fill="none" stroke="#f2f6f9" stroke-width="1.300" stroke-linecap="round" opacity=".7"/>
  <path d="M43 41C55 38 85 38 97 41L97 47.500C85 44.500 55 44.500 43 47.500Z" fill="url(#vgGold)" stroke="#5a3a0c" stroke-width="1"/>
  <g fill="#7a4f12"><circle cx="48" cy="43.500" r=".7"/><circle cx="53" cy="43" r=".7"/><circle cx="58" cy="42.800" r=".7"/><circle cx="82" cy="42.800" r=".7"/><circle cx="87" cy="43" r=".7"/><circle cx="92" cy="43.500" r=".7"/></g>
  <path d="M68 45H72V60L70 63 68 60Z" fill="url(#vgHelm)" stroke="#5a3a0c" stroke-width=".8"/>
  <ellipse cx="70" cy="42.600" rx="3.300" ry="2.600" fill="#7b4fd6" stroke="#5a3a0c" stroke-width=".8"/><ellipse cx="69" cy="41.800" rx="1.100" ry=".7" fill="#e9dcff"/>
  <g transform="translate(71 4.500)"><path class="vgfly" d="M0 0C6-3 12 1 19-2 15 3 9 4 3 4Z" fill="#7b4fd6" stroke="#2c1048" stroke-width=".6"/></g>
  <circle cx="70" cy="4" r="2.200" fill="url(#vgGold)" stroke="#5a3a0c" stroke-width=".6"/>
  <path d="M54 86C62 90 78 90 86 86L86.500 92C78 96 62 96 53.500 92Z" fill="#5b2a8c" stroke="#e2b043" stroke-width=".9"/>
  <circle cx="70" cy="91.500" r="4" fill="url(#vgGold)" stroke="#5a3a0c" stroke-width=".7"/><circle cx="70" cy="91.500" r="1.800" fill="#b48cff"/>`,
};

const css = `
#stage[data-civ=varangians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=varangians] .vgsway{transform-box:fill-box;transform-origin:50% 0;animation:vgSway 6s ease-in-out infinite}
@keyframes vgSway{0%,100%{transform:rotate(-1.400deg) skewX(1.200deg)}50%{transform:rotate(1.800deg) skewX(-2.200deg)}}
#stage[data-civ=varangians] .vgsheen{animation:vgSheen 5s linear infinite}
@keyframes vgSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=varangians] .vgt{transform-box:fill-box;transform-origin:50% 0;animation:vgT 2.200s ease-in-out infinite alternate}
@keyframes vgT{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
#stage[data-civ=varangians] .vgpend{transform-box:fill-box;transform-origin:50% 0;animation:vgT 1.900s ease-in-out infinite alternate}
#stage[data-civ=varangians] .vgcoin{animation:vgCoin 3.400s ease-in-out infinite}
@keyframes vgCoin{0%,80%,100%{filter:none}88%{filter:brightness(1.7) drop-shadow(0 0 2px #fff)}}
#stage[data-civ=varangians] .vgcui{transform-box:fill-box;transform-origin:50% 0;animation:vgCui 5.500s ease-in-out infinite}
@keyframes vgCui{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
#stage[data-civ=varangians] .vgfly{transform-box:fill-box;transform-origin:0 50%;animation:vgFly 1.600s ease-in-out infinite alternate}
@keyframes vgFly{from{transform:rotate(-8deg) scaleX(.9)}to{transform:rotate(10deg) scaleX(1.05)}}
`;

export default {
  id: 'varangians', name: 'Varangians', kit: 'norse',
  accent: '#b48cff', accent2: '#6a3fc4', cloth: '#4b1f7a', metal: '#e2b043',
  standard, pennant, costume, css, frame,
};
