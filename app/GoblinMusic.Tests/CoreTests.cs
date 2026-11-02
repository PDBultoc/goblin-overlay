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
    public void Meter_emits_40_frames_per_second_with_three_bands()
    {
        var m = new LevelMeter(48000, 2);
        var got = new List<Frame>();
        m.Add(Tone(80, 48000), got.Add);
        Assert.Equal(40, got.Count);
        Assert.All(got, f => { Assert.Equal(3, f.Levels.Length); Assert.All(f.Waves, w => Assert.Equal(Scope.Points, w.Length)); });
        Assert.Equal(1, got[^1].Levels[0], 2); // steady bass tone = the bass band's own peak
    }

    [Fact]
    public void Each_band_reacts_only_to_its_own_part_of_the_sound()
    {
        // band RMS after the filters, for a 0.5-amplitude tone
        double Rms(int band, double hz) => Scope.Bands()[band].Shape(Tone(hz, Scope.Block, 1), 48000).Rms;
        Assert.True(Rms(0, 80) > 0.2 && Rms(0, 800) < 0.02 && Rms(0, 6000) < 0.001);    // bass
        Assert.True(Rms(1, 800) > 0.2 && Rms(1, 80) < 0.05 && Rms(1, 6000) < 0.05);     // voice
        Assert.True(Rms(2, 6000) > 0.2 && Rms(2, 800) < 0.03 && Rms(2, 80) < 0.001);    // highs
    }

    [Fact]
    public void Scope_stands_still_whatever_the_phase_of_the_audio()
    {
        // Two blocks of the same tone, started 137 samples apart: the trigger must line them
        // up so the drawn wave does not slide sideways. Bass at 100 Hz, voice at 700 Hz.
        foreach (var (band, hz) in new[] { (0, 100.0), (1, 700.0) })
        {
            var a = Scope.Bands()[band].Shape(Tone(hz, Scope.Block, 1), 48000).Trace;
            var b = Scope.Bands()[band].Shape(Tone(hz, Scope.Block, 1, skip: 137), 48000).Trace;
            Assert.True(a.Zip(b, (x, y) => Math.Abs(x - y)).Max() < 0.15, $"band {band} drifts");
            Assert.True(a[2] > a[0], $"band {band} does not start on a rising edge");
            Assert.Equal(1, a.Max(Math.Abs), 1); // fills the strip
        }
        Assert.All(Scope.Bands()[0].Shape(new float[Scope.Block], 48000).Trace, v => Assert.Equal(0, v)); // silence: flat
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
        Assert.Equal("{\"l\":[[0.5,1,0]],\"w\":[[[1,-0.25],[0],[0.5]]]}",
            Sse.Levels(new[] { new Frame(new[] { 0.5, 1, 0 }, new[] { new[] { 1.0, -0.25 }, new[] { 0.0 }, new[] { 0.5 } }) }));
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
