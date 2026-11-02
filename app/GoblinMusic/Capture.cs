// Captures ONLY Spotify's audio: WASAPI process loopback on the root Spotify.exe and
// its child processes (Windows 10 2004+), turned into 40 loudness levels per second.
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using NAudio.CoreAudioApi;
using NAudio.Wave;

namespace GoblinMusic;

public sealed class SpotifyCapture : IDisposable
{
    private const int Rate = 48000, Channels = 2;
    private readonly ConcurrentQueue<Frame> _levels = new();
    private CancellationTokenSource? _cts;
    private int _pid;
    private long _retryAt;
    public bool Attached => _pid != 0;
    public string? LastError { get; private set; }

    // Called once a second: attach to Spotify, re-attach after a restart, detach when closed.
    public void Follow()
    {
        var root = Procs.SpotifyRoot() ?? 0;
        if (root == _pid && (_cts == null || !_cts.IsCancellationRequested)) return;
        if (Environment.TickCount64 < _retryAt) return;
        Stop();
        if (root != 0) Start(root);
    }

    private void Start(int pid)
    {
        _pid = pid;
        var cts = _cts = new CancellationTokenSource();
        _ = Task.Run(async () =>
        {
            try
            {
                Log.Write($"attach Spotify pid {pid}");
                await using var rec = await new WasapiRecorderBuilder()
                    .WithProcessLoopback((uint)pid, ProcessLoopbackMode.IncludeTargetProcessTree)
                    .WithFormat(WaveFormat.CreateIeeeFloatWaveFormat(Rate, Channels))
                    .BuildAsync(); // process loopback activates asynchronously
                var meter = new LevelMeter(Rate, Channels);
                long packets = 0;
                await foreach (var buf in rec.CaptureAsync(cts.Token))
                {
                    if (packets++ == 0) Log.Write($"first packet: {buf.Data.Length} bytes, format {rec.WaveFormat}");
                    var floats = MemoryMarshal.Cast<byte, float>(buf.Data.Span);
                    meter.Add(floats, _levels.Enqueue);
                    while (_levels.Count > 400) _levels.TryDequeue(out _);
                }
            }
            catch (OperationCanceledException) { }
            catch (Exception e)
            {
                LastError = e.Message;
                Log.Write("capture failed: " + e);
                _retryAt = Environment.TickCount64 + 10_000;
                cts.Cancel(); // Follow() retries after the back-off
            }
        });
    }

    public List<Frame> Drain()
    {
        var l = new List<Frame>();
        while (_levels.TryDequeue(out var v)) l.Add(v);
        return l;
    }

    private void Stop()
    {
        _cts?.Cancel();
        _cts = null;
        _pid = 0;
    }

    public void Dispose() => Stop();
}

// Small diagnostics log next to the user's temp files: %TEMP%\GoblinMusic.log (kept under 256 KB).
public static class Log
{
    public static readonly string Path = System.IO.Path.Combine(System.IO.Path.GetTempPath(), "GoblinMusic.log");
    private static readonly object Gate = new();

    public static void Write(string line)
    {
        lock (Gate)
        {
            try
            {
                if (File.Exists(Path) && new FileInfo(Path).Length > 256 * 1024) File.Delete(Path);
                File.AppendAllText(Path, $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} {line}{Environment.NewLine}");
            }
            catch { /* diagnostics only */ }
        }
    }
}
