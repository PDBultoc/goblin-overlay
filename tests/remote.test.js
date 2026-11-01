import test from 'node:test';
import assert from 'node:assert/strict';
import { topicFor, newRoom, stripSecrets, createRemote } from '../core/remote.js';

test('room codes are long, random, url-safe; topic is namespaced', () => {
  const a = newRoom(), b = newRoom();
  assert.match(a, /^[a-z0-9]{24}$/);
  assert.notEqual(a, b);
  assert.equal(topicFor('abc'), 'goblin-abc');
});

test('the Streamlabs token never leaves the machine', () => {
  const s = { modules: { alerts: { enabled: false, streamlabsToken: 'SECRET' }, cam: { name: 'x' } } };
  const out = stripSecrets(s);
  assert.equal('streamlabsToken' in out.modules.alerts, false);
  assert.equal(s.modules.alerts.streamlabsToken, 'SECRET'); // input untouched
});

class FakeES {
  static last = null;
  constructor(url) { this.url = url; FakeES.last = this; }
  close() { this.closed = true; }
}

test('start() loads the latest cached settings, then live messages arrive', async () => {
  const got = [];
  const fetchFn = async (url) => ({
    ok: true,
    text: async () => [
      JSON.stringify({ event: 'open' }),
      JSON.stringify({ event: 'message', message: JSON.stringify({ _rev: 1, glass: 0.3 }) }),
      JSON.stringify({ event: 'message', message: JSON.stringify({ _rev: 2, glass: 0.4 }) }),
    ].join('\n'),
    url,
  });
  const r = createRemote({ room: 'r1', fetchFn, ES: FakeES, onSettings: (s) => got.push(s.glass) });
  await r.start();
  assert.deepEqual(got, [0.4]);                       // only the newest cached snapshot
  assert.match(FakeES.last.url, /^https:\/\/ntfy\.sh\/goblin-r1\/sse/);
  FakeES.last.onmessage({ data: JSON.stringify({ event: 'message', message: JSON.stringify({ _rev: 3, glass: 0.5 }) }) });
  assert.deepEqual(got, [0.4, 0.5]);
  FakeES.last.onmessage({ data: 'not json' });        // junk is ignored
  r.stop();
  assert.equal(FakeES.last.closed, true);
});

test('publish() posts stripped settings to the room topic, debounced', async () => {
  const posts = [];
  const timers = [];
  const fetchFn = async (url, opt) => { posts.push({ url, body: opt && opt.body }); return { ok: true, text: async () => '' }; };
  const r = createRemote({
    room: 'r2', fetchFn, ES: FakeES, onSettings() {},
    setTimer: (fn) => { timers.push(fn); return timers.length; }, clearTimer: () => {},
  });
  r.publish({ _rev: 5, modules: { alerts: { streamlabsToken: 'SECRET' } } });
  r.publish({ _rev: 6, modules: { alerts: { streamlabsToken: 'SECRET' } } });
  assert.equal(posts.length, 0);
  await timers.at(-1)();
  assert.equal(posts.length, 1);
  assert.equal(posts[0].url, 'https://ntfy.sh/goblin-r2');
  assert.equal(JSON.parse(posts[0].body)._rev, 6);
  assert.ok(!posts[0].body.includes('SECRET'));
});

test('no room → inert (no network at all)', async () => {
  let called = false;
  const r = createRemote({ room: '', fetchFn: async () => { called = true; }, ES: FakeES, onSettings() {} });
  await r.start();
  r.publish({ _rev: 1 });
  assert.equal(called, false);
});
