// CIV layer: Koreans (kit: eastasia). Celadon-blue accent, grey giwa roof glaze, red flame edging. A banner with a
// stylised armoured turtle ship (smoke curling from its prow head), a rolled bamboo blind with tie cords and painted
// beam-end bands on the lintel, a celadon vase on the strut by the pole, and a gat (wide black horsehair hat with bead
// strings) for the mascot. All drawings are our own.
const f1 = (n) => (+n.toFixed(1)).toString();
const bez = (a, b, c, d, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]); };
const CREAM = '#f3ead2';

// flame tongues along an edge from (x0,y0) to (x1,y1), pointing to the side of (ox,oy)
function flames(x0, y0, x1, y1, count, size, cols, ox, oy) {
  const len = Math.hypot(x1 - x0, y1 - y0), d = [(x1 - x0) / len, (y1 - y0) / len], n = [-d[1], d[0]];
  if (n[0] * ox + n[1] * oy < 0) { n[0] = -n[0]; n[1] = -n[1]; }
  let s = '';
  for (let i = 0; i < count; i++) {
    const t = (i + .5) / count, P = [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
    const p = (a, b) => `${f1(P[0] + d[0] * a + n[0] * b)} ${f1(P[1] + d[1] * a + n[1] * b)}`;
    s += `<path d="M${p(-size * .55, -1)}C${p(-size * .2, size * .6)} ${p(-size * .05, size * .9)} ${p(size * .45, size * 1.2)}C${p(size * .2, size * .7)} ${p(size * .3, size * .3)} ${p(size * .55, -1)}Z" fill="${cols[i % cols.length]}" stroke="#4a0e08" stroke-width=".6"/>`;
  }
  return s;
}

// the turtle ship, side view, centred on 0,0 (hull deck line y 0)
const spikes = (() => {
  const pts = [];
  for (const t of [.12, .3, .5, .7, .9]) pts.push(bez([-27, 0], [-25, -14], [-10, -20], [4, -20], t));
  for (const t of [.15, .35, .55, .75, .9]) pts.push(bez([4, -20], [18, -20], [28, -12], [30, 0], t));
  return pts.map(([x, y]) => { const dx = x - 2, dy = y - 4, l = Math.hypot(dx, dy); return `M${f1(x)} ${f1(y)}l${f1(dx / l * 3.600)} ${f1(dy / l * 3.600)}`; }).join('');
})();
const ship = (sc) => `<g transform="scale(${sc})">
  <path class="kwave" d="M-40 17q5-3.500 10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0" fill="none" stroke="var(--civ)" stroke-width="1.600" stroke-linecap="round"/>
  <path d="M-40 22q5-3 10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0" fill="none" stroke="var(--civ2)" stroke-width="1.200" stroke-linecap="round" opacity=".7"/>
  <g class="koar"><path d="${[-22, -14, -6, 2, 10, 18].map((x) => `M${x} 8l-6 9`).join('')}" stroke="#5a3a1e" stroke-width="1.500" stroke-linecap="round"/></g>
  <path d="M-30 0H32L26 10H-24Z" fill="#6b4426" stroke="#2a160a" stroke-width="1" stroke-linejoin="round"/>
  <path d="${[-20, -12, -4, 4, 12, 20].map((x) => `M${x - 1.500} 3h3v3h-3z`).join('')}" fill="#1a0d05"/>
  <path d="M-30 1.500H31" stroke="#c8322a" stroke-width="1.200"/>
  <path d="${spikes}" stroke="#3a3f46" stroke-width="1.300" stroke-linecap="round"/>
  <path d="M-27 0C-25 -14 -10 -20 4 -20C18 -20 28 -12 30 0Z" fill="#46505c" stroke="#1a1d22" stroke-width="1"/>
  <g clip-path="url(#krShell)"><rect x="-30" y="-22" width="62" height="24" fill="url(#krHex)"/></g>
  <path d="M-22 -8C-18 -15 -8 -18 2 -18" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.300" stroke-linecap="round"/>
  <path d="M30 0l7-7v8z" fill="#6b4426" stroke="#2a160a" stroke-width=".8"/>
  <path d="M-27 -2C-33 -4 -37 -10 -36 -16L-31 -15C-32 -11 -30 -7 -25 -5Z" fill="#c8322a" stroke="#4a0e08" stroke-width=".8" stroke-linejoin="round"/>
  <path d="M-36 -16l-4 1 1 3 4-1z" fill="#c8322a" stroke="#4a0e08" stroke-width=".6"/><circle cx="-33.500" cy="-13" r=".9" fill="#f6dc96"/>
  <g class="ksmoke"><circle cx="-42" cy="-17" r="2.400"/><circle cx="-46" cy="-21" r="3.200"/><circle cx="-51" cy="-26" r="3.800"/></g>
</g>`;
const defs = `<pattern id="krHex" width="9" height="7.800" patternUnits="userSpaceOnUse"><path d="M2.250 0h4.500l2.250 3.900-2.250 3.900h-4.500L0 3.900z" fill="#58636f" stroke="#1f242a" stroke-width=".8"/></pattern>
  <clipPath id="krShell"><path d="M-27 0C-25 -14 -10 -20 4 -20C18 -20 28 -12 30 0Z"/></clipPath>
  <linearGradient id="krSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".3" stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#000" stop-opacity=".18"/><stop offset=".8" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>`;

const standard = `<svg width="124" height="150" viewBox="0 0 124 150">
  <defs>${defs}<clipPath id="krCl"><rect x="16" y="8" width="88" height="106"/></clipPath></defs>
  <g class="unroll" style="--d:1.350"><g class="kflut">
    ${flames(104, 10, 104, 114, 8, 9, ['var(--civ3)', '#ff8a3a'], 1, 0)}${flames(16, 114, 104, 114, 7, 9, ['var(--civ3)', '#ff8a3a'], 0, 1)}
    <g clip-path="url(#krCl)">
      <rect x="16" y="8" width="88" height="106" fill="${CREAM}"/>
      <rect x="16" y="8" width="88" height="106" fill="none" stroke="var(--civ)" stroke-width="9"/>
      <rect x="23" y="15" width="74" height="92" fill="none" stroke="var(--civ2)" stroke-width="1"/>
      <g transform="translate(62 64)">${ship(1.150)}</g>
      <rect class="ksheen" x="-74" y="0" width="264" height="120" fill="url(#krSh)"/>
    </g>
    <rect x="16" y="8" width="88" height="106" fill="none" stroke="#0d3a52" stroke-width="1"/>
  </g></g>
  <g class="pc" style="--dx:-40px;--d:1.150">
    <rect x="10" y="4" width="98" height="4.500" rx="2" fill="#5a3a1e" stroke="#2a160a" stroke-width=".7"/><circle cx="108" cy="6.200" r="3.300" fill="#c9a24f" stroke="#5a3d10" stroke-width=".6"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><pattern id="krHexP" width="6" height="5.200" patternUnits="userSpaceOnUse"><path d="M1.500 0h3l1.500 2.600-1.500 2.600h-3L0 2.600z" fill="#58636f" stroke="#1f242a" stroke-width=".6"/></pattern></defs>
  <g class="unroll" style="--d:1.600"><g class="kflut" style="animation-delay:-2s">
    ${flames(28, 6, 28, 56, 5, 6, ['var(--civ3)', '#ff8a3a'], 1, 0)}
    <rect x="4" y="5" width="24" height="52" fill="${CREAM}" stroke="var(--civ)" stroke-width="3"/>
    <path d="M9 34C10 25 14 21 16 21C19 21 23 25 24 34Z" fill="url(#krHexP)" stroke="#1a1d22" stroke-width=".7"/>
    <path d="M8 34H25L23 39H10Z" fill="#6b4426" stroke="#2a160a" stroke-width=".6"/>
    <path d="M8 44q2-2 4 0t4 0t4 0t4 0" fill="none" stroke="var(--civ)" stroke-width="1"/>
  </g></g>
  <rect x="2" y="2" width="30" height="3.500" rx="1.500" fill="#5a3a1e"/>
</svg>`;

// painted beam-end bands (bright stripes) on the lintel ends
const band = (x, flip, d) => `<g class="fin" style="--d:${d}"><g transform="translate(${x} 0) scale(${flip} 1)">
  ${['#f3ead2', '#c8322a', '#2a6aa6', '#f3ead2', '#2f8f6a', '#e8b83a', '#c8322a'].map((c, i) => `<rect x="${i * 4}" y="-10.500" width="4" height="11" fill="${c}"/>`).join('')}
  <path d="M28 -5l7-5.500 7 5.500-7 5.500z" fill="#2a6aa6" stroke="#f3ead2" stroke-width="1"/><circle cx="35" cy="-5" r="2" fill="#c8322a" stroke="#f3ead2" stroke-width=".6"/>
  <path d="M42 -10.500h4v11h-4z" fill="#c8322a"/>
</g></g>`;
// short tie cords: they end within ~20 px of the lintel (nothing may hang over Goblin's face)
const tie = (x, i) => `<g class="ktie" style="--i:${i}"><path d="M${x} 4c-2 3-2 5 0 7" fill="none" stroke="var(--civ2)" stroke-width="1.300"/><circle cx="${x}" cy="12" r="1.800" fill="var(--civ)" stroke="#0d3a52" stroke-width=".6"/>
  <path d="M${x - 2} 13.500h4l1.200 6h-6.400z" fill="var(--civ)" stroke="#0d3a52" stroke-width=".5"/></g>`;
const frame = `${band(26, 1, 1.5)}${band(374, -1, 1.55)}
<g class="pc" style="--dy:-30px;--sc:.2;--d:1.050;--o:0">
  <rect x="30" y="3" width="340" height="10" rx="5" fill="url(#krBam)" stroke="#5a3a1e" stroke-width=".9"/>
  <path d="M34 5.500h332" stroke="#fff6d8" stroke-opacity=".45" stroke-width="1"/>
  ${tie(80, 0)}${tie(320, 1)}
</g>
<defs><pattern id="krBam" width="5" height="10" patternUnits="userSpaceOnUse"><rect width="5" height="10" fill="#cfae6c"/><path d="M4.500 0v10" stroke="#8a6a36" stroke-width=".8"/></pattern>
  <linearGradient id="krCel" x1="0" x2="1"><stop offset="0" stop-color="#cfe9e6"/><stop offset=".45" stop-color="#9ccdd0"/><stop offset="1" stop-color="#5e9aa3"/></linearGradient></defs>
<g class="pc" style="--dy:-80px;--sc:.4;--d:1.250;--o:0">
  <path d="M436 148c-3 0-4 2-4 3-8 2-12 8-11 14 1 9 6 15 8 25h14c2-10 7-16 8-25 1-6-3-12-11-14 0-1-1-3-4-3z" fill="url(#krCel)" stroke="#3d6a72" stroke-width=".9"/>
  <path d="M432 151h8" stroke="#3d6a72" stroke-width="1"/>
  <path d="M427 165l3 2 2-3M440 171l3 2 2-3M432 179l2 1.500 1.500-2.500" fill="none" stroke="#f6fbfa" stroke-width=".9" stroke-linecap="round"/>
  <g fill="#3d6a72"><circle cx="438" cy="160" r=".9"/><circle cx="429" cy="174" r=".9"/><circle cx="443" cy="181" r=".9"/></g>
  <path d="M426 161c1-4 3-6 6-7" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.300" stroke-linecap="round"/>
</g>`;

const costume = {
  front: `
  <g class="kbead"><path d="M43 41C40 58 38 74 37 92" fill="none" stroke="#3a2a14" stroke-width=".7"/>
  ${[48, 55, 62, 69, 76, 83, 90].map((y, i) => `<circle cx="${f1(43 - (y - 41) * .118)}" cy="${y}" r="${i % 2 ? 1.400 : 1.900}" fill="${i % 2 ? 'var(--civ)' : '#e9b04a'}" stroke="#3a2a14" stroke-width=".5"/>`).join('')}</g>
  <g class="kbead r"><path d="M97 41C100 58 102 74 103 92" fill="none" stroke="#3a2a14" stroke-width=".7"/>
  ${[48, 55, 62, 69, 76, 83, 90].map((y, i) => `<circle cx="${f1(97 + (y - 41) * .118)}" cy="${y}" r="${i % 2 ? 1.400 : 1.900}" fill="${i % 2 ? 'var(--civ)' : '#e9b04a'}" stroke="#3a2a14" stroke-width=".5"/>`).join('')}</g>
  <path d="M45 37h50v7H45z" fill="#141216" stroke="#000" stroke-width=".8"/>
  <ellipse cx="70" cy="37" rx="52" ry="8" fill="#0d0c10" fill-opacity=".72" stroke="#000" stroke-width="1"/>
  <ellipse cx="70" cy="37" rx="44" ry="6.200" fill="none" stroke="#5e5a66" stroke-width=".6" opacity=".7"/><ellipse cx="70" cy="37" rx="34" ry="4.800" fill="none" stroke="#5e5a66" stroke-width=".6" opacity=".7"/>
  <path d="M24 33.500C40 30 100 30 116 33.500" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1.200"/>
  <path d="M57 37L58.500 9H81.500L83 37Z" fill="#0d0c10" fill-opacity=".8" stroke="#000" stroke-width="1"/>
  <path d="M61 36.500l1-27M65 36.500l.5-27M70 36.500v-27M75 36.500l-.5-27M79 36.500l-1-27" stroke="#5e5a66" stroke-width=".5" opacity=".7"/>
  <ellipse cx="70" cy="9" rx="11.500" ry="2.600" fill="#1d1b22" stroke="#000" stroke-width=".8"/>
  <path d="M60 14c0 8 0 16 1 22" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.200" stroke-linecap="round"/>
  <path d="M58 35.500h24" stroke="var(--civ)" stroke-width="1.400" opacity=".8"/>`,
};

const css = `
#stage[data-civ=koreans]{--eaglz:#5b6878}
#stage[data-civ=koreans] .gob.dressed .tuft{opacity:0}
#stage[data-civ=koreans] .kflut{transform-box:fill-box;transform-origin:0 0;animation:kFlut 3.800s ease-in-out infinite}
@keyframes kFlut{0%,100%{transform:skewY(-1.800deg) scaleX(.97)}50%{transform:skewY(2.200deg) scaleX(1.010)}}
#stage[data-civ=koreans] .ksheen{animation:kSheen 4.800s linear infinite}
@keyframes kSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=koreans] .kwave{animation:kWave 1.600s linear infinite}
@keyframes kWave{from{transform:translateX(0)}to{transform:translateX(-10px)}}
#stage[data-civ=koreans] .koar{transform-box:fill-box;transform-origin:50% 0;animation:kOar 1.400s ease-in-out infinite alternate}
@keyframes kOar{from{transform:skewX(-14deg)}to{transform:skewX(12deg)}}
#stage[data-civ=koreans] .ksmoke circle{fill:#e8e4dc;opacity:0;transform-box:fill-box;transform-origin:center;animation:kSmoke 2.400s linear infinite}
#stage[data-civ=koreans] .ksmoke circle:nth-child(2){animation-delay:-.8s}#stage[data-civ=koreans] .ksmoke circle:nth-child(3){animation-delay:-1.600s}
@keyframes kSmoke{0%{opacity:0;transform:translate(4px,4px) scale(.4)}25%{opacity:.85}100%{opacity:0;transform:translate(-6px,-8px) scale(1.500)}}
#stage[data-civ=koreans] .ktie{transform-box:fill-box;transform-origin:50% 0;animation:kTie calc(2s + var(--i)*.4s) ease-in-out infinite alternate}
@keyframes kTie{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
#stage[data-civ=koreans] .kbead{transform-box:fill-box;transform-origin:50% 0;animation:kBead 2.800s ease-in-out infinite alternate}
#stage[data-civ=koreans] .kbead.r{animation-delay:-1.400s}
@keyframes kBead{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
`;

export default {
  id: 'koreans', name: 'Koreans', kit: 'eastasia',
  accent: '#5ad1ff', accent2: '#1f8fc4', cloth: '#c8322a', metal: '#c9a24f',
  standard, pennant, costume, css, frame,
};
