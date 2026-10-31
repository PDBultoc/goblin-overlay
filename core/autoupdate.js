// Reload the page when a new version is published (version.json changes), so the
// Streamlabs/OBS browser source and the panel never keep running old code.
// Settings live in storage, Monk Mode resumes from startedAt, and the match intro
// does not replay after a reload, so reloading is safe.

// Pure: should we reload? Only when both versions are known and they differ.
export function shouldReload(loaded, latest) {
  return Boolean(loaded) && Boolean(latest) && String(loaded) !== String(latest);
}

export function startAutoUpdate({
  url = new URL('../version.json', import.meta.url).href,
  everyMs = 120000,
  canReload = () => true,
  reload = () => location.reload(),
  fetchFn = globalThis.fetch,
} = {}) {
  let loaded = null;
  const check = async () => {
    try {
      const r = await fetchFn(url + '?t=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) return;
      const v = (await r.json()).v;
      if (loaded === null) { loaded = v; return; }
      if (shouldReload(loaded, v) && canReload()) reload();
    } catch { /* offline or not deployed: try again next time */ }
  };
  check();
  const id = setInterval(check, everyMs);
  return { stop: () => clearInterval(id), check };
}
