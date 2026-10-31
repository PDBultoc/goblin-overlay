// Anonymous Twitch chat reader (browser module, no node imports).
const URL = 'wss://irc-ws.chat.twitch.tv:443';

function unescapeTag(v) {
  return v.replace(/\\(s|:|\\|r|n)/g, (_, c) => ({ s: ' ', ':': ';', '\\': '\\', r: '\r', n: '\n' }[c]));
}

function hashColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360}, 70%, 65%)`;
}

export function parseLine(line) {
  if (typeof line !== 'string') return null;
  let s = line.replace(/[\r\n]+$/, '');
  const tags = {};
  if (s[0] === '@') {
    const sp = s.indexOf(' ');
    if (sp < 0) return null;
    for (const kv of s.slice(1, sp).split(';')) {
      const eq = kv.indexOf('=');
      if (eq < 0) tags[kv] = '';
      else tags[kv.slice(0, eq)] = unescapeTag(kv.slice(eq + 1));
    }
    s = s.slice(sp + 1);
  }
  const m = /^:([^!\s]+)![^ ]* PRIVMSG #[^ ]+ :(.*)$/.exec(s);
  if (!m) return null;
  const nick = m[1];
  const user = tags['display-name'] || nick;
  const color = tags.color || hashColor(nick);
  return { user, color, text: m[2], emotes: tags.emotes || '' };
}

export function connect({ channel, onMessage, onStatus, WS = globalThis.WebSocket, setTimer = setTimeout } = {}) {
  const chan = String(channel || '').toLowerCase().replace(/^#/, '');
  let ws = null, closed = false, delay = 2000;
  const status = (ok, reason) => { try { onStatus && onStatus({ source: 'chat', ok, reason }); } catch {} };

  function open() {
    if (closed) return;
    try { ws = new WS(URL); } catch (e) { status(false, String(e && e.message || e)); return retry(); }
    const mine = ws;
    ws.onopen = () => {
      const nick = 'justinfan' + (1000 + Math.floor(Math.random() * 80000));
      mine.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
      mine.send('PASS SCHMOOPIIE');
      mine.send('NICK ' + nick);
      mine.send('JOIN #' + chan);
      delay = 2000;
      status(true, 'connected');
    };
    ws.onmessage = ev => {
      for (const line of String(ev.data).split(/\r?\n/)) {
        if (!line) continue;
        if (line.startsWith('PING')) { mine.send('PONG :tmi.twitch.tv'); continue; }
        const msg = parseLine(line);
        if (msg && onMessage) { try { onMessage(msg); } catch {} }
      }
    };
    ws.onerror = () => status(false, 'error');
    ws.onclose = () => {
      if (closed || mine !== ws) return;
      status(false, 'closed');
      retry();
    };
  }
  function retry() {
    if (closed) return;
    const d = delay;
    delay = Math.min(delay * 2, 60000);
    setTimer(open, d);
  }
  open();
  return {
    close() {
      closed = true;
      if (ws) { try { ws.close(); } catch {} }
    },
  };
}
