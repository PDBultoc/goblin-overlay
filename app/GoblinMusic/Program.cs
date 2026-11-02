// GoblinMusic: tray app feeding the overlay's music widget.
// Captures ONLY Spotify's audio (process loopback), reads now-playing from the
// Windows media session and streams both to http://127.0.0.1:47800/stream.
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Text;
using Microsoft.Win32;

namespace GoblinMusic;

internal static class Program
{
    [STAThread]
    private static void Main()
    {
        using var single = new Mutex(true, @"Local\GoblinMusic", out var first);
        if (!first) { MessageBox.Show("GoblinMusic is already running (see the tray, bottom right).", "GoblinMusic"); return; }
        ApplicationConfiguration.Initialize();
        var server = new Server();
        try { server.Start(); }
        catch (System.Net.Sockets.SocketException)
        {
            MessageBox.Show($"Port {Server.Port} is in use by another program, so GoblinMusic cannot start.", "GoblinMusic");
            return;
        }
        Application.Run(new Tray(server));
    }
}

internal sealed class Tray : ApplicationContext
{
    private const string RunKey = @"Software\Microsoft\Windows\CurrentVersion\Run";
    private readonly Server _server;
    private readonly NowPlaying _np = new();
    private readonly SpotifyCapture _capture = new();
    private readonly NotifyIcon _icon;
    private readonly ToolStripMenuItem _status = new("starting…") { Enabled = false };
    private readonly ToolStripMenuItem _autostart = new("Start with Windows") { CheckOnClick = true };
    private readonly System.Threading.Timer _levels;
    private readonly System.Windows.Forms.Timer _meta;
    private Np _last = Np.None;
    private long _lastSent;

    public Tray(Server server)
    {
        _server = server;
        _server.Art = () => _np.Art;
        _server.OnHello(() => Sse.Frame("np", Json(_last)));
        _autostart.Checked = AutostartOn();
        _autostart.CheckedChanged += (_, _) => SetAutostart(_autostart.Checked);
        var menu = new ContextMenuStrip();
        menu.Items.Add(new ToolStripMenuItem("GoblinMusic — music for the Goblin overlay") { Enabled = false });
        menu.Items.Add(_status);
        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add(_autostart);
        menu.Items.Add("Quit", null, (_, _) => Quit());
        _icon = new NotifyIcon { Icon = MakeIcon(), Text = "GoblinMusic", ContextMenuStrip = menu, Visible = true };

        // 20 frames/s of levels (2 levels each), now-playing once a second.
        _levels = new System.Threading.Timer(_ => SendLevels(), null, 50, 50);
        // UI-thread timer: the tray status text may only change there.
        _meta = new System.Windows.Forms.Timer { Interval = 1000 };
        _meta.Tick += async (_, _) => await Tick();
        _meta.Start();
    }

    private void SendLevels()
    {
        var l = _capture.Drain();
        if (l.Count == 0) return;
        _server.Broadcast(Sse.Frame("lv", Sse.Levels(l)));
    }

    private int _busy;
    private async Task Tick()
    {
        if (Interlocked.Exchange(ref _busy, 1) == 1) return;
        try
        {
            _capture.Follow(); // (re)attach to Spotify if it started, restarted or closed
            var np = await _np.Read();
            var now = Environment.TickCount64;
            if (!np.SameAs(_last) || now - _lastSent > 5000)
            {
                _last = np; _lastSent = now;
                _server.Broadcast(Sse.Frame("np", Json(np)));
            }
            _status.Text = $"Spotify: {(_capture.Attached ? "found" : "not running")} · {np.Status} · overlays: {_server.Clients}";
        }
        finally { Volatile.Write(ref _busy, 0); }
    }

    private static string Json(Np n) => System.Text.Json.JsonSerializer.Serialize(new
    {
        status = n.Status, title = n.Title, artist = n.Artist, album = n.Album, pos = n.Pos, dur = n.Dur, at = n.At, art = n.Art,
    });

    private static bool AutostartOn()
    {
        using var k = Registry.CurrentUser.OpenSubKey(RunKey);
        return k?.GetValue("GoblinMusic") != null;
    }

    private static void SetAutostart(bool on)
    {
        using var k = Registry.CurrentUser.CreateSubKey(RunKey);
        if (on) k.SetValue("GoblinMusic", $"\"{Environment.ProcessPath}\"");
        else k.DeleteValue("GoblinMusic", false);
    }

    private void Quit()
    {
        _levels.Dispose(); _meta.Dispose();
        _capture.Dispose(); _server.Dispose();
        _icon.Visible = false; _icon.Dispose();
        ExitThread();
    }

    // Neon-green wave glyph drawn at runtime (no .ico file to ship).
    private static Icon MakeIcon()
    {
        using var bmp = new Bitmap(32, 32);
        using (var g = Graphics.FromImage(bmp))
        {
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
            g.FillEllipse(new SolidBrush(Color.FromArgb(5, 7, 5)), 0, 0, 31, 31);
            using var b = new SolidBrush(Color.FromArgb(168, 255, 31));
            int[] h = { 8, 16, 24, 14, 20, 10 };
            for (var i = 0; i < h.Length; i++) g.FillRectangle(b, 5 + i * 4, 16 - h[i] / 2, 3, h[i]);
        }
        return Icon.FromHandle(bmp.GetHicon());
    }
}

// Finds the running Spotify tree (Toolhelp snapshot: name + parent of every process).
internal static class Procs
{
    public static int? SpotifyRoot()
    {
        var list = new List<(int, int)>();
        var snap = CreateToolhelp32Snapshot(2, 0);
        if (snap == IntPtr.Zero || snap == new IntPtr(-1)) return null;
        try
        {
            var e = new PROCESSENTRY32W { dwSize = (uint)Marshal.SizeOf<PROCESSENTRY32W>() };
            for (var ok = Process32FirstW(snap, ref e); ok; ok = Process32NextW(snap, ref e))
                if (string.Equals(e.szExeFile, "Spotify.exe", StringComparison.OrdinalIgnoreCase))
                    list.Add(((int)e.th32ProcessID, (int)e.th32ParentProcessID));
        }
        finally { CloseHandle(snap); }
        return SpotifyPick.Root(list);
    }

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    private struct PROCESSENTRY32W
    {
        public uint dwSize, cntUsage, th32ProcessID; public IntPtr th32DefaultHeapID;
        public uint th32ModuleID, cntThreads, th32ParentProcessID; public int pcPriClassBase; public uint dwFlags;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)] public string szExeFile;
    }
    [DllImport("kernel32.dll", SetLastError = true)] private static extern IntPtr CreateToolhelp32Snapshot(uint flags, uint pid);
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] private static extern bool Process32FirstW(IntPtr snap, ref PROCESSENTRY32W e);
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] private static extern bool Process32NextW(IntPtr snap, ref PROCESSENTRY32W e);
    [DllImport("kernel32.dll")] private static extern bool CloseHandle(IntPtr h);
}
