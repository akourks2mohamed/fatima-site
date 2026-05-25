import { useEffect, useRef, useState, ChangeEvent, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Disc3 } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function MusicPlayer() {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(60);
  const [error, setError] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const playerReadyRef = useRef(false);
  const containerId = "youtube-music-player";

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }
    if (window.onYouTubeIframeAPIReady) return;

    window.onYouTubeIframeAPIReady = () => setApiReady(true);

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onerror = () => setError(true);
      document.head.appendChild(tag);
    }

    return () => {
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (!apiReady) return;

    const el = document.getElementById(containerId);
    if (!el) return;

    try {
      const newPlayer = new window.YT.Player(containerId, {
        height: '0',
        width: '0',
        videoId: 'qhqJYGn5x5E',
        playerVars: {
          autoplay: 0,
          loop: 1,
          list: 'RDqhqJYGn5x5E',
          listType: 'playlist',
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume);
            playerReadyRef.current = true;
            setPlayer(event.target);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
          onError: () => setError(true),
        },
      });
      return () => {
        if (newPlayer && newPlayer.destroy) newPlayer.destroy();
      };
    } catch {
      setError(true);
    }
  }, [apiReady]);

  const handlePlayPause = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleMuteToggle = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (player) {
      player.setVolume(val);
      if (val > 0 && isMuted) {
        player.unMute();
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40">
      <div
        id={containerId}
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      ></div>

      <div className="bg-white/85 backdrop-blur-lg border border-rose-pink/20 shadow-[0_10px_40px_-10px_rgba(233,30,99,0.2)] rounded-3xl p-3 md:p-4 flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse max-w-[290px] md:max-w-[340px] transition-all duration-500 hover:shadow-[0_15px_45px_-8px_rgba(233,30,99,0.3)]">

        <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
          <div className={`w-full h-full rounded-full bg-gradient-to-br from-rose-deep to-rose-dark shadow-inner flex items-center justify-center overflow-hidden transition-transform ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
            <Disc3 className="w-8 h-8 text-white/80" />
          </div>
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-deep"></span>
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {error ? (
            <p className="text-[10px] text-rose-dark font-mono">تعذر تشغيل الموسيقى</p>
          ) : (
            <p className="text-[10px] md:text-xs font-mono text-rose-pink tracking-wider">رومانسية بلا حدود</p>
          )}
          <p className="text-xs md:text-sm font-semibold text-charcoal truncate">Romantic Music</p>

          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1.5">
            <button
              onClick={handlePlayPause}
              className="p-1.5 rounded-full bg-gradient-to-r from-rose-deep to-rose-dark text-white transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
              disabled={!player}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            <button
              onClick={handleMuteToggle}
              className="p-1.5 rounded-full bg-rose-pink/10 hover:bg-rose-pink/20 text-rose-dark transition-colors cursor-pointer disabled:opacity-50"
              disabled={!player}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 md:w-20 h-1 bg-rose-pink/20 rounded-lg appearance-none cursor-pointer accent-rose-deep"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
