// KIT: Central Europe (Teutons, Goths, Bohemians, Poles, Magyars). Dark carved oak, wrought iron, gilded secular
// Gothic tracery. The camera frame reads as the doorway of a guild hall: pointed-arch tracery in the two top corners,
// crocketed pinnacles at the four corners, iron strap hinges with curled ends across the oak, and a halberd pole on
// the right that carries the civ's standard. Secular only: no rose window, no cross finials. All drawings are our own.

const f1 = (n) => +n.toFixed(1);

// cubic bezier point
const bz = (p, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]); };

// carved post: a gilded twisted-rope moulding with accent-lit studs (no arches: pointed arches stay in the corners)
const rope = (x0, x1, y0, y1, step) => { let d = '', st = ''; const m = (x0 + x1) / 2, w = (x1 - x0) / 2;
  for (let y = y0, i = 0; y + step <= y1; y += step, i++) {
    d += `M${m - w} ${y}C${m - w} ${y + step * .5} ${m + w} ${y + step * .5} ${m + w} ${y + step}`;
    if (i % 5 === 2) st += `<circle cx="${m}" cy="${y + step / 2}" r="3.200" fill="#170d06" stroke="#d9b45a" stroke-width=".9"/><circle cx="${m}" cy="${y + step / 2}" r="2" class="cglow" style="--i:${i}"/>`;
  } return `<path d="M${x0} ${y0}V${y1}M${x1} ${y0}V${y1}" class="cgold" style="opacity:.6"/><path d="${d}" class="cvd" style="stroke-width:2.400"/><path d="${d}" class="cgold"/>${st}`; };

// carved vine scroll (secular foliage) along the top beam
const vine = (x0, x1, y, amp, per) => { let d = '', leaves = '';
  for (let x = x0; x <= x1; x += 3) d += (x === x0 ? 'M' : 'L') + x + ' ' + f1(y + Math.sin((x - x0) / per * Math.PI * 2) * amp);
  for (let x = x0 + per / 4, i = 0; x < x1; x += per / 2, i++) { const s = i % 2 ? 1 : -1, yy = y + s * amp;
    leaves += `M${f1(x)} ${f1(yy)}c${f1(3)} ${f1(-s * 1)} ${f1(5)} ${f1(-s * 4)} ${f1(3)} ${f1(-s * 6)}c-2 0-4 2-3 ${f1(s * 3)}`; }
  return `<path d="${d}" class="cvd"/><path d="${d}" class="cgold"/><path d="${leaves}" class="cgold"/>`; };

// crocketed pinnacle: shaft with a blind lancet, a ledge, a spire with curled crockets, a bud finial
const pinnacle = (cx, b, h, style) => {
  const s = b - h * .5, t = b - h; let cr = '';
  for (let k = 1; k <= 3; k++) { const f = k / 4, y = f1(s - 3 - (s - 3 - (t + 7)) * f), xl = f1(cx - 6 + 6 * f), xr = f1(cx + 6 - 6 * f);
    cr += `M${xl} ${y}c-4-.5-6-3-5-6c2 0 3 1.500 2.500 3.500M${xr} ${y}c4-.5 6-3 5-6c-2 0-3 1.500-2.500 3.500`; }
  return `<g class="pc" style="${style}">
    <rect x="${cx - 7}" y="${s}" width="14" height="${b - s}" fill="url(#cenOakV)" stroke="#120a05" stroke-width="1"/>
    <rect x="${cx - 3.500}" y="${s + 4}" width="7" height="${b - s - 8}" rx="1" class="cglow" style="--i:2"/>
    <rect x="${cx - 3.500}" y="${s + 4}" width="7" height="${b - s - 8}" rx="1" class="cgold"/>
    <rect x="${cx - 9}" y="${s - 4}" width="18" height="5" rx="1" fill="#3a2513" stroke="#d9b45a" stroke-width=".9"/>
    <path d="M${cx - 6.500} ${s - 4}L${cx} ${t + 6}L${cx + 6.500} ${s - 4}Z" fill="url(#cenOakV)" stroke="#120a05" stroke-width="1"/>
    <path d="M${cx - 6.500} ${s - 4}L${cx} ${t + 6}L${cx + 6.500} ${s - 4}" class="cgold"/>
    <path d="${cr}" class="ccrock"/>
    <path d="M${cx} ${t + 7}c-4-1-5-4-4-6c2 0 4 2 4 4c0-2 2-4 4-4c1 2 0 5-4 6z" fill="#d9b45a" stroke="#5a3c12" stroke-width=".6"/>
    <ellipse cx="${cx}" cy="${t + 2.500}" rx="2.400" ry="3.300" fill="#e8c766" stroke="#5a3c12" stroke-width=".6"/>
    <circle cx="${cx}" cy="${t + 2.500}" r="2" class="cfin"/>
  </g>`; };

// wrought-iron strap with curled scroll ends, centred on the origin, length 2L
const strap = (L) => `
  <rect x="${-L}" y="-3.200" width="${2 * L}" height="6.400" rx="1" fill="#1d2023" stroke="#5e666d" stroke-width=".8"/>
  <path d="M${-L + 1} -2.400H${L - 1}" stroke="#8d969d" stroke-width=".6" opacity=".7"/>
  <path d="M${-L} -1.500c-5-1-9-4-8-9c1-4 6-4 6 0c0 2-2 3-3 2M${-L} 1.500c-5 1-9 4-8 9c1 4 6 4 6 0c0-2-2-3-3-2M${L} -1.500c5-1 9-4 8-9c-1-4-6-4-6 0c0 2 2 3 3 2M${L} 1.500c5 1 9 4 8 9c-1 4-6 4-6 0c0-2 2-3 3-2" class="ciron"/>
  ${[-L + 4, 0, L - 4].map((x) => `<circle cx="${x}" cy="0" r="1.600" fill="#9aa3aa"/><circle cx="${x - .4}" cy="-.4" r=".6" fill="#e6edf2"/>`).join('')}`;
const hinge = (x, y, rot, L, d) => `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="pc" style="--sc:2.200;--r:${rot ? 30 : -30}deg;--d:${d};--o:0">${strap(L)}</g></g>`;

// tracery spandrel filling the top-left corner of the picture (the right one is the mirror image)
const ARCH = [[74, 0], [42, 10], [0, 26], [0, 60]];
const cusped = () => { const n = 4, pts = Array.from({ length: n + 1 }, (_, i) => bz(ARCH, i / n)); let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 1; i <= n; i++) { const a = pts[i - 1], b = pts[i], r = Math.hypot(b[0] - a[0], b[1] - a[1]) * .62; d += `A${f1(r)} ${f1(r)} 0 0 0 ${f1(b[0])} ${f1(b[1])}`; }
  return d; };
const spandrel = (d) => `<g class="pc" style="--sc:.3;--r:-20deg;--dx:-30px;--dy:-30px;--d:${d};--o:.05"><g transform="scale(.72)">
  <path d="M0 0H74C42 10 0 26 0 60Z" fill="url(#cenOakH)" filter="url(#cenGh)"/>
  <path d="${cusped()}" fill="none" stroke="#120a05" stroke-width="3.200"/>
  <path d="${cusped()}" class="cgold" style="stroke-width:1.500"/>
  <path d="M74 0C42 10 0 26 0 60" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="1" transform="translate(1.500 1.500)"/>
  <circle cx="15" cy="15" r="9" fill="#170d06" stroke="#d9b45a" stroke-width="1.200"/>
  <circle cx="15" cy="15" r="5.400" fill="none" stroke="#d9b45a" stroke-width=".8" stroke-dasharray="1.400 1.400"/>
  <circle cx="15" cy="15" r="3.400" class="cglow" style="--i:4"/><circle cx="15" cy="15" r="3.400" fill="none" stroke="#d9b45a" stroke-width=".9"/>
  <path d="M33 6c8-2 15-2 20 0c-5 3-12 5-20 3c2-1 2-2 0-3zM6 33c-2 8-2 15 0 20c3-5 5-12 3-20c-1 2-2 2-3 0z" fill="#170d06" stroke="#d9b45a" stroke-width=".9"/>
  <path d="M34 7.500c6-1 11-1 15 0M7.500 34c-1 6-1 11 0 15" class="cglow" style="--i:6;fill:none;stroke-width:1.400"/>
</g></g>`;

const frame = `
<defs>
  <linearGradient id="cenOakH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e3d22"/><stop offset=".5" stop-color="#36220f"/><stop offset="1" stop-color="#1a0f06"/></linearGradient>
  <linearGradient id="cenOakV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3a20"/><stop offset=".55" stop-color="#321f0e"/><stop offset="1" stop-color="#170d05"/></linearGradient>
  <linearGradient id="cenIron" x1="0" x2="1"><stop offset="0" stop-color="#4b5258"/><stop offset=".4" stop-color="#c3ccd3"/><stop offset=".6" stop-color="#6c747b"/><stop offset="1" stop-color="#22272b"/></linearGradient>
  <linearGradient id="cenPole" x1="0" x2="1"><stop offset="0" stop-color="#5a3a20"/><stop offset="1" stop-color="#140b04"/></linearGradient>
  <filter id="cenGh" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".014 .6" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .025  0 0 0 0 0  0 0 0 -1.600 .8"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  <filter id="cenGv" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".6 .014" numOctaves="3" seed="9"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .025  0 0 0 0 0  0 0 0 -1.600 .8"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
</defs>
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  <rect x="-20" y="-18" width="23" height="260" rx="2" fill="url(#cenOakV)" filter="url(#cenGv)"/><path d="M-19 -16v256" stroke="#b58652" opacity=".45"/><path d="M2.500 -16v256" stroke="#000" opacity=".6"/>
  ${rope(-14, -4, 6, 218, 8)}
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  <rect x="397" y="-18" width="23" height="260" rx="2" fill="url(#cenOakV)" filter="url(#cenGv)"/><path d="M398 -16v256" stroke="#b58652" opacity=".45"/><path d="M397.500 -16v256" stroke="#000" opacity=".5"/>
  ${rope(404, 414, 6, 218, 8)}
</g>
<g class="pc" style="--dy:70px;--d:.22;--o:.1">
  <rect x="-24" y="222" width="448" height="18" rx="2" fill="url(#cenOakH)" filter="url(#cenGh)"/><path d="M-22 223h444" stroke="#d9b45a" stroke-width="1" opacity=".7"/><path d="M-22 238h444" stroke="#d9b45a" stroke-width=".8" opacity=".45"/>
  ${vine(-14, 414, 231, 3, 22)}
</g>
<g class="pc" style="--dy:-90px;--d:.32;--o:.1">
  <rect x="-24" y="-18" width="448" height="20" rx="2" fill="url(#cenOakH)" filter="url(#cenGh)"/><path d="M-22 -17h444" stroke="#d9b45a" stroke-width="1" opacity=".75"/><path d="M-22 1.500h444" stroke="#000" opacity=".7"/>
  ${vine(-14, 414, -8, 4, 28)}
</g>
${spandrel(.45)}
<g transform="translate(400 0) scale(-1 1)">${spandrel(.52)}</g>
${pinnacle(-9, -16, 64, '--dy:-80px;--sc:.4;--d:.6;--o:0')}
${pinnacle(408.500, -16, 54, '--dy:-80px;--sc:.4;--d:.66;--o:0')}
${pinnacle(-9, 240, 66, '--dy:80px;--sc:.4;--d:.72;--o:0')}
${pinnacle(408.500, 240, 66, '--dy:80px;--sc:.4;--d:.78;--o:0')}
<g class="pc" style="--dy:200px;--d:.82;--o:.05">
  <rect x="446" y="-126" width="8" height="368" rx="3" fill="url(#cenPole)"/><path d="M447 -120v358" stroke="#a87c4a" opacity=".5"/>
  ${[-60, 70, 200].map((y) => `<rect x="444.500" y="${y}" width="11" height="5" rx="1" fill="#2a2e32" stroke="#6c747b" stroke-width=".7"/>`).join('')}
  <rect x="418" y="38" width="30" height="7" rx="1" fill="#1d2023" stroke="#5e666d"/><rect x="418" y="182" width="30" height="7" rx="1" fill="#1d2023" stroke="#5e666d"/>
  <path d="M418 41.500c-4 0-6 3-4 6c2 2 4 0 3-1.500M418 185.500c-4 0-6 3-4 6c2 2 4 0 3-1.500" class="ciron"/>
  <g class="chal">
    <path d="M447.500 -126V-104M452.500 -126V-104" stroke="#8d969d" stroke-width="1.600"/>
    <rect x="445" y="-134" width="10" height="10" rx="1.500" fill="url(#cenIron)" stroke="#14181b" stroke-width=".8"/>
    <path d="M450 -196L454.500 -150L450 -134L445.500 -150Z" fill="url(#cenIron)" stroke="#14181b" stroke-width=".9"/>
    <path d="M455 -160L463 -162C472 -177 485 -182 493 -180C488 -161 488 -138 495 -122C484 -121 470 -127 463 -133L455 -135Z" fill="url(#cenIron)" stroke="#14181b" stroke-width="1" stroke-linejoin="round"/>
    <path d="M492 -178C487 -160 487 -139 493 -124" fill="none" stroke="#f2f6f9" stroke-width="1.200" opacity=".8"/>
    <circle cx="468" cy="-148" r="4" fill="#14181b"/><circle cx="468" cy="-148" r="2" class="cfin"/>
    <rect class="csheen" x="420" y="-200" width="14" height="82" fill="#fff" opacity="0"/>
  </g>
</g>
${hinge(-8, 62, 0, 14, .9)}${hinge(-8, 140, 0, 14, .96)}${hinge(408, 62, 0, 14, 1.02)}${hinge(408, 140, 0, 14, 1.08)}
${hinge(352, 231, 90, 9, 1.12)}${hinge(380, 231, 90, 9, 1.18)}
<g class="fin" style="--d:1.800"><ellipse class="cray" cx="11" cy="11" rx="20" ry="20"/><ellipse class="cray" cx="389" cy="11" rx="20" ry="20" style="animation-delay:-2.300s"/></g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const GRAIN = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.5 .01' numOctaves='3' seed='6' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.500 .75'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`);
const CORNER = `<path d='M.5 .5h17v7h-10v10h-7z' fill='#1d2023' stroke='#6c747b' stroke-width='1'/><path d='M17.500 4c3-1 5.500 1 4.500 3.500c-.8 1.500-3 1-2.400-.6M4 17.500c-1 3 1 5.500 3.500 4.500c1.500-.8 1-3-.6-2.400' fill='none' stroke='#2a2e32' stroke-width='2.200' stroke-linecap='round'/><path d='M17.500 4c3-1 5.500 1 4.500 3.500c-.8 1.500-3 1-2.400-.6M4 17.500c-1 3 1 5.500 3.500 4.500c1.500-.8 1-3-.6-2.400' fill='none' stroke='#8d969d' stroke-width='.8' stroke-linecap='round'/><circle cx='4' cy='4' r='1.800' fill='#aab4bc'/><circle cx='16' cy='4' r='1.400' fill='#aab4bc'/><circle cx='4' cy='16' r='1.400' fill='#aab4bc'/>`;
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#120a04' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#4e321b' stroke-width='5'/>
  <rect x='2.200' y='2.200' width='67.600' height='67.600' fill='none' stroke='#d9b45a' stroke-opacity='.8' stroke-width='1'/><rect x='6.500' y='6.500' width='59' height='59' fill='none' stroke='#d9b45a' stroke-opacity='.45' stroke-width='.8'/>
  <g>${CORNER}</g><g transform='translate(72 0) scale(-1 1)'>${CORNER}</g><g transform='translate(0 72) scale(1 -1)'>${CORNER}</g><g transform='translate(72 72) scale(-1 -1)'>${CORNER}</g></svg>`);
// cresting of gilded leaf buds with curled sides on a rail (sits on the panel's top edge; no arches)
const BUD = `M10 1C13 4 13.500 8 10 11.500C6.500 8 7 4 10 1ZM10 12C7 12 4 11 3 8C5 8.500 7 9.500 10 12ZM10 12C13 12 16 11 17 8C15 8.500 13 9.500 10 12Z`;
const CREST = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='20' height='15'><path d='${BUD}' fill='#2c1b0c' stroke='#d9b45a' stroke-width='1'/><path d='M10 3.500V10' stroke='#d9b45a' stroke-opacity='.6' stroke-width='.6'/><rect x='0' y='12.400' width='20' height='2.600' fill='#d9b45a'/></svg>`);
const CRESTM = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='20' height='15'><path d='${BUD}' stroke='#000' stroke-width='1.600'/><path d='M0 12h20v3H0z'/></svg>`);
// hanging fringe of round scallops with gold beads below the panel
const FRINGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='11'><path d='M0 0H24V2.500C24 7 18 8 18 3C18 7.500 12 7.500 12 3C12 7.500 6 7.500 6 3C6 8 0 7 0 2.500Z' fill='#2c1b0c' stroke='#d9b45a' stroke-width='.9'/><circle cx='9' cy='8' r='1.100' fill='#e8c766'/><circle cx='21' cy='8' r='1.100' fill='#e8c766'/></svg>`);

const css = `
#stage[data-kit=central] .dplate{color:#f6ead0;text-shadow:0 1px 0 #000;border:1px solid #d9b45a;outline:1px solid #120a05;border-radius:2px;
  background:${GRAIN},linear-gradient(180deg,#5a3a20,#2e1c0e 60%,#1a0f07);box-shadow:inset 0 0 0 2px #120a05,inset 0 0 0 3px #d9b45a44,0 6px 10px #000a}
#stage[data-kit=central] .dplate::before,#stage[data-kit=central] .dplate::after{content:'';position:absolute;top:50%;width:7px;height:7px;margin-top:-3.500px;
  transform:rotate(45deg);background:linear-gradient(135deg,#ffe9a8,#b8862e);box-shadow:0 0 0 1px #3a2510}
#stage[data-kit=central] .dplate::before{left:-4px}#stage[data-kit=central] .dplate::after{right:-4px}
#stage[data-kit=central] .dplate span{font-family:'Pirata One',serif;font-size:23px;letter-spacing:.01em;color:var(--civ);
  text-shadow:0 0 10px color-mix(in srgb,var(--civ) 55%,transparent),0 1px 0 #000}

/* frame details */
#stage[data-kit=central] .dframe .cgold{fill:none;stroke:#d9b45a;stroke-width:1.100;stroke-linecap:round;stroke-linejoin:round;animation:cGild 5.500s ease-in-out infinite}
@keyframes cGild{0%,100%{stroke:#c99a3c}50%{stroke:#ffe6a0}}
#stage[data-kit=central] .dframe .cvd{fill:none;stroke:#0e0703;stroke-width:3;opacity:.8}
#stage[data-kit=central] .dframe .ccrock{fill:none;stroke:#d9b45a;stroke-width:1.300;stroke-linecap:round}
#stage[data-kit=central] .dframe .ciron{fill:none;stroke:#2a2e32;stroke-width:2.200;stroke-linecap:round;filter:drop-shadow(0 .6px 0 #8d969d)}
#stage[data-kit=central] .dframe .cglow{fill:var(--civ);opacity:.18;animation:cGlow 6s calc(var(--i,0)*.45s) ease-in-out infinite;stroke:var(--civ)}
@keyframes cGlow{0%,100%{opacity:.14}45%{opacity:.62}}
#stage[data-kit=central] .dframe .cfin{fill:var(--civ);filter:drop-shadow(0 0 4px var(--civ));animation:cFin 3.200s ease-in-out infinite}
@keyframes cFin{50%{opacity:.45}}
#stage[data-kit=central] .dframe .chal{transform-box:fill-box;transform-origin:50% 100%;animation:cHal 8s ease-in-out infinite}
@keyframes cHal{0%,100%{transform:rotate(0)}50%{transform:rotate(1.600deg)}}
#stage[data-kit=central] .dframe .csheen{animation:cSheen 5s ease-in-out infinite}
@keyframes cSheen{0%,70%{transform:translateX(0) skewX(-20deg);opacity:0}78%{opacity:.55}90%,100%{transform:translateX(80px) skewX(-20deg);opacity:0}}
#stage[data-kit=central] .dframe .cray{fill:var(--civ);opacity:.12;filter:blur(8px);animation:cRay 4.600s ease-in-out infinite}
@keyframes cRay{50%{opacity:.3}}
/* candlelight on the picture: warm glow low left and right, dark vault on top */
#stage[data-kit=central] .dshade{box-shadow:inset 0 0 48px rgba(0,0,0,.6),inset 0 22px 26px -14px rgba(0,0,0,.55)}
#stage[data-kit=central] .dshade::before{content:'';position:absolute;inset:0;animation:cCandle 3.100s steps(1) infinite;
  background:radial-gradient(200px 130px at 0 100%,rgba(255,170,70,.32),transparent 70%),radial-gradient(200px 130px at 100% 100%,rgba(255,170,70,.26),transparent 70%)}
@keyframes cCandle{0%{opacity:.9}17%{opacity:.75}29%{opacity:1}46%{opacity:.82}61%{opacity:.95}79%{opacity:.7}90%{opacity:1}}

/* panels: dark oak linenfold panelling, gilded fillet, iron corner hinges with curls, tracery cresting, cusped fringe */
#stage.skinned[data-kit=central] .pn.kd:not(.mu){
  background:${GRAIN},repeating-linear-gradient(90deg,rgba(0,0,0,.35) 0 2px,rgba(255,220,170,.05) 2px 5px,transparent 5px 18px,rgba(0,0,0,.25) 18px 22px,transparent 22px 40px),
    linear-gradient(180deg,rgba(56,36,20,.95),rgba(24,14,7,.96));
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 34px rgba(0,0,0,.6)}
#stage.skinned[data-kit=central] .pn.kd::after{inset:-7px;opacity:1;background:none;border:24px solid transparent;border-image:${EDGE} 24 / 24px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=central] .pn.kd.mu::after{inset:-7px}
#stage.skinned[data-kit=central] .pn.kd>.kd-t{height:15px;margin:0 22px -4px;
  background:linear-gradient(100deg,transparent 42%,rgba(255,244,210,.9) 50%,transparent 58%) 0 0/300% 100% no-repeat,${CREST} 0 0 repeat-x;
  -webkit-mask:${CRESTM} 0 0 repeat-x;mask:${CRESTM} 0 0 repeat-x;animation:fin .8s .15s both,cCrest 5.500s linear infinite}
@keyframes cCrest{from{background-position:120% 0,0 0}to{background-position:-20% 0,0 0}}
#stage.skinned[data-kit=central] .pn.kd>.kd-b{height:11px;margin:-1px 24px 0;background:${FRINGE} 0 0 repeat-x}
#stage.skinned[data-kit=central] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=central] .hd{border-bottom:1px solid rgba(217,180,90,.25);box-shadow:0 1px 0 rgba(0,0,0,.6)}

/* gold dust in the hall's light, a few accent sparks; gold leaf flakes on the burst */
#stage[data-kit=central] .p.mote{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fff6d8,rgba(232,199,102,.7) 40%,transparent 70%);
  animation:cMote var(--dur) var(--del) ease-in-out infinite}
@keyframes cMote{0%{transform:translate3d(0,60px,0);opacity:0}25%{opacity:calc(.3 + var(--k)*.6)}50%{transform:translate3d(calc(var(--j)*40px),-30px,0)}75%{opacity:calc(.3 + var(--k)*.5)}100%{transform:translate3d(calc(var(--j)*-25px),-150px,0);opacity:0}}
#stage[data-kit=central] .p.spark{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fff,var(--civ) 45%,transparent 72%);
  animation:cSpark var(--dur) var(--del) ease-in-out infinite}
@keyframes cSpark{0%,100%{transform:translate3d(0,0,0) scale(.4);opacity:0}30%{opacity:.9}60%{transform:translate3d(calc(var(--j)*30px),-70px,0) scale(1);opacity:.7}90%{opacity:0}}
#stage[data-kit=central] .p.leaf{width:calc(var(--s)*1.700);height:var(--s);border-radius:1px 4px;background:linear-gradient(135deg,#fff3c4,#e2b24a 45%,#8a5d18);
  box-shadow:0 0 6px rgba(255,220,140,.6);animation:cLeaf 1.900s var(--del) cubic-bezier(.15,.7,.3,1) both}
@keyframes cLeaf{0%{transform:translate3d(0,0,0) rotate(0) rotateX(0) scale(.3);opacity:0}12%{opacity:1}
  60%{transform:translate3d(calc(var(--j)*320px),calc(-180px - var(--k)*200px),0) rotate(calc(var(--j)*400deg)) rotateX(540deg) scale(1)}
  100%{transform:translate3d(calc(var(--j)*420px),calc(-60px - var(--k)*120px),0) rotate(calc(var(--j)*700deg)) rotateX(1080deg) scale(.9);opacity:0}}
`;

export default {
  id: 'central',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Pirata+One&display=swap',
  frame, css,
  mount: { x: 422, y: -112 }, // top-left of the civ's standard: pole axis = x 30 of the standard, y 0 = just under the halberd head
  perch: 40, // hands on the top beam
  particles: [{ cls: 'mote', n: 28, zone: 'sides', size: [3, 6], dur: [7, 13] }, { cls: 'spark', n: 8, zone: [0, 380, 640, 500], size: [3, 6], dur: [4, 8] }],
  burst: [{ cls: 'leaf', n: 40, zone: [120, 600, 260, 160], size: [5, 9], dur: [1, 1], spread: .8 }],
};
