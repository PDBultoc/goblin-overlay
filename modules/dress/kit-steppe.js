// KIT: Steppe (Mongols, Huns, Tatars, Cumans, Khitans, Jurchens). Felt, painted ger woodwork, rope, grass in the wind.
// The camera frame is the door of a ger: red painted posts with gold ornament, a felt roll tied on the lintel
// (the mascot sits on it), a spear pole on the right for the civ's standard. All drawings are our own.

let seed = 9; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const meander = (x0, x1, y) => { let d = ''; for (let x = x0; x + 13 <= x1; x += 14) d += `M${x} ${y + 8}V${y}H${x + 10}V${y + 6}H${x + 4}V${y + 3}H${x + 7}`; return `<path d="${d}" class="sgold"/>`; };
const diamonds = (cx, y0, y1) => { let d = '', dots = ''; for (let y = y0; y + 20 <= y1; y += 26) { d += `M${cx} ${y}l5.500 8-5.500 8-5.500-8z`; dots += `<circle cx="${cx}" cy="${y + 8}" r="1.600" fill="var(--civ3)"/>`; } return `<path d="${d}" class="sgold"/>${dots}`; };
const corner = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:2.600;--r:90deg;--d:${d};--o:0">
  <rect x="-12" y="-12" width="24" height="24" rx="2" fill="#1d3f86" stroke="#f0c552" stroke-width="1.500"/>
  <path d="M0-8l8 8-8 8-8-8zM-5-5h10v10h-10z" fill="none" stroke="#f0c552" stroke-width="1.300"/><circle r="2" fill="#f0c552"/></g></g>`;
const grass = (x0, x1, y, n) => { let s = ''; for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + r() * .8) / n, h = 14 + r() * 20, lean = (r() - .3) * 8;
  s += `<path class="gb" style="--i:${i};--k:${r().toFixed(2)}" d="M${x.toFixed(1)} ${y}q${(lean * .3).toFixed(1)} ${(-h * .6).toFixed(1)} ${lean.toFixed(1)} ${(-h).toFixed(1)}" stroke="${['#c9c16a', '#8f9a45', '#e3d98c', '#6f7d38'][i % 4]}"/>`; } return s; };
const flags = () => { let s = ''; for (let i = 0; i < 13; i++) { const x = 16 + i * 28.500; s += `<path class="sflag" style="--i:${i}" d="M${x} 2h22l-11 17z" fill="${['var(--civ3)', 'var(--civ)', '#f3ead6'][i % 3]}" stroke="#0006" stroke-width=".6"/>`; } return s; };

const frame = `
<defs>
  <linearGradient id="sRv" x1="0" x2="1"><stop offset="0" stop-color="#e06a33"/><stop offset=".5" stop-color="#b0401b"/><stop offset="1" stop-color="#6b220e"/></linearGradient>
  <linearGradient id="sRh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e57038"/><stop offset=".5" stop-color="#b0401b"/><stop offset="1" stop-color="#65200d"/></linearGradient>
  <linearGradient id="sFelt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe6d2"/><stop offset=".45" stop-color="#b9ad95"/><stop offset="1" stop-color="#6a5f4d"/></linearGradient>
  <linearGradient id="sPole" x1="0" x2="1"><stop offset="0" stop-color="#6a4a2c"/><stop offset="1" stop-color="#1f140a"/></linearGradient>
  <filter id="sFz" x="-2%" y="-10%" width="104%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .16  0 0 0 0 .1  0 0 0 -2.200 1.100"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<rect class="fin sstitch" style="--d:1.500" x="3.500" y="3.500" width="393" height="218"/>
<g class="fin" style="--d:1.700">${flags()}</g>
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  <rect x="-18" y="-16" width="21" height="256" rx="2" fill="url(#sRv)"/><path d="M-16.500 -14v252M1 -14v252" stroke="#f0c552" stroke-width="1" opacity=".8"/>${diamonds(-7.500, 2, 222)}
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  <rect x="397" y="-16" width="21" height="256" rx="2" fill="url(#sRv)"/><path d="M399 -14v252M416.500 -14v252" stroke="#f0c552" stroke-width="1" opacity=".8"/>${diamonds(407.500, 2, 222)}
</g>
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <rect x="-22" y="223" width="444" height="17" rx="2" fill="url(#sRh)"/><path d="M-20 224.500h440" stroke="#ffd98a" opacity=".7"/>${meander(8, 392, 228)}
</g>
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-22" y="-16" width="444" height="18" rx="2" fill="url(#sRh)"/><path d="M-20 -14.500h440" stroke="#ffd98a" opacity=".7"/><path d="M-20 1.500h440" stroke="#000" opacity=".6"/>${meander(8, 392, -11)}
</g>
<g class="pc" style="--dy:-120px;--r:-6deg;--d:.62;--o:.05">
  <rect x="4" y="-33" width="392" height="18" rx="9" fill="url(#sFelt)" filter="url(#sFz)" stroke="#3d3428" stroke-width="1"/>
  <ellipse cx="9" cy="-24" rx="4.500" ry="8" fill="#8d826d" stroke="#3d3428"/><path d="M9 -29a2.500 5 0 1 0 .1 0M9 -26.500a1.200 2.500 0 1 0 .1 0" fill="none" stroke="#3d3428" stroke-width=".8"/>
  <ellipse cx="391" cy="-24" rx="4.500" ry="8" fill="#8d826d" stroke="#3d3428"/><path d="M391 -29a2.500 5 0 1 0 .1 0M391 -26.500a1.200 2.500 0 1 0 .1 0" fill="none" stroke="#3d3428" stroke-width=".8"/>
  ${[70, 200, 330].map((x) => `<rect x="${x - 3.500}" y="-34.500" width="7" height="21" rx="2" fill="#4a2f17" stroke="#1f1206"/><path d="M${x - 3} -30l6 3M${x - 3} -24l6 3M${x - 3} -18l6 3" stroke="#b98f5a" stroke-width="1"/><path d="M${x} -14v9l-2 5M${x} -5l2 5" stroke="#4a2f17" stroke-width="1.600" fill="none" stroke-linecap="round"/>`).join('')}
</g>
${corner(-9, -8, .5)}${corner(409, -8, .56)}${corner(-9, 232, .62)}${corner(409, 232, .68)}
<g class="pc" style="--dy:200px;--d:.75;--o:.05">
  <rect x="444" y="-118" width="8" height="358" rx="3" fill="url(#sPole)"/>
  ${[-104, -20, 96, 214].map((y) => `<rect x="443" y="${y}" width="10" height="5" rx="1" fill="#f0c552" stroke="#6b4a10" stroke-width=".7"/>`).join('')}
  <rect x="416" y="44" width="30" height="6" rx="2" fill="#4a2f17" stroke="#1f1206"/><rect x="416" y="184" width="30" height="6" rx="2" fill="#4a2f17" stroke="#1f1206"/>
</g>
<g class="fin sgrass" style="--d:1.800">${grass(-22, 470, 241, 46)}</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const FELT = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.150' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .9  0 0 0 0 .82  0 0 0 0 .68  0 0 0 -1.100 .5'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#1f1206' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#6f4423' stroke-width='5.500'/>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#f3e3bd' stroke-width='1.500' stroke-dasharray='5 3.500'/>
  <g fill='#b6421c' stroke='#f0c552' stroke-width='1.200'><rect x='.6' y='.6' width='20' height='20' rx='2'/><rect x='51.400' y='.6' width='20' height='20' rx='2'/><rect x='.6' y='51.400' width='20' height='20' rx='2'/><rect x='51.400' y='51.400' width='20' height='20' rx='2'/></g>
  <g fill='none' stroke='#f0c552' stroke-width='1.200'><path d='M10.600 4l6.600 6.600-6.600 6.600L4 10.600zM6.600 6.600h8v8h-8z'/><path d='M61.400 4l6.600 6.600-6.600 6.600-6.600-6.600zM57.400 6.600h8v8h-8z'/><path d='M10.600 54.800l6.600 6.600-6.600 6.600L4 61.400zM6.600 57.400h8v8h-8z'/><path d='M61.400 54.800l6.600 6.600-6.600 6.600-6.600-6.600zM57.400 57.400h8v8h-8z'/></g></svg>`);
const BAND = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='28' height='9'><rect width='28' height='9' fill='#b6421c'/><path d='M0 .5h28M0 8.500h28' stroke='#f0c552' stroke-width='1'/><path d='M2 7V2.500h8v3h-4M16 7V2.500h8v3h-4' fill='none' stroke='#f0c552' stroke-width='1.100'/></svg>`);
const blades = (sd, cols) => { let s = sd, out = ''; const q = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 30; i++) { const x = 4 + i * 8 + q() * 5, h = 5 + q() * 10, l = (q() - .4) * 7; out += `<path d='M${x.toFixed(1)} 22q${(l * .3).toFixed(1)} ${(-h * .6).toFixed(1)} ${l.toFixed(1)} ${(-h).toFixed(1)}' stroke='${cols[i % cols.length]}'/>`; }
  return svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='248' height='22'><g fill='none' stroke-width='1.700' stroke-linecap='round'>${out}</g></svg>`); };
const GRASS1 = blades(3, ['#c9c16a', '#8f9a45', '#e3d98c']), GRASS2 = blades(17, ['#6f7d38', '#a7a556']);

const css = `
#stage[data-kit=steppe] .dplate{color:#fbf1da;text-shadow:0 1px 0 #3a1206;border:1px solid #f0c552;border-radius:2px;outline:1px solid #3a1206;
  background:linear-gradient(180deg,#e06a33,#b0401b 55%,#6b220e);box-shadow:inset 0 0 0 2px #7a2812,0 6px 10px #000a}
#stage[data-kit=steppe] .dplate span{font-family:'Trade Winds',serif;font-size:18px;color:var(--civ);text-shadow:0 1px 0 #3a1206,0 0 10px color-mix(in srgb,var(--civ) 55%,transparent)}

#stage[data-kit=steppe] .dframe .sgold{fill:none;stroke:#f0c552;stroke-width:1.400;stroke-linejoin:round}
#stage[data-kit=steppe] .dframe .sstitch{fill:none;stroke:var(--civ);stroke-width:1.800;stroke-dasharray:8 5;stroke-linecap:round;opacity:.85;filter:drop-shadow(0 0 3px color-mix(in srgb,var(--civ) 60%,transparent))}
#stage[data-kit=steppe] .dframe .sflag{transform-box:fill-box;transform-origin:50% 0;animation:sFlag 1.700s calc(var(--i)*-.21s) ease-in-out infinite alternate}
@keyframes sFlag{from{transform:skewX(-14deg) scaleY(.94)}to{transform:skewX(18deg) scaleY(1.04)}}
#stage[data-kit=steppe] .dframe .gb{fill:none;stroke-width:2.300;stroke-linecap:round;transform-box:fill-box;transform-origin:50% 100%;
  animation:sBlade calc(2.200s + var(--k)*1.400s) calc(var(--i)*-.19s) ease-in-out infinite alternate}
@keyframes sBlade{from{transform:rotate(-7deg)}to{transform:rotate(17deg)}}
#stage[data-kit=steppe] .dshade{box-shadow:inset 0 0 44px rgba(0,0,0,.55),inset 0 0 0 6px rgba(74,62,48,.5);
  background:radial-gradient(260px 150px at 0 0,rgba(255,196,110,.26),transparent 70%)}

/* panels: dark felt, leather rim with stitches, painted corner blocks, a painted band on top, grass along the foot */
#stage.skinned[data-kit=steppe] .pn.kd:not(.mu){
  background:${FELT},linear-gradient(180deg,rgba(62,53,44,calc(var(--glass,.55)*1.35)),rgba(30,25,20,calc(var(--glass,.55)*1.36)));background-blend-mode:soft-light,normal;
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,calc(var(--glass,.55)*1.28)),inset 0 0 36px rgba(0,0,0,.5)}
#stage.skinned[data-kit=steppe] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=steppe] .pn.kd>.kd-t{height:9px;margin:0 16px -3px;background:${BAND} 0 0 repeat-x;box-shadow:0 2px 3px rgba(0,0,0,.6)}
#stage.skinned[data-kit=steppe] .pn.kd>.kd-b{height:22px;margin:-11px 10px 0}
#stage.skinned[data-kit=steppe] .pn.kd>.kd-b::before,#stage.skinned[data-kit=steppe] .pn.kd>.kd-b::after{content:'';position:absolute;inset:0;transform-origin:50% 100%;
  background:${GRASS1} 0 0 repeat-x;animation:sField 2.600s ease-in-out infinite alternate}
#stage.skinned[data-kit=steppe] .pn.kd>.kd-b::after{background-image:${GRASS2};background-position:60px 0;animation-duration:3.400s;animation-delay:-1.200s}
@keyframes sField{from{transform:skewX(-9deg)}to{transform:skewX(15deg)}}
#stage.skinned[data-kit=steppe] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}

/* wind: seeds and long streaks blowing left to right */
#stage[data-kit=steppe] .p.seed{width:var(--s);height:calc(var(--s)*.6);border-radius:50%;background:#f6ecc8;box-shadow:0 0 4px #fff6;
  animation:sSeed var(--dur) var(--del) linear infinite,sBob calc(1.500s + var(--k)*2s) ease-in-out infinite alternate}
@keyframes sSeed{0%{transform:translate3d(-220px,0,0);opacity:0}15%{opacity:calc(.35 + var(--k)*.55)}80%{opacity:calc(.35 + var(--k)*.55)}100%{transform:translate3d(480px,calc(var(--j)*70px),0);opacity:0}}
@keyframes sBob{from{translate:0 -10px}to{translate:0 12px}}
#stage[data-kit=steppe] .p.wind{width:calc(var(--s)*60);height:1.500px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(255,246,214,.5),transparent);
  animation:sWind var(--dur) var(--del) cubic-bezier(.4,0,.6,1) infinite}
@keyframes sWind{0%{transform:translate3d(-500px,0,0) scaleX(.4);opacity:0}30%{opacity:.7}100%{transform:translate3d(900px,calc(var(--j)*30px),0) scaleX(1.200);opacity:0}}
#stage[data-kit=steppe] .p.dust{width:calc(var(--s)*8);height:var(--s);border-radius:50%;background:linear-gradient(90deg,transparent,#ecd9a6);
  animation:sDust 1.300s var(--del) cubic-bezier(.3,0,.5,1) both}
@keyframes sDust{0%{transform:translate3d(-500px,20px,0) rotate(-4deg);opacity:0}25%{opacity:.9}100%{transform:translate3d(1500px,calc(-60px + var(--j)*90px),0) rotate(-4deg);opacity:0}}
`;

export default {
  id: 'steppe',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Trade+Winds&display=swap',
  frame, css,
  mount: { x: 393, y: -168 }, // the civ's standard sits on the pole top (pole axis = x 55 of the standard, pole top = y 50)
  perch: 23, // hands on the felt roll
  particles: [{ cls: 'seed', n: 26, zone: 'sides', size: [3, 6], dur: [5, 10] }, { cls: 'wind', n: 6, zone: 'all', size: [3, 6], dur: [2.6, 5] }],
  burst: [{ cls: 'dust', n: 50, zone: [-200, 60, 1100, 700], size: [2, 5], dur: [1, 1], spread: 1.1 }],
};
