// KIT: India (Hindustanis, Dravidians, Bengalis, Gurjaras). Carved red and buff sandstone, pierced jali lattice,
// inlaid marble, silk tassels, warm sunlight. The camera frame is a jharokha (an overhanging palace balcony window):
// a cusped multifoil arch across the top, jali screens down the sides, two small chhatri cupolas on the eave corners,
// carved brackets under the sill and a tasselled pole on the right that carries the civ's standard.
// Secular palace architecture only. All drawings are our own.

const f = (n) => +n.toFixed(1);

// ---------- cusped (multifoil) arch: 12 lobes between the springs (0,22) and (400,22), apex at y -12 ----------
// The arch rises ABOVE the picture's top edge (a dark balcony recess fills the gap), so the stone never reaches more
// than ~20 px into the webcam picture: a wide, flat palace balcony arch, not a niche.
const N = 12, SPRING = 22;
export const archPts = Array.from({ length: N + 1 }, (_, i) => {
  const t = (i * Math.PI) / N;
  return [200 - 200 * Math.cos(t), -12 + 26 * (1 - Math.sin(t)) + 8 * Math.abs(Math.cos(t))];
});
// from the right spring back to the left one; each lobe bulges away from the opening, the cusps point into it
function cusped(depth) {
  let d = '';
  for (let i = N; i > 0; i--) {
    const [x1, y1] = archPts[i], [x0, y0] = archPts[i - 1];
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, vx = mx - 200, vy = my - 150, l = Math.hypot(vx, vy);
    d += `Q${f(mx + (vx / l) * depth * 2)} ${f(my + (vy / l) * depth * 2)} ${f(x0)} ${f(y0)}`;
  }
  return d;
}

// 8-point star (inlay)
const starPath = (cx, cy, R, r) => 'M' + Array.from({ length: 16 }, (_, i) => { const a = (i * Math.PI) / 8 - Math.PI / 2, q = i % 2 ? r : R; return `${f(cx + q * Math.cos(a))} ${f(cy + q * Math.sin(a))}`; }).join('L') + 'Z';
// a marble roundel with a coloured star inlaid (pietra dura)
const roundel = (cx, cy, R) => `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#inMb)" stroke="#2a0c04" stroke-width="1"/>
  <path class="instar" d="${starPath(cx, cy, R * .78, R * .38)}"/><circle cx="${cx}" cy="${cy}" r="${f(R * .2)}" fill="#1a0a05"/>`;

// silk tassel hanging from (x,y); exported for the civ layers
export const tassel = (x, y, len, i, fill = 'var(--civ3)') => `<g class="intas" style="--i:${i};--k:${((i * 37) % 10) / 10}">
  <path d="M${x} ${y}v4" stroke="#e8c070" stroke-width="1"/><circle cx="${x}" cy="${y + 5.500}" r="2.200" fill="var(--civm)" stroke="#4a300a" stroke-width=".5"/>
  <path d="M${x - 2.400} ${y + 7.500}h4.800l1.800 ${len}h-8.400z" fill="${fill}" stroke="#0007" stroke-width=".5"/>
  <path d="M${x - 1.200} ${y + 9}l-.4 ${len - 3}M${x + 1.200} ${y + 9}l.4 ${len - 3}" stroke="#0004" stroke-width=".6"/>
  <path d="M${x - 2.800} ${y + 8.500}h5.600" stroke="var(--civm)" stroke-width="1.300"/></g>`;

// jali screen inside a side post: lattice over a slowly moving glow (light coming through the stone)
const jaliShape = (x0, x1) => `M${x0} 206V78H${x1}V206Z`;
const jali = (x0, x1, id) => `<clipPath id="${id}"><path d="${jaliShape(x0, x1)}"/></clipPath>
  <g clip-path="url(#${id})"><rect x="${x0}" y="74" width="${x1 - x0}" height="134" fill="#1b0b05"/>
    <rect class="injg" x="${x0}" y="-60" width="${x1 - x0}" height="268" fill="url(#inGl)"/>
    <rect x="${x0}" y="74" width="${x1 - x0}" height="134" fill="url(#inJali)"/></g>
  <path d="${jaliShape(x0, x1)}" fill="none" stroke="#2a0c04" stroke-width="2.400"/><path d="${jaliShape(x0, x1)}" fill="none" stroke="#f1dcb0" stroke-width="1"/>`;

const post = (x, w, dx, d) => `<g class="pc" style="--dx:${dx}px;--d:${d};--o:.15">
  <rect x="${x}" y="-34" width="${w}" height="252" fill="url(#inRv)" filter="url(#inSp)"/>
  <path d="M${x + 1} -32v248" stroke="#f0b58f" opacity=".45"/><path d="M${x + w - .5} -32v248" stroke="#000" opacity=".55"/>
  ${roundel(x + w / 2, 24, 8)}<path d="M${x + 3} 40h${w - 6}" stroke="#e8c98f" stroke-width="1.200" opacity=".7"/>${roundel(x + w / 2, 55, 6)}
  ${jali(x + 4, x + w - 4, x < 200 ? 'inJL' : 'inJR')}
</g>`;

const corbel = (x) => `<path d="M${x - 7} 227h14l-2 3h-1.500c0 4-1.800 7-3.500 9-1.700-2-3.500-5-3.500-9H${x - 5}z" fill="url(#inRv)" stroke="#2a0c04" stroke-width=".8" stroke-linejoin="round"/>
  <path d="M${x - 4.500} 231c0 3 1.500 5 2.500 6" stroke="#f0b58f" stroke-width=".8" fill="none" opacity=".7"/>`;

// small domed pavilion on an eave corner
const chhatri = (cx, d) => `<g class="pc" style="--dy:-90px;--sc:.4;--d:${d};--o:0">
  <rect x="${cx - 17}" y="-37" width="34" height="6" fill="url(#inRh)" stroke="#2a0c04" stroke-width=".8"/>
  <rect x="${cx - 14}" y="-55" width="28" height="18" fill="#2a1007"/>
  <path d="M${cx - 14} -50q3.500-5 7 0q3.500-5 7 0q3.500-5 7 0q3.500-5 7 0V-55H${cx - 14}z" fill="url(#inBf)"/>
  ${[-14, -1.5, 11].map((o) => `<rect x="${cx + o}" y="-55" width="3" height="18" fill="url(#inBf)" stroke="#5a3a1c" stroke-width=".5"/>`).join('')}
  <path d="M${cx - 18} -61H${cx + 18}L${cx + 21} -55H${cx - 21}Z" fill="url(#inBf)" stroke="#5a3a1c" stroke-width=".8" stroke-linejoin="round"/>
  <rect x="${cx - 13}" y="-65" width="26" height="4" fill="url(#inRh)" stroke="#2a0c04" stroke-width=".5"/><rect x="${cx - 13}" y="-64" width="26" height="1.500" class="inacc"/>
  <path d="M${cx - 14} -65C${cx - 19} -75 ${cx - 9} -86 ${cx} -90C${cx + 9} -86 ${cx + 19} -75 ${cx + 14} -65Z" fill="url(#inDome)" stroke="#5a3a1c" stroke-width=".9"/>
  <path d="M${cx} -90C${cx - 5} -84 ${cx - 8} -74 ${cx - 7} -65M${cx} -90C${cx + 5} -84 ${cx + 8} -74 ${cx + 7} -65M${cx} -90V-65" fill="none" stroke="#a8875a" stroke-width=".7"/>
  <path class="inglint" d="M${cx - 10} -71c0-6 3-11 7-15" stroke="#fff" stroke-width="1.600" fill="none" stroke-linecap="round"/>
  <path d="M${cx} -90v-8" stroke="var(--civm)" stroke-width="1.400"/><circle cx="${cx}" cy="-93" r="2.100" fill="var(--civm)" stroke="#4a300a" stroke-width=".5"/>
  ${tassel(cx - 19, -56, 9, 5)}${tassel(cx + 19, -56, 9, 6)}
</g>`;

const lozenges = Array.from({ length: 25 }, (_, i) => { const x = -20 + i * 18; return `<path class="inlz" style="--i:${i}" d="M${x} -6l6-3.500 6 3.500-6 3.500z"/><circle cx="${x + 15}" cy="-6" r="1.100" fill="#1a0a05"/>`; }).join('');
const dentils = Array.from({ length: 56 }, (_, i) => `M${-24 + i * 8} -22v4`).join('');

const ARCH = cusped(7);
const frame = `
<defs>
  <linearGradient id="inRv" x1="0" x2="1"><stop offset="0" stop-color="#c8653f"/><stop offset=".55" stop-color="#94412a"/><stop offset="1" stop-color="#5a2416"/></linearGradient>
  <linearGradient id="inRh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4744c"/><stop offset=".5" stop-color="#9a442b"/><stop offset="1" stop-color="#5a2416"/></linearGradient>
  <linearGradient id="inBf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dfb4"/><stop offset=".55" stop-color="#d3b07a"/><stop offset="1" stop-color="#9a7646"/></linearGradient>
  <linearGradient id="inMb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#d9cdb6"/></linearGradient>
  <radialGradient id="inDome" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#fffaf0"/><stop offset=".6" stop-color="#e6d6b4"/><stop offset="1" stop-color="#a8875a"/></radialGradient>
  <linearGradient id="inPole" x1="0" x2="1"><stop offset="0" stop-color="#c8452c"/><stop offset=".5" stop-color="#8a2a17"/><stop offset="1" stop-color="#4a120a"/></linearGradient>
  <linearGradient id="inGl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--civ)" stop-opacity="0"/><stop offset=".25" style="stop-color:var(--civ)" stop-opacity=".95"/>
    <stop offset=".5" style="stop-color:#fff1c8" stop-opacity=".55"/><stop offset=".75" style="stop-color:var(--civ)" stop-opacity=".95"/><stop offset="1" style="stop-color:var(--civ)" stop-opacity="0"/></linearGradient>
  <pattern id="inJali" width="12" height="12" patternUnits="userSpaceOnUse">
    <path d="M0 0L12 12M12 0L0 12" stroke="#e6c88f" stroke-width="2.600"/><path d="M6 0V12M0 6H12" stroke="#c9a46a" stroke-width="1.300"/>
    <rect width="12" height="12" fill="none" stroke="#b98c55" stroke-width="1.800"/><circle cx="6" cy="6" r="2.100" fill="#f3dfb4"/></pattern>
  <filter id="inSp" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .08  0 0 0 0 .03  0 0 0 -2.300 1.100"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
${post(-24, 27, -90, 0)}${post(397, 27, 90, .08)}
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <rect x="-24" y="226" width="448" height="12" fill="#3a170c"/>
  ${[-14, 30, 92, 154, 216, 278, 340, 386, 412].map(corbel).join('')}
  <path d="M-24 211H424V227H-24Z" fill="url(#inBf)" filter="url(#inSp)" stroke="#5a3a1c" stroke-width=".8"/>
  <path d="M-23 212h446" stroke="#fff6dc" opacity=".75"/><rect x="-24" y="221" width="448" height="2.400" fill="#9a3a22"/>
</g>
<g class="pc" style="--dy:-60px;--d:.4;--o:.1">
  <rect x="0" y="-18" width="400" height="19" fill="#1c0a05"/><rect x="0" y="-4" width="400" height="5" fill="#000" opacity=".5"/>
  <path d="M-1 -18H401V${SPRING}${ARCH}Z" fill="url(#inBf)" filter="url(#inSp)"/>
  <path d="M400 ${SPRING}${ARCH}" fill="none" stroke="#3a1a0c" stroke-width="4" stroke-linejoin="round"/>
  <path d="M400 ${SPRING}${ARCH}" fill="none" stroke="#fff3d6" stroke-width="1" stroke-linejoin="round" opacity=".7" transform="translate(0 -2.500)"/>
  ${roundel(12, -6, 7)}${roundel(388, -6, 7)}
  <path d="M30 -13c14 0 24 2 32 5M370 -13c-14 0-24 2-32 5" fill="none" stroke="#9a7646" stroke-width="1.200"/>
</g>
<g class="fin" style="--d:1.500"><path class="inlay" d="M400 ${SPRING}${ARCH}"/></g>
<g class="fin" style="--d:1.700">${[1, 11].map((i, k) => tassel(f(archPts[i][0]), f(archPts[i][1]), 11, k)).join('')}</g>
<g transform="translate(0 -20)"><g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-24" y="-16" width="448" height="20" fill="url(#inRh)" filter="url(#inSp)"/>
  <rect x="-20" y="-11" width="440" height="10" fill="url(#inMb)" stroke="#3a1a0c" stroke-width=".8"/>${lozenges}
  <path d="M-23 -15h446" stroke="#f0b58f" opacity=".5"/><path d="M-24 3.500h448" stroke="#000" opacity=".55"/>
</g></g>
<g transform="translate(0 -20)"><g class="pc" style="--dy:-120px;--r:-4deg;--d:.55;--o:.05">
  <path d="M-18 -31H418L426 -16H-24Z" fill="url(#inBf)" filter="url(#inSp)" stroke="#5a3a1c" stroke-width="1" stroke-linejoin="round"/>
  <path d="M-17 -30h434" stroke="#fff6dc" opacity=".85"/><path d="${dentils}" stroke="#8a6438" stroke-width="1.600"/>
  <path d="M-24 -16H426" stroke="#2a1006" stroke-width="2"/>
</g></g>
<g transform="translate(0 -20)">${chhatri(-4, .7)}${chhatri(404, .78)}</g>
<g class="pc" style="--dy:200px;--d:.85;--o:.05">
  <rect x="442" y="-142" width="8" height="382" rx="3" fill="url(#inPole)"/>
  <path d="${Array.from({ length: 27 }, (_, i) => `M442 ${-130 + i * 14}l8-5`).join('')}" stroke="var(--civm)" stroke-width="1.400" opacity=".8"/>
  ${[-120, -40, 40, 180, 214].map((y) => `<rect x="440" y="${y}" width="12" height="5" rx="1" fill="var(--civm)" stroke="#4a300a" stroke-width=".7"/>`).join('')}
  ${[36, 176].map((y) => `<path d="M424 ${y}h18v8h-18z" fill="url(#inRh)" stroke="#2a0c04" stroke-width=".8"/><path d="M426 ${y + 8}c0 6 5 9 12 9" fill="none" stroke="#94412a" stroke-width="3"/>`).join('')}
  <circle cx="446" cy="-144" r="5" fill="var(--civm)" stroke="#4a300a"/><circle cx="444.500" cy="-145.500" r="1.600" fill="#fff8e0"/>
</g>
<g class="fin" style="--d:1.800">${tassel(437, -117, 22, 7)}${tassel(455, -117, 26, 8)}${tassel(438, -37, 17, 9)}${tassel(454, -37, 20, 10)}</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const SPECK = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .8  0 0 0 0 .62  0 0 0 -1.200 .5'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const corner = (x, y) => `<rect x='${x}' y='${y}' width='19' height='19' fill='#f7efe0' stroke='#2a0c04' stroke-width='1.200'/><path d='${starPath(x + 9.500, y + 9.500, 7.500, 3.600)}' fill='#a8321e'/><circle cx='${x + 9.500}' cy='${y + 9.500}' r='1.800' fill='#1a0a05'/>`;
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#2a0c04' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#d3b07a' stroke-width='5.500'/>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#9a3a22' stroke-width='1.200' stroke-dasharray='3 3'/>
  <path d='M1.800 70V1.800H70' fill='none' stroke='#fff3d6' stroke-opacity='.6' stroke-width='1'/><rect x='8.500' y='8.500' width='55' height='55' fill='none' stroke='#9a3a22' stroke-width='1.200'/>
  ${corner(.6, .6)}${corner(52.400, .6)}${corner(.6, 52.400)}${corner(52.400, 52.400)}</svg>`);
// leaf-shaped battlement merlons (kangura) along the top of a panel
const KANGURA = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='18' height='14'><path d='M3 14V8c0-3 3-4 6-8 3 4 6 5 6 8v6z' fill='#d3b07a' stroke='#5a2416' stroke-width='1'/><path d='M6 13V9c0-2 1.500-3 3-5' fill='none' stroke='#fff3d6' stroke-width='.8' opacity='.7'/><rect y='12' width='18' height='2' fill='#9a3a22'/></svg>`);
// tassel fringe below a panel: the silhouette masks a civ-coloured fill, the gold cord and caps sit on top of it
const TSHAPE = `<path d='M0 0h40v2.400H0z'/><circle cx='10' cy='5' r='2.600'/><circle cx='30' cy='5' r='2.600'/><path d='M7.500 7h5l2 12h-9zM27.500 7h5l2 12h-9z'/>`;
const TMASK = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'><g fill='#000'>${TSHAPE}</g></svg>`);
const TGOLD = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'><path d='M0 0h40v2.400H0z' fill='#e8c070'/><circle cx='10' cy='5' r='2.600' fill='#e8c070' stroke='#6a4510' stroke-width='.6'/><circle cx='30' cy='5' r='2.600' fill='#e8c070' stroke='#6a4510' stroke-width='.6'/>
  <path d='M7 8h6M27 8h6' stroke='#e8c070' stroke-width='1.300'/><path d='M9 10l-.4 8M11 10l.4 8M29 10l-.4 8M31 10l.4 8' stroke='#0005' stroke-width='.7'/></svg>`);
const LATTICE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M0 0L24 24M24 0L0 24M12 0V24M0 12H24' stroke='#1a0a05' stroke-width='3.400'/><rect width='24' height='24' fill='none' stroke='#1a0a05' stroke-width='3'/></svg>`);
const PETAL = `<svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 8C0 3 5-1 11 1 10 6 6 9 1 8z" fill="currentColor"/><path d="M2 7C5 5 7 3 10 2" stroke="#fff6" stroke-width=".8" fill="none"/></svg>`;

const css = `
#stage[data-kit=india] .dplate{color:#fbeedd;text-shadow:0 1px 0 #2a0c04;border:1px solid #e8c98f;outline:1px solid #2a0c04;border-radius:3px;
  background:${SPECK},linear-gradient(180deg,#b5553a,#7c2f1d 55%,#4a1a0f);background-blend-mode:soft-light,normal;
  box-shadow:inset 0 0 0 3px #4a1a0f,inset 0 0 0 4px #e8c98f66,0 6px 10px #000a}
#stage[data-kit=india] .dplate span{font-family:'Yatra One',serif;font-size:20px;color:var(--civ);text-shadow:0 1px 0 #2a0c04,0 0 10px color-mix(in srgb,var(--civ) 55%,transparent)}
#stage[data-kit=india] .dplate::before,#stage[data-kit=india] .dplate::after{content:'';position:absolute;top:50%;width:7px;height:7px;margin-top:-3.500px;transform:rotate(45deg);
  background:var(--civ);box-shadow:0 0 0 1px #2a0c04,0 0 6px var(--civ)}
#stage[data-kit=india] .dplate::before{left:-4px}#stage[data-kit=india] .dplate::after{right:-4px}

/* frame details */
#stage[data-kit=india] .dframe .instar{fill:var(--civ);stroke:#2a0c04;stroke-width:.6}
#stage[data-kit=india] .dframe .inacc{fill:var(--civ)}
#stage[data-kit=india] .dframe .inlz{fill:var(--civ);stroke:#2a0c04;stroke-width:.6;opacity:.7;animation:inLz 6s calc(var(--i)*.2s) infinite}
@keyframes inLz{0%,18%,100%{opacity:.7}7%{opacity:1}}
#stage[data-kit=india] .dframe .inlay{fill:none;stroke:var(--civ);stroke-width:2;stroke-linejoin:round;stroke-dasharray:26 5;
  filter:drop-shadow(0 0 3px color-mix(in srgb,var(--civ) 70%,transparent));animation:inFlow 12s linear infinite}
@keyframes inFlow{to{stroke-dashoffset:-310}}
#stage[data-kit=india] .dframe .injg{transform-box:fill-box;animation:inJg 7s ease-in-out infinite alternate}
@keyframes inJg{from{transform:translateY(-12%)}to{transform:translateY(38%)}}
#stage[data-kit=india] .intas{transform-box:fill-box;transform-origin:50% 0;animation:inTas calc(2.300s + var(--k)*1.600s) calc(var(--i)*-.7s) ease-in-out infinite alternate}
@keyframes inTas{from{transform:rotate(-8deg)}to{transform:rotate(9deg)}}
#stage[data-kit=india] .dframe .inglint{opacity:.3;animation:inGlint 5.500s ease-in-out infinite}
@keyframes inGlint{0%,65%,100%{opacity:.3}80%{opacity:1}}
/* sunlight through the jali: warm light from above, lattice shadows drifting over the picture's edges */
#stage[data-kit=india] .dshade{box-shadow:inset 0 0 46px rgba(0,0,0,.58);background:radial-gradient(320px 120px at 50% 0,rgba(255,196,110,.26),transparent 72%)}
#stage[data-kit=india] .dshade::before{content:'';position:absolute;inset:0;opacity:.2;background:${LATTICE} 0 0/24px 24px;
  -webkit-mask-image:linear-gradient(90deg,#000,transparent 14%,transparent 86%,#000);mask-image:linear-gradient(90deg,#000,transparent 14%,transparent 86%,#000);
  animation:inSun 16s ease-in-out infinite alternate}
@keyframes inSun{to{background-position:20px 9px}}

/* panels: red sandstone, buff moulded rim with inlaid marble corner stars, battlement merlons on top, silk tassel fringe below */
#stage.skinned[data-kit=india] .pn.kd:not(.mu){
  background:${SPECK},linear-gradient(180deg,rgba(98,38,22,calc(var(--glass,.55)*1.35)),rgba(42,16,10,calc(var(--glass,.55)*1.36)));background-blend-mode:soft-light,normal;
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,calc(var(--glass,.55)*1.28)),inset 0 0 36px rgba(0,0,0,.5)}
#stage.skinned[data-kit=india] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=india] .pn.kd>.kd-t{height:14px;margin:0 20px -5px;background:${KANGURA} 0 100% repeat-x;filter:drop-shadow(0 -1px 2px rgba(0,0,0,.5))}
#stage.skinned[data-kit=india] .pn.kd>.kd-b{height:20px;margin:-2px 24px 0;background:${TGOLD} 0 0 repeat-x,var(--civ3);
  -webkit-mask:${TMASK} 0 0 repeat-x;mask:${TMASK} 0 0 repeat-x;transform-origin:50% 0;animation:fin .8s .15s both,inFringe 2.800s ease-in-out infinite alternate}
@keyframes inFringe{from{transform:skewX(-5deg)}to{transform:skewX(5deg)}}
#stage.skinned[data-kit=india] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}

/* sun motes rising, a few petals drifting down */
#stage[data-kit=india] .p.mote{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fff8e0,color-mix(in srgb,var(--civ) 60%,#ffd27a) 45%,transparent 72%);
  animation:inMote var(--dur) var(--del) ease-in-out infinite}
@keyframes inMote{0%{transform:translate3d(0,60px,0) scale(.4);opacity:0}25%{opacity:calc(.35 + var(--k)*.55)}55%{transform:translate3d(calc(var(--j)*50px),-40px,0) scale(1)}80%{opacity:calc(.3 + var(--k)*.5)}100%{transform:translate3d(calc(var(--j)*-24px),-170px,0) scale(.5);opacity:0}}
#stage[data-kit=india] .p.petal{color:color-mix(in srgb,var(--civ) 70%,#fff);animation:inFall var(--dur) var(--del) linear infinite,inTumble calc(1.800s + var(--k)*1.600s) ease-in-out infinite alternate}
#stage[data-kit=india] .p.petal:nth-child(2n){color:var(--civ2)}
#stage[data-kit=india] .p.petal svg{display:block;width:calc(var(--s)*1.300);height:var(--s)}
@keyframes inFall{0%{transform:translate3d(0,-160px,0);opacity:0}10%{opacity:.9}88%{opacity:.9}100%{transform:translate3d(calc(var(--j)*90px),420px,0);opacity:0}}
@keyframes inTumble{from{rotate:-50deg;translate:-14px 0}to{rotate:70deg;translate:14px 0}}
/* burst: gold leaf and inlay chips thrown out of the window */
#stage[data-kit=india] .p.gilt{width:var(--s);height:calc(var(--s)*.7);background:linear-gradient(135deg,#fff6c8,#e0a83a 50%,#8a5a12);box-shadow:0 0 6px #ffd27a88;
  animation:inBurst 1.600s var(--del) cubic-bezier(.15,.7,.3,1) both}
#stage[data-kit=india] .p.gilt:nth-child(3n){background:var(--civ);box-shadow:0 0 6px var(--civ)}
@keyframes inBurst{0%{transform:rotate(calc(var(--k)*360deg)) translateY(0) rotate(0) scale(.3);opacity:0}15%{opacity:1}
  100%{transform:rotate(calc(var(--k)*360deg + var(--j)*60deg)) translateY(calc(-240px - var(--k)*320px)) rotate(540deg) scale(1);opacity:0}}
`;

export default {
  id: 'india',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Yatra+One&display=swap',
  frame, css,
  // the civ's standard: pole axis = x 30 of the standard, pole top = y 30 (the frame's pole ends at x 446, y -142)
  mount: { x: 416, y: -172 },
  perch: 3, // hands on the eave (chhajja, top at y -51) above the arch
  particles: [{ cls: 'mote', n: 26, zone: 'sides', size: [3, 7], dur: [6, 12] }, { cls: 'petal', n: 7, zone: [540, 60, 420, 520], size: [7, 11], dur: [13, 20], html: PETAL }],
  burst: [{ cls: 'gilt', n: 40, zone: [150, 650, 160, 100], size: [5, 10], dur: [1, 1], spread: .5 }],
};
