// CIV layer: Bohemians (kit: central). Red accent, slate-blue cloth. Standard: a big painted pavise on the pole with a
// war flail swinging from it. Frame: wagon-fort chains on the top beam and a hand cannon leaning on the left post,
// smoking. Mascot: a brimmed iron kettle hat with a painted band. All drawings are our own; the pavise paint is
// plain geometry (chevrons, border), not a coat of arms.

const PAVISE = 'M6 18Q34 4 62 18V112Q34 126 6 112Z';
const standard = `<svg width="130" height="220" viewBox="0 0 130 220">
  <defs>
    <clipPath id="bohPavC"><path d="${PAVISE}"/></clipPath>
    <linearGradient id="bohPavS" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".45" stop-color="#fff" stop-opacity=".12"/><stop offset=".55" stop-color="#000" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
    <linearGradient id="bohIron" x1="0" x2="1"><stop offset="0" stop-color="#3c434a"/><stop offset=".45" stop-color="#c3ccd3"/><stop offset="1" stop-color="#2a2e32"/></linearGradient>
  </defs>
  <g class="fin" style="--d:1.900"><g class="bstream"><path d="M30 128C44 134 54 128 66 138L64 146C52 138 42 144 31 138Z" fill="var(--civ)" stroke="#4a0a06" stroke-width=".8"/>
    <path d="M30 134C40 142 48 140 56 150L52 156C46 148 38 148 30 142Z" fill="#f2e8d4" stroke="#4a0a06" stroke-width=".8"/></g></g>
  <g class="fin" style="--d:2"><g class="bflail">
    <path d="M36 122L92 150" stroke="#5a3a20" stroke-width="4.200" stroke-linecap="round"/><path d="M36 121L92 149" stroke="#a87c4a" stroke-width="1.200" stroke-linecap="round" opacity=".7"/>
    <rect x="86" y="144" width="9" height="8" rx="2" fill="url(#bohIron)" stroke="#14181b" stroke-width=".7" transform="rotate(27 90.500 148)"/>
    <g class="bswing">
      <path d="M92 152v4M92 158v4M92 164v4" stroke="#8d969d" stroke-width="2.200" stroke-linecap="round"/>
      <rect x="88" y="168" width="8" height="34" rx="3" fill="#6b4a2c" stroke="#24150a" stroke-width="1"/>
      <path d="M88 174h8M88 186h8M88 198h8" stroke="#2a2e32" stroke-width="2.200"/>
      ${[172, 180, 188, 196].map((y, i) => `<path d="M${i % 2 ? 96 : 88} ${y}l${i % 2 ? 4 : -4} 2l${i % 2 ? -4 : 4} 2" fill="#c3ccd3" stroke="#14181b" stroke-width=".5"/>`).join('')}
    </g>
  </g></g>
  <g class="pc" style="--sc:.2;--r:-25deg;--dy:40px;--d:1.150"><g class="bpav">
    <path d="${PAVISE}" fill="#14181b" transform="translate(2 3)" opacity=".5"/>
    <g clip-path="url(#bohPavC)">
      <rect x="0" y="0" width="70" height="130" fill="var(--civ2)"/>
      <path d="M6 30L34 14L62 30V44L34 28L6 44ZM6 62L34 46L62 62V76L34 60L6 76ZM6 94L34 78L62 94V108L34 92L6 108Z" fill="#f2e8d4"/>
      <rect x="31" y="0" width="6" height="130" fill="#3a2a1a"/><path d="M32 0V130" stroke="#8a6a44" stroke-width=".8"/>
      <rect class="bsheen" x="-40" y="0" width="30" height="130" fill="#fff" opacity="0"/>
      <rect x="0" y="0" width="70" height="130" fill="url(#bohPavS)"/>
    </g>
    <path d="${PAVISE}" fill="none" stroke="#1a1d20" stroke-width="4.400"/><path d="${PAVISE}" fill="none" stroke="#9aa4ae" stroke-width="1.600"/>
    ${[[10, 20], [58, 20], [10, 110], [58, 110], [6, 65], [62, 65]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.900" fill="#c3ccd3" stroke="#14181b" stroke-width=".5"/>`).join('')}
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><clipPath id="bohPenC"><path d="M4 8Q17 1 30 8V54Q17 61 4 54Z"/></clipPath></defs>
  <path d="M17 0V6" stroke="#8d969d" stroke-width="2"/>
  <g class="unroll" style="--d:1.600"><g class="bpav">
    <g clip-path="url(#bohPenC)"><rect width="34" height="62" fill="var(--civ2)"/><path d="M4 18L17 10L30 18V25L17 17L4 25ZM4 36L17 28L30 36V43L17 35L4 43Z" fill="#f2e8d4"/><rect x="15.500" width="3" height="62" fill="#3a2a1a"/></g>
    <path d="M4 8Q17 1 30 8V54Q17 61 4 54Z" fill="none" stroke="#1a1d20" stroke-width="2.400"/><path d="M4 8Q17 1 30 8V54Q17 61 4 54Z" fill="none" stroke="#9aa4ae" stroke-width=".9"/>
  </g></g>
</svg>`;

// iron chain swags hung from the top beam, and a hand cannon on its tiller leaning on the left post
const chain = (x0, x1, sag) => { let s = ''; const n = Math.round((x1 - x0) / 7);
  for (let i = 0; i <= n; i++) { const t = i / n, x = x0 + (x1 - x0) * t, y = 3 + sag * 4 * t * (1 - t), a = Math.atan2(sag * 4 * (1 - 2 * t), x1 - x0) * 180 / Math.PI;
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${i % 2 ? 4.200 : 3.800}" ry="${i % 2 ? 1.300 : 2.300}" transform="rotate(${a.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }
  return `<g fill="none" stroke="#14181b" stroke-width="2.600">${s}</g><g fill="none" stroke="#8d969d" stroke-width="1.100">${s}</g>`; };
const frame = `
<defs><linearGradient id="bohBarrel" x1="0" x2="1"><stop offset="0" stop-color="#4a3a2a"/><stop offset=".4" stop-color="#b07a44"/><stop offset=".6" stop-color="#7a5230"/><stop offset="1" stop-color="#2e2014"/></linearGradient></defs>
<g class="pc" style="--dy:-60px;--d:1.050;--o:0">
  ${[84, 170, 256].map((x) => `<rect x="${x - 4}" y="-4" width="8" height="8" rx="1" fill="#1d2023" stroke="#5e666d" stroke-width=".8"/><circle cx="${x}" cy="0" r="1.400" fill="#aab4bc"/>`).join('')}
  <g class="bchain">${chain(84, 170, 14)}</g><g class="bchain" style="animation-delay:-1.600s">${chain(170, 256, 11)}</g>
</g>
<g class="pc" style="--dx:60px;--r:20deg;--d:1.150;--o:0">
  <path d="M437 190L432 104" stroke="#5a3a20" stroke-width="7" stroke-linecap="round"/><path d="M436 188L431 106" stroke="#a87c4a" stroke-width="1.400" opacity=".6"/>
  <path d="M428 108L434 108L436 50L429 50Z" fill="url(#bohBarrel)" stroke="#2a1a0c" stroke-width="1"/>
  <path d="M428.300 94h6.600M428.700 76h6.600M429 58h6.600" stroke="#2a1a0c" stroke-width="2.200"/>
  <ellipse cx="432.500" cy="50" rx="4.200" ry="1.600" fill="#140b04" stroke="#b07a44" stroke-width=".8"/>
  <path d="M431 100l-6 4" stroke="#2a2e32" stroke-width="2" stroke-linecap="round"/>
</g>
<g class="fin" style="--d:2.100">${[0, 1, 2].map((i) => `<circle class="bsmoke" cx="432.500" cy="46" r="${4 + i}" style="--i:${i}"/>`).join('')}</g>`;

const costume = {
  front: `
  <defs><linearGradient id="bohHat" x1="0" x2="1"><stop offset="0" stop-color="#3c434a"/><stop offset=".3" stop-color="#dfe6ec"/><stop offset=".6" stop-color="#8d969d"/><stop offset="1" stop-color="#2a2e32"/></linearGradient></defs>
  <path d="M50 44C49 27 58 15 70 14C82 15 91 27 90 44Z" fill="url(#bohHat)" stroke="#14181b" stroke-width="1.300" stroke-linejoin="round"/>
  <path d="M70 14C68 22 68 34 70 44" fill="none" stroke="#14181b" stroke-width="1" opacity=".6"/><path d="M71 14c1 8 1 20-1 30" fill="none" stroke="#fff" stroke-width=".8" opacity=".5"/>
  <path d="M50.500 35H89.500V41H50.300z" fill="var(--civ2)" stroke="#3a0a06" stroke-width=".9"/><path d="M51 38H89" stroke="#f2e8d4" stroke-width="1.400" stroke-dasharray="5 3"/>
  <path d="M27 52C33 43 50 41 70 41C90 41 107 43 113 52C106 49 90 47 70 47C50 47 34 49 27 52Z" fill="url(#bohHat)" stroke="#14181b" stroke-width="1.300" stroke-linejoin="round"/>
  <path d="M32 49c10-4 24-5 38-5s28 1 38 5" fill="none" stroke="#f4f7fa" stroke-width=".9" opacity=".7"/>
  <g fill="#14181b">${[56, 63, 77, 84].map((x) => `<circle cx="${x}" cy="44.500" r="1"/>`).join('')}</g>
  <path d="M58 22c2-4 6-6 10-7" fill="none" stroke="#fff" stroke-width="1.500" stroke-linecap="round" opacity=".7"/>`,
};

const css = `
#stage[data-civ=bohemians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=bohemians] .bpav{transform-box:fill-box;transform-origin:50% 0;animation:bPav 6s ease-in-out infinite}
@keyframes bPav{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1.200deg)}}
#stage[data-civ=bohemians] .bsheen{animation:bSheen 5.200s ease-in-out infinite}
@keyframes bSheen{0%,60%{transform:translateX(0) skewX(-18deg);opacity:0}70%{opacity:.35}90%,100%{transform:translateX(120px) skewX(-18deg);opacity:0}}
#stage[data-civ=bohemians] .bswing{transform-box:view-box;transform-origin:92px 152px;animation:bSwing 1.700s ease-in-out infinite alternate}
@keyframes bSwing{from{transform:rotate(-16deg)}to{transform:rotate(14deg)}}
#stage[data-civ=bohemians] .bflail{transform-box:view-box;transform-origin:36px 122px;animation:bFlail 3.400s ease-in-out infinite alternate}
@keyframes bFlail{from{transform:rotate(-2deg)}to{transform:rotate(3deg)}}
#stage[data-civ=bohemians] .bstream{transform-box:fill-box;transform-origin:0 0;animation:bStream 1.500s ease-in-out infinite alternate}
@keyframes bStream{from{transform:skewY(-6deg) scaleX(.94)}to{transform:skewY(5deg) scaleX(1.040)}}
#stage[data-civ=bohemians] .bchain{transform-box:fill-box;transform-origin:50% 0;animation:bChain 3s ease-in-out infinite alternate}
@keyframes bChain{from{transform:rotate(-1.200deg)}to{transform:rotate(1.200deg)}}
#stage[data-civ=bohemians] .bsmoke{fill:#d8d2c8;opacity:0;transform-box:fill-box;transform-origin:center;animation:bSmoke 3.600s calc(var(--i)*-1.200s) ease-out infinite}
@keyframes bSmoke{0%{transform:translate(0,0) scale(.4);opacity:0}15%{opacity:.55}100%{transform:translate(-10px,-46px) scale(2.400);opacity:0}}
`;

export default {
  id: 'bohemians', name: 'Bohemians', kit: 'central',
  accent: '#ff5a4f', accent2: '#b5241c', cloth: '#2c4466', metal: '#c3ccd3',
  standard, pennant, costume, css, frame,
};
