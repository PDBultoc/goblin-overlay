// STUB: replaced by the module's owner task. Contract: mount(root, ctx) -> { unmount }
export function mount(root, ctx) {
  const el = document.createElement('div');
  el.className = 'pn oxa';
  el.style.cssText = 'left:440px;top:790px;width:260px;height:75px;display:grid;place-items:center;font:700 18px/1 Oxanium,sans-serif;letter-spacing:.2em;color:var(--acid);text-transform:uppercase';
  el.textContent = 'monk';
  root.appendChild(el);
  return { unmount() { el.remove(); } };
}
