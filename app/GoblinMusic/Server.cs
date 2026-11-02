// Tiny HTTP server on 127.0.0.1 (raw TcpListener: no URL ACL, no admin rights).
// GET /stream = Server-Sent Events, GET /art = album cover, GET /health = "ok".
// Every answer carries CORS + Private-Network-Access headers so the overlay page
// (https://pdbultoc.github.io, a "public" origin) may read this "private" address.
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace GoblinMusic;

public sealed class Server : IDisposable
{
    public const int Port = 47800;
    private readonly TcpListener _listener = new(IPAddress.Loopback, Port);
    private readonly List<NetworkStream> _clients = new();
    private readonly CancellationTokenSource _stop = new();
    private Func<string?> _hello = () => null;
    public Func<(byte[] Bytes, string Type)?> Art { get; set; } = () => null;

    public int Clients { get { lock (_clients) return _clients.Count; } }

    // Frame sent to each new SSE client first (the current `np`).
    public void OnHello(Func<string?> hello) => _hello = hello;

    public void Start()
    {
        _listener.Start(); // throws SocketException when the port is taken (second copy, old probe)
        _ = Task.Run(AcceptLoop);
    }

    private async Task AcceptLoop()
    {
        while (!_stop.IsCancellationRequested)
        {
            TcpClient c;
            try { c = await _listener.AcceptTcpClientAsync(_stop.Token); }
            catch { break; }
            _ = Task.Run(() => Handle(c));
        }
    }

    private async Task Handle(TcpClient c)
    {
        c.NoDelay = true;
        var s = c.GetStream();
        s.WriteTimeout = 1000; // a stuck client is dropped instead of stalling the broadcast
        try
        {
            var head = await ReadHead(s);
            var (method, path) = Sse.RequestLine(head.Split("\r\n")[0]);
            if (method == "OPTIONS") { await s.WriteAsync(Sse.Head(204, "No Content", null, 0)); c.Close(); return; }
            switch (path)
            {
                case "/stream":
                    await s.WriteAsync(Sse.Head(200, "OK", "text/event-stream", null, "Connection: keep-alive\r\n"));
                    var hello = _hello();
                    if (hello != null) await s.WriteAsync(Encoding.UTF8.GetBytes(hello));
                    lock (_clients) _clients.Add(s); // kept open; Broadcast writes, a failed write drops it
                    return;
                case "/art":
                    var art = Art();
                    if (art == null) { await s.WriteAsync(Sse.Head(404, "Not Found", "text/plain", 0)); break; }
                    await s.WriteAsync(Sse.Head(200, "OK", art.Value.Type, art.Value.Bytes.Length));
                    await s.WriteAsync(art.Value.Bytes);
                    break;
                default:
                    var ok = Encoding.ASCII.GetBytes("ok");
                    await s.WriteAsync(Sse.Head(200, "OK", "text/plain", ok.Length));
                    await s.WriteAsync(ok);
                    break;
            }
        }
        catch { /* client went away mid-request */ }
        c.Close();
    }

    private static async Task<string> ReadHead(NetworkStream s)
    {
        var buf = new byte[4096];
        var sb = new StringBuilder();
        while (sb.Length < 16384)
        {
            var n = await s.ReadAsync(buf);
            if (n <= 0) break;
            sb.Append(Encoding.ASCII.GetString(buf, 0, n));
            if (sb.ToString().Contains("\r\n\r\n")) break;
        }
        return sb.ToString();
    }

    public void Broadcast(string frame)
    {
        var bytes = Encoding.UTF8.GetBytes(frame);
        NetworkStream[] all;
        lock (_clients) all = _clients.ToArray();
        foreach (var s in all)
        {
            try { s.Write(bytes); }
            catch { lock (_clients) _clients.Remove(s); try { s.Dispose(); } catch { } }
        }
    }

    public void Dispose()
    {
        _stop.Cancel();
        _listener.Stop();
        lock (_clients) { foreach (var s in _clients) s.Dispose(); _clients.Clear(); }
    }
}
