// OBS dock panel. Pure helpers are exported (node-testable); the UI boots only in a browser.
import { createSettings } from './core/settings.js';
import { createBus } from './core/bus.js';
import { startAutoUpdate } from './core/autoupdate.js';

export const MODULE_ORDER = ['cam', 'matchbar', 'series', 'intro', 'result', 'civdelay', 'goal', 'challenges', 'messages', 'chat', 'alerts', 'monk'];

export function fmtMMSS(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export function monkRemainingMs(startedAt, minutes, now = Date.now()) {
  if (startedAt == null) return null;
  return Math.max(0, startedAt + minutes * 60000 - now);
}

// match payload (bus match-start / match-update) -> {id, name, since} or null
export function currentOpponent(payload) {
  const m = payload && payload.match;
  const e = m && m.enemies && m.enemies[0] && m.enemies[0][0];
  if (!e || e.profileId == null) return null;
  return { id: e.profileId, name: e.name || String(e.profileId), since: m.started ?? null };
}

function boot() {
  const settings = createSettings(localStorage, 'goblin.v1');
  const bus = createBus();
  const $ = (id) => document.getElementById(id);
  const refreshers = [];
  let lastMatch = null;
  let opponentName = null;

  const write = (path, value) => {
    settings.set(path, value);
    bus.emit('settings', settings.get());
  };
  const getp = (path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), settings.get());

  function el(tag, props = {}, kids = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'text') n.textContent = v;
      else if (k === 'class') n.className = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const c of [].concat(kids)) if (c) n.append(c);
    return n;
  }

  let uid = 0;
  // Bound input. kind: text | number | password | select; commits on change.
  function field(label, path, kind = 'text', opts = {}) {
    const id = 'f' + uid++;
    let input;
    if (kind === 'select') {
      input = el('select', { id }, opts.options.map((o) => el('option', { value: String(o), text: String(o) })));
    } else {
      input = el('input', { id, type: kind, ...(opts.attrs || {}) });
    }
    const show = () => { if (document.activeElement !== input) input.value = getp(path) ?? ''; };
    input.addEventListener('change', () => {
      let v = input.value;
      if (kind === 'number' || (kind === 'select' && opts.numeric)) {
        v = Number(v);
        if (!Number.isFinite(v)) { show(); return; }
      }
      write(path, v);
    });
    refreshers.push(show); show();
    const kids = [el('label', { for: id, text: label }), input];
    if (kind === 'password') {
      kids.push(el('button', { type: 'button', text: 'Show', onclick: (e) => {
        const hide = input.type === 'text';
        input.type = hide ? 'password' : 'text';
        e.target.textContent = hide ? 'Show' : 'Hide';
      } }));
    }
    return el('div', { class: 'row' }, kids);
  }

  function check(label, path) {
    const input = el('input', { type: 'checkbox' });
    input.addEventListener('change', () => write(path, input.checked));
    refreshers.push(() => { input.checked = !!getp(path); });
    input.checked = !!getp(path);
    return el('label', {}, [input, label]);
  }

  function card(name, body) {
    const sw = el('input', { type: 'checkbox', 'aria-label': name + ' on/off' });
    const c = el('section', { class: 'card' });
    const sync = () => { sw.checked = !!getp(`modules.${name}.enabled`); c.classList.toggle('off', !sw.checked); };
    sw.addEventListener('change', () => { write(`modules.${name}.enabled`, sw.checked); sync(); });
    refreshers.push(sync); sync();
    c.append(
      el('div', { class: 'hd' }, [el('b', { text: name }), el('span', { class: 'sw' }, [sw, el('i')])]),
      el('div', { class: 'body' }, body),
    );
    return c;
  }

  const m = (n, k) => `modules.${n}.${k}`;

  function seriesBody() {
    const oppLine = el('div', { class: 'note' });
    const showOpp = () => {
      const id = getp(m('series', 'opponentId'));
      oppLine.textContent = id == null ? 'Opponent: none set' : `Opponent: ${opponentName || id} (${id})`;
    };
    refreshers.push(showOpp); showOpp();
    const seen = el('div', { class: 'note', text: 'no match seen' });
    const useBtn = el('button', { type: 'button', text: 'Use current opponent', onclick: () => {
      const o = currentOpponent(lastMatch);
      if (!o) return;
      opponentName = o.name;
      write(m('series', 'opponentId'), o.id);
      write(m('series', 'since'), o.since);
      showOpp();
    } });
    onMatch = () => {
      const o = currentOpponent(lastMatch);
      seen.textContent = o ? `Current: ${o.name} (${o.id})` : 'no match seen';
    };
    const scoreRow = (label, key) => {
      const v = el('b');
      const show = () => { v.textContent = String(getp(m('series', 'manual') + '.' + key) ?? 0); };
      const step = (d) => () => {
        write(m('series', 'manual') + '.' + key, Math.max(0, (getp(m('series', 'manual') + '.' + key) ?? 0) + d));
        show();
      };
      refreshers.push(show); show();
      return el('div', { class: 'row' }, [el('span', { class: 'lbl', text: label }),
        el('div', { class: 'score' }, [el('button', { type: 'button', text: '-', 'aria-label': label + ' minus', onclick: step(-1) }), v,
          el('button', { type: 'button', text: '+', 'aria-label': label + ' plus', onclick: step(1) })])]);
    };
    return [
      field('Best of', m('series', 'bestOf'), 'select', { options: [1, 3, 5, 7], numeric: true }),
      oppLine, seen, el('div', { class: 'row' }, [useBtn]),
      scoreRow('Me', 'me'), scoreRow('Opponent', 'opp'),
      el('div', { class: 'row' }, [el('button', { type: 'button', class: 'dng', text: 'Reset', onclick: () => {
        write(m('series', 'manual'), { me: 0, opp: 0 });
        refreshers.forEach((f) => f());
      } })]),
    ];
  }
  let onMatch = () => {};

  function tiersBody() {
    const list = el('div');
    const save = () => {
      const rows = [...list.querySelectorAll('.tier')].map((r) => ({
        amount: Number(r.querySelector('input[type=number]').value) || 0,
        text: r.querySelector('input[type=text]').value,
      }));
      write(m('challenges', 'tiers'), rows);
    };
    const draw = () => {
      if (list.contains(document.activeElement)) return;
      list.replaceChildren(...(getp(m('challenges', 'tiers')) || []).map((t) => {
        const a = el('input', { type: 'number', min: '0', 'aria-label': 'amount', value: String(t.amount) });
        const x = el('input', { type: 'text', 'aria-label': 'text', value: t.text });
        a.addEventListener('change', save); x.addEventListener('change', save);
        return el('div', { class: 'tier' }, [a, x, el('button', { type: 'button', text: 'x', 'aria-label': 'remove', onclick: (e) => {
          e.target.closest('.tier').remove(); save();
        } })]);
      }));
    };
    refreshers.push(draw); draw();
    return [
      field('Position', m('challenges', 'position'), 'select', { options: ['bottom', 'left'] }),
      field('Rotate (sec)', m('challenges', 'rotateSec'), 'number', { attrs: { min: '2' } }),
      list,
      el('button', { type: 'button', text: '+ Add tier', onclick: () => {
        write(m('challenges', 'tiers'), [...(getp(m('challenges', 'tiers')) || []), { amount: 5, text: 'New challenge' }]);
        list.replaceChildren(); draw();
      } }),
    ];
  }

  function messagesBody() {
    // Free announcement text, one line per row (e.g. "Total: 840$" / "5$ = 1v1 ranked or 1v1 vs you").
    const ta = el('textarea', { rows: '5', 'aria-label': 'announcement text' });
    ta.style.cssText = 'width:100%;resize:vertical;font:inherit;background:#0b0f0a;color:inherit;border:1px solid #2a3a22;border-radius:4px;padding:6px';
    ta.addEventListener('change', () => write(m('messages', 'text'), ta.value));
    const draw = () => { if (document.activeElement !== ta) ta.value = getp(m('messages', 'text')) || ''; };
    refreshers.push(draw); draw();
    return [field('Title (optional)', m('messages', 'title')), ta];
  }

  function monkBody() {
    const clock = el('div', { class: 'mono', text: '--:--' });
    const tick = () => {
      const left = monkRemainingMs(getp(m('monk', 'startedAt')), getp(m('monk', 'minutes')) || 0);
      clock.textContent = left == null ? '--:--' : left === 0 ? 'done' : fmtMMSS(left);
    };
    setInterval(tick, 500);
    refreshers.push(tick); tick();
    return [
      field('Minutes', m('monk', 'minutes'), 'number', { attrs: { min: '1' } }),
      clock,
      el('div', { class: 'row' }, [
        el('button', { type: 'button', class: 'pri big', text: 'Start', onclick: () => {
          const startedAt = Date.now();
          write(m('monk', 'startedAt'), startedAt);
          bus.emit('monk-start', { startedAt, minutes: getp(m('monk', 'minutes')) });
          tick();
        } }),
        el('button', { type: 'button', class: 'dng big', text: 'Stop', onclick: () => {
          write(m('monk', 'startedAt'), null);
          bus.emit('monk-stop', {});
          tick();
        } }),
      ]),
    ];
  }

  const bodies = {
    cam: () => [field('Name', m('cam', 'name'))],
    matchbar: () => [],
    series: seriesBody,
    intro: () => [field('Seconds', m('intro', 'seconds'), 'number', { attrs: { min: '0', step: '0.5' } })],
    result: () => [],
    civdelay: () => [field('Minutes', m('civdelay', 'minutes'), 'number', { attrs: { min: '0', step: '0.5' } })],
    goal: () => [
      field('Title', m('goal', 'title')),
      field('Current', m('goal', 'current'), 'number'),
      field('Target', m('goal', 'target'), 'number', { attrs: { min: '1' } }),
      field('Source', m('goal', 'source'), 'select', { options: ['manual', 'streamlabs'] }),
    ],
    challenges: tiersBody,
    messages: messagesBody,
    chat: () => [field('Channel', m('chat', 'channel')), field('Lines', m('chat', 'lines'), 'number', { attrs: { min: '1', max: '20' } })],
    alerts: () => [
      el('div', { class: 'chk' }, ['follow', 'sub', 'bits', 'donation'].map((k) => check(k, m('alerts', k)))),
      field('Streamlabs token', m('alerts', 'streamlabsToken'), 'password', { attrs: { autocomplete: 'off' } }),
    ],
    monk: monkBody,
  };

  const cards = $('cards');
  for (const name of MODULE_ORDER) cards.append(card(name, bodies[name]()));

  // top bar
  const glass = $('glass');
  const showGlass = () => { glass.value = getp('glass'); $('glassv').textContent = Number(getp('glass')).toFixed(2); };
  glass.addEventListener('input', () => { $('glassv').textContent = Number(glass.value).toFixed(2); });
  glass.addEventListener('change', () => write('glass', Number(glass.value)));
  refreshers.push(showGlass); showGlass();

  const pid = $('profileId');
  const showPid = () => { if (document.activeElement !== pid) pid.value = getp('profileId') ?? ''; };
  pid.addEventListener('change', () => {
    const n = Number(pid.value.trim());
    if (Number.isInteger(n) && n > 0) write('profileId', n); else showPid();
  });
  refreshers.push(showPid); showPid();

  const dots = {};
  for (const s of ['aoe2', 'chat', 'streamlabs']) {
    const d = el('span', { class: 'dot' });
    dots[s] = d;
    $('dots').append(el('span', { title: 'no status yet' }, [d, s]));
  }
  bus.on('status', (p) => {
    const d = p && dots[p.source];
    if (!d) return;
    d.className = 'dot ' + (p.ok ? 'ok' : 'bad');
    d.parentElement.title = p.ok ? 'ok' : (p.reason || 'error');
  });

  const onM = (p) => { if (currentOpponent(p)) { lastMatch = p; onMatch(); } };
  bus.on('match-start', onM);
  bus.on('match-update', onM);

  // external changes (overlay/other tab): refresh controls not being edited
  // Modules in the overlay write settings too (series, goal): adopt them so the
  // panel never overwrites them from stale state.
  bus.on('settings', (p) => {
    if (p && typeof p === 'object') settings.patch(p);
    refreshers.forEach((f) => f());
  });
  // An overlay that just loaded asks for the full settings (dock and source may
  // not share storage in OBS).
  bus.on('settings-request', () => bus.emit('settings', settings.get()));
}

if (typeof document !== 'undefined') {
  boot();
  // New version published → reload, but never while Goblin is typing in a field.
  startAutoUpdate({ canReload: () => !document.activeElement?.matches?.('input,textarea,select') });
}
