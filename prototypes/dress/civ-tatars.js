// CIV layer: Tatars (kit: steppe). Sky-cyan accent, indigo cloth, steel. A lance standard with two fox tails under
// a fur collar and a small embroidered swallowtail streamer; a curly black fur kalpak with an owl feather;
// a pair of embroidered saddle bags on the felt roll, a lasso pole and a rope coil by the pole. All drawings are our own.

const fox = (x, i, len) => { const e = 52 + len, w = e - 14;
  return `<g class="ttail" style="--i:${i}">
  <path d="M${x - 2} 52C${x - 14} 70 ${x - 13} ${(52 + len * .72).toFixed(1)} ${x} ${e}C${x + 13} ${(52 + len * .72).toFixed(1)} ${x + 14} 70 ${x + 2} 52Z" fill="url(#tatFox)" stroke="#5a200a" stroke-width=".8" filter="url(#tatFurF)"/>
  <path d="M${x - 6} ${w}C${x - 4} ${e - 6} ${x - 2} ${e - 2} ${x} ${e}C${x + 2} ${e - 2} ${x + 4} ${e - 6} ${x + 6} ${w}C${x + 2} ${w + 3} ${x - 2} ${w + 3} ${x - 6} ${w}Z" fill="#fbf6ea" stroke="#8a7a62" stroke-width=".5"/>
  <path d="M${x} 56V${(52 + len * .62).toFixed(1)}" stroke="#5a1e08" stroke-width="1.800" opacity=".45"/>
  <path d="M${x - 4} 62c-2 10-2 20 0 30M${x + 4} 62c2 10 2 22 0 32M${x - 6.500} 80c0 6 1 10 2 14" stroke="#ffd2a0" stroke-width=".8" fill="none" opacity=".55"/>
</g>`; };
const featherBars = (x0, y0, dx, dy, wmax) => { let d = ''; for (let t = .14; t < .92; t += .11) { const px = x0 + dx * t, py = y0 + dy * t, w = wmax * Math.sin(Math.PI * t) + .8;
  d += `M${(px - .97 * w).toFixed(1)} ${(py - .23 * w).toFixed(1)}L${(px + .97 * w).toFixed(1)} ${(py + .23 * w).toFixed(1)}`; } return d; };

const standard = `<svg width="110" height="230" viewBox="0 0 110 230">
  <defs>
    <linearGradient id="tatFox" x1="0" x2="1"><stop offset="0" stop-color="#8a3210"/><stop offset=".35" stop-color="#e8782e"/><stop offset=".6" stop-color="#f6a65a"/><stop offset="1" stop-color="#a8420f"/></linearGradient>
    <filter id="tatFurF" x="-25%" y="-6%" width="150%" height="112%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="8"/><feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter>
    <linearGradient id="tatSt" x1="0" x2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".5" stop-color="#b8c2cc"/><stop offset="1" stop-color="#56616c"/></linearGradient>
  </defs>
  <g class="unroll" style="--d:1.350"><g transform="rotate(10 55 52)">${fox(55, 0, 64)}</g><g transform="rotate(-10 55 52)">${fox(55, 1, 70)}</g></g>
  <g class="pc" style="--sc:.2;--dy:30px;--d:1.150">
    <path d="M55 0C59.800 11 61 24 55 37 49 24 50.200 11 55 0Z" fill="url(#tatSt)" stroke="#2c333a" stroke-width="1" stroke-linejoin="round"/>
    <path d="M55 4V34" stroke="#2c333a" stroke-width=".7"/><path d="M53.600 8c-1 8-1 16 .6 23" stroke="#fff" stroke-width=".8" fill="none" opacity=".7"/>
    <path class="tglint" d="M55 2l1 4-1 4-1-4z" fill="#fff"/>
    <path d="M52 37h6l.8 13h-7.600z" fill="#3a3f45" stroke="#14181c" stroke-width=".7"/><path d="M51.700 40h6.600M51.500 44h7" stroke="var(--civ)" stroke-width="1.200"/>
    <path d="M48.500 47.500C48.500 44.500 61.500 44.500 61.500 47.500V52.500C61.500 55.500 48.500 55.500 48.500 52.500Z" fill="#3a2a1e" stroke="#140c06" stroke-width=".8"/>
    <path d="M50 46l-.8-2.200M53 45.200v-2.400M57 45.200v-2.400M60 46l.8-2.200" stroke="#6a523c" stroke-width="1.200" stroke-linecap="round"/>
    <g class="ttas"><path d="M60 53c2 4 3 7 3 10" stroke="var(--civ)" stroke-width="1.400" fill="none"/><path d="M61 62h4l1 7h-6z" fill="var(--civ)" stroke="#0e4a62" stroke-width=".5"/></g>
  </g>
  <g class="fin" style="--d:1.900">
    <path class="tstr" d="M58 126C70 121 84 131 104 124L98 131 104 138C84 143 70 135 58 140Z" fill="var(--civ3)" stroke="#0b1736" stroke-width=".8"/>
    <path class="tstr2" d="M60 133C72 128 86 137 99 131" fill="none" stroke="var(--civ)" stroke-width="2" stroke-dasharray="3 1.600"/>
    <path class="tstr3" d="M60 128C71 123.500 84 132.500 100 126.500" fill="none" stroke="#f3ead6" stroke-width=".7" stroke-dasharray="1 2"/>
    <rect x="50.500" y="122.500" width="9" height="20" rx="2.500" fill="var(--civ3)" stroke="#0b1736" stroke-width=".8"/><path d="M50.500 127h9M50.500 138h9" stroke="var(--civ)" stroke-width="1.400"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="11" y="0" width="12" height="9" rx="2" fill="#3a3f45" stroke="#14181c"/><path d="M11 3.500h12" stroke="var(--civ)" stroke-width="1.400"/>
  <g class="unroll" style="--d:1.600"><g class="ttail" style="--i:2">
    <path d="M15 9C7 24 8 46 17 70 26 46 27 24 19 9z" fill="#e8782e" stroke="#5a200a" stroke-width=".8"/>
    <path d="M11.500 57c2 5 4 9 5.500 13 1.500-4 3.500-8 5.500-13-3.500 3-7.500 3-11 0z" fill="#fbf6ea"/><path d="M17 12v34" stroke="#5a1e08" stroke-width="1.500" opacity=".45"/>
  </g></g>
  <path class="tstrp" d="M21 10C26 8 29 13 34 10L32 14 34 18C29 21 26 16 21 18Z" fill="var(--civ3)" stroke="#0b1736" stroke-width=".6"/>
</svg>`;

const bag = (x, i) => `<g class="tbag" style="--i:${i}">
  <path d="M${x} -30h40v22c0 8-6 11-20 11s-20-3-20-11z" fill="#7a4a26" stroke="#2a160a" stroke-width="1.100"/>
  <path d="M${x + 3} -26v19c0 5 5 7 17 7s17-2 17-7v-19" fill="none" stroke="#e6cf9e" stroke-width=".7" stroke-dasharray="2 1.600" opacity=".8"/>
  <path d="M${x - 1} -31h42v12c-8 5.500-34 5.500-42 0z" fill="var(--civ3)" stroke="#0b1736" stroke-width="1"/>
  <path d="M${x + 2} -28.500h36v8.500c-7 4-29 4-36 0z" fill="none" stroke="var(--civ)" stroke-width="1.100" stroke-dasharray="2.200 1.400"/>
  <path d="M${x + 20} -29l5 5.500-5 5.500-5-5.500zM${x + 9} -25l2.500 2.500-2.500 2.500-2.500-2.500zM${x + 31} -25l2.500 2.500-2.500 2.500-2.500-2.500z" fill="var(--civ)" stroke="#0b1736" stroke-width=".5"/>
  <rect x="${x + 18}" y="-16.500" width="4" height="7" rx="1.500" fill="#efe4c8" stroke="#5a4a2a" stroke-width=".6"/>
  <g class="ttas2" style="--i:${i}"><path d="M${x + 40} -22v8" stroke="var(--civ)" stroke-width="1.200"/><path d="M${x + 38.500} -14h3l1 6h-5z" fill="var(--civ)"/></g>
</g>`;

const frame = `
<g class="pc" style="--dy:-70px;--d:1.050;--o:0">
  <path d="M62 -32C70 -40 112 -40 120 -32" stroke="#4a2a14" stroke-width="5" fill="none"/><path d="M62 -32C70 -40 112 -40 120 -32" stroke="#e6cf9e" stroke-width=".6" stroke-dasharray="2 1.600" fill="none"/>
  ${bag(40, 0)}${bag(100, 1)}
</g>
<g class="pc" style="--dx:80px;--r:20deg;--d:1.250;--o:0">
  <path d="M466 241L506 6" stroke="#3a2412" stroke-width="3.600" stroke-linecap="round"/><path d="M466 241L506 6" stroke="#a8825a" stroke-width="1.200" stroke-linecap="round" opacity=".7"/>
  <path d="M478 172l3 1.200M486 124l3 1.200M495 72l3 1.200" stroke="var(--civ)" stroke-width="2.400"/>
  <g class="tloop"><path d="M506 6C522 12 521 42 507 46 493 42 495 18 504 10" stroke="#e3d2a4" stroke-width="1.700" fill="none" stroke-linecap="round"/>
    <path d="M506 6C522 12 521 42 507 46 493 42 495 18 504 10" stroke="#7a6440" stroke-width="1.700" fill="none" stroke-dasharray="1 2.400"/></g>
</g>
<g class="pc" style="--dy:-60px;--d:1.150;--o:0">
  <path d="M431 184v8" stroke="#3a2412" stroke-width="1.400"/>
  ${[0, 1, 2, 3].map((k) => `<ellipse cx="${431 + k * .6}" cy="${201 + k * .8}" rx="${10 - k * .8}" ry="${11 - k}" fill="none" stroke="${k % 2 ? '#c9b484' : '#e3d2a4'}" stroke-width="2"/>`).join('')}
  <path d="M424 194l14 0M425 208l13 1" stroke="var(--civ)" stroke-width="2.200"/>
  <path class="tend" d="M436 211c2 8 0 14 3 20" stroke="#e3d2a4" stroke-width="1.700" fill="none" stroke-linecap="round"/>
</g>`;

let seed = 31; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const curls = (() => { let d = ''; for (let y = 8, row = 0; y <= 44; y += 3.600, row++) for (let x = 42 + (row % 2) * 2.800; x <= 98; x += 5.600) {
  const cx = x + (r() - .5) * 2.200, cy = y + (r() - .5) * 1.600, k = 1.600 + r() * 1.100;
  d += `M${cx.toFixed(1)} ${cy.toFixed(1)}a${k.toFixed(1)} ${(k * .8).toFixed(1)} 0 1 ${r() < .5 ? 1 : 0} ${(k * 1.500).toFixed(1)} ${(k * .6).toFixed(1)}`; } return d; })();

const costume = {
  front: `
  <defs><clipPath id="tatKalClip"><path d="M42 46C40 36 42 22 46 12C49 6 57 4.500 70 4.500C83 4.500 91 6 94 12C98 22 100 36 98 46C80 41.500 60 41.500 42 46Z"/></clipPath>
    <linearGradient id="tatKal" x1="0" x2="1"><stop offset="0" stop-color="#1a1411"/><stop offset=".4" stop-color="#3a3028"/><stop offset="1" stop-color="#14100d"/></linearGradient>
    <filter id="tatKalF" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency="1.200" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.600" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
  <path d="M42 46C40 36 42 22 46 12C49 6 57 4.500 70 4.500C83 4.500 91 6 94 12C98 22 100 36 98 46C80 41.500 60 41.500 42 46Z" fill="url(#tatKal)" stroke="#0d0907" stroke-width="1.200" filter="url(#tatKalF)"/>
  <g clip-path="url(#tatKalClip)"><path d="${curls}" fill="none" stroke="#7d6a58" stroke-width="1.100" stroke-linecap="round"/></g>
  <path d="M48 10C54 7 86 7 92 10" stroke="#8a7866" stroke-width="1.200" fill="none" opacity=".6"/>
  <path d="M43 46C60 41.500 80 41.500 97 46L97 41.500C80 37 60 37 43 41.500Z" fill="var(--civ3)" stroke="#0b1736" stroke-width=".8"/>
  <path d="M45 44.500l3-2.500 3 2.500 3-2.500 3 2.500 3-2.500 3 2.500 3-2.500 3 2.500 3-2.500 3 2.500 3-2.500 3 2.500 3-2.500 3 2.500 3-2.500 3 2.500" fill="none" stroke="var(--civ)" stroke-width="1"/>
  <g class="tfeath">
    <path d="M91.500 38C87 24 92.500 5 104 -14 109 2 103.500 22 93.500 38Z" fill="#cfab7c" stroke="#3a2412" stroke-width=".8"/>
    <path d="${featherBars(92, 37, 12, -51, 4.600)}" stroke="#5a3c22" stroke-width="1.400"/>
    <path d="M92.500 39C96 22 100 6 104 -14" stroke="#efe2c4" stroke-width=".8" fill="none"/>
    <path d="M91 41l2-6 2 6z" fill="var(--civ)" stroke="#0e4a62" stroke-width=".5"/>
  </g>`,
};

const css = `
#stage[data-civ=tatars] .gob.dressed .tuft{opacity:0}
#stage[data-civ=tatars] .ttail{transform-box:fill-box;transform-origin:50% 0;animation:tTail calc(1.900s + var(--i)*.4s) calc(var(--i)*-.7s) ease-in-out infinite alternate}
@keyframes tTail{from{transform:rotate(6deg)}to{transform:rotate(-14deg)}}
#stage[data-civ=tatars] .ttas,#stage[data-civ=tatars] .ttas2{transform-box:fill-box;transform-origin:50% 0;animation:tTas 1.200s calc(var(--i,0)*-.5s) ease-in-out infinite alternate}
@keyframes tTas{from{transform:rotate(8deg)}to{transform:rotate(-12deg)}}
#stage[data-civ=tatars] .tstr{animation:tStr 1.150s ease-in-out infinite alternate}
@keyframes tStr{to{d:path("M58 126C72 133 86 119 104 128L98 135 104 142C86 135 72 147 58 140Z")}}
#stage[data-civ=tatars] .tstr2{animation:tStr2 1.150s ease-in-out infinite alternate}
@keyframes tStr2{to{d:path("M60 133C73 140 87 126 99 135")}}
#stage[data-civ=tatars] .tstr3{animation:tStr3 1.150s ease-in-out infinite alternate}
@keyframes tStr3{to{d:path("M60 128C73 135 86 121.500 100 130.500")}}
#stage[data-civ=tatars] .tstrp{animation:tStrP 1s ease-in-out infinite alternate}
@keyframes tStrP{to{d:path("M21 10C26 14 29 7 34 13L32 17 34 21C29 17 26 23 21 18Z")}}
#stage[data-civ=tatars] .tglint{opacity:0;animation:tGlint 3.400s ease-in-out infinite}
@keyframes tGlint{0%,100%{opacity:0;transform:translateY(0)}20%{opacity:1}45%{opacity:0;transform:translateY(28px)}}
#stage[data-civ=tatars] .tfeath{transform-box:view-box;transform-origin:92px 38px;animation:tFeath 2.300s ease-in-out infinite alternate}
@keyframes tFeath{from{transform:rotate(-3deg)}to{transform:rotate(7deg)}}
#stage[data-civ=tatars] .tbag{transform-box:fill-box;transform-origin:50% 0;animation:tBag 3.400s calc(var(--i)*-1.300s) ease-in-out infinite alternate}
@keyframes tBag{from{transform:rotate(-1.500deg)}to{transform:rotate(1.500deg)}}
#stage[data-civ=tatars] .tloop{transform-box:view-box;transform-origin:506px 6px;animation:tLoop 2.600s ease-in-out infinite alternate}
@keyframes tLoop{from{transform:rotate(8deg)}to{transform:rotate(-10deg)}}
#stage[data-civ=tatars] .tend{transform-box:fill-box;transform-origin:50% 0;animation:tTas 1.700s ease-in-out infinite alternate}
`;

export default {
  id: 'tatars', name: 'Tatars', kit: 'steppe',
  accent: '#4fd6ff', accent2: '#1f97c9', cloth: '#26407a', metal: '#cfd6de',
  standard, pennant, costume, css, frame,
};
