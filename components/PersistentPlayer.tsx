'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
  getPlayerState: () => number;
};

type YtNamespace = {
  Player: new (
    elementId: string | HTMLElement,
    options: {
      videoId?: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YtPlayer }) => void;
        onStateChange?: (e: { data: number; target: YtPlayer }) => void;
      };
    },
  ) => YtPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
};

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PLAYLIST = [
  { title: 'Mac Miller – Futuristic Funk (2011)', id: 'PVeRKV23s5U' },
  { title: 'Frank Ocean – Acura Integurl (2011)', id: 'NNlXo4ymLlU' },
  { title: 'Childish Gambino – Freaks and Geeks (2011)', id: '27d138zhyZQ' },
  { title: 'Lupe Fiasco – Words I Never Said (2011)', id: '22l1sf5JZD0' },
  { title: 'Tyler, The Creator ft. Frank Ocean – She (2011)', id: '7MTCTK70jIU' },
  { title: 'The Weeknd – The Morning (2011)', id: 'uac4q389yaM' },
  { title: 'Wiz Khalifa – No Sleep (2011)', id: 'evMR4aZMpjM' },
  { title: 'Skrillex – Rock That Body Remix (2011)', id: 'Z13MDsCReE0' },
  { title: 'Timeflies – Adderall & Red Bull (2011)', id: '11OguJCoXqQ' },
  { title: 'Curren$y ft. Freddie Gibbs – Scottie Pippen (2011)', id: '5Al3VmPNzBE' },
] as const;

const PLAYER_HOST_ID = 'yt-retro-radio-host';

function loadYouTubeApi(): Promise<YtNamespace> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('YouTube API requires a browser'));
      return;
    }
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      try {
        prior?.();
      } catch {
        /* ignore prior handler errors */
      }
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error('YouTube API ready without YT.Player'));
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.body.appendChild(tag);
    }
  });
}

export default function PersistentPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [screenOpen, setScreenOpen] = useState(false);
  const [status, setStatus] = useState('STREAM READY');
  const [apiReady, setApiReady] = useState(false);

  const playerRef = useRef<YtPlayer | null>(null);
  const creatingRef = useRef<Promise<YtPlayer> | null>(null);
  const trackIndexRef = useRef(0);
  const track = PLAYLIST[trackIndex];

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi()
      .then(() => {
        if (!cancelled) setApiReady(true);
      })
      .catch(() => {
        if (!cancelled) setStatus('STREAM UNAVAILABLE');
      });
    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const ensurePlayer = useCallback(async (): Promise<YtPlayer | null> => {
    if (playerRef.current) return playerRef.current;
    if (creatingRef.current) return creatingRef.current;

    creatingRef.current = (async () => {
      const YT = await loadYouTubeApi();
      const host = document.getElementById(PLAYER_HOST_ID);
      if (!host) throw new Error('Missing YouTube host element');

      return await new Promise<YtPlayer>((resolve) => {
        const player = new YT.Player(PLAYER_HOST_ID, {
          width: '100%',
          height: '100%',
          videoId: PLAYLIST[trackIndexRef.current].id,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              playerRef.current = e.target;
              resolve(e.target);
            },
            onStateChange: (e) => {
              const YTns = window.YT;
              if (!YTns) return;
              if (e.data === YTns.PlayerState.PLAYING) {
                setIsPlaying(true);
                setStatus('PLAYING STREAM');
              } else if (e.data === YTns.PlayerState.PAUSED) {
                setIsPlaying(false);
                setStatus('STREAM PAUSED');
              } else if (e.data === YTns.PlayerState.BUFFERING) {
                setStatus('BUFFERING…');
              } else if (e.data === YTns.PlayerState.ENDED) {
                const next = (trackIndexRef.current + 1) % PLAYLIST.length;
                trackIndexRef.current = next;
                setTrackIndex(next);
                setStatus('NEXT TRACK');
                e.target.loadVideoById(PLAYLIST[next].id);
              }
            },
          },
        });
      });
    })();

    try {
      return await creatingRef.current;
    } finally {
      creatingRef.current = null;
    }
  }, []);

  const playRadio = useCallback(async () => {
    // Visible player + direct user gesture is required for mobile audio.
    flushSync(() => {
      setScreenOpen(true);
      setStatus('TUNING…');
    });
    const player = await ensurePlayer();
    if (!player) return;
    player.playVideo();
    if (isMuted) player.mute();
    else player.unMute();
  }, [ensurePlayer, isMuted]);

  const pauseRadio = useCallback(() => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
    setStatus('STREAM PAUSED');
  }, []);

  const togglePlay = () => {
    if (isPlaying) pauseRadio();
    else void playRadio();
  };

  const loadTrack = async (index: number, autoplay: boolean) => {
    const idx = (index + PLAYLIST.length) % PLAYLIST.length;
    trackIndexRef.current = idx;
    setTrackIndex(idx);

    flushSync(() => {
      setScreenOpen(true);
      setStatus(autoplay ? 'TUNING…' : 'CUED');
    });

    const player = await ensurePlayer();
    if (!player) return;
    player.loadVideoById(PLAYLIST[idx].id);
    if (autoplay) {
      player.playVideo();
      if (isMuted) player.mute();
      else player.unMute();
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) {
      setIsMuted((m) => !m);
      return;
    }
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  return (
    <aside className="fixed bottom-0 inset-x-0 z-50 bg-[#000000] border-t border-[#1a1a1a]">
      {/* Visible CRT mini-screen — required for mobile YouTube audio */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-b border-[#1a1a1a] ${
          screenOpen ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!screenOpen}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex justify-center sm:justify-start">
          <div className="relative w-[240px] shrink-0">
            <div className="rounded-lg border-2 border-[#333] bg-[#111] p-2 shadow-[inset_0_0_0_1px_#222,0_8px_24px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#94a3b8]">
                  Retro CRT // YT Stream
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'player-active-dot' : 'bg-[#64748b]'}`}
                  aria-hidden
                />
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black border border-[#222] crt-screen">
                <div id={PLAYER_HOST_ID} className="absolute inset-0 h-full w-full" />
                {!apiReady && (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-[#64748b]">
                    LOADING TUNER…
                  </div>
                )}
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] text-[#64748b] truncate">{status}</span>
                <button
                  type="button"
                  onClick={() => setScreenOpen(false)}
                  className="font-mono text-[9px] uppercase tracking-wider text-[#94a3b8] hover:text-white"
                >
                  Hide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 font-mono text-[11px] font-extrabold uppercase tracking-wide shrink-0 transition-colors ${
              isPlaying
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20 border border-[#222]'
            }`}
            aria-label={isPlaying ? 'Pause Retro Radio' : 'Play Retro Radio'}
          >
            <span aria-hidden>{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'PAUSE RADIO' : 'PLAY RETRO RADIO'}</span>
          </button>

          <button
            type="button"
            onClick={() => void loadTrack(trackIndex - 1, true)}
            className="inline-flex w-8 h-8 items-center justify-center rounded border border-[#1a1a1a] bg-[#000000] text-[#94a3b8] hover:text-white"
            aria-label="Previous track"
          >
            ⏮
          </button>
          <button
            type="button"
            onClick={() => void loadTrack(trackIndex + 1, true)}
            className="inline-flex w-8 h-8 items-center justify-center rounded border border-[#1a1a1a] bg-[#000000] text-[#94a3b8] hover:text-white"
            aria-label="Next track"
          >
            ⏭
          </button>

          <div className="flex items-center gap-2 min-w-0 flex-1 basis-[200px] rounded border border-[#1a1a1a] bg-[#0a0a0a] px-2 py-1">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPlaying ? 'player-active-dot' : 'bg-[#f59e0b]'}`}
              aria-hidden
            />
            <label className="sr-only" htmlFor="retro-radio-track">
              Retro Radio track
            </label>
            <select
              id="retro-radio-track"
              value={trackIndex}
              onChange={(e) => void loadTrack(Number(e.target.value), true)}
              className="w-full min-w-0 bg-transparent text-[#94a3b8] font-mono text-[11px] sm:text-xs outline-none cursor-pointer"
            >
              {PLAYLIST.map((t, i) => (
                <option key={t.id} value={i} className="bg-black text-white">
                  {i + 1}. {t.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex w-8 h-8 items-center justify-center rounded border border-[#1a1a1a] bg-[#000000] text-[#94a3b8] hover:text-white"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono shrink-0 ml-auto">
            <span className="text-[#64748b] truncate max-w-[220px]" title={track.title}>
              {status}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#000000] border border-[#1a1a1a] text-[#94a3b8] font-bold tracking-wide">
              192 KBPS STEREO
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
