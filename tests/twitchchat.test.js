import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLine, connect } from '../core/twitchchat.js';

const MSG = '@badge-info=;color=#FF4500;display-name=Viking_Bob;emotes=;id=abc :viking_bob!viking_bob@viking_bob.tmi.twitch.tv PRIVMSG #swedishgoblin :wololo goblin';

test('parseLine PRIVMSG with tags', () => {
  const m = parseLine(MSG);
  assert.equal(m.user, 'Viking_Bob');
  assert.equal(m.color, '#FF4500');
  assert.equal(m.text, 'wololo goblin');
  assert.equal(m.emotes, '');
});

test('parseLine without color uses stable hash colour and nick', () => {
  const l = '@display-name=;emotes=25:0-4 :bob!bob@bob.tmi.twitch.tv PRIVMSG #c :Kappa hi : x';
  const a = parseLine(l), b = parseLine(l);
  assert.equal(a.user, 'bob');
  assert.match(a.color, /^#[0-9a-f]{6}$|^hsl\(/i);
  assert.equal(a.color, b.color);
  assert.equal(a.text, 'Kappa hi : x');
  assert.equal(a.emotes, '25:0-4');
});

test('parseLine handles \\s escapes and no-tag lines', () => {
  const m = parseLine('@display-name=A\\sB;color=#00FF00 :a!a@a.tmi.twitch.tv PRIVMSG #c :yo\r');
  assert.equal(m.user, 'A B');
  assert.equal(m.text, 'yo');
  const n = parseLine(':zed!zed@zed.tmi.twitch.tv PRIVMSG #c :plain');
  assert.equal(n.user, 'zed');
});

test('parseLine returns null for non-PRIVMSG', () => {
  assert.equal(parseLine('PING :tmi.twitch.tv'), null);
  assert.equal(parseLine('@room-id=1;slow=0 :tmi.twitch.tv ROOMSTATE #swedishgoblin'), null);
  assert.equal(parseLine(''), null);
});

function harness() {
  const sockets = [];
  class FakeWS {
    constructor(url) { this.url = url; this.sent = []; this.closed = false; sockets.push(this); }
    send(s) { this.sent.push(s); }
    close() { this.closed = true; }
  }
  const timers = [];
  const setTimer = (fn, ms) => { timers.push({ fn, ms }); return timers.length; };
  return { sockets, FakeWS, timers, setTimer };
}

test('connect handshake, PING/PONG, message dispatch', () => {
  const h = harness();
  const msgs = [], st = [];
  const c = connect({ channel: 'SwedishGoblin', onMessage: m => msgs.push(m), onStatus: s => st.push(s), WS: h.FakeWS, setTimer: h.setTimer });
  const ws = h.sockets[0];
  assert.equal(ws.url, 'wss://irc-ws.chat.twitch.tv:443');
  ws.onopen();
  assert.equal(ws.sent[0], 'CAP REQ :twitch.tv/tags twitch.tv/commands');
  assert.equal(ws.sent[1], 'PASS SCHMOOPIIE');
  assert.match(ws.sent[2], /^NICK justinfan\d{4,5}$/);
  const n = Number(ws.sent[2].slice(14));
  assert.ok(n >= 1000 && n <= 80999);
  assert.equal(ws.sent[3], 'JOIN #swedishgoblin');
  assert.equal(st.at(-1).ok, true);
  assert.equal(st.at(-1).source, 'chat');
  ws.onmessage({ data: 'PING :tmi.twitch.tv\r\n' });
  assert.equal(ws.sent.at(-1), 'PONG :tmi.twitch.tv');
  ws.onmessage({ data: MSG + '\r\n:tmi.twitch.tv 366 x\r\n' });
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].text, 'wololo goblin');
  c.close();
  assert.ok(ws.closed);
});

test('connect reconnects with doubling backoff, none after close()', () => {
  const h = harness();
  const st = [];
  const c = connect({ channel: 'x', onMessage() {}, onStatus: s => st.push(s), WS: h.FakeWS, setTimer: h.setTimer });
  h.sockets[0].onclose();
  assert.equal(h.timers.length, 1);
  assert.equal(h.timers[0].ms, 2000);
  assert.equal(st.at(-1).ok, false);
  h.timers[0].fn();
  assert.equal(h.sockets.length, 2);
  h.sockets[1].onclose();
  assert.equal(h.timers[1].ms, 4000);
  let i = 2;
  for (; i < 10; i++) { h.timers[i - 1].fn(); h.sockets[i].onclose(); }
  assert.equal(h.timers.at(-1).ms, 60000);
  c.close();
  const before = h.timers.length;
  h.sockets.at(-1).onclose();
  assert.equal(h.timers.length, before);
});
