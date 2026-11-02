using GoblinMusic;
using Xunit;

public class CoreTests
{
    private static double Rms(double db) => Math.Pow(10, db / 20);

    [Fact]
    public void Agc_scales_quiet_and_loud_passages_alike()
    {
        var a = new Agc();
        Assert.Equal(0, a.Next(0, 0.025));
        Assert.Equal(0, a.Next(double.NaN, 0.025));
        // verse around -26 dB, peak -20: (-26 - (-32)) / 12 = 0.5
        a.Next(Rms(-20), 0.025);
        Assert.Equal(0.5, a.Next(Rms(-26), 0.025), 1);
        // chorus 11 dB louder, peak -9: -15 dB reads the same as the verse did
        a.Next(Rms(-9), 0.025);
        Assert.Equal(0.5, a.Next(Rms(-15), 0.025), 1);
        // the peak decays 3 dB/s: after 10 s of -26 dB the verse fills the window again
        for (var i = 0; i < 400; i++) a.Next(Rms(-26), 0.025);
        Assert.Equal(1, a.Next(Rms(-26), 0.025), 2);
    }

    [Fact]
    public void Agc_does_not_blow_up_near_silence()
    {
        var a = new Agc();
        for (var i = 0; i < 400; i++) a.Next(0, 0.025);
        Assert.Equal(0, a.Next(Rms(-70), 0.025)); // hiss 30 dB under the peak floor stays at 0
    }

    private static float[] Tone(double hz, int frames, int channels = 2, int rate = 48000, int skip = 0)
    {
        var s = new float[frames * channels];
        for (var i = 0; i < frames; i++)
            for (var c = 0; c < channels; c++) s[i * channels + c] = (float)(0.5 * Math.Sin(2 * Math.PI * hz * (i + skip) / rate));
        return s;
    }

    [Fact]
    public void Meter_emits_40_frames_per_second_with_a_scope_wave()
    {
        var m = new LevelMeter(48000, 2);
        var got = new List<Frame>();
        m.Add(Tone(100, 48000), got.Add);
        Assert.Equal(40, got.Count);
        Assert.All(got, f => Assert.Equal(Scope.Points, f.Wave.Length));
        Assert.Equal(1, got[^1].Level, 2); // steady tone = its own peak
    }

    [Fact]
    public void Scope_stands_still_whatever_the_phase_of_the_audio()
    {
        // Two blocks of the same 100 Hz tone, started 137 samples apart: the trigger
        // must line them up so the drawn wave does not slide sideways.
        var a = new Scope().Shape(Tone(100, Scope.Block, 1), 48000);
        var b = new Scope().Shape(Tone(100, Scope.Block, 1, skip: 137), 48000);
        Assert.True(a.Zip(b, (x, y) => Math.Abs(x - y)).Max() < 0.1);
        Assert.InRange(Math.Abs(a[0]), 0, 0.25);              // starts at the rising zero crossing (first point = mean of 25 samples after it)
        Assert.True(a[2] > a[0]);
        Assert.Equal(1, a.Max(Math.Abs), 1);                  // fills the strip
        Assert.All(new Scope().Shape(new float[Scope.Block], 48000), v => Assert.Equal(0, v)); // silence: flat
    }

    [Fact]
    public void Scope_low_pass_keeps_bass_and_removes_treble()
    {
        double Amp(double hz) => Scope.LowPass(Tone(hz, 4800, 1), 48000).Skip(2400).Max(Math.Abs);
        Assert.True(Amp(60) > 0.4);    // 0.5 in, nearly all of the bass out
        Assert.True(Amp(5000) < 0.01); // treble ripple gone, so the line stays smooth
    }

    [Fact]
    public void Root_is_the_Spotify_process_whose_parent_is_not_Spotify()
    {
        // real tree on Paul's PC, 2026-11-03
        var tree = new List<(int, int)> { (29136, 28900), (29016, 29136), (29248, 29136), (29268, 29136), (29328, 29136), (25100, 29136), (8252, 29136), (23560, 29136) };
        Assert.Equal(29136, SpotifyPick.Root(tree));
        Assert.Null(SpotifyPick.Root(new List<(int, int)>()));
    }

    [Fact]
    public void Session_pick_finds_Spotify_and_ignores_Chrome()
    {
        Assert.Equal(1, SpotifyPick.Session(new[] { "Chrome", "Spotify.exe" }));
        Assert.Equal(0, SpotifyPick.Session(new[] { "SpotifyAB.SpotifyMusic_zpdnekdrzrea0!Spotify" }));
        Assert.Equal(-1, SpotifyPick.Session(new[] { "Chrome" }));
    }

    [Fact]
    public void Sse_frame_and_request_line()
    {
        Assert.Equal("event: lv\ndata: {\"l\":[0.5]}\n\n", Sse.Frame("lv", "{\"l\":[0.5]}"));
        Assert.Equal("{\"l\":[0.5,1],\"w\":[[1,-0.25],[0,0]]}",
            Sse.Levels(new[] { new Frame(0.5, new[] { 1.0, -0.25 }), new Frame(1, new[] { 0.0, 0 }) }));
        Assert.Equal(("GET", "/stream"), Sse.RequestLine("GET /stream?x=1 HTTP/1.1"));
        Assert.Equal(("", ""), Sse.RequestLine(""));
        var head = System.Text.Encoding.ASCII.GetString(Sse.Head(204, "No Content", null, null));
        Assert.Contains("Access-Control-Allow-Private-Network: true\r\n", head);
        Assert.Contains("Access-Control-Allow-Origin: *\r\n", head);
        Assert.EndsWith("\r\n\r\n", head);
    }

    [Fact]
    public void Np_change_ignores_clock_drift_but_sees_seeks()
    {
        var a = new Np("playing", "Jueves", "La Oreja de Van Gogh", "A las Cinco", 10, 239, 1_000, "/art?v=1");
        Assert.True(a.SameAs(a with { Pos = 15, At = 6_000 }));   // 5 s later, 5 s further
        Assert.False(a.SameAs(a with { Pos = 90, At = 6_000 }));  // seek
        Assert.False(a.SameAs(a with { Status = "paused" }));
        Assert.False(a.SameAs(a with { Title = "Other" }));
    }
}
