// KIT: Western Feudal (Britons, Franks, Burgundians, Celts, Saxons). Dressed limestone, heraldic cloth, oak and iron.
// The camera frame is a castle gatehouse: ashlar jambs with quoins, a lintel course with a blank heraldic shield,
// machicolation corbels carrying a crenellated parapet (the mascot stands in the wide crenel on the right),
// the portcullis teeth hanging inside the top edge, iron cressets with live flames on the jambs, and a painted
// tournament lance on the right that carries the civ's standard. All drawings are our own.

let seed = 13; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// one dressed stone: face, light top/left arris, dark bottom joint, a few tooling marks
const block = (x, y, w, h) => {
  let tool = '';
  for (let i = 0; i < Math.floor(w / 9); i++) { const tx = x + 3 + r() * (w - 6), ty = y + 3 + r() * (h - 7); tool += `M${tx.toFixed(1)} ${ty.toFixed(1)}l1.6 3`; }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.200" class="fst"/><path d="M${x + 1.500} ${y + 1.200}h${w - 3}M${x + 1.200} ${y + 1.500}v${h - 3}" class="fhi"/>` +
    `<path d="M${x + 1.500} ${y + h - .8}h${w - 3}M${x + w - .8} ${y + 1.500}v${h - 3}" class="flo"/><path d="${tool}" class="ftl"/>`;
};
// a course of blocks between x0 and x1 with varying lengths
const course = (x0, x1, y, h, minW, maxW, off = 0) => {
  let s = '', x = x0;
  if (off) { s += block(x, y, off, h); x += off; }
  while (x < x1 - 4) { const w = Math.min(x1 - x, minW + r() * (maxW - minW)); s += block(x, y, +w.toFixed(1), h); x += w; }
  return s;
};
// a jamb: quoins alternating long and short on the outer side
const jamb = (xIn, side) => {
  let s = '', y = -12, i = 0;
  while (y < 240) { const h = Math.min(240 - y, i % 2 ? 22 : 27), w = i % 2 ? 22 : 28; s += block(side < 0 ? xIn - w : xIn, y, w, h); y += h; i++; }
  return s;
};

const MERLONS = [-28, 10, 48, 86, 124, 162, 200, 238, 276, 404]; // no merlon over x 300-404: the mascot's crenel
const merlon = (x, i) => `<rect x="${x}" y="-64" width="24" height="18" rx="1" class="fst"/><path d="M${x - 1.500} -65.500h27v4h-27z" class="fcap"/>` +
  `<path d="M${x + 1.500} -61h21" class="fhi"/>${i % 2 ? `<rect x="${x + 10.500}" y="-58" width="3" height="10" rx="1.500" class="fslit"/>` : ''}`;
const corbel = (cx) => `<path d="M${cx - 9} -28h18v5h-2v5h-2v6h-10v-6h-2v-5h-2z" class="fst"/><path d="M${cx - 8.500} -27.200h17" class="fhi"/>`;

const cresset = (x, y, d, fl) => `<g class="pc" style="--sc:.3;--d:${d};--o:0"><g transform="translate(${x} ${y})">
  <circle class="fglow" r="22" cy="-14" fill="url(#fdGlow)"/>
  <path d="M0 26v-14M-4 26h8" stroke="#1d1f22" stroke-width="2.400" stroke-linecap="round"/>
  <path d="M-9 0h18l-3 9q-6 4-12 0z" fill="url(#fdIron)" stroke="#0e0f11" stroke-width="1"/><path d="M-6 3v5M-2 3v6M2 3v6M6 3v5" stroke="#0e0f11" stroke-width="1"/>
  <g class="ffl" style="animation-delay:${fl}s"><path d="M-7 0C-9-8-4-12-3-20c2 5 4 6 5 2 3 6 7 10 5 18z" fill="#ff7a1f"/><path d="M-4 0C-5-6-1-9 0-15c2 5 5 8 4 15z" fill="#ffd36a"/><path d="M-1.500 0c0-3 1-5 1.500-8 1 3 2 5 1.500 8z" fill="#fff6d6"/></g>
</g></g>`;

const bars = Array.from({ length: 16 }, (_, i) => 14 + i * 24.800);
const frame = `
<defs>
  <linearGradient id="fdS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ece3cc"/><stop offset=".55" stop-color="#c5b99d"/><stop offset="1" stop-color="#8e8268"/></linearGradient>
  <linearGradient id="fdIron" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b939b"/><stop offset=".5" stop-color="#454b52"/><stop offset="1" stop-color="#1c1f23"/></linearGradient>
  <linearGradient id="fdOak" x1="0" x2="1"><stop offset="0" stop-color="#7a5532"/><stop offset=".55" stop-color="#4a301b"/><stop offset="1" stop-color="#26170b"/></linearGradient>
  <linearGradient id="fdRound" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
  <radialGradient id="fdGlow"><stop offset="0" stop-color="#ffb04a" stop-opacity=".55"/><stop offset=".5" stop-color="#ff7a1f" stop-opacity=".18"/><stop offset="1" stop-color="#ff7a1f" stop-opacity="0"/></radialGradient>
  <pattern id="fdSp" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)"><rect width="11" height="11" fill="#efe6d2"/><rect width="5.500" height="11" fill="var(--civ3)"/></pattern>
  <filter id="fdGr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .21  0 0 0 0 .15  0 0 0 -2.400 1.150"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<g class="pc" style="--dy:-46px;--d:.55;--o:.12"><g class="fport">
  <path d="M8 -6h384v9H8z" fill="#120e0a" opacity=".55"/>
  ${bars.map((x) => `<rect x="${(x - 2.600).toFixed(1)}" y="-8" width="5.200" height="23" fill="url(#fdOak)" stroke="#140c05" stroke-width=".8"/><path d="M${(x - 2.600).toFixed(1)} 15h5.200l-2.600 9z" fill="url(#fdIron)" stroke="#0e0f11" stroke-width=".8" stroke-linejoin="round"/>`).join('')}
  <rect x="9" y="7" width="382" height="4.500" fill="url(#fdIron)" stroke="#0e0f11" stroke-width=".8"/>
  ${bars.map((x) => `<circle cx="${x.toFixed(1)}" cy="9.200" r="1.100" fill="#c9d1d8"/>`).join('')}
  <rect class="fglint" x="9" y="7" width="40" height="4.500" fill="#fff" opacity="0"/>
</g></g>
<g class="pc" style="--dx:-90px;--d:0;--o:.15"><g filter="url(#fdGr)">${jamb(4, -1)}</g></g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15"><g filter="url(#fdGr)">${jamb(396, 1)}</g></g>
<g class="pc" style="--dy:70px;--d:.22;--o:.1"><g filter="url(#fdGr)">${course(-26, 426, 222, 18, 40, 70, 22)}</g><path d="M-26 222.500h452" stroke="#fff8e6" opacity=".4"/></g>
<g class="pc" style="--dy:-80px;--d:.3;--o:.1"><g filter="url(#fdGr)">${course(-26, 186, -12, 17, 34, 56)}${block(186, -16, 28, 23)}${course(214, 426, -12, 17, 34, 56, 30)}</g>
  <g class="fesc"><path d="M190.500 -12h19v9.500c0 7-5 11.500-9.500 14-4.500-2.500-9.500-7-9.500-14z" fill="var(--civ3)" stroke="#2a2118" stroke-width="1.100"/>
  <path d="M192.800 -9.700h14.400v7.200c0 5.400-3.800 8.900-7.200 10.900-3.400-2-7.200-5.500-7.200-10.900z" fill="none" stroke="var(--civ)" stroke-width="1.300"/>
  <path d="M192 -10.500l6 0" stroke="#fff" stroke-opacity=".45" stroke-linecap="round"/></g>
</g>
<g class="pc" style="--dy:-110px;--d:.42;--o:.08">
  <rect x="-26" y="-29" width="452" height="17" fill="#15110d"/><path d="M-26 -12.500h452" stroke="#000" stroke-opacity=".6"/>
  <g filter="url(#fdGr)">${Array.from({ length: 16 }, (_, i) => corbel(-12 + i * 28.400)).join('')}${course(-28, 428, -46, 18, 30, 46, 14)}</g>
  <path d="M-28 -46.500h456" stroke="#fff8e6" opacity=".45"/><path d="M-28 -28.500h456" stroke="#000" opacity=".55"/>
</g>
<g class="pc" style="--dy:-130px;--d:.52;--o:.06"><g filter="url(#fdGr)">${MERLONS.map(merlon).join('')}</g></g>
${cresset(-10, 104, .62, 0)}${cresset(410, 104, .68, -.45)}
<g class="pc" style="--dy:240px;--d:.75;--o:.05">
  <path d="M422 33h28v6h-28zM422 193h28v6h-28z" fill="url(#fdIron)" stroke="#0e0f11" stroke-width=".8"/>
  <rect x="443" y="31" width="10" height="10" rx="2" fill="none" stroke="#2a2e33" stroke-width="2"/><rect x="443" y="191" width="10" height="10" rx="2" fill="none" stroke="#2a2e33" stroke-width="2"/>
  <path d="M445.800 -176h4.400l2.400 326h-9.200z" fill="url(#fdSp)" stroke="#1b130b" stroke-width=".8"/>
  <path d="M445.800 -176h4.400l2.400 326h-9.200z" fill="url(#fdRound)"/>
  <path d="M444.500 172h7v68h-7z" fill="url(#fdOak)" stroke="#1b130b" stroke-width=".8"/><path d="M444.500 182l7 3M444.500 188l7 3M444.500 194l7 3M444.500 200l7 3" stroke="#2a1a0c" stroke-width="1.200"/>
  <path d="M448 144L434 172q14 6 28 0z" fill="url(#fdIron)" stroke="#0e0f11" stroke-width="1" stroke-linejoin="round"/>
  <path d="M441 160q7 3 14 0M438 167q10 4 20 0" fill="none" stroke="#c9d1d8" stroke-width=".9" opacity=".7"/>
  <path d="M443.500 -176h9l2-10-3.500 4.500-2.200-7-2.300 6-2.300-6-2.200 7-3.500-4.500z" fill="url(#fdIron)" stroke="#0e0f11" stroke-width=".8" stroke-linejoin="round"/>
</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const GRAIN = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' seed='9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .85  0 0 0 0 .8  0 0 0 0 .7  0 0 0 -1.300 .55'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
// ashlar courses: 24px high, joints staggered by half a block
const ASHLAR = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='144' height='48'>
  <g fill='#fff'><rect x='1' y='1' width='70' height='22' fill-opacity='.035'/><rect x='73' y='1' width='70' height='22' fill-opacity='.06'/>
  <rect x='-35' y='25' width='70' height='22' fill-opacity='.05'/><rect x='37' y='25' width='70' height='22' fill-opacity='.025'/><rect x='109' y='25' width='70' height='22' fill-opacity='.05'/></g>
  <g stroke='#000' stroke-opacity='.38' stroke-width='1.600'><path d='M0 24h144M0 48h144M72 0v24M36 24v24M108 24v24'/></g>
  <g stroke='#f3e6c8' stroke-opacity='.09' stroke-width='1'><path d='M0 1.500h144M0 25.500h144'/></g></svg>`);
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4.500' y='4.500' width='63' height='63' fill='none' stroke='#16130f' stroke-width='9'/><rect x='4.500' y='4.500' width='63' height='63' fill='none' stroke='#bcb095' stroke-width='5.500'/>
  <rect x='2.500' y='2.500' width='67' height='67' fill='none' stroke='#f3ead4' stroke-opacity='.7' stroke-width='1'/><rect x='6.800' y='6.800' width='58.400' height='58.400' fill='none' stroke='#5f5646' stroke-width='1'/>
  <g fill='#d9cfb6' stroke='#3b342a' stroke-width='1.200'><rect x='.6' y='.6' width='21' height='21' rx='1'/><rect x='50.400' y='.6' width='21' height='21' rx='1'/><rect x='.6' y='50.400' width='21' height='21' rx='1'/><rect x='50.400' y='50.400' width='21' height='21' rx='1'/></g>
  <g fill='none' stroke='#8e8268' stroke-width='1'><rect x='4.500' y='4.500' width='13' height='13'/><rect x='54.500' y='4.500' width='13' height='13'/><rect x='4.500' y='54.500' width='13' height='13'/><rect x='54.500' y='54.500' width='13' height='13'/></g>
  <g fill='#3b4046' stroke='#0e0f11' stroke-width='.8'><circle cx='11' cy='11' r='2.600'/><circle cx='61' cy='11' r='2.600'/><circle cx='11' cy='61' r='2.600'/><circle cx='61' cy='61' r='2.600'/></g>
  <g fill='#d8dee4'><circle cx='10.300' cy='10.300' r='.9'/><circle cx='60.300' cy='10.300' r='.9'/><circle cx='10.300' cy='60.300' r='.9'/><circle cx='60.300' cy='60.300' r='.9'/></g></svg>`);
// a small battlement standing on top of each panel
const CRENEL = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='38' height='16'><rect x='5' y='3' width='22' height='13' fill='#c9bea3' stroke='#3b342a' stroke-width='1.200'/>
  <rect x='3.500' y='.8' width='25' height='3.500' fill='#e6dcc4' stroke='#3b342a' stroke-width='1'/><path d='M6.500 6h19' stroke='#fff8e6' stroke-opacity='.6'/><path d='M7 15h18' stroke='#000' stroke-opacity='.3'/></svg>`);
// dagged cloth valance under each panel (shape only: the colour is the civ's cloth)
const DAG = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='16'><path d='M0 0h24v6c-1 6-4 9-6 9s-4-4-6-9c-2 5-4 9-6 9S1 12 0 6z'/></svg>`);

const css = `
#stage[data-kit=feudal] .dplate{color:#f6eedb;text-shadow:0 1px 0 #000;border:1px solid #16130f;border-radius:1px;
  background:${GRAIN},linear-gradient(180deg,#6b6457,#3e3930 55%,#24211c);background-blend-mode:soft-light,normal;
  box-shadow:inset 0 0 0 2px #cdbf9e,inset 0 0 0 3px #16130f,inset 0 2px 0 3px #fff3,0 6px 10px #000a}
#stage[data-kit=feudal] .dplate span{font-family:'Cinzel Decorative',serif;font-weight:700;font-size:18px;color:var(--civ);
  text-shadow:0 1px 0 #000,0 0 10px color-mix(in srgb,var(--civ) 50%,transparent)}
#stage[data-kit=feudal] .dplate .mark{margin-left:4px}
/* a swallowtail of the civ's cloth hangs off the plate's right end */
#stage[data-kit=feudal] .dplate::after{content:'';position:absolute;right:-17px;top:3px;width:18px;height:30px;
  background:linear-gradient(180deg,var(--civm) 0 2px,var(--civ3) 2px);clip-path:polygon(0 0,100% 0,55% 50%,100% 100%,0 100%);
  transform-origin:0 50%;animation:fdTail 3.200s ease-in-out infinite}
@keyframes fdTail{0%,100%{transform:skewY(-4deg) scaleX(.92)}50%{transform:skewY(5deg) scaleX(1.06)}}

/* frame details */
#stage[data-kit=feudal] .dframe .fst{fill:url(#fdS);stroke:#3b342a;stroke-width:1}
#stage[data-kit=feudal] .dframe .fhi{fill:none;stroke:#fff8e6;stroke-width:1;opacity:.6}
#stage[data-kit=feudal] .dframe .flo{fill:none;stroke:#000;stroke-width:1.200;opacity:.3}
#stage[data-kit=feudal] .dframe .ftl{fill:none;stroke:#6e644f;stroke-width:.7;opacity:.55}
#stage[data-kit=feudal] .dframe .fcap{fill:#e6dcc4;stroke:#3b342a;stroke-width:1}
#stage[data-kit=feudal] .dframe .fslit{fill:#120e0a}
#stage[data-kit=feudal] .dframe .fport{animation:fdCreak 9s ease-in-out infinite}
@keyframes fdCreak{0%,86%,100%{transform:translateY(0)}89%{transform:translateY(2.500px)}92%{transform:translateY(.6px)}95%{transform:translateY(1.600px)}}
#stage[data-kit=feudal] .dframe .fglint{animation:fdGlint 6s ease-in-out infinite}
@keyframes fdGlint{0%,60%{transform:translateX(0);opacity:0}64%{opacity:.18}96%{opacity:.18}100%{transform:translateX(340px);opacity:0}}
#stage[data-kit=feudal] .dframe .ffl{transform-box:fill-box;transform-origin:50% 100%;animation:fdFlame .9s ease-in-out infinite alternate}
@keyframes fdFlame{0%{transform:scale(1,1) skewX(0)}35%{transform:scale(.92,1.12) skewX(-6deg)}70%{transform:scale(1.06,.9) skewX(4deg)}100%{transform:scale(.96,1.08) skewX(-3deg)}}
#stage[data-kit=feudal] .dframe .fglow{animation:fdGlowA 2.300s steps(1) infinite}
@keyframes fdGlowA{0%{opacity:.9}17%{opacity:.65}31%{opacity:1}48%{opacity:.75}66%{opacity:.95}83%{opacity:.7}}
#stage[data-kit=feudal] .dframe .fesc{animation:fdEsc 5s ease-in-out infinite}
@keyframes fdEsc{0%,100%{filter:none}50%{filter:drop-shadow(0 0 4px color-mix(in srgb,var(--civ) 70%,transparent))}}
/* the gate's shadow on top of the picture, cresset light from both sides */
#stage[data-kit=feudal] .dshade{box-shadow:inset 0 0 44px rgba(0,0,0,.6),inset 0 34px 24px -18px rgba(10,6,2,.7)}
#stage[data-kit=feudal] .dshade::before{content:'';position:absolute;inset:0;animation:fdGlowA 2.300s steps(1) infinite;
  background:radial-gradient(150px 120px at 0 46%,rgba(255,150,60,.3),transparent 70%),radial-gradient(150px 120px at 100% 46%,rgba(255,150,60,.26),transparent 70%)}

/* panels: dark ashlar, a limestone rim with quoin corners and iron studs, a small battlement on top, the civ's dagged cloth below */
#stage.skinned[data-kit=feudal] .pn.kd:not(.mu){
  background:${ASHLAR},${GRAIN},linear-gradient(180deg,rgba(60,56,49,.95),rgba(29,27,23,.96));background-blend-mode:normal,soft-light,normal;
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 36px rgba(0,0,0,.5)}
#stage.skinned[data-kit=feudal] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=feudal] .pn.kd>.kd-t{height:16px;margin:0 18px -6px;background:${CRENEL} 0 100% repeat-x;filter:drop-shadow(0 -1px 2px rgba(0,0,0,.4))}
#stage.skinned[data-kit=feudal] .pn.kd>.kd-b{height:19px;margin:-3px 24px 0;transform-origin:50% 0;
  background:linear-gradient(180deg,var(--civm) 0 2.500px,var(--civ3) 2.500px,color-mix(in srgb,var(--civ3) 55%,#000));
  -webkit-mask:${DAG} 0 0/26px 19px repeat-x;mask:${DAG} 0 0/26px 19px repeat-x;animation:fin .8s .15s both,fdVal 3.400s ease-in-out infinite alternate}
@keyframes fdVal{from{transform:skewX(-6deg)}to{transform:skewX(6deg)}}
#stage.skinned[data-kit=feudal] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=feudal] .hd{border-bottom:1px solid rgba(0,0,0,.6);box-shadow:0 1px 0 rgba(243,230,200,.08)}

/* embers rising from the cressets' side of the screen, a few dust motes in the light */
#stage[data-kit=feudal] .p.ember{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fff3c4,#ffb347 40%,rgba(255,110,30,0) 70%);
  animation:fdRise var(--dur) var(--del) linear infinite,fdFlick calc(.35s + var(--k)*.5s) ease-in-out infinite alternate}
@keyframes fdRise{0%{transform:translate3d(0,240px,0);opacity:0}15%{opacity:calc(.5 + var(--k)*.5)}75%{opacity:calc(.4 + var(--k)*.4)}100%{transform:translate3d(calc(var(--j)*70px),-180px,0);opacity:0}}
@keyframes fdFlick{from{scale:.55}to{scale:1.15}}
#stage[data-kit=feudal] .p.mote{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(rgba(255,244,214,.9),transparent 70%);
  animation:fdMote var(--dur) var(--del) ease-in-out infinite alternate}
@keyframes fdMote{0%{transform:translate3d(0,0,0);opacity:.15}50%{opacity:.7}100%{transform:translate3d(calc(var(--j)*60px),calc(-30px - var(--k)*40px),0);opacity:.2}}
/* match start: a gust of heraldic cloth snippets tumbling across */
#stage[data-kit=feudal] .p.cf{width:calc(var(--s)*1.700);height:var(--s);background:var(--civ);box-shadow:0 0 0 .5px #0005;
  animation:fdCf 1.700s var(--del) cubic-bezier(.25,.1,.4,1) both,fdSpin calc(.4s + var(--k)*.4s) linear infinite,fdFlip calc(.3s + var(--k)*.3s) ease-in-out infinite alternate}
#stage[data-kit=feudal] .p.cf:nth-child(3n){background:var(--civ3)}#stage[data-kit=feudal] .p.cf:nth-child(3n+1){background:#efe6d2}
@keyframes fdCf{0%{transform:translate3d(-320px,-140px,0);opacity:0}15%{opacity:1}80%{opacity:1}100%{transform:translate3d(calc(900px + var(--j)*320px),calc(240px + var(--k)*220px),0);opacity:0}}
@keyframes fdSpin{to{rotate:360deg}}
@keyframes fdFlip{from{scale:1 1}to{scale:1 .15}}
`;

export default {
  id: 'feudal',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap',
  frame, css,
  mount: { x: 442, y: -168 }, // top-left of the civ's standard: lance axis = x 6 of the standard, lance top (below the tip) = y 8
  perch: 5, // the mascot stands in the wide crenel, hands on the parapet
  particles: [{ cls: 'ember', n: 24, zone: 'sides', size: [2, 4], dur: [4, 8] }, { cls: 'mote', n: 8, zone: [0, 380, 640, 480], size: [2, 4], dur: [5, 9] }],
  burst: [{ cls: 'cf', n: 44, zone: [-200, 200, 1000, 560], size: [5, 9], dur: [1, 1], spread: 1.1 }],
};
