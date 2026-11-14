// CIV layer: Magyars (kit: central). Sky accent, saddle-leather cloth, silver metal. Standard: a sabretache (tarsoly)
// with a silver palmette plate hung on the pole by straps, tassels below, a strung recurve bow beside it. Frame: a
// leather belt with silver palmette mounts along the top beam and a bundle of arrows behind the bottom-left pinnacle.
// Mascot: crested leather cap with a feather and braided locks. All drawings are our own (generic palmette scrollwork).

// palmette: a fan of five lobes on a scrolled base, around (0,0), ~ 24 x 22
const PALM = `
  <path d="M0 8C-2 2-2-4 0-11C2-4 2 2 0 8Z"/>
  <path d="M-1 7C-5 2-7-3-6-9C-3-4-1 1-1 7ZM1 7C5 2 7-3 6-9C3-4 1 1 1 7Z"/>
  <path d="M-2 8C-8 5-11 0-11-5C-7-1-4 3-2 8ZM2 8C8 5 11 0 11-5C7-1 4 3 2 8Z"/>
  <path d="M-9 10C-6 7-2 8 0 10C2 8 6 7 9 10" fill="none" stroke-width="1.400"/>
  <path d="M-9 10c-3 0-4-3-2-4M9 10c3 0 4-3 2-4" fill="none" stroke-width="1.100"/>`;

const standard = `<svg width="130" height="220" viewBox="0 0 130 220">
  <defs>
    <linearGradient id="magSil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f8fb"/><stop offset=".45" stop-color="#aab6c0"/><stop offset=".7" stop-color="#e2e9ef"/><stop offset="1" stop-color="#6a7680"/></linearGradient>
    <clipPath id="magPlC"><path d="M6 44H58V92C58 110 46 118 32 118C18 118 6 110 6 92Z"/></clipPath>
  </defs>
  <g class="pc" style="--sc:.2;--r:20deg;--dy:40px;--d:1.200"><g class="mbow">
    <path d="M76 14C66 22 64 32 78 46C90 62 90 104 78 120C64 134 66 144 76 152" fill="none" stroke="#2a1608" stroke-width="5.200" stroke-linecap="round"/>
    <path d="M76 14C66 22 64 32 78 46C90 62 90 104 78 120C64 134 66 144 76 152" fill="none" stroke="#a8703a" stroke-width="2.600" stroke-linecap="round"/>
    <path d="M84 70v24" stroke="#e2e9ef" stroke-width="3.400"/><path d="M84 72v20" stroke="#2a1608" stroke-width="1" stroke-dasharray="1.500 1.500"/>
    <path d="M76 14L76 152" stroke="#efe6cf" stroke-width=".9"/>
    <path d="M30 12L76 14" stroke="#5a3a20" stroke-width="1.200"/>
  </g></g>
  <g class="unroll" style="--d:1.300"><g class="mtars">
    <path d="M30 10L10 44M30 10L54 44" stroke="var(--civ3)" stroke-width="3.400" stroke-linecap="round"/>
    <circle cx="30" cy="10" r="4.600" fill="none" stroke="url(#magSil)" stroke-width="2.200"/>
    <path d="M4 40H60V94C60 114 46 122 32 122C18 122 4 114 4 94Z" fill="var(--civ3)" stroke="#2a1206" stroke-width="1.200"/>
    <path d="M6 44H58V92C58 110 46 118 32 118C18 118 6 110 6 92Z" fill="url(#magSil)" stroke="#3a4650" stroke-width="1"/>
    <g clip-path="url(#magPlC)">
      <g transform="translate(32 76) scale(1.600)" fill="#c8d2da" stroke="#3a4650" stroke-width=".7">${PALM}</g>
      <g transform="translate(17 54) scale(.7)" fill="#c8d2da" stroke="#3a4650" stroke-width=".7">${PALM}</g>
      <g transform="translate(47 54) scale(.7)" fill="#c8d2da" stroke="#3a4650" stroke-width=".7">${PALM}</g>
      <path d="M12 104C20 96 26 104 32 98C38 104 44 96 52 104" fill="none" stroke="#3a4650" stroke-width="1.100"/>
      <rect class="msheen" x="-30" y="40" width="18" height="90" fill="#fff" opacity="0"/>
    </g>
    <path d="M8 46H56V91C56 108 45 115 32 115C19 115 8 108 8 91Z" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width=".7" stroke-dasharray="1 2"/>
    ${[[12, 50], [52, 50], [12, 92], [52, 92], [32, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.500" class="mgem"/>`).join('')}
    ${[18, 32, 46].map((x, i) => `<g class="mtas" style="--i:${i}"><path d="M${x} ${118 - Math.abs(x - 32) * .25}V${134 + i % 2 * 6}" stroke="var(--civ)" stroke-width="1.400"/><path d="M${x - 3} ${134 + i % 2 * 6}h6l2 16h-10z" fill="var(--civ2)" stroke="#0a3a56" stroke-width=".6"/><path d="M${x - 2} ${139 + i % 2 * 6}v10M${x} ${139 + i % 2 * 6}v11M${x + 2} ${139 + i % 2 * 6}v10" stroke="var(--civ)" stroke-width=".7"/></g>`).join('')}
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><linearGradient id="magSilP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f8fb"/><stop offset=".5" stop-color="#aab6c0"/><stop offset="1" stop-color="#6a7680"/></linearGradient></defs>
  <path d="M17 0L6 14M17 0L28 14" stroke="#7a3b1c" stroke-width="2.200" stroke-linecap="round"/>
  <g class="unroll" style="--d:1.600"><g class="mtars" style="animation-delay:-1.500s">
    <path d="M4 12H30V38C30 48 24 52 17 52C10 52 4 48 4 38Z" fill="url(#magSilP)" stroke="#3a4650" stroke-width="1"/>
    <g transform="translate(17 32) scale(.8)" fill="#c8d2da" stroke="#3a4650" stroke-width=".7">${PALM}</g>
    <path d="M17 52V58" stroke="var(--civ)" stroke-width="1.200"/><path d="M14 58h6l2 14h-10z" fill="var(--civ2)" stroke="#0a3a56" stroke-width=".6"/>
  </g></g>
</svg>`;

// leather belt with silver palmette mounts on the top beam; arrows fanned behind the bottom-left pinnacle
const arrows = () => [-10, 4, 18, 32, 46].map((a, i) => `<g transform="translate(18 -12) rotate(${a})"><path d="M0 0V-${78 + i % 2 * 6}" stroke="#b9925a" stroke-width="1.600"/>
  <path d="M0 -${78 + i % 2 * 6}l-2.600 6h5.200z" fill="#c8d2da" stroke="#3a4650" stroke-width=".5"/>
  <path d="M0 -4l-3.400 -2v-10l3.400 2zM0 -4l3.400 -2v-10l-3.400 2z" fill="${i % 2 ? '#f4efe2' : 'var(--civ)'}" stroke="#2a1608" stroke-width=".4"/></g>`).join('');
const frame = `
<defs><linearGradient id="magSilF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f8fb"/><stop offset=".5" stop-color="#aab6c0"/><stop offset="1" stop-color="#6a7680"/></linearGradient></defs>
<g class="pc" style="--dx:-120px;--d:1.050;--o:0">
  <rect x="80" y="-14" width="180" height="11" rx="2" fill="var(--civ3)" stroke="#2a1206" stroke-width="1"/>
  <path d="M82 -12.500H258M82 -4.500H258" stroke="#c99a62" stroke-width=".7" stroke-dasharray="3 2" opacity=".8"/>
  ${[94, 120, 146, 172, 198, 224, 250].map((x) => `<g transform="translate(${x} -8.500) scale(.42)" fill="url(#magSilF)" stroke="#3a4650" stroke-width="1.400"><rect x="-13" y="-13" width="26" height="26" rx="5"/>${PALM}</g>`).join('')}
  <path d="M260 -12h6v7h-6z" fill="url(#magSilF)" stroke="#3a4650" stroke-width=".7"/>
  <rect class="mglint" x="80" y="-15" width="12" height="13" fill="#fff" opacity="0"/>
</g>
<g class="fin" style="--d:1.800"><g class="mstrap"><path d="M262 -4C264 2 262 7 264 11" stroke="var(--civ3)" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M260 11h8l-1 7h-6z" fill="url(#magSilF)" stroke="#3a4650" stroke-width=".7"/></g></g>
<g class="pc" style="--dy:-60px;--r:-20deg;--d:.95;--o:0"><g class="marrows">${arrows()}</g><path d="M12 -26l14 3" stroke="var(--civ3)" stroke-width="3.400" stroke-linecap="round"/></g>`;

// a braided lock: short dark plait with a silver bead
const lock = (x, dir) => { let s = ''; for (let y = 48, i = 0; y < 72; y += 4.500, i++) s += `<ellipse cx="${(x + (i % 2 ? 1.100 : -1.100) * dir).toFixed(1)}" cy="${y}" rx="2.900" ry="3.100" fill="#6b4226" stroke="#1a0e06" stroke-width=".7"/><path d="M${(x - 1.500).toFixed(1)} ${y - 1.500}q1.500 -1 3 0" fill="none" stroke="#c8925a" stroke-width=".7"/>`;
  return `${s}<circle cx="${x}" cy="75" r="2.600" fill="#d9e1e8" stroke="#3a4650" stroke-width=".6"/><path d="M${x - 1} 77l-1 5M${x + 1} 77l1 5" stroke="#6b4226" stroke-width="1.400" stroke-linecap="round"/>`; };
const costume = {
  back: `<g class="mfeather"><path d="M92 30C98 16 104 4 116-6C110 8 104 20 96 32Z" fill="#f4efe2" stroke="#6a625c" stroke-width=".7"/>
    <path d="M94 31C100 18 106 8 114-3" fill="none" stroke="#6a625c" stroke-width=".7"/><path d="M110 0l3 1M107 5l3 1M104 10l3 1" stroke="var(--civ)" stroke-width="1.400" stroke-linecap="round"/></g>`,
  front: `
  <g class="mlock l">${lock(42, -1)}</g><g class="mlock r">${lock(98, 1)}</g>
  <path d="M46 46C45 28 56 17 70 17C84 17 95 28 94 46Z" fill="var(--civ3)" stroke="#24120a" stroke-width="1.200"/>
  <path d="M65 26C62 14 64 4 72 -2C70 6 74 10 78 12C76 16 76 22 75 26Z" fill="#4a2410" stroke="#140804" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M68 24C66 14 67 7 71 2" fill="none" stroke="#c99a62" stroke-width=".9" stroke-dasharray="2 1.600"/>
  ${[[67, 22], [68, 15], [70, 8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.200" fill="#d9e1e8"/>`).join('')}
  <path d="M56 22c-4 6-6 14-6 22M84 22c4 6 6 14 6 22" fill="none" stroke="#c99a62" stroke-width=".8" stroke-dasharray="2 2"/>
  <path d="M54 24c3-4 7-6 11-6" fill="none" stroke="#c48a58" stroke-width="1.300" stroke-linecap="round" opacity=".7"/>
  <path d="M42 50C42 44 48 41 70 41S98 44 98 50C90 47 50 47 42 50Z" fill="#4a2410" stroke="#24120a" stroke-width="1.100"/>
  ${[50, 60, 80, 90].map((x) => `<circle cx="${x}" cy="45.500" r="1.400" fill="#d9e1e8" stroke="#3a4650" stroke-width=".5"/>`).join('')}
  <g transform="translate(70 45) scale(.32)" fill="#d9e1e8" stroke="#3a4650" stroke-width="1.600">${PALM}</g>`,
};

const css = `
#stage[data-civ=magyars] .gob.dressed .tuft{opacity:0}
#stage[data-civ=magyars] .mtars{transform-box:fill-box;transform-origin:50% 0;animation:mTars 4.200s ease-in-out infinite alternate}
@keyframes mTars{from{transform:rotate(-2.500deg)}to{transform:rotate(2.500deg)}}
#stage[data-civ=magyars] .mbow{transform-box:view-box;transform-origin:30px 12px;animation:mBow 5.200s -1s ease-in-out infinite alternate}
@keyframes mBow{from{transform:rotate(-1.800deg)}to{transform:rotate(1.500deg)}}
#stage[data-civ=magyars] .mtas{transform-box:fill-box;transform-origin:50% 0;animation:mTas calc(1.400s + var(--i)*.3s) calc(var(--i)*-.4s) ease-in-out infinite alternate}
@keyframes mTas{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
#stage[data-civ=magyars] .mgem{fill:var(--civ);stroke:#0a3a56;stroke-width:.5;filter:drop-shadow(0 0 2px var(--civ));animation:mGem 2.800s ease-in-out infinite}
@keyframes mGem{50%{opacity:.55}}
#stage[data-civ=magyars] .msheen{animation:mSheen 4.600s ease-in-out infinite}
@keyframes mSheen{0%,55%{transform:translateX(0) skewX(-20deg);opacity:0}65%{opacity:.6}90%,100%{transform:translateX(110px) skewX(-20deg);opacity:0}}
#stage[data-civ=magyars] .mglint{animation:mGlint 5s ease-in-out infinite}
@keyframes mGlint{0%,60%{transform:translateX(0) skewX(-20deg);opacity:0}70%{opacity:.55}95%,100%{transform:translateX(170px) skewX(-20deg);opacity:0}}
#stage[data-civ=magyars] .mstrap{transform-box:fill-box;transform-origin:50% 0;animation:mTas 2.400s ease-in-out infinite alternate}
#stage[data-civ=magyars] .marrows{transform-box:fill-box;transform-origin:0 100%;animation:mBow 4s ease-in-out infinite alternate}
#stage[data-civ=magyars] .mlock{transform-box:fill-box;transform-origin:50% 0;animation:mLock 3.300s ease-in-out infinite alternate}
#stage[data-civ=magyars] .mlock.r{animation-delay:-1.600s}
@keyframes mLock{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
#stage[data-civ=magyars] .mfeather{transform-box:fill-box;transform-origin:0 100%;animation:mFeat 2.900s ease-in-out infinite alternate}
@keyframes mFeat{from{transform:rotate(-5deg)}to{transform:rotate(6deg)}}
`;

export default {
  id: 'magyars', name: 'Magyars', kit: 'central',
  accent: '#59d6ff', accent2: '#1f84b8', cloth: '#7a3b1c', metal: '#d9e1e8',
  standard, pennant, costume, css, frame,
};
