// KIT: Norse (Vikings, Danes, Varangians). Carved tarred timber, iron fittings, runes, snow.
// The camera frame reads as a longship: shields can hang on the top beam (civ layer), a mast with a
// dragon head stands on the right and carries the civ's banner on its yard.
// All drawings are our own. Runes: "SWEDISHGOBLIN" letter by letter in Elder Futhark (playful, not a translation).

const RUNE = {
  S: 'M5 0L1 4L5 8L1 12', W: 'M1 0V12M1 0L5 3L1 6', E: 'M1 12V0L3 3L5 0V12', D: 'M1 0V12M5 0V12M1 0L5 12M5 0L1 12', I: 'M3 0V12',
  H: 'M1 0V12M5 0V12M1 4L5 8', G: 'M1 0L5 12M5 0L1 12', O: 'M1 12L5 5L3 0L1 5L5 12', B: 'M1 0V12M1 0L5 3L1 6L5 9L1 12', L: 'M1 12V0L5 4', N: 'M3 0V12M1 4L5 8',
};
const runes = [...'SWEDISHGOBLIN'].map((c, i) =>
  `<g transform="translate(-11.500 ${4 + i * 17}) scale(1.25)"><path d="${RUNE[c]}" class="rc"/><path d="${RUNE[c]}" class="rg" style="--i:${i}"/></g>`).join('');

// two-strand braid along a line (carved knotwork)
function braid(x0, y0, len, amp, period, vertical) {
  const strand = (ph) => { let d = ''; for (let t = 0; t <= len; t += 3) { const o = Math.sin((t / period) * Math.PI * 2 + ph) * amp; const x = vertical ? x0 + o : x0 + t, y = vertical ? y0 + t : y0 + o; d += (t ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); } return d; };
  return `<path d="${strand(0)}" class="bd"/><path d="${strand(Math.PI)}" class="bd"/><path d="${strand(0)}" class="bl"/><path d="${strand(Math.PI)}" class="bl"/>`;
}
// snow lying on a horizontal edge from x0 to x1 at y
function snow(x0, x1, y, seed) {
  let s = seed, d = `M${x0} ${y + 2}`; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let x = x0; x < x1;) { const w = Math.min(x1 - x, 26 + r() * 40), h = 6 + r() * 9; d += `q${(w / 2).toFixed(0)} ${(-h).toFixed(0)} ${w.toFixed(0)} 0`; x += w; }
  return d + 'z';
}
const rivet = (x, y) => `<circle cx="${x}" cy="${y}" r="1.7" fill="#9aa4ac"/><circle cx="${x - .5}" cy="${y - .5}" r=".7" fill="#e6edf2"/>`;
const bracket = (x, y, sx, sy, d) => `<g transform="translate(${x} ${y}) scale(${sx} ${sy})"><g class="pc" style="--sc:2.4;--d:${d};--o:0">
  <path d="M0 0h34v8H8v26H0z" fill="#22272b" stroke="#596168" stroke-width="1"/><path d="M1 1h32" stroke="#8a949c" stroke-width=".8" opacity=".7"/>${rivet(4, 4)}${rivet(27, 4)}${rivet(4, 27)}</g></g>`;

const frame = `
<defs>
  <linearGradient id="nH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86603a"/><stop offset=".5" stop-color="#4d321c"/><stop offset="1" stop-color="#27180c"/></linearGradient>
  <linearGradient id="nV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5532"/><stop offset=".55" stop-color="#452c18"/><stop offset="1" stop-color="#23150a"/></linearGradient>
  <filter id="nGh" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .7" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .06  0 0 0 0 .03  0 0 0 0 0  0 0 0 -1.6 .78"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  <filter id="nGv" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".7 .012" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 .06  0 0 0 0 .03  0 0 0 0 0  0 0 0 -1.6 .78"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  <linearGradient id="nIce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4fbff"/><stop offset="1" stop-color="#a9d2f2" stop-opacity=".55"/></linearGradient>
</defs>
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  <rect x="-18" y="-22" width="21" height="262" rx="2" fill="url(#nV)" filter="url(#nGv)"/><path d="M-17 -20v258" stroke="#c99a62" stroke-width="1" opacity=".5"/><path d="M2.500 -20v258" stroke="#000" opacity=".6"/>
  ${runes}
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  <rect x="397" y="-22" width="21" height="262" rx="2" fill="url(#nV)" filter="url(#nGv)"/><path d="M398 -20v258" stroke="#c99a62" stroke-width="1" opacity=".5"/><path d="M397.500 -20v258" stroke="#000" opacity=".5"/>
  ${braid(407.500, 6, 212, 4.200, 26, true)}
</g>
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <rect x="-22" y="223" width="444" height="16" rx="2" fill="url(#nH)" filter="url(#nGh)"/><path d="M-20 224h440" stroke="#d2a56c" stroke-width="1" opacity=".55"/>
</g>
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-22" y="-16" width="444" height="18" rx="2" fill="url(#nH)" filter="url(#nGh)"/><path d="M-20 -15h440" stroke="#d2a56c" stroke-width="1" opacity=".6"/><path d="M-20 1.5h440" stroke="#000" opacity=".7"/>
  ${braid(14, -7, 372, 3.6, 30, false)}
  <path class="fin" style="--d:1.9" fill="url(#nIce)" opacity=".85" d="M30 2l3 13 3-13zM78 2l2 8 2-8zM121 2l4 18 3-18zM166 2l2 7 2-7zM233 2l3 12 3-12zM301 2l2 9 3-9zM352 2l3 15 3-15z"/>
</g>
${bracket(-24, -18, 1, 1, .5)}${bracket(424, -18, -1, 1, .56)}${bracket(-24, 241, 1, -1, .62)}${bracket(424, 241, -1, -1, .68)}
<g class="pc" style="--dy:160px;--d:.7;--o:.05"><g transform="translate(5 0)">
  <rect x="421" y="-60" width="11" height="300" rx="3" fill="url(#nV)" filter="url(#nGv)"/><path d="M422 -58v296" stroke="#c99a62" opacity=".45"/>
  <rect x="412" y="30" width="22" height="7" rx="1" fill="#22272b" stroke="#596168"/><rect x="412" y="186" width="22" height="7" rx="1" fill="#22272b" stroke="#596168"/>${rivet(416, 33.5)}${rivet(416, 189.5)}
  <g class="nhead">
    <path d="M421 -58C417 -80 420 -100 434 -110c6-5 14-7 22-5l-4-9 10 8c10 2 20 8 30 12l2 5-16 2-6 4 14 7-2 4c-12 2-22 0-28-4-10 2-18 10-22 20l-2 8z" fill="url(#nV)" stroke="#170d05" stroke-width="1.400" stroke-linejoin="round"/>
    <path d="M427 -64c-3-16 0-30 10-40M433 -68c0-10 3-19 10-26M440 -112c-8-8-18-2-14 6 3 5 9 3 7-2" fill="none" stroke="#c99a62" stroke-width="1.200" opacity=".75" stroke-linecap="round"/>
    <path d="M480 -97l1.500 4 2-4zM487 -98l1.500 3 1.500-3zM477 -89l1.500-3 2 3z" fill="#f1ead8"/>
    <path d="M472 -93c6 0 9 2 14 0" fill="none" stroke="var(--civ3)" stroke-width="1.600" stroke-linecap="round"/>
    <circle class="neye" cx="466" cy="-108" r="2.600"/>
  </g></g>
</g>
<g class="pc" style="--dx:80px;--d:.95;--o:0">
  <path d="M433 -18L458 -48" stroke="#3a2512" stroke-width="5" stroke-linecap="round"/><path d="M434 -20L457 -47" stroke="#86603a" stroke-width="1.600" stroke-linecap="round" opacity=".7"/>
  <rect x="430" y="-53" width="94" height="6" rx="3" fill="url(#nH)" stroke="#170d05" stroke-width=".8"/>
  <path d="M420 -55h13M420 -51.500h13M420 -48h13" stroke="#c8b38a" stroke-width="1.600" stroke-linecap="round"/>
  <path class="fin" style="--d:2" fill="url(#nIce)" opacity=".85" d="M446 -47l2 9 2-9zM489 -47l3 13 2-13zM512 -47l2 7 2-7z"/>
  <path class="fin" style="--d:1.9" fill="#f4fbff" d="${snow(440, 522, -54, 5)}"/>
</g>
<path class="fin nsnow" style="--d:1.7" d="${snow(236, 420, -17, 11)}"/>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const GRAIN = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.009 .5' numOctaves='3' seed='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 .8'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#120a04' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#6f4c2c' stroke-width='5'/>
  <rect x='2.500' y='2.500' width='67' height='67' fill='none' stroke='#c79a62' stroke-opacity='.55' stroke-width='1'/>
  <g fill='#22272b' stroke='#667078' stroke-width='1'><path d='M.5.5h23v9h-14v14h-9z'/><path d='M71.500.5h-23v9h14v14h9z'/><path d='M.5 71.500h23v-9h-14v-14h-9z'/><path d='M71.500 71.500h-23v-9h14v-14h9z'/></g>
  <g fill='#aab4bc'><circle cx='5' cy='5' r='1.800'/><circle cx='18' cy='5' r='1.500'/><circle cx='5' cy='18' r='1.500'/><circle cx='67' cy='5' r='1.800'/><circle cx='54' cy='5' r='1.500'/><circle cx='67' cy='18' r='1.500'/>
  <circle cx='5' cy='67' r='1.800'/><circle cx='18' cy='67' r='1.500'/><circle cx='5' cy='54' r='1.500'/><circle cx='67' cy='67' r='1.800'/><circle cx='54' cy='67' r='1.500'/><circle cx='67' cy='54' r='1.500'/></g></svg>`);
const SNOWCAP = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='280' height='16'><path fill='#f4fbff' d='M0 16q14-11 34-8q16-9 40-4q22-8 44-1q18-7 40 0q24-7 46 2q20-8 40 1q20-4 36 10z'/><path fill='#a9d2f2' fill-opacity='.5' d='M0 16q40-5 90-3t100 0t90 3z'/></svg>`);
const ICICLES = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='300' height='22'><g fill='#dff1ff' fill-opacity='.8'><path d='M22 0l3 13 3-13zM64 0l2 7 2-7zM118 0l4 21 4-21zM171 0l2 9 3-9zM214 0l3 15 3-15zM268 0l2 8 2-8z'/></g></svg>`);

const css = `
#stage[data-kit=norse] .dplate span{font-family:'Grenze Gotisch',serif;font-weight:700;color:var(--civ);text-shadow:0 0 10px color-mix(in srgb,var(--civ) 60%,transparent),0 1px 0 #000}
#stage[data-kit=norse] .dplate{color:#f3e9d2;text-shadow:0 1px 0 #000;border:1px solid #140b04;border-radius:2px;
  background:${GRAIN},linear-gradient(180deg,#7b5634,#3d2716 60%,#24160b);box-shadow:inset 0 1px 0 #d2a56c88,inset 0 -2px 0 #0008,0 6px 10px #000a}
#stage[data-kit=norse] .dplate::before,#stage[data-kit=norse] .dplate::after{content:'';position:absolute;top:50%;width:5px;height:5px;margin-top:-2.500px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e6edf2,#59626b 60%)}
#stage[data-kit=norse] .dplate::before{left:3px}#stage[data-kit=norse] .dplate::after{right:4px}
#stage[data-kit=norse] .dplate .mark{margin-left:6px}

/* frame details */
#stage[data-kit=norse] .dframe .rc{fill:none;stroke:#120a04;stroke-width:2.200;stroke-linecap:round;stroke-linejoin:round}
#stage[data-kit=norse] .dframe .rg{fill:none;stroke:var(--civ);stroke-width:1.300;stroke-linecap:round;stroke-linejoin:round;opacity:.4;
  filter:drop-shadow(0 0 3px var(--civ));animation:nRune 6.500s calc(var(--i)*.33s) infinite}
@keyframes nRune{0%,22%,100%{opacity:.4}8%{opacity:1}}
#stage[data-kit=norse] .dframe .bd{fill:none;stroke:#120a04;stroke-width:3;opacity:.85}
#stage[data-kit=norse] .dframe .bl{fill:none;stroke:#c79a62;stroke-width:1;opacity:.7}
#stage[data-kit=norse] .dframe .neye{fill:var(--civ);filter:drop-shadow(0 0 4px var(--civ));animation:nEye 4s ease-in-out infinite}
@keyframes nEye{50%{opacity:.45}}
#stage[data-kit=norse] .dframe .nhead{transform-box:fill-box;transform-origin:20% 100%;animation:nNod 7s ease-in-out infinite}
@keyframes nNod{0%,100%{transform:rotate(0)}50%{transform:rotate(2.500deg)}}
#stage[data-kit=norse] .dframe .nsnow{fill:#f4fbff;filter:drop-shadow(0 2px 0 #a9d2f2)}
/* frost creeping in from the corners of the camera picture */
#stage[data-kit=norse] .dshade{box-shadow:inset 0 0 46px rgba(0,0,0,.6),inset 0 14px 22px -10px rgba(190,225,255,.35);
  background:radial-gradient(150px 90px at 0 0,rgba(225,242,255,.42),transparent 70%),radial-gradient(130px 80px at 100% 100%,rgba(225,242,255,.3),transparent 70%),
    radial-gradient(90px 60px at 100% 0,rgba(225,242,255,.22),transparent 70%)}

/* panels: tarred planks, iron corner plates, snow on top, icicles below */
#stage.skinned[data-kit=norse] .pn.kd:not(.mu){
  background:${GRAIN},repeating-linear-gradient(0deg,transparent 0 50px,rgba(0,0,0,.55) 50px 52px,rgba(255,215,160,.07) 52px 53px),
    linear-gradient(180deg,rgba(64,42,24,.94),rgba(26,16,8,.96));
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 34px rgba(0,0,0,.55)}
#stage.skinned[data-kit=norse] .pn.kd::after{inset:-7px;opacity:1;background:none;border:24px solid transparent;border-image:${EDGE} 24 / 24px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=norse] .pn.kd.mu::after{inset:-7px}
#stage.skinned[data-kit=norse] .pn.kd>.kd-t{height:16px;margin:0 6px -5px;background:${SNOWCAP} 0 100% repeat-x;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 22px,#000 calc(100% - 22px),transparent);mask-image:linear-gradient(90deg,transparent,#000 22px,#000 calc(100% - 22px),transparent)}
#stage.skinned[data-kit=norse] .pn.kd>.kd-b{height:22px;margin:5px 14px 0;background:${ICICLES} 0 0 repeat-x}
#stage.skinned[data-kit=norse] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=norse] .hd{border-bottom:1px solid rgba(0,0,0,.6);box-shadow:0 1px 0 rgba(255,215,160,.08)}

/* snow */
#stage[data-kit=norse] .p.snow{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fff,rgba(255,255,255,.55) 45%,transparent 70%);
  animation:nFall var(--dur) var(--del) linear infinite,nSway calc(2.500s + var(--k)*3s) ease-in-out infinite alternate}
@keyframes nFall{0%{transform:translate3d(0,-140px,0);opacity:0}12%{opacity:calc(.4 + var(--k)*.6)}85%{opacity:calc(.4 + var(--k)*.6)}100%{transform:translate3d(calc(40px + var(--j)*70px),380px,0);opacity:0}}
@keyframes nSway{from{translate:-14px 0}to{translate:14px 0}}
#stage[data-kit=norse] .p.gust{width:calc(var(--s)*7);height:var(--s);border-radius:50%;background:linear-gradient(90deg,transparent,#fff);
  animation:nGust 1.300s var(--del) cubic-bezier(.3,0,.5,1) both}
@keyframes nGust{0%{transform:translate3d(-500px,-40px,0) rotate(8deg);opacity:0}25%{opacity:.95}100%{transform:translate3d(1500px,170px,0) rotate(8deg);opacity:0}}
`;

export default {
  id: 'norse',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@700&display=swap',
  frame, css,
  mount: { x: 441, y: -47 }, // top-left of the civ's standard: hangs from the yard
  perch: 40, // px the mascot moves down from its live spot: hands on the top beam
  particles: [{ cls: 'snow', n: 34, zone: 'sides', size: [3, 7], dur: [7, 13] }, { cls: 'snow', n: 8, zone: [560, 60, 880, 700], size: [2, 4], dur: [9, 14] }],
  burst: [{ cls: 'gust', n: 46, zone: [-200, 40, 1100, 720], size: [2, 5], dur: [1, 1], spread: 1.1 }],
};
