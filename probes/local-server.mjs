// Probe: can an https page in a Streamlabs Browser Source read a local app?
// Serves Server-Sent Events on http://127.0.0.1:47800/stream at ~30 msgs/s.
// Answers CORS and Private-Network-Access preflights so Chromium lets a public page in.
import http from 'node:http';

const PORT = 47800;
http.createServer((req, res) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Private-Network': 'true',
    'Access-Control-Allow-Headers': '*',
  };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); res.end(); return; }
  if (req.url.startsWith('/stream')) {
    res.writeHead(200, { ...cors, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    let n = 0;
    const t = setInterval(() => {
      const l = 0.5 + 0.45 * Math.sin(n / 5);
      res.write(`data: ${JSON.stringify({ n: n++, l: +l.toFixed(3) })}\n\n`);
    }, 33);
    req.on('close', () => clearInterval(t));
    console.log(new Date().toISOString(), 'client connected from', req.headers.origin || '(no origin)');
    return;
  }
  res.writeHead(200, { ...cors, 'Content-Type': 'text/plain' }); res.end('goblin local probe ok');
}).listen(PORT, '127.0.0.1', () => console.log('listening on http://127.0.0.1:' + PORT));
