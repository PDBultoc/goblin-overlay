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

// One 1/40 s frame: loudness (AGC, 0..1) + spectrum shape (Bands.Count values, 0..1, loudest = 1).
public readonly record struct Frame(double Level, double[] Bands);

// Accumulates interleaved float samples and emits one Frame per window (1/40 s).
public sealed class LevelMeter
{
    public const int FftSize = 1024;
    private readonly int _window, _channels, _rate;
    private readonly double _dt;
    private readonly Agc _agc = new();
    private readonly float[] _ring = new float[FftSize];
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
            if (++_ch == _channels) { _ring[_ringPos] = (float)(_mono / _channels); _ringPos = (_ringPos + 1) % FftSize; _mono = 0; _ch = 0; }
            if (++_n < _window) continue;
            var level = Math.Round(_agc.Next(Math.Sqrt(_sum / _n), _dt), 3);
            emit(new Frame(level, Bands.Shape(Ordered(), _rate)));
            _sum = 0; _n = 0;
        }
    }

    private float[] Ordered()
    {
        var o = new float[FftSize];
        for (var i = 0; i < FftSize; i++) o[i] = _ring[(_ringPos + i) % FftSize];
        return o;
    }
}

// 8 log-spaced bands, 60 Hz – 12 kHz, as a spectrum SHAPE: each band's magnitude relative to
// the loudest band, compressed with ^0.6 so quieter bands still move the wave.
public static class Bands
{
    public const int Count = 8;
    public const double LowHz = 60, HighHz = 12000;

    public static double[] Shape(float[] block, int sampleRate)
    {
        var n = block.Length;
        var re = new double[n]; var im = new double[n];
        for (var i = 0; i < n; i++) re[i] = block[i] * (0.5 - 0.5 * Math.Cos(2 * Math.PI * i / (n - 1))); // Hann
        Fft(re, im);
        var mags = new double[Count];
        for (var b = 0; b < Count; b++)
        {
            var f0 = LowHz * Math.Pow(HighHz / LowHz, (double)b / Count);
            var f1 = LowHz * Math.Pow(HighHz / LowHz, (double)(b + 1) / Count);
            int k0 = Math.Max(1, (int)(f0 * n / sampleRate)), k1 = Math.Max(k0 + 1, (int)(f1 * n / sampleRate));
            double acc = 0;
            for (var k = k0; k < k1 && k < n / 2; k++) acc += re[k] * re[k] + im[k] * im[k];
            mags[b] = Math.Sqrt(acc / (k1 - k0));
        }
        var max = mags.Max();
        return mags.Select(m => max > 1e-9 ? Math.Round(Math.Pow(m / max, 0.6), 3) : 0).ToArray();
    }

    // In-place iterative radix-2 FFT (n must be a power of two).
    public static void Fft(double[] re, double[] im)
    {
        var n = re.Length;
        for (int i = 1, j = 0; i < n; i++)
        {
            var bit = n >> 1;
            for (; (j & bit) != 0; bit >>= 1) j ^= bit;
            j ^= bit;
            if (i < j) { (re[i], re[j]) = (re[j], re[i]); (im[i], im[j]) = (im[j], im[i]); }
        }
        for (var len = 2; len <= n; len <<= 1)
        {
            var ang = -2 * Math.PI / len;
            for (var i = 0; i < n; i += len)
                for (var k = 0; k < len / 2; k++)
                {
                    double wr = Math.Cos(ang * k), wi = Math.Sin(ang * k);
                    int a = i + k, b = a + len / 2;
                    double xr = re[b] * wr - im[b] * wi, xi = re[b] * wi + im[b] * wr;
                    re[b] = re[a] - xr; im[b] = im[a] - xi;
                    re[a] += xr; im[a] += xi;
                }
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

    // `lv` payload: {"l":[level,...],"b":[[8 bands],...]} — one entry per 1/40 s frame.
    public static string Levels(IReadOnlyList<Frame> frames)
    {
        static string N(double v) => v.ToString("0.###", System.Globalization.CultureInfo.InvariantCulture);
        var sb = new StringBuilder("{\"l\":[").AppendJoin(',', frames.Select(f => N(f.Level))).Append("],\"b\":[");
        sb.AppendJoin(',', frames.Select(f => "[" + string.Join(',', f.Bands.Select(N)) + "]"));
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
