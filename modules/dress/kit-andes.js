// KIT: Andes (Incas, Muisca, Mapuche, Tupi). Fitted polygonal ashlar, woven cotton and alpaca, knotted cords, feathers.
// The camera frame is a trapezoidal doorway: the jambs taper inward toward the top and are built from fitted
// polygonal stones that fly in course by course from the bottom up; a woven tocapu band runs across the lintel,
// knotted quipu cords hang from the sill and sway, a feather-tufted pole on the right carries the civ's standard
// from its crossbar. Secular material culture only. All drawings are our own.

// a feather drawn from its base (0,0) upward; wrap it in a <g transform> to place it
export const plume = (len, w, fill, tip, cls = 'af', i = 0) => `<g class="${cls}" style="--i:${i}">
  <path d="M0 0C${w} ${-len * .25} ${w * 1.05} ${-len * .78} ${w * .2} ${-len}C${-w * .9} ${-len * .82} ${-w} ${-len * .25} 0 0z" fill="${fill}" stroke="#0007" stroke-width=".6"/>
  ${tip ? `<path d="M${w * .2} ${-len}C${w * .95} ${-len * .9} ${w * .95} ${-len * .7} ${w * .7} ${-len * .6}C${w * .1} ${-len * .66} ${-w * .75} ${-len * .64} ${-w * .85} ${-len * .62}C${-w * .9} ${-len * .8} ${-w * .4} ${-len * .95} ${w * .2} ${-len}z" fill="${tip}"/>` : ''}
  <path d="M0 0Q${w * .15} ${-len * .5} ${w * .2} ${-len * .96}" fill="none" stroke="#0006" stroke-width=".7"/></g>`;

// tocapu: one woven square (x,y, size s), k picks colours and motif. No motif is a symbol: checks, steps, frames, bars, lozenges.
const MOT = ['M0 0h6v6H0zM6 6h6v6H6z', 'M0 12V8h4V4h4V0h4v4H8v4H4v4z', 'M1 1h10v10H1zM4 4v4h4V4z', 'M0 1h12v2H0zM0 5h12v2H0zM0 9h12v2H0z',
  'M6 0l6 6-6 6-6-6zM6 3L3 6l3 3 3-3z', 'M0 0h4v4H0zM8 0h4v4H8zM0 8h4v4H0zM8 8h4v4H8zM5 5h2v2H5z'];
const CELL = [['var(--civ)', '#1b1410'], ['#1b1410', 'var(--civ)'], ['var(--civ3)', '#efe4cc'], ['#efe4cc', 'var(--civ3)'], ['#1b1410', '#efe4cc'], ['var(--civ3)', '#1b1410']];
export const tocapu = (x, y, s, k) => { const [bg, fg] = CELL[k % 6];
  return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${bg}"/><path transform="translate(${x + s * .125} ${y + s * .125}) scale(${(s * .75 / 12).toFixed(3)})" d="${MOT[(k + Math.floor(k / 6)) % 6]}" fill="${fg}" fill-rule="evenodd"/>`; };

// deterministic random
let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// ---------- jambs: outer edge leans in from x -40 (bottom) to -22 (top), inner edge from 0 to 14: a trapezoidal opening ----------
const xo = (y) => -22 - 18 * ((y + 12) / 253);
const xi = (y) => 14 - 14 * (y / 225);
const pt = ([t, y]) => `${(xo(y) + (xi(y) - xo(y)) * t).toFixed(1)} ${y}`;
// [polygon in (t across the jamb, y), course]; shared vertices so the stones fit like Inca masonry
const STONES = [
  [[[0, 201], [.55, 196], [1, 205], [1, 241], [0, 241]], 0],
  [[[0, 150], [.35, 158], [.55, 196], [0, 201]], 1],
  [[[.35, 158], [1, 152], [1, 205], [.55, 196]], 1],
  [[[0, 96], [.6, 90], [1, 99], [1, 152], [.35, 158], [0, 150]], 2],
  [[[0, 38], [.45, 46], [.6, 90], [0, 96]], 3],
  [[[.45, 46], [1, 41], [1, 99], [.6, 90]], 3],
  [[[0, -12], [1, -12], [1, 41], [.45, 46], [0, 38]], 4],
];
const jamb = (side) => STONES.map(([poly, c], i) => {
  const dx = (-60 - rnd() * 70).toFixed(0), dy = ((rnd() - .5) * 80).toFixed(0), r = ((rnd() - .5) * 70).toFixed(0);
  const d = (.12 + c * .09 + side * .04 + (i % 2) * .03).toFixed(2);
  const poly2 = poly.map(pt);
  return `<g class="pc" style="--dx:${dx}px;--dy:${dy}px;--r:${r}deg;--d:${d};--o:.1"><path class="ast" d="M${poly2.join('L')}z" fill="url(#anS${(i + side) % 3})" filter="url(#anSp)"/>
    <path d="M${poly2.slice(0, 2).join('L')}" fill="none" stroke="#e4dccb" stroke-width=".9" opacity=".45" transform="translate(.8 1.4)"/></g>`;
}).join('');

// ---------- quipu: a main cord under the sill with knotted pendant cords ----------
const CORD = ['#efe4cc', '#7a5232', 'var(--civ3)', '#2a1d14', '#c9a77a', 'var(--civ)'];
function quipu() {
  let s = '<path d="M-42 247Q200 256 442 247" fill="none" stroke="#5a3a22" stroke-width="2.600" stroke-linecap="round"/><path d="M-42 246.200Q200 255 442 246.200" fill="none" stroke="#c9a77a" stroke-width=".8" opacity=".6"/>';
  for (let i = 0, x = -34; x <= 436; x += 14, i++) {
    const t = (x + 42) / 484, y0 = 247 + 18 * t * (1 - t), len = 16 + rnd() * 22, col = CORD[(i * 5 + (i >> 2)) % CORD.length];
    let knots = ''; const nk = 1 + Math.floor(rnd() * 3);
    for (let k = 0; k < nk; k++) knots += `<ellipse cx="0" cy="${(4 + k * 4 + rnd() * 3).toFixed(1)}" rx="1.900" ry="1.500" fill="${col}" stroke="#0009" stroke-width=".6"/>`;
    if (rnd() < .5) knots += `<ellipse cx="0" cy="${(len * .72).toFixed(1)}" rx="1.700" ry="2.400" fill="${col}" stroke="#0009" stroke-width=".6"/>`;
    s += `<g transform="translate(${x} ${y0.toFixed(1)})"><g class="aq" style="--i:${i};--k:${rnd().toFixed(2)}">
      <path d="M0 0V${len.toFixed(1)}" stroke="#0008" stroke-width="2.400" stroke-linecap="round"/><path d="M0 0V${len.toFixed(1)}" stroke="${col}" stroke-width="1.500" stroke-linecap="round"/>${knots}
      <path d="M0 ${len.toFixed(1)}l-1.500 4M0 ${len.toFixed(1)}v4.500M0 ${len.toFixed(1)}l1.500 4" stroke="${col}" stroke-width=".8"/></g></g>`;
  }
  return s;
}

// ichu grass tufts at the foot of the jambs
const grass = (x, y, flip, i) => `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><g class="agr" style="--i:${i}">
  ${[[-6, -14, -3], [-2, -20, -1], [1, -17, 3], [4, -12, 6], [-4, -10, -6], [2, -22, 1]].map(([a, h, b]) => `<path d="M${a * .3} 0Q${a} ${h * .5} ${a + b} ${h}" fill="none" stroke="${h < -15 ? '#d9c27a' : '#a8914a'}" stroke-width="1.300" stroke-linecap="round"/>`).join('')}</g></g>`;

// tocapu band across the lintel
const BAND = Array.from({ length: 23 }, (_, k) => tocapu(16 + k * 16, -19, 16, k)).join('');

const frame = `
<defs>
  <radialGradient id="anS0" cx=".42" cy=".36" r=".75"><stop offset="0" stop-color="#a7a195"/><stop offset=".6" stop-color="#7b756b"/><stop offset="1" stop-color="#4a453f"/></radialGradient>
  <radialGradient id="anS1" cx=".4" cy=".34" r=".78"><stop offset="0" stop-color="#9c968a"/><stop offset=".6" stop-color="#706a61"/><stop offset="1" stop-color="#433e38"/></radialGradient>
  <radialGradient id="anS2" cx=".45" cy=".38" r=".72"><stop offset="0" stop-color="#b0a99c"/><stop offset=".6" stop-color="#857e72"/><stop offset="1" stop-color="#524c45"/></radialGradient>
  <linearGradient id="anL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3ac9f"/><stop offset=".5" stop-color="#7c766b"/><stop offset="1" stop-color="#47423b"/></linearGradient>
  <linearGradient id="anPole" x1="0" x2="1"><stop offset="0" stop-color="#a87a4a"/><stop offset=".5" stop-color="#6e4a2a"/><stop offset="1" stop-color="#3a2614"/></linearGradient>
  <linearGradient id="anShine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <clipPath id="anBandClip"><rect x="16" y="-19" width="368" height="16"/></clipPath>
  <filter id="anSp" x="-.05" y="-.05" width="1.100" height="1.100"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .06  0 0 0 0 .055  0 0 0 0 .05  0 0 0 -2.200 1.100"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<g class="pc" style="--dy:80px;--d:0;--o:.1">
  <path class="ast" d="M-50 226L182 223L198 249H-46z" fill="url(#anS1)" filter="url(#anSp)"/><path class="ast" d="M182 223L450 226L446 249H198z" fill="url(#anS0)" filter="url(#anSp)"/>
  <path d="M-48 227.500L181 224.500M184 224.500L448 227.500" stroke="#e4dccb" stroke-width=".9" opacity=".5"/>
</g>
${jamb(0)}
<g transform="translate(400 0) scale(-1 1)">${jamb(1)}</g>
<g class="pc" style="--dy:-120px;--r:4deg;--d:.62;--o:.1">
  <path class="ast" d="M-50 -20L-43 -28H443L450 -20L448 5H-48z" fill="url(#anL)" filter="url(#anSp)"/><path d="M-42 -26.500H442" stroke="#e4dccb" opacity=".5"/>
  <path d="M-46 3.500H446" stroke="#000" opacity=".55"/>
  <g class="aweave"><rect x="14" y="-21.500" width="372" height="21" fill="#efe4cc" stroke="#1b1410" stroke-width="1"/>${BAND}
    <path d="M14 -20.200H386M14 -2.300H386" stroke="#1b1410" stroke-width=".8" opacity=".6"/></g>
</g>
<g class="fin" style="--d:2.100" clip-path="url(#anBandClip)"><rect class="ashine" x="-50" y="-22" width="44" height="22" fill="url(#anShine)"/></g>
<g class="unroll" style="--d:1.150">${quipu()}</g>
<g class="fin" style="--d:1.300">${grass(-38, 226, false, 0)}${grass(-22, 225, true, 1)}${grass(438, 226, true, 2)}${grass(422, 225, false, 3)}</g>
<g class="pc" style="--dy:220px;--d:.78;--o:.05">
  <rect x="456" y="-140" width="7" height="392" rx="2.500" fill="url(#anPole)"/><path d="M457.500 -138v388" stroke="#d8ad78" stroke-width=".8" opacity=".5"/>
  ${[-92, 24, 132, 236].map((y) => `<rect x="455" y="${y}" width="9" height="8" rx="1.500" fill="var(--civ3)" stroke="#2a1d14" stroke-width=".7"/><path d="M455 ${y + 2.500}l9 2M455 ${y + 5.500}l9 2" stroke="#efe4cc" stroke-width=".8"/>`).join('')}
  ${[70, 196].map((y) => `<path d="M${(400 - xo(y) - 2).toFixed(1)} ${y - 4}L458 ${y - 2}M${(400 - xo(y) - 2).toFixed(1)} ${y + 2}L458 ${y + 3}" stroke="#5a3a22" stroke-width="2.200"/><path d="M${(400 - xo(y) - 2).toFixed(1)} ${y - 4}L458 ${y - 2}M${(400 - xo(y) - 2).toFixed(1)} ${y + 2}L458 ${y + 3}" stroke="#c9a77a" stroke-width=".8" stroke-dasharray="2 2"/>`).join('')}
  <rect x="450" y="-106" width="106" height="5" rx="2.500" fill="url(#anPole)" stroke="#2a1d14" stroke-width=".6"/>
  <path d="M460 -134L553 -104" stroke="#c9a77a" stroke-width="1.100"/><path d="M454.500 -109.500h10M454.500 -106.500h10M454.500 -103.500h10M454.500 -100.500h10" stroke="#efe4cc" stroke-width="1.300" stroke-linecap="round"/>
</g>
<g transform="translate(459.500 -138)"><g class="pc" style="--sc:.15;--r:-60deg;--d:1.000;--o:0">
  ${[-58, -40, -22, -7, 7, 22, 40, 58].map((a, i) => `<g transform="rotate(${a})">${plume(i % 2 ? 24 : 32, 4, i % 2 ? '#efe4cc' : 'var(--civ)', i % 2 ? '#2a1d14' : 'var(--civ3)', 'af', i)}</g>`).join('')}
  <circle r="4.200" fill="var(--civ3)" stroke="#2a1d14" stroke-width=".8"/><circle r="1.600" fill="var(--civ)"/>
</g></g>
<g transform="translate(554 -102)"><g class="pc" style="--sc:.2;--dy:-30px;--d:1.080;--o:0">
  ${[-14, 0, 14].map((a, i) => `<g transform="rotate(${180 + a})">${plume(i === 1 ? 26 : 19, 3.500, i === 1 ? 'var(--civ)' : '#efe4cc', i === 1 ? 'var(--civ3)' : '#2a1d14', 'af', i + 4)}</g>`).join('')}
  <circle r="3.200" fill="var(--civ3)" stroke="#2a1d14" stroke-width=".7"/>
</g></g>
<g transform="translate(459.500 140)"><g class="pc" style="--sc:.2;--dx:40px;--d:1.120;--o:0">
  ${[-26, -9, 9, 26].map((a, i) => `<g transform="rotate(${180 + a})">${plume(18, 3.200, i % 2 ? 'var(--civ)' : '#efe4cc', i % 2 ? 'var(--civ3)' : '#2a1d14', 'af', i + 8)}</g>`).join('')}
</g></g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const SPECK = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' seed='12' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .85  0 0 0 0 .82  0 0 0 0 .76  0 0 0 -1.300 .55'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
// fitted-stone joints, tileable 180x120
const ASHLAR = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='180' height='120'>
  <g fill='none' stroke-linejoin='round'><g stroke='#000' stroke-opacity='.38' stroke-width='2'><path d='M0 38L46 44L88 36L134 42L180 38M0 84L38 78L96 88L140 80L180 84M88 36L92 0M92 120L96 88M46 44L38 78M134 42L140 80M156 0L160 39M156 120L162 82'/></g>
  <g stroke='#fff' stroke-opacity='.07' stroke-width='1' transform='translate(1 1.500)'><path d='M0 38L46 44L88 36L134 42L180 38M0 84L38 78L96 88L140 80L180 84M88 36L92 0M92 120L96 88M46 44L38 78M134 42L140 80M156 0L160 39M156 120L162 82'/></g></g></svg>`);
const corner = (x, y) => `<g transform='translate(${x} ${y})'><rect width='19' height='19' fill='%23efe4cc' stroke='%23141210' stroke-width='1.200'/><path d='M1.500 1.500h5.300v5.300H1.500zM12.200 1.500h5.300v5.300h-5.300zM6.800 6.800h5.400v5.400H6.800zM1.500 12.200h5.300v5.300H1.500zM12.200 12.200h5.300v5.300h-5.300z' fill='%23c8302a'/><path d='M6.800 1.500h5.400v5.300H6.800zM1.500 6.800h5.300v5.400H1.500zM12.200 6.800h5.300v5.400h-5.300zM6.800 12.200h5.400v5.300H6.800z' fill='%231b1410'/></g>`;
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#141210' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#777166' stroke-width='5.500'/>
  <path d='M1.800 70V1.800H70' fill='none' stroke='#e4dccb' stroke-opacity='.55' stroke-width='1'/><rect x='8.500' y='8.500' width='55' height='55' fill='none' stroke='#efe4cc' stroke-opacity='.45' stroke-width='1'/>
  ${corner(1, 1)}${corner(52, 1)}${corner(1, 52)}${corner(52, 52)}</svg>`.replace(/%23/g, '#'));
// woven band for the panel tops: motifs only (the cell colours come from CSS so they follow the civ)
const MOTIFS = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='12'>${[0, 1, 4, 2, 3, 5].map((m, i) =>
  `<path transform='translate(${i * 12 + 1.500} 1.500) scale(.75)' d='${MOT[m]}' fill='${i % 3 ? '#efe4cc' : '#1b1410'}' fill-rule='evenodd'/>`).join('')}</svg>`);
const QUIPU = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='30'><path d='M0 1.200h64' stroke='#5a3a22' stroke-width='2.200'/>
  <g stroke-linecap='round'><path d='M8 1v19' stroke='#efe4cc' stroke-width='1.500'/><path d='M24 1v13' stroke='#c8302a' stroke-width='1.500'/><path d='M40 1v24' stroke='#c9a77a' stroke-width='1.500'/><path d='M56 1v16' stroke='#2a1d14' stroke-width='1.500'/></g>
  <g stroke='#0009' stroke-width='.6'><ellipse cx='8' cy='7' rx='1.900' ry='1.500' fill='#efe4cc'/><ellipse cx='8' cy='12' rx='1.900' ry='1.500' fill='#efe4cc'/><ellipse cx='24' cy='6' rx='1.900' ry='1.500' fill='#c8302a'/>
  <ellipse cx='40' cy='7' rx='1.900' ry='1.500' fill='#c9a77a'/><ellipse cx='40' cy='11' rx='1.900' ry='1.500' fill='#c9a77a'/><ellipse cx='40' cy='18' rx='1.700' ry='2.400' fill='#c9a77a'/><ellipse cx='56' cy='9' rx='1.900' ry='1.500' fill='#2a1d14'/></g></svg>`);
const tuftSvg = (flip) => { const f = [[-50, 22, '#efe4cc', '#2a1d14'], [-28, 28, '#c8302a', '#e0a93a'], [-8, 24, '#2a1d14', '#efe4cc'], [12, 18, '#e0a93a', '#c8302a']]
  .map(([a, l, c, t]) => `<g transform='rotate(${a} 8 30)'><path d='M8 30c3.500-${l * .3} 3.500-${l * .8} .5-${l}c-3.500 ${l * .2}-4 ${l * .7}-.5 ${l}z' fill='${c}' stroke='#0008' stroke-width='.6'/><path d='M8.300 ${30 - l * .62}c2.500-1 2.500-${l * .3} .2-${l * .38}c-2.500 ${l * .1}-3 ${l * .28}-.2 ${l * .38}z' fill='${t}'/></g>`).join('');
  return svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34'><g ${flip ? "transform='translate(34 0) scale(-1 1)'" : ''}>${f}<circle cx='8' cy='29' r='3' fill='#c8302a' stroke='#2a1d14'/></g></svg>`); };
const DOWN = `<svg width="12" height="26" viewBox="-6 -26 12 26"><path d="M0 0C4-5 5-18 1-25C-4-20-5-6 0 0z" fill="currentColor" stroke="#0006" stroke-width=".6"/><path d="M0 0Q.5-12 1-24" fill="none" stroke="#0005" stroke-width=".7"/></svg>`;
const KNOT = `<svg width="10" height="34" viewBox="-5 0 10 34"><path d="M0 0C3 9-3 18 0 33" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><ellipse cx=".6" cy="9" rx="2.600" ry="2" fill="currentColor" stroke="#0008" stroke-width=".6"/><ellipse cx="-.4" cy="20" rx="2.600" ry="2" fill="currentColor" stroke="#0008" stroke-width=".6"/></svg>`;

const css = `
#stage[data-kit=andes] .dplate{color:#f4ead6;text-shadow:0 1px 0 #000;border:1px solid #efe4cc55;outline:1px solid #140d08;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,.2) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(255,240,215,.05) 0 2px,transparent 2px 5px),linear-gradient(180deg,#5d3d27,#2c1b11);
  box-shadow:inset 6px 0 0 var(--civ3),inset 8px 0 0 #efe4cc,inset 0 -3px 0 #0007,0 6px 10px #000a}
#stage[data-kit=andes] .dplate .mark{margin-left:6px}
#stage[data-kit=andes] .dplate span{font-family:'Rubik Mono One',sans-serif;font-size:14px;letter-spacing:.02em;color:var(--civ);text-shadow:0 0 10px color-mix(in srgb,var(--civ) 55%,transparent),0 1px 0 #000}
#stage[data-kit=andes] .dplate::after{content:'';position:absolute;left:14px;right:10px;top:100%;height:6px;background:repeating-linear-gradient(90deg,#d8ccb2 0 1.500px,transparent 1.500px 4px)}

/* frame */
#stage[data-kit=andes] .dframe .ast{stroke:#1d1a17;stroke-width:2.200;stroke-linejoin:round}
#stage[data-kit=andes] .af{transform-box:fill-box;transform-origin:50% 100%;animation:anFeather calc(2.600s + var(--i)*.17s) calc(var(--i)*-.41s) ease-in-out infinite alternate}
@keyframes anFeather{from{transform:rotate(-5deg)}to{transform:rotate(6deg)}}
#stage[data-kit=andes] .dframe .aq{transform-box:fill-box;transform-origin:50% 0;animation:anCord calc(2.300s + var(--k)*1.700s) calc(var(--i)*-.31s) ease-in-out infinite alternate}
@keyframes anCord{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
#stage[data-kit=andes] .dframe .agr{transform-box:fill-box;transform-origin:50% 100%;animation:anGrass calc(2.800s + var(--i)*.4s) ease-in-out infinite alternate}
@keyframes anGrass{from{transform:skewX(-8deg)}to{transform:skewX(10deg)}}
#stage[data-kit=andes] .dframe .ashine{animation:anShine 6s 1s ease-in-out infinite}
@keyframes anShine{0%{transform:translateX(0)}45%,100%{transform:translateX(470px)}}
#stage[data-kit=andes] .aweave{transform-box:fill-box;transform-origin:0 50%}
#stage[data-kit=andes] [data-mod=dress][data-phase=in] .aweave{animation:anWeave .9s 1.050s cubic-bezier(.3,1.150,.45,1) both}
@keyframes anWeave{from{transform:scaleX(0)}to{transform:none}}
#stage[data-kit=andes] .acs{transform-box:fill-box;transform-origin:50% 0;animation:anCloth calc(2.600s + var(--k,0)*1s) ease-in-out infinite alternate}
@keyframes anCloth{from{transform:skewX(-3deg) rotate(-1.500deg)}to{transform:skewX(3deg) rotate(1.500deg)}}
/* high-altitude light: cold bright sky from above, the doorway's slanted sides in shade, a cloud shadow passing */
#stage[data-kit=andes] .dshade{box-shadow:inset 0 0 46px rgba(0,0,0,.58);overflow:hidden;
  background:linear-gradient(180deg,rgba(225,238,255,.2),transparent 38%),linear-gradient(97deg,rgba(0,0,0,.42),transparent 13%),linear-gradient(-97deg,rgba(0,0,0,.42),transparent 13%)}
#stage[data-kit=andes] .dshade::before{content:'';position:absolute;top:-20%;bottom:-20%;left:0;width:60%;
  background:radial-gradient(closest-side,rgba(10,12,20,.26),transparent);animation:anCloud 17s linear infinite}
@keyframes anCloud{from{transform:translateX(-110%)}to{transform:translateX(190%)}}

/* panels: fitted dark ashlar, stone rim with checked tocapu corners, a woven band with feather tufts on top, quipu cords below */
#stage.skinned[data-kit=andes] .pn.kd:not(.mu){
  background:${ASHLAR},${SPECK},linear-gradient(180deg,rgba(62,58,53,calc(var(--glass,.55)*1.35)),rgba(24,22,20,calc(var(--glass,.55)*1.36)));background-blend-mode:normal,soft-light,normal;
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,calc(var(--glass,.55)*1.28)),inset 0 0 36px rgba(0,0,0,.5)}
#stage.skinned[data-kit=andes] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=andes] .pn.kd>.kd-t{height:16px;margin:0 30px -6px;box-shadow:0 2px 3px rgba(0,0,0,.6);
  background:linear-gradient(#efe4cc 0 2px,transparent 2px calc(100% - 2px),#efe4cc 0),${MOTIFS} 0 2px repeat-x,
    repeating-linear-gradient(90deg,var(--civ) 0 12px,#1b1410 12px 24px,var(--civ3) 24px 36px)}
#stage.skinned[data-kit=andes] .pn.kd>.kd-t::before,#stage.skinned[data-kit=andes] .pn.kd>.kd-t::after{content:'';position:absolute;bottom:-2px;width:34px;height:34px;
  transform-origin:25% 90%;animation:anTuft 3.200s ease-in-out infinite alternate}
#stage.skinned[data-kit=andes] .pn.kd>.kd-t::before{left:-30px;background:${tuftSvg(false)} 0 0/34px 34px no-repeat}
#stage.skinned[data-kit=andes] .pn.kd>.kd-t::after{right:-30px;background:${tuftSvg(true)} 0 0/34px 34px no-repeat;transform-origin:75% 90%;animation-delay:-1.400s}
@keyframes anTuft{from{transform:rotate(-4deg)}to{transform:rotate(5deg)}}
#stage.skinned[data-kit=andes] .pn.kd>.kd-b{height:30px;margin:-3px 28px 0;background:${QUIPU} 0 0 repeat-x;transform-origin:50% 0;animation:fin .8s .15s both,anQuipu 2.700s ease-in-out infinite alternate}
@keyframes anQuipu{from{transform:skewX(-6deg)}to{transform:skewX(6deg)}}
#stage.skinned[data-kit=andes] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}

/* down feathers tumbling, highland mist drifting on the sides */
#stage[data-kit=andes] .p.dwn{color:#efe4cc;animation:anFall var(--dur) var(--del) linear infinite,anTumble calc(2s + var(--k)*1.600s) ease-in-out infinite alternate}
#stage[data-kit=andes] .p.dwn:nth-child(3n){color:var(--civ)}#stage[data-kit=andes] .p.dwn:nth-child(4n+1){color:var(--civ3)}
#stage[data-kit=andes] .p.dwn svg{display:block;width:calc(var(--s)*1.200);height:calc(var(--s)*2.600)}
@keyframes anFall{0%{transform:translate3d(0,-160px,0);opacity:0}10%{opacity:.85}88%{opacity:.85}100%{transform:translate3d(calc(var(--j)*90px),440px,0);opacity:0}}
@keyframes anTumble{from{rotate:-50deg;translate:-14px 0}to{rotate:60deg;translate:14px 0}}
#stage[data-kit=andes] .p.mist{width:calc(var(--s)*40);height:calc(var(--s)*9);border-radius:50%;background:radial-gradient(closest-side,rgba(236,240,246,.16),transparent);
  animation:anMist var(--dur) var(--del) linear infinite}
@keyframes anMist{0%{transform:translate3d(-240px,0,0);opacity:0}25%{opacity:calc(.5 + var(--k)*.5)}75%{opacity:calc(.5 + var(--k)*.5)}100%{transform:translate3d(260px,calc(var(--j)*24px),0);opacity:0}}
/* burst: knotted cords flung out of the doorway */
#stage[data-kit=andes] .p.cb{color:var(--civ);animation:anBurst 1.500s var(--del) cubic-bezier(.15,.7,.3,1) both}
#stage[data-kit=andes] .p.cb:nth-child(3n){color:var(--civ3)}#stage[data-kit=andes] .p.cb:nth-child(3n+1){color:#efe4cc}
#stage[data-kit=andes] .p.cb svg{display:block;width:calc(var(--s)*1.100);height:calc(var(--s)*3.400)}
@keyframes anBurst{0%{transform:rotate(calc(var(--k)*360deg)) translateY(0) scale(.2);opacity:0}15%{opacity:1}100%{transform:rotate(calc(var(--k)*360deg + var(--j)*90deg)) translateY(calc(-240px - var(--k)*340px)) scale(1.100);opacity:0}}
`;

export default {
  id: 'andes',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap',
  frame, css,
  mount: { x: 462, y: -101 }, // the civ's standard hangs from the crossbar: its top edge = y 0, width up to 90
  perch: 30, // hands on the lintel, over the right end of the tocapu band
  particles: [{ cls: 'dwn', n: 16, zone: 'sides', size: [7, 11], dur: [12, 20], html: DOWN }, { cls: 'mist', n: 6, zone: 'sides', size: [4, 7], dur: [16, 26] }],
  burst: [{ cls: 'cb', n: 34, zone: [170, 640, 110, 90], size: [8, 12], dur: [1, 1], spread: .5, html: KNOT }],
};
