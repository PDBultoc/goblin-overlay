// Pure parts of GoblinMusic (no Windows APIs), unit-tested in GoblinMusic.Tests.
using System.Text;

namespace GoblinMusic;

// Automatic gain: a level is the loudness relative to the recent peak, over a 12 dB window.
// Measured on one Spotify song, 2026-11-03: the verse sat around -26 dB RMS and the chorus
// around -15 dB, so any fixed scale either left the verse flat or pinned the chorus at the top;
// with a 24 dB window the (heavily mastered) chorus still read p10 0.71 / median 0.91.
public sealed class Agc
{
    public const double WindowDb = 12, PeakFloorDb = -40, DecayDbPerSec = 3;
    private double _peakDb = PeakFloorDb;

    public double Next(double rms, double dtSec)
    {
        if (!(rms > 0)) { _peakDb = Math.Max(PeakFloorDb, _peakDb - DecayDbPerSec * dtSec); return 0; }
        var db = 20 * Math.Log10(rms);
        _peakDb = Math.Max(Math.Max(db, PeakFloorDb), _peakDb - DecayDbPerSec * dtSec);
        return Math.Clamp((db - (_peakDb - WindowDb)) / WindowDb, 0, 1);
    }
}

// One 1/40 s frame: loudness (AGC, 0..1) + scope wave (Scope.Points values, -1..1).
public readonly record struct Frame(double Level, double[] Wave);

// Accumulates interleaved float samples and emits one Frame per window (1/40 s).
public sealed class LevelMeter
{
    private const int Ring = 4096;
    private readonly int _window, _channels, _rate;
    private readonly double _dt;
    private readonly Agc _agc = new();
    private readonly Scope _scope = new();
    private readonly float[] _ring = new float[Ring];
    private int _ringPos, _ch;
    private double _sum, _mono;
    private int _n;

    public LevelMeter(int sampleRate, int channels, int perSecond = 40)
    {
        _rate = sampleRate; _channels = Math.Max(1, channels);
        _window = Math.Max(1, sampleRate * _channels / perSecond);
        _dt = 1.0 / perSecond;
    }

    public void Add(ReadOnlySpan<float> samples, Action<Frame> emit)
    {
        foreach (var s in samples)
        {
            _sum += (double)s * s;
            _mono += s;
            if (++_ch == _channels) { _ring[_ringPos] = (float)(_mono / _channels); _ringPos = (_ringPos + 1) % Ring; _mono = 0; _ch = 0; }
            if (++_n < _window) continue;
            var level = Math.Round(_agc.Next(Math.Sqrt(_sum / _n), _dt), 3);
            emit(new Frame(level, _scope.Shape(Latest(Scope.Block), _rate)));
            _sum = 0; _n = 0;
        }
    }

    // The newest n mono samples, oldest first.
    private float[] Latest(int n)
    {
        var o = new float[n];
        for (var i = 0; i < n; i++) o[i] = _ring[(_ringPos - n + i + Ring) % Ring];
        return o;
    }
}

// Oscilloscope view of the real audio (Paul, 2026-11-03: the waves must stand still and
// move with the music, not scroll). Low-passed so the line stays smooth, triggered on a
// rising zero crossing like a real scope so the picture does not drift sideways, and
// normalised by a slowly falling peak so quiet and loud passages both fill the strip.
public sealed class Scope
{
    // 2400 samples = 50 ms at 48 kHz; with the bass kept (150 Hz low-pass) that is the 4-6 big
    // humps of Paul's reference; 250 Hz / 43 ms looked like ~18 small ripples.
    public const int Points = 96, Span = 2400, Search = 1024, Block = Span + Search;
    public const double CutoffHz = 150, PeakFloor = 0.01, PeakDecay = 0.97;
    private double _peak = PeakFloor;

    // block: mono samples, oldest first, length Block.
    public double[] Shape(float[] block, int sampleRate)
    {
        var lp = LowPass(block, sampleRate);
        var start = Trigger(lp);
        var outp = new double[Points];
        double peak = 0;
        var per = (double)Span / Points;
        for (var p = 0; p < Points; p++)
        {
            int a = start + (int)(p * per), b = start + (int)((p + 1) * per);
            double acc = 0;
            for (var i = a; i < b; i++) acc += lp[i];
            outp[p] = acc / Math.Max(1, b - a);
            peak = Math.Max(peak, Math.Abs(outp[p]));
        }
        _peak = Math.Max(Math.Max(peak, PeakFloor), _peak * PeakDecay);
        for (var p = 0; p < Points; p++) outp[p] = Math.Round(Math.Clamp(outp[p] / _peak, -1, 1), 2);
        return outp;
    }

    // Two one-pole passes (12 dB/oct) at CutoffHz.
    public static double[] LowPass(float[] x, int sampleRate)
    {
        var a = 1 - Math.Exp(-2 * Math.PI * CutoffHz / sampleRate);
        var y = new double[x.Length];
        double s1 = 0, s2 = 0;
        for (var i = 0; i < x.Length; i++) { s1 += a * (x[i] - s1); s2 += a * (s1 - s2); y[i] = s2; }
        return y;
    }

    // First rising zero crossing in the second half of the search area (the first half lets
    // the filter settle); none (silence, DC) -> the end of the search area.
    public static int Trigger(double[] lp)
    {
        for (var i = Search / 2; i < Search; i++)
            if (lp[i - 1] < 0 && lp[i] >= 0) return i;
        return Search;
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

    // `lv` payload: {"l":[level,...],"w":[[96 scope points],...]} — one entry per 1/40 s frame.
    public static string Levels(IReadOnlyList<Frame> frames)
    {
        static string N(double v) => v.ToString("0.###", System.Globalization.CultureInfo.InvariantCulture);
        var sb = new StringBuilder("{\"l\":[").AppendJoin(',', frames.Select(f => N(f.Level))).Append("],\"w\":[");
        sb.AppendJoin(',', frames.Select(f => "[" + string.Join(',', f.Wave.Select(N)) + "]"));
        return sb.Append("]}").ToString();
    }

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
