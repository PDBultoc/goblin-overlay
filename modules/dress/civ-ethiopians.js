// CIV layer: Ethiopians (kit: africa). Golden accent, white shamma cotton, bright woven tibeb borders.
// Standard: a white shamma-cloth banner with tibeb bands and a fringe. Headgear: a lion-mane warrior headdress
// with a woven brow band. Frame pieces: Aksumite-style dressed stone with timber courses and square "monkey-head"
// beam ends on both posts, and a round hide shield hung on the pole. All drawings are our own.

const CRIM = '#c8203a', INDI = '#2b3f9e', MAG = '#a0247a', SHAMMA = '#f7f2e6';
const TIB = ['var(--civ)', CRIM, INDI, MAG];

// a woven tibeb border band of width w starting at y (diamonds, a stepped zigzag on crimson, small triangles)
function tibeb(x0, w, y, sc = 1) {
  const n = Math.floor(w / (8 * sc)); let s = '';
  s += `<rect x="${x0}" y="${y}" width="${w}" height="${2 * sc}" fill="${CRIM}"/>`;
  for (let i = 0; i < n; i++) { const cx = x0 + 4 * sc + i * 8 * sc, cy = y + 7 * sc;
    s += `<path d="M${cx} ${cy - 3.200 * sc}l${3.200 * sc} ${3.200 * sc}-${3.200 * sc} ${3.200 * sc}-${3.200 * sc}-${3.200 * sc}z" fill="${TIB[i % 4]}" stroke="#1a0c10" stroke-width="${.4 * sc}"/>`; }
  const zy = y + 12 * sc;
  s += `<rect x="${x0}" y="${zy}" width="${w}" height="${12 * sc}" fill="${CRIM}"/>`;
  let d = `M${x0} ${zy + 9 * sc}`; for (let x = x0; x < x0 + w; x += 12 * sc) d += `h${3 * sc}v${-3 * sc}h${3 * sc}v${-3 * sc}h${3 * sc}v${3 * sc}h${3 * sc}v${3 * sc}`;
  s += `<path d="${d}" fill="none" stroke="var(--civ)" stroke-width="${2 * sc}"/><path d="${d}" transform="translate(0 ${-3.500 * sc})" fill="none" stroke="${INDI}" stroke-width="${.9 * sc}"/>`;
  for (let x = x0 + 6 * sc; x < x0 + w; x += 12 * sc) s += `<circle cx="${x}" cy="${zy + 10 * sc}" r="${.9 * sc}" fill="#fff"/>`;
  const ty = zy + 13 * sc; let t = '';
  for (let x = x0; x + 6 * sc <= x0 + w; x += 6 * sc) t += `M${x} ${ty}h${6 * sc}l${-3 * sc} ${4 * sc}z`;
  s += `<path d="${t}" fill="${INDI}"/><rect x="${x0}" y="${ty + 5 * sc}" width="${w}" height="${1.500 * sc}" fill="var(--civ)"/>`;
  return s;
}
// narrow vertical tibeb strip along a side
const sideStrip = (x, y0, y1) => { let s = `<rect x="${x}" y="${y0}" width="7" height="${y1 - y0}" fill="${CRIM}"/>`;
  for (let y = y0 + 4, i = 0; y < y1 - 2; y += 7, i++) s += `<path d="M${x + 3.500} ${y - 2.800}l2.800 2.800-2.800 2.800-2.800-2.800z" fill="${TIB[(i + 1) % 4]}"/>`;
  return s + `<path d="M${x + .5} ${y0}V${y1}M${x + 6.500} ${y0}V${y1}" stroke="var(--civ)" stroke-width=".8"/>`; };
const fringe = (x0, x1, y, len, step) => { let d = ''; for (let x = x0, i = 0; x <= x1; x += step, i++) d += `M${x} ${y}c${i % 2 ? .8 : -.8} ${len * .4} ${i % 2 ? -.5 : .5} ${len * .7} ${i % 3 - 1} ${len + (i % 3) * 1.5}`; return d; };

const sheen = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".25" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#000" stop-opacity=".16"/><stop offset=".75" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>`;

const standard = `<svg width="88" height="176" viewBox="0 0 88 176">
  <defs><clipPath id="etC"><path d="M2 6H86V146H2Z"/></clipPath>
    <pattern id="etW" width="3" height="5" patternUnits="userSpaceOnUse"><path d="M1.500 0v5" stroke="#d6ccb4" stroke-width=".5"/><path d="M0 2.500h3" stroke="#e6dece" stroke-width=".4"/></pattern>${sheen('etS')}</defs>
  <g class="unroll" style="--d:1.350"><g class="etsway">
    <path d="M12 0v7M44 0v7M76 0v7" stroke="#c9a46a" stroke-width="2.200" stroke-linecap="round"/>
    <g clip-path="url(#etC)">
      <rect width="88" height="150" fill="${SHAMMA}"/><rect width="88" height="150" fill="url(#etW)" opacity=".8"/>
      <rect x="2" y="10" width="84" height="2" fill="var(--civ)"/><rect x="2" y="13" width="84" height="1.200" fill="${CRIM}"/>
      ${sideStrip(5, 18, 100)}${sideStrip(76, 18, 100)}
      ${tibeb(2, 84, 104)}
      <rect class="etsheen" x="-88" width="264" height="150" fill="url(#etS)"/>
    </g>
    <path d="M2 6H86V146H2Z" fill="none" stroke="#6b5a3a" stroke-width="1"/>
    <g class="etfr"><path d="${fringe(4, 84, 146, 13, 2.500)}" fill="none" stroke="#efe7d4" stroke-width="1" stroke-linecap="round"/></g>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="etPc"><path d="M2 4H32V54H2Z"/></clipPath>${sheen('etPs')}</defs>
  <g class="unroll" style="--d:1.600"><g class="etsway" style="animation-delay:-2s">
    <g clip-path="url(#etPc)"><rect width="34" height="58" fill="${SHAMMA}"/>
      <rect x="2" y="8" width="30" height="1.500" fill="var(--civ)"/>
      <g transform="translate(2 30) scale(.6)">${tibeb(0, 50, 0)}</g>
      <rect class="etsheen" x="-34" width="102" height="58" fill="url(#etPs)"/></g>
    <path d="M2 4H32V54H2Z" fill="none" stroke="#6b5a3a" stroke-width=".8"/>
    <g class="etfr"><path d="${fringe(3, 31, 54, 9, 2.500)}" fill="none" stroke="#efe7d4" stroke-width=".9" stroke-linecap="round"/></g>
  </g></g>
  <rect x="4" y="0" width="26" height="5" rx="2" fill="#7a5a34" stroke="#2a1a0c" stroke-width=".7"/>
</svg>`;

// Aksumite facing on a post: dressed stone courses, timber beams, square monkey-head beam ends
function aksum(x, side, d) {
  let s = `<rect x="${x}" y="26" width="30" height="180" rx="2" fill="url(#etSt)" stroke="#2c241c" stroke-width="1"/>`;
  for (let y = 26, r = 0; y < 206; y += 15, r++) { s += `<path d="M${x} ${y}h30" stroke="#3a3027" stroke-width=".9" opacity=".7"/>`;
    for (let k = (r % 2 ? 8 : 15); k < 30; k += 15) s += `<path d="M${x + k} ${y}v15" stroke="#3a3027" stroke-width=".8" opacity=".6"/>`; }
  s += `<path d="M${x + 1} 27v178" stroke="#d8cdbb" stroke-width=".9" opacity=".5"/>`;
  for (const y of [56, 116, 176]) {
    s += `<rect x="${x - 3}" y="${y}" width="36" height="7" rx="1" fill="#4a2e17" stroke="#1e1208" stroke-width=".8"/><path d="M${x - 2} ${y + 1}h34" stroke="#9a7248" stroke-width=".7" opacity=".7"/>`;
    for (const k of [4, 13, 22]) s += `<g transform="translate(${x + k} ${y + 9})"><rect width="6" height="6" fill="#5a3a1e" stroke="#1e1208" stroke-width=".7"/><path d="M0 6V0h6" fill="none" stroke="#b08a5a" stroke-width=".8"/><path d="M1.500 1.500h3v3h-3z" fill="#3a2410"/></g>`;
    if (side > 0) s += `<g transform="translate(${x + 33} ${y - .5})"><rect width="7" height="8" rx="1" fill="#5a3a1e" stroke="#1e1208" stroke-width=".7"/><path d="M0 1h6" stroke="#b08a5a" stroke-width=".7"/></g>`;
  }
  return `<g class="pc" style="--dx:${side * 70}px;--d:${d};--o:0">${s}</g>`;
}

const shield = `<g transform="translate(438 130)"><g class="pc" style="--dy:-80px;--r:200deg;--d:1.150;--o:0"><g class="etswing">
  <path d="M0 -17L3 -44" stroke="#3a2412" stroke-width="1.600"/>
  <circle r="17.500" fill="#2a160a"/><circle r="16.500" fill="url(#etHide)"/>
  <circle r="12.500" fill="none" stroke="#4e2f14" stroke-width="1" stroke-dasharray="2.500 1.800"/><circle r="15" fill="none" stroke="#e8c27a" stroke-width=".7" opacity=".6"/>
  <rect x="-2.300" y="-15.500" width="4.600" height="31" rx="1.600" fill="var(--civ)" stroke="#5a3e08" stroke-width=".6"/>
  <path d="M-2.300 -10h4.600M-2.300 -5h4.600M-2.300 5h4.600M-2.300 10h4.600" stroke="${CRIM}" stroke-width="1"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i + .5) / 8 * Math.PI * 2; return `<circle cx="${(Math.cos(a) * 13.800).toFixed(1)}" cy="${(Math.sin(a) * 13.800).toFixed(1)}" r="1.100" fill="#f3dc9a" stroke="#5a3e08" stroke-width=".4"/>`; }).join('')}
  <circle r="5" fill="#e0b54a" stroke="#5a3e08" stroke-width=".9"/><circle cx="-1.400" cy="-1.400" r="1.600" fill="#fff6d0" opacity=".85"/>
  <path d="M-11 -9a14 14 0 0 1 9-5" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.500" stroke-linecap="round"/>
</g></g></g>`;

const frame = `<defs>
  <linearGradient id="etSt" x1="0" x2="1"><stop offset="0" stop-color="#a99c8a"/><stop offset=".55" stop-color="#7d7264"/><stop offset="1" stop-color="#564d43"/></linearGradient>
  <radialGradient id="etHide" cx=".38" cy=".34" r=".75"><stop offset="0" stop-color="#c58d4f"/><stop offset=".6" stop-color="#8a5a2c"/><stop offset="1" stop-color="#5a3618"/></radialGradient></defs>
  ${aksum(-27, -1, .9)}${aksum(397, 1, .98)}${shield}`;

// lion-mane tufts radiating behind the head, a front fringe over the brow band
const tuft = (a, r0, len, w, fill, i, cx = 70, cy = 60) => `<g transform="translate(${cx} ${cy}) rotate(${a + 90}) translate(0 ${-r0})"><path class="etm" style="--i:${i}" d="M${-w} 0C${-w * 1.200} ${-len * .5} ${-w * .4} ${-len * .85} ${w * .3} ${-len}C${w * .6} ${-len * .7} ${w * 1.200} ${-len * .45} ${w} 0z" fill="${fill}" stroke="#3a1f08" stroke-width=".6"/></g>`;
const back = [];
for (let a = -205, i = 0; a <= 25; a += 10, i++) back.push(tuft(a, 24, 34 + (i % 3) * 5, 5.500, i % 2 ? '#8a5420' : '#6e3f14', i));
for (let a = -200, i = 0; a <= 20; a += 10, i++) back.push(tuft(a + 5, 26, 24 + (i % 2) * 6, 4.500, i % 3 ? '#c8893a' : '#e2b060', i + 30));
const costume = {
  back: back.join(''),
  front: `
  ${[-62, -46, -30, -15, 0, 15, 30, 46, 62].map((a, i) => tuft(a - 90, 0, 14 + (i % 2) * 5, 3.600, i % 2 ? '#c8893a' : '#e2b060', i + 60, 70 + a * .42, 44 + Math.abs(a) * .06)).join('')}
  <path d="M42.500 48C46 36 94 36 97.500 48l-1 3.600C88 43.500 52 43.500 43.500 51.600z" fill="${CRIM}" stroke="#4a0a14" stroke-width="1" stroke-linejoin="round"/>
  <path d="M45 46.500C52 40.500 88 40.500 95 46.500" fill="none" stroke="var(--civ)" stroke-width="1.200"/>
  ${[50, 58, 66, 74, 82, 90].map((x, i) => `<path d="M${x} ${44.200 - (x > 60 && x < 80 ? 1.200 : 0)}l2 2-2 2-2-2z" fill="${i % 2 ? INDI : 'var(--civ)'}"/>`).join('')}
  <circle cx="70" cy="42" r="2.600" fill="#e0b54a" stroke="#5a3e08" stroke-width=".8"/>
  <path d="M51 86c6 4 32 4 38 0l3 10H48z" fill="${CRIM}" stroke="#4a0a14" stroke-width="1" stroke-linejoin="round"/>
  <path d="M51.500 87.500c6 4 31 4 37 0" fill="none" stroke="var(--civ)" stroke-width="1.400"/>
  ${[56, 63, 70, 77, 84].map((x) => `<circle cx="${x}" cy="${x === 70 ? 92.500 : 92}" r="1.300" fill="#e0b54a" stroke="#5a3e08" stroke-width=".4"/>`).join('')}`,
};

const css = `
#stage[data-civ=ethiopians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=ethiopians] .etsway{transform-box:fill-box;transform-origin:50% 0;animation:etSway 5.800s ease-in-out infinite}
@keyframes etSway{0%,100%{transform:rotate(-1.400deg) skewX(1.300deg)}50%{transform:rotate(1.800deg) skewX(-2.200deg)}}
#stage[data-civ=ethiopians] .etsheen{animation:etSheen 4.600s linear infinite}
@keyframes etSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=ethiopians] .etfr{transform-box:fill-box;transform-origin:50% 0;animation:etFr 1.700s ease-in-out infinite alternate}
@keyframes etFr{from{transform:skewX(-9deg)}to{transform:skewX(9deg)}}
#stage[data-civ=ethiopians] .etm{transform-box:fill-box;transform-origin:50% 100%;animation:etMane calc(2.400s + var(--i)*.07s) calc(var(--i)*-.31s) ease-in-out infinite alternate}
@keyframes etMane{from{transform:rotate(-5deg)}to{transform:rotate(6deg)}}
#stage[data-civ=ethiopians] .etswing{transform-box:fill-box;transform-origin:60% 0;animation:etSwing 4.200s ease-in-out infinite}
@keyframes etSwing{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
`;

export default {
  id: 'ethiopians', name: 'Ethiopians', kit: 'africa',
  accent: '#ffd447', accent2: '#d99a1c', cloth: SHAMMA, metal: '#e0b54a',
  standard, pennant, costume, css, frame,
};
