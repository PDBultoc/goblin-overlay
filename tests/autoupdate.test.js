import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldReload, startAutoUpdate } from '../core/autoupdate.js';

test('shouldReload only on a real version change', () => {
  assert.equal(shouldReload('a', 'b'), true);
  assert.equal(shouldReload('a', 'a'), false);
  assert.equal(shouldReload(null, 'b'), false);
  assert.equal(shouldReload('a', undefined), false);
});

test('reloads after the published version changes, not before; respects canReload', async () => {
  let v = 'v1', reloads = 0, busy = false;
  const fetchFn = async () => ({ ok: true, json: async () => ({ v }) });
  const u = startAutoUpdate({ url: 'x', everyMs: 1e9, fetchFn, reload: () => reloads++, canReload: () => !busy });
  await u.check();            // first check(s) just learn the loaded version
  assert.equal(reloads, 0);
  v = 'v2'; busy = true;
  await u.check();
  assert.equal(reloads, 0);   // user is typing: wait
  busy = false;
  await u.check();
  assert.equal(reloads, 1);
  u.stop();
});
