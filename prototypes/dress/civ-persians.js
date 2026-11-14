// CIV layer: Persians (kit: mideast). Lapis-turquoise accent, lapis-blue cloth, gold. A peacock-feather fan
// standard on the pole, a knotted carpet draped over the lintel, polo mallets and a ball leaning by the pole,
// a tall fluted cap-crown with streaming ribbons for the mascot. All drawings are our own.
import { dia } from './kit-mideast.js';

const GOLD = '#e6c06a';
const P = (n) => +n.toFixed(2);

// a peacock feather drawn from its base (0,0) upward, with its eye near the tip
const plume = (len, w, i) => `<g class="pefe" style="--i:${i}">
  <path d="M0 ${P(-len * .2)}C${w} ${P(-len * .42)} ${P(w * 1.25)} ${P(-len * .8)} 0 ${P(-len - 5)}C${P(-w * 1.25)} ${P(-len * .8)} ${-w} ${P(-len * .42)} 0 ${P(-len * .2)}z" fill="url(#peVane)" opacity=".92"/>
  <path d="M0 0V${P(-len + 2)}" stroke="#f1dfae" stroke-width="1.100"/>
  <path d="${[.35, .45, .55, .65].map((t) => `M0 ${P(-len * t)}l${P(w * .9)} ${P(-len * .07)}M0 ${P(-len * t)}l${P(-w * .9)} ${P(-len * .07)}`).join('')}" stroke="#f6e3a8" stroke-width=".5" opacity=".7"/>
  <ellipse cy="${P(-len + 6)}" rx="${P(w * .95)}" ry="${P(w * 1.2)}" fill="#c9962e"/>
  <ellipse cy="${P(-len + 6.5)}" rx="${P(w * .72)}" ry="${P(w * .92)}" fill="var(--civ)"/>
  <ellipse cy="${P(-len + 7.5)}" rx="${P(w * .44)}" ry="${P(w * .58)}" fill="#163a9c"/>
  <ellipse cy="${P(-len + 8)}" rx="${P(w * .22)}" ry="${P(w * .3)}" fill="#060f33"/>
  <circle cx="${P(-w * .25)}" cy="${P(-len + 4.5)}" r="${P(w * .14)}" fill="#fff" opacity=".8"/></g>`;

const angles = [-66, -52.8, -39.6, -26.4, -13.2, 0, 13.2, 26.4, 39.6, 52.8, 66];
const standard = `<svg width="24" height="40" viewBox="0 0 24 40">
  <defs><linearGradient id="peVane" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#6b5524" stop-opacity=".4"/><stop offset=".5" stop-color="#a98a3a"/><stop offset="1" stop-color="#3f7fa8"/></linearGradient></defs>
  <g class="pc" style="--sc:.15;--r:-70deg;--d:1.250">
    ${angles.map((a, i) => { const len = 92 - Math.abs(a) * .36; return `<g transform="translate(12 -18) rotate(${a})">${plume(len, 9.500, i)}</g>`; }).join('')}
  </g>
  <g class="fin" style="--d:1.900">
    <path class="peri a" d="M9 -6C4 6 14 18 6 34L10 35C18 19 8 7 13 -5Z" fill="var(--civ3)" stroke="#0b1a4a" stroke-width=".7"/>
    <path class="peri b" d="M14 -6C20 6 12 16 20 30L24 28C16 15 24 5 18 -6Z" fill="var(--civ)" stroke="#0b1a4a" stroke-width=".7"/>
  </g>
  <g class="pc" style="--sc:.2;--dy:20px;--d:1.100">
    <path d="M3 -22h18l-3 14H6z" fill="${GOLD}" stroke="#5a3e08" stroke-width=".9"/><path d="M4 -19h16M5 -12h14" stroke="#8a611c" stroke-width=".9"/>
    <circle cx="12" cy="-15.500" r="3" fill="var(--civ3)" stroke="${GOLD}" stroke-width=".9"/><circle cx="11.200" cy="-16.300" r=".9" fill="#fff" opacity=".8"/>
    <rect x="6" y="-8" width="12" height="5" rx="1.500" fill="${GOLD}" stroke="#5a3e08" stroke-width=".8"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="8" y="0" width="18" height="8" rx="2" fill="${GOLD}" stroke="#5a3e08"/><circle cx="17" cy="4" r="2" fill="var(--civ3)"/>
  <g class="unroll" style="--d:1.600"><g transform="translate(17 8) rotate(180)">${plume(58, 8, 3)}</g></g>
</svg>`;

// knotted carpet draped over the lintel (left half); polo mallets and a ball leaning by the pole
const cx = 76, cw = 92, top = -27, bot = 12;
const carpet = `<g class="pc" style="--dy:-70px;--sc:.6;--d:1.050;--o:0"><g class="pecar">
  <rect x="${cx - cw / 2}" y="${top}" width="${cw}" height="${bot - top}" fill="var(--civ3)" stroke="#0b1a4a" stroke-width="1.100"/>
  <rect x="${cx - cw / 2 + 7}" y="${top + 6}" width="${cw - 14}" height="${bot - top - 12}" fill="#8e1b22" stroke="${GOLD}" stroke-width="1.200"/>
  <path d="M${cx - cw / 2 + 3} ${top + 3}h${cw - 6}M${cx - cw / 2 + 3} ${bot - 3}h${cw - 6}" stroke="${GOLD}" stroke-width="1" stroke-dasharray="3 2"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${cx - cw / 2 + 3.500}" cy="${top + 4 + i * 4.600}" r="1.100" fill="#f3ead6"/><circle cx="${cx + cw / 2 - 3.500}" cy="${top + 4 + i * 4.600}" r="1.100" fill="#f3ead6"/>`).join('')}
  <path d="${dia(cx, (top + bot) / 2, 14, 26)}" fill="#f3ead6" stroke="${GOLD}" stroke-width="1"/>
  <path d="${dia(cx, (top + bot) / 2, 10, 19)}" fill="var(--civ3)"/>
  <path d="${dia(cx, (top + bot) / 2, 6, 11)}" fill="var(--civ)" class="pegl"/><circle cx="${cx}" cy="${(top + bot) / 2}" r="2.400" fill="#8e1b22"/>
  <path d="M${cx} ${top + 6}v3M${cx} ${bot - 6}v-3" stroke="#f3ead6" stroke-width="2"/>
  ${[[cx - cw / 2 + 7, top + 6, 1, 1], [cx + cw / 2 - 7, top + 6, -1, 1], [cx - cw / 2 + 7, bot - 6, 1, -1], [cx + cw / 2 - 7, bot - 6, -1, -1]].map(([x, y, sx, sy]) => `<path d="M${x} ${y}h${sx * 13}l${-sx * 13} ${sy * 9}z" fill="#f3ead6" opacity=".9"/>`).join('')}
  <g class="pefr" stroke="#f3ead6" stroke-width="1.200" stroke-linecap="round">${Array.from({ length: 23 }, (_, i) => `<path d="M${cx - cw / 2 + 2 + i * 4} ${bot}v6"/>`).join('')}</g>
</g></g>`;
const mallet = (x, y, len, a, d) => `<g transform="translate(${x} ${y}) rotate(${a})"><g class="pc" style="--dy:-60px;--d:${d};--o:0">
  <path d="M0 0V${-len}" stroke="#3a2412" stroke-width="4.200" stroke-linecap="round"/><path d="M0 0V${-len}" stroke="#a8703c" stroke-width="2.600" stroke-linecap="round"/><path d="M-.6 0V${-len}" stroke="#e6c79a" stroke-width=".8" opacity=".8"/>
  <path d="M-2.200 ${-len}h4.400v-14h-4.400z" fill="var(--civ3)" stroke="#0b1a4a" stroke-width=".6"/><path d="M-2.200 ${-len - 4}h4.400M-2.200 ${-len - 9}h4.400" stroke="${GOLD}" stroke-width="1"/>
  <rect x="-20" y="-3" width="25" height="8" rx="4" fill="#c58a4e" stroke="#3a2412" stroke-width="1"/><path d="M-17 -1h19" stroke="#e6c79a" stroke-width=".8" opacity=".7"/></g></g>`;
const frame = `${carpet}
${mallet(432, 206, 118, 7, 1.100)}${mallet(440, 210, 112, 3, 1.180)}
<g transform="translate(424 212)"><g class="pc" style="--sc:.1;--d:1.300;--o:0"><circle r="5" fill="#f3ead6" stroke="#5a4a2a" stroke-width=".8"/><path d="M-3 -1.500a3.500 3.500 0 0 1 3-2" stroke="#fff" fill="none" stroke-width="1"/></g></g>`;

const costume = {
  back: `<path class="perib a" d="M88 24C100 15 112 21 125 10L129 15C116 27 102 21 90 30Z" fill="var(--civ3)" stroke="#0b1a4a" stroke-width=".8"/>
    <path class="perib b" d="M88 31C102 28 113 36 131 29L131 34C113 42 102 34 89 36Z" fill="var(--civ)" stroke="#0b1a4a" stroke-width=".8"/>`,
  front: `
  <path d="M46 44L49 6C58 1 82 1 91 6L94 44Z" fill="var(--civ3)" stroke="#0b1a4a" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M52.500 44l1.500-38M59 44l1-39.500M65.500 44l.5-40.500M74.500 44l-.5-40.500M81 44l-1-39.500M87.500 44l-1.500-38" stroke="#0b1a4a" stroke-width="1.400" opacity=".55"/>
  <path d="M55.750 44l1.250-38.500M70 44V3.500M84.250 44l-1.250-38.500" stroke="${GOLD}" stroke-width="1.100"/>
  <path d="M50 30c1-10 2-18 3-23" stroke="#9fc4ff" stroke-width="1.400" stroke-linecap="round" opacity=".55"/>
  <path d="M48.500 10C58 4 82 4 91.500 10L91 4.500C82-1 58-1 49 4.500Z" fill="${GOLD}" stroke="#5a3e08" stroke-width=".9"/>
  <g fill="#f6f1e2" stroke="#8a7650" stroke-width=".4">${[51, 56, 61.5, 67, 73, 78.500, 84, 89].map((x) => `<circle cx="${x}" cy="${x < 60 || x > 80 ? 2.600 : 1.500}" r="1.600"/>`).join('')}</g>
  <path d="M40 46C46 39 94 39 100 46L99 52C92 46 48 46 41 52Z" fill="${GOLD}" stroke="#5a3e08" stroke-width="1.100" stroke-linejoin="round"/>
  <g fill="var(--civ)" stroke="#0b1a4a" stroke-width=".6"><circle cx="52" cy="45" r="2.300"/><circle cx="88" cy="45" r="2.300"/></g>
  <path d="${dia(70, 44, 4.200, 3.400)}" fill="var(--civ3)" stroke="#5a3e08" stroke-width=".8"/><circle cx="70" cy="44" r="1.500" fill="var(--civ)"/>
  <g fill="#f6f1e2"><circle cx="59" cy="44" r="1.100"/><circle cx="62.500" cy="43.600" r="1.100"/><circle cx="77.500" cy="43.600" r="1.100"/><circle cx="81" cy="44" r="1.100"/></g>`,
};

const css = `
#stage[data-civ=persians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=persians] .pefe{transform-box:fill-box;transform-origin:50% 100%;animation:peFe calc(2.800s + var(--i)*.17s) calc(var(--i)*-.41s) ease-in-out infinite alternate}
@keyframes peFe{from{transform:rotate(-3deg)}to{transform:rotate(3.500deg)}}
#stage[data-civ=persians] .peri.a{animation:peRiA 1.400s ease-in-out infinite alternate}
#stage[data-civ=persians] .peri.b{animation:peRiB 1.150s -.5s ease-in-out infinite alternate}
@keyframes peRiA{to{d:path("M9 -6C14 6 2 18 10 34L14 33C6 19 18 7 13 -5Z")}}
@keyframes peRiB{to{d:path("M14 -6C10 6 22 16 16 30L20 31C26 15 14 5 18 -6Z")}}
#stage[data-civ=persians] .perib.a{animation:peRbA 1.300s ease-in-out infinite alternate}
#stage[data-civ=persians] .perib.b{animation:peRbB 1.100s -.4s ease-in-out infinite alternate}
@keyframes peRbA{to{d:path("M88 24C100 21 112 9 126 14L128 19C114 15 102 27 90 30Z")}}
@keyframes peRbB{to{d:path("M88 31C102 36 114 24 131 33L130 38C114 30 102 42 89 36Z")}}
#stage[data-civ=persians] .pecar{transform-box:fill-box;transform-origin:50% 0;animation:peCar 5.500s ease-in-out infinite}
@keyframes peCar{0%,100%{transform:skewX(0)}50%{transform:skewX(-1.800deg)}}
#stage[data-civ=persians] .pefr{transform-box:fill-box;transform-origin:50% 0;animation:peFr 1.800s ease-in-out infinite alternate}
@keyframes peFr{from{transform:skewX(-10deg)}to{transform:skewX(10deg)}}
#stage[data-civ=persians] .pegl{animation:peGl 4s ease-in-out infinite}
@keyframes peGl{50%{filter:drop-shadow(0 0 4px var(--civ))}}
`;

export default {
  id: 'persians', name: 'Persians', kit: 'mideast',
  accent: '#4fd0ff', accent2: '#1f86d6', cloth: '#1d3f9e', metal: GOLD,
  standard, pennant, costume, css, frame,
};
