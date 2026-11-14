// KIT: East Asia (Chinese, Japanese, Koreans, Shu, Wu, Wei). Red lacquered timber, glazed roof tiles, bronze
// fittings, paper lanterns. The camera frame is a secular palace gate: a sweeping glazed-tile eave with upswept
// corners over the top (the mascot sits on its ridge), interlocking bracket sets under it, red lacquered pillars at
// the sides, carved corner braces, paper lanterns swaying from the eave corners, and a lacquered pole on the right
// for the civ's standard. No written characters anywhere. All drawings are our own.
//
// --eaglz = the roof glaze colour. The kit derives it from the civ accent; a civ may set its own on
// #stage[data-civ=..] (imperial yellow, grey kawara, ...). Tiles in the frame and on the panels follow it.

const f1 = (n) => (+n.toFixed(1)).toString();
const bez = (a, b, c, d, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]); };

// glazed roof band (camera-local): eave line at y -34, ridge base at y -56, corners swept up to y -82
const ROOF = 'M-26 -82Q-6 -60 18 -56H382Q406 -60 426 -82C420 -62 404 -38 384 -34H16C-4 -38 -20 -62 -26 -82Z';
// round tile ends (wadang) along the eave, following the upswept curves at both ends
const discs = (() => {
  const pts = [];
  for (let x = 22; x <= 378; x += 8) pts.push([x, -36]);
  for (const t of [.16, .32, .48, .63, .77]) { const [x, y] = bez([16, -36], [-4, -40], [-19, -63], [-25, -81], t); pts.push([x, y], [400 - x, y]); }
  return pts.map(([x, y]) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="2.700" class="eawd"/><circle cx="${f1(x)}" cy="${f1(y)}" r=".9" fill="#5a3d10"/>`).join('');
})();

// one interlocking bracket set (dougong) on the lintel: block, arm, three small blocks, long arm under the eave
const dougong = (cx, i) => `<g class="pc" style="--dy:-26px;--sc:.25;--d:${(.42 + i * .05).toFixed(2)};--o:0">
  <rect x="${cx - 6}" y="-19" width="12" height="5" rx=".6" class="eab1"/>
  <path d="M${cx - 17} -19v-3.500q0-2.500 2.500-2.500h29q2.500 0 2.500 2.500v3.500h-4.500v-1.800h-25v1.800z" class="eab2"/>
  <rect x="${cx - 19}" y="-30" width="7" height="5" rx=".6" class="eab1"/><rect x="${cx - 3.500}" y="-30" width="7" height="5" rx=".6" class="eab1"/><rect x="${cx + 12}" y="-30" width="7" height="5" rx=".6" class="eab1"/>
  <path d="M${cx - 25} -30v-2q0-2 2-2h46q2 0 2 2v2z" class="eab3"/>
  <path d="M${cx - 13} -23.300h26" stroke="#fff" stroke-opacity=".35" stroke-width=".7"/>
</g>`;

// paper lantern hanging from (x,y) on a cord of length len; sways from the cord's top
const ribs = [4, 8.500, 13, 17.500, 22].map((y) => { const w = 11 * Math.sqrt(Math.max(0, 1 - ((y - 13) / 13) ** 2)); return `M${f1(-w)} ${y}Q0 ${f1(y + 2.200)} ${f1(w)} ${y}`; }).join('');
const lantern = (x, y, len, d, k) => `<g transform="translate(${x} ${y})"><g class="pc" style="--dy:-50px;--sc:.3;--d:${d};--o:0"><g class="ealan" style="--k:${k}">
  <path d="M0 0V${len}" stroke="#2a1608" stroke-width="1"/>
  <g transform="translate(0 ${len})">
    <ellipse class="eaglow" cx="0" cy="16" rx="24" ry="26" fill="url(#eaLg)"/>
    <rect x="-5.500" y="0" width="11" height="3.500" rx="1" fill="#c89b4a" stroke="#5a3d10" stroke-width=".6"/>
    <g transform="translate(0 3)">
      <ellipse cx="0" cy="13" rx="11" ry="13" fill="url(#eaPaper)" stroke="#5c0a0e" stroke-width=".8"/>
      <path d="${ribs}" fill="none" stroke="#7a1410" stroke-width=".7" opacity=".75"/>
      <path class="eaflick" d="M-4 6q4-3 8 0v14q-4 3-8 0z" fill="#fff2b0" opacity=".45"/>
      <path d="M-7 3.500q-3 5-2.500 10" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.200" stroke-linecap="round"/>
      <rect x="-5.500" y="25" width="11" height="3.500" rx="1" fill="#c89b4a" stroke="#5a3d10" stroke-width=".6"/>
      <g class="eatas"><path d="M0 28.500v4" stroke="#5a3d10" stroke-width="1.200"/><path d="M-2.500 32.500h5l1.500 13h-8z" fill="var(--civ)" stroke="color-mix(in srgb,var(--civ) 45%,#000)" stroke-width=".6"/>
        <path d="M-1.200 34v11M1.200 34v11" stroke="#000" stroke-opacity=".25" stroke-width=".6"/></g>
    </g>
  </g>
</g></g></g>`;

// carved corner brace (queti) between a pillar and the lintel; sx = 1 for the left pillar, -1 for the right
const brace = (x, sx, d) => `<g transform="translate(${x} 4) scale(${sx} 1)"><g class="pc" style="--sc:.2;--r:${sx * 40}deg;--d:${d};--o:0">
  <path d="M0 0H44C34 2 26 6 19 11C12 16 6 23 0 33Z" fill="url(#eaRh)" stroke="#e2b04a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M5 4H34C26 7 19 11 14 15C10 19 7 22 5 25Z" fill="#3d0a0c" opacity=".55"/>
  <path d="M8 8c6-1 10 2 9 6-1 3-5 3-6 1s1-4 3-3M22 6c5 0 7 2 5 4" fill="none" stroke="#e2b04a" stroke-width="1.100" stroke-linecap="round"/>
</g></g>`;

const stud = (x, y) => `<circle cx="${x}" cy="${y}" r="1.600" fill="#e8c06a" stroke="#5a3d10" stroke-width=".5"/>`;
const lattice = (x0, x1, y) => { let d = ''; for (let x = x0; x + 12 <= x1; x += 12) d += `M${x} ${y}l6-4.500 6 4.500-6 4.500z`; return `<path d="${d}" class="eagold"/>`; };

const frame = `
<defs>
  <linearGradient id="eaRv" x1="0" x2="1"><stop offset="0" stop-color="#e65a3c"/><stop offset=".45" stop-color="#b3191c"/><stop offset="1" stop-color="#5a090d"/></linearGradient>
  <linearGradient id="eaRh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ea5a3a"/><stop offset=".5" stop-color="#ad171b"/><stop offset="1" stop-color="#58090d"/></linearGradient>
  <linearGradient id="eaBz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0c66e"/><stop offset=".5" stop-color="#b8863a"/><stop offset="1" stop-color="#6a4a16"/></linearGradient>
  <linearGradient id="eaGlz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--eaglz) 80%,#fff)"/><stop offset=".35" style="stop-color:var(--eaglz)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--eaglz) 40%,#000)"/></linearGradient>
  <pattern id="eaTp" width="7" height="40" patternUnits="userSpaceOnUse" x="1" y="-90"><rect x=".5" width="3" height="40" fill="#fff" opacity=".2"/><path d="M4.300 0v40" stroke="#000" stroke-opacity=".5" stroke-width="1.100"/></pattern>
  <linearGradient id="eaSh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <radialGradient id="eaPaper" cx=".42" cy=".42" r=".65"><stop offset="0" stop-color="#ffe08a"/><stop offset=".45" stop-color="#f05a32"/><stop offset="1" stop-color="#8e1a14"/></radialGradient>
  <radialGradient id="eaLg"><stop offset="0" stop-color="#ffb24a" stop-opacity=".55"/><stop offset="1" stop-color="#ff7a20" stop-opacity="0"/></radialGradient>
  <clipPath id="eaRc"><path d="${ROOF}"/></clipPath>
</defs>
<g class="pc" style="--dx:-90px;--d:0;--o:.15">
  <rect x="-20" y="-14" width="18" height="252" fill="url(#eaRv)"/><path d="M-18.500 -12v248" stroke="#ffb08a" stroke-opacity=".45"/><path d="M-6 -12v248" stroke="#fff" stroke-opacity=".12" stroke-width="2.500"/>
  <rect x="-21" y="10" width="20" height="5" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".6"/><rect x="-21" y="206" width="20" height="5" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".6"/>
  <path d="M-25 246h28l-3-9h-22z" fill="#8d8a84" stroke="#3c3a36" stroke-width=".8"/>
</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">
  <rect x="402" y="-14" width="18" height="252" fill="url(#eaRv)"/><path d="M403.500 -12v248" stroke="#ffb08a" stroke-opacity=".45"/><path d="M416 -12v248" stroke="#fff" stroke-opacity=".12" stroke-width="2.500"/>
  <rect x="401" y="10" width="20" height="5" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".6"/><rect x="401" y="206" width="20" height="5" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".6"/>
  <path d="M397 246h28l-3-9h-22z" fill="#8d8a84" stroke="#3c3a36" stroke-width=".8"/>
</g>
<g class="pc" style="--dy:70px;--d:.2;--o:.1">
  <rect x="-26" y="223" width="452" height="15" rx="1.500" fill="url(#eaRh)"/><path d="M-24 224.500h448" stroke="#ffb08a" stroke-opacity=".5"/>
  <path d="M10 226.500h380M10 235.500h380" stroke="#e2b04a" stroke-width=".9"/>${lattice(14, 388, 231)}
  <rect x="-27" y="222" width="16" height="17" rx="1.500" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".7"/><rect x="411" y="222" width="16" height="17" rx="1.500" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".7"/>
  ${stud(-23, 226)}${stud(-15, 226)}${stud(-23, 235)}${stud(-15, 235)}${stud(415, 226)}${stud(423, 226)}${stud(415, 235)}${stud(423, 235)}
</g>
<g class="pc" style="--dy:-60px;--d:.3;--o:.1">
  <rect x="-24" y="-34" width="448" height="21" fill="#3d0a0c"/><path d="M-24 -33h448" stroke="#000" stroke-opacity=".5"/>
  <rect x="-27" y="-14" width="454" height="18" rx="1.500" fill="url(#eaRh)"/><path d="M-25 -12.500h450" stroke="#ffb08a" stroke-opacity=".55"/><path d="M-25 3.500h450" stroke="#000" stroke-opacity=".55"/>
  <rect x="26" y="-10.500" width="348" height="11" fill="#1d4f86" stroke="#e2b04a" stroke-width="1"/>
  <path d="M150 -5l10-4.500h80l10 4.500-10 4.500h-80z" fill="#1f7a70" stroke="#e2b04a" stroke-width="1"/>
  <path d="M170 -5h60" stroke="#f6e3b0" stroke-width=".8" opacity=".7"/>
  ${[52, 86, 120, 280, 314, 348].map((x) => `<circle cx="${x}" cy="-5" r="4" fill="#1f7a70" stroke="#e2b04a" stroke-width=".9"/><path d="M${x} -5m-2 0a2 2 0 1 1 2 2" fill="none" stroke="#f6e3b0" stroke-width=".8"/>`).join('')}
  <rect x="-28" y="-15" width="14" height="20" rx="1.500" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".7"/><rect x="414" y="-15" width="14" height="20" rx="1.500" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".7"/>
  ${stud(-21, -9)}${stud(-21, -1)}${stud(421, -9)}${stud(421, -1)}
</g>
${[22, 73, 124, 175, 226, 277, 328, 379].map(dougong).join('')}
${brace(-2, 1, .82)}${brace(402, -1, .88)}
<g class="pc" style="--dy:220px;--d:.62;--o:.05">
  <rect x="452" y="-160" width="8" height="404" rx="2.500" fill="url(#eaRv)"/><path d="M453.500 -158v400" stroke="#ffb08a" stroke-opacity=".5"/>
  ${[-136, -40, 80, 206].map((y) => `<rect x="450.500" y="${y}" width="11" height="5" rx="1" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".6"/>`).join('')}
  <path d="M456 -174c4 3 5 8 4 11l-4 3-4-3c-1-3 0-8 4-11z" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".7"/><rect x="451" y="-162" width="10" height="3" rx="1" fill="url(#eaBz)" stroke="#5a3d10" stroke-width=".6"/>
  <rect x="420" y="40" width="33" height="5" rx="1" fill="url(#eaRh)" stroke="#3d0a0c" stroke-width=".7"/><rect x="420" y="190" width="33" height="5" rx="1" fill="url(#eaRh)" stroke="#3d0a0c" stroke-width=".7"/>
  ${stud(424, 42.500)}${stud(448, 42.500)}${stud(424, 192.500)}${stud(448, 192.500)}
</g>
<g class="pc" style="--dy:-140px;--sc:1.150;--d:.78;--o:.05">
  <path d="${ROOF}" fill="url(#eaGlz)"/>
  <g clip-path="url(#eaRc)">
    <rect x="-30" y="-90" width="460" height="60" fill="url(#eaTp)"/>
    <path d="M-20 -72Q0 -52 22 -50H378Q400 -52 420 -72" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1"/>
    <path d="M-16 -64Q4 -46 22 -43H378Q396 -46 416 -64" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1"/>
    <rect class="easheen" x="-90" y="-90" width="46" height="60" fill="url(#eaSh)"/>
  </g>
  <path d="M-26 -82Q-6 -60 18 -56H382Q406 -60 426 -82" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>
  ${discs}
  <rect x="16" y="-63" width="368" height="8" rx="2" fill="url(#eaGlz)" stroke="color-mix(in srgb,var(--eaglz) 30%,#000)" stroke-width=".8"/>
  <path d="M18 -61.500h364" stroke="#fff" stroke-opacity=".45" stroke-width="1"/>
  <path d="M18 -59C6 -60 2 -68 8 -74C13 -78 20 -74 16 -69" fill="none" stroke="color-mix(in srgb,var(--eaglz) 30%,#000)" stroke-width="5.500" stroke-linecap="round"/>
  <path d="M18 -59C6 -60 2 -68 8 -74C13 -78 20 -74 16 -69" fill="none" stroke="var(--eaglz)" stroke-width="3.200" stroke-linecap="round"/>
  <path d="M382 -59C394 -60 398 -68 392 -74C387 -78 380 -74 384 -69" fill="none" stroke="color-mix(in srgb,var(--eaglz) 30%,#000)" stroke-width="5.500" stroke-linecap="round"/>
  <path d="M382 -59C394 -60 398 -68 392 -74C387 -78 380 -74 384 -69" fill="none" stroke="var(--eaglz)" stroke-width="3.200" stroke-linecap="round"/>
  <circle cx="-25" cy="-81" r="2.600" fill="url(#eaBz)"/><circle cx="425" cy="-81" r="2.600" fill="url(#eaBz)"/>
</g>
${lantern(-14, -62, 30, 1.15, .2)}${lantern(428, -79, 40, 1.25, .7)}
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
const CORNER = `<path d='M.6 .6H23Q23 9 15 9Q9 9 9 15Q9 23 .6 23Z' fill='#c08a3a' stroke='#5a3d10' stroke-width='1'/><path d='M3 3H18Q17 6 13 6.500Q7 7 6.500 13Q6 17 3 18Z' fill='#f0c66e' opacity='.45'/><circle cx='5' cy='5' r='1.800' fill='#f6dc96' stroke='#5a3d10' stroke-width='.6'/>`;
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#1a0405' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#a8161b' stroke-width='5.500'/>
  <rect x='2.500' y='2.500' width='67' height='67' fill='none' stroke='#ff9a7a' stroke-opacity='.4' stroke-width='1'/><rect x='7.500' y='7.500' width='57' height='57' fill='none' stroke='#e2b04a' stroke-width='1'/>
  ${CORNER}<g transform='translate(72 0) scale(-1 1)'>${CORNER}</g><g transform='translate(0 72) scale(1 -1)'>${CORNER}</g><g transform='translate(72 72) scale(-1 -1)'>${CORNER}</g></svg>`);
const TIP = (flip) => svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='18' viewBox='0 0 16 18'><g ${flip ? "transform='translate(16 0) scale(-1 1)'" : ''}>
  <path d='M1 1C4 8 9 12 16 13V18H9C5 16 2 10 1 1Z' fill='#7a5a2a' stroke='#3a2608' stroke-width='.8'/><path d='M2.500 4C5 9 9 12 15 14' fill='none' stroke='#f0c66e' stroke-opacity='.6' stroke-width='.8'/><circle cx='1.600' cy='1.800' r='1.500' fill='#f0c66e'/></g></svg>`);

const css = `
#stage[data-kit=eastasia]{--eaglz:color-mix(in srgb,var(--civ) 45%,#23414b)}
#stage[data-kit=eastasia] .dplate{color:#f8ecd2;text-shadow:0 1px 0 #000;border:1px solid #e2b04a;border-radius:2px;outline:1px solid #2a0507;
  background:linear-gradient(115deg,transparent 30%,rgba(255,220,170,.12) 45%,transparent 60%),linear-gradient(180deg,#3a0d0d,#1a0607 60%,#0c0304);
  box-shadow:inset 0 0 0 2px #8e1b17,inset 0 1px 0 4px #00000055,0 6px 10px #000a}
#stage[data-kit=eastasia] .dplate span{font-family:'Shippori Mincho B1',serif;font-weight:800;font-size:21px;color:var(--civ);text-shadow:0 1px 0 #000,0 0 10px color-mix(in srgb,var(--civ) 55%,transparent)}
#stage[data-kit=eastasia] .dplate::before,#stage[data-kit=eastasia] .dplate::after{content:'';position:absolute;top:50%;width:6px;height:6px;margin-top:-3px;rotate:45deg;
  background:linear-gradient(135deg,#f6dc96,#b8863a 60%,#6a4a16);box-shadow:0 0 0 1px #3a2608}
#stage[data-kit=eastasia] .dplate::before{left:4px}#stage[data-kit=eastasia] .dplate::after{right:5px}
#stage[data-kit=eastasia] .dplate .mark{margin-left:7px}

/* frame details */
#stage[data-kit=eastasia] .dframe .eagold{fill:none;stroke:#e2b04a;stroke-width:1;stroke-linejoin:round}
#stage[data-kit=eastasia] .dframe .eab1{fill:#1d4f86;stroke:#e2b04a;stroke-width:.8}
#stage[data-kit=eastasia] .dframe .eab2{fill:#1f7a70;stroke:#e2b04a;stroke-width:.8;stroke-linejoin:round}
#stage[data-kit=eastasia] .dframe .eab3{fill:#2a6aa6;stroke:#e2b04a;stroke-width:.8}
#stage[data-kit=eastasia] .dframe .eawd{fill:color-mix(in srgb,var(--eaglz) 55%,#f0c66e);stroke:color-mix(in srgb,var(--eaglz) 30%,#000);stroke-width:.7}
#stage[data-kit=eastasia] .dframe .easheen{transform-box:view-box;animation:eaSheen 7s 2s ease-in-out infinite}
@keyframes eaSheen{0%{transform:translateX(0) skewX(-24deg)}45%,100%{transform:translateX(560px) skewX(-24deg)}}
#stage[data-kit=eastasia] .dframe .ealan{transform-box:fill-box;transform-origin:50% 0;animation:eaSwing calc(3.200s + var(--k)*1.600s) ease-in-out infinite alternate}
@keyframes eaSwing{from{transform:rotate(-5deg)}to{transform:rotate(6deg)}}
#stage[data-kit=eastasia] .dframe .eatas{transform-box:fill-box;transform-origin:50% 0;animation:eaSwing 1.900s ease-in-out infinite alternate-reverse}
#stage[data-kit=eastasia] .dframe .eaglow{animation:eaGlow 2.300s ease-in-out infinite alternate}
@keyframes eaGlow{from{opacity:.65}to{opacity:1}}
#stage[data-kit=eastasia] .dframe .eaflick{animation:eaFlick 1.700s steps(2) infinite}
@keyframes eaFlick{0%,100%{opacity:.4}40%{opacity:.6}70%{opacity:.3}}
/* warm lantern light falling into the camera picture from the top corners */
#stage[data-kit=eastasia] .dshade{box-shadow:inset 0 0 44px rgba(0,0,0,.55),inset 0 16px 26px -12px rgba(255,150,60,.32);
  background:radial-gradient(130px 100px at 0 0,rgba(255,160,70,.3),transparent 70%),radial-gradient(130px 100px at 100% 0,rgba(255,160,70,.3),transparent 70%)}

/* panels: black lacquer with a gloss, red lacquer rim, bronze cloud corners, a little glazed eave on top, tassels below */
#stage.skinned[data-kit=eastasia] .pn.kd:not(.mu){
  background:linear-gradient(115deg,transparent 35%,rgba(255,220,180,.06) 48%,transparent 60%),linear-gradient(180deg,rgba(44,12,12,calc(var(--glass,.55)*1.35)),rgba(16,5,6,calc(var(--glass,.55)*1.38)));
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,calc(var(--glass,.55)*1.28)),inset 0 0 34px rgba(0,0,0,.55)}
#stage.skinned[data-kit=eastasia] .pn.kd::after{inset:-7px;opacity:1;background:none;border:23px solid transparent;border-image:${EDGE} 23 / 23px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=eastasia] .pn.kd.mu::after{inset:-7px}
#stage.skinned[data-kit=eastasia] .pn.kd>.kd-t{height:14px;margin:0 -4px -6px}
#stage.skinned[data-kit=eastasia] .pn.kd>.kd-t::before{content:'';position:absolute;inset:0 6px 0;clip-path:polygon(7px 0,calc(100% - 7px) 0,100% 100%,0 100%);
  background:radial-gradient(circle at 3px 11px,color-mix(in srgb,var(--eaglz) 55%,#f0c66e) 0 2.200px,#3a2608 2.500px 2.900px,transparent 3.100px) 0 0/6px 14px repeat-x,
    repeating-linear-gradient(90deg,rgba(255,255,255,.2) 0 2.500px,rgba(0,0,0,.45) 2.500px 3.500px,transparent 3.500px 6px),
    linear-gradient(180deg,color-mix(in srgb,var(--eaglz) 80%,#fff),var(--eaglz) 35%,color-mix(in srgb,var(--eaglz) 40%,#000));
  filter:drop-shadow(0 2px 2px rgba(0,0,0,.6))}
#stage.skinned[data-kit=eastasia] .pn.kd>.kd-t::after{content:'';position:absolute;left:-6px;right:-6px;bottom:-1px;height:18px;
  background:${TIP(false)} 0 100%/16px 18px no-repeat,${TIP(true)} 100% 100%/16px 18px no-repeat}
#stage.skinned[data-kit=eastasia] .pn.kd>.kd-b{height:26px;margin:-3px 4px 0}
#stage.skinned[data-kit=eastasia] .pn.kd>.kd-b::before,#stage.skinned[data-kit=eastasia] .pn.kd>.kd-b::after{content:'';position:absolute;top:0;width:10px;height:26px;transform-origin:50% 0;
  background:radial-gradient(circle at 50% 4px,#f0c66e 0 3px,#5a3d10 3.400px,transparent 3.800px),linear-gradient(90deg,transparent 4px,#5c0a0e 4px 6px,transparent 6px) 0 0/100% 12px no-repeat,
    linear-gradient(180deg,var(--civ),color-mix(in srgb,var(--civ) 45%,#000)) 50% 100%/7px 14px no-repeat;
  animation:eaTassel 2.600s ease-in-out infinite alternate}
#stage.skinned[data-kit=eastasia] .pn.kd>.kd-b::before{left:2px}
#stage.skinned[data-kit=eastasia] .pn.kd>.kd-b::after{right:2px;animation-delay:-1.300s}
@keyframes eaTassel{from{rotate:-7deg}to{rotate:7deg}}
#stage.skinned[data-kit=eastasia] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=eastasia] .hd{border-bottom:1px solid rgba(226,176,74,.45);box-shadow:0 1px 0 rgba(0,0,0,.6)}

/* drifting blossom petals, lantern motes rising near the camera */
#stage[data-kit=eastasia] .p.petal{width:var(--s);height:calc(var(--s)*.7);border-radius:100% 0 100% 0;background:linear-gradient(135deg,#fff4f7,#f6b4c6 60%,#e2849f);
  animation:eaFall var(--dur) var(--del) linear infinite,eaSpin calc(1.800s + var(--k)*2.400s) linear infinite}
@keyframes eaFall{0%{transform:translate3d(0,-140px,0);opacity:0}12%{opacity:calc(.5 + var(--k)*.5)}85%{opacity:calc(.5 + var(--k)*.5)}100%{transform:translate3d(calc(70px + var(--j)*80px),380px,0);opacity:0}}
@keyframes eaSpin{from{rotate:0deg;scale:1 1}50%{scale:1 .35}to{rotate:360deg;scale:1 1}}
#stage[data-kit=eastasia] .p.mote{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#ffe2a8,rgba(255,150,60,.6) 40%,transparent 70%);
  animation:eaRise var(--dur) var(--del) ease-in-out infinite}
@keyframes eaRise{0%{transform:translate3d(0,40px,0);opacity:0}30%{opacity:calc(.3 + var(--k)*.6)}100%{transform:translate3d(calc(var(--j)*40px),-170px,0);opacity:0}}
/* burst: red and gold paper scraps of a string of firecrackers, flung up from the camera */
#stage[data-kit=eastasia] .p.scrap{width:var(--s);height:calc(var(--s)*1.500);background:#d8231e;box-shadow:inset 0 0 0 1px rgba(255,214,120,.4);
  animation:eaPop 1.800s var(--del) cubic-bezier(.2,.7,.4,1) both}
#stage[data-kit=eastasia] .p.scrap:nth-child(3n){background:#f2c14e}
@keyframes eaPop{0%{transform:translate3d(0,0,0) rotate(0) scale(.2);opacity:0}10%{opacity:1}45%{transform:translate3d(calc(var(--j)*260px),calc(-120px - var(--k)*200px),0) rotate(calc(var(--j)*400deg)) scale(1);opacity:1}
  100%{transform:translate3d(calc(var(--j)*380px),calc(70px - var(--k)*60px),0) rotate(calc(var(--j)*900deg)) scale(1);opacity:0}}
#stage[data-kit=eastasia] .p.spark{width:var(--s);height:var(--s);border-radius:50%;background:#fff3c0;box-shadow:0 0 8px 3px #ffb43a;
  animation:eaSpark .9s var(--del) ease-out both}
@keyframes eaSpark{0%{transform:scale(.2);opacity:0}20%{transform:scale(1.400);opacity:1}100%{transform:translate3d(calc(var(--j)*90px),calc(-40px - var(--k)*80px),0) scale(.3);opacity:0}}
`;

export default {
  id: 'eastasia',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@800&display=swap',
  frame, css,
  mount: { x: 444, y: -160 }, // standard svg: pole axis at its x 12, pole top at its y 0
  perch: -12, // the mascot's hands rest on the roof ridge
  particles: [{ cls: 'petal', n: 30, zone: 'sides', size: [5, 9], dur: [8, 14] }, { cls: 'mote', n: 8, zone: [0, 560, 500, 240], size: [3, 6], dur: [4, 7] }],
  burst: [{ cls: 'scrap', n: 36, zone: [40, 540, 400, 90], size: [4, 7], dur: [1, 1], spread: 1 }, { cls: 'spark', n: 10, zone: [40, 520, 420, 120], size: [3, 5], dur: [1, 1], spread: 1.2 }],
};
