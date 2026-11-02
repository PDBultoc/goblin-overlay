using GoblinMusic;
using Xunit;

public class CoreTests
{
    [Fact]
    public void Level_maps_dB_onto_0_to_1()
    {
        Assert.Equal(0, Levels.FromRms(0));
        Assert.Equal(0, Levels.FromRms(double.NaN));
        Assert.Equal(1, Levels.FromRms(1));
        Assert.Equal(0.5, Levels.FromRms(Math.Pow(10, -24 / 20.0)), 3); // -24 dB = half way
        Assert.Equal(0, Levels.FromRms(Math.Pow(10, -60 / 20.0)));      // below the floor
    }

    [Fact]
    public void Meter_emits_40_levels_per_second()
    {
        var m = new LevelMeter(48000, 2);
        var got = new List<double>();
        var second = Enumerable.Repeat(0.5f, 48000 * 2).ToArray();
        m.Add(second, got.Add);
        Assert.Equal(40, got.Count);
        Assert.All(got, v => Assert.Equal(Levels.FromRms(0.5), v, 3));
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
