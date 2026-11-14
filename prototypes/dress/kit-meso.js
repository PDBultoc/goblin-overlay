// KIT: Mesoamerica (Aztecs, Maya). Carved stone blocks, jade inlays, gold, feather work, torchlight.
// The camera frame is a temple doorway: stone posts and lintel with a carved step-fret band, a row of stepped
// merlons on the roof line, jade discs in the corners, a pole on the right for the civ's feather standard.
// All drawings are our own.

// a feather drawn from its base (0,0) upward; wrap it in a <g transform> to place it
export const feather = (len, w, fill, tip, cls = 'xf', i = 0) => `<g class="${cls}" style="--i:${i}">
  <path d="M0 0C${w} ${-len * .22} ${w * 1.1} ${-len * .8} 0 ${-len}C${-w * 1.1} ${-len * .8} ${-w} ${-len * .22} 0 0z" fill="${fill}" stroke="#0007" stroke-width=".6"/>
  ${tip ? `<path d="M0 ${-len * .62}C${w * .9} ${-len * .7} ${w * .8} ${-len * .92} 0 ${-len}C${-w * .8} ${-len * .92} ${-w * .9} ${-len * .7} 0 ${-len * .62}z" fill="${tip}"/>` : ''}
  <path d="M0 0V${-len * .94}" stroke="#0006" stroke-width=".7"/><path d="M0 ${-len * .3}l${w * .6} ${-len * .1}M0 ${-len * .5}l${-w * .6} ${-len * .1}M0 ${-len * .7}l${w * .5} ${-len * .1}" stroke="#fff3" stroke-width=".5"/></g>`;

const fret = (x0, x1, y) => { let d = ''; for (let x = x0; x + 20 <= x1; x += 22) d += `M${x} ${y + 10}h15v-9h-10v5h5`; return `<path d="${d}" class="xcd"/><path d="${d}" class="xcl" transform="translate(.9 .9)"/>`; };
const blocks = (x, w, ys) => ys.map((y) => `<path d="M${x} ${y}h${w}" stroke="#1b1a18" stroke-width="2"/><path d="M${x} ${y + 1.500}h${w}" stroke="#c9c2b2" stroke-width=".8" opacity=".5"/>`).join('');
const glyphs = (cx, ys) => ys.map((y) => `<path d="M${cx - 5} ${y + 5}h10v-10h-7v6h4" class="xcd"/><path d="M${cx - 5} ${y + 5}h10v-10h-7v6h4" class="xcl" transform="translate(.9 .9)"/>`).join('');
const jade = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:3;--d:${d};--o:0"><circle r="10.500" fill="#f2c14e" stroke="#5a3e08" stroke-width="1"/><circle r="7.800" fill="url(#xJade)" stroke="#06382d" stroke-width="1"/>
  <path class="xgl" d="M-4.500 -3.500a6 6 0 0 1 6-2.500" fill="none" stroke="#fff" stroke-width="1.800" stroke-linecap="round"/></g></g>`;
const merlon = (x, i) => `<g class="pc" style="--dy:-70px;--d:${(.7 + i * .06).toFixed(2)};--o:0"><path d="M${x} -18v-8h6v-7h6v-7h10v7h6v7h6v8z" fill="url(#xH)" filter="url(#xSp)" stroke="#1b1a18" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M${x + 1} -25.500h5v-7h6v-7h10" fill="none" stroke="#d6cfbf" stroke-width=".9" opacity=".6"/><rect x="${x + 14}" y="-30" width="6" height="6" fill="var(--civ)" stroke="#06382d" stroke-width=".8"/></g>`;

const frame = `
<defs>
  <linearGradient id="xH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9a293"/><stop offset=".5" stop-color="#746e62"/><stop offset="1" stop-color="#45413a"/></linearGradient>
  <linearGradient id="xV" x1="0" x2="1"><stop offset="0" stop-color="#a39c8d"/><stop offset=".55" stop-color="#6c665b"/><stop offset="1" stop-color="#3f3b35"/></linearGradient>
  <radialGradient id="xJade" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b6ffe9"/><stop offset=".45" stop-color="#2fc39f"/><stop offset="1" stop-color="#0b5f4e"/></radialGradient>
  <linearGradient id="xPole" x1="0" x2="1"><stop offset="0" stop-color="#c8452c"/><stop offset="1" stop-color="#5a160c"/></linearGradient>
  <filter id="xSp" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="6"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .05  0 0 0 0 .04  0 0 0 -2.400 1.150"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<rect class="fin xinlay" style="--d:1.500" x="4" y="4" width="392" height="217"/>
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  <rect x="-21" y="-18" width="24" height="258" fill="url(#xV)" filter="url(#xSp)"/><path d="M-20 -16v254" stroke="#ddd6c6" opacity=".55"/><path d="M2.500 -16v254" stroke="#000" opacity=".7"/>
  ${blocks(-21, 24, [34, 84, 134, 184])}${glyphs(-9, [10, 59, 109, 159, 205])}
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  <rect x="397" y="-18" width="24" height="258" fill="url(#xV)" filter="url(#xSp)"/><path d="M398 -16v254" stroke="#ddd6c6" opacity=".55"/><path d="M397.500 -16v254" stroke="#000" opacity=".6"/>
  ${blocks(397, 24, [34, 84, 134, 184])}${glyphs(409, [10, 59, 109, 159, 205])}
</g>
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <rect x="-25" y="223" width="450" height="17" fill="url(#xH)" filter="url(#xSp)"/><path d="M-24 224h448" stroke="#ddd6c6" opacity=".6"/><rect x="-25" y="223" width="450" height="2.500" fill="#b0432b" opacity=".9"/>
  ${blocks(0, 0, [])}<path d="M70 225v15M190 225v15M300 225v15" stroke="#1b1a18" stroke-width="1.500"/>
</g>
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-25" y="-18" width="450" height="20" fill="url(#xH)" filter="url(#xSp)"/><path d="M-24 -17h448" stroke="#e6dfcf" opacity=".65"/><rect x="-25" y="-.5" width="450" height="2.500" fill="#b0432b"/>
  ${fret(4, 396, -15)}
</g>
${[-14, 27, 68, 109, 150, 191, 232].map(merlon).join('')}
${jade(-9, -8, .5)}${jade(409, -8, .56)}${jade(-9, 232, .62)}${jade(409, 232, .68)}
<g class="pc" style="--dy:200px;--d:.75;--o:.05">
  <rect x="444" y="-104" width="8" height="344" rx="2" fill="url(#xPole)"/>
  ${[-90, -10, 100, 214].map((y) => `<rect x="443" y="${y}" width="10" height="6" rx="1" fill="#f2c14e" stroke="#5a3e08" stroke-width=".7"/>`).join('')}
  <rect x="419" y="48" width="27" height="7" fill="url(#xH)" stroke="#1b1a18"/><rect x="419" y="186" width="27" height="7" fill="url(#xH)" stroke="#1b1a18"/>
</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const SPECK = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .85  0 0 0 0 .82  0 0 0 0 .75  0 0 0 -1.300 .55'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#131211' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#6c665b' stroke-width='5.500'/>
  <path d='M1.800 70V1.800H70' fill='none' stroke='#ddd6c6' stroke-opacity='.6' stroke-width='1'/><rect x='8.500' y='8.500' width='55' height='55' fill='none' stroke='#b0432b' stroke-width='1.200'/>
  <g fill='#746e62' stroke='#131211' stroke-width='1'><path d='M.5.5h21v7h-7v7h-7v7h-7z'/><path d='M71.500.5h-21v7h7v7h7v7h7z'/><path d='M.5 71.500h21v-7h-7v-7h-7v-7h-7z'/><path d='M71.500 71.500h-21v-7h7v-7h7v-7h7z'/></g>
  <g fill='#2fc39f' stroke='#f2c14e' stroke-width='1.300'><circle cx='6.500' cy='6.500' r='4'/><circle cx='65.500' cy='6.500' r='4'/><circle cx='6.500' cy='65.500' r='4'/><circle cx='65.500' cy='65.500' r='4'/></g></svg>`);
const fanSvg = (flip) => { const cols = [['#19b56f', '#37e6c2'], ['#d4372a', '#f2c14e'], ['#19b56f', '#37e6c2'], ['#d4372a', '#f2c14e'], ['#19b56f', '#37e6c2']];
  const f = cols.map((c, i) => { const a = -8 + i * 22, len = i % 2 ? 19 : 27; return `<g transform='rotate(${a} 12 30)'><path d='M12 30c4-${len * .25} 4-${len * .8} 0-${len}c-4 ${len * .2}-4 ${len * .75} 0 ${len}z' fill='${c[0]}' stroke='#0008' stroke-width='.6'/><circle cx='12' cy='${30 - len * .8}' r='1.800' fill='${c[1]}'/></g>`; }).join('');
  return svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='102' height='51' viewBox='0 0 64 32'><g ${flip ? "transform='translate(64 0) scale(-1 1)'" : ''}>${f}<circle cx='12' cy='29' r='3.500' fill='#f2c14e' stroke='#5a3e08'/></g></svg>`); };
const BEADS = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='88' height='26'><path d='M22 0v6M66 0v4' stroke='#f2c14e' stroke-width='1.200'/><circle cx='22' cy='9' r='3.400' fill='#2fc39f' stroke='#06382d'/><circle cx='22' cy='14.500' r='2' fill='#f2c14e'/>
  <path d='M22 16c3 3 3 7 0 10c-3-3-3-7 0-10z' fill='#d4372a' stroke='#0008' stroke-width='.5'/><circle cx='66' cy='6.500' r='2.600' fill='#f2c14e' stroke='#5a3e08'/><path d='M66 9c2.500 3 2.500 6 0 9c-2.500-3-2.500-6 0-9z' fill='#19b56f' stroke='#0008' stroke-width='.5'/></svg>`);
const DOWN = `<svg width="14" height="30" viewBox="-7 -30 14 30"><path d="M0 0C5-6 5-22 0-29C-5-22-5-6 0 0z" fill="currentColor" stroke="#0006" stroke-width=".6"/><path d="M0 0V-27" stroke="#0005" stroke-width=".7"/></svg>`;

const css = `
#stage[data-kit=meso] .dplate{color:#f1ebdc;text-shadow:0 1px 0 #000;border:1px solid #f2c14e;outline:1px solid #131211;
  background:${SPECK},linear-gradient(180deg,#4a4741,#201f1d);box-shadow:inset 4px 0 0 #b0432b,0 6px 10px #000a}
#stage[data-kit=meso] .dplate span{font-family:'Bungee Inline',sans-serif;font-size:15px;letter-spacing:.02em;color:var(--civ);text-shadow:0 0 10px color-mix(in srgb,var(--civ) 55%,transparent),0 1px 0 #000}

#stage[data-kit=meso] .dframe .xcd{fill:none;stroke:#1b1a18;stroke-width:1.800}
#stage[data-kit=meso] .dframe .xcl{fill:none;stroke:#e6dfcf;stroke-width:.7;opacity:.55}
#stage[data-kit=meso] .dframe .xinlay{fill:none;stroke:var(--civ);stroke-width:2.400;stroke-dasharray:12 4;opacity:.9;filter:drop-shadow(0 0 4px color-mix(in srgb,var(--civ) 70%,transparent))}
#stage[data-kit=meso] .dframe .xgl{animation:xGlint 4.500s ease-in-out infinite}
@keyframes xGlint{0%,70%,100%{opacity:.25}82%{opacity:1}}
#stage[data-kit=meso] .xf{transform-box:fill-box;transform-origin:50% 100%;animation:xFeather calc(3s + var(--i)*.13s) calc(var(--i)*-.37s) ease-in-out infinite alternate}
@keyframes xFeather{from{transform:rotate(-3.500deg)}to{transform:rotate(4.500deg)}}
/* torchlight from below, on the camera picture */
#stage[data-kit=meso] .dshade{box-shadow:inset 0 0 50px rgba(0,0,0,.62)}
#stage[data-kit=meso] .dshade::before{content:'';position:absolute;inset:0;animation:xTorch 2.700s steps(1) infinite;
  background:radial-gradient(230px 150px at 0 100%,rgba(255,140,40,.4),transparent 70%),radial-gradient(230px 150px at 100% 100%,rgba(255,140,40,.34),transparent 70%)}
@keyframes xTorch{0%{opacity:.9}13%{opacity:.7}21%{opacity:1}38%{opacity:.78}52%{opacity:.95}64%{opacity:.66}77%{opacity:1}90%{opacity:.8}}

/* panels: dark stone blocks, chiselled rim with stepped corners and jade studs, feather fans on top, bead drops below */
#stage.skinned[data-kit=meso] .pn.kd:not(.mu){
  background:${SPECK},repeating-linear-gradient(0deg,transparent 0 58px,rgba(0,0,0,.6) 58px 60px,rgba(255,255,255,.06) 60px 61px),
    linear-gradient(180deg,rgba(54,52,48,.95),rgba(22,21,20,.96));background-blend-mode:soft-light,normal,normal;
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 36px rgba(0,0,0,.5)}
#stage.skinned[data-kit=meso] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=meso] .pn.kd>.kd-t{height:51px;margin:0 -6px -14px;background:${fanSvg(false)} 0 100% no-repeat,${fanSvg(true)} 100% 100% no-repeat;transform-origin:50% 100%;animation:fin .8s .15s both,xFan 3.600s ease-in-out infinite alternate}
@keyframes xFan{from{transform:skewX(-2deg)}to{transform:skewX(2.500deg)}}
#stage.skinned[data-kit=meso] .pn.kd>.kd-b{height:26px;margin:4px 26px 0;background:${BEADS} 0 0 repeat-x;transform-origin:50% 0;animation:fin .8s .15s both,xFan 2.900s ease-in-out infinite alternate}
#stage.skinned[data-kit=meso] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}

/* jade fireflies rising, a few feathers drifting down */
#stage[data-kit=meso] .p.mote{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#eafff8,var(--civ) 45%,transparent 72%);
  animation:xRise var(--dur) var(--del) ease-in-out infinite}
@keyframes xRise{0%{transform:translate3d(0,80px,0) scale(.5);opacity:0}20%{opacity:calc(.5 + var(--k)*.5)}50%{transform:translate3d(calc(var(--j)*45px),-60px,0) scale(1)}80%{opacity:calc(.4 + var(--k)*.5)}100%{transform:translate3d(calc(var(--j)*-30px),-220px,0) scale(.6);opacity:0}}
#stage[data-kit=meso] .p.down{color:var(--civ);animation:xFall var(--dur) var(--del) linear infinite,xSwing calc(2.200s + var(--k)*1.500s) ease-in-out infinite alternate}
#stage[data-kit=meso] .p.down:nth-child(3n){color:#d4372a}#stage[data-kit=meso] .p.down:nth-child(3n+1){color:#19b56f}
#stage[data-kit=meso] .p.down svg{display:block;width:calc(var(--s)*1.400);height:calc(var(--s)*3)}
@keyframes xFall{0%{transform:translate3d(0,-160px,0);opacity:0}10%{opacity:.9}88%{opacity:.9}100%{transform:translate3d(calc(var(--j)*80px),420px,0);opacity:0}}
@keyframes xSwing{from{rotate:-38deg;translate:-16px 0}to{rotate:44deg;translate:16px 0}}
#stage[data-kit=meso] .p.fb{color:var(--civ);animation:xBurst 1.500s var(--del) cubic-bezier(.15,.7,.3,1) both}
#stage[data-kit=meso] .p.fb:nth-child(3n){color:#d4372a}#stage[data-kit=meso] .p.fb:nth-child(3n+1){color:#f2c14e}
#stage[data-kit=meso] .p.fb svg{display:block;width:calc(var(--s)*1.400);height:calc(var(--s)*3)}
@keyframes xBurst{0%{transform:rotate(calc(var(--k)*360deg)) translateY(0) scale(.2);opacity:0}15%{opacity:1}100%{transform:rotate(calc(var(--k)*360deg + var(--j)*70deg)) translateY(calc(-260px - var(--k)*340px)) scale(1.100);opacity:0}}
`;

export default {
  id: 'meso',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap',
  frame, css,
  mount: { x: 388, y: -164 }, // the civ's standard: pole axis = x 60 of the standard, pole top = y 60
  perch: 37, // hands on the lintel, right of the merlons
  particles: [{ cls: 'mote', n: 26, zone: 'sides', size: [4, 8], dur: [6, 12] }, { cls: 'down', n: 7, zone: [0, 60, 620, 640], size: [7, 11], dur: [14, 22], html: DOWN }],
  burst: [{ cls: 'fb', n: 36, zone: [170, 640, 110, 90], size: [8, 13], dur: [1, 1], spread: .5, html: DOWN }],
};
