// CIV layer: Chinese (kit: eastasia). Imperial gold accent, imperial-yellow roof glaze, red silk. A triangular war
// banner with a scalloped flame border and a coiling dragon (no written characters), a red silk swag with rosettes
// and tassels on the lintel, a lamellar helmet with a red horsehair tassel for the mascot. All drawings are our own.
const f1 = (n) => (+n.toFixed(1)).toString();

// flame tongues along the banner's free (diagonal) edge from (x0,y0) to (x1,y1); n = outward normal
function flames(x0, y0, x1, y1, count, size, cols) {
  const len = Math.hypot(x1 - x0, y1 - y0), d = [(x1 - x0) / len, (y1 - y0) / len], n = [-d[1], d[0]];
  if (n[0] < 0) { n[0] = -n[0]; n[1] = -n[1]; }
  let s = '';
  for (let i = 0; i < count; i++) {
    const t = (i + .5) / count, P = [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
    const p = (a, b) => `${f1(P[0] + d[0] * a + n[0] * b)} ${f1(P[1] + d[1] * a + n[1] * b)}`;
    s += `<path class="cfl" style="--i:${i}" d="M${p(-size * .55, -1)}C${p(-size * .2, size * .6)} ${p(-size * .05, size * .9)} ${p(size * .45, size * 1.25)}C${p(size * .2, size * .7)} ${p(size * .3, size * .3)} ${p(size * .55, -1)}Z" fill="${cols[i % cols.length]}" stroke="#5a1a06" stroke-width=".6"/>`;
  }
  return s;
}

// coiling dragon, head up and facing out of the banner
const BODY = 'M20 112C16 100 30 94 34 86C40 74 20 72 22 60C24 48 46 52 52 42C56 34 50 29 40 30';
const claw = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0l7 1" stroke="#3a2408" stroke-width="3" stroke-linecap="round"/><path d="M0 0l7 1" stroke="var(--civ)" stroke-width="1.700" stroke-linecap="round"/>
  <path d="M7 1l4-3M7 1l4.500 1M7 1l3 3.500" stroke="#3a2408" stroke-width="1.100" stroke-linecap="round"/></g>`;
const dragon = `
  <path d="${BODY}" fill="none" stroke="#3a2408" stroke-width="8.500" stroke-linecap="round"/>
  <path d="${BODY}" fill="none" stroke="var(--civ)" stroke-width="6.500" stroke-linecap="round"/>
  <path d="${BODY}" fill="none" stroke="#8a5a10" stroke-width="6" stroke-dasharray="1.600 2.600" opacity=".55"/>
  <path d="${BODY}" fill="none" stroke="#fff6c8" stroke-width="1" opacity=".6" transform="translate(-1.300 -1.300)"/>
  <path d="M20 112l-7 5 7-1-2 7 5-6 2 5 1-9z" fill="var(--civ)" stroke="#3a2408" stroke-width=".8" stroke-linejoin="round"/>
  ${claw(32, 90, 30)}${claw(23, 66, 160)}${claw(50, 46, -10)}
  <g transform="translate(38 14)">
    <path d="M2 14l-8-6 3 7-8 1 7 4-6 4 9-2z" fill="#d79a1c" stroke="#3a2408" stroke-width=".7" stroke-linejoin="round"/>
    <path d="M0 16C0 8 6 3 13 4L30 6C32 8 31 10 28 10L18 11L27 14C26 17 20 18 15 16C10 20 3 21 0 16Z" fill="var(--civ)" stroke="#3a2408" stroke-width="1" stroke-linejoin="round"/>
    <path d="M19 11l1.500 2 1.500-2" fill="#fff" stroke="none"/>
    <path d="M8 5C6-2 10-6 16-7M12 4C12-1 16-4 21-4" fill="none" stroke="#3a2408" stroke-width="2.600" stroke-linecap="round"/>
    <path d="M8 5C6-2 10-6 16-7M12 4C12-1 16-4 21-4" fill="none" stroke="var(--civ)" stroke-width="1.400" stroke-linecap="round"/>
    <circle cx="14" cy="7" r="1.600" fill="#2a0505"/><circle cx="14.500" cy="6.500" r=".5" fill="#fff"/>
    <path class="cwh" d="M28 7C34 2 38 8 43 3M24 14C31 19 36 14 41 19" fill="none" stroke="var(--civ)" stroke-width="1" stroke-linecap="round"/>
  </g>`;

const standard = `<svg width="140" height="188" viewBox="0 0 140 188"><g transform="translate(-3 0) scale(1.250)">
  <defs><clipPath id="chTri"><path d="M14 8H98L14 126Z"/></clipPath>
  <linearGradient id="chSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#000" stop-opacity=".25"/><stop offset=".8" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <g class="unroll" style="--d:1.350"><g class="cflut">
    ${flames(98, 8, 14, 126, 11, 13, ['var(--civ)', '#ff7a1a'])}
    <g clip-path="url(#chTri)">
      <rect width="112" height="130" fill="var(--civ3)"/>
      <path d="M18 13H88L18 111Z" fill="none" stroke="var(--civ)" stroke-width="1.400" opacity=".9"/>
      ${dragon}
      <rect class="csheen" x="-112" width="336" height="130" fill="url(#chSh)"/>
    </g>
    <path d="M14 8H98L14 126Z" fill="none" stroke="#3a0606" stroke-width="1.200" stroke-linejoin="round"/>
  </g></g>
  <g class="pc" style="--dx:-40px;--d:1.150">
    <rect x="10" y="4" width="92" height="4.500" rx="2" fill="#d9a94e" stroke="#5a3d10" stroke-width=".7"/><circle cx="103" cy="6.200" r="3.400" fill="#f0c66e" stroke="#5a3d10" stroke-width=".7"/>
    <g class="ctas"><path d="M103 9.500v6" stroke="#5a1a06" stroke-width="1.200"/><circle cx="103" cy="17" r="2.400" fill="#f0c66e" stroke="#5a3d10" stroke-width=".6"/><path d="M100.500 19h5l2 17h-9z" fill="#d4232a" stroke="#5a0a0a" stroke-width=".6"/></g>
  </g>
</g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <g class="unroll" style="--d:1.600"><g class="cflut" style="animation-delay:-2s">
    ${flames(31, 7, 4, 52, 6, 6.500, ['var(--civ)', '#ff7a1a'])}
    <path d="M4 7H31L4 52Z" fill="var(--civ3)" stroke="#3a0606" stroke-width=".8" stroke-linejoin="round"/>
    <path d="M7 10H25L7 38Z" fill="none" stroke="var(--civ)" stroke-width=".9"/>
    <circle cx="11.500" cy="17" r="3.200" fill="var(--civ)" stroke="#3a2408" stroke-width=".7"/>
  </g></g>
  <rect x="2" y="3" width="31" height="4" rx="2" fill="#d9a94e" stroke="#5a3d10" stroke-width=".6"/>
</svg>`;

// red silk swag in front of the lintel, rosettes at the hang points, tassels hanging over the pillars
const swag = (x0, x1, i) => { const m = (x0 + x1) / 2; return `<path class="cswag" style="--i:${i}" d="M${x0} -12Q${m} 6 ${x1} -12L${x1} -7Q${m} 17 ${x0} -7Z" fill="#c8161d" stroke="#5a0a0a" stroke-width=".8"/>
  <path d="M${x0} -9Q${m} 10 ${x1} -9" fill="none" stroke="var(--civ)" stroke-width="1" opacity=".85"/>`; };
const rosette = (x, d, tassel) => `<g class="pc" style="--sc:.1;--r:120deg;--d:${d};--o:0">
  ${tassel ? `<g class="ctas2"><path d="M${x} -6v14" stroke="#5a0a0a" stroke-width="1.200"/><circle cx="${x}" cy="10" r="2.600" fill="var(--civ)" stroke="#5a3d10" stroke-width=".6"/><path d="M${x - 3.500} 12.500h7l2.500 26h-12z" fill="#d4232a" stroke="#5a0a0a" stroke-width=".6"/><path d="M${x - 1.500} 15v22M${x + 1.500} 15v22" stroke="#000" stroke-opacity=".25" stroke-width=".7"/><rect x="${x - 4}" y="16" width="8" height="2.500" fill="var(--civ)"/></g>` : ''}
  ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="${x}" cy="-14" rx="3.200" ry="5.500" transform="rotate(${a} ${x} -10)" fill="#e0262c" stroke="#5a0a0a" stroke-width=".6"/>`).join('')}
  <circle cx="${x}" cy="-10" r="3" fill="var(--civ)" stroke="#5a3d10" stroke-width=".7"/>
</g>`;
const frame = `<g class="fin" style="--d:1.500">${swag(-11, 133, 0)}${swag(133, 267, 1)}${swag(267, 411, 2)}</g>
${rosette(-11, 1.2, true)}${rosette(133, 1.28, false)}${rosette(267, 1.34, false)}${rosette(411, 1.4, true)}`;

const costume = {
  front: `
  <g class="cplume">${Array.from({ length: 15 }, (_, i) => { const a = -75 + i * 10.700, rad = a * Math.PI / 180, L = 22 + (i % 3) * 3;
    return `<path d="M70 7Q${f1(70 + Math.sin(rad) * L * .45)} ${f1(1 - L * .25)} ${f1(70 + Math.sin(rad) * L)} ${f1(9 + Math.cos(rad) * L * .5)}" fill="none" stroke="${['#d4232a', '#b0141a', '#ec3b3b'][i % 3]}" stroke-width="2.400" stroke-linecap="round"/>`; }).join('')}</g>
  <path d="M68 16L70 3L72 16Z" fill="#e8c06a" stroke="#5a3d10" stroke-width=".8"/><circle cx="70" cy="8.500" r="2.400" fill="#e8c06a" stroke="#5a3d10" stroke-width=".7"/>
  <path d="M42 46C42 26 54 16 70 16S98 26 98 46Z" fill="#7d848c" stroke="#1a1d20" stroke-width="1.300"/>
  <path d="M50 26Q70 20 90 26M46 34Q70 28 94 34M44 41Q70 36 96 41" fill="none" stroke="#3a4046" stroke-width="5.500" stroke-dasharray="3.400 1.100" opacity=".55"/>
  <path d="M50 26Q70 20 90 26M46 34Q70 28 94 34" fill="none" stroke="#c9d1d8" stroke-width=".8" opacity=".6"/>
  <path d="M52 28c3-6 8-9 14-10" fill="none" stroke="#e6ecf0" stroke-width="1.500" stroke-linecap="round" opacity=".75"/>
  <path d="M66 16h8l-1 4h-6z" fill="#e8c06a" stroke="#5a3d10" stroke-width=".7"/>
  <path d="M38 44h8v19l-8 4zM102 44h-8v19l8 4z" fill="#6c737b" stroke="#1a1d20" stroke-width="1" stroke-linejoin="round"/>
  <path d="M38 49h8M38 54h8M38 59h8M102 49h-8M102 54h-8M102 59h-8" stroke="#2a2f34" stroke-width="1"/>
  <path d="M40 43h60v6H40z" fill="#e8c06a" stroke="#5a3d10" stroke-width="1"/>
  <path d="M65 43h10l-1 7.500h-8z" fill="#d4232a" stroke="#5a0a0a" stroke-width=".8"/>
  <g fill="#5a3d10"><circle cx="46" cy="46" r="1"/><circle cx="56" cy="46" r="1"/><circle cx="84" cy="46" r="1"/><circle cx="94" cy="46" r="1"/></g>`,
};

const css = `
#stage[data-civ=chinese]{--eaglz:#e3a91d}
#stage[data-civ=chinese] .gob.dressed .tuft{opacity:0}
#stage[data-civ=chinese] .cflut{transform-box:fill-box;transform-origin:0 0;animation:cFlut 3.400s ease-in-out infinite}
@keyframes cFlut{0%,100%{transform:skewY(-2deg) scaleX(.96)}50%{transform:skewY(2.500deg) scaleX(1.010)}}
#stage[data-civ=chinese] .cfl{transform-box:fill-box;transform-origin:0 0;animation:cFl calc(.7s + var(--i)*.04s) ease-in-out infinite alternate}
@keyframes cFl{to{transform:scale(1.120) rotate(4deg)}}
#stage[data-civ=chinese] .csheen{animation:cSheen 4.400s linear infinite}
@keyframes cSheen{from{transform:translateX(0)}to{transform:translateX(33.330%)}}
#stage[data-civ=chinese] .cwh{animation:cWh 2.600s ease-in-out infinite alternate}
@keyframes cWh{to{d:path("M28 7C34 6 38 2 43 6M24 14C31 12 36 20 41 15")}}
#stage[data-civ=chinese] :is(.ctas,.ctas2){transform-box:fill-box;transform-origin:50% 0;animation:cTas 2.200s ease-in-out infinite alternate}
@keyframes cTas{from{transform:rotate(-6deg)}to{transform:rotate(7deg)}}
#stage[data-civ=chinese] .cswag{animation:cSwag 4s calc(var(--i)*-1.300s) ease-in-out infinite alternate}
@keyframes cSwag{to{translate:0 1.500px}}
#stage[data-civ=chinese] .cplume{transform-box:fill-box;transform-origin:50% 0;animation:cPlume 2.400s ease-in-out infinite alternate}
@keyframes cPlume{from{transform:rotate(-5deg) scaleY(.95)}to{transform:rotate(6deg) scaleY(1.050)}}
`;

export default {
  id: 'chinese', name: 'Chinese', kit: 'eastasia',
  accent: '#ffd23f', accent2: '#d99a00', cloth: '#b3141b', metal: '#e8c06a',
  standard, pennant, costume, css, frame,
};
