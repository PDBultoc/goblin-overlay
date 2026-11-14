// CIV layer: Poles (kit: central). Crimson-rose accent, deep crimson cloth. Standard: a two-tailed lance pennon on the
// pole in front of a feathered wing frame. Frame: a leopard pelt over the top beam and a feathered wing rising along
// the left post. Mascot: fur kolpak with a jewelled clasp and a heron-feather plume. All drawings are our own; the
// pennon is rose over crimson with a gold edge (not a national flag).

const f1 = (n) => +n.toFixed(1);
const bz = (p, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]); };

// feathers along a cubic spine; side = +1 right of the direction of travel, -1 left
const wing = (P, n, len, side, cls, spread = 70) => { let fe = '';
  for (let i = 0; i < n; i++) { const t = .04 + .92 * i / (n - 1), [x, y] = bz(P, t), [x2, y2] = bz(P, Math.min(1, t + .02));
    const a = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI + side * spread - side * 30 * t, l = len * (.75 + .35 * Math.sin(t * Math.PI));
    fe += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><path d="M0 0C${f1(l * .3)} -3.600 ${f1(l * .8)} -3 ${f1(l)} 0C${f1(l * .8)} 2.400 ${f1(l * .3)} 3 0 0Z" fill="${i % 2 ? '#f4f1ea' : '#2a2626'}" stroke="#14100e" stroke-width=".6"/><path d="M1 0H${f1(l * .92)}" stroke="${i % 2 ? '#9a948a' : '#6a625c'}" stroke-width=".6"/></g>`; }
  return `<g class="${cls}">${fe}<path d="M${P[0]}C${P[1]} ${P[2]} ${P[3]}" fill="none" stroke="#3a2513" stroke-width="5" stroke-linecap="round"/><path d="M${P[0]}C${P[1]} ${P[2]} ${P[3]}" fill="none" stroke="#d9b45a" stroke-width="1.200" stroke-dasharray="2 9"/></g>`; };

const standard = `<svg width="130" height="220" viewBox="0 0 130 220">
  <defs>
    <clipPath id="polPenC"><path d="M33 6L112 13L134 2L117 24L134 46L112 35L33 42Z"/></clipPath>
    <linearGradient id="polPenS" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#000" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity=".15"/></linearGradient>
  </defs>
  <g class="pc" style="--sc:.1;--r:30deg;--dy:60px;--d:1.100">${wing([[33, 200], [92, 160], [108, 80], [72, 12]], 19, 40, 1, 'pwing')}</g>
  <g class="unroll" style="--d:1.400"><g class="ppen">
    <g clip-path="url(#polPenC)">
      <rect x="30" y="0" width="100" height="24" fill="var(--civ)"/><rect x="30" y="24" width="100" height="26" fill="var(--civ3)"/>
      <path d="M36 24H126" stroke="#e6c25a" stroke-width="1.600"/>
      <rect class="psheen" x="-40" y="0" width="120" height="50" fill="url(#polPenS)"/>
    </g>
    <path d="M33 6L112 13L134 2L117 24L134 46L112 35L33 42Z" fill="none" stroke="#e6c25a" stroke-width="1.400" stroke-linejoin="round"/>
  </g></g>
  <path d="M27 4h6v4h-6zM27 40h6v4h-6z" fill="#e6c25a" stroke="#5a3c12" stroke-width=".6"/>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="polPnC"><path d="M3 5H31V44L25 66L17 50L9 66L3 44Z"/></clipPath></defs>
  <rect x="1" y="0" width="32" height="5" rx="2" fill="#e6c25a" stroke="#5a3c12" stroke-width=".6"/>
  <g class="unroll" style="--d:1.600"><g class="ppen" style="animation-delay:-1.300s">
    <g clip-path="url(#polPnC)"><rect x="0" y="0" width="17" height="70" fill="var(--civ)"/><rect x="17" y="0" width="17" height="70" fill="var(--civ3)"/><path d="M17 5V60" stroke="#e6c25a" stroke-width="1"/></g>
    <path d="M3 5H31V44L25 66L17 50L9 66L3 44Z" fill="none" stroke="#e6c25a" stroke-width="1"/>
  </g></g>
</svg>`;

// leopard pelt over the top beam (rosettes), one paw hanging, and a feathered wing along the left post
// a leopard rosette: four broken dark spots round a darker tawny centre
const rosettes = () => { let s = '', k = 7; const r = () => (k = (k * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 24; i++) { const x = 90 + (i % 12) * 14 + (i < 12 ? 0 : 7) + r() * 3, y = (i < 12 ? -10 : 4) + r() * 4, sz = 3.400 + r() * 1.200;
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(sz * .7)}" fill="#a2601e" opacity=".8"/>`;
    for (let j = 0; j < 4; j++) { const a = j * 1.570 + r() * .6; s += `<ellipse cx="${f1(x + Math.cos(a) * sz * 1.150)}" cy="${f1(y + Math.sin(a) * sz * 1.150)}" rx="${f1(sz * .5)}" ry="${f1(sz * .32)}" transform="rotate(${f1(a * 57.300 + 90)} ${f1(x + Math.cos(a) * sz * 1.150)} ${f1(y + Math.sin(a) * sz * 1.150)})" fill="#24140a"/>`; } }
  return s; };
const PELT = 'M82 -19C120 -22 220 -22 262 -19L264 4L259 2L256 8L251 5L247 11L242 7L237 12L231 8L225 13L219 9L213 14L206 9L199 13L193 8L186 13L180 9L173 14L166 9L160 13L153 8L147 12L140 8L134 13L127 8L121 11L114 9L111 18C108 23 98 24 95 19L98 10L92 7L88 11L82 6Z';
const frame = `
<defs><clipPath id="polPeltC"><path d="${PELT}"/></clipPath>
  <linearGradient id="polPeltG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0c27a"/><stop offset=".45" stop-color="#d0923f"/><stop offset="1" stop-color="#8a5320"/></linearGradient></defs>
<g class="pc" style="--sc:.1;--r:-40deg;--dx:-40px;--dy:-40px;--d:1;--o:0">${wing([[6, -14], [0, -56], [30, -96], [92, -108]], 17, 34, -1, 'pwing2', 35)}</g>
<g class="pc" style="--dy:-60px;--r:-4deg;--d:1.100;--o:0">
  <g clip-path="url(#polPeltC)"><rect x="78" y="-24" width="190" height="62" fill="url(#polPeltG)"/>
    ${[100, 136, 172, 208, 244].map((x) => `<rect x="${x}" y="-24" width="10" height="62" fill="#5a3010" opacity=".16"/><rect x="${x + 10}" y="-24" width="5" height="62" fill="#fff3d6" opacity=".12"/>`).join('')}
    ${rosettes()}
    <path d="M84 -16C130 -19 210 -19 260 -16" fill="none" stroke="#fff3d6" stroke-width="2" opacity=".35"/></g>
  ${[120, 230].map((x) => `<rect x="${x - 5}" y="-20" width="10" height="7" rx="2" fill="#e6c25a" stroke="#5a3c12" stroke-width=".7"/><circle cx="${x}" cy="-16.500" r="1.800" fill="var(--civ)"/>`).join('')}
  <path d="${PELT}" fill="none" stroke="#5a3010" stroke-width="1" stroke-linejoin="round"/>
  <path d="M98 20l-1 3M102 22v3M106 22l1 3M109 20l2 2" stroke="#f4f1ea" stroke-width="1.200" stroke-linecap="round"/>
</g>`;

const costume = {
  front: `
  <path d="M52 15C50 2 62-4 80-1C92 1 96 8 92 15Z" fill="var(--civ3)" stroke="#2a0812" stroke-width="1.100"/>
  <path d="M60 4c6-3 16-3 24 0" fill="none" stroke="var(--civ)" stroke-width="1.300" opacity=".85"/>
  <path d="M44 51C42 40 42 28 44 14C46 11 50 13 53 11C56 13 60 10 64 12C67 10 71 12 75 10C78 12 82 10 86 12C90 10 93 13 96 12C98 28 98 40 96 51C93 48 90 52 86 49C82 52 78 48 74 51C70 48 66 52 62 49C58 52 54 48 50 51C48 49 46 50 44 51Z" fill="#3b2a1e" stroke="#140c06" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M47 18c2 3 1 6 3 8M53 16c1 4 3 6 2 9M60 15c2 3 1 7 3 9M67 14c1 4 2 6 1 9M80 15c-1 3 0 6-2 9M87 16c-1 4-3 6-2 9M93 18c-2 3-1 6-3 8M46 31c2 2 2 5 4 6M46 40c2 2 1 5 3 6M94 31c-2 2-2 5-4 6M94 40c-2 2-1 5-3 6M55 40c1 2 1 4 3 5M85 40c-1 2-1 4-3 5" fill="none" stroke="#8a6a4c" stroke-width="1.300" stroke-linecap="round"/>
  <path d="M49 20c-2 8-2 18 0 26" fill="none" stroke="#b39066" stroke-width="1.600" stroke-linecap="round" opacity=".55"/>
  <g class="pplume">
    <path d="M72 26C70 10 74-10 66-34C78-18 80 2 76 26Z" fill="#f4f1ea" stroke="#8a847a" stroke-width=".7"/>
    <path d="M73 24C66 8 58-4 48-14M75 24C82 8 90-2 98-12M73 22C70 6 70-14 62-28M75 22C78 6 82-10 80-26" fill="none" stroke="#efebe3" stroke-width="1.300" stroke-linecap="round"/>
    <path d="M66-34c-3-3-3-7 0-9M48-14c-3 0-5-2-5-5M98-12c3-1 4-3 4-6" fill="none" stroke="#1e1a18" stroke-width="1.600" stroke-linecap="round"/>
  </g>
  <ellipse cx="72" cy="29" rx="5.400" ry="6.600" fill="#e6c25a" stroke="#5a3c12" stroke-width="1"/>
  <ellipse cx="72" cy="29" rx="3" ry="4" fill="var(--civ)" stroke="#5a0a20" stroke-width=".6"/>
  <circle cx="71" cy="27.500" r="1" fill="#fff" opacity=".85"/>
  <circle cx="72" cy="20.800" r="1.400" fill="#f4f1ea"/><circle cx="72" cy="37.200" r="1.400" fill="#f4f1ea"/>`,
};

const css = `
#stage[data-civ=poles] .gob.dressed .tuft{opacity:0}
#stage[data-civ=poles] .ppen{transform-box:fill-box;transform-origin:0 50%;animation:pPen 1.800s ease-in-out infinite alternate}
@keyframes pPen{from{transform:skewY(-4deg) scaleX(.95)}to{transform:skewY(4deg) scaleX(1.030)}}
#stage[data-civ=poles] .psheen{animation:pSheen 2.600s linear infinite}
@keyframes pSheen{from{transform:translateX(0)}to{transform:translateX(100px)}}
#stage[data-civ=poles] .pwing{transform-box:fill-box;transform-origin:0 100%;animation:pWing 4.400s ease-in-out infinite alternate}
@keyframes pWing{from{transform:rotate(-1.500deg)}to{transform:rotate(2deg)}}
#stage[data-civ=poles] .pwing2{transform-box:fill-box;transform-origin:0 100%;animation:pWing 5s -2s ease-in-out infinite alternate}
#stage[data-civ=poles] .pplume{transform-box:fill-box;transform-origin:50% 100%;animation:pPlume 2.700s ease-in-out infinite alternate}
@keyframes pPlume{from{transform:rotate(-6deg)}to{transform:rotate(7deg)}}
`;

export default {
  id: 'poles', name: 'Poles', kit: 'central',
  accent: '#ff6b8a', accent2: '#b52b4a', cloth: '#6b1a2e', metal: '#e6c25a',
  standard, pennant, costume, css, frame,
};
