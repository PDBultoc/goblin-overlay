// CIV layer: Lithuanians (kit: slavic). Amber accent, red woven cloth. Standard: a woven sash (juosta) looped over
// the birch crossbar, two fringed tails, with strands of amber beads hung beside it (no Vytis, no Columns). Frame: amber
// garlands swagged along the lintel, amber drops on the gable eaves, a woven sash wound round the left board.
// Mascot: a wolf-pelt hood (head on top, pelt falling at the sides). All drawings are our own.

const f1 = (n) => +n.toFixed(1);
// woven sash pattern on a band x0..x0+w from y0 to y1
const weave = (x0, w, y0, y1) => { const cx = x0 + w / 2; let s = '', c = '';
  for (let y = y0 + 4, i = 0; y + 10 <= y1; y += 12, i++) {
    if (i % 2) s += `M${f1(cx)} ${y}l${f1(w * .3)} 5-${f1(w * .3)} 5-${f1(w * .3)}-5z`;
    else c += `M${f1(x0 + 1.500)} ${y + 1}l${f1(w / 2 - 1.500)} 4 ${f1(w / 2 - 1.500)}-4M${f1(x0 + 1.500)} ${y + 6}l${f1(w / 2 - 1.500)} 4 ${f1(w / 2 - 1.500)}-4`; }
  return `<rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" fill="var(--civ3)"/>
    <path d="M${x0 + 1.200} ${y0}V${y1}M${x0 + w - 1.200} ${y0}V${y1}" stroke="#2a1a14" stroke-width="1.400"/><path d="M${x0 + 2.800} ${y0}V${y1}M${x0 + w - 2.800} ${y0}V${y1}" stroke="#f2ead8" stroke-width=".8"/>
    <path d="${s}" fill="#f2ead8" stroke="#2a1a14" stroke-width=".5"/><path d="${c}" fill="none" stroke="#2a1a14" stroke-width="1.100"/>`; };
const sfringe = (x0, x1, y, l) => { let s = ''; for (let x = x0, i = 0; x <= x1 + .1; x += 2.200, i++) s += `<path class="ltfr" style="--i:${i}" d="M${f1(x)} ${y}v${f1(l + (i % 3) * 1.500)}" stroke="${['var(--civ3)', '#f2ead8', '#2a1a14'][i % 3]}"/>`; return s; };
const bead = (x, y, rx, ry) => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${rx}" ry="${ry}" fill="url(#ltAmb)" stroke="#6b3200" stroke-width=".5"/><ellipse cx="${f1(x - rx * .35)}" cy="${f1(y - ry * .35)}" rx="${f1(rx * .3)}" ry="${f1(ry * .25)}" fill="#fff6d0" opacity=".85"/>`;
const strand = (x, y0, n, gap, i, size = 1) => { let s = `<path d="M${x} ${y0}V${y0 + n * gap}" stroke="#7a5a30" stroke-width=".7"/>`;
  for (let k = 0; k < n; k++) s += bead(x + (k % 2 ? .4 : -.4), y0 + gap * (k + .6), f1((2.400 + (k * 7 % 3) * .5) * size), f1((2.900 + (k * 5 % 3) * .4) * size));
  return `<g class="ltstr" style="--i:${i}">${s}</g>`; };
const AMBER = `<radialGradient id="ltAmb" cx=".35" cy=".35" r=".75"><stop offset="0" stop-color="#ffe08a"/><stop offset=".5" stop-color="#f29a1a"/><stop offset="1" stop-color="#8a4200"/></radialGradient>`;

const standard = `<svg width="80" height="236" viewBox="0 0 80 236">
  <defs>${AMBER}<linearGradient id="ltSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".45" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <g class="unroll" style="--d:1.250">${strand(6, 4, 11, 9, 0)}${strand(74, 4, 8, 9, 1)}</g>
  <g class="unroll" style="--d:1.350"><g class="ltsw b">${weave(36, 15, 4, 158)}<rect class="ltsheen" x="30" y="4" width="10" height="154" fill="url(#ltSh)"/>${sfringe(37, 50, 158, 10)}</g></g>
  <g class="unroll" style="--d:1.450"><g class="ltsw">${weave(18, 16, 4, 206)}<rect class="ltsheen" x="12" y="4" width="10" height="202" fill="url(#ltSh)" style="animation-delay:-1.600s"/>${sfringe(19, 33, 206, 12)}
    <g transform="translate(0 0)">${bead(26, 224, 3.400, 4)}</g></g></g>
  <path d="M16 6C16-3 52-3 52 6" fill="none" stroke="var(--civ3)" stroke-width="8"/><path d="M16 6C16-3 52-3 52 6" fill="none" stroke="#f2ead8" stroke-width="1" stroke-dasharray="3 2.500"/>
  <g class="unroll" style="--d:1.550">${strand(62, 4, 13, 8.500, 2, .9)}</g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs>${AMBER.replace('ltAmb', 'ltAmbP')}</defs>
  <rect x="5" y="0" width="24" height="4" rx="2" fill="#e4e0d5" stroke="#6d675b" stroke-width=".6"/>
  <g class="unroll" style="--d:1.600"><g class="ltsw" style="animation-delay:-2s">${weave(10, 14, 4, 54)}${sfringe(11, 23, 54, 8)}
    <ellipse cx="17" cy="68" rx="3.200" ry="3.800" fill="url(#ltAmbP)" stroke="#6b3200" stroke-width=".5"/></g></g>
</svg>`;

// amber garland swagged along the lintel (ends before the mascot's hands)
const swag = (x0, x1, y, sag, n, i) => { let s = `<path d="M${x0} ${y}Q${(x0 + x1) / 2} ${y + sag * 2} ${x1} ${y}" fill="none" stroke="#7a5a30" stroke-width=".7"/>`;
  for (let k = 1; k < n; k++) { const t = k / n, x = x0 + (x1 - x0) * t, yy = y + 4 * sag * t * (1 - t); s += bead(x, yy, 2.300, 2.600); }
  return `<g class="ltswag" style="--i:${i}">${s}</g>`; };
const frame = `
<defs>${AMBER.replace('ltAmb', 'ltAmbF')}</defs>
<g class="pc" style="--dy:-50px;--d:1.050;--o:0" fill="url(#ltAmbF)">
  ${[[2, 72], [72, 144], [144, 216], [216, 284]].map(([a, b], i) => swag(a, b, -16, 6, 9, i)).join('').replaceAll('url(#ltAmb)', 'url(#ltAmbF)')}
  ${[2, 72, 144, 216, 284].map((x) => `<circle cx="${x}" cy="-16" r="2.200" fill="#3b3f44" stroke="#15181b" stroke-width=".6"/>`).join('')}
</g>
<g class="pc" style="--dy:-60px;--d:1.150;--o:0">
  ${(strand(-19, -12, 6, 8, 3) + strand(419, -12, 6, 8, 4)).replaceAll('url(#ltAmb)', 'url(#ltAmbF)')}
</g>
<g class="pc" style="--dx:-60px;--r:-20deg;--d:1.250;--o:0">
  ${[60, 76, 92].map((y) => `<path d="M-23 ${y}l26 -7v9l-26 7z" fill="var(--civ3)" stroke="#2a1a14" stroke-width=".8"/><path d="M-21 ${y + 3.500}l22 -6" stroke="#f2ead8" stroke-width="1" stroke-dasharray="2.500 2"/>`).join('')}
  <g class="ltknot"><path d="M-24 104c-4 2-6 10-4 26l6-1c-1-12 0-20 2-24zM-22 104c2 4 4 14 2 30l6 0c1-14 0-24-4-30z" fill="var(--civ3)" stroke="#2a1a14" stroke-width=".8"/>
    <path d="M-28 130v8M-26 130v9M-24 130v8M-20 134v8M-18 134v9M-16 134v8" stroke="#f2ead8" stroke-width="1" stroke-linecap="round"/>
    <ellipse cx="-22" cy="103" rx="5" ry="4" fill="var(--civ3)" stroke="#2a1a14" stroke-width=".8"/></g>
</g>`;

let k = 3; const r = () => (k = (k * 16807) % 2147483647) / 2147483647;
const furStrokes = (x0, x1, y0, y1, n, col) => { let s = ''; for (let i = 0; i < n; i++) { const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0); s += `M${f1(x)} ${f1(y)}l${f1(-1 + r() * 2)} ${f1(3 + r() * 3)}`; } return `<path d="${s}" stroke="${col}" stroke-width=".9" stroke-linecap="round" fill="none"/>`; };

const costume = {
  front: `
  <path d="M44 38C35 50 32 66 33 88L46 83C45 68 46 56 50 46Z" fill="#6e6a64" stroke="#2a2724" stroke-width="1" stroke-linejoin="round"/>
  <path d="M96 38C105 50 108 66 107 88L94 83C95 68 94 56 90 46Z" fill="#6e6a64" stroke="#2a2724" stroke-width="1" stroke-linejoin="round"/>
  <path d="M33 88l2-4 2 5 2-4 2 4 2-4 3 3M107 88l-2-4-2 5-2-4-2 4-2-4-3 3" fill="none" stroke="#2a2724" stroke-width=".8"/>
  ${furStrokes(35, 45, 50, 82, 14, '#3e3a36')}${furStrokes(95, 105, 50, 82, 14, '#3e3a36')}
  <path d="M47 27L44 3L61 19Z" fill="#77726b" stroke="#2a2724" stroke-width="1" stroke-linejoin="round"/><path d="M48 21L47 8L56 18Z" fill="#3b2f2a"/>
  <path d="M93 27L96 3L79 19Z" fill="#77726b" stroke="#2a2724" stroke-width="1" stroke-linejoin="round"/><path d="M92 21L93 8L84 18Z" fill="#3b2f2a"/>
  <path d="M39 48C39 30 52 16 70 16C88 16 101 30 101 48L95 45 92 49 87 45 82 48 77 45C75 47 73 49 70 52C67 49 65 47 63 45L58 48 53 45 48 49 45 45Z" fill="#7d7871" stroke="#2a2724" stroke-width="1.100" stroke-linejoin="round"/>
  ${furStrokes(44, 96, 20, 40, 34, '#4a4641')}
  <path d="M33 60l-5-3 5-2-6-5 7-1-4-6 7 1M107 60l5-3-5-2 6-5-7-1 4-6-7 1" fill="none" stroke="#6e6a64" stroke-width="2.400" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M58 17C63 25 77 25 82 17C78 15 62 15 58 17Z" fill="#45413c"/>
  <path d="M49 36C53 32 58 31 62 33L60 40C56 38 52 38 49 40ZM91 36C87 32 82 31 78 33L80 40C84 38 88 38 91 40Z" fill="#b8b0a2" opacity=".9"/>
  <path d="M60 24C61 35 65 44 70 51C75 44 79 35 80 24C76 21 64 21 60 24Z" fill="#c9c0b2" stroke="#2a2724" stroke-width=".8"/>
  <path d="M66 26C67 34 68 40 70 45C72 40 73 34 74 26" fill="none" stroke="#8a8378" stroke-width="1"/>
  <path d="M65 45.500h10l-5 6z" fill="#141210" stroke="#000" stroke-width=".5"/><path d="M67 46.500h3" stroke="#6a6560" stroke-width=".8"/>
  <path d="M52 27l9 3.500-8 2.500zM88 27l-9 3.500 8 2.500z" fill="var(--civ)" stroke="#1a0f06" stroke-width=".7" class="lteye"/>
  <path d="M51 25l11 3M89 25l-11 3" stroke="#262320" stroke-width="1.600" stroke-linecap="round"/>
  <path d="M52 22c5-3 12-4 18-4" fill="none" stroke="#b9b3a9" stroke-width="1.200" stroke-linecap="round" opacity=".7"/>`,
};

const css = `
#stage[data-civ=lithuanians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=lithuanians] .ltsw{transform-box:fill-box;transform-origin:50% 0;animation:ltSway 5.300s ease-in-out infinite}
#stage[data-civ=lithuanians] .ltsw.b{animation-duration:6.100s;animation-delay:-2.200s}
@keyframes ltSway{0%,100%{transform:rotate(-2deg) skewX(1.500deg)}50%{transform:rotate(2.600deg) skewX(-2.500deg)}}
#stage[data-civ=lithuanians] .ltsheen{animation:ltSheen 3.800s ease-in-out infinite alternate}
@keyframes ltSheen{from{transform:translateX(0)}to{transform:translateX(16px)}}
#stage[data-civ=lithuanians] .ltfr{fill:none;stroke-width:1.100;stroke-linecap:round;transform-box:fill-box;transform-origin:50% 0;animation:ltFr 1.300s calc(var(--i)*-.19s) ease-in-out infinite alternate}
@keyframes ltFr{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
#stage[data-civ=lithuanians] .ltstr{transform-box:fill-box;transform-origin:50% 0;animation:ltStr calc(2.600s + var(--i)*.4s) calc(var(--i)*-.7s) ease-in-out infinite alternate}
@keyframes ltStr{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
#stage[data-civ=lithuanians] .ltswag{transform-box:fill-box;transform-origin:50% 0;animation:ltSwag calc(3s + var(--i)*.3s) calc(var(--i)*-.8s) ease-in-out infinite alternate}
@keyframes ltSwag{from{transform:rotate(-1.500deg)}to{transform:rotate(1.500deg)}}
#stage[data-civ=lithuanians] .ltstr ellipse:first-of-type,#stage[data-civ=lithuanians] .ltswag ellipse{filter:drop-shadow(0 0 2px color-mix(in srgb,var(--civ) 70%,transparent))}
#stage[data-civ=lithuanians] .lteye{filter:drop-shadow(0 0 2px var(--civ));animation:ltEye 4.500s ease-in-out infinite}
@keyframes ltEye{0%,100%{opacity:1}50%{opacity:.55}}
#stage[data-civ=lithuanians] .ltknot{transform-box:fill-box;transform-origin:50% 0;animation:ltStr 3.200s ease-in-out infinite alternate}
`;

export default {
  id: 'lithuanians', name: 'Lithuanians', kit: 'slavic',
  accent: '#ff9f1c', accent2: '#c25e00', cloth: '#a8232b', metal: '#d9a441',
  standard, pennant, costume, css, frame,
};
