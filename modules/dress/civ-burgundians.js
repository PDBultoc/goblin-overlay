// CIV layer: Burgundians (kit: feudal). Rose-wine accent, deep wine velvet, gold. A tall court banner lashed along the
// lance with a fire-steel striking sparks off a flint, velvet curtains tied back in the gate's top corners and small
// gold fire-steels hung from the parapet; a court chaperon with a long liripipe tail for the mascot. All drawings are our own.

// the fire-steel: a striking bar whose ends curl back into two loops; (0,0) = centre of the bar
const steel = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-15 4h30M-15 4c-8 0-10-8-6-12 4-4 10-1 9 4M15 4c8 0 10-8 6-12-4-4-10-1-9 4" fill="none" stroke="#3a2a0c" stroke-width="6" stroke-linecap="round"/>
  <path d="M-15 4h30M-15 4c-8 0-10-8-6-12 4-4 10-1 9 4M15 4c8 0 10-8 6-12-4-4-10-1-9 4" fill="none" stroke="var(--civm)" stroke-width="3.600" stroke-linecap="round"/>
  <path d="M-13 2.800h26" stroke="#fff6d6" stroke-width="1" stroke-linecap="round" opacity=".8"/></g>`;
const flint = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M-7 0l3-7 8-1 4 6-4 6-8 0z" fill="#8b8f96" stroke="#2a2e33" stroke-width="1"/>`;
const sparks = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${[[-14, -16, 1.6], [-6, -22, 2.2], [3, -19, 1.8], [11, -24, 1.4], [16, -13, 2], [-17, -6, 1.3], [7, -30, 1.2], [-2, -12, 1.5]].map(([sx, sy, r], i) =>
  `<path class="bspark" style="--i:${i}" d="M${sx} ${sy - r * 2}l${r * .5} ${r * 1.5} ${r * 1.5} ${r * .5}-${r * 1.5} ${r * .5}-${r * .5} ${r * 1.5}-${r * .5}-${r * 1.5}-${r * 1.5}-${r * .5} ${r * 1.5}-${r * .5}z" fill="${i % 3 ? '#ffd36a' : '#fff6d6'}"/>`).join('')}</g>`;

const BAN = 'M8 14H82V112L74 120L66 112L58 120L50 112L42 120L34 112L26 120L18 112L8 120Z';
const standard = `<svg width="92" height="132" viewBox="0 0 92 132"><g class="bunf"><g class="bwave">
  <defs><clipPath id="buBc"><path d="${BAN}"/></clipPath>
  <linearGradient id="buBs" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/><stop offset=".75" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>
  <g clip-path="url(#buBc)">
    <rect width="92" height="132" fill="var(--civ3)"/>
    <rect x="8" y="14" width="74" height="106" fill="none" stroke="var(--civ)" stroke-width="5"/><rect x="14" y="20" width="62" height="88" fill="none" stroke="var(--civm)" stroke-width="1" stroke-dasharray="3 2"/>
    ${sparks(45, 54, 1.450)}${steel(45, 66, 1.250)}${flint(45, 84, 1.500)}
    <rect class="bsheen" x="-92" width="276" height="132" fill="url(#buBs)"/>
  </g>
  <path d="${BAN}" fill="none" stroke="#2a0614" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M8 112L18 120L26 112L34 120L42 112L50 120L58 112L66 120L74 112L82 120" fill="none" stroke="var(--civm)" stroke-width="1.200"/>
</g></g>
<path d="M2 18h8M2 50h8M2 82h8M2 114h8" stroke="#2a2e33" stroke-width="3.400" stroke-linecap="round"/><path d="M2 17.200h8M2 49.200h8M2 81.200h8M2 113.200h8" stroke="#c9d1d8" stroke-width=".8" stroke-linecap="round"/>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="0" y="0" width="34" height="5" rx="2" fill="#5a3a1e" stroke="#1b130b" stroke-width=".8"/>
  <g class="unroll" style="--d:1.600"><g class="bsway">
  <defs><clipPath id="buQc"><path d="M2 4H32V56L27 62L22 56L17 62L12 56L7 62L2 56Z"/></clipPath></defs>
  <g clip-path="url(#buQc)"><rect width="34" height="70" fill="var(--civ3)"/><rect x="2" y="4" width="30" height="58" fill="none" stroke="var(--civ)" stroke-width="3"/>${sparks(17, 30, .55)}${steel(17, 34, .5)}${flint(17, 42, .6)}</g>
  <path d="M2 4H32V56L27 62L22 56L17 62L12 56L7 62L2 56Z" fill="none" stroke="#2a0614" stroke-width="1"/></g></g></svg>`;

// velvet curtains tied back in the two top corners of the gate opening
const curtain = (flip, d) => `<g transform="${flip ? 'translate(400 0) scale(-1 1)' : ''}"><g class="pc" style="--dy:-120px;--d:${d};--o:0"><g class="bcur">
  <path d="M-2 4H23C22 30 19 52 13 70C16 92 17 120 18 150H-2Z" fill="url(#buVel)" stroke="#1e0410" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M9 6C9 30 8 52 7 72M16 6C15 28 13 50 10 68M8 84C9 104 10 126 11 148" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="2"/>
  <path d="M13 6C12 28 11 50 9 70" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="1.400"/>
  <path d="M23 4C22 30 19 52 13 70C16 92 17 120 18 150" fill="none" stroke="var(--civm)" stroke-width="2"/>
  <path d="M-2 4H24v6H-2z" fill="var(--civm)" stroke="#5a3d10" stroke-width=".7"/>
</g>
  <path d="M-2 68C4 74 12 76 17 71" fill="none" stroke="var(--civm)" stroke-width="3" stroke-linecap="round"/>
  <g class="btas"><circle cx="17" cy="73" r="3" fill="var(--civm)" stroke="#5a3d10" stroke-width=".8"/><path d="M14.500 75.500h5l2 13h-9z" fill="var(--civm)" stroke="#5a3d10" stroke-width=".8"/>
  <path d="M16 76.500v11M18.500 76.500v11" stroke="#8a611c" stroke-width=".7"/><path d="M13.500 81h7" stroke="var(--civ)" stroke-width="1.300"/></g>
</g></g>`;
const badge = (x, d, i) => `<g class="pc" style="--dy:-40px;--sc:.2;--d:${d};--o:0"><g class="bbadge" style="--i:${i}">
  <path d="M${x} -28v5" stroke="var(--civm)" stroke-width="1.200" stroke-dasharray="1.500 1"/>${sparks(x, -16, .6)}${steel(x, -14, .6)}${flint(x, -6, .7)}</g></g>`;

const frame = `
<defs><linearGradient id="buVel" x1="0" x2="1"><stop offset="0" stop-color="color-mix(in srgb,var(--civ3) 60%,#000)"/><stop offset=".5" stop-color="var(--civ3)"/><stop offset="1" stop-color="color-mix(in srgb,var(--civ3) 70%,var(--civ))"/></linearGradient></defs>
${curtain(false, 1.000)}${curtain(true, 1.100)}
${badge(60, 1.250, 0)}${badge(136, 1.320, 1)}${badge(212, 1.390, 2)}
`;

const costume = {
  front: `
  <g class="bcomb"><path d="M48 32C44 22 48 12 56 8c-2 6 0 9 4 9-1-6 3-12 9-14-2 6 1 10 5 10 0-6 5-10 11-10-3 5-2 9 2 11 4-3 9-2 12 1-5 2-6 6-4 10 3 2 5 6 3 11z" fill="var(--civ)" stroke="#5c1230" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M56 12c2 8 2 14 0 20M68 6c1 8 0 16-2 24M83 6c-1 8-3 16-6 24M95 13c-3 6-6 12-10 18" fill="none" stroke="#5c1230" stroke-width="1" opacity=".55"/></g>
  <g class="btail"><path d="M95 34c10 4 14 14 13 26-1 12-3 22-1 34-3 2-6 2-8 0-1-12 0-22 0-32 0-9-4-16-9-20z" fill="var(--civ3)" stroke="#1e0410" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M99 40c4 6 5 14 4 24-1 9-1 18 0 26" fill="none" stroke="var(--civ)" stroke-width="1" opacity=".6"/><path d="M99 94h8" stroke="var(--civm)" stroke-width="2.200" stroke-linecap="round"/></g>
  <path d="M38 40c0-9 14-13 32-13s32 4 32 13-14 7-32 7-32 2-32-7z" fill="var(--civ3)" stroke="#1e0410" stroke-width="1.300"/>
  <path d="M44 34c6 4 6 10 2 14M54 30c6 5 6 12 2 17M66 28c6 5 6 13 2 19M78 28c6 5 6 13 2 19M90 30c6 5 6 12 2 17" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="2"/>
  <path d="M46 33c5 4 6 9 3 13M58 29c5 5 6 12 2 17M70 28c5 5 6 13 2 18M82 29c5 5 6 12 2 17" fill="none" stroke="var(--civ)" stroke-opacity=".55" stroke-width="1.200"/>
  <path d="M40 36c8-6 52-6 60 0" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1.400"/>
  <g transform="translate(70 40)">${steel(0, 0, .28)}</g>`,
};

const css = `
#stage[data-civ=burgundians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=burgundians] .bunf{transform-box:fill-box;transform-origin:0 0}
#stage[data-civ=burgundians] [data-mod=dress][data-phase=in] .bunf{animation:buUnf 1.100s 1.350s cubic-bezier(.3,1.4,.4,1) both}
#stage[data-civ=burgundians] [data-mod=dress][data-phase=out] .bunf{animation:buFurl .4s cubic-bezier(.6,0,.9,.4) both}
@keyframes buUnf{from{transform:scale(0,.2)}50%{transform:scale(1,.3)}to{transform:none}}
@keyframes buFurl{to{transform:scale(0,1)}}
#stage[data-civ=burgundians] .bwave{transform-box:fill-box;transform-origin:0 50%;animation:buWave 4.200s ease-in-out infinite}
@keyframes buWave{0%,100%{transform:skewY(-2.500deg) scaleX(.96)}50%{transform:skewY(3deg) scaleX(1.02)}}
#stage[data-civ=burgundians] .bsheen{animation:buSheen 3.400s linear infinite}
@keyframes buSheen{from{transform:translateX(0)}to{transform:translateX(92px)}}
#stage[data-civ=burgundians] .bspark{transform-box:fill-box;transform-origin:center;animation:buSpark 1.400s calc(var(--i)*-.37s) ease-in-out infinite}
@keyframes buSpark{0%,100%{opacity:.25;transform:scale(.5) rotate(0)}40%{opacity:1;transform:scale(1.250) rotate(40deg)}}
#stage[data-civ=burgundians] .bsway{transform-box:fill-box;transform-origin:50% 0;animation:buSway 5s ease-in-out infinite}
@keyframes buSway{0%,100%{transform:rotate(-1.800deg) skewX(2deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
#stage[data-civ=burgundians] .bcur{transform-box:fill-box;transform-origin:50% 0;animation:buCur 6s ease-in-out infinite}
@keyframes buCur{0%,100%{transform:skewX(0) scaleX(1)}50%{transform:skewX(-1.500deg) scaleX(1.025)}}
#stage[data-civ=burgundians] .btas{transform-box:fill-box;transform-origin:50% 0;animation:buTas 2.600s ease-in-out infinite alternate}
@keyframes buTas{from{transform:rotate(-7deg)}to{transform:rotate(7deg)}}
#stage[data-civ=burgundians] .bbadge{transform-box:fill-box;transform-origin:50% 0;animation:buTas calc(2.800s + var(--i)*.35s) calc(var(--i)*-.8s) ease-in-out infinite alternate}
#stage[data-civ=burgundians] .btail{transform-box:fill-box;transform-origin:20% 0;animation:buTail 3.600s ease-in-out infinite}
@keyframes buTail{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}
#stage[data-civ=burgundians] .bcomb{transform-box:fill-box;transform-origin:50% 100%;animation:buComb 4s ease-in-out infinite}
@keyframes buComb{0%,100%{transform:skewX(-3deg)}50%{transform:skewX(4deg)}}
`;

export default {
  id: 'burgundians', name: 'Burgundians', kit: 'feudal',
  accent: '#ff7aa8', accent2: '#c23f6f', cloth: '#5a1730', metal: '#e9c46a',
  standard, pennant, costume, css, frame,
};
