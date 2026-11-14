// CIV layer: Bulgarians (kit: slavic). Crimson accent, red-black weaving. Standard: a woven kilim banner with
// stepped lozenges hung on rings from the birch crossbar, a fringe of silver bells swinging under it (no lion, no
// arms). Frame: a string of drying red peppers down the left board and a folded kilim thrown over the right board.
// Mascot: tall black fur kalpak with a red cloth crown and a silver clasp. All drawings are our own.

const f1 = (n) => +n.toFixed(1);
// woven stepped lozenge: stacked rows, n steps of s px each side of the centre row
// (half-height rows, one width step per row: always a lozenge, never a plus shape)
const stepped = (cx, cy, n, s, fill) => { let d = ''; const m = Math.round(n * 2) - 1, h = s / 2;
  for (let k = -m; k <= m; k++) { const w = (m + 1 - Math.abs(k)) * s; d += `M${f1(cx - w / 2)} ${f1(cy + k * h - h / 2)}h${f1(w)}v${f1(h + .05)}h${f1(-w)}z`; } return `<path d="${d}" fill="${fill}"/>`; };
const lozenge = (cx, cy, s) => stepped(cx, cy, 6, s, '#c8102e') + stepped(cx, cy, 4, s, '#f2ead8') + stepped(cx, cy, 3, s, '#1a1416') + stepped(cx, cy, 2, s, 'var(--civ)');
const teeth = (x0, x1, y, h, w, fill) => { let d = ''; for (let x = x0; x + w <= x1 + .1; x += w) d += `M${f1(x)} ${y}l${w / 2} ${h}l${w / 2} ${-h}z`; return `<path d="${d}" fill="${fill}"/>`; };
const bell = (x, len, i) => `<g class="bgbell" style="--i:${i}"><path d="M${x} 0v${len}" stroke="#8c8f94" stroke-width=".9"/>
  <g transform="translate(${x} ${len})"><path d="M-4 9C-4 3-3 0 0 0S4 3 4 9l1.500 2h-11z" fill="url(#bgSil)" stroke="#3a3d42" stroke-width=".6"/><circle cy="12.300" r="1.400" fill="#5d6166"/><path d="M-1.800 3c-.6 2-.8 4-.8 6" stroke="#fff" stroke-width=".8" opacity=".8" fill="none"/></g></g>`;

const standard = `<svg width="80" height="190" viewBox="0 0 80 190">
  <defs><linearGradient id="bgSil" x1="0" x2="1"><stop offset="0" stop-color="#8a9097"/><stop offset=".4" stop-color="#f4f6f8"/><stop offset="1" stop-color="#7b8188"/></linearGradient>
    <linearGradient id="bgSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".14"/><stop offset=".6" stop-color="#000" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/></linearGradient>
    <clipPath id="bgKil"><rect x="5" y="8" width="70" height="140"/></clipPath></defs>
  ${[12, 31, 49, 68].map((x) => `<ellipse cx="${x}" cy="3" rx="3.500" ry="5" fill="none" stroke="#c9ced4" stroke-width="1.600"/>`).join('')}
  <g class="unroll" style="--d:1.350"><g class="bgsw">
    <g clip-path="url(#bgKil)">
      <rect x="5" y="8" width="70" height="140" fill="#1a1416"/>
      <rect x="5" y="8" width="70" height="9" fill="#c8102e"/><rect x="5" y="139" width="70" height="9" fill="#c8102e"/>
      ${teeth(5, 75, 17, 5, 7, '#c8102e')}<path d="M5 139l3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5 3.500-5 3.500 5z" fill="#c8102e"/>
      <rect x="5" y="8" width="5" height="140" fill="#c8102e"/><rect x="70" y="8" width="5" height="140" fill="#c8102e"/>
      <path d="M10 12h60M10 144h60" stroke="#f2ead8" stroke-width="1.200" stroke-dasharray="3 2"/>
      ${lozenge(40, 50, 3.500)}${lozenge(40, 103, 3.500)}
      ${stepped(18, 76, 3, 3, '#c8102e')}${stepped(62, 76, 3, 3, '#c8102e')}${stepped(18, 76, 1.500, 3, '#f2ead8')}${stepped(62, 76, 1.500, 3, '#f2ead8')}
      ${stepped(18, 30, 2, 3, '#f2ead8')}${stepped(62, 30, 2, 3, '#f2ead8')}${stepped(18, 124, 2, 3, '#f2ead8')}${stepped(62, 124, 2, 3, '#f2ead8')}
      <rect class="bgsheen" x="-40" y="8" width="160" height="140" fill="url(#bgSh)"/>
    </g>
    <rect x="5" y="8" width="70" height="140" fill="none" stroke="#0b0809" stroke-width="1"/>
    <g transform="translate(0 148)">${[9, 20, 31, 42, 53, 64, 71].map((x, i) => bell(x, [6, 14, 8, 16, 8, 14, 5][i], i)).join('')}</g>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="bgPk"><rect x="5" y="4" width="24" height="44"/></clipPath></defs>
  <rect x="3" y="0" width="28" height="4" rx="2" fill="#c9ced4" stroke="#5d6166" stroke-width=".6"/>
  <g class="unroll" style="--d:1.600"><g class="bgsw" style="animation-delay:-1.500s">
    <g clip-path="url(#bgPk)"><rect x="5" y="4" width="24" height="44" fill="#1a1416"/><rect x="5" y="4" width="24" height="5" fill="#c8102e"/><rect x="5" y="43" width="24" height="5" fill="#c8102e"/>
      ${stepped(17, 26, 4, 2.500, '#c8102e')}${stepped(17, 26, 2, 2.500, 'var(--civ)')}</g>
    <g transform="translate(0 48)">${[9, 17, 25].map((x, i) => bell(x, [4, 9, 4][i], i)).join('')}</g>
  </g></g>
</svg>`;

// drying peppers on a cord down the left board
const peppers = () => { let s = '<path d="M-9 -12C-11 40-8 90-10 140" fill="none" stroke="#c9b48a" stroke-width="1.200"/>';
  for (let i = 0; i < 13; i++) { const y = -4 + i * 11, x = -9.500 - (i * 0.02), side = i % 2 ? 1 : -1;
    s += `<g transform="translate(${f1(x)} ${y}) rotate(${side * (24 + (i % 3) * 8)})"><path d="M0 0c3.500 1.500 4.500 9 1.800 17-.8-6-3.800-11-1.800-17z" fill="${['#c8102e', '#a50d22', '#d8261c'][i % 3]}" stroke="#4a0610" stroke-width=".5"/>
      <path d="M.8 2c.8 3 1 6 .6 9" stroke="#ff8a8a" stroke-width=".6" opacity=".7" fill="none"/><path d="M-.6 -1.200h3l-1 2.200z" fill="#4f5a26"/></g>`; }
  return s + '<path d="M-10 140l-2 10M-10 140l1 11M-10 140l3 9" stroke="#c9b48a" stroke-width="1" stroke-linecap="round"/>'; };

const frame = `
<defs><clipPath id="bgDrape"><path d="M394 -20H428V118L424 124H398L394 118Z"/></clipPath></defs>
<g class="pc" style="--dy:-80px;--r:-12deg;--d:1.050;--o:0"><g class="bgpep">${peppers()}</g></g>
<g class="pc" style="--dy:-120px;--sc:.5;--d:1.150;--o:0"><g class="bgdr">
  <g clip-path="url(#bgDrape)">
    <rect x="394" y="-20" width="34" height="144" fill="#1a1416"/>
    <rect x="394" y="-20" width="4" height="144" fill="#c8102e"/><rect x="424" y="-20" width="4" height="144" fill="#c8102e"/>
    ${stepped(411, 22, 4, 3, '#c8102e')}${stepped(411, 22, 2, 3, '#f2ead8')}${stepped(411, 70, 4, 3, '#c8102e')}${stepped(411, 70, 2, 3, 'var(--civ)')}
    ${teeth(398, 424, 100, 5, 6.500, '#f2ead8')}<rect x="394" y="108" width="34" height="16" fill="#c8102e"/>
    <path d="M394 -20h34v8h-34z" fill="#000" opacity=".3"/>
  </g>
  <path d="M394 -20H428V118L424 124H398L394 118Z" fill="none" stroke="#0b0809" stroke-width="1"/>
  ${[398, 402, 406, 410, 414, 418, 422].map((x, i) => `<path class="bgfr" style="--i:${i}" d="M${x} 123v${8 + (i % 3) * 2}" stroke="#f2ead8" stroke-width="1.300" stroke-linecap="round"/>`).join('')}
</g></g>`;

let k = 5; const r = () => (k = (k * 16807) % 2147483647) / 2147483647;
const curls = () => { let s = ''; for (let i = 0; i < 46; i++) { const x = 46 + r() * 48, y = 2 + r() * 40; s += `M${f1(x)} ${f1(y)}a1.600 1.600 0 1 1 2.400 1.200`; } return `<path d="${s}" fill="none" stroke="#5a524c" stroke-width=".8" stroke-linecap="round"/>`; };

const costume = {
  front: `
  <defs><linearGradient id="bgFur" x1="0" x2="1"><stop offset="0" stop-color="#0d0a0a"/><stop offset=".4" stop-color="#2e2826"/><stop offset=".7" stop-color="#1a1514"/><stop offset="1" stop-color="#090707"/></linearGradient></defs>
  <g class="bgkal">
    <path d="M44 48C42 34 43 16 47 0C60-3 80-3 93 0C97 16 98 34 96 48Z" fill="url(#bgFur)" stroke="#000" stroke-width="1.200" stroke-linejoin="round"/>
    ${curls()}
    <path d="M47 0C60-3 80-3 93 0C93 6 84 9 70 9C56 9 47 6 47 0Z" fill="var(--civ3)" stroke="#3a0610" stroke-width="1"/>
    <path d="M86 6c6 2 10 8 10 16" fill="none" stroke="var(--civ3)" stroke-width="3" stroke-linecap="round"/><circle cx="96" cy="24" r="2.400" fill="#e3e6ea" stroke="#3a3d42" stroke-width=".6"/>
    <path d="M52 4c6 2 14 2 20 1" fill="none" stroke="#ff8fa0" stroke-width="1" opacity=".6"/>
    <path d="M51 10c-3 10-4 24-3 34" fill="none" stroke="#6a615b" stroke-width="1.400" stroke-linecap="round" opacity=".7"/>
  </g>
  <path d="M39 51C39 43 54 39 70 39S101 43 101 51C92 47 48 47 39 51Z" fill="#141010" stroke="#000" stroke-width="1"/>
  <path d="M43 47c2-2 4-3 6-3M52 44c2-1 4-1 6-1M64 42.500h6M76 43c2 0 4 0 6 1M88 44.500c2 .5 4 1.500 6 3" stroke="#5a524c" stroke-width="1" stroke-linecap="round"/>
  <g transform="translate(70 36)"><path d="M0-7l6 7-6 7-6-7z" fill="#e3e6ea" stroke="#3a3d42" stroke-width=".8"/><path d="M0-4l3.300 4-3.300 4-3.300-4z" fill="var(--civ)"/><circle cx="-1" cy="-1.400" r=".8" fill="#fff"/></g>`,
};

const css = `
#stage[data-civ=bulgarians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=bulgarians] .bgsw{transform-box:fill-box;transform-origin:50% 0;animation:bgSway 6.200s ease-in-out infinite}
@keyframes bgSway{0%,100%{transform:rotate(-1.200deg) skewX(1deg)}50%{transform:rotate(1.800deg) skewX(-1.800deg)}}
#stage[data-civ=bulgarians] .bgsheen{animation:bgSheen 5s linear infinite}
@keyframes bgSheen{from{transform:translateX(-20px)}to{transform:translateX(40px)}}
#stage[data-civ=bulgarians] .bgbell{transform-box:fill-box;transform-origin:50% 0;animation:bgBell calc(.9s + var(--i)*.07s) calc(var(--i)*-.23s) ease-in-out infinite alternate}
@keyframes bgBell{from{transform:rotate(-16deg)}to{transform:rotate(16deg)}}
#stage[data-civ=bulgarians] .bgpep{transform-box:fill-box;transform-origin:50% 0;animation:bgPep 5.400s ease-in-out infinite}
@keyframes bgPep{0%,100%{transform:rotate(-1.500deg)}50%{transform:rotate(1.800deg)}}
#stage[data-civ=bulgarians] .bgfr{transform-box:fill-box;transform-origin:50% 0;animation:bgFr 1.600s calc(var(--i)*-.21s) ease-in-out infinite alternate}
@keyframes bgFr{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
#stage[data-civ=bulgarians] .bgkal{transform-box:fill-box;transform-origin:50% 100%;animation:bgKal 4.800s ease-in-out infinite}
@keyframes bgKal{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2.500deg)}}
`;

export default {
  id: 'bulgarians', name: 'Bulgarians', kit: 'slavic',
  accent: '#ff4d6d', accent2: '#b3123b', cloth: '#c8102e', metal: '#d9dde2',
  standard, pennant, costume, css, frame,
};
