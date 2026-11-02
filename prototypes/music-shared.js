// Shared bits for the three music-widget prototypes: a fake "now playing" and a
// fake audio signal (spectrum + waveform) so the visuals can be judged before
// any real audio source is wired. Real data replaces getSpectrum()/getWave() later.
export const NOW = { title: 'Sabaton — The Last Stand', artist: 'Sabaton', album: 'The Last Stand', progress: 0.37, duration: 238 };

let t0 = performance.now();
const beat = (t) => Math.pow(Math.max(0, Math.sin(t * Math.PI * 2 * 2.1)), 6); // ~126 bpm kick

export function getSpectrum(n = 48) {
  const t = (performance.now() - t0) / 1000;
  const k = beat(t);
  return Array.from({ length: n }, (_, i) => {
    const f = i / n;
    const base = Math.exp(-f * 2.2) * (0.55 + 0.45 * k);
    const wob = 0.25 * Math.abs(Math.sin(t * (3 + i * 0.37) + i * 1.7)) * (1 - f * 0.6);
    return Math.min(1, base + wob + 0.05 * Math.random());
  });
}

export function getWave(n = 256) {
  const t = (performance.now() - t0) / 1000;
  const k = beat(t);
  return Array.from({ length: n }, (_, i) => {
    const x = i / n;
    return (0.35 + 0.5 * k) * Math.sin(x * 22 + t * 9) * Math.sin(x * Math.PI)
      + 0.18 * Math.sin(x * 61 - t * 13) + 0.05 * (Math.random() - 0.5);
  });
}

export function cover(size = 96) {
  // Placeholder album art (a real one comes from Spotify's image URL).
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, size, size);
  gr.addColorStop(0, '#2b0f0a'); gr.addColorStop(1, '#8a1d10');
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  g.fillStyle = '#e8c27a'; g.font = `800 ${size * 0.2}px Oxanium, sans-serif`; g.textAlign = 'center';
  g.fillText('SABATON', size / 2, size * 0.58);
  return c.toDataURL();
}

// ?crop shows only the widget at 1:1 (used by music-compare.html), else fit the whole 1920×1080 stage.
export function stageFit(stage) {
  if (location.search.includes('crop')) { stage.style.transform = 'translate(-895px,-918px)'; return; }
  const fit = () => { const s = Math.min(innerWidth / 1920, innerHeight / 1080); stage.style.transform = `scale(${s})`; };
  addEventListener('resize', fit); fit();
}

export const fmt =(s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
