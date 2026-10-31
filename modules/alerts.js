// STUB: replaced by the module's owner task. Contract: mount(root, ctx) -> { unmount }
export function mount(root, ctx) {
  const el = document.createElement('div');
  el.className = 'pn oxa';
  el.style.cssText = 'left:460px;top:180px;width:1000px;height:100px;display:grid;place-items:center;font:700 18px/1 Oxanium,sans-serif;letter-spacing:.2em;color:var(--acid);text-transform:uppercase';
  el.textContent = 'alerts';
  root.appendChild(el);
  return { unmount() { el.remove(); } };
}
