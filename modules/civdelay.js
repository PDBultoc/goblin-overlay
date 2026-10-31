// civdelay: pure helper + settings holder. Renders nothing.
// Hides opponents' civs ('?') for the first N minutes when the match has hideCivs.

export function visibleCiv(match, player, nowMs, minutes) {
  if (!match || !player) return '?';
  if (!match.hideCivs || !(minutes > 0)) return player.civ;
  if ((match.myTeam || []).some((p) => p.profileId === player.profileId)) return player.civ;
  const started = Date.parse(match.started);
  if (!Number.isFinite(started)) return player.civ;
  return nowMs < started + minutes * 60000 ? '?' : player.civ;
}

// Minutes to use from a settings snapshot (0 when the module is disabled).
export function civMinutes(cfgAll) {
  const c = cfgAll && cfgAll.modules && cfgAll.modules.civdelay;
  return c && c.enabled ? Number(c.minutes) || 0 : 0;
}

// true while at least one player's civ is still masked.
export function anyHidden(match, nowMs, minutes) {
  if (!match) return false;
  const all = [...(match.myTeam || []), ...(match.enemies || []).flat()];
  return all.some((p) => visibleCiv(match, p, nowMs, minutes) === '?');
}

export function mount() {
  return { unmount() {} };
}
