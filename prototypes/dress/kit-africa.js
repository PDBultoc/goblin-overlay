// KIT: Africa (Ethiopians, Malians). Sun-baked adobe mud plaster, palm-wood beams, woven and mud-dyed cloth,
// heat shimmer and dust. The camera frame is a Sahel adobe gateway of a house (secular): smooth hand-moulded mud
// towers with soft edges, palm-wood torons (stakes) sticking out in rows, rounded conical pinnacles along the top,
// triangular vents in the lintel, a palm-wood pole with a crossbar on the right for the civ's standard.
// The kit stays neutral: each civ adds its own architecture and gear on top. All drawings are our own.

let sd = 5; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
const f1 = (v) => v.toFixed(1);

// hand-smoothing swipes in the plaster
const swipes = (x0, x1, y0, y1, n) => { let d = ''; for (let i = 0; i < n; i++) { const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0), w = 5 + rnd() * 9;
  d += `M${f1(x)} ${f1(y)}q${f1(w / 2)} ${f1(-1.5 - rnd() * 2)} ${f1(w)} 0`; } return `<path d="${d}" class="afsw"/>`; };
// a toron seen end-on: palm-wood stake end with its shadow on the wall
const toron = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="1.800" cy="3.400" rx="3.800" ry="1.800" fill="#2a1408" opacity=".45"/>
  <rect x="-3" y="-2.600" width="6" height="5.200" rx="2.200" fill="#6b4524" stroke="#24140a" stroke-width=".7"/><circle r="1.300" fill="none" stroke="#b08250" stroke-width=".6"/></g>`;
// a toron seen from the side, sticking out of the wall
const stub = (x, y, len) => `<rect x="${x}" y="${y - 1.8}" width="${len}" height="3.600" rx="1.600" fill="#6b4524" stroke="#24140a" stroke-width=".6"/><path d="M${x + 1} ${y - 1}h${len - 2}" stroke="#b08250" stroke-width=".6" opacity=".7"/>`;

// soft hand-moulded tower: centre c, pinnacle top t
const towerPath = (c, t) => `M${c - 19} 250C${c - 21} 170 ${c - 16} 90 ${c - 20} 10C${c - 21} ${f1(t * .4)} ${c - 13} ${t + 14} ${c - 4} ${t + 2}Q${c} ${t - 3} ${c + 4} ${t + 2}C${c + 13} ${t + 14} ${c + 21} ${f1(t * .4)} ${c + 20} 10C${c + 16} 90 ${c + 21} 170 ${c + 19} 250Z`;
const tower = (c, t, side) => `
  <path d="${towerPath(c, t)}" fill="url(#afV)" filter="url(#afG)" stroke="#3a1f0c" stroke-width="1.100"/>
  <path d="M${c - 17} 244C${c - 19} 170 ${c - 14} 90 ${c - 18} 10C${c - 19} ${f1(t * .4)} ${c - 12} ${t + 15} ${c - 4} ${t + 4}" fill="none" stroke="#f6d3a0" stroke-width="1.300" opacity=".55" stroke-linecap="round"/>
  <path d="M${c + 17} 244C${c + 19} 170 ${c + 14} 90 ${c + 18} 10" fill="none" stroke="#2a1408" stroke-width="2.400" opacity=".35"/>
  ${swipes(c - 15, c + 8, t + 20, 236, 16)}
  ${[18, 68, 118, 168, 214].map((y, i) => toron(c - 8 + (i % 2) * 6, y) + toron(c + 5 + (i % 2) * 4, y + 3)).join('')}
  ${side > 0 ? [0, 60, 120, 180].map((y) => stub(c + 19, y, 10)).join('') : ''}`;

// rounded mud pinnacle on the top edge; every other one has a stake through it
const pin = (c, h, i) => `<g class="pc" style="--dy:-60px;--d:${(.62 + i * .05).toFixed(2)};--o:0">
  <path d="M${c - 9} -16C${f1(c - 9.5)} ${f1(-16 - h * .45)} ${c - 4} ${f1(-16 - h * .85)} ${c} ${-16 - h}C${c + 4} ${f1(-16 - h * .85)} ${f1(c + 9.5)} ${f1(-16 - h * .45)} ${c + 9} -16Z" fill="url(#afP)" filter="url(#afG)" stroke="#4a2810" stroke-width=".9"/>
  <path d="M${c - 7} -18C${c - 7} ${f1(-16 - h * .45)} ${c - 3} ${f1(-16 - h * .8)} ${f1(c - .5)} ${f1(-16 - h * .96)}" fill="none" stroke="#f6d3a0" stroke-width="1" opacity=".55" stroke-linecap="round"/>
  ${i % 2 ? '' : `<path d="M${c - 12} ${f1(-16 - h * .42)}h24" stroke="#5a3a1c" stroke-width="2.600" stroke-linecap="round"/><path d="M${c - 11} ${f1(-16.8 - h * .42)}h22" stroke="#b08250" stroke-width=".7" opacity=".7"/>`}</g>`;
const vent = (x) => `<path d="M${x - 5} -3l5-10 5 10z" fill="#2a1408" opacity=".85"/><path d="M${x - 5} -2.500h10" stroke="#f6d3a0" stroke-width=".7" opacity=".5"/>`;

const LINTEL = 'M-14 4C60 6 140 3 200 5S340 3 414 4L414 -20C340 -23 260 -19 200 -22S60 -19 -14 -21Z';
let chev = ''; for (let y = -116; y < 246; y += 7) chev += `M439 ${y}l5.500 3 5.500-3`;

const frame = `
<defs>
  <linearGradient id="afV" x1="0" x2="1"><stop offset="0" stop-color="#d9a066"/><stop offset=".5" stop-color="#a8693a"/><stop offset="1" stop-color="#6e3f1f"/></linearGradient>
  <linearGradient id="afH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dba76c"/><stop offset=".55" stop-color="#a8693a"/><stop offset="1" stop-color="#6a3c1d"/></linearGradient>
  <linearGradient id="afP" x1="0" x2="1"><stop offset="0" stop-color="#e4b073"/><stop offset=".5" stop-color="#b47540"/><stop offset="1" stop-color="#7a4421"/></linearGradient>
  <linearGradient id="afPalm" x1="0" x2="1"><stop offset="0" stop-color="#9a7248"/><stop offset=".5" stop-color="#6b4a2a"/><stop offset="1" stop-color="#3a2614"/></linearGradient>
  <linearGradient id="afSun" x1="0" x2="1"><stop offset="0" stop-color="#fff2d6" stop-opacity="0"/><stop offset=".5" stop-color="#fff2d6" stop-opacity=".38"/><stop offset="1" stop-color="#fff2d6" stop-opacity="0"/></linearGradient>
  <clipPath id="afLc"><path d="${LINTEL}"/></clipPath>
  <filter id="afG" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="4" seed="9" result="b"/><feColorMatrix in="b" values="0 0 0 0 .3  0 0 0 0 .16  0 0 0 0 .06  0 0 0 -1.300 .74" result="bm"/>
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="f"/><feColorMatrix in="f" values="0 0 0 0 .2  0 0 0 0 .1  0 0 0 0 .04  0 0 0 -2.200 1.100" result="fm"/>
    <feMerge result="m"><feMergeNode in="bm"/><feMergeNode in="fm"/></feMerge><feComposite in="m" in2="SourceAlpha" operator="in" result="g"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <path d="M-34 222C60 219 340 221 434 222C439 227 439 240 433 246C300 249 100 248 -32 246C-38 240-38 227-34 222Z" fill="url(#afH)" filter="url(#afG)" stroke="#3a1f0c" stroke-width="1.100"/>
  <path d="M-30 224C60 221 340 223 430 224" fill="none" stroke="#f6d3a0" stroke-width="1.200" opacity=".55"/>
  ${swipes(-20, 410, 228, 242, 14)}${[20, 70, 120, 170, 220, 270, 320, 370].map((x) => toron(x, 233)).join('')}
</g>
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <path d="${LINTEL}" fill="url(#afH)" filter="url(#afG)" stroke="#3a1f0c" stroke-width="1.100"/>
  <path d="M-12 -19.500C60 -17.500 140 -20 200 -20.500S340 -21 412 -18.500" fill="none" stroke="#f6d3a0" stroke-width="1.200" opacity=".6"/>
  <path d="M-12 3C60 5 140 2 200 4S340 2 412 3" fill="none" stroke="#1a0b03" stroke-width="1.500" opacity=".6"/>
  ${swipes(0, 400, -18, 0, 14)}${[30, 90, 150, 210, 330].map(vent).join('')}${[60, 120, 180, 240, 300, 360].map((x) => toron(x, -10)).join('')}
  <g clip-path="url(#afLc)"><rect class="afsun" x="-140" y="-30" width="120" height="40" fill="url(#afSun)"/></g>
</g>
${[22, 52, 82, 112, 142, 172, 202, 232, 262].map((c, i) => pin(c, i % 2 ? 22 : 28, i)).join('')}
<g class="pc" style="--dx:-90px;--d:0;--o:.15">${tower(-12, -72, -1)}</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">${tower(412, -46, 1)}</g>
<g class="pc" style="--dy:200px;--d:.75;--o:.05">
  <rect x="426" y="36" width="16" height="7" rx="2.500" fill="url(#afPalm)" stroke="#24140a" stroke-width=".8"/><rect x="426" y="186" width="16" height="7" rx="2.500" fill="url(#afPalm)" stroke="#24140a" stroke-width=".8"/>
  <path d="M438 -118l2-6 2 5 2-7 2 6 2-5 2 6v4h-12z" fill="#6b4a2a" stroke="#24140a" stroke-width=".7"/>
  <rect x="438" y="-120" width="12" height="372" rx="4" fill="url(#afPalm)" stroke="#24140a" stroke-width=".9"/>
  <path d="${chev}" fill="none" stroke="#2a1a0c" stroke-width=".9" opacity=".75"/><path d="M440 -116v360" stroke="#c9a070" stroke-width="1" opacity=".45"/>
  <path d="M437 35.500h14M437 38.500h14M437 41.500h14M437 185.500h14M437 188.500h14M437 191.500h14" stroke="#c9a46a" stroke-width="1.300"/>
</g>
<g class="pc" style="--dx:80px;--d:.95;--o:0">
  <path d="M450 -22L484 -61" stroke="#24140a" stroke-width="4.400" stroke-linecap="round"/><path d="M450 -22L484 -61" stroke="#7a5532" stroke-width="2.800" stroke-linecap="round"/>
  <rect x="447" y="-66" width="99" height="6.500" rx="3.200" fill="url(#afPalm)" stroke="#24140a" stroke-width=".8"/><path d="M449 -65h95" stroke="#c9a070" stroke-width=".7" opacity=".6"/>
  <path d="M437 -69h14M437 -66h14M437 -63h14M437 -60h14M437 -57h14" stroke="#c9a46a" stroke-width="1.300" stroke-linecap="round"/>
  <path d="M478 -61.500v7.500M481 -61.500v7.500" stroke="#c9a46a" stroke-width="1.100"/>
  <g class="affib"><path d="M544 -61c2 6 1 11 3 16M541 -61c0 5-2 9-1 14M547 -62c3 4 4 8 4 13" fill="none" stroke="#b08a52" stroke-width=".9" stroke-linecap="round"/></g>
</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const GRAIN = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.05' numOctaves='4' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .72  0 0 0 0 .45  0 0 0 -1.400 .78'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
// softer plaster for the panels: text sits on it
const PGRAIN = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.04' numOctaves='3' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .72  0 0 0 0 .45  0 0 0 -.9 .42'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const SPECK =svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .15  0 0 0 0 .08  0 0 0 0 .02  0 0 0 -2 1'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' rx='12' fill='none' stroke='#2a1608' stroke-width='8'/><rect x='4' y='4' width='64' height='64' rx='12' fill='none' stroke='#a8693a' stroke-width='5'/>
  <path d='M2.500 44V16Q2.500 2.500 16 2.500H44' fill='none' stroke='#f6d3a0' stroke-opacity='.6' stroke-width='1.200'/>
  <path d='M69.500 28V56Q69.500 69.500 56 69.500H28' fill='none' stroke='#1a0b03' stroke-opacity='.6' stroke-width='1.200'/>
  <g fill='#6b4524' stroke='#24140a' stroke-width='.8'><rect x='3.500' y='3.500' width='7' height='6' rx='2.500'/><rect x='61.500' y='3.500' width='7' height='6' rx='2.500'/><rect x='3.500' y='62.500' width='7' height='6' rx='2.500'/><rect x='61.500' y='62.500' width='7' height='6' rx='2.500'/></g>
  <g fill='none' stroke='#b08250' stroke-width='.6'><circle cx='7' cy='6.500' r='1.300'/><circle cx='65' cy='6.500' r='1.300'/><circle cx='7' cy='65.500' r='1.300'/><circle cx='65' cy='65.500' r='1.300'/></g></svg>`);
const PINS = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='56' height='20'>
  <g stroke='#3a1f0c' stroke-width='.8'><path d='M5 20C5 12 10 5 14 1.500C18 5 23 12 23 20z' fill='#b0703c'/><path d='M33 20C33 13 38 7 42 4C46 7 51 13 51 20z' fill='#a8693a'/></g>
  <path d='M7 19C7 12 11 6 13.500 3.500M35 19C35 13 39 8 41.500 5.500' fill='none' stroke='#f6d3a0' stroke-opacity='.6' stroke-width='1'/>
  <path d='M8 10h12' stroke='#5a3a1c' stroke-width='2.200' stroke-linecap='round'/><rect y='17.500' width='56' height='2.500' fill='#7a4421'/></svg>`);
const WEAVE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='60' height='24'>
  <rect width='60' height='9' fill='#efe1c4'/><rect width='60' height='1.200' fill='#3a1f0c'/>
  <g fill='#2c3d78'><rect x='0' y='2' width='6' height='3'/><rect x='12' y='2' width='6' height='3'/><rect x='24' y='2' width='6' height='3'/><rect x='36' y='2' width='6' height='3'/><rect x='48' y='2' width='6' height='3'/></g>
  <g fill='#a3401c'><rect x='6' y='5' width='6' height='3'/><rect x='18' y='5' width='6' height='3'/><rect x='30' y='5' width='6' height='3'/><rect x='42' y='5' width='6' height='3'/><rect x='54' y='5' width='6' height='3'/></g>
  <g stroke-width='1.200' stroke-linecap='round'><path d='M3 9v12M9 9v10M15 9v13M21 9v11M27 9v12M33 9v10M39 9v13M45 9v11M51 9v12M57 9v10' stroke='#e2cfa6'/>
  <path d='M6 9v9M18 9v10M30 9v8M42 9v10M54 9v9' stroke='#a3401c'/></g></svg>`);

const css = `
#stage[data-kit=africa] .dplate{color:#fbeed6;text-shadow:0 1px 0 #2a1205;border:1px solid #2a1608;border-radius:14px 14px 18px 18px / 11px 11px 15px 15px;
  background:${SPECK},${GRAIN},linear-gradient(180deg,#a86f3e,#6e3f1e 55%,#4a2812);background-blend-mode:normal,soft-light,normal;
  box-shadow:inset 0 2px 0 #f6d3a088,inset 0 -3px 0 #0006,0 6px 10px #000a}
#stage[data-kit=africa] .dplate::before,#stage[data-kit=africa] .dplate::after{content:'';position:absolute;top:-6px;width:7px;height:10px;border-radius:3px;
  background:linear-gradient(90deg,#9a7248,#3a2614);border:1px solid #24140a;box-shadow:0 3px 3px #0006}
#stage[data-kit=africa] .dplate::before{left:24px}#stage[data-kit=africa] .dplate::after{right:24px}
#stage[data-kit=africa] .dplate span{font-family:'Bree Serif',serif;font-size:20px;color:var(--civ);text-shadow:0 1px 0 #2a1205,0 0 10px #000a}

/* frame details */
#stage[data-kit=africa] .dframe .afsw{fill:none;stroke:#f6d3a0;stroke-width:.8;opacity:.28;stroke-linecap:round}
#stage[data-kit=africa] .dframe .afsun{animation:afSun 8s ease-in-out infinite}
@keyframes afSun{0%{transform:translateX(0)}65%,100%{transform:translateX(700px)}}
#stage[data-kit=africa] .dframe .affib{transform-box:fill-box;transform-origin:50% 0;animation:afFib 2.600s ease-in-out infinite alternate}
@keyframes afFib{from{transform:rotate(-8deg)}to{transform:rotate(10deg)}}
/* sun-baked light on the camera picture, heat haze rising from the bottom */
#stage[data-kit=africa] .dshade{box-shadow:inset 0 0 44px rgba(40,16,4,.6),inset 0 -18px 26px -12px rgba(255,190,110,.28);background:linear-gradient(180deg,rgba(255,196,120,.14),transparent 40%)}
#stage[data-kit=africa] .dshade::before{content:'';position:absolute;inset:0;background:radial-gradient(280px 170px at 88% -12%,rgba(255,214,150,.4),transparent 70%);animation:afGlow 6s ease-in-out infinite alternate}
@keyframes afGlow{from{opacity:.65}to{opacity:1}}
#stage[data-kit=africa] .dshade::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 9px,rgba(255,232,196,.08) 9px 11px,transparent 11px 20px);
  background-size:100% 40px;animation:afHaze 2.800s linear infinite;-webkit-mask-image:linear-gradient(0deg,#000,transparent 55%);mask-image:linear-gradient(0deg,#000,transparent 55%)}
@keyframes afHaze{from{background-position:0 0}to{background-position:0 -40px}}

/* panels: mud plaster, moulded rim with toron ends, mud pinnacles on top, a woven strip with fringe below */
#stage.skinned[data-kit=africa] .pn.kd:not(.mu){
  background:${PGRAIN},radial-gradient(120% 80% at 18% 0%,rgba(214,150,90,.2),transparent 60%),linear-gradient(180deg,rgba(112,66,34,.95),rgba(50,27,13,.96));
  background-blend-mode:soft-light,normal,normal;border-color:rgba(30,14,4,.7);border-radius:12px;
  box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 36px rgba(30,12,2,.55),inset 0 1px 0 rgba(246,211,160,.25)}
#stage.skinned[data-kit=africa] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=africa] .pn.kd>.kd-t{height:20px;margin:0 12px -7px;background:${PINS} 0 100% repeat-x;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 18px,#000 calc(100% - 18px),transparent);mask-image:linear-gradient(90deg,transparent,#000 18px,#000 calc(100% - 18px),transparent)}
#stage.skinned[data-kit=africa] .pn.kd>.kd-b{height:24px;margin:3px 20px 0;background:${WEAVE} 0 0 repeat-x;transform-origin:50% 0;animation:fin .8s .15s both,afCloth 3.400s ease-in-out infinite alternate}
@keyframes afCloth{from{transform:skewX(-4deg)}to{transform:skewX(4deg)}}
#stage.skinned[data-kit=africa] .pn.kd.slime{border-bottom-color:rgba(30,14,4,.7)}
#stage.skinned[data-kit=africa] .hd{border-bottom:1px solid rgba(0,0,0,.55);box-shadow:0 1px 0 rgba(246,211,160,.1)}

/* dust drifting on the wind, slow haze clouds; the burst is a dust cloud kicked up around the camera */
#stage[data-kit=africa] .p.dust{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#ffe9c4,rgba(232,180,110,.6) 45%,transparent 70%);
  animation:afDrift var(--dur) var(--del) linear infinite,afBob calc(2s + var(--k)*2s) ease-in-out infinite alternate}
@keyframes afDrift{0%{transform:translate3d(-80px,30px,0);opacity:0}15%{opacity:calc(.35 + var(--k)*.55)}85%{opacity:calc(.3 + var(--k)*.5)}100%{transform:translate3d(calc(260px + var(--j)*80px),calc(-50px + var(--j)*30px),0);opacity:0}}
@keyframes afBob{from{translate:0 -8px}to{translate:0 8px}}
#stage[data-kit=africa] .p.haze{width:calc(var(--s)*2.200);height:var(--s);border-radius:50%;background:radial-gradient(closest-side,rgba(226,170,100,.2),transparent);
  animation:afHz var(--dur) var(--del) ease-in-out infinite}
@keyframes afHz{0%{transform:translate3d(-60px,0,0) scale(.8);opacity:0}30%{opacity:.9}70%{opacity:.7}100%{transform:translate3d(200px,-30px,0) scale(1.300);opacity:0}}
#stage[data-kit=africa] .p.puff{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(closest-side,rgba(236,192,130,.85),rgba(200,140,80,.4) 55%,transparent);
  animation:afPuff 1.700s var(--del) cubic-bezier(.15,.7,.3,1) both}
@keyframes afPuff{0%{transform:rotate(calc(var(--k)*360deg)) translateY(0) scale(.3);opacity:0}12%{opacity:.95}100%{transform:rotate(calc(var(--k)*360deg + var(--j)*40deg)) translateY(calc(-170px - var(--k)*250px)) scale(2.400);opacity:0}}
#stage[data-kit=africa] .p.grit{width:var(--s);height:var(--s);border-radius:50%;background:#e7c48e;
  animation:afGrit 1.200s var(--del) cubic-bezier(.1,.8,.3,1) both}
@keyframes afGrit{0%{transform:rotate(calc(var(--k)*360deg)) translateY(0);opacity:0}10%{opacity:1}100%{transform:rotate(calc(var(--k)*360deg)) translateY(calc(-240px - var(--k)*320px));opacity:0}}
`;

export default {
  id: 'africa',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap',
  frame, css,
  mount: { x: 452, y: -60 }, // top-left of the civ's standard: hangs from the palm-wood crossbar
  perch: 40, // hands on the mud lintel, right of the pinnacles
  particles: [{ cls: 'dust', n: 28, zone: 'sides', size: [2, 5], dur: [8, 14] }, { cls: 'haze', n: 5, zone: [0, 480, 720, 380], size: [50, 110], dur: [14, 22] }],
  burst: [{ cls: 'puff', n: 26, zone: [180, 660, 90, 70], size: [26, 48], dur: [1, 1], spread: .5 }, { cls: 'grit', n: 18, zone: [180, 660, 90, 70], size: [2, 4], dur: [1, 1], spread: .4 }],
};
