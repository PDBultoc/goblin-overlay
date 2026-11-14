// KIT: Middle East (Saracens, Persians, Turks, Berbers). Glazed tilework with geometric girih star patterns,
// carved stucco, brass, desert dust. The camera frame reads as a secular palace iwan portal: tall tiled posts
// and lintel, a shallow honeycomb muqarnas hood under the lintel, a rectangular palace parapet (knotwork tile band,
// leaf merlons, brass ball finials) at the top centre, and a brass-finial pole on the right for the civ's standard,
// with a pierced brass lantern swaying from a bracket arm outside the frame. Nothing reaches more than 20 px into
// the camera picture.
// All drawings are our own. No script of any kind, no crescents, no religious buildings.
// The tile pattern is the octagon-and-diamond (truncated square) layout with 8-point stars: no cross-shaped gaps.

const P = (n) => +n.toFixed(2);
// 8-point star (two squares), first tip pointing up
export const star8 = (cx, cy, R, r = R * .7654) => {
  let d = '';
  for (let k = 0; k < 16; k++) { const a = (k * 22.5 - 90) * Math.PI / 180, q = k % 2 ? r : R; d += (k ? 'L' : 'M') + P(cx + Math.cos(a) * q) + ' ' + P(cy + Math.sin(a) * q); }
  return d + 'Z';
};
// regular octagon with apothem a, flat sides facing up/down/left/right
export const oct = (cx, cy, a) => {
  const R = a / Math.cos(Math.PI / 8); let d = '';
  for (let k = 0; k < 8; k++) { const t = (22.5 + 45 * k) * Math.PI / 180; d += (k ? 'L' : 'M') + P(cx + Math.cos(t) * R) + ' ' + P(cy + Math.sin(t) * R); }
  return d + 'Z';
};
export const dia = (cx, cy, h, w = h) => `M${P(cx)} ${P(cy - h)}L${P(cx + w)} ${P(cy)}L${P(cx)} ${P(cy + h)}L${P(cx - w)} ${P(cy)}Z`;

// girih tile as an SVG pattern (s = tile size; x,y = where a tile starts)
const girih = (id, x, y, s) => { const c = s * .2929; return `<pattern id="${id}" patternUnits="userSpaceOnUse" x="${x}" y="${y}" width="${s}" height="${s}">
  <rect width="${s}" height="${s}" fill="#123f86"/>
  <path d="${oct(s / 2, s / 2, s / 2)}" fill="#0b2a5e" stroke="#f3ead6" stroke-width=".7"/>
  ${[[0, 0], [s, 0], [0, s], [s, s]].map(([a, b]) => `<path d="${dia(a, b, c)}" fill="#2aa6b8" stroke="#f3ead6" stroke-width=".7"/>`).join('')}
  <path d="${star8(s / 2, s / 2, s * .37)}" fill="var(--civ)" stroke="#fff6e0" stroke-width=".55"/>
  <circle cx="${s / 2}" cy="${s / 2}" r="${P(s * .08)}" fill="#0b2a5e"/></pattern>`; };

// one tier of muqarnas cells (pointed niches seen from below), on a 16 px grid
const tier = (y, h, ranges, off, w = 16) => {
  let s = '';
  for (let x = off - w; x <= 400; x += w) {
    if (!ranges.some(([a, b]) => x >= a - 1 && x + w <= b + 1)) continue;
    const k = Math.round((x - off) / w);
    s += `<path d="M${x} ${y}h${w}v${P(h * .42)}c0 ${P(h * .34)} ${P(-w * .3)} ${P(h * .5)} ${P(-w / 2)} ${P(h * .58)}c${P(-w * .2)} ${P(-h * .08)} ${P(-w / 2)} ${P(-h * .24)} ${P(-w / 2)} ${P(-h * .58)}z" class="mqc"/>` +
      `<path d="M${P(x + w * .2)} ${P(y + h * .12)}h${P(w * .6)}v${P(h * .3)}c0 ${P(h * .2)} ${P(-w * .16)} ${P(h * .3)} ${P(-w * .3)} ${P(h * .36)}c${P(-w * .14)} ${P(-h * .06)} ${P(-w * .3)} ${P(-h * .16)} ${P(-w * .3)} ${P(-h * .36)}z" class="mqn${k % 2 ? ' t' : ''}"/>`;
  }
  return s;
};

const boss = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:3;--r:90deg;--d:${d};--o:0">
  <path d="${star8(0, 0, 12)}" fill="url(#meBr)" stroke="#4a320c" stroke-width="1"/><path d="${oct(0, 0, 6.5)}" fill="#0b2a5e" stroke="#4a320c" stroke-width=".8"/>
  <path d="${star8(0, 0, 5.4)}" fill="var(--civ)" class="mestar"/><circle cx="-1.4" cy="-1.6" r="1.3" fill="#fff" opacity=".85"/></g></g>`;

// carved stucco vine for the sill (sine stem with curls)
const vine = (x0, x1, y) => {
  let d = ''; for (let x = x0; x <= x1; x += 2) d += (x === x0 ? 'M' : 'L') + x + ' ' + P(y + Math.sin((x - x0) / 32 * Math.PI * 2) * 4);
  for (let x = x0 + 8; x < x1 - 8; x += 16) { const up = Math.round((x - x0 - 8) / 16) % 2 === 0, yy = y + (up ? -4 : 4), s = up ? -1 : 1;
    d += `M${x} ${yy}c3 ${s * -1} 7 ${s * 1} 6 ${s * 4}c-1 ${s * 2.5}-4.5 ${s * 2.5}-4.5 0`; }
  return `<path d="${d}" class="mecd"/><path d="${d}" class="mecl" transform="translate(.8 .8)"/>`;
};

// glazed knotwork: two interlaced strands (dark outline, accent core) with brass pins where they meet
const knot = (x0, x1, y, amp, period) => {
  const strand = (ph) => { let d = ''; for (let x = x0; x <= x1; x += 2) d += (x === x0 ? 'M' : 'L') + x + ' ' + P(y + Math.sin((x - x0) / period * Math.PI * 2 + ph) * amp); return d; };
  let pins = ''; for (let x = x0 + period / 2; x < x1; x += period / 2) pins += `<circle cx="${P(x)}" cy="${y}" r="1.300" fill="#e0b24a"/>`;
  return `<path d="${strand(0)}" fill="none" stroke="#06142e" stroke-width="4.200"/><path d="${strand(Math.PI)}" fill="none" stroke="#06142e" stroke-width="4.200"/>
    <path d="${strand(0)}" fill="none" stroke="var(--civ)" stroke-width="2" class="mestar"/><path d="${strand(Math.PI)}" fill="none" stroke="#f3ead6" stroke-width="2"/>${pins}`;
};

const frame = `
<defs>
  <linearGradient id="meSt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2e2bd"/><stop offset=".45" stop-color="#cfb27c"/><stop offset="1" stop-color="#8a6c42"/></linearGradient>
  <linearGradient id="meStV" x1="0" x2="1"><stop offset="0" stop-color="#ecd9b0"/><stop offset=".55" stop-color="#c3a571"/><stop offset="1" stop-color="#7f6239"/></linearGradient>
  <linearGradient id="meBr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".45" stop-color="#e0b24a"/><stop offset="1" stop-color="#7d5414"/></linearGradient>
  <linearGradient id="meWood" x1="0" x2="1"><stop offset="0" stop-color="#7a4a26"/><stop offset=".4" stop-color="#4b2a12"/><stop offset="1" stop-color="#22120a"/></linearGradient>
  <linearGradient id="meCurveV" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".14"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
  <linearGradient id="meCurveH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".14"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
  <linearGradient id="meMq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e8c6"/><stop offset="1" stop-color="#b6955f"/></linearGradient>
  <linearGradient id="meSheen" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <radialGradient id="meLampGlow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".75"/><stop offset=".4" stop-color="#ffb347" stop-opacity=".28"/><stop offset="1" stop-color="#ff9a2a" stop-opacity="0"/></radialGradient>
  <radialGradient id="meBall" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff6cf"/><stop offset=".4" stop-color="#e6b94e"/><stop offset="1" stop-color="#6f4910"/></radialGradient>
  <filter id="meSp" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .32  0 0 0 0 .24  0 0 0 0 .12  0 0 0 -2.200 1.050"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  ${girih('meGt', 0, -21, 18)}${girih('meGl', -20, 0, 20)}${girih('meGr', 400, 0, 20)}
  <clipPath id="meClip"><rect x="-22" y="-21" width="444" height="18"/><rect x="-20" y="-4" width="20" height="230"/><rect x="400" y="-4" width="20" height="230"/></clipPath>
</defs>
<rect class="fin meinlay" style="--d:1.500" x="3.500" y="3.500" width="393" height="218" rx="1"/>

<!-- muqarnas hood: deepest tier first so the upper tiers overlap the points -->
<!-- (kept shallow: nothing reaches more than 20 px into the camera picture) -->
<g class="pc" style="--dy:-34px;--sc:.7;--d:.62;--o:0">${tier(15, 7, [[-8, 32], [368, 408]], 8)}</g>
<g class="pc" style="--dy:-34px;--sc:.7;--d:.56;--o:0">${tier(11, 8, [[0, 64], [336, 400]], 0)}</g>
<g class="pc" style="--dy:-34px;--sc:.8;--d:.5;--o:0">${tier(6, 9, [[-8, 128], [272, 408]], 8)}</g>
<g class="pc" style="--dy:-34px;--d:.44;--o:.02">${tier(2, 10, [[0, 400]], 0)}</g>

<!-- pierced brass lantern on a bracket arm of the pole, outside the camera picture -->
<g transform="translate(478 84) scale(1.200)"><g class="pc" style="--dy:-80px;--d:1.050;--o:0"><g class="melamp">
  <circle class="meglow" cx="0" cy="42" r="32" fill="url(#meLampGlow)"/>
  <path d="M0 0v19" stroke="#8a5f18" stroke-width="1.600" stroke-dasharray="2.600 1.400"/>
  <path d="M0 19c-6 2-10.500 7-11.500 13h23c-1-6-5.500-11-11.500-13z" fill="url(#meBr)" stroke="#4a320c" stroke-width=".8"/>
  <circle cy="18.500" r="2.200" fill="url(#meBall)"/>
  <path d="M-12.500 32h25l-3.500 23h-18z" fill="#2c1a06" stroke="#4a320c" stroke-width=".8"/>
  <g class="melit"><path d="${star8(-5.200, 39.500, 3.200)}"/><path d="${star8(5.200, 39.500, 3.200)}"/><path d="${star8(0, 48, 3)}"/>
    <circle cx="-7.500" cy="49" r="1.100"/><circle cx="7.500" cy="49" r="1.100"/><circle cx="0" cy="35" r="1"/></g>
  <path d="M-12.500 32h25M-11 44h22M-9 55h18M-6.500 32l-1.800 23M6.500 32l1.800 23" fill="none" stroke="url(#meBr)" stroke-width="1.300"/>
  <path d="M-9 55h18l-9 11z" fill="url(#meBr)" stroke="#4a320c" stroke-width=".8"/>
  <circle cy="68" r="2.300" fill="url(#meBall)"/><path d="M-2.200 70h4.400l2.300 11h-9z" fill="var(--civ3)" stroke="#0006" stroke-width=".5"/>
  <path d="M-8 34c1 6 1 14 0 20" stroke="#fff6cf" stroke-width=".9" opacity=".5" fill="none"/>
</g></g></g>

<!-- palace parapet on the lintel: rectangular stucco panel with a glazed knotwork band, leaf merlons, brass ball finials -->
<g class="pc" style="--dy:-80px;--sc:.5;--d:.58;--o:.05">
  ${[0, 1, 2, 3, 4].map((i) => `<path transform="translate(${147 + i * 21.200} -63)" d="M0 15V10h3V7h3V4c0-2.500 2.500-4 5-4s5 1.500 5 4v3h3v3h3v5z" fill="url(#meSt)" stroke="#4e3a1e" stroke-width="1" stroke-linejoin="round"/>
    <path transform="translate(${147 + i * 21.200} -63)" d="${dia(11, 8.500, 2.600, 2)}" fill="#123f86" stroke="#e0b24a" stroke-width=".6"/>`).join('')}
  <rect x="144" y="-49" width="112" height="29" fill="url(#meSt)" filter="url(#meSp)" stroke="#4e3a1e" stroke-width="1.200"/>
  <path d="M145 -48h110" stroke="#fff4d8" stroke-width="1" opacity=".7"/>
  <rect x="150" y="-44" width="100" height="19" fill="#123f86" stroke="#c9973a" stroke-width="1.400"/>
  ${knot(152, 248, -34.500, 5.500, 16)}
  <rect x="150" y="-44" width="100" height="19" fill="url(#meCurveH)" opacity=".8"/>
  <circle cx="143" cy="-53" r="4.600" fill="url(#meBall)" stroke="#4a320c" stroke-width=".6"/><circle cx="257" cy="-53" r="4.600" fill="url(#meBall)" stroke="#4a320c" stroke-width=".6"/>
</g>

<!-- posts -->
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  <rect x="-24" y="-26" width="28" height="268" fill="url(#meStV)" filter="url(#meSp)"/><path d="M-23 -24v264" stroke="#fff4d8" opacity=".6"/><path d="M3.500 -24v264" stroke="#000" opacity=".55"/>
  <rect x="-20" y="-4" width="20" height="230" fill="url(#meGl)"/><rect x="-20" y="-4" width="20" height="230" fill="url(#meCurveV)"/>
  <rect x="-20.500" y="-4.500" width="21" height="231" fill="none" stroke="#5a4426" stroke-width="1.200"/>
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  <rect x="396" y="-26" width="28" height="268" fill="url(#meStV)" filter="url(#meSp)"/><path d="M397 -24v264" stroke="#fff4d8" opacity=".6"/><path d="M396.500 -24v264" stroke="#000" opacity=".45"/>
  <rect x="400" y="-4" width="20" height="230" fill="url(#meGr)"/><rect x="400" y="-4" width="20" height="230" fill="url(#meCurveV)"/>
  <rect x="399.500" y="-4.500" width="21" height="231" fill="none" stroke="#5a4426" stroke-width="1.200"/>
</g>
<!-- sill: carved stucco vine under a thin glazed line -->
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <rect x="-26" y="222" width="452" height="20" fill="url(#meSt)" filter="url(#meSp)"/><path d="M-25 223h450" stroke="#fff4d8" opacity=".65"/>
  <rect x="-26" y="222" width="452" height="3.500" fill="#123f86"/><path d="M-20 223.750h444" stroke="var(--civ)" stroke-width="1.600" stroke-dasharray="1.600 10.400" class="mestar"/>
  ${vine(-16, 416, 233)}
</g>
<!-- lintel: glazed girih band between stucco mouldings -->
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-26" y="-26" width="452" height="28" fill="url(#meSt)" filter="url(#meSp)"/><path d="M-25 -25h450" stroke="#fff4d8" opacity=".7"/><path d="M-25 1.500h450" stroke="#000" opacity=".6"/>
  <rect x="-22" y="-21" width="444" height="18" fill="url(#meGt)"/><rect x="-22" y="-21" width="444" height="18" fill="url(#meCurveH)"/>
  <path d="M-22 -21.500h444M-22 -2.500h444" stroke="#5a4426" stroke-width="1.200"/>
</g>
<g class="fin" style="--d:1.900" clip-path="url(#meClip)"><rect class="mesheen" x="-200" y="-30" width="90" height="270" fill="url(#meSheen)" transform="skewX(-18)"/></g>
${boss(-10, -12, .5)}${boss(410, -12, .56)}${boss(-10, 232, .62)}${boss(410, 232, .68)}

<!-- standard pole with a brass finial -->
<g class="pc" style="--dy:200px;--d:.75;--o:.05">
  <rect x="444" y="-112" width="8" height="354" rx="2" fill="url(#meWood)"/><path d="M445.500 -110v350" stroke="#b07a48" opacity=".45"/>
  ${[-92, -8, 104, 214].map((y) => `<rect x="442.500" y="${y}" width="11" height="6" rx="1.500" fill="url(#meBr)" stroke="#4a320c" stroke-width=".6"/>`).join('')}
  <path d="M452 82h28" stroke="#4a320c" stroke-width="4" stroke-linecap="round"/><path d="M452 82h28" stroke="#e0b24a" stroke-width="2.400" stroke-linecap="round"/>
  <path d="M452 98c12 0 20-6 22-15" fill="none" stroke="#c99a3c" stroke-width="1.800"/><path d="M462 82c0-4 4-6 6-3" fill="none" stroke="#c99a3c" stroke-width="1.400"/>
  <circle cx="481" cy="82" r="2.600" fill="url(#meBall)" stroke="#4a320c" stroke-width=".5"/>
  <rect x="422" y="46" width="24" height="6" rx="1" fill="url(#meBr)" stroke="#4a320c" stroke-width=".7"/><rect x="422" y="184" width="24" height="6" rx="1" fill="url(#meBr)" stroke="#4a320c" stroke-width=".7"/>
  <rect x="441" y="-119" width="14" height="8" rx="2.500" fill="url(#meBr)" stroke="#4a320c" stroke-width=".7"/>
  <circle cx="448" cy="-126" r="6.200" fill="url(#meBall)" stroke="#4a320c" stroke-width=".6"/>
  <rect x="446.500" y="-134" width="3" height="4" fill="#b8892c"/>
  <path d="M448 -162c5 9 7 18 0 28-7-10-5-19 0-28z" fill="url(#meBr)" stroke="#4a320c" stroke-width=".7"/><path d="M448 -158v22" stroke="#7d5414" stroke-width=".8"/>
</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
// static copies of the tile for CSS (data URLs cannot read CSS variables: the stars use a warm glaze)
const tileSvg = (s, star) => { const c = s * .2929; return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><rect width='${s}' height='${s}' fill='#123f86'/>
  <path d='${oct(s / 2, s / 2, s / 2)}' fill='#0b2a5e' stroke='#f3ead6' stroke-width='.7'/>${[[0, 0], [s, 0], [0, s], [s, s]].map(([a, b]) => `<path d='${dia(a, b, c)}' fill='#2aa6b8' stroke='#f3ead6' stroke-width='.7'/>`).join('')}
  <path d='${star8(s / 2, s / 2, s * .37)}' fill='${star}' stroke='#fff6e0' stroke-width='.55'/></svg>`; };
const TILE = svgUrl(tileSvg(24, '#e9c46a'));
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#2a1a08' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#d8bf8c' stroke-width='5.500'/>
  <path d='M1.800 70V1.800H70' fill='none' stroke='#fff4d8' stroke-opacity='.7' stroke-width='1'/>
  <rect x='9.500' y='9.500' width='53' height='53' fill='none' stroke='#123f86' stroke-width='3'/><rect x='9.500' y='9.500' width='53' height='53' fill='none' stroke='#e0b24a' stroke-width='.8'/>
  ${[[9, 9], [63, 9], [9, 63], [63, 63]].map(([x, y]) => `<path d='${star8(x, y, 8.500)}' fill='#e0b24a' stroke='#4a320c' stroke-width='1'/><path d='${star8(x, y, 4)}' fill='#2aa6b8'/>`).join('')}</svg>`);
// cresting of stepped leaf merlons on top of each panel
const CREST = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='28' height='15'><path d='M3 15V10h3V7h3V4c0-2.500 2.500-4 5-4s5 1.500 5 4v3h3v3h3v5z' fill='#e3cc9c' stroke='#5a4426' stroke-width='1'/>
  <path d='M4 14V10.500h3V7.500h3V4.300c0-2 2-3.300 4-3.300' fill='none' stroke='#fff4d8' stroke-width='.8' opacity='.8'/><path d='${dia(14, 8.500, 2.600, 2)}' fill='#123f86' stroke='#e0b24a' stroke-width='.6'/></svg>`);
// brass drops and wool tassels under each panel
const DROPS = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='26'>
  <path d='M16 0v6M48 0v4' stroke='#b8892c' stroke-width='1.200'/><circle cx='16' cy='8.500' r='2.600' fill='#e0b24a' stroke='#4a320c' stroke-width='.6'/>
  <path d='M16 11c3.500 3 3.500 8 0 12c-3.500-4-3.500-9 0-12z' fill='#d9a63c' stroke='#4a320c' stroke-width='.6'/><circle cx='16' cy='15.500' r='1.200' fill='#2aa6b8'/>
  <circle cx='48' cy='6.500' r='2.300' fill='#e0b24a' stroke='#4a320c' stroke-width='.6'/><path d='M46 9h4l2.500 14h-9z' fill='#b8323a' stroke='#0005' stroke-width='.5'/><path d='M46 11.500h4' stroke='#e0b24a' stroke-width='1.200'/></svg>`);
const CHIP = `<svg width="16" height="16" viewBox="-8 -8 16 16"><path d="${star8(0, 0, 7.500)}" fill="currentColor" stroke="#fff6e0" stroke-width=".9"/><path d="${oct(0, 0, 2.400)}" fill="#123f86"/></svg>`;

const css = `
#stage[data-kit=mideast] .dplate{color:#fbf1dc;text-shadow:0 1px 0 #000;border:2px solid #d4a644;outline:1px solid #2a1a08;border-radius:3px;
  background:linear-gradient(180deg,rgba(8,22,52,.7),rgba(4,12,30,.9)),${TILE} 0 0/18px 18px,#123f86;box-shadow:inset 0 1px 0 #fff4d855,inset 0 0 0 3px #0b2a5ecc,0 6px 10px #000a}
#stage[data-kit=mideast] .dplate span{font-family:Lalezar,serif;font-size:21px;letter-spacing:.01em;color:var(--civ);text-shadow:0 0 10px color-mix(in srgb,var(--civ) 55%,transparent),0 1px 0 #000,0 0 2px #000}
#stage[data-kit=mideast] .dplate .mark{margin-left:2px}

/* frame details */
#stage[data-kit=mideast] .dframe .meinlay{fill:none;stroke:var(--civ);stroke-width:1.600;opacity:.85;filter:drop-shadow(0 0 4px color-mix(in srgb,var(--civ) 70%,transparent))}
#stage[data-kit=mideast] .dframe .mqc{fill:url(#meMq);stroke:#5a4426;stroke-width:.7;stroke-linejoin:round}
#stage[data-kit=mideast] .dframe .mqn{fill:#6e5333;opacity:.75}
#stage[data-kit=mideast] .dframe .mqn.t{fill:#123f86;opacity:.95}
#stage[data-kit=mideast] .dframe .mecd{fill:none;stroke:#4e3a1e;stroke-width:1.700;stroke-linecap:round}
#stage[data-kit=mideast] .dframe .mecl{fill:none;stroke:#fff4d8;stroke-width:.7;opacity:.6;stroke-linecap:round}
#stage[data-kit=mideast] .dframe .mestar{animation:meGlow 5.200s ease-in-out infinite}
@keyframes meGlow{0%,100%{filter:none}50%{filter:drop-shadow(0 0 4px var(--civ))}}
#stage[data-kit=mideast] .dframe .mesheen{animation:meSheen 6.500s 2.400s ease-in-out infinite}
@keyframes meSheen{0%{transform:translateX(0)}55%,100%{transform:translateX(720px)}}
#stage[data-kit=mideast] .dframe .melamp{transform-box:fill-box;transform-origin:50% 0;animation:meSwing 4.800s ease-in-out infinite}
@keyframes meSwing{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
#stage[data-kit=mideast] .dframe .melit{fill:#ffe7a8;filter:drop-shadow(0 0 2.500px #ffb347);animation:meFlick 2.300s steps(1) infinite}
#stage[data-kit=mideast] .dframe .meglow{mix-blend-mode:screen;animation:meFlick 2.300s steps(1) infinite}
@keyframes meFlick{0%{opacity:1}17%{opacity:.78}29%{opacity:.95}46%{opacity:.7}61%{opacity:1}80%{opacity:.84}}
/* desert light on the camera picture: warm haze, lantern light spilling in from the right edge, dust low down */
#stage[data-kit=mideast] .dshade{box-shadow:inset 0 0 48px rgba(30,14,0,.6);
  background:radial-gradient(150px 130px at 100% 45%,rgba(255,190,90,.2),transparent 70%),linear-gradient(0deg,rgba(226,184,102,.22),transparent 34%)}
#stage[data-kit=mideast] .dshade::before{content:'';position:absolute;inset:0;animation:meFlick 2.300s steps(1) infinite;
  background:radial-gradient(70px 90px at 100% 45%,rgba(255,200,110,.2),transparent 70%)}

/* panels: deep glazed tile behind the text, stucco rim with a cobalt-and-brass line and brass stars, cresting on top, drops below */
#stage.skinned[data-kit=mideast] .pn.kd:not(.mu){
  background:linear-gradient(180deg,rgba(6,16,40,.86),rgba(4,10,26,.93)),${TILE} 0 0/24px 24px,#123f86;
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 34px rgba(0,0,0,.5)}
#stage.skinned[data-kit=mideast] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=mideast] .pn.kd>.kd-t{height:19px;margin:0 16px -6px;background:${CREST} 0 100%/36px 19px repeat-x;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent);mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent)}
#stage.skinned[data-kit=mideast] .pn.kd>.kd-b{height:26px;margin:4px 22px 0;background:${DROPS} 0 0 repeat-x;transform-origin:50% 0;animation:fin .8s .15s both,meDrop 3.300s ease-in-out infinite alternate}
@keyframes meDrop{from{transform:skewX(-3deg)}to{transform:skewX(3deg)}}
#stage.skinned[data-kit=mideast] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=mideast] .hd{border-bottom:1px solid rgba(224,178,74,.35);box-shadow:0 1px 0 rgba(0,0,0,.5)}

/* desert dust drifting, brass flecks twinkling */
#stage[data-kit=mideast] .p.sand{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fff3d0,#e2b866 50%,transparent 72%);
  animation:meDrift var(--dur) var(--del) linear infinite,meBob calc(2s + var(--k)*2.500s) ease-in-out infinite alternate}
@keyframes meDrift{0%{transform:translate3d(-170px,50px,0);opacity:0}15%{opacity:calc(.35 + var(--k)*.55)}85%{opacity:calc(.3 + var(--k)*.5)}100%{transform:translate3d(260px,calc(-60px + var(--j)*50px),0);opacity:0}}
@keyframes meBob{from{translate:0 -8px}to{translate:0 9px}}
#stage[data-kit=mideast] .p.glint{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fffbe6,#f0c75a 40%,transparent 70%);
  animation:meTwinkle var(--dur) var(--del) ease-in-out infinite}
@keyframes meTwinkle{0%,100%{transform:scale(.3);opacity:0}45%{transform:scale(1.300) translateY(-10px);opacity:1}70%{transform:scale(.6) translateY(-22px);opacity:.4}}
#stage[data-kit=mideast] .p.gust{width:calc(var(--s)*9);height:var(--s);border-radius:50%;background:linear-gradient(90deg,transparent,#f1d9a0);
  animation:meGust 1.400s var(--del) cubic-bezier(.3,0,.5,1) both}
@keyframes meGust{0%{transform:translate3d(-500px,40px,0) rotate(-6deg);opacity:0}25%{opacity:.9}100%{transform:translate3d(1500px,-120px,0) rotate(-6deg);opacity:0}}
#stage[data-kit=mideast] .p.chip{color:var(--civ);animation:meChip 1.600s var(--del) cubic-bezier(.15,.7,.3,1) both}
#stage[data-kit=mideast] .p.chip:nth-child(3n){color:#2aa6b8}#stage[data-kit=mideast] .p.chip:nth-child(3n+1){color:#e0b24a}
#stage[data-kit=mideast] .p.chip svg{display:block;width:calc(var(--s)*1.600);height:calc(var(--s)*1.600)}
@keyframes meChip{0%{transform:rotate(calc(var(--k)*360deg)) translateY(0) scale(.2);opacity:0}15%{opacity:1}100%{transform:rotate(calc(var(--k)*360deg + var(--j)*60deg)) translateY(calc(-240px - var(--k)*320px)) rotate(calc(var(--j)*540deg)) scale(1.100);opacity:0}}
`;

export default {
  id: 'mideast',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Lalezar&display=swap',
  frame, css,
  mount: { x: 436, y: -100 }, // the civ's standard: pole axis = x 12 of the standard, y 0 = just under the finial collar
  perch: 31, // hands on the tiled lintel, right of the crest
  particles: [{ cls: 'sand', n: 30, zone: 'sides', size: [2, 5], dur: [6, 11] }, { cls: 'glint', n: 8, zone: [0, 480, 560, 360], size: [4, 8], dur: [3, 6] }],
  burst: [{ cls: 'gust', n: 30, zone: [-200, 60, 1100, 700], size: [2, 5], dur: [1, 1], spread: 1.1 }, { cls: 'chip', n: 14, zone: [160, 650, 130, 80], size: [8, 12], dur: [1, 1], spread: .5, html: CHIP }],
};
