// CIV layer: Jurchens (kit: steppe). Pink accent, dark iron-blue cloth, iron. A white gyrfalcon on a perch-standard
// that mantles its wing now and then, with leather jesses and bells and streamers in the wind; a lamellar helmet
// with a tall spike and a long queue braid swinging behind; a panel of laced iron lamellae hung by the pole and a
// sable pelt draped over the felt roll. All drawings are our own.

const standard = `<svg width="110" height="230" viewBox="0 0 110 230">
  <defs>
    <linearGradient id="jurFal" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef0f2"/><stop offset="1" stop-color="#b9c0c8"/></linearGradient>
    <linearGradient id="jurBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a32"/><stop offset="1" stop-color="#2a1a10"/></linearGradient>
  </defs>
  <g class="fin" style="--d:1.900">
    <g transform="translate(14 0)"><path class="jstr a" d="M80 47C90 52 98 44 108 52L108 58C98 50 90 58 80 53Z" fill="var(--civ)" stroke="#6a1a38" stroke-width=".7"/>
    <path class="jstr b" d="M80 50C88 58 96 54 104 62L102 66C94 58 88 62 80 55Z" fill="var(--civ3)" stroke="#000" stroke-width=".7"/></g>
    <g transform="translate(52 0)"><g class="jhang"><path d="M34.500 50c-2 10 2 18 0 30" stroke="var(--civ)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M37.500 50c1 8-2 14 0 22" stroke="var(--civ3)" stroke-width="2.400" fill="none" stroke-linecap="round"/></g></g>
  </g>
  <g class="pc" style="--sc:.2;--dy:30px;--d:1.150">
    <path d="M52 50V40h6v10z" fill="#3a3f45" stroke="#14181c" stroke-width=".6"/>
    <path d="M58 64L82 49.500" stroke="url(#jurBar)" stroke-width="3" stroke-linecap="round"/>
    <g transform="translate(22 0)"><g class="jfal">
      <path d="M48 19C44 25 44 35 49 41C53 44.500 58 45.500 63 44.500L71 61 75 59 68 42C70 33 67 24 58 18Z" fill="url(#jurFal)" stroke="#3b4450" stroke-width=".9" stroke-linejoin="round"/>
      <path d="M50 26l1.500 1 1.500-1M54 30l1.500 1 1.500-1M49 33l1.500 1 1.500-1M53 37l1.500 1 1.500-1M66 48l1.500 1 1.500-1M68 52l1.500 1 1.500-1" stroke="#4a5462" stroke-width=".8" fill="none"/>
      <g class="jwing">
        <path d="M58 20C66 22 71 32 69 44L73 56C64 50 58 40 56 30Z" fill="url(#jurFal)" stroke="#3b4450" stroke-width=".9" stroke-linejoin="round"/>
        <path d="M60 27l1.500 1 1.500-1M63 33l1.500 1 1.500-1M62 39l1.500 1 1.500-1M66 45l1.500 1 1.500-1" stroke="#4a5462" stroke-width=".8" fill="none"/>
        <path d="M69 44L73 56C70 54 68 52 66 49Z" fill="#4a5462"/>
      </g>
      <path d="M46.500 12.500C47.500 9.500 50.500 8.500 53.500 9.200 56.500 10 57.500 13 57 16.500 56 19.500 53 20.500 50 20 47.500 19 46.300 15.500 46.500 12.500Z" fill="url(#jurFal)" stroke="#3b4450" stroke-width=".9"/>
      <path d="M48 10.500c2-1.300 5-1.500 8 .5" stroke="#8a94a0" stroke-width="1.100" fill="none"/>
      <path d="M47.200 12.300L42 14.600C42.500 15.200 43.200 15.400 43.800 15.300L44.300 17.300 47 16.800Z" fill="#3b4450"/><path d="M46.800 12.400l.6 4.200" stroke="#e8b830" stroke-width="1.300"/>
      <circle cx="49.800" cy="13.300" r="1.500" fill="#141414" stroke="#e8b830" stroke-width=".5"/><circle cx="49.400" cy="12.800" r=".45" fill="#fff"/>
      <path d="M49.600 15.300c-.6 1.800-.4 3.200.6 4.600" stroke="#3b4450" stroke-width="1.400" fill="none" stroke-linecap="round"/>
    </g></g>
    <rect x="55" y="43.500" width="42" height="6.500" rx="3.200" fill="url(#jurBar)" stroke="#120a04" stroke-width=".8"/>
    <path d="M64 43.500l-3 6.500M70 43.500l-3 6.500M76 43.500l-3 6.500M88 43.500l-3 6.500M94 43.500l-3 6.500" stroke="var(--civ)" stroke-width="1.200"/>
    <path d="M71.500 44.500h4M77.500 44.500h4M73.500 41v3.500M79.500 42v2.500" stroke="#e8b830" stroke-width="1.600" stroke-linecap="round"/>
  </g>
  <g class="fin" style="--d:1.700">
    <g transform="translate(22 0)"><g class="jjess"><path d="M52 46c-1 8 1 14-1 22M57.500 46c1 7-1 12 1 20" stroke="#7a4a26" stroke-width="1.400" fill="none"/>
      <circle cx="51" cy="70" r="2.300" fill="#e7b944" stroke="#6b4a10" stroke-width=".6"/><circle cx="58.500" cy="68" r="2.300" fill="#e7b944" stroke="#6b4a10" stroke-width=".6"/>
      <path d="M49.500 70.800h3M57 68.800h3" stroke="#6b4a10" stroke-width=".7"/></g></g>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="5" y="0" width="24" height="6" rx="3" fill="#4a3220" stroke="#120a04"/><path d="M9 0l-2 6M15 0l-2 6M21 0l-2 6M27 0l-2 6" stroke="var(--civ)" stroke-width="1"/>
  <g class="unroll" style="--d:1.600">
    <path class="jpst" d="M10 6C6 26 14 44 9 70L13 70C18 44 10 26 14 6Z" fill="var(--civ)" stroke="#6a1a38" stroke-width=".6"/>
    <path class="jpst b" d="M18 6C14 22 22 38 18 60L22 60C26 38 18 22 22 6Z" fill="var(--civ3)" stroke="#000" stroke-width=".6"/>
    <g class="jhang"><path d="M27 6c3 6 3 12 1 18" stroke="#7a4a26" stroke-width="1.200" fill="none"/>
      <path d="M28 24C24 32 25 44 29 50 33 44 33 32 28 24Z" fill="#fff" stroke="#8a94a0" stroke-width=".6"/><path d="M28 26v22M26.500 33l3 1M26 38l3.500 1M26.500 43l3 1" stroke="#4a5462" stroke-width=".6"/></g>
  </g>
</svg>`;

// lamellar panel hung from the pole's upper crossbar; sable pelt over the felt roll
const lamellae = (() => { let s = ''; for (let row = 0; row < 8; row++) { const y = 58 + row * 11.500;
  for (let c = 0; c < 5; c++) { const x = 420 + c * 4.800; s += `<rect x="${x.toFixed(1)}" y="${y}" width="4.800" height="12.500" rx="1.600" fill="url(#jurLm)" stroke="#161b20" stroke-width=".55"/><circle cx="${(x + 2.400).toFixed(1)}" cy="${y + 2.500}" r=".55" fill="#161b20"/>`; }
  s += `<path d="M420 ${y + 10.500}h24" stroke="var(--civ)" stroke-width="1.100" stroke-dasharray="1.600 3.200"/>`; } return s; })();

const frame = `
<defs>
  <linearGradient id="jurLm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8d0d8"/><stop offset=".45" stop-color="#7d8792"/><stop offset="1" stop-color="#3a424c"/></linearGradient>
  <linearGradient id="jurLmSh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="jurSab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6c40"/><stop offset=".5" stop-color="#5e3c22"/><stop offset="1" stop-color="#2e1c0e"/></linearGradient>
  <clipPath id="jurLmClip"><rect x="420" y="58" width="24" height="94"/></clipPath>
  <filter id="jurFurF" x="-6%" y="-20%" width="112%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="1.100" numOctaves="2" seed="11"/><feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs>
<g class="pc" style="--dy:-60px;--d:1.100;--o:0">
  <path d="M424 50l-1 8M440 50l1 8" stroke="var(--civ)" stroke-width="1.400"/>
  <g class="jlam">${lamellae}
    <g clip-path="url(#jurLmClip)"><rect class="jsheen" x="400" y="58" width="14" height="94" fill="url(#jurLmSh)"/></g>
    <path d="M420 152l4 6M427 152l1 7M434 152l-1 7M441 152l-3 6" stroke="var(--civ)" stroke-width="1.300" stroke-linecap="round"/>
  </g>
</g>
<g class="pc" style="--dy:-80px;--r:6deg;--d:1.000;--o:0">
  <path d="M30 -36C50 -43 100 -43 122 -34C124 -28 118 -24 110 -26C90 -30 60 -30 40 -26C32 -24 28 -30 30 -36Z" fill="url(#jurSab)" stroke="#140a04" stroke-width=".9" filter="url(#jurFurF)"/>
  <path d="M42 -38c20-3 50-3 70 0" stroke="#c8a070" stroke-width="1" fill="none" opacity=".55"/>
  <path d="M40 -35c12-3 50-4 72-1M44 -31c14-2 40-2 60 0" stroke="#6a4a32" stroke-width="1.100" fill="none" stroke-dasharray="3 2.400"/>
  <path d="M31 -37C23 -36 18 -27 20 -18C22 -13 28 -13 30 -17C32 -23 35 -30 37 -33Z" fill="url(#jurSab)" stroke="#140a04" stroke-width=".8"/>
  <path d="M24 -24c1 3 3 4 5 3" stroke="#d9a860" stroke-width="2.200" fill="none" stroke-linecap="round"/>
  <path d="M27.500 -35l-2-4 3.500 1.500M33 -36l.5-4 2 3" fill="#33210f" stroke="#140a04" stroke-width=".6"/>
  <circle cx="22.800" cy="-17" r="1.100" fill="#000"/><circle cx="26.600" cy="-27" r=".8" fill="#000"/>
  <path d="M52 -29c1 5 0 9 1 13M58 -29c0 5 1 9 0 13M92 -29c1 5 0 9 1 13M98 -29c0 5 1 9 0 13" stroke="#2a1a0c" stroke-width="2.600" stroke-linecap="round"/>
  <g class="jtail"><path d="M118 -32C125 -24 125 -12 121 -3 119 -1 116 -3 116 -7 118 -15 116 -24 112 -30Z" fill="#2c1c10" stroke="#140a04" stroke-width=".8" filter="url(#jurFurF)"/></g>
</g>`;

// queue braid: ellipses along a curve behind the head
const braid = (() => { const P = [[92, 32], [113, 36], [119, 66], [121, 94]]; let s = '';
  const at = (t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  for (let i = 0; i <= 15; i++) { const t = i / 15, [x, y] = at(t), [x2, y2] = at(Math.min(1, t + .01)), a = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI, o = i % 2 ? 1 : -1;
    s += `<ellipse cx="${(x + o * .9).toFixed(1)}" cy="${y.toFixed(1)}" rx="3.400" ry="2.100" transform="rotate(${(a + o * 35).toFixed(0)} ${(x + o * .9).toFixed(1)} ${y.toFixed(1)})" fill="#2a1d16" stroke="#9a8068" stroke-width=".6"/>`; }
  return s; })();

const bowl = 'M42 46C40 30 52 19 70 18C88 19 100 30 98 46Z';
const lamRows = (() => { let s = ''; for (let row = 0, y = 17; y < 46; y += 6, row++) for (let x = 38 + (row % 2) * 2.200; x < 102; x += 4.400)
  s += `<rect x="${x.toFixed(1)}" y="${y}" width="4.400" height="6.800" rx="1.400"/>`; return s; })();

const costume = {
  back: `<g class="jbraid">${braid}<path d="M118.500 88h5" stroke="var(--civ)" stroke-width="2.400" stroke-linecap="round"/><path d="M119.500 90c-1 3 0 6-1 8M121 90v8M122.500 90c1 3 0 6 1 8" stroke="#1a1410" stroke-width="1.100"/></g>`,
  front: `
  <defs>
    <clipPath id="jurBowlClip"><path d="${bowl}"/></clipPath>
    <linearGradient id="jurHLm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8d0d8"/><stop offset="1" stop-color="#4a525c"/></linearGradient>
  </defs>
  <g class="jtas"><path d="M71 -14c6-2 10 2 16 0M71 -13c5 1 9 5 14 5M71 -12c3 3 5 7 9 9" stroke="var(--civ)" stroke-width="1.600" fill="none" stroke-linecap="round"/></g>
  <path d="M68.600 18L69.600 -15h.8L71.400 18Z" fill="#8f9aa6" stroke="#232a31" stroke-width=".6"/>
  <rect x="68" y="-17" width="4" height="5" rx="1" fill="var(--civ)" stroke="#6a1a38" stroke-width=".5"/>
  <ellipse cx="70" cy="4" rx="2.600" ry="1.500" fill="#8f9aa6" stroke="#232a31" stroke-width=".6"/>
  <path d="M36 46h9l.6 20-9.600 2.500zM104 46h-9l-.6 20 9.600 2.500z" fill="#6e7882" stroke="#232a31" stroke-width=".8"/>
  <path d="M36.500 51.500h9M36.700 56.500h9M37 61.500h8.800M103.500 51.500h-9M103.300 56.500h-9M103 61.500h-8.800" stroke="#232a31" stroke-width=".7"/>
  <path d="M40.500 46v21M99.500 46v21" stroke="#232a31" stroke-width=".5" opacity=".6"/>
  <path d="${bowl}" fill="#5a646e" stroke="#1c2228" stroke-width="1.100"/>
  <g clip-path="url(#jurBowlClip)" fill="url(#jurHLm)" stroke="#1c2228" stroke-width=".5">${lamRows}</g>
  <path d="M46 29h48M43 35h54M42 41h56" stroke="var(--civ)" stroke-width=".9" stroke-dasharray="1.200 3.200" clip-path="url(#jurBowlClip)"/>
  <ellipse cx="70" cy="17.500" rx="7" ry="2.200" fill="#8f9aa6" stroke="#232a31" stroke-width=".7"/>
  <path d="M40 49C52 43 88 43 100 49L100 44C88 38 52 38 40 44Z" fill="#3a424c" stroke="#161b20" stroke-width=".9"/>
  <path d="M42 46.500l3-2.400 3 2.400 3-2.400 3 2.400 3-2.400 3 2.400 3-2.400 3 2.400 3-2.400 3 2.400 3-2.400 3 2.400 3-2.400 3 2.400 3-2.400 3 2.400 3-2.400 3 2.400" stroke="var(--civ)" stroke-width=".9" fill="none"/>
  <path class="jshine" d="M50 26c4-4 9-6 14-6.500" stroke="#fff" stroke-width="1.400" fill="none" stroke-linecap="round"/>`,
};

const css = `
#stage[data-civ=jurchens] .gob.dressed .tuft{opacity:0}
#stage[data-civ=jurchens] .jstr.a{animation:jStrA 1.150s ease-in-out infinite alternate}
#stage[data-civ=jurchens] .jstr.b{animation:jStrB .95s -.4s ease-in-out infinite alternate}
@keyframes jStrA{to{d:path("M80 47C90 42 98 56 108 46L108 52C98 62 90 48 80 53Z")}}
@keyframes jStrB{to{d:path("M80 50C88 50 96 62 104 56L102 60C94 66 88 54 80 55Z")}}
#stage[data-civ=jurchens] .jhang,#stage[data-civ=jurchens] .jjess{transform-box:fill-box;transform-origin:50% 0;animation:jHang 1.500s ease-in-out infinite alternate}
#stage[data-civ=jurchens] .jjess{animation-duration:1.900s;animation-delay:-.7s}
@keyframes jHang{from{transform:rotate(7deg)}to{transform:rotate(-12deg)}}
#stage[data-civ=jurchens] .jwing{transform-box:view-box;transform-origin:58px 21px;animation:jWing 4.600s ease-in-out infinite}
@keyframes jWing{0%,62%,100%{transform:none}70%{transform:rotate(-38deg)}76%{transform:rotate(-22deg)}82%{transform:rotate(-40deg)}90%{transform:none}}
#stage[data-civ=jurchens] .jfal{transform-box:view-box;transform-origin:55px 44px;animation:jFal 4.600s ease-in-out infinite}
@keyframes jFal{0%,60%,100%{transform:none}68%{transform:rotate(-4deg) translateY(-1px)}88%{transform:rotate(1deg)}}
#stage[data-civ=jurchens] .jpst{transform-box:fill-box;transform-origin:50% 0;animation:jHang 1.300s ease-in-out infinite alternate}
#stage[data-civ=jurchens] .jpst.b{animation-delay:-.6s}
#stage[data-civ=jurchens] .jlam{transform-box:view-box;transform-origin:432px 50px;animation:jLam 3.400s ease-in-out infinite alternate}
@keyframes jLam{from{transform:rotate(1.500deg)}to{transform:rotate(-1.500deg)}}
#stage[data-civ=jurchens] .jsheen{animation:jSheen 3.800s ease-in-out infinite}
@keyframes jSheen{0%,30%{transform:translateX(0)}80%,100%{transform:translateX(60px)}}
#stage[data-civ=jurchens] .jtail{transform-box:fill-box;transform-origin:30% 0;animation:jHang 2.400s ease-in-out infinite alternate}
#stage[data-civ=jurchens] .jbraid{transform-box:view-box;transform-origin:92px 32px;animation:jBraid 2.200s ease-in-out infinite alternate}
@keyframes jBraid{from{transform:rotate(3deg)}to{transform:rotate(-5deg)}}
#stage[data-civ=jurchens] .jtas{transform-box:fill-box;transform-origin:0 50%;animation:jTas .6s ease-in-out infinite alternate}
@keyframes jTas{from{transform:skewY(-12deg) scaleX(.9)}to{transform:skewY(10deg) scaleX(1.100)}}
#stage[data-civ=jurchens] .jshine{animation:jShine 3s ease-in-out infinite}
@keyframes jShine{0%,100%{opacity:.15}50%{opacity:.85}}
`;

export default {
  id: 'jurchens', name: 'Jurchens', kit: 'steppe',
  accent: '#ff6fa0', accent2: '#d8457c', cloth: '#22303f', metal: '#8f9aa6',
  standard, pennant, costume, css, frame,
};
