// CIV layer: Khitans (kit: steppe). Periwinkle accent, red lacquer, silver. A lacquered banner hung from a black
// crossbar with a running stag in its field and a gloss that sweeps over it; the Khitan hairstyle (shaved crown,
// long side locks) under a small fur-lined hood pushed back; a saddle with silver arch plates on the felt roll and
// a hooded hunting falcon on a block perch by the pole. All drawings are our own.

const stag = `<g transform="translate(80 93) scale(.75) translate(-81 -86)">
  <path d="M66 92C70 88 84 87 90 89L94 84C95 81 97 80 99 80L102 82 100 84 97 85C95 89 93 93 89 96C82 98 72 98 68 96ZM66 92l-3.500-3 1 4.500z" fill="var(--civ)" stroke="#e9edf5" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M88 95L94 99 101 101M85 96L90 102 97 106M72 96L66 100 59 101M69 95L63 103 58 107" stroke="var(--civ)" stroke-width="2.600" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M97 80C95 74 92 70 88 67M93 73.500L89.500 72M96.500 79C98 72 100 68 103.500 65.500M99.500 71.500L103 71M96 81l-3-2.500" stroke="#e9edf5" stroke-width="1.600" fill="none" stroke-linecap="round"/>
  <path d="M73 91c4 1 9 1 13 0" stroke="#e9edf5" stroke-width=".8" fill="none" opacity=".7"/>
</g>`;
const PANEL = 'M58 51H102V134L95.500 142 88.500 134 80 142 71.500 134 64.500 142 58 134Z';
const studs = (() => { let s = ''; for (let y = 56; y <= 128; y += 9) s += `<circle cx="61" cy="${y}" r="1.100"/><circle cx="99" cy="${y}" r="1.100"/>`; return s; })();

const standard = `<svg width="110" height="230" viewBox="0 0 110 230">
  <defs>
    <clipPath id="khiBanClip"><path d="${PANEL}"/></clipPath>
    <linearGradient id="khiLq" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
    <linearGradient id="khiSv" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#c3c9d4"/><stop offset="1" stop-color="#6c7480"/></linearGradient>
  </defs>
  <g class="unroll" style="--d:1.350"><g class="kban">
    <path d="${PANEL}" fill="var(--civ3)" stroke="#120604" stroke-width="1.200" stroke-linejoin="round"/>
    <path d="M58 51H102V134L95.500 142 88.500 134 80 142 71.500 134 64.500 142 58 134Z" fill="none" stroke="#1a0a06" stroke-width="7" clip-path="url(#khiBanClip)"/>
    <rect x="64" y="57" width="32" height="71" fill="none" stroke="url(#khiSv)" stroke-width="1"/>
    <g fill="url(#khiSv)">${studs}</g>
    ${stag}
    <path d="M67 118c4-3 6-3 8 0M82 120c3-2 6-2 9 0M70 66c3-2 6-2 9 0 3-2 6-2 9 0" stroke="#e9edf5" stroke-width=".9" fill="none" opacity=".75"/>
    <path d="${PANEL}" fill="url(#khiLq)"/>
    <g clip-path="url(#khiBanClip)"><g transform="rotate(20 46 100)"><rect class="ksheen" x="40" y="30" width="12" height="140" fill="#fff" opacity=".3"/></g></g>
    ${[64.500, 80, 95.500].map((x, i) => `<g class="ktas" style="--i:${i}"><path d="M${x} 142v5" stroke="var(--civ)" stroke-width="1.200"/><circle cx="${x}" cy="148" r="1.800" fill="url(#khiSv)"/><path d="M${x - 2} 149.500h4l1 8h-6z" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".5"/></g>`).join('')}
  </g></g>
  <g class="pc" style="--sc:.2;--dy:30px;--d:1.150">
    <path d="M55 14C58 20 58.500 27 55 36 51.500 27 52 20 55 14Z" fill="url(#khiSv)" stroke="#2c333a" stroke-width=".9"/>
    <path d="M52.500 36h5l.6 10h-6.200z" fill="#1a0a06" stroke="#000" stroke-width=".6"/><circle cx="55" cy="36" r="2.400" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".5"/>
    <rect x="51" y="45.500" width="57" height="6" rx="2" fill="#1a0a06" stroke="#000" stroke-width=".7"/><path d="M52 47.200h55" stroke="var(--civ3)" stroke-width="1.200"/><path d="M52 46.300h55" stroke="#fff" stroke-width=".5" opacity=".4"/>
    <path d="M104 44.500h4.500c2 0 3 1.500 3 3.500s-1 3.500-3 3.500H104z" fill="url(#khiSv)" stroke="#2c333a" stroke-width=".7"/>
  </g>
  <g class="fin" style="--d:1.900"><g class="kcord">
    <path d="M108 51c1 10-1 18 1 28" stroke="var(--civ)" stroke-width="1.600" fill="none"/><path d="M106.500 78h5l1 9h-7z" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".5"/>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="3" y="0" width="28" height="5" rx="2" fill="#1a0a06" stroke="#000"/><path d="M4 1.700h26" stroke="var(--civ3)"/>
  <g class="unroll" style="--d:1.600"><g class="kban">
    <path d="M6 5h22v52l-5.500 7-5.500-7-5.500 7L6 57z" fill="var(--civ3)" stroke="#120604" stroke-width=".9"/>
    <path d="M9 8h16v46H9z" fill="none" stroke="#c3c9d4" stroke-width=".7"/>
    <path d="M12 34c2-3 7-3 10-2l2-3 2 1-2 2c-1 3-3 5-6 5-3 0-5 0-6-3zM14 37l-2 4M16 37l1 4M21 36l2 4M23 35l3 3" fill="var(--civ)" stroke="var(--civ)" stroke-width="1.100" stroke-linecap="round"/>
    <path d="M24 29l-1-5M24 29l2-5" stroke="#e9edf5" stroke-width=".9"/>
  </g></g>
</svg>`;

const frame = `
<defs><linearGradient id="khiFSv" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#c3c9d4"/><stop offset="1" stop-color="#6c7480"/></linearGradient></defs>
<g class="pc" style="--dy:-80px;--r:-8deg;--d:1.050;--o:0">
  <path d="M34 -31H118L114 -3H38Z" fill="var(--civ3)" stroke="#120604" stroke-width="1"/>
  <path d="M38 -28H114L111 -6H41Z" fill="none" stroke="url(#khiFSv)" stroke-width=".9" stroke-dasharray="3 1.500"/>
  <path d="M60 -20c6-4 12-4 18 0 6-4 12-4 18 0" stroke="var(--civ)" stroke-width="1.200" fill="none"/>
  ${[38, 114].map((x, i) => `<g class="ktas" style="--i:${i + 3}"><path d="M${x} -3v4" stroke="var(--civ)" stroke-width="1.200"/><path d="M${x - 2.200} 1h4.400l1 8h-6.400z" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".5"/></g>`).join('')}
  <path d="M36 -32C40 -50 46 -55 50 -48C62 -38 90 -38 104 -46C110 -51 116 -45 116 -32Z" fill="#3a1a10" stroke="#120604" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M50 -44C62 -35 90 -35 104 -43" stroke="#7a3a22" stroke-width="1.200" fill="none"/>
  <path d="M40.500 -33C41.500 -44 45.500 -50.500 49 -47L51 -33Z" fill="url(#khiFSv)" stroke="#2c333a" stroke-width=".8"/>
  <path d="M43.500 -36c0-4 2-7 4-8M45 -40c1.500 0 2.500 1 2.500 2.500" stroke="#5a6270" stroke-width=".7" fill="none"/>
  <path d="M103 -33C104 -40 107 -47.500 110.500 -46.500 113.500 -44 114 -38 114 -33Z" fill="url(#khiFSv)" stroke="#2c333a" stroke-width=".8"/>
  <path d="M106 -36c0-3 2-6 4-7" stroke="#5a6270" stroke-width=".7" fill="none"/>
  ${[58, 70, 82, 94].map((x) => `<circle cx="${x}" cy="-36.300" r="1.300" fill="url(#khiFSv)" stroke="#2c333a" stroke-width=".4"/>`).join('')}
  <circle class="kglint" cx="45" cy="-45" r="1.300" fill="#fff"/><circle class="kglint b" cx="109" cy="-44" r="1.300" fill="#fff"/>
</g>
<g class="pc" style="--dy:90px;--d:1.250;--o:0">
  <path d="M478 241V213" stroke="#3a2412" stroke-width="5" stroke-linecap="round"/><path d="M477 240V214" stroke="#a8825a" stroke-width="1" opacity=".6"/>
  <path d="M470 241h16" stroke="#3a2412" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="478" cy="211.500" rx="8" ry="2.800" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".7"/>
  <path d="M482 209c4 6 2 12 -3 16" stroke="#7a4d27" stroke-width=".9" fill="none"/>
  <g class="kbird">
    <path d="M482 207L489 222 485 223 479 209Z" fill="#4e3622" stroke="#1f140a" stroke-width=".7"/>
    <path d="M472 210C468 204 468 194 472 188C474 184 479 183 482 186C486 192 487 202 484 210Z" fill="#6b4a2c" stroke="#1f140a" stroke-width=".8"/>
    <path d="M471.500 206C469.500 199 470.500 192 473.500 189C475.500 194 476.500 202 475.500 207Z" fill="#eadbbd"/>
    <path d="M472 194l1.200.8 1.200-.8M472.500 198l1.200.8 1.200-.8M473 202l1.200.8 1.200-.8" stroke="#6b4a2c" stroke-width=".6" fill="none"/>
    <path d="M478 190c4 4 6 10 5 18M480 195c2 3 3 7 3 11" stroke="#3a2412" stroke-width=".7" fill="none"/>
    <path d="M473 209v3M477 209.500v2.500" stroke="#d8a830" stroke-width="1.300"/>
    <path d="M470 186.500C469.500 180.500 475.500 178 480 181 482.500 183 482 186.500 480 188 476.500 188.500 473 188.500 470 186.500Z" fill="var(--civ3)" stroke="#120604" stroke-width=".8"/>
    <path d="M471 185.500c3 .8 6 .8 9 0" stroke="url(#khiFSv)" stroke-width=".8" fill="none"/>
    <path d="M476 180.500l-1-5.500M477 180.500l1.500-5.500" stroke="var(--civ)" stroke-width="1.300" stroke-linecap="round"/>
    <path d="M470.300 186.300l-2.300 1.400 2.600.9z" fill="#4a4f58"/>
  </g>
</g>`;

const costume = {
  front: `
  <defs>
    <filter id="khiFurF" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.300" numOctaves="2" seed="6"/><feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>
    <linearGradient id="khiHood" x1="0" x2="1"><stop offset="0" stop-color="#5a120e"/><stop offset=".5" stop-color="var(--civ3)"/><stop offset="1" stop-color="#4a0e0a"/></linearGradient>
  </defs>
  <path d="M30 72C27 42 45 18 70 18S113 42 110 72L98 73C98 50 88 37 70 37S42 50 42 73Z" fill="url(#khiHood)" stroke="#1a0604" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M33.500 70C31 43 48 21.500 70 21.500S109 43 106.500 70" stroke="#c3c9d4" stroke-width=".9" fill="none" stroke-dasharray="3 2"/>
  ${[[40, 34], [55, 25], [70, 22], [85, 25], [100, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.300" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".4"/>`).join('')}
  <path d="M42 73C42 50 52 37 70 37S98 50 98 73" stroke="#e6d3ae" stroke-width="5" fill="none" filter="url(#khiFurF)"/>
  <path d="M42 73C42 50 52 37 70 37S98 50 98 73" stroke="#8a7458" stroke-width="5" fill="none" stroke-dasharray=".8 2.600" opacity=".7"/>
  <g class="klock l">
    <path d="M45.500 47C40 56 42 68 38.500 81 37.500 86 40 88.500 41.500 85 43.500 76 44 64 48 52Z" fill="#2a1d16" stroke="#e6d3ae" stroke-width=".9"/>
    <path d="M44 53c-2 8-1.500 18-3.500 28" stroke="#9a8068" stroke-width=".9" fill="none"/>
    <circle cx="40.300" cy="79" r="1.700" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".5"/>
  </g>
  <g class="klock r">
    <path d="M94.500 47C100 56 98 68 101.500 81 102.500 86 100 88.500 98.500 85 96.500 76 96 64 92 52Z" fill="#2a1d16" stroke="#e6d3ae" stroke-width=".9"/>
    <path d="M96 53c2 8 1.500 18 3.500 28" stroke="#9a8068" stroke-width=".9" fill="none"/>
    <circle cx="99.700" cy="79" r="1.700" fill="var(--civ)" stroke="#2a3a7a" stroke-width=".5"/>
  </g>`,
};

const css = `
#stage[data-civ=khitans] .gob.dressed .tuft{opacity:0}
#stage[data-civ=khitans] .kban{transform-box:fill-box;transform-origin:50% 0;animation:kBan 3.200s ease-in-out infinite alternate}
@keyframes kBan{from{transform:skewY(1.500deg) rotate(1deg)}to{transform:skewY(-2deg) rotate(-2.500deg)}}
#stage[data-civ=khitans] .ksheen{animation:kSheen 4.200s ease-in-out infinite}
@keyframes kSheen{0%,25%{transform:translateX(0);opacity:0}35%{opacity:.6}70%,100%{transform:translateX(80px);opacity:0}}
#stage[data-civ=khitans] .ktas,#stage[data-civ=khitans] .kcord{transform-box:fill-box;transform-origin:50% 0;animation:kTas calc(1.200s + var(--i,0)*.2s) calc(var(--i,0)*-.4s) ease-in-out infinite alternate}
@keyframes kTas{from{transform:rotate(9deg)}to{transform:rotate(-12deg)}}
#stage[data-civ=khitans] .klock{transform-box:fill-box;transform-origin:50% 0;animation:kLock 2.400s ease-in-out infinite alternate}
#stage[data-civ=khitans] .klock.r{animation-delay:-1.100s}
@keyframes kLock{from{transform:rotate(2.500deg)}to{transform:rotate(-3.500deg)}}
#stage[data-civ=khitans] .kbird{transform-box:fill-box;transform-origin:50% 100%;animation:kBird 2.800s ease-in-out infinite}
@keyframes kBird{0%,60%,100%{transform:none}70%{transform:scale(1.060,.97)}80%{transform:rotate(-4deg)}90%{transform:none}}
#stage[data-civ=khitans] .kglint{opacity:0;animation:kGlint 3.400s ease-in-out infinite}
#stage[data-civ=khitans] .kglint.b{animation-delay:-1.700s}
@keyframes kGlint{0%,70%,100%{opacity:0}82%{opacity:1}}
`;

export default {
  id: 'khitans', name: 'Khitans', kit: 'steppe',
  accent: '#8fb4ff', accent2: '#5878d8', cloth: '#a8261f', metal: '#e6e9f0',
  standard, pennant, costume, css, frame,
};
