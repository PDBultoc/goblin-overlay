// CIV layer: Cumans (kit: steppe). Apricot accent, teal felt, polished steel. A felt dragon wind-sock (draco) behind
// an open-jawed bronze head that ripples segment by segment in the wind; a tall pointed helmet with its metal
// face-mask visor pushed up and mail at the cheeks; a horse-hide shield on the pole, a pair of stirrups hung on the
// felt roll. All drawings are our own.

const SEG = 5;
const sockTail = `<g class="cdt"><path d="M118 28.500c6 1 10-2 16 0M118 31c6 2 11-1 17 1.500M118 33.500c5 1 9 3 14 3" stroke="var(--civ)" stroke-width="1.800" fill="none" stroke-linecap="round"/></g>`;
const sock = (i) => { if (i === SEG) return sockTail; const x0 = 63 + i * 11, x1 = x0 + 12, h0 = 9.500 - i * 1.300, h1 = 9.500 - (i + 1) * 1.300;
  return `<g class="cdr" style="--i:${i};transform-origin:${x0}px 31px">
    <path d="M${x0} ${(31 - h0).toFixed(1)}Q${x0 + 6} ${(31 - h0 - 1.400).toFixed(1)} ${x1} ${(31 - h1).toFixed(1)}V${(31 + h1).toFixed(1)}Q${x0 + 6} ${(31 + h0 + 1.400).toFixed(1)} ${x0} ${(31 + h0).toFixed(1)}Z" fill="${i % 2 ? 'var(--civ)' : 'var(--civ3)'}" stroke="#10302a" stroke-width=".7"/>
    <path d="M${x0 + 1} ${(31 - h0 + 1.600).toFixed(1)}Q${x0 + 6} ${(31 - h0).toFixed(1)} ${x1 - 1} ${(31 - h1 + 1.600).toFixed(1)}" stroke="#fff" stroke-width=".9" opacity=".35" fill="none"/>
    <path d="M${x0 + 1} ${(31 + h0 - 1.200).toFixed(1)}Q${x0 + 6} ${(31 + h0).toFixed(1)} ${x1 - 1} ${(31 + h1 - 1.200).toFixed(1)}" stroke="#000" stroke-width="1.200" opacity=".25" fill="none"/>
    ${i % 2 ? '' : `<path d="M${x0 + 3} 31h6" stroke="var(--civ)" stroke-width="1.100" stroke-dasharray="1.400 1.200"/>`}
    ${sock(i + 1)}</g>`; };

const standard = `<svg width="110" height="230" viewBox="0 0 110 230">
  <defs><linearGradient id="cumBz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d48e"/><stop offset=".5" stop-color="#c98b3a"/><stop offset="1" stop-color="#6e3f12"/></linearGradient></defs>
  <g class="unroll" style="--d:1.350;transform-origin:0 50%">${sock(0)}</g>
  <g class="pc" style="--sc:.2;--dy:30px;--d:1.150">
    <path d="M52 50V39h6v11z" fill="#3a3f45" stroke="#14181c" stroke-width=".7"/><path d="M51.500 42h7M51.500 46h7" stroke="var(--civ)" stroke-width="1.300"/>
    <path d="M33 27.500L47 28 36 32Z" fill="#2a0e05"/>
    <path d="M66 20C62 16 56 15 52 16L49 9.500 47 16C42 17 37 20 33 24L32 27 37 27.500 47 28 36 32 34.500 35 38 37 48 35C54 38 60 42 66 42Z" fill="url(#cumBz)" stroke="#4a2a0c" stroke-width="1" stroke-linejoin="round"/>
    <path d="M52 16.500L55 9 57 15.500 60 9.500 61.500 16.500 64 11.500 64.500 18.500Z" fill="url(#cumBz)" stroke="#4a2a0c" stroke-width=".8" stroke-linejoin="round"/>
    <path d="M37 27.500l1 2.200 1-2.100zM41 27.800l1 2.200 1-2.100zM37.500 32.400l1-2 1 2.100z" fill="#fff4d8"/>
    <path d="M40 21.500c3-1.500 6-2 9-1.500M52 22c3 3 5 9 4 15M58 20c3 4 4 10 3 17M45 33.500c3 1 6 1.500 9 1" stroke="#5a3410" stroke-width=".8" fill="none"/>
    <circle class="ceye" cx="45" cy="21.500" r="1.700" fill="var(--civ)" stroke="#5a2a08" stroke-width=".5"/>
  </g>
  <g class="fin" style="--d:1.900">
    <g class="ctas"><path d="M50 52c-3 8-1 14-4 20M60 52c2 8 0 14 3 20" stroke="var(--civ)" stroke-width="1.600" fill="none" stroke-linecap="round"/>
      <path d="M43.500 70h5l1 8h-7zM60.500 70h5l1 8h-7z" fill="var(--civ)" stroke="#6a3008" stroke-width=".5"/></g>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <ellipse cx="17" cy="5" rx="9" ry="4" fill="#c98b3a" stroke="#4a2a0c"/><ellipse cx="17" cy="5" rx="5.500" ry="2" fill="#2a0e05"/>
  <g class="unroll" style="--d:1.600"><g class="cpsw">
    <path d="M8.500 6C8 22 11 38 14 58h6C23 38 26 22 25.500 6Z" fill="var(--civ3)" stroke="#10302a" stroke-width=".8"/>
    <path d="M8.600 14h16.800v7H9.200zM10 30h14l-.8 7h-12.400zM12 46h10l-.6 6h-8.800z" fill="var(--civ)"/>
    <path d="M14 58c-1 6 1 10-1 14M17 58v15M20 58c1 6-1 10 1 14" stroke="var(--civ)" stroke-width="1.400" fill="none"/>
  </g></g>
</svg>`;

const stirrup = (x, i) => `<g class="cstir" style="--i:${i}">
  <rect x="${x - 2.200}" y="-37" width="4.400" height="24" rx="1" fill="#6b3f22" stroke="#2a160a" stroke-width=".7"/><path d="M${x} -35v20" stroke="#d9b98a" stroke-width=".5" stroke-dasharray="1.500 1.300"/>
  <rect x="${x - 3.200}" y="-24" width="6.400" height="4" rx="1" fill="none" stroke="#c0c8d0" stroke-width="1.200"/>
  <path d="M${x - 6.500} 1L${x - 7.500} -8C${x - 7.500} -15 ${x + 7.500} -15 ${x + 7.500} -8L${x + 6.500} 1" fill="none" stroke="#2a3038" stroke-width="3.400" stroke-linecap="round"/>
  <path d="M${x - 6.500} 1L${x - 7.500} -8C${x - 7.500} -15 ${x + 7.500} -15 ${x + 7.500} -8L${x + 6.500} 1" fill="none" stroke="#b8c2cc" stroke-width="1.600" stroke-linecap="round"/>
  <rect x="${x - 9}" y="-.500" width="18" height="3.400" rx="1.200" fill="#8d969f" stroke="#2a3038" stroke-width=".8"/>
  <circle cx="${x}" cy="-13" r="1.400" fill="var(--civ)"/>
</g>`;

const frame = `
<defs>
  <clipPath id="cumShClip"><circle cx="477" cy="141" r="18"/></clipPath>
  <radialGradient id="cumBoss" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fbe7b0"/><stop offset=".6" stop-color="#c98b3a"/><stop offset="1" stop-color="#6e3f12"/></radialGradient>
</defs>
<g class="pc" style="--dy:-70px;--d:1.050;--o:0">${stirrup(52, 0)}${stirrup(96, 1)}</g>
<g class="pc" style="--dx:70px;--r:30deg;--d:1.200;--o:0">
  <path d="M451 104L470 124M452 108L484 124" stroke="#4a2a14" stroke-width="1.800"/><circle cx="451.500" cy="105" r="2.200" fill="#c0c8d0" stroke="#2a3038" stroke-width=".7"/>
  <g class="cshield">
    <circle cx="477" cy="141" r="19.500" fill="#f1e8d8" stroke="#2a160a" stroke-width="1"/>
    <g clip-path="url(#cumShClip)">
      <path d="M458 126c8-4 14 2 12 10s-10 6-14 2zM478 134c6-6 16-4 18 4s-4 12-10 10-10-8-8-14zM466 150c6-2 10 4 8 10s-10 4-12-2zM484 121c4-2 8 0 7 4s-6 4-7 0z" fill="#6b3f22"/>
      <path d="M470 128c3 0 4 2 3 4M488 150c2 2 1 5-1 6" stroke="#3a1e0c" stroke-width="1" fill="none"/>
      <path d="M460 136c2 1 3 3 2 5M492 132c-1 2 0 4 2 5" stroke="#b8a68a" stroke-width=".7" fill="none"/>
    </g>
    <circle cx="477" cy="141" r="18" fill="none" stroke="#7a4d27" stroke-width="3.200"/>
    <circle cx="477" cy="141" r="18" fill="none" stroke="#efdcb4" stroke-width=".8" stroke-dasharray="2 2.200"/>
    <circle cx="477" cy="141" r="5" fill="url(#cumBoss)" stroke="#4a2a0c" stroke-width=".8"/><circle class="cglint" cx="475.500" cy="139.500" r="1.200" fill="#fff"/>
    <g class="ctas2"><path d="M477 160v8" stroke="var(--civ)" stroke-width="1.400"/><path d="M475 167h4l1.500 9h-7z" fill="var(--civ)" stroke="#6a3008" stroke-width=".5"/></g>
  </g>
</g>`;

const mail = (x0, x1) => { let d = ''; for (let y = 48; y <= 66; y += 3) d += `M${x0} ${y}H${x1}`; return d; };

const costume = {
  front: `
  <defs>
    <linearGradient id="cumSt" x1="0" x2="1"><stop offset="0" stop-color="#5e6a76"/><stop offset=".38" stop-color="#e9eef3"/><stop offset=".6" stop-color="#a9b4bf"/><stop offset="1" stop-color="#3e4852"/></linearGradient>
    <radialGradient id="cumMk" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#c4ccd4"/><stop offset="1" stop-color="#6e7a86"/></radialGradient>
  </defs>
  <g class="ctas3"><path d="M71 -14c5-3 10 1 16-1M71 -13c6 0 9 4 15 4M71 -12c4 2 7 7 12 8" stroke="var(--civ)" stroke-width="1.600" fill="none" stroke-linecap="round"/></g>
  <path d="M37 47l7.500-2 1 21-8.500 3.500zM103 47l-7.500-2-1 21 8.500 3.500z" fill="#6e7882" stroke="#232a31" stroke-width=".8"/>
  <path d="${mail(38, 45)}${mail(95, 102)}" stroke="#c4ccd4" stroke-width="1.300" stroke-dasharray="1.100 .9"/>
  <path d="M43 46C44 33 55 23 64 6L70 -10 76 6C85 23 96 33 97 46Z" fill="url(#cumSt)" stroke="#1f262d" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M70 -6V40M63 10c-5 12-10 22-12 33M77 10c5 12 10 22 12 33" stroke="#2a3038" stroke-width=".6" fill="none" opacity=".55"/>
  <path class="cshine" d="M66 4C62 16 56 26 50 40" stroke="#fff" stroke-width="1.600" fill="none" stroke-linecap="round"/>
  <rect x="68.500" y="-17" width="3" height="8" rx="1" fill="#c98b3a" stroke="#4a2a0c" stroke-width=".6"/>
  <path d="M41 49C52 42 88 42 99 49L99 43C88 36.500 52 36.500 41 43Z" fill="#c9a24a" stroke="#4a2a0c" stroke-width=".9"/>
  ${[45, 53, 61, 70, 79, 87, 95].map((x) => `<circle cx="${x}" cy="${(46.300 - 4 * (1 - ((x - 70) / 29) ** 2)).toFixed(1)}" r="1" fill="#fbe7b0" stroke="#4a2a0c" stroke-width=".4"/>`).join('')}
  <rect x="66.500" y="37.500" width="7" height="4" rx="1" fill="#8d969f" stroke="#232a31" stroke-width=".6"/>
  <path d="M58.500 38.500C56.500 30 58.500 20.500 70 17.500 81.500 20.500 83.500 30 81.500 38.500 77 40.500 63 40.500 58.500 38.500Z" fill="url(#cumMk)" stroke="#232a31" stroke-width="1"/>
  <path d="M60.500 25.500c2.500-1.800 5.500-1.800 8-.3M71.500 25.200c2.500-1.500 5.500-1.500 8 .3" stroke="#2a3038" stroke-width=".9" fill="none"/>
  <path d="M61.500 28.300h6.300M72.200 28.300h6.300" stroke="#0d1013" stroke-width="1.800" stroke-linecap="round"/>
  <path d="M70 24.500v8.500l-1.800 1.600" stroke="#2a3038" stroke-width=".8" fill="none"/>
  <path d="M63.500 36.300c2.500-1.600 4.600-1.600 6.500 0 1.900-1.600 4-1.600 6.500 0" stroke="#2a3038" stroke-width=".8" fill="none"/>`,
};

const css = `
#stage[data-civ=cumans] .gob.dressed .tuft{opacity:0}
#stage[data-civ=cumans] .cdr{transform-box:view-box;animation:cDr 1.050s calc(var(--i)*-.21s) ease-in-out infinite alternate}
@keyframes cDr{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
#stage[data-civ=cumans] .cdt{transform-box:fill-box;transform-origin:0 50%;animation:cDt .5s ease-in-out infinite alternate}
@keyframes cDt{from{transform:skewY(-12deg) scaleX(.9)}to{transform:skewY(10deg) scaleX(1.100)}}
#stage[data-civ=cumans] .ceye{animation:cEye 1.800s ease-in-out infinite alternate}
@keyframes cEye{from{filter:none}to{filter:drop-shadow(0 0 2px var(--civ)) brightness(1.400)}}
#stage[data-civ=cumans] .ctas,#stage[data-civ=cumans] .ctas2{transform-box:fill-box;transform-origin:50% 0;animation:cTas 1.300s ease-in-out infinite alternate}
@keyframes cTas{from{transform:rotate(8deg)}to{transform:rotate(-12deg)}}
#stage[data-civ=cumans] .ctas3{transform-box:fill-box;transform-origin:0 50%;animation:cDt .7s ease-in-out infinite alternate}
#stage[data-civ=cumans] .cpsw{transform-box:fill-box;transform-origin:50% 0;animation:cPsw 1.400s ease-in-out infinite alternate}
@keyframes cPsw{from{transform:rotate(5deg) skewX(4deg)}to{transform:rotate(-9deg) skewX(-6deg)}}
#stage[data-civ=cumans] .cstir{transform-box:fill-box;transform-origin:50% 0;animation:cTas calc(1.700s + var(--i)*.4s) calc(var(--i)*-.6s) ease-in-out infinite alternate}
#stage[data-civ=cumans] .cshield{transform-box:view-box;transform-origin:477px 122px;animation:cShield 3s ease-in-out infinite alternate}
@keyframes cShield{from{transform:rotate(3deg)}to{transform:rotate(-4deg)}}
#stage[data-civ=cumans] .cglint,#stage[data-civ=cumans] .cshine{animation:cGlint 3.200s ease-in-out infinite}
@keyframes cGlint{0%,100%{opacity:.15}50%{opacity:.95}}
`;

export default {
  id: 'cumans', name: 'Cumans', kit: 'steppe',
  accent: '#ff9f43', accent2: '#d9701e', cloth: '#2e7d6b', metal: '#c0c8d0',
  standard, pennant, costume, css, frame,
};
