// Pure parts of GoblinMusic (no Windows APIs), unit-tested in GoblinMusic.Tests.
using System.Text;

namespace GoblinMusic;

// Automatic gain: a level is the loudness relative to the recent peak, over a window of dB.
// Measured on one Spotify song, 2026-11-03: the verse sat around -26 dB RMS and the chorus
// around -15 dB, so any fixed scale either left the verse flat or pinned the chorus at the top.
public sealed class Agc
{
    public const double DecayDbPerSec = 3;
    private readonly double _windowDb, _floorDb;
    private double _peakDb;

    public Agc(double windowDb = 12, double peakFloorDb = -40)
    {
        _windowDb = windowDb; _floorDb = peakFloorDb; _peakDb = peakFloorDb;
    }

    public double Next(double rms, double dtSec)
    {
        if (!(rms > 0)) { _peakDb = Math.Max(_floorDb, _peakDb - DecayDbPerSec * dtSec); return 0; }
        var db = 20 * Math.Log10(rms);
        _peakDb = Math.Max(Math.Max(db, _floorDb), _peakDb - DecayDbPerSec * dtSec);
        return Math.Clamp((db - (_peakDb - _windowDb)) / _windowDb, 0, 1);
    }
}

// One 1/40 s frame, per band (0 = bass, 1 = mids/voice, 2 = highs/cymbals):
// loudness (own AGC, 0..1) and an oscilloscope trace (Scope.Points values, -1..1).
public readonly record struct Frame(double[] Levels, double[][] Waves);

// Accumulates interleaved float samples and emits one Frame per window (1/40 s).
public sealed class LevelMeter
{
    private const int Ring = 4096;
    private readonly int _window, _channels, _rate;
    private readonly double _dt;
    private readonly Scope[] _scopes = Scope.Bands();
    // Per band: 18 dB window under its own recent peak, so a kick, a vocal line or a hi-hat
    // each swing their own line from calm to full, whatever the band's absolute level.
    private readonly Agc[] _agc = { new(18, -60), new(18, -60), new(18, -60) };
    private readonly float[] _ring = new float[Ring];
    private int _ringPos, _ch, _n;
    private double _mono;

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
            _mono += s;
            if (++_ch == _channels) { _ring[_ringPos] = (float)(_mono / _channels); _ringPos = (_ringPos + 1) % Ring; _mono = 0; _ch = 0; }
            if (++_n < _window) continue;
            _n = 0;
            var block = Latest(Scope.Block);
            var levels = new double[_scopes.Length];
            var waves = new double[_scopes.Length][];
            for (var b = 0; b < _scopes.Length; b++)
            {
                var (trace, rms) = _scopes[b].Shape(block, _rate);
                waves[b] = trace;
                levels[b] = Math.Round(_agc[b].Next(rms, _dt), 3);
            }
            emit(new Frame(levels, waves));
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

// Oscilloscope view of one band of the real audio (Paul, 2026-11-03: the waves must stand
// still and move with the music, and each line should follow its own part — bass, voice,
// highs). Band-filtered, triggered on a rising zero crossing like a real scope so the picture
// does not drift sideways, and normalised by a slowly falling peak (shape only; loudness
// travels separately in the band's level).
public sealed class Scope
{
    public const int Points = 96, Block = 3424;      // Block = longest span (2400) + its search (1024)
    public const int RmsSamples = 1200;              // loudness over the newest 25 ms
    public const double PeakFloor = 1e-4, PeakDecay = 0.97;
    private readonly double _lowHz, _highHz;
    private readonly int _span, _search;
    private double _peak = PeakFloor;

    public Scope(double lowHz, double highHz, int span, int search)
    {
        _lowHz = lowHz; _highHz = highHz; _span = span; _search = search;
    }

    // Spans chosen so each band shows a few readable humps across the strip at 48 kHz:
    // bass < 150 Hz over 50 ms (4-6 big humps), voice 300-1500 Hz over 8 ms, highs > 3 kHz over 2 ms.
    public static Scope[] Bands() => new[]
    {
        new Scope(0, 150, 2400, 1024),
        new Scope(300, 1500, 384, 512),
        new Scope(3000, 0, 96, 128),
    };

    // block: mono samples, oldest first, length Block.
    public (double[] Trace, double Rms) Shape(float[] block, int sampleRate)
    {
        var y = Filter(block, sampleRate, _lowHz, _highHz);
        double sq = 0;
        for (var i = y.Length - RmsSamples; i < y.Length; i++) sq += y[i] * y[i];
        var rms = Math.Sqrt(sq / RmsSamples);

        var start = Trigger(y, y.Length - _span - _search, _search);
        var outp = new double[Points];
        double peak = 0;
        var per = (double)_span / Points;
        for (var p = 0; p < Points; p++)
        {
            int a = start + (int)(p * per), b = Math.Max(a + 1, start + (int)((p + 1) * per));
            double acc = 0;
            for (var i = a; i < b; i++) acc += y[i];
            outp[p] = acc / (b - a);
            peak = Math.Max(peak, Math.Abs(outp[p]));
        }
        _peak = Math.Max(Math.Max(peak, PeakFloor), _peak * PeakDecay);
        for (var p = 0; p < Points; p++) outp[p] = Math.Round(Math.Clamp(outp[p] / _peak, -1, 1), 2);
        return (outp, rms);
    }

    // Two one-pole low-pass passes at highHz (if > 0), then two one-pole high-pass passes at
    // lowHz (if > 0): 12 dB/oct on each side.
    public static double[] Filter(float[] x, int sampleRate, double lowHz, double highHz)
    {
        var y = new double[x.Length];
        for (var i = 0; i < x.Length; i++) y[i] = x[i];
        if (highHz > 0)
        {
            var a = 1 - Math.Exp(-2 * Math.PI * highHz / sampleRate);
            for (var pass = 0; pass < 2; pass++) { double s = 0; for (var i = 0; i < y.Length; i++) { s += a * (y[i] - s); y[i] = s; } }
        }
        if (lowHz > 0)
        {
            var rc = 1 / (2 * Math.PI * lowHz); var dt = 1.0 / sampleRate; var a = rc / (rc + dt);
            for (var pass = 0; pass < 2; pass++)
            {
                double prevX = y[0], prevY = 0;
                for (var i = 0; i < y.Length; i++) { var cur = y[i]; prevY = a * (prevY + cur - prevX); prevX = cur; y[i] = prevY; }
            }
        }
        return y;
    }

    // First rising zero crossing in the second half of [from, from + search) (the first half
    // lets the filter settle); none (silence, DC) -> from + search.
    public static int Trigger(double[] y, int from, int search)
    {
        for (var i = from + search / 2; i < from + search; i++)
            if (y[i - 1] < 0 && y[i] >= 0) return i;
        return from + search;
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

    // `lv` payload, one entry per 1/40 s frame, bands in order bass, mids, highs:
    // {"l":[[b,m,h],...],"w":[[[96 points],[96],[96]],...]}
    public static string Levels(IReadOnlyList<Frame> frames)
    {
        static string N(double v) => v.ToString("0.###", System.Globalization.CultureInfo.InvariantCulture);
        static string Arr(IEnumerable<string> xs) => "[" + string.Join(',', xs) + "]";
        var sb = new StringBuilder("{\"l\":").Append(Arr(frames.Select(f => Arr(f.Levels.Select(N)))));
        sb.Append(",\"w\":").Append(Arr(frames.Select(f => Arr(f.Waves.Select(w => Arr(w.Select(N)))))));
        return sb.Append('}').ToString();
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
