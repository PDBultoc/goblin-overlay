// messages: Goblin's own free text box ("Total: 840$ / 5$ = 1v1 ranked or 1v1 vs you / ..."),
// typed in the panel, several lines, shown as is.
const CSS = `
[data-mod=messages] .msgb{left:24px;top:150px;width:400px}
[data-mod=messages] .msgb .tx{padding:8px 16px 14px;font:600 19px/1.35 Inter,sans-serif;color:#eef5e8;white-space:pre-line;
  max-height:240px;overflow:hidden;animation:msgIn .5s cubic-bezier(.2,.9,.1,1) both}
@keyframes msgIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
`;

// Pure: trimmed text with at most `max` lines and no blank lines at the ends.
export function cleanText(text, max = 8) {
  return String(text ?? '').replace(/\r/g, '').split('\n').map((l) => l.trimEnd()).slice(0, max).join('\n').trim();
}

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  if (!document.head.querySelector('style[data-mod="messages"]')) {
    const s = document.createElement('style');
    s.dataset.mod = 'messages'; s.textContent = CSS;
    document.head.appendChild(s);
  }
  const cfg = ctx.cfg || {};
  const text = cleanText(cfg.text);
  const box = document.createElement('div');
  box.className = 'pn msgb';
  if (cfg.title) {
    const hd = document.createElement('div');
    hd.className = 'hd';
    const t = document.createElement('span');
    t.className = 't';
    t.textContent = cfg.title;
    hd.appendChild(t);
    box.appendChild(hd);
  }
  const tx = document.createElement('div');
  tx.className = 'tx';
  tx.textContent = text;
  box.appendChild(tx);
  if (text) root.appendChild(box);
  return { unmount() { box.remove(); } };
}
