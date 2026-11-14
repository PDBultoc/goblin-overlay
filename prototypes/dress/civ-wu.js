// CIV layer: Wu (kit: eastasia). Orange accent, brown glaze, ochre sailcloth. The pole turns into a mast carrying a
// battened junk sail; rigging lines with wooden blocks run from the mast to the roof corner, rope lashings bind the
// pillars, two oars lean between the right pillar and the mast, and the mascot wears a red headband with a long
// pheasant-feather plume. All drawings are our own.
const f1 = (n) => (+n.toFixed(1)).toString();
const bez = (a, b, c, d, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]); };
const ROPE = '#cfae74';

// junk sail right of the mast (x 14): yard on top, curved leech, battens fanning slightly
function junk(id, sc, tx = 12 - 12 * sc, ty = 0) {
  const leech = [[104, 4], [118, 50], [116, 108], [102, 150]], N = 6;
  const L = (i) => [14, 18 + (150 - 18) * i / N], R = (i) => bez(...leech, i / N);
  let panels = '', battens = '', sheets = '';
  for (let i = 0; i < N; i++) {
    const a = L(i), b = R(i), c = R(i + 1), d = L(i + 1), m = bez(...leech, (i + .5) / N);
    panels += `<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}Q${f1(m[0] + 3)} ${f1(m[1])} ${f1(c[0])} ${f1(c[1])}L${f1(d[0])} ${f1(d[1])}Z" fill="${i % 2 ? 'color-mix(in srgb,var(--civ) 70%,var(--civ3))' : 'var(--civ3)'}"/>`;
    panels += `<path d="M${f1(a[0] + 4)} ${f1((a[1] + d[1]) / 2 + 2)}Q${f1((a[0] + m[0]) / 2)} ${f1((b[1] + c[1]) / 2 + 6)} ${f1(m[0] - 4)} ${f1(m[1] + 1)}" fill="none" stroke="#000" stroke-opacity=".13" stroke-width="3"/>`;
  }
  for (let i = 1; i < N; i++) { const a = L(i), b = R(i); battens += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0] + 3)} ${f1(b[1])}`; sheets += `M${f1(b[0] + 3)} ${f1(b[1])}L132 116`; }
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${sc})">
    <defs><clipPath id="${id}"><path d="M14 18L104 4C118 50 116 108 102 150L14 150Z"/></clipPath></defs>
    <path d="${sheets}" stroke="${ROPE}" stroke-width=".7" opacity=".85"/>
    <g clip-path="url(#${id})">${panels}<rect class="wsheen" x="-120" y="0" width="70" height="160" fill="url(#wuSh)"/></g>
    <path d="M14 18L104 4C118 50 116 108 102 150L14 150Z" fill="none" stroke="#4a2a14" stroke-width="1.100" stroke-linejoin="round"/>
    <path d="${battens}" stroke="#4a2a14" stroke-width="2.600" stroke-linecap="round"/><path d="${battens}" stroke="#a87a44" stroke-width="1" stroke-linecap="round"/>
    <path d="M6 19.500L108 2.500" stroke="#3a2210" stroke-width="4.500" stroke-linecap="round"/><path d="M6 19.500L108 2.500" stroke="#8a5a2c" stroke-width="2.400" stroke-linecap="round"/>
    <path d="M12 151H104" stroke="#3a2210" stroke-width="4" stroke-linecap="round"/><path d="M12 151H104" stroke="#8a5a2c" stroke-width="2" stroke-linecap="round"/>
    <circle cx="132" cy="116" r="2.200" fill="#6a4422" stroke="#2a160a" stroke-width=".6"/>
  </g>`;
}

const standard = `<svg width="140" height="170" viewBox="0 0 140 170">
  <defs><linearGradient id="wuSh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <g class="unroll" style="--d:1.350"><g class="wbill">${junk('wuSl', 1)}</g></g>
  <g class="fin" style="--d:1.700"><g class="wstream"><path d="M14 -4H44L36 0L46 4H14Z" fill="var(--civ)" stroke="#5a2a08" stroke-width=".7"/></g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <path d="M5 0V74" stroke="#5a3a1e" stroke-width="2.400" stroke-linecap="round"/>
  <g class="unroll" style="--d:1.600"><g class="wbill" style="animation-delay:-2s">${junk('wuSp', .3, 1, 6)}</g></g>
</svg>`;

// frame: rigging from the mast to the roof corner with two wooden blocks, rope lashings on both pillars, two oars
const lash = (x, y) => `<path d="${[0, 4, 8, 12].map((k) => `M${x} ${y + k}l18 4`).join('')}" stroke="#4a2e14" stroke-width="3" stroke-linecap="round"/>
  <path d="${[0, 4, 8, 12].map((k) => `M${x} ${y + k}l18 4`).join('')}" stroke="${ROPE}" stroke-width="1.800" stroke-linecap="round"/>`;
const block = (x, y) => `<rect x="${x - 3}" y="${y - 4.500}" width="6" height="9" rx="2.500" fill="#7a4d27" stroke="#2a160a" stroke-width=".7"/><circle cx="${x}" cy="${y}" r="1.200" fill="#2a160a"/>`;
const oar = (x, top, d) => `<g class="pc" style="--dy:-120px;--d:${d};--o:0"><g class="woar">
  <path d="M${x} ${top}V${top + 130}" stroke="#3a2210" stroke-width="3.600" stroke-linecap="round"/><path d="M${x} ${top}V${top + 130}" stroke="#a87a44" stroke-width="2" stroke-linecap="round"/>
  <path d="M${x - 4.500} ${top + 126}C${x - 6} ${top + 150} ${x - 4} ${top + 166} ${x} ${top + 172}C${x + 4} ${top + 166} ${x + 6} ${top + 150} ${x + 4.500} ${top + 126}Z" fill="#a87a44" stroke="#3a2210" stroke-width=".9"/>
  <path d="M${x} ${top + 130}V${top + 166}" stroke="#6a4422" stroke-width=".8"/><path d="M${x - 4.800} ${top + 140}h9.600" stroke="var(--civ)" stroke-width="2"/>
</g></g>`;
const frame = `<g class="fin" style="--d:1.500">
  <path class="wline" d="M456 -150Q440 -118 427 -82" fill="none" stroke="${ROPE}" stroke-width="1.200"/>
  <path class="wline" d="M456 -112Q446 -96 438 -78" fill="none" stroke="${ROPE}" stroke-width="1"/>
  ${block(447, -124)}${block(447, -100)}
</g>
<g class="pc" style="--sc:.3;--d:1.050;--o:0">${lash(-20, 22)}${lash(402, 22)}</g>
<g class="pc" style="--sc:.3;--d:1.120;--o:0">${lash(-20, 186)}${lash(402, 186)}</g>
${oar(429, 52, 1.15)}${oar(443, 60, 1.25)}`;

// one long tapered pheasant feather from base b over control c to tip t, with dark bars
function feather(id, b, c, t, w) {
  const pts = []; const N = 18;
  for (let i = 0; i <= N; i++) { const s = i / N, u = 1 - s; pts.push([u * u * b[0] + 2 * u * s * c[0] + s * s * t[0], u * u * b[1] + 2 * u * s * c[1] + s * s * t[1]]); }
  const side = (sg) => pts.map((p, i) => { const q = pts[Math.min(N, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dy = q[1] - o[1], l = Math.hypot(dx, dy) || 1, ww = w * (1 - i / N * .85);
    return [p[0] - dy / l * ww * sg, p[1] + dx / l * ww * sg]; });
  const a = side(1), z = side(-1).reverse();
  const outline = 'M' + [...a, ...z].map((p) => `${f1(p[0])} ${f1(p[1])}`).join('L') + 'Z';
  const spine = `M${b[0]} ${b[1]}Q${c[0]} ${c[1]} ${t[0]} ${t[1]}`;
  return `<defs><clipPath id="${id}"><path d="${outline}"/></clipPath></defs>
    <path d="${outline}" fill="#c98a4a" stroke="#3a2412" stroke-width=".8" stroke-linejoin="round"/>
    <g clip-path="url(#${id})"><path d="${spine}" fill="none" stroke="#3a2412" stroke-width="${w * 2.400}" stroke-dasharray="2.200 3.600" opacity=".75"/>
    <path d="${spine}" fill="none" stroke="#f3e2c0" stroke-width="${w * .5}" opacity=".7"/></g>`;
}

const costume = {
  back: `
  <g class="wfe"><g>${feather('wuF1', [63, 38], [50, 0], [8, -26], 3.400)}</g></g>
  <g class="wfe r"><g>${feather('wuF2', [77, 38], [90, 0], [132, -26], 3.400)}</g></g>`,
  front: `
  <path d="M42 40C50 34 90 34 98 40L98 47C90 42 50 42 42 47Z" fill="#d42a1f" stroke="#5a0a06" stroke-width="1" stroke-linejoin="round"/>
  <path d="M43 42.500C52 37.500 88 37.500 97 42.500" fill="none" stroke="#e8c06a" stroke-width=".9"/>
  <path d="M66 36.500l4-3 4 3-4 6z" fill="var(--civ)" stroke="#5a2a08" stroke-width=".8"/><circle cx="70" cy="38" r="1.200" fill="#fff4d6"/>
  <g class="wtail"><path d="M98 41C110 42 118 50 129 48L129 53C118 57 110 49 98 46Z" fill="#d42a1f" stroke="#5a0a06" stroke-width=".7"/>
  <path d="M98 44C108 51 112 61 123 66L120 70C110 63 104 55 97 47Z" fill="#b81d14" stroke="#5a0a06" stroke-width=".7"/></g>
  <circle cx="98.500" cy="43.500" r="3.200" fill="#d42a1f" stroke="#5a0a06" stroke-width=".8"/>`,
};

const css = `
#stage[data-civ=wu]{--eaglz:#8a4b28}
#stage[data-civ=wu] .gob.dressed .tuft{opacity:0}
#stage[data-civ=wu] .wbill{transform-box:fill-box;transform-origin:0 50%;animation:wBill 3.600s ease-in-out infinite}
@keyframes wBill{0%,100%{transform:scaleX(.95) skewY(-1deg)}50%{transform:scaleX(1.030) skewY(1.200deg)}}
#stage[data-civ=wu] .wsheen{animation:wSheen 5s linear infinite}
@keyframes wSheen{from{transform:translateX(0)}to{transform:translateX(260px)}}
#stage[data-civ=wu] .wstream{transform-box:fill-box;transform-origin:0 50%;animation:wStream .9s ease-in-out infinite alternate}
@keyframes wStream{from{transform:skewY(-8deg) scaleX(.9)}to{transform:skewY(8deg)}}
#stage[data-civ=wu] .wline{animation:wLine 3.600s ease-in-out infinite}
@keyframes wLine{50%{translate:1.500px 0}}
#stage[data-civ=wu] .woar{transform-box:fill-box;transform-origin:50% 0;animation:wOar 4s ease-in-out infinite alternate}
@keyframes wOar{from{transform:rotate(-1.500deg)}to{transform:rotate(1.500deg)}}
#stage[data-civ=wu] .wfe{transform-box:fill-box;transform-origin:100% 100%;animation:wFe 2.800s ease-in-out infinite alternate}
#stage[data-civ=wu] .wfe.r{transform-origin:0 100%;animation-delay:-1.400s}
@keyframes wFe{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
#stage[data-civ=wu] .wtail{transform-box:fill-box;transform-origin:0 30%;animation:wTail 1.300s ease-in-out infinite alternate}
@keyframes wTail{from{transform:rotate(-8deg) scaleX(.94)}to{transform:rotate(6deg)}}
`;

export default {
  id: 'wu', name: 'Wu', kit: 'eastasia',
  accent: '#ff8a2a', accent2: '#c4520a', cloth: '#c9955a', metal: '#c9a24f',
  standard, pennant, costume, css, frame,
};
