// Pure parts of GoblinMusic (no Windows APIs), unit-tested in GoblinMusic.Tests.
using System.Text;

namespace GoblinMusic;

public static class Levels
{
    public const double FloorDb = -48;

    // RMS (linear, 0..1) -> display level 0..1 on a dB scale; silence -> 0.
    public static double FromRms(double rms)
    {
        if (!(rms > 0)) return 0;
        var db = 20 * Math.Log10(rms);
        return Math.Clamp((db - FloorDb) / -FloorDb, 0, 1);
    }
}

// Accumulates interleaved float samples and emits one level per window (1/40 s).
public sealed class LevelMeter
{
    private readonly int _window;
    private double _sum;
    private int _n;

    public LevelMeter(int sampleRate, int channels, int perSecond = 40)
        => _window = Math.Max(1, sampleRate * channels / perSecond);

    public void Add(ReadOnlySpan<float> samples, Action<double> emit)
    {
        foreach (var s in samples)
        {
            _sum += (double)s * s;
            if (++_n < _window) continue;
            emit(Math.Round(Levels.FromRms(Math.Sqrt(_sum / _n)), 3));
            _sum = 0; _n = 0;
        }
    }
}

public static class SpotifyPick
{
    // Spotify runs one root Spotify.exe and several child Spotify.exe processes;
    // the root is the one whose parent is not itself a Spotify process.
    public static int? Root(IReadOnlyList<(int Pid, int Parent)> spotify)
    {
        var pids = spotify.Select(p => p.Pid).ToHashSet();
        var roots = spotify.Where(p => !pids.Contains(p.Parent)).Select(p => p.Pid).ToList();
        return roots.Count == 0 ? null : roots.Min();
    }

    // GSMTC session app ids: "Spotify.exe" (desktop) or "SpotifyAB.SpotifyMusic_..." (Store).
    public static int Session(IReadOnlyList<string> appIds)
    {
        for (var i = 0; i < appIds.Count; i++)
            if (appIds[i] != null && appIds[i].Contains("spotify", StringComparison.OrdinalIgnoreCase)) return i;
        return -1;
    }
}

public static class Sse
{
    public static string Frame(string evt, string json) => $"event: {evt}\ndata: {json}\n\n";

    public static string Cors =>
        "Access-Control-Allow-Origin: *\r\nAccess-Control-Allow-Private-Network: true\r\nAccess-Control-Allow-Headers: *\r\n";

    public static byte[] Head(int status, string reason, string? contentType, long? length, string extra = "")
    {
        var sb = new StringBuilder($"HTTP/1.1 {status} {reason}\r\n").Append(Cors).Append("Cache-Control: no-cache\r\n");
        if (contentType != null) sb.Append("Content-Type: ").Append(contentType).Append("\r\n");
        if (length != null) sb.Append("Content-Length: ").Append(length).Append("\r\n");
        sb.Append(extra).Append("\r\n");
        return Encoding.ASCII.GetBytes(sb.ToString());
    }

    // "GET /stream?x HTTP/1.1" -> ("GET", "/stream")
    public static (string Method, string Path) RequestLine(string line)
    {
        var parts = (line ?? "").Split(' ');
        if (parts.Length < 2) return ("", "");
        var path = parts[1];
        var q = path.IndexOf('?');
        return (parts[0].ToUpperInvariant(), q >= 0 ? path[..q] : path);
    }
}

public sealed record Np(string Status, string Title, string Artist, string Album, double Pos, double Dur, long At, string Art)
{
    public static readonly Np None = new("none", "", "", "", 0, 0, 0, "");

    // Same song/state, ignoring the clock fields: used to send `np` only on real change.
    public bool SameAs(Np o) => o.Status == Status && o.Title == Title && o.Artist == Artist && o.Album == Album
        && o.Art == Art && Math.Abs(o.Dur - Dur) < 1 && Math.Abs((o.Pos - Pos) - (o.At - At) / 1000.0 * (Status == "playing" ? 1 : 0)) < 2;
}
