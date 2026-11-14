// KIT: Mediterranean (Spanish, Portuguese, Italians, Sicilians, Byzantines, Romans). Veined marble, mosaic
// tesserae, gold leaf, terracotta, warm sunlight. The camera frame is a colonnade: a fluted column with a capital
// on each side, an entablature across the top with a glittering mosaic frieze (a running-wave band of tesserae),
// a dentil cornice and a row of terracotta roof-tile ends above; a gilded spear pole on the right carries the
// civ's standard. All drawings are our own.

// Standards hang from a side arm on the RIGHT of the pole (gonfalon style), never from a crossbar across it.
// sideArm() draws, in standard coordinates (pole axis x 60), a gilded collar on the pole at height y and a
// scrolled brace under the arm; the civ draws its own arm/cloth shifted right so the arm starts at the pole.
export const sideArm = (y = 30) => `<g class="fin" style="--d:1.250">
  <path d="M61 ${y + 26}C61 ${y + 12} 64 ${y + 4} 71 ${y + 2}" fill="none" stroke="#6b440c" stroke-width="3.200" stroke-linecap="round"/>
  <path d="M61 ${y + 26}C61 ${y + 12} 64 ${y + 4} 71 ${y + 2}" fill="none" stroke="#f0c24a" stroke-width="1.500" stroke-linecap="round"/>
  <circle cx="64.500" cy="${y + 13}" r="2.600" fill="none" stroke="#f0c24a" stroke-width="1.200"/></g>
  <rect x="55" y="${y - 4}" width="10" height="11" rx="2" fill="#e6b43c" stroke="#6b440c" stroke-width=".7"/><rect x="55" y="${y + 24}" width="10" height="5" rx="1.500" fill="#e6b43c" stroke="#6b440c" stroke-width=".6"/>`;

const R = 3.6; // tessera pitch (3px stone + .6 grout)
const LAPIS = '#1d3f78', LAPIS2 = '#28539a', GOLD = '#f0c24a', GOLD2 = '#d9a636', CREAM = '#efe8d8';

// running-wave mosaic band: 5 rows, border rows in the civ accent, a gold wave over lapis and cream
function frieze(x0, x1, y0) {
  const d = { a: '', b: '', b2: '', g: '', g2: '', w: '' };
  let c = 0;
  for (; x0 + c * R + 3 <= x1; c++) {
    const x = (x0 + c * R).toFixed(1);
    const w = 2 + Math.round(Math.sin(c * Math.PI / 5) * 1.2);
    for (let r = 0; r < 5; r++) {
      const k = r === 0 || r === 4 ? 'a' : r < w ? ((c + r) % 3 ? 'b' : 'b2') : r === w ? ((c + r) % 2 ? 'g' : 'g2') : 'w';
      d[k] += `M${x} ${(y0 + r * R).toFixed(1)}h3v3h-3z`;
    }
  }
  const glint = Array.from({ length: 18 }, (_, i) => { const cc = (i * 37 + 5) % c, rr = 1 + ((i * 7) % 3);
    return `<rect class="mgl" style="--i:${i}" x="${(x0 + cc * R).toFixed(1)}" y="${(y0 + rr * R).toFixed(1)}" width="3" height="3" fill="#fffbe8"/>`; }).join('');
  return `<rect x="${x0 - 1}" y="${y0 - 1}" width="${x1 - x0 + 2}" height="${5 * R + 1.4}" fill="#3b352c"/>
    <path d="${d.a}" fill="var(--civ)"/><path d="${d.b}" fill="${LAPIS}"/><path d="${d.b2}" fill="${LAPIS2}"/>
    <path d="${d.g}" fill="${GOLD}"/><path d="${d.g2}" fill="${GOLD2}"/><path d="${d.w}" fill="${CREAM}"/>${glint}`;
}

const volute = (x, y) => `<circle cx="${x}" cy="${y}" r="5.200" fill="url(#medH)" stroke="#6e685d" stroke-width=".7"/>
  <path d="M${x - 3.6} ${y}a3.600 3.600 0 1 1 3.600 3.600a2.600 2.600 0 1 1-2.600-2.600a1.500 1.500 0 1 1 1.500 1.500" fill="none" stroke="url(#medGold)" stroke-width="1.100"/>`;

// fluted column, cx = shaft axis
const column = (cx) => { const x = cx - 13; return `
  <rect x="${x}" y="13" width="26" height="211" fill="url(#medCol)" filter="url(#medGr)"/>
  <rect x="${x}" y="13" width="26" height="211" fill="url(#medVein)" opacity=".8"/>
  ${[4, 8.500, 13, 17.500, 22].map((o) => `<path d="M${x + o} 19v199" stroke="#6e685d" stroke-opacity=".42" stroke-width="1.700" stroke-linecap="round"/><path d="M${x + o + 1.300} 19v199" stroke="#fff" stroke-opacity=".55" stroke-width=".6"/>`).join('')}
  <rect x="${x - 2}" y="10" width="30" height="4" fill="url(#medGold)"/>
  <path d="M${cx - 17} 4.500q17 8 34 0v4.500q-17 4-34 0z" fill="url(#medH)" stroke="#6e685d" stroke-width=".6"/>
  ${[-8, 0, 8].map((o) => `<ellipse cx="${cx + o}" cy="7.200" rx="2.300" ry="1.700" fill="url(#medGold)"/>`).join('')}
  ${volute(cx - 16, 8.500)}${volute(cx + 16, 8.500)}
  <rect x="${cx - 20}" y="0" width="40" height="4.500" fill="url(#medH)" stroke="#6e685d" stroke-width=".6"/>
  <rect x="${x - 3}" y="219" width="32" height="5.500" rx="2.700" fill="url(#medH)" stroke="#6e685d" stroke-width=".6"/>
  <rect x="${x - 1}" y="217.500" width="28" height="2" fill="url(#medGold)"/>
  <rect x="${cx - 18}" y="224" width="36" height="10" fill="url(#medH)" stroke="#6e685d" stroke-width=".6"/>`; };

const antefix = (x, i) => `<g class="pc" style="--dy:-60px;--r:${i % 2 ? 30 : -30}deg;--d:${(.62 + i * .035).toFixed(2)};--o:0">
  <path d="M${x} -40L${x - 8} -50a2.700 2.700 0 0 1 5.330 0a2.700 2.700 0 0 1 5.330 0a2.700 2.700 0 0 1 5.330 0z" fill="url(#medTer)" stroke="#5a2410" stroke-width=".9" stroke-linejoin="round"/>
  <path d="M${x} -42L${x - 5.300} -51M${x} -42V-52.500M${x} -42L${x + 5.300} -51" stroke="#7a2e12" stroke-width=".9" fill="none" stroke-linecap="round"/>
  <path d="M${x - 7} -50.500a2.300 2.300 0 0 1 3.500-1.600" stroke="#ffb07a" stroke-opacity=".6" stroke-width=".8" fill="none"/>
  <circle cx="${x}" cy="-41.500" r="1.700" fill="url(#medGold)"/></g>`;

const rosette = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:3;--r:-90deg;--d:${d};--o:0">
  <circle r="9" fill="#3b352c"/>
  ${Array.from({ length: 8 }, (_, i) => `<ellipse rx="2.400" ry="5" cy="-4" transform="rotate(${i * 45})" fill="url(#medGold)" stroke="#7a5212" stroke-width=".5"/>`).join('')}
  <circle r="2.600" fill="var(--civ)" stroke="#7a5212" stroke-width=".7"/><circle class="mglr" cx="-1" cy="-1" r=".9" fill="#fff"/></g></g>`;

const frame = `
<defs>
  <linearGradient id="medCol" x1="0" x2="1"><stop offset="0" stop-color="#9f998c"/><stop offset=".28" stop-color="#fbf9f4"/><stop offset=".55" stop-color="#e2ddd2"/><stop offset=".85" stop-color="#bab3a5"/><stop offset="1" stop-color="#857f72"/></linearGradient>
  <linearGradient id="medH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf9f4"/><stop offset=".6" stop-color="#dfdacd"/><stop offset="1" stop-color="#a59e90"/></linearGradient>
  <linearGradient id="medGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".35" stop-color="#e6b43c"/><stop offset=".6" stop-color="#a8741a"/><stop offset=".8" stop-color="#f7d774"/><stop offset="1" stop-color="#8a5a12"/></linearGradient>
  <linearGradient id="medPole" x1="0" x2="1"><stop offset="0" stop-color="#6b440c"/><stop offset=".35" stop-color="#f9e08a"/><stop offset=".6" stop-color="#d7a838"/><stop offset="1" stop-color="#5e3a0a"/></linearGradient>
  <linearGradient id="medBlade" x1="0" x2="1"><stop offset="0" stop-color="#8c969e"/><stop offset=".45" stop-color="#f1f5f8"/><stop offset=".55" stop-color="#b9c3cb"/><stop offset="1" stop-color="#5d666d"/></linearGradient>
  <linearGradient id="medTer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e88a55"/><stop offset=".55" stop-color="#b9572c"/><stop offset="1" stop-color="#7a3015"/></linearGradient>
  <linearGradient id="medShine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fffbe0" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <pattern id="medVein" width="80" height="110" patternUnits="userSpaceOnUse">
    <path d="M-5 20c15 6 22-4 34 8s20 30 40 22 14-6 16-4" fill="none" stroke="#7b7568" stroke-opacity=".55" stroke-width=".8"/>
    <path d="M10 70c10-8 26 6 30 20s22 4 44 18" fill="none" stroke="#8a8478" stroke-opacity=".4" stroke-width=".6"/>
    <path d="M44 0c-4 14 8 22 4 36M62 52c-6 8-2 18-12 26" fill="none" stroke="#c9a253" stroke-opacity=".5" stroke-width=".6"/></pattern>
  <filter id="medGr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .43  0 0 0 0 .40  0 0 0 -2.600 1.200"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  <clipPath id="medFz"><rect x="-34" y="-33" width="468" height="19"/></clipPath>
</defs>
<rect class="fin mfil" style="--d:1.500" x="2.500" y="2.500" width="395" height="220"/>
<rect class="fin mfil2" style="--d:1.600" x="6" y="6" width="388" height="213"/>
<g class="pc" style="--dy:70px;--d:.2;--o:.1">
  <rect x="-38" y="223" width="476" height="12" fill="url(#medH)" filter="url(#medGr)"/><rect x="-38" y="223" width="476" height="12" fill="url(#medVein)"/>
  <rect x="-38" y="222.500" width="476" height="1.600" fill="url(#medGold)"/>
  ${Array.from({ length: 39 }, (_, i) => `<rect x="${-30 + i * 12}" y="227.500" width="4" height="4" fill="${i % 3 === 1 ? 'var(--civ)' : i % 2 ? '#b9572c' : LAPIS}"/>`).join('')}
  <rect x="-42" y="235" width="484" height="9" fill="#a8a194"/><path d="M-42 235.500h484" stroke="#fff" stroke-opacity=".6"/>
</g>
<g class="pc" style="--dx:-90px;--d:0;--o:.15">${column(-12)}</g>
<g class="pc" style="--dx:90px;--d:.08;--o:.15">${column(412)}</g>
<g class="pc" style="--dy:-90px;--d:.3;--o:.1">
  <rect x="-34" y="-14" width="468" height="15" fill="url(#medH)" filter="url(#medGr)"/><rect x="-34" y="-14" width="468" height="15" fill="url(#medVein)"/>
  <path d="M-34 -9.500h468M-34 -4.500h468" stroke="#8a8478" stroke-opacity=".6" stroke-width=".8"/><path d="M-34 -8.700h468M-34 -3.700h468" stroke="#fff" stroke-opacity=".7" stroke-width=".6"/>
  <rect x="-34" y="-.6" width="468" height="1.800" fill="url(#medGold)"/>
</g>
<g class="pc" style="--dy:-110px;--d:.38;--o:.1">
  ${frieze(-33, 433, -32)}
  <g clip-path="url(#medFz)"><rect class="msh" x="-110" y="-33" width="60" height="19" fill="url(#medShine)"/></g>
  <rect x="-34" y="-33.500" width="468" height="1.400" fill="url(#medGold)"/><rect x="-34" y="-14.600" width="468" height="1.200" fill="url(#medGold)"/>
</g>
<g class="pc" style="--dy:-120px;--d:.48;--o:.08">
  <rect x="-40" y="-47" width="480" height="7" fill="url(#medTer)"/>
  <path d="${Array.from({ length: 40 }, (_, i) => `M${-36 + i * 12} -46.500v6`).join('')}" stroke="#5a2410" stroke-opacity=".6" stroke-width="1.200"/>
  <rect x="-40" y="-41" width="480" height="8" fill="url(#medH)"/><rect x="-40" y="-41.500" width="480" height="1.400" fill="url(#medGold)"/>
  <path d="${Array.from({ length: 80 }, (_, i) => `M${-38 + i * 6} -36.500h3.600v3h-3.600z`).join('')}" fill="#6e685d" fill-opacity=".55"/>
</g>
${Array.from({ length: 17 }, (_, i) => antefix(-26 + i * 28, i)).join('')}
${rosette(-36, -23, .55)}${rosette(436, -23, .6)}
<g class="pc" style="--dy:220px;--d:.75;--o:.05">
  ${[44, 186].map((y) => `<rect x="423" y="${y}" width="38" height="6" fill="url(#medH)" stroke="#6e685d" stroke-width=".6"/>`).join('')}
  <rect x="458" y="-128" width="8" height="372" rx="1.500" fill="url(#medPole)"/>
  ${[-104, -40, 40, 120, 184, 226].map((y) => `<rect x="456" y="${y}" width="12" height="${y === 40 || y === 184 ? 10 : 4}" rx="1" fill="url(#medGold)" stroke="#6b440c" stroke-width=".6"/>`).join('')}
  <path d="M458 244h8l-4 10z" fill="url(#medGold)" stroke="#6b440c" stroke-width=".6"/>
  <rect x="458.500" y="-136" width="7" height="10" rx="1.500" fill="url(#medGold)" stroke="#6b440c" stroke-width=".6"/>
  <path d="M462 -172c5 9 7 21 4 32l-4 5-4-5c-3-11-1-23 4-32z" fill="url(#medBlade)" stroke="#2e3439" stroke-width=".7"/>
  <path d="M462 -168v29" stroke="url(#medGold)" stroke-width="1.300"/>
  <path class="mspk" d="M460 -160l2-4 2 4-2 1z" fill="#fff"/>
</g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
// nero portoro: black marble with gold and white veins
const PORTORO = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'>
  <path d='M-10 40c40-10 60 20 100 8s70-30 110-6 80 10 130-8' fill='none' stroke='#c99a3c' stroke-opacity='.22' stroke-width='1.100'/>
  <path d='M-10 44c40-8 62 18 100 8' fill='none' stroke='#f3d58a' stroke-opacity='.14' stroke-width='.6'/>
  <path d='M20 150c30-14 50 12 90 2s60-34 100-12 70 18 120 4' fill='none' stroke='#c99a3c' stroke-opacity='.16' stroke-width='.9'/>
  <path d='M150 0c-6 30 14 50 6 80s-30 50-20 90' fill='none' stroke='#e8e2d4' stroke-opacity='.13' stroke-width='.7'/>
  <path d='M260 60c-20 20-10 40-34 56M40 100c20 10 30 30 26 50' fill='none' stroke='#e8e2d4' stroke-opacity='.1' stroke-width='.6'/></svg>`);
// panel rim: white marble band, gold fillet, a mosaic square in each corner
const tess4 = (x, y) => `<rect x='${x}' y='${y}' width='4' height='4' fill='${LAPIS}'/><rect x='${x + 4.600}' y='${y}' width='4' height='4' fill='${GOLD}'/><rect x='${x}' y='${y + 4.600}' width='4' height='4' fill='${GOLD}'/><rect x='${x + 4.600}' y='${y + 4.600}' width='4' height='4' fill='#b9572c'/>`;
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#26221d' stroke-width='8'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#e9e4d9' stroke-width='5.500'/>
  <path d='M10 3c8 2 14-1 22 1s14 2 24-1M3 18c2 8-1 14 1 22M69 30c-2 8 1 14-1 22' fill='none' stroke='#8a8478' stroke-opacity='.6' stroke-width='.6'/>
  <path d='M1.800 70V1.800H70' fill='none' stroke='#fff' stroke-opacity='.7' stroke-width='1'/><rect x='8.500' y='8.500' width='55' height='55' fill='none' stroke='#d9a83a' stroke-width='1.300'/>
  <g stroke='#26221d' stroke-width='.6'><rect x='-.5' y='-.5' width='12' height='12' fill='#3b352c'/><rect x='60.500' y='-.5' width='12' height='12' fill='#3b352c'/><rect x='-.5' y='60.500' width='12' height='12' fill='#3b352c'/><rect x='60.500' y='60.500' width='12' height='12' fill='#3b352c'/></g>
  ${tess4(1.500, 1.500)}${tess4(62, 1.500)}${tess4(1.500, 62)}${tess4(62, 62)}</svg>`);
// mosaic strip for the panel tops: same running wave, small
const BAND = (() => { let s = ''; for (let c = 0; c < 10; c++) { const w = 1 + Math.round(Math.sin(c * Math.PI / 5));
  for (let r = 0; r < 3; r++) s += `<rect x='${(c * 3.6).toFixed(1)}' y='${(2 + r * 3.4).toFixed(1)}' width='3' height='2.800' fill='${r < w ? LAPIS : r === w ? GOLD : CREAM}'/>`; }
  return svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='36' height='13'><rect width='36' height='13' fill='#3b352c'/><rect width='36' height='1.600' fill='#e6b43c'/>${s}<rect y='12' width='36' height='1' fill='#e6b43c'/></svg>`); })();
const TILES = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='22' height='10'><path d='M11 10L5 3a2 2 0 0 1 4 0a2 2 0 0 1 4 0a2 2 0 0 1 4 0z' fill='#c0602f' stroke='#5a2410' stroke-width='.8'/><path d='M11 9L7 3M11 9V2M11 9l4-6' stroke='#6d2a10' stroke-width='.7'/><circle cx='11' cy='8.500' r='1.100' fill='#f0c24a'/></svg>`);
const LEAVES = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='28' height='14'><path d='M7 0v3M21 0v2' stroke='#c99a3c' stroke-width='.8'/><path d='M7 3c3 3 3 7 0 11-3-4-3-8 0-11z' fill='#e6b43c' stroke='#8a5a12' stroke-width='.5'/><path d='M7 5v7' stroke='#fff3b0' stroke-width='.5'/><path d='M21 2c2.200 2.200 2.200 5.500 0 8-2.200-2.500-2.200-5.800 0-8z' fill='#b9572c' stroke='#5a2410' stroke-width='.5'/></svg>`);

const css = `
#stage[data-kit=med] .dplate{color:#f6efdd;text-shadow:0 1px 0 #000;border:1px solid #e6b43c;outline:1px solid #26221d;border-radius:1px;
  background:${PORTORO},linear-gradient(180deg,#2a2621,#0f0e0c);background-size:320px 220px,auto;box-shadow:inset 0 1px 0 #fff3b066,inset 0 -3px 0 #0009,0 6px 10px #000a}
#stage[data-kit=med] .dplate::before{content:'';position:absolute;left:0;right:0;top:-5px;height:5px;background:${BAND} 0 0/auto 5px repeat-x;border-top:1px solid #e6b43c}
#stage[data-kit=med] .dplate b{font-family:Cinzel,serif;font-weight:900;font-size:17px;letter-spacing:.06em}
#stage[data-kit=med] .dplate span{font-family:Cinzel,serif;font-weight:700;font-size:18px;letter-spacing:.03em;color:var(--civ);text-shadow:0 0 10px color-mix(in srgb,var(--civ) 55%,transparent),0 1px 0 #000}

#stage[data-kit=med] .dframe .mfil{fill:none;stroke:#e6b43c;stroke-width:1.600;opacity:.95}
#stage[data-kit=med] .dframe .mfil2{fill:none;stroke:var(--civ);stroke-width:1;stroke-dasharray:3 1.200;opacity:.85;filter:drop-shadow(0 0 3px color-mix(in srgb,var(--civ) 70%,transparent))}
/* tesserae catch the light one by one; a slow sheen runs along the frieze */
#stage[data-kit=med] .dframe .mgl{opacity:0;animation:mTw 3.400s calc(var(--i)*-.53s) ease-in-out infinite}
@keyframes mTw{0%,74%,100%{opacity:0}84%{opacity:1}}
#stage[data-kit=med] .dframe .msh{animation:mSheen 6.500s linear infinite}
@keyframes mSheen{0%{transform:translateX(0)}70%,100%{transform:translateX(600px)}}
#stage[data-kit=med] .dframe .mspk,#stage[data-kit=med] .dframe .mglr{transform-box:fill-box;transform-origin:center;animation:mSpk 4.200s ease-in-out infinite}
#stage[data-kit=med] .dframe .mglr{animation-delay:-2s}
@keyframes mSpk{0%,70%,100%{opacity:.15;transform:scale(.6)}82%{opacity:1;transform:scale(1.600)}}
/* warm southern sun on the camera picture, light dappling across the top */
#stage[data-kit=med] .dshade{overflow:hidden;box-shadow:inset 0 0 46px rgba(0,0,0,.55),inset 0 16px 20px -12px rgba(255,214,140,.4)}
#stage[data-kit=med] .dshade::before{content:'';position:absolute;inset:-10px -40px;animation:mSun 7s ease-in-out infinite alternate;
  background:radial-gradient(170px 70px at 22% 0,rgba(255,214,140,.34),transparent 70%),radial-gradient(130px 60px at 72% 0,rgba(255,230,170,.24),transparent 70%),radial-gradient(200px 120px at 0 100%,rgba(255,170,90,.18),transparent 70%)}
@keyframes mSun{from{transform:translateX(-24px);opacity:.75}to{transform:translateX(24px);opacity:1}}

/* panels: nero portoro marble with gold veins, white marble rim with mosaic corners, mosaic band and roof tiles on top, gold leaves below */
#stage.skinned[data-kit=med] .pn.kd:not(.mu){
  background:${PORTORO},linear-gradient(180deg,rgba(40,36,31,.95),rgba(14,13,11,.96));background-size:320px 220px,auto;
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,.9),inset 0 0 36px rgba(0,0,0,.55)}
#stage.skinned[data-kit=med] .pn.kd::after{inset:-7px;opacity:1;background:none;border:22px solid transparent;border-image:${EDGE} 22 / 22px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=med] .pn.kd>.kd-t{height:21px;margin:0 8px -6px;background:${BAND} 0 100% repeat-x,${TILES} 3px 0 repeat-x;overflow:hidden}
#stage.skinned[data-kit=med] .pn.kd>.kd-t::after{content:'';position:absolute;left:0;right:0;bottom:0;height:13px;
  background:linear-gradient(100deg,transparent 42%,rgba(255,250,220,.8) 50%,transparent 58%) no-repeat;background-size:300% 100%;animation:mPan 5.500s linear infinite}
@keyframes mPan{from{background-position:120% 0}to{background-position:-20% 0}}
#stage.skinned[data-kit=med] .pn.kd>.kd-b{height:14px;margin:1px 24px 0;background:${LEAVES} 0 0 repeat-x;transform-origin:50% 0;animation:fin .8s .15s both,mLeaf 3.100s ease-in-out infinite alternate}
@keyframes mLeaf{from{transform:skewX(-4deg)}to{transform:skewX(4deg)}}
#stage.skinned[data-kit=med] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}

/* gold-leaf flakes turning in the sun, a few motes; the burst throws tesserae */
#stage[data-kit=med] .p.leaf{width:var(--s);height:calc(var(--s)*.8);background:linear-gradient(135deg,#fff6c4,#e8b43c 40%,#9a6a14 70%,#f6d873);
  clip-path:polygon(10% 20%,60% 0,100% 35%,85% 90%,30% 100%,0 60%);animation:mFall var(--dur) var(--del) linear infinite,mFlip calc(1.400s + var(--k)*1.800s) linear infinite}
@keyframes mFall{0%{transform:translate3d(0,-150px,0);opacity:0}12%{opacity:calc(.5 + var(--k)*.5)}85%{opacity:calc(.5 + var(--k)*.5)}100%{transform:translate3d(calc(var(--j)*90px),400px,0);opacity:0}}
@keyframes mFlip{from{rotate:1 .4 .2 0deg}to{rotate:1 .4 .2 360deg}}
#stage[data-kit=med] .p.mote{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fffbe8,rgba(255,214,140,.6) 45%,transparent 70%);
  animation:mDrift var(--dur) var(--del) ease-in-out infinite}
@keyframes mDrift{0%{transform:translate3d(0,40px,0);opacity:0}25%{opacity:calc(.4 + var(--k)*.6)}75%{opacity:calc(.3 + var(--k)*.5)}100%{transform:translate3d(calc(var(--j)*60px),-120px,0);opacity:0}}
#stage[data-kit=med] .p.tb{width:var(--s);height:var(--s);background:${LAPIS};box-shadow:inset 0 0 0 1px #0004,inset 1px 1px 0 #fff6;animation:mBurst 1.500s var(--del) cubic-bezier(.15,.7,.3,1) both}
#stage[data-kit=med] .p.tb:nth-child(4n){background:var(--civ)}#stage[data-kit=med] .p.tb:nth-child(4n+1){background:${GOLD}}#stage[data-kit=med] .p.tb:nth-child(4n+2){background:${CREAM}}
@keyframes mBurst{0%{transform:rotate(calc(var(--k)*360deg)) translateY(0) rotate(0) scale(.3);opacity:0}15%{opacity:1}100%{transform:rotate(calc(var(--k)*360deg + var(--j)*60deg)) translateY(calc(-240px - var(--k)*320px)) rotate(calc(var(--j)*540deg)) scale(1);opacity:0}}
`;

export default {
  id: 'med',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&display=swap',
  frame, css,
  mount: { x: 402, y: -142 }, // the civ's standard: pole axis = x 60 of the standard, crossbar/attach point = y 30
  perch: 14, // hands on the roof tiles
  particles: [{ cls: 'leaf', n: 24, zone: 'sides', size: [5, 9], dur: [8, 14] }, { cls: 'mote', n: 10, zone: [0, 420, 640, 460], size: [3, 6], dur: [6, 11] }],
  burst: [{ cls: 'tb', n: 44, zone: [170, 610, 110, 80], size: [5, 9], dur: [1, 1], spread: .55 }],
};
