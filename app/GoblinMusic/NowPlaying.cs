// Now playing from the Windows media session (GSMTC): the same data the Windows
// volume flyout shows, so no Spotify developer app or login is needed.
using Windows.Media.Control;
using Windows.Storage.Streams;

namespace GoblinMusic;

public sealed class NowPlaying
{
    private GlobalSystemMediaTransportControlsSessionManager? _mgr;
    private string _artKey = "";
    private int _artVersion;
    public (byte[] Bytes, string Type)? Art { get; private set; }

    public async Task<Np> Read()
    {
        try
        {
            _mgr ??= await GlobalSystemMediaTransportControlsSessionManager.RequestAsync();
            var sessions = _mgr.GetSessions();
            var i = SpotifyPick.Session(sessions.Select(s => s.SourceAppUserModelId).ToList());
            if (i < 0) return Np.None;
            var s = sessions[i];
            var p = await s.TryGetMediaPropertiesAsync();
            var t = s.GetTimelineProperties();
            var status = s.GetPlaybackInfo().PlaybackStatus switch
            {
                GlobalSystemMediaTransportControlsSessionPlaybackStatus.Playing => "playing",
                GlobalSystemMediaTransportControlsSessionPlaybackStatus.Paused => "paused",
                _ => "none",
            };
            if (string.IsNullOrEmpty(p.Title)) return Np.None; // Spotify open, nothing loaded
            var key = p.Title + "\u0001" + p.AlbumTitle + "\u0001" + p.Artist;
            if (key != _artKey) { _artKey = key; await LoadArt(p.Thumbnail); }
            return new Np(status, p.Title, p.Artist, p.AlbumTitle,
                Math.Round(t.Position.TotalSeconds, 2), Math.Round(t.EndTime.TotalSeconds, 2),
                t.LastUpdatedTime.ToUnixTimeMilliseconds(), Art == null ? "" : "/art?v=" + _artVersion);
        }
        catch
        {
            _mgr = null; // media service restarted: ask again next time
            return Np.None;
        }
    }

    private async Task LoadArt(IRandomAccessStreamReference? thumb)
    {
        Art = null;
        if (thumb == null) return;
        try
        {
            using var rs = await thumb.OpenReadAsync();
            using var st = rs.AsStreamForRead();
            using var ms = new MemoryStream();
            await st.CopyToAsync(ms);
            Art = (ms.ToArray(), string.IsNullOrEmpty(rs.ContentType) ? "image/jpeg" : rs.ContentType);
            _artVersion++;
        }
        catch { Art = null; }
    }
}
