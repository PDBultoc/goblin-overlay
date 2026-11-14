// KIT: Southeast Asia (Khmer, Malay, Burmese, Vietnamese). Carved teak, bamboo with rattan lashing, palm thatch,
// tropical humidity. The camera frame is the gable of a stilt house: a fringed palm-thatch overhang along the top
// (the mascot sits on its ridge), carved V-shaped gable finials curling up at both top corners, bamboo posts bound
// with rattan, woven rattan corner panels, and a bamboo pole on the right that carries the civ's standard.
// Secular house architecture only. All drawings are our own.

let seed = 13; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// palm-thatch fronds hanging from a ridge: one path of thin tapering strands
const fronds = (x0, x1, yTop, yBot, step, w, jit) => { let d = '';
  for (let x = x0; x < x1; x += step * (.7 + r() * .6)) { const yb = yBot + r() * jit, lean = (r() - .5) * 5;
    d += `M${(x - w / 2).toFixed(1)} ${yTop}L${(x + lean).toFixed(1)} ${yb.toFixed(1)}L${(x + w / 2).toFixed(1)} ${yTop}z`; }
  return d; };
// rattan lashing: diagonal wraps around a bamboo joint
const lash = (x, y, w, h) => { let d = ''; for (let i = 1; i < h - 1; i += 2.400) d += `M${x} ${(y + i).toFixed(1)}l${w} 1.800`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.500" fill="#4b3212" stroke="#1e1306" stroke-width=".8"/><path d="${d}" stroke="#d9b56a" stroke-width="1.300"/><path d="${d}" stroke="#3a250c" stroke-width=".5" transform="translate(0 1.100)"/>`; };
// bamboo stem with nodes
const bamboo = (x, y0, y1, w, nodes, id = 'seaBb') => `<rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" rx="${(w / 2.600).toFixed(1)}" fill="url(#${id})" stroke="#2d240c" stroke-width=".8"/>
  <path d="M${(x + w * .27).toFixed(1)} ${y0 + 3}V${y1 - 3}" stroke="#fff6cf" stroke-opacity=".5" stroke-width="1.400" stroke-linecap="round"/>
  ${nodes.map((y) => `<path d="M${x} ${y}h${w}" stroke="#3d3010" stroke-width="2.200"/><path d="M${x + 1} ${y + 2.200}h${w - 2}" stroke="#f4e4a6" stroke-opacity=".6" stroke-width="1"/><path d="M${x + 1} ${y - 2}h${w - 2}" stroke="#8a7530" stroke-width="1"/>`).join('')}`;
// carved teak tendril scroll along a beam
const scroll = (x0, x1, y) => { let d = '';
  for (let x = x0; x + 26 <= x1; x += 26) d += `M${x} ${y}c4-7 9-7 13 0s9 7 13 0M${x + 6.500} ${y - 2.500}a2.200 2.200 0 1 1 .1 0M${x + 19.500} ${y + 2.500}a2.200 2.200 0 1 1 .1 0`;
  return `<path d="${d}" class="scd"/><path d="${d}" class="scl" transform="translate(.8 .8)"/>`; };
// V-shaped carved gable finial (two boards crossing low behind the thatch, tips curling up and out)
const finial = (cx, d, flip) => `<g transform="translate(${cx} 0) scale(${flip ? -1.250 : 1.250} 1.250)"><g class="pc" style="--dy:-80px;--r:${flip ? 30 : -30}deg;--d:${d};--o:0">
  <path d="M11 -22C2 -42-11 -58-13 -76c-1-9-9-13-13-8-3 4 0 8 4 6M-9 -22C0 -42 14 -60 17 -80c1-9 9-13 13-8 3 4 0 8-4 6" class="sfo"/>
  <path d="M11 -22C2 -42-11 -58-13 -76c-1-9-9-13-13-8-3 4 0 8 4 6M-9 -22C0 -42 14 -60 17 -80c1-9 9-13 13-8 3 4 0 8-4 6" class="sfi"/>
  <path d="M8 -30C1 -44-9 -58-11 -72M-6 -30C1 -44 12 -60 15 -76" class="sfh"/>
  <path d="M5 -40l-4 2M-3 -40l4 2M1 -52l-5 1M3 -52l5 1" stroke="#1d0f05" stroke-width="1.100"/></g></g>`;
const corner = (x, flip, d) => `<g transform="translate(${x} 0) scale(${flip ? -1 : 1} 1)"><g class="pc" style="--sc:2.400;--d:${d};--o:0">
  <path d="M0 0H36L0 36z" fill="url(#seaWv)" stroke="#1e1306" stroke-width="1"/><path d="M36 0L0 36" stroke="#5c3416" stroke-width="4"/><path d="M36.500 1.500L1.500 36.500" stroke="#c98d55" stroke-width="1" opacity=".7"/>
  <circle cx="11" cy="11" r="2.600" fill="#6b3a1a" stroke="#e0b672" stroke-width=".8"/></g></g>`;

const frame = `
<defs>
  <linearGradient id="seaBb" x1="0" x2="1"><stop offset="0" stop-color="#e9d68d"/><stop offset=".35" stop-color="#c2a856"/><stop offset=".75" stop-color="#857030"/><stop offset="1" stop-color="#4c3e17"/></linearGradient>
  <linearGradient id="seaBh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9d68d"/><stop offset=".4" stop-color="#c2a856"/><stop offset="1" stop-color="#5a4a1c"/></linearGradient>
  <linearGradient id="seaTk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a7643a"/><stop offset=".5" stop-color="#6e3a19"/><stop offset="1" stop-color="#341a0a"/></linearGradient>
  <linearGradient id="seaTh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a30"/><stop offset="1" stop-color="#3b2a10"/></linearGradient>
  <linearGradient id="seaRd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2c37e"/><stop offset=".5" stop-color="#a98140"/><stop offset="1" stop-color="#5e4318"/></linearGradient>
  <pattern id="seaWv" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#4a3112"/>
    <rect x=".3" y=".6" width="3.400" height="2.800" rx="1" fill="#d8b66e"/><rect x="4.300" y="4.600" width="3.400" height="2.800" rx="1" fill="#d8b66e"/>
    <rect x="4.600" y=".3" width="2.800" height="3.400" rx="1" fill="#a9884a"/><rect x=".6" y="4.300" width="2.800" height="3.400" rx="1" fill="#a9884a"/></pattern>
  <filter id="seaGr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".014 .6" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .07  0 0 0 0 .03  0 0 0 0 0  0 0 0 -1.500 .72"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<rect class="fin sglow" style="--d:1.500" x="4" y="4" width="392" height="217" rx="2"/>
${corner(0, false, .5)}${corner(400, true, .56)}
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  ${bamboo(-17, -12, 240, 19, [36, 88, 140, 192])}${lash(-19, 2, 23, 14)}${lash(-19, 112, 23, 10)}${lash(-19, 214, 23, 12)}
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  ${bamboo(398, -12, 240, 19, [36, 88, 140, 192])}${lash(396, 2, 23, 14)}${lash(396, 112, 23, 10)}${lash(396, 214, 23, 12)}
</g>
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <rect x="-22" y="223" width="444" height="17" rx="2" fill="url(#seaTk)" filter="url(#seaGr)"/><path d="M-20 224h440" stroke="#e0a874" stroke-width="1" opacity=".55"/>
  ${scroll(4, 396, 232)}
</g>
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-22" y="-14" width="444" height="17" rx="2" fill="url(#seaTk)" filter="url(#seaGr)"/><path d="M-20 2h440" stroke="#000" opacity=".6"/>
  <rect x="-12" y="-9" width="424" height="9" fill="url(#seaWv)" stroke="#1e1306" stroke-width=".8"/>
</g>
${finial(2, .5, false)}${finial(418, .56, true)}
<g class="pc" style="--dy:-120px;--r:-4deg;--d:.62;--o:.05">
  <path d="M-30 -4L-27 -38Q200 -50 427 -38L432 -4z" fill="url(#seaTh)"/>
  <g class="sfr a"><path d="${fronds(-30, 432, -40, -1, 4.500, 5, 15)}" fill="#5a4118"/></g>
  <g class="sfr b"><path d="${fronds(-28, 430, -42, -9, 5, 4.500, 15)}" fill="#a07d3c"/></g>
  <g class="sfr c"><path d="${fronds(-26, 428, -42, -18, 6, 3, 15)}" fill="#d9bb72"/></g>
  <rect x="-30" y="-50" width="462" height="12" rx="6" fill="url(#seaRd)" stroke="#3b2a10" stroke-width="1"/>
  <path d="${fronds(-26, 428, -49, -43, 3, 2, 1)}" fill="#f0d898" opacity=".55"/>
  ${[30, 110, 190, 270, 350].map((x) => lash(x - 4, -51, 8, 14)).join('')}
</g>
<g class="pc" style="--dy:200px;--d:.75;--o:.05">
  ${bamboo(451, -112, 240, 10, [-70, -22, 26, 74, 122, 170, 218])}
  <path d="M451 -110l10-6v4l-10 6z" fill="#f1e4b0" stroke="#2d240c" stroke-width=".8"/>
  ${bamboo(410, 38, 46, 50, [], 'seaBh')}${bamboo(410, 180, 188, 50, [], 'seaBh')}
  ${lash(449, 35, 14, 14)}${lash(449, 177, 14, 14)}
</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const WEAVE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><g fill='#d8b66e' fill-opacity='.11'><rect x='.6' y='1.200' width='6.800' height='5.600' rx='2'/><rect x='8.600' y='9.200' width='6.800' height='5.600' rx='2'/></g>
  <g fill='#a9884a' fill-opacity='.08'><rect x='9.200' y='.6' width='5.600' height='6.800' rx='2'/><rect x='1.200' y='8.600' width='5.600' height='6.800' rx='2'/></g></svg>`);
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#170c04' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#7a4320' stroke-width='5'/>
  <rect x='8.500' y='8.500' width='55' height='55' fill='none' stroke='#d9b46a' stroke-opacity='.6' stroke-width='1'/><path d='M1.800 70V1.800H70' fill='none' stroke='#e0a874' stroke-opacity='.5' stroke-width='1'/>
  <g fill='#4b3212' stroke='#1e1306' stroke-width='1'><rect x='.5' y='.5' width='18' height='18' rx='3'/><rect x='53.500' y='.5' width='18' height='18' rx='3'/><rect x='.5' y='53.500' width='18' height='18' rx='3'/><rect x='53.500' y='53.500' width='18' height='18' rx='3'/></g>
  <g stroke='#d9b56a' stroke-width='1.300'><path d='M2 4l15 3M2 8l15 3M2 12l15 3M55 4l15 3M55 8l15 3M55 12l15 3M2 57l15 3M2 61l15 3M2 65l15 3M55 57l15 3M55 61l15 3M55 65l15 3'/></g></svg>`);
let s2 = 5; const q = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
const strip = (cols) => { let o = ''; cols.forEach(([c, y1, j], k) => { let d = ''; for (let x = 0; x < 120; x += 3 + q() * 2.500) { const yb = y1 + q() * j; d += `M${(x - 2).toFixed(1)} 4L${(x + (q() - .5) * 3).toFixed(1)} ${yb.toFixed(1)}L${(x + 2).toFixed(1)} 4z`; } o += `<path d='${d}' fill='${c}'/>`; }); return o; };
const THATCH = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='24'>${strip([['#4a3512', 16, 7], ['#9a773a', 12, 8], ['#d9bb72', 8, 7]])}<rect x='0' y='0' width='120' height='6' rx='3' fill='#b08a48'/><path d='M0 1.500h120' stroke='#f0d898' stroke-opacity='.6'/></svg>`);
const CHIMES = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='96' height='32'><path d='M24 0v8M70 0v5' stroke='#d9b56a' stroke-width='1'/>
  <rect x='21' y='8' width='6' height='20' rx='2.500' fill='#c2a856' stroke='#2d240c' stroke-width='.7'/><path d='M21 15h6' stroke='#3d3010'/><path d='M22.600 9v18' stroke='#fff6cf' stroke-opacity='.6'/>
  <rect x='67.500' y='5' width='5' height='14' rx='2' fill='#a98140' stroke='#2d240c' stroke-width='.7'/><path d='M67.500 11h5' stroke='#3d3010'/><circle cx='70' cy='22' r='2' fill='#6e3a19'/></svg>`);
const LEAF = `<svg viewBox="0 0 16 8"><path d="M0 4C4-1 11-1 16 4 11 9 4 9 0 4z" fill="currentColor"/><path d="M1 4H15M5 4l2-2M9 4l2-2M5 4l2 2M9 4l2 2" stroke="#0005" stroke-width=".6" fill="none"/></svg>`;

const css = `
#stage[data-kit=sea] .dplate{color:#fbeed6;text-shadow:0 1px 0 #000;border:1px solid #1e1306;border-radius:3px;padding:0 24px 0 16px;
  background:repeating-linear-gradient(90deg,transparent 0 37px,rgba(0,0,0,.18) 37px 38px),linear-gradient(180deg,#a7643a,#6e3a19 55%,#3a1d0b);
  box-shadow:inset 0 1px 0 #f0b98088,inset 0 -2px 0 #0008,0 6px 10px #000a}
#stage[data-kit=sea] .dplate::before,#stage[data-kit=sea] .dplate::after{content:'';position:absolute;top:-3px;bottom:-3px;width:9px;border-radius:2px;
  background:repeating-linear-gradient(170deg,#d9b56a 0 1.500px,#4b3212 1.500px 3px);box-shadow:0 0 0 1px #1e1306}
#stage[data-kit=sea] .dplate::before{left:3px}#stage[data-kit=sea] .dplate::after{right:4px}
#stage[data-kit=sea] .dplate span{font-family:Kavoon,serif;font-size:18px;color:var(--civ);text-shadow:0 1px 0 #1a0b03,0 0 10px color-mix(in srgb,var(--civ) 55%,transparent)}

#stage[data-kit=sea] .dframe .scd{fill:none;stroke:#1d0f05;stroke-width:1.900;stroke-linecap:round}
#stage[data-kit=sea] .dframe .scl{fill:none;stroke:#e9b27a;stroke-width:.7;opacity:.55;stroke-linecap:round}
#stage[data-kit=sea] .dframe .sfo{fill:none;stroke:#1d0f05;stroke-width:8;stroke-linecap:round;stroke-linejoin:round}
#stage[data-kit=sea] .dframe .sfi{fill:none;stroke:#8a4c22;stroke-width:5.500;stroke-linecap:round;stroke-linejoin:round}
#stage[data-kit=sea] .dframe .sfh{fill:none;stroke:#e9b27a;stroke-width:1.200;opacity:.7;stroke-linecap:round}
#stage[data-kit=sea] .dframe .sglow{fill:none;stroke:var(--civ);stroke-width:1.600;opacity:.75;filter:drop-shadow(0 0 5px var(--civ));animation:seaGlow 5s ease-in-out infinite}
@keyframes seaGlow{50%{opacity:.35}}
#stage[data-kit=sea] .dframe .sfr{transform-box:fill-box;transform-origin:50% 0;animation:seaFr 4.600s ease-in-out infinite alternate}
#stage[data-kit=sea] .dframe .sfr.b{animation-duration:3.700s;animation-delay:-1.300s}
#stage[data-kit=sea] .dframe .sfr.c{animation-duration:3.100s;animation-delay:-2.100s}
@keyframes seaFr{from{transform:skewX(-4deg)}to{transform:skewX(5deg) scaleY(1.03)}}
/* shade under the thatch, warm light through the leaves, humid mist drifting at the foot of the picture */
#stage[data-kit=sea] .dshade{overflow:hidden;box-shadow:inset 0 0 46px rgba(0,0,0,.55),inset 0 22px 26px -12px rgba(28,16,4,.7);
  background:radial-gradient(240px 120px at 35% 0,rgba(255,214,120,.2),transparent 70%)}
#stage[data-kit=sea] .dshade::before{content:'';position:absolute;left:-60px;right:-60px;bottom:-10px;height:110px;animation:seaMist 13s ease-in-out infinite alternate;
  background:radial-gradient(140px 40px at 22% 80%,rgba(225,242,232,.26),transparent 70%),radial-gradient(180px 46px at 66% 88%,rgba(225,242,232,.22),transparent 70%),radial-gradient(120px 34px at 92% 70%,rgba(225,242,232,.16),transparent 70%)}
@keyframes seaMist{from{transform:translateX(-36px)}to{transform:translateX(36px)}}

/* panels: dark teak with a woven rattan sheen, lashed corners, a thatch fringe on top, bamboo chimes below */
#stage.skinned[data-kit=sea] .pn.kd:not(.mu){
  background:${WEAVE},linear-gradient(180deg,rgba(66,38,18,.95),rgba(28,15,6,.96));
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 34px rgba(0,0,0,.5)}
#stage.skinned[data-kit=sea] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=sea] .pn.kd>.kd-t{height:24px;margin:0 2px -9px;background:${THATCH} 0 0 repeat-x;transform-origin:50% 0;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 16px,#000 calc(100% - 16px),transparent);mask-image:linear-gradient(90deg,transparent,#000 16px,#000 calc(100% - 16px),transparent);
  animation:fin .8s .15s both,seaFr 3.800s ease-in-out infinite alternate}
#stage.skinned[data-kit=sea] .pn.kd>.kd-b{height:32px;margin:3px 20px 0;background:${CHIMES} 0 0 repeat-x;transform-origin:50% 0;animation:fin .8s .15s both,seaChime 2.600s ease-in-out infinite alternate}
@keyframes seaChime{from{transform:skewX(-6deg)}to{transform:skewX(6deg)}}
#stage.skinned[data-kit=sea] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=sea] .hd{border-bottom:1px solid rgba(0,0,0,.6);box-shadow:0 1px 0 rgba(255,210,150,.08)}

/* fireflies blinking in the humid air, leaves drifting down; the entrance blows a gust of leaves across */
#stage[data-kit=sea] .p.fly{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fffbe0,#ffe46a 38%,rgba(255,214,90,.25) 60%,transparent 72%);
  animation:seaFly var(--dur) var(--del) ease-in-out infinite,seaBlink calc(1.400s + var(--k)*2.200s) calc(var(--k)*-3s) ease-in-out infinite alternate}
@keyframes seaFly{0%{transform:translate3d(0,0,0)}25%{transform:translate3d(calc(var(--j)*40px),-30px,0)}50%{transform:translate3d(calc(var(--j)*-20px),-62px,0)}75%{transform:translate3d(calc(var(--j)*30px),-24px,0)}100%{transform:translate3d(0,0,0)}}
@keyframes seaBlink{0%,35%{opacity:.08}70%,100%{opacity:calc(.65 + var(--k)*.35)}}
#stage[data-kit=sea] .p.leaf{color:#6f9a34;animation:seaFall var(--dur) var(--del) linear infinite,seaSwing calc(2s + var(--k)*1.600s) ease-in-out infinite alternate}
#stage[data-kit=sea] .p.leaf:nth-child(3n){color:#c9a23c}#stage[data-kit=sea] .p.leaf:nth-child(3n+1){color:#4c7a2a}
#stage[data-kit=sea] :is(.p.leaf,.p.gleaf) svg{display:block;width:calc(var(--s)*2.400);height:var(--s)}
@keyframes seaFall{0%{transform:translate3d(0,-160px,0);opacity:0}10%{opacity:.9}88%{opacity:.9}100%{transform:translate3d(calc(var(--j)*90px),420px,0);opacity:0}}
@keyframes seaSwing{from{rotate:-40deg;translate:-18px 0}to{rotate:35deg;translate:18px 0}}
#stage[data-kit=sea] .p.gleaf{color:#7aa83a;animation:seaGust 1.400s var(--del) cubic-bezier(.3,0,.5,1) both}
#stage[data-kit=sea] .p.gleaf:nth-child(3n){color:#d2ab44}#stage[data-kit=sea] .p.gleaf:nth-child(3n+1){color:#4c7a2a}
@keyframes seaGust{0%{transform:translate3d(-500px,-30px,0) rotate(0);opacity:0}20%{opacity:1}100%{transform:translate3d(1500px,calc(120px + var(--j)*90px),0) rotate(calc(540deg + var(--k)*400deg));opacity:0}}
`;

export default {
  id: 'sea',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Kavoon&display=swap',
  frame, css,
  mount: { x: 396, y: -172 }, // the civ's standard: pole axis = x 60 of the standard, pole top = y 60
  perch: 10, // hands on the thatch ridge
  particles: [{ cls: 'fly', n: 24, zone: 'sides', size: [4, 7], dur: [6, 11] }, { cls: 'leaf', n: 8, zone: [0, 60, 620, 640], size: [6, 9], dur: [13, 20], html: LEAF }],
  burst: [{ cls: 'gleaf', n: 36, zone: [-200, 40, 1100, 720], size: [5, 9], dur: [1, 1], spread: 1.1, html: LEAF }],
};
