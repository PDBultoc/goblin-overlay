// KIT: Caucasus (Armenians, Georgians). Hand-knotted wool carpet, a timber loom, rose-pink tufa stone, mountain wind.
// The camera sits INSIDE a carpet on its loom: a knotted border with bold stepped medallions all round the picture,
// a heavy loom beam across the top (the mascot sits on it) and the bottom with the warp threads showing, a tassel
// fringe swaying under the bottom beam, tufa stone posts holding the loom. A tufa-footed pole on the right carries
// the civ's standard. Motifs are generic knotted-pile geometry (stepped lozenges, S-hooks, zigzags) drawn by us.
// No crosses, no church or state symbols anywhere.

const f = (v) => +v.toFixed(2);
let seed = 31; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// knotted look: every motif is built from rows of knots (s = knot size), never from smooth curves
const lz = (cx, cy, n, s, fill, cls = '') => { let d = '';
  for (let i = -n; i <= n; i++) { const w = (n - Math.abs(i)) * 2 * s + s; d += `M${f(cx - w / 2)} ${f(cy + i * s - s / 2)}h${f(w)}v${f(s)}h${f(-w)}z`; }
  return `<path d="${d}" fill="${fill}"${cls ? ` class="${cls}"` : ''}/>`; };
// a bold medallion: indigo stepped lozenge, ivory ring, madder ring, civ-coloured heart, hooks at the four tips
const med = (cx, cy, s, i) => `${lz(cx, cy, 5, s, '#1d2a55')}${lz(cx, cy, 4, s, '#efe2c4')}${lz(cx, cy, 3, s, '#7d1a1c')}${lz(cx, cy, 2, s, '#e0a63e')}${lz(cx, cy, 1, s, 'var(--civ)', 'ccc')}`.replace(/class="ccc"/, `class="ccc" style="--i:${i}"`);
// one border band of the carpet: madder ground, barber-pole guard stripes, alternating indigo and ochre lozenges
function band(x, y, w, h, vertical) {
  const len = vertical ? h : w, mid = vertical ? x + w / 2 : y + h / 2;
  let motifs = '', k = 0;
  for (let t = 16; t <= len - 14; t += 13, k++) {
    const cx = vertical ? mid : x + t, cy = vertical ? y + t : mid;
    motifs += k % 2 ? `${lz(cx, cy, 1, 1.5, '#e0a63e')}${lz(cx, cy, 0, 1.5, '#7d1a1c')}` :`${lz(cx, cy, 3, 1.55, '#1d2a55')}${lz(cx, cy, 2, 1.55, '#efe2c4')}${lz(cx, cy, 0, 1.55, 'var(--civ)')}`;
  }
  const g1 = vertical ? `M${x + 2.2} ${y}v${h}M${x + w - 2.2} ${y}v${h}` : `M${x} ${y + 2.2}h${w}M${x} ${y + h - 2.2}h${w}`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7d1a1c"/>
    <path d="${g1}" stroke="#1d2a55" stroke-width="4.4"/><path d="${g1}" stroke="#efe2c4" stroke-width="1.6" stroke-dasharray="2.2 2.2"/>
    ${motifs}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#ccKn)"/>`;
}

// warp threads between the carpet and a beam
const warp = (y0, y1) => { let d = ''; for (let x = -12; x <= 412; x += 3.4) d += `M${f(x)} ${y0}V${y1}`; return `<path d="${d}" stroke="#eadcbc" stroke-width=".9" opacity=".9"/>`; };

// a loom beam: a round log seen from the front, end grain at both ends, grain lines, rope lashings
const beam = (y, h) => `<rect x="-24" y="${y}" width="468" height="${h}" rx="${h / 2}" fill="url(#ccWood)" filter="url(#ccGrain)" stroke="#2a160a" stroke-width="1.1"/>
  <path d="M-16 ${y + 3}H436" stroke="#e2b37a" stroke-width="1.2" opacity=".55"/><path d="M-16 ${y + h - 2.5}H436" stroke="#000" stroke-width="1" opacity=".45"/>
  <ellipse cx="-17" cy="${y + h / 2}" rx="${h * .3}" ry="${h / 2 - 1}" fill="#a2703f" stroke="#2a160a"/><ellipse cx="-17" cy="${y + h / 2}" rx="${h * .14}" ry="${h / 4}" fill="none" stroke="#5a3418" stroke-width=".8"/>
  <ellipse cx="437" cy="${y + h / 2}" rx="${h * .3}" ry="${h / 2 - 1}" fill="#a2703f" stroke="#2a160a"/><ellipse cx="437" cy="${y + h / 2}" rx="${h * .14}" ry="${h / 4}" fill="none" stroke="#5a3418" stroke-width=".8"/>
  ${[2, 398].map((x) => `<path d="M${x} ${y - .5}l6 ${h + 1}M${x + 4} ${y - .5}l6 ${h + 1}M${x + 8} ${y - .5}l6 ${h + 1}" stroke="#d9c49a" stroke-width="2.2" stroke-linecap="round"/><path d="M${x} ${y - .5}l6 ${h + 1}M${x + 4} ${y - .5}l6 ${h + 1}M${x + 8} ${y - .5}l6 ${h + 1}" stroke="#6d5634" stroke-width=".6" stroke-dasharray="1.5 1.5"/>`).join('')}`;

// tufa stone block: rose-pink, porous, a chiselled edge line
const stone = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="url(#ccTufa)" filter="url(#ccPore)" stroke="#4a2526" stroke-width="1"/>
  <path d="M${x + 1.5} ${y + 1.5}h${w - 3}" stroke="#f6c9bd" stroke-width="1" opacity=".7"/><path d="M${x + 2} ${y + h - 1.5}h${w - 4}" stroke="#3a1a1b" opacity=".5"/>`;

// tassels under the bottom beam: groups of warp ends knotted into tassels, swaying in the wind
const tassels = () => { let s = ''; const cols = ['#7d1a1c', '#1d2a55', '#e0a63e', 'var(--civ)'];
  for (let i = 0, x = -14; x <= 434; x += 11.2, i++) { const L = 16 + r() * 7;
    s += `<g transform="translate(${f(x)} 262)"><g class="cct" style="--i:${i};--k:${r().toFixed(2)}">
      <path d="M-1.6 0C-2 ${f(L * .4)} -3 ${f(L * .7)} -3.6 ${f(L)}M0 0V${f(L + 1.5)}M1.6 0C2 ${f(L * .4)} 3 ${f(L * .7)} 3.6 ${f(L)}M-.8 0C-1 ${f(L * .5)} -1.6 ${f(L * .8)} -1.8 ${f(L + 1)}M.8 0C1 ${f(L * .5)} 1.6 ${f(L * .8)} 1.8 ${f(L + 1)}" stroke="#eadcbc" stroke-width="1" fill="none" stroke-linecap="round"/>
      <rect x="-2.8" y="2.5" width="5.6" height="3.6" rx="1.4" fill="${cols[i % 4]}" stroke="#1a0b06" stroke-width=".6"/></g></g>`; }
  return s; };

const frame = `
<defs>
  <linearGradient id="ccWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9b6a3c"/><stop offset=".35" stop-color="#7a4c26"/><stop offset=".75" stop-color="#4b2c14"/><stop offset="1" stop-color="#2a170a"/></linearGradient>
  <linearGradient id="ccPoleG" x1="0" x2="1"><stop offset="0" stop-color="#8a5c33"/><stop offset=".5" stop-color="#5e3a1c"/><stop offset="1" stop-color="#2a170a"/></linearGradient>
  <linearGradient id="ccTufa" x1="0" x2="1"><stop offset="0" stop-color="#e8aea2"/><stop offset=".45" stop-color="#c47f78"/><stop offset="1" stop-color="#7e4645"/></linearGradient>
  <filter id="ccGrain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".015 .55" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .05  0 0 0 0 0  0 0 0 -1.6 .75"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  <filter id="ccPore" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".42" numOctaves="2" seed="12"/><feColorMatrix values="0 0 0 0 .22  0 0 0 0 .08  0 0 0 0 .09  0 0 0 -5 2.45"/><feComposite in2="SourceAlpha" operator="in" result="g"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g"/></feMerge></filter>
  <pattern id="ccKn" width="3.1" height="3.1" patternUnits="userSpaceOnUse"><path d="M0 .2h3.1M.2 0v3.1" stroke="#000" stroke-opacity=".22" stroke-width=".7"/><path d="M.9 1.2h1.4" stroke="#fff" stroke-opacity=".1" stroke-width=".8"/></pattern>
  <linearGradient id="ccShine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff5e0" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <clipPath id="ccBands"><rect x="-15" y="-17" width="430" height="18"/><rect x="-15" y="224" width="430" height="18"/><rect x="-15" y="-17" width="18" height="259"/><rect x="397" y="-17" width="18" height="259"/></clipPath>
</defs>

<!-- tufa posts of the loom (behind the carpet) -->
<g class="pc" style="--dy:240px;--d:0;--o:.2">
  ${stone(-24, -30, 13, 282)}${stone(-24, -54, 22, 22)}${stone(-24, 248, 24, 26)}
  <path d="M-21 -50h16M-21 -36h16M-21 252h18M-21 268h18" stroke="#5a2c2c" stroke-width=".8" opacity=".6"/>
</g>
<g class="pc" style="--dy:240px;--d:.06;--o:.2">
  ${stone(412, -30, 18, 282)}${stone(406, -54, 32, 22)}${stone(404, 248, 36, 26)}
  <path d="M410 -50h24M410 -36h24M408 252h28M408 268h28" stroke="#5a2c2c" stroke-width=".8" opacity=".6"/>
  <path d="M419 -30v278M424 -30v278" stroke="#5a2c2c" stroke-width=".7" opacity=".35"/>
</g>

<!-- warp threads showing above and below the woven part -->
<g class="fin" style="--d:.5">${warp(-26, -16)}${warp(241, 251)}<rect x="-14" y="-21.5" width="428" height="2.6" rx="1.3" fill="#5e3a1c" stroke="#2a160a" stroke-width=".6"/></g>

<!-- the carpet border: four woven bands, then the four corner medallions -->
<g class="pc" style="--dx:-110px;--d:.18;--o:.12">${band(-15, -17, 18, 259, true)}</g>
<g class="pc" style="--dx:110px;--d:.24;--o:.12">${band(397, -17, 18, 259, true)}</g>
<g class="pc" style="--dy:-90px;--d:.3;--o:.1">${band(-15, -17, 430, 18, false)}</g>
<g class="pc" style="--dy:90px;--d:.36;--o:.1">${band(-15, 224, 430, 18, false)}</g>
<rect class="fin ccguard" style="--d:1.2" x="3.5" y="1.5" width="393" height="222"/>
<g class="fin" style="--d:1.4" clip-path="url(#ccBands)"><rect class="ccsheen" x="-140" y="-20" width="140" height="265" fill="url(#ccShine)"/></g>
${[[-6, -8, 2.7], [406, -8, 2.7], [-6, 233, 2.7], [406, 233, 2.7], [-6, 112, 2.3], [406, 112, 2.3], [140, -8, 2.3], [300, 233, 2.3]].map(([x, y, s], i) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:2.6;--r:${i % 2 ? 90 : -90}deg;--d:${(.5 + i * .06).toFixed(2)};--o:0">${med(0, 0, s, i)}</g></g>`).join('')}

<!-- the loom beams: top (the mascot sits on it) and bottom -->
<g class="pc" style="--dy:-130px;--d:.62;--o:.05">${beam(-42, 17)}</g>
<g class="pc" style="--dy:120px;--d:.68;--o:.05">${beam(249, 14)}</g>

<!-- the fringe: tassels hanging under the bottom beam, swaying -->
<g class="fin" style="--d:1.25"><g class="ccgust">${tassels()}</g></g>

<!-- beater comb hanging on the right post -->
<g class="pc" style="--dy:-60px;--r:30deg;--d:.95;--o:0"><g class="ccswing">
  <path d="M424 -30L421 116" stroke="#cdb48a" stroke-width="1.1" fill="none"/>
  <path d="M413 116h18l2 9h-22z" fill="#6a4122" stroke="#2a160a" stroke-width=".9"/>
  <path d="M414 125v14M417 125v14M420 125v14M423 125v14M426 125v14M429 125v14M432 125v14" stroke="#c9a46a" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M419 116c0-6 7-6 7 0" fill="none" stroke="#2a160a" stroke-width="1.2"/>
</g></g>

<!-- the standard's pole: wood on a stepped tufa footing, a bronze leaf point, a yard for the banner -->
<g class="pc" style="--dy:230px;--d:.78;--o:.05">
  <rect x="454" y="-98" width="8" height="340" rx="3" fill="url(#ccPoleG)"/><path d="M455.5 -96v336" stroke="#c89660" opacity=".5"/>
  <path d="M458 -124c6 7 6 16 0 26-6-10-6-19 0-26z" fill="var(--civm)" stroke="#4a3210" stroke-width="1"/><path d="M458 -120v20" stroke="#4a3210" stroke-width=".7" opacity=".6"/>
  <rect x="452" y="-100" width="12" height="5" rx="1.5" fill="var(--civm)" stroke="#4a3210" stroke-width=".8"/>
  <rect x="448" y="-90" width="104" height="6" rx="3" fill="url(#ccWood)" stroke="#2a160a" stroke-width=".8"/>
  <path d="M453 -91l5 8M456 -91l5 8M459 -91l5 8" stroke="#d9c49a" stroke-width="1.6" stroke-linecap="round"/>
  ${stone(442, 238, 32, 14)}${stone(434, 252, 48, 22)}
  <path d="M444 238v14M466 238v14M450 252v22M468 252v22" stroke="#5a2c2c" stroke-width=".7" opacity=".5"/>
  <g transform="translate(476 245)"><circle r="6.5" fill="#7d1a1c" stroke="#2a0a0a"/><path d="M-5-3c3 2 7 2 10 0M-6 1c4 2 8 2 12 0M-4 4c3 1 5 1 8 0" stroke="#c4454a" fill="none" stroke-width="1"/></g>
  <g transform="translate(468 247)"><circle r="5" fill="#1d2a55" stroke="#0a0f22"/><path d="M-4-2c3 2 5 2 8 0M-4 2c3 1 5 1 8 0" stroke="#4a5d9a" fill="none" stroke-width="1"/></g>
</g>
<!-- a hank of yarn tied under the yard, streaming in the mountain wind -->
<g class="fin" style="--d:1.6"><g transform="translate(459 -80)"><g class="ccrib">
  <path d="M0 0c10 3 18-3 30 2l2 5c-12-3-20 3-31 0z" fill="var(--civ)" stroke="#2a0a0a" stroke-width=".6"/>
  <path d="M0 4c8 6 16 1 24 8l-1 4c-8-6-16-1-23-6z" fill="#efe2c4" stroke="#2a0a0a" stroke-width=".6"/>
</g></g></g>
`;

const svgUrl = (s) => `url("data:image/svg+xml;utf8,${s.replace(/#/g, '%23').replace(/\n\s*/g, '')}")`;
// panel ground: a tiny knotted lattice of stepped lozenges in dark madder / indigo
const PILE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M11 2h2v2h2v2h2v2h2v2h2v4h-2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2H7v-2H5v-2H3v-4h2V8h2V6h2V4h2z' fill='none' stroke='%23000' stroke-opacity='.18' stroke-width='1'/><path d='M0 0h24M0 0v24' stroke='%23fff' stroke-opacity='.03'/></svg>`);
// panel border: knotted carpet border (guard stripes, zigzag band, stepped medallion corners)
const EDGE = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#2a0a0a' stroke-width='8.5'/><rect x='4' y='4' width='64' height='64' fill='none' stroke='#7d1a1c' stroke-width='6'/>
  <rect x='4' y='4' width='64' height='64' fill='none' stroke='#e0a63e' stroke-width='1.6' stroke-dasharray='2 2'/>
  <rect x='.8' y='.8' width='70.400' height='70.400' fill='none' stroke='#efe2c4' stroke-opacity='.7' stroke-width='1'/>
  <g fill='#1d2a55' stroke='#efe2c4' stroke-width='1'><path d='M10 0h2v2h2v2h2v2h2v2h2v4h-2v2h-2v2h-2v2h-2v2h-2v2h-2v-2H8v-2H6v-2H4v-2H2v-2H0V8h2V6h2V4h2V2h2V0z'/>
  <path d='M60 0h2v2h2v2h2v2h2v2h2v4h-2v2h-2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2h-2v-2h-2v-2h-2v-2h-2V8h2V6h2V4h2V2h2V0z' transform='translate(1 0)'/>
  <path d='M10 50h2v2h2v2h2v2h2v2h2v4h-2v2h-2v2h-2v2h-2v2h-2v2h-2v-2H8v-2H6v-2H4v-2H2v-2H0v-4h2v-2h2v-2h2v-2h2v-2h2z'/>
  <path d='M61 50h2v2h2v2h2v2h2v2h2v4h-2v2h-2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2h-2v-2h-2v-2h-2v-2h-2v-4h2v-2h2v-2h2v-2h2v-2h2z'/></g>
  <g fill='%23e0a63e'><rect x='9' y='9' width='4' height='4'/><rect x='59' y='9' width='4' height='4'/><rect x='9' y='59' width='4' height='4'/><rect x='59' y='59' width='4' height='4'/></g></svg>`).replace(/%2523/g, '%23');
// the panel's top ornament: a small loom beam with warp threads under it
const ROD = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='12' height='14'><path d='M2 7v7M6 7v7M10 7v7' stroke='#eadcbc' stroke-width='.9' opacity='.85'/></svg>`);
// the panel's bottom ornament: a tassel fringe
const fringe = (sd, cols) => { let s = sd, out = ''; const q = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 20; i++) { const x = 6 + i * 12, L = 10 + q() * 6;
    out += `<path d='M${x - 1.6} 0C${x - 2} ${f(L * .5)} ${x - 3} ${f(L * .8)} ${x - 3.4} ${f(L)}M${x} 0V${f(L + 1)}M${x + 1.6} 0C${x + 2} ${f(L * .5)} ${x + 3} ${f(L * .8)} ${x + 3.4} ${f(L)}' stroke='#eadcbc' stroke-width='1' fill='none' stroke-linecap='round'/><rect x='${x - 2.6}' y='1.5' width='5.2' height='3.4' rx='1.3' fill='${cols[i % cols.length]}'/>`; }
  return svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='20'>${out}</svg>`); };
const FRINGE = fringe(5, ['#7d1a1c', '#1d2a55', '#e0a63e']);

const css = `
#stage[data-kit=caucasus] .dplate{color:#f6ead2;text-shadow:0 1px 0 #2a0a0a;border-radius:1px;
  background:repeating-linear-gradient(90deg,transparent 0 3px,rgba(0,0,0,.12) 3px 3.6px),linear-gradient(180deg,#9b2a24,#7d1a1c 50%,#4e0f10);
  box-shadow:inset 0 0 0 2px #1d2a55,inset 0 0 0 3.5px #efe2c4,inset 0 0 0 5px #1d2a55,0 6px 12px #000b;padding-left:14px;padding-right:22px}
#stage[data-kit=caucasus] .dplate span{font-family:'Alegreya SC',serif;font-weight:800;font-size:21px;color:var(--civ);
  text-shadow:0 1px 0 #2a0a0a,0 0 10px color-mix(in srgb,var(--civ) 55%,transparent)}
#stage[data-kit=caucasus] .dplate::after{content:'';position:absolute;left:8px;right:8px;top:100%;height:7px;
  background:repeating-linear-gradient(90deg,#eadcbc 0 1px,transparent 1px 3.2px);-webkit-mask-image:linear-gradient(#000,transparent);mask-image:linear-gradient(#000,transparent)}

/* frame details */
#stage[data-kit=caucasus] .dframe .ccc{animation:ccGlow 5.5s calc(var(--i,0)*-1.3s) ease-in-out infinite}
@keyframes ccGlow{0%,100%{opacity:1}50%{opacity:.55}}
#stage[data-kit=caucasus] .dframe .ccguard{fill:none;stroke:var(--civ);stroke-width:1.4;stroke-dasharray:2.2 2.2;opacity:.75}
#stage[data-kit=caucasus] .dframe .ccsheen{animation:ccSheen 7.5s linear infinite}
@keyframes ccSheen{0%{transform:translateX(0)}70%,100%{transform:translateX(700px)}}
#stage[data-kit=caucasus] .dframe .cct{transform-box:fill-box;transform-origin:50% 0;
  animation:ccTas calc(1.900s + var(--k)*1.300s) calc(var(--i)*-.17s) ease-in-out infinite alternate}
@keyframes ccTas{from{transform:rotate(-9deg)}to{transform:rotate(12deg)}}
#stage[data-kit=caucasus] .dframe .ccgust{transform-box:fill-box;transform-origin:50% 0;animation:ccGust 7s ease-in-out infinite}
@keyframes ccGust{0%,58%,100%{transform:skewX(0)}70%{transform:skewX(-22deg)}84%{transform:skewX(-7deg)}}
#stage[data-kit=caucasus] .dframe .ccswing{transform-box:fill-box;transform-origin:50% 0;animation:ccSwing 4.200s ease-in-out infinite alternate}
@keyframes ccSwing{from{transform:rotate(-3deg)}to{transform:rotate(4deg)}}
#stage[data-kit=caucasus] .dframe .ccrib{transform-box:fill-box;transform-origin:0 30%;animation:ccRib .9s ease-in-out infinite alternate}
@keyframes ccRib{from{transform:skewY(-9deg) scaleX(.92)}to{transform:skewY(8deg) scaleX(1.06)}}
/* the picture sits deep in the weave: warm shade under the top beam, cool mountain light from the right */
#stage[data-kit=caucasus] .dshade{box-shadow:inset 0 0 40px rgba(20,4,4,.6),inset 0 18px 20px -12px rgba(0,0,0,.7);
  background:radial-gradient(220px 130px at 100% 0,rgba(210,230,255,.2),transparent 70%),radial-gradient(200px 120px at 0 100%,rgba(255,170,120,.18),transparent 70%)}

/* panels: knotted madder pile, carpet border with stepped medallion corners, a loom rod on top, a tassel fringe below */
#stage.skinned[data-kit=caucasus] .pn.kd:not(.mu){
  background:${PILE},linear-gradient(180deg,rgba(84,18,20,calc(var(--glass,.55)*1.35)),rgba(40,10,14,calc(var(--glass,.55)*1.38)));
  border-color:rgba(0,0,0,.7);box-shadow:0 22px 44px -18px rgba(0,0,0,calc(var(--glass,.55)*1.28)),inset 0 0 34px rgba(0,0,0,.55),inset 0 0 0 1px rgba(234,220,188,.12)}
#stage.skinned[data-kit=caucasus] .pn.kd::after{inset:-7px;opacity:1;background:none;border:20px solid transparent;border-image:${EDGE} 20 / 20px stretch;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
#stage.skinned[data-kit=caucasus] .pn.kd>.kd-t{height:15px;margin:0 2px -6px;
  background:linear-gradient(180deg,#9b6a3c,#7a4c26 40%,#3a210d) 0 0/100% 8px no-repeat,${ROD} 0 6px repeat-x;border-radius:4px 4px 0 0;filter:drop-shadow(0 2px 2px rgba(0,0,0,.6))}
#stage.skinned[data-kit=caucasus] .pn.kd>.kd-b{height:15px;margin:-4px 14px 0;overflow:hidden}
#stage.skinned[data-kit=caucasus] .pn.kd>.kd-b::before{content:'';position:absolute;inset:0;transform-origin:50% 0;background:${FRINGE} 0 0 repeat-x;
  animation:ccFr 2.400s ease-in-out infinite alternate}
@keyframes ccFr{from{transform:skewX(-10deg)}to{transform:skewX(12deg)}}
#stage.skinned[data-kit=caucasus] .pn.kd.slime{border-bottom-color:rgba(0,0,0,.7)}
#stage.skinned[data-kit=caucasus] .hd{border-bottom:1px solid rgba(0,0,0,.6);box-shadow:0 1px 0 rgba(234,220,188,.1)}

/* mountain wind: wool fluff and long streaks; the burst is a gust of loose yarn */
#stage[data-kit=caucasus] .p.fluff{width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(#fffaf0,rgba(255,246,230,.5) 45%,transparent 72%);
  animation:ccDrift var(--dur) var(--del) linear infinite,ccBob calc(1.600s + var(--k)*2s) ease-in-out infinite alternate}
@keyframes ccDrift{0%{transform:translate3d(220px,-30px,0);opacity:0}15%{opacity:calc(.35 + var(--k)*.55)}80%{opacity:calc(.35 + var(--k)*.55)}100%{transform:translate3d(-420px,calc(60px + var(--j)*60px),0);opacity:0}}
@keyframes ccBob{from{translate:0 -9px}to{translate:0 11px}}
#stage[data-kit=caucasus] .p.ccwind{width:calc(var(--s)*55);height:1.500px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(235,240,255,.5),transparent);
  animation:ccWind var(--dur) var(--del) cubic-bezier(.4,0,.6,1) infinite}
@keyframes ccWind{0%{transform:translate3d(500px,0,0) scaleX(.4);opacity:0}30%{opacity:.65}100%{transform:translate3d(-900px,calc(var(--j)*30px),0) scaleX(1.200);opacity:0}}
#stage[data-kit=caucasus] .p.yarn{width:calc(var(--s)*5);height:calc(var(--s)*.7);border-radius:3px;
  background:linear-gradient(90deg,transparent,hsl(calc(350deg + var(--k)*45deg) 70% 55%),#efe2c4);
  animation:ccYarn 1.400s var(--del) cubic-bezier(.3,0,.5,1) both}
@keyframes ccYarn{0%{transform:translate3d(1100px,-20px,0) rotate(calc(var(--j)*40deg));opacity:0}25%{opacity:.95}100%{transform:translate3d(-700px,calc(80px + var(--j)*120px),0) rotate(calc(var(--j)*-220deg));opacity:0}}
`;

export default {
  id: 'caucasus',
  fontUrl: 'https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@800&display=swap',
  frame, css,
  mount: { x: 458, y: -86 }, // top-left of the civ's standard: hangs from the yard on the pole
  perch: 16, // hands on the top loom beam (beam top = y -42)
  particles: [{ cls: 'fluff', n: 26, zone: 'sides', size: [3, 7], dur: [6, 11] }, { cls: 'ccwind', n: 6, zone: 'all', size: [3, 6], dur: [2.6, 5] }],
  burst: [{ cls: 'yarn', n: 44, zone: [-200, 60, 1100, 700], size: [2, 4], dur: [1, 1], spread: 1.1 }],
};
