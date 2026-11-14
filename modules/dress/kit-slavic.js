// KIT: Slavic & Baltic (Slavs, Bulgarians, Lithuanians). Pale painted timber fretwork, embroidered linen, birch, frost.
// The camera frame is a carved window surround (nalichnik): a gable pediment filled with cut-board lace over the
// lintel (the mascot sits on it), carved lace boards down the sides, a fretwork apron under the sill, two painted
// shutters swung half open at the window's edges, frost ferns on the glass, and a birch pole on the right whose
// crossbar carries the civ's standard. Secular house carving only. All drawings are our own.

const f1 = (n) => +n.toFixed(1);
let seed = 13; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// cut-board lace: half-disc tongues along A->B, each with a drilled hole. sweep 1 bulges to the left of A->B
// (screen space), 0 to the right.
function lace(ax, ay, bx, by, r, sweep) {
  const L = Math.hypot(bx - ax, by - ay), n = Math.max(1, Math.round(L / (2 * r))), ux = (bx - ax) / L, uy = (by - ay) / L, st = L / n, rr = st / 2;
  const nx = sweep ? uy : -uy, ny = sweep ? -ux : ux;
  let d = `M${f1(ax)} ${f1(ay)}`, holes = '';
  for (let i = 0; i < n; i++) {
    const ex = ax + ux * st * (i + 1), ey = ay + uy * st * (i + 1), mx = ax + ux * st * (i + .5), my = ay + uy * st * (i + .5);
    d += `A${f1(rr)} ${f1(rr)} 0 0 ${sweep} ${f1(ex)} ${f1(ey)}`;
    holes += `<circle cx="${f1(mx + nx * rr * .42)}" cy="${f1(my + ny * rr * .42)}" r="${f1(rr * .32)}"/>`;
  }
  return `<path class="slace" d="${d}Z"/><g class="shole">${holes}</g>`;
}
// chain of cut lozenges down a board's painted channel
const lozenges = (cx, y0, y1, w) => { let s = ''; for (let y = y0; y + 18 <= y1; y += 21) s += `<path d="M${cx} ${y}l${w} 9-${w} 9-${w}-9z" class="sloz"/><circle cx="${cx}" cy="${y + 9}" r="1.700" class="shc"/>`; return s; };
// row of cut diamonds along the lintel
const diamonds = (x0, x1, y) => { let s = ''; for (let x = x0; x <= x1; x += 13) s += `M${x} ${y - 3.500}l3 3.500-3 3.500-3-3.500z`; return `<path d="${s}" class="shc"/>`; };
// birch bark: lenticels and a few dark scars
const bark = (x, w, y0, y1) => { let s = ''; for (let y = y0; y < y1; y += 7 + rnd() * 9) { const a = x + rnd() * (w - 4), l = 2 + rnd() * (w * .55); s += `<rect x="${f1(a)}" y="${f1(y)}" width="${f1(Math.min(l, x + w - a))}" height="${f1(1 + rnd() * 1.300)}" rx=".6"/>`; }
  for (const y of [y0 + 40, y0 + 150, y0 + 270]) s += `<path d="M${x} ${y}q${w / 2} -5 ${w} 0q-${w / 2} 4 -${w} 0z"/>`; return `<g fill="#26221d" opacity=".85">${s}</g>`; };
const block = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:2.400;--r:45deg;--d:${d};--o:0">
  <rect x="-12" y="-12" width="24" height="24" rx="2" fill="url(#slvW)" stroke="#5f5644" stroke-width="1"/><rect x="-8" y="-8" width="16" height="16" rx="1" fill="#33607f"/>
  <path d="M0-6.500l6.500 6.500-6.500 6.500-6.500-6.500z" fill="#efe9da"/><circle r="2.200" fill="#14202b"/></g></g>`;
// frost fern on the glass
const fern = (x, y, a, s) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0C8 4 18 6 30 6M5 2.600l6-5M11 4.300l6-5M17 5.400l6-4.500M23 6l5-3.500M5 2.600l6 2.500M11 4.300l6 2.700M17 5.400l6 2.400" /></g>`;
// painted shutter: a trapezoid in perspective; hinge edge at hx, free edge at fx
const shutter = (hx, fx, side, d) => {
  const o = side < 0 ? 'l' : 'r', t = 6, b = 219, ft = -1, fb = 226, mx = (hx + fx) / 2, k = (v, a, c) => v + (c - v) * a;
  const inset = (a) => `M${f1(k(hx, .16, fx))} ${f1(k(t, .16, ft) + 6)}L${f1(k(hx, .84, fx))} ${f1(k(t, .84, ft) + 6)}L${f1(k(hx, .84, fx))} ${f1(k(b, .84, fb) - 6)}L${f1(k(hx, .16, fx))} ${f1(k(b, .16, fb) - 6)}Z`;
  return `<g class="pc" style="--dx:${side * 46}px;--r:${side * 8}deg;--d:${d};--o:.05"><g class="sshut ${o}">
    <path d="M${hx} ${t}L${fx} ${ft}L${fx} ${fb}L${hx} ${b}Z" fill="url(#slvSh${o})" stroke="#14202b" stroke-width="1.200" stroke-linejoin="round"/>
    <path d="${inset()}" fill="none" stroke="#efe9da" stroke-width="1.600" opacity=".9"/>
    <path d="M${f1(mx)} 92c-3 7-3 14 0 20 3-6 3-13 0-20zM${f1(mx)} 104c-5-3-7-8-7-13 4 2 6 6 7 13zM${f1(mx)} 104c5-3 7-8 7-13-4 2-6 6-7 13z" fill="var(--civ3)" stroke="#14202b" stroke-width=".6"/>
    <path d="M${f1(mx)} 112v34M${f1(mx)} 126c-4-2-6-5-6-9M${f1(mx)} 134c4-2 6-5 6-9" fill="none" stroke="#efe9da" stroke-width="1.200" stroke-linecap="round"/>
    <circle cx="${f1(mx)}" cy="60" r="3" fill="var(--civ)" stroke="#14202b" stroke-width=".6"/><circle cx="${f1(mx)}" cy="170" r="3" fill="var(--civ)" stroke="#14202b" stroke-width=".6"/>
    <path d="M${hx} 30H${f1(k(hx, .7, fx))}M${hx} 196H${f1(k(hx, .7, fx))}" stroke="#2a2e33" stroke-width="3" stroke-linecap="round"/>
    <path class="ssheen" d="M${hx} ${t}L${fx} ${ft}L${fx} ${fb}L${hx} ${b}Z" fill="url(#slvShine)"/>
  </g></g>`;
};

// tympanum: the gable triangle (-8,-16) (200,-84) (408,-16); gable boards on top; lace hangs inside
const SCROLL = `M188 -21C165 -20 145 -21 128 -25C116 -28 117 -38 127 -36C133 -35 133 -29 127 -29
  M193 -34C185 -38 180 -45 179 -51C178 -57 185 -59 187 -54C189 -50 185 -47 182 -49
  M158 -22C152 -28 150 -34 152 -40`;
const TULIP = `M200 -40C191 -42 187 -51 190 -60C194 -55 197 -53 200 -53C203 -53 206 -55 210 -60C213 -51 209 -42 200 -40Z
  M200 -53C197 -56 197 -61 200 -65C203 -61 203 -56 200 -53Z`;
const half = `<path class="scut sdraw" pathLength="1" d="${SCROLL}"/><path class="scut sdraw" pathLength="1" d="M200 -19V-40M200 -26C193 -28 189 -33 187 -37M200 -30C196 -31 193 -34 192 -36"/>
  <ellipse cx="152" cy="-41" rx="2.600" ry="4.500" class="sbud"/><circle cx="140" cy="-21" r="1.800" class="shc"/><circle cx="110" cy="-21" r="1.800" class="shc"/><circle cx="80" cy="-20" r="1.600" class="shc"/><circle cx="52" cy="-20" r="1.400" class="shc"/>`;

const glints = [[40, -28], [96, -48], [150, -66], [244, -68], [300, -50], [360, -32], [-14, 60], [412, 120], [120, 238], [300, 238]]
  .map(([x, y], i) => `<path class="sglint" style="--i:${i}" d="M${x} ${y - 4}l1.300 4-1.300 4-1.300-4z"/>`).join('');

const frame = `
<defs>
  <linearGradient id="slvW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8ef"/><stop offset=".55" stop-color="#e2dac6"/><stop offset="1" stop-color="#a99d82"/></linearGradient>
  <linearGradient id="slvWv" x1="0" x2="1"><stop offset="0" stop-color="#f7f3e8"/><stop offset=".6" stop-color="#dcd3bd"/><stop offset="1" stop-color="#9c9076"/></linearGradient>
  <linearGradient id="slvBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5577"/><stop offset="1" stop-color="#173349"/></linearGradient>
  <linearGradient id="slvShl" x1="0" x2="1"><stop offset="0" stop-color="#1f415d"/><stop offset="1" stop-color="#3a6d93"/></linearGradient>
  <linearGradient id="slvShr" x1="1" x2="0"><stop offset="0" stop-color="#1f415d"/><stop offset="1" stop-color="#3a6d93"/></linearGradient>
  <linearGradient id="slvShine" x1="0" y1="0" x2="1" y2="1"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="slvBirch" x1="0" x2="1"><stop offset="0" stop-color="#fdfcf7"/><stop offset=".55" stop-color="#e4e0d5"/><stop offset="1" stop-color="#9e988b"/></linearGradient>
  <filter id="slvGr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .6" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .22  0 0 0 -1.400 .55"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<g class="fin sfrost" style="--d:1.700">${fern(26, 4, 12, .9)}${fern(66, 3, 8, .6)}${fern(374, 4, 168, .9)}${fern(334, 3, 172, .6)}${fern(376, 220, 192, .7)}</g>
${shutter(2, 19, -1, .45)}${shutter(398, 381, 1, .52)}
<g class="pc" style="--dy:-80px;--sc:.6;--d:.42;--o:.1">
  <path d="M-8 -16L200 -84L408 -16Z" fill="url(#slvBlue)"/>
  ${lace(10, -16.600, 190, -76.900, 4.600, 0)}${lace(210, -76.900, 390, -16.600, 4.600, 0)}
  <g class="sfret">${half}<g transform="translate(400 0) scale(-1 1)">${half}</g>
  <path d="${TULIP}" class="sbud"/><circle cx="200" cy="-47" r="2" class="shc"/></g>
</g>
<g class="pc" style="--dx:-120px;--dy:-40px;--r:-14deg;--d:.58;--o:.08">
  <path d="M-20 -12L200 -88" class="sgable"/><path d="M-20 -12L200 -88" class="sgable2"/>
</g>
<g class="pc" style="--dx:120px;--dy:-40px;--r:14deg;--d:.62;--o:.08">
  <path d="M420 -12L200 -88" class="sgable"/><path d="M420 -12L200 -88" class="sgable2"/>
</g>
<g class="pc" style="--dy:-50px;--sc:.2;--d:.78;--o:.05">
  <path d="M196 -86h8l-1 -8h-6z" fill="url(#slvWv)" stroke="#5f5644" stroke-width=".8"/><circle cx="200" cy="-98" r="4.500" fill="url(#slvW)" stroke="#5f5644" stroke-width=".8"/>
</g>
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  <path d="M-20 -14V238" class="slaceV"/>${lace(-20, 238, -20, -14, 4.300, 1)}
  <rect x="-20" y="-16" width="22" height="256" rx="1.500" fill="url(#slvWv)" filter="url(#slvGr)" stroke="#5f5644" stroke-width=".8"/>
  <rect x="-14" y="2" width="10" height="220" rx="1" fill="url(#slvBlue)"/>${lozenges(-9, 4, 222, 4)}
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  ${lace(420, -14, 420, 238, 4.300, 1)}
  <rect x="398" y="-16" width="22" height="256" rx="1.500" fill="url(#slvWv)" filter="url(#slvGr)" stroke="#5f5644" stroke-width=".8"/>
  <rect x="404" y="2" width="10" height="220" rx="1" fill="url(#slvBlue)"/>${lozenges(409, 4, 222, 4)}
</g>
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  ${lace(-16, 252, 416, 252, 4.800, 0)}
  <rect x="-16" y="236" width="432" height="17" rx="1" fill="url(#slvBlue)" stroke="#14202b" stroke-width=".8"/>
  <path class="scut sdraw" pathLength="1" d="M-6 244.500c10-7 20-7 30 0s20 7 30 0 20-7 30 0 20 7 30 0 20-7 30 0 20 7 30 0 20-7 30 0 20 7 30 0 20-7 30 0 20 7 30 0 20-7 30 0 20 7 30 0 20-7 30 0 20 7 30 0"/>
  <rect x="-24" y="222" width="448" height="15" rx="2" fill="url(#slvW)" filter="url(#slvGr)" stroke="#5f5644" stroke-width=".8"/><path d="M-22 223.500h444" stroke="#fff" opacity=".8"/>
</g>
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-24" y="-19" width="448" height="19" rx="2" fill="url(#slvW)" filter="url(#slvGr)" stroke="#5f5644" stroke-width=".8"/><path d="M-22 -17.500h444" stroke="#fff" opacity=".85"/>
  <rect x="-18" y="-13" width="436" height="8" fill="url(#slvBlue)"/>${diamonds(-10, 412, -9)}<path d="M-22 -1h444" stroke="#5f5644" opacity=".7"/>
</g>
${block(-9, -9, .5)}${block(409, -9, .56)}${block(-9, 230, .62)}${block(409, 230, .68)}
<g class="pc" style="--dy:200px;--d:.75;--o:.05">
  <rect x="418" y="38" width="26" height="6" rx="2" fill="#3b3f44" stroke="#15181b"/><rect x="418" y="180" width="26" height="6" rx="2" fill="#3b3f44" stroke="#15181b"/>
  <rect x="438" y="-122" width="12" height="372" rx="4" fill="url(#slvBirch)" stroke="#6d675b" stroke-width=".6"/>${bark(438, 12, -116, 246)}
  <path d="M438 -40q6-3 12 0M438 112q6-3 12 0" stroke="#8a8476" stroke-width="1" fill="none"/>
</g>
<g class="pc" style="--dx:80px;--d:.95;--o:0">
  <path d="M450 -40L492 -80" stroke="#6d675b" stroke-width="6" stroke-linecap="round"/><path d="M450 -40L492 -80" stroke="#e4e0d5" stroke-width="4.400" stroke-linecap="round"/>
  <rect x="449" y="-86" width="85" height="7" rx="3.500" fill="url(#slvBirch)" stroke="#6d675b" stroke-width=".7"/><g fill="#26221d" opacity=".8"><rect x="462" y="-84" width="7" height="1.200"/><rect x="494" y="-83" width="5" height="1"/><rect x="516" y="-84.500" width="8" height="1.200"/></g>
  <path d="M449 -88l4 10M452 -88l4 10" stroke="#d8c9a0" stroke-width="1.800" stroke-linecap="round"/>
</g>
<g class="fin sbranch" style="--d:1.500">
  <path d="M446 -120c4-14 12-24 24-30M452 -132c4-12 8-20 14-26M462 -144c6-4 14-4 20-2" fill="none" stroke="#5b4a3a" stroke-width="1.600" stroke-linecap="round"/>
  ${[[470, -150, 20], [480, -146, 60], [466, -158, -40], [458, -150, 200], [458, -138, 120], [486, -154, -10]].map(([x, y, a], i) =>
    `<g transform="translate(${x} ${y}) rotate(${a})"><path class="sleaf" style="--i:${i}" d="M0 0c3-4 8-4 10 0-2 4-7 4-10 0z" fill="${['#e8c547', '#d9a92e', '#f1d66a'][i % 3]}" stroke="#7a5a18" stroke-width=".5"/></g>`).join('')}
</g>
<g class="fin" style="--d:2">${glints}</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const GRAIN = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='200' height='400'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.5 .01' numOctaves='3' seed='6' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .02  0 0 0 0 .04  0 0 0 0 .07  0 0 0 -1.500 .7'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#14202b' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#e6dfcc' stroke-width='5'/>
  <rect x='6.500' y='6.500' width='59' height='59' fill='none' stroke='#3a6d93' stroke-width='1.200'/>
  <g fill='#f4efe2' stroke='#5f5644' stroke-width='1'><rect x='.6' y='.6' width='20' height='20' rx='2'/><rect x='51.400' y='.6' width='20' height='20' rx='2'/><rect x='.6' y='51.400' width='20' height='20' rx='2'/><rect x='51.400' y='51.400' width='20' height='20' rx='2'/></g>
  <g fill='#2f5d80'><path d='M10.600 3.500l7.100 7.100-7.100 7.100-7.100-7.100z'/><path d='M61.400 3.500l7.100 7.100-7.100 7.100-7.100-7.100z'/><path d='M10.600 54.300l7.100 7.100-7.100 7.100-7.100-7.100z'/><path d='M61.400 54.300l7.100 7.100-7.100 7.100-7.100-7.100z'/></g>
  <g fill='#14202b'><circle cx='10.600' cy='10.600' r='1.800'/><circle cx='61.400' cy='10.600' r='1.800'/><circle cx='10.600' cy='61.400' r='1.800'/><circle cx='61.400' cy='61.400' r='1.800'/></g></svg>`);
// embroidered linen band: red counted-stitch lozenges with hooked ends on bleached linen
const STITCH = (() => { let s = ''; const px = (x, y) => { s += `<rect x='${x * 2}' y='${y * 2 + 1}' width='1.700' height='1.700'/>`; };
  for (const [x, y] of [[6, 0], [5, 1], [7, 1], [4, 2], [8, 2], [3, 3], [9, 3], [4, 4], [8, 4], [5, 5], [7, 5], [6, 6], [6, 3], [0, 3], [1, 3], [12, 3], [11, 3], [1, 2], [11, 4]]) px(x, y);
  return svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='26' height='16'><rect width='26' height='16' fill='#efe8d6'/><path d='M0 .7h26M0 15.300h26' stroke='#b3202c' stroke-width='1'/><g fill='#b3202c'>${s}</g></svg>`); })();
const VALANCE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='10'><path d='M0 0h16v2a8 8 0 0 1-16 0z' fill='#ece5d2' stroke='#5f5644' stroke-width='.6'/><circle cx='8' cy='4' r='1.700' fill='#14202b'/></svg>`);

const FLAKE = `<svg viewBox="-10 -10 20 20"><path d="M0-9V9M-7.800-4.500L7.800 4.500M-7.800 4.500L7.800-4.500M0-6l-2.200-2.200M0-6l2.200-2.200M0 6l-2.200 2.200M0 6l2.200 2.200M-5.200-3l-.8-3M5.200 3l.8 3M-5.200 3l-.8 3M5.200-3l.8-3"/></svg>`;

const css = `
#stage[data-kit=slavic] .dplate{color:#f7f2e4;text-shadow:0 1px 0 #0b1620;border:1px solid #e6dfcc;border-radius:2px;outline:2px solid #14202b;
  background:${GRAIN},linear-gradient(180deg,#336186,#1f4060 60%,#132a3e);box-shadow:inset 0 0 0 2px #2a5577,inset 0 0 0 3px #e6dfcc55,0 6px 10px #000a}
#stage[data-kit=slavic] .dplate span{font-family:'Ruslan Display',serif;font-size:19px;color:var(--civ);text-shadow:0 1px 0 #0b1620,0 0 10px color-mix(in srgb,var(--civ) 55%,transparent)}
#stage[data-kit=slavic] .dplate::before,#stage[data-kit=slavic] .dplate::after{content:'';position:absolute;top:50%;width:6px;height:6px;margin-top:-3px;rotate:45deg;background:#e6dfcc;box-shadow:0 0 0 1px #14202b}
#stage[data-kit=slavic] .dplate::before{left:2px}#stage[data-kit=slavic] .dplate::after{right:3px}
#stage[data-kit=slavic] .dplate .mark{margin-left:6px}

/* carved pieces */
#stage[data-kit=slavic] .dframe .slace{fill:#ece5d2;stroke:#5f5644;stroke-width:.8;stroke-linejoin:round;filter:drop-shadow(0 2px 1px rgba(0,0,0,.45))}
#stage[data-kit=slavic] .dframe .shole,#stage[data-kit=slavic] .dframe .shc{fill:#14202b}
#stage[data-kit=slavic] .dframe .sloz{fill:#efe9da;stroke:#5f5644;stroke-width:.6}
#stage[data-kit=slavic] .dframe .sbud{fill:#efe9da;stroke:#14202b;stroke-width:.9}
#stage[data-kit=slavic] .dframe .scut{fill:none;stroke:#efe9da;stroke-width:3.200;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 .6px #000) drop-shadow(0 1.500px .5px rgba(0,0,0,.55))}
#stage[data-kit=slavic] .dframe .sgable{fill:none;stroke:#5f5644;stroke-width:13;stroke-linecap:square}
#stage[data-kit=slavic] .dframe .sgable2{fill:none;stroke:#ece5d2;stroke-width:11;stroke-linecap:square;filter:drop-shadow(0 3px 2px rgba(0,0,0,.5))}
/* the fretwork is cut in while the frame assembles */
#stage[data-kit=slavic] [data-mod=dress] .sdraw{stroke-dasharray:1 1}
#stage[data-kit=slavic] [data-mod=dress][data-phase=in] .sdraw{animation:sCut 1.300s .9s cubic-bezier(.5,0,.3,1) both}
@keyframes sCut{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
/* the shutters creak in the draught (hinge on the outer edge) */
#stage[data-kit=slavic] .dframe .sshut{transform-box:fill-box;animation:sCreak 7s ease-in-out infinite}
#stage[data-kit=slavic] .dframe .sshut.l{transform-origin:0 50%}
#stage[data-kit=slavic] .dframe .sshut.r{transform-origin:100% 50%;animation-delay:-3.100s;animation-duration:8.300s}
@keyframes sCreak{0%,100%{transform:scaleX(1)}45%{transform:scaleX(.78)}60%{transform:scaleX(.84)}}
#stage[data-kit=slavic] .dframe .ssheen{animation:sShine 5.500s ease-in-out infinite;opacity:.8}
@keyframes sShine{0%,100%{opacity:.15}50%{opacity:.9}}
#stage[data-kit=slavic] .dframe .sfrost{fill:none;stroke:#eef8ff;stroke-width:1;stroke-linecap:round;opacity:.6;filter:drop-shadow(0 0 2px #cfeaff)}
#stage[data-kit=slavic] .dframe .sglint{fill:#fff;filter:drop-shadow(0 0 3px #cfeaff);transform-box:fill-box;transform-origin:center;animation:sGlint 3.600s calc(var(--i)*.43s) ease-in-out infinite}
@keyframes sGlint{0%,70%,100%{opacity:0;transform:scale(.3)}80%{opacity:1;transform:scale(1.400)}}
#stage[data-kit=slavic] .dframe .sleaf{transform-box:fill-box;transform-origin:0 50%;animation:sLeaf calc(1.700s + var(--i)*.23s) ease-in-out infinite alternate}
@keyframes sLeaf{from{transform:rotate(-14deg)}to{transform:rotate(18deg)}}
/* frost breath on the glass */
#stage[data-kit=slavic] .dshade{box-shadow:inset 0 0 44px rgba(0,0,0,.5),inset 0 12px 20px -10px rgba(200,230,255,.35);
  background:radial-gradient(140px 80px at 12% 0,rgba(228,244,255,.36),transparent 70%),radial-gradient(140px 80px at 88% 0,rgba(228,244,255,.3),transparent 70%),
    radial-gradient(120px 70px at 100% 100%,rgba(228,244,255,.26),transparent 70%)}

/* panels: painted blue planks in a pale carved surround, embroidered linen on top, a lace valance below */
#stage.skinned[data-kit=slavic] .pn.kd:not(.mu){
  background:${GRAIN},repeating-linear-gradient(90deg,transparent 0 56px,rgba(0,0,0,.4) 56px 58px,rgba(220,235,255,.06) 58px 59px),
    linear-gradient(180deg,rgba(36,62,86,calc(var(--glass,.55)*1.35)),rgba(16,30,44,calc(var(--glass,.55)*1.38)));
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,calc(var(--glass,.55)*1.28)),inset 0 0 34px rgba(0,0,0,.5)}
#stage.skinned[data-kit=slavic] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=slavic] .pn.kd>.kd-t{height:16px;margin:0 22px -4px;background:${STITCH} 0 0 repeat-x;box-shadow:0 2px 3px rgba(0,0,0,.5);
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent);mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent)}
#stage.skinned[data-kit=slavic] .pn.kd>.kd-b{height:10px;margin:2px 18px 0;background:${VALANCE} 0 0 repeat-x;filter:drop-shadow(0 2px 1px rgba(0,0,0,.5))}
#stage.skinned[data-kit=slavic] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=slavic] .hd{border-bottom:1px solid rgba(0,0,0,.6);box-shadow:0 1px 0 rgba(220,235,255,.08)}

/* frost crystals drifting down; burst = a gust of birch leaves */
#stage[data-kit=slavic] .p.fl{width:var(--s);height:var(--s);animation:sFall var(--dur) var(--del) linear infinite}
#stage[data-kit=slavic] .p.fl svg{display:block;width:100%;height:100%;fill:none;stroke:#f2f9ff;stroke-width:1.400;stroke-linecap:round;opacity:calc(.45 + var(--k)*.5);
  filter:drop-shadow(0 0 2px #bfe2ff);animation:sSpin calc(5s + var(--k)*6s) linear infinite}
@keyframes sFall{0%{transform:translate3d(0,-140px,0);opacity:0}12%{opacity:1}85%{opacity:1}100%{transform:translate3d(calc(var(--j)*60px),360px,0);opacity:0}}
@keyframes sSpin{to{transform:rotate(360deg)}}
#stage[data-kit=slavic] .p.lf{width:calc(var(--s)*1.700);height:var(--s);border-radius:0 100% 0 100%;background:linear-gradient(135deg,#f6dc72,#d9a92e 60%,#a8741c);
  animation:sGust 1.400s var(--del) cubic-bezier(.3,0,.5,1) both}
@keyframes sGust{0%{transform:translate3d(-500px,40px,0) rotate(0);opacity:0}20%{opacity:1}100%{transform:translate3d(1500px,calc(-120px + var(--j)*160px),0) rotate(calc(500deg + var(--k)*400deg));opacity:0}}
`;

export default {
  id: 'slavic',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Ruslan+Display&display=swap',
  frame, css,
  mount: { x: 452, y: -83 }, // top-left of the civ's standard: hung over the birch crossbar
  perch: 36, // hands on the lintel, in front of the carved gable
  particles: [{ cls: 'fl', n: 30, zone: 'sides', size: [7, 14], dur: [8, 14], html: FLAKE }, { cls: 'fl', n: 6, zone: [560, 60, 880, 700], size: [5, 9], dur: [10, 15], html: FLAKE }],
  burst: [{ cls: 'lf', n: 40, zone: [-200, 40, 1100, 720], size: [5, 9], dur: [1, 1], spread: 1.1 }],
};
