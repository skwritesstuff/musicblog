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
        onError?: (e: { data: number }) => void;
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
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<YtPlayer | null>(null);
  const creatingRef = useRef<Promise<YtPlayer> | null>(null);
  const trackIndexRef = useRef(0);
  const playbackRequested = useRef(false);
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
            onError: () => { setIsPlaying(false); setStatus('TRACK UNAVAILABLE — TRY ANOTHER'); },
            onReady: (e) => {
              playerRef.current = e.target;
              setPlayerReady(true);
              resolve(e.target);
            },
            onStateChange: (e) => {
              const YTns = window.YT;
              if (!YTns) return;
              if (e.data === YTns.PlayerState.PLAYING) {
                if (!playbackRequested.current) { e.target.pauseVideo(); return; }
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
    playbackRequested.current = true;
    const player = await ensurePlayer().catch(() => { setStatus('STREAM UNAVAILABLE'); return null; });
    if (!player || !playbackRequested.current) return;
    player.playVideo();
    if (isMuted) player.mute();
    else player.unMute();
  }, [ensurePlayer, isMuted]);

  const pauseRadio = useCallback(() => {
    playbackRequested.current = false;
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

    playbackRequested.current = autoplay;
    const player = await ensurePlayer().catch(() => { setStatus('STREAM UNAVAILABLE'); return null; });
    if (!player || !playbackRequested.current) return;
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
    <aside aria-label="Retro Radio" className="fixed bottom-0 inset-x-0 z-50 bg-black border-t border-border-line max-h-[75dvh] overflow-y-auto">
      <div hidden={!screenOpen} id="radio-screen" className="border-b border-border-line px-4 py-3">
        <div className="max-w-sm mx-auto rounded-lg border-2 border-[#333] bg-[#111] p-2">
          <p className="font-mono text-[10px] text-text-muted mb-2">RETRO RADIO · YOUTUBE</p>
          <div className="relative h-[200px] w-full overflow-hidden bg-black crt-screen">
            <div id={PLAYER_HOST_ID} className="absolute inset-0 h-full w-full" />
            {!playerReady && <p className="absolute inset-0 flex items-center justify-center text-center p-4 text-xs text-text-muted">{!apiReady ? 'Loading tuner…' : status === 'TUNING…' ? 'Connecting to YouTube…' : 'Press Play Retro Radio to start listening.'}</p>}
          </div>
          <p role="status" aria-live="polite" className="font-mono text-[10px] text-text-muted mt-2">{status}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center gap-2 sm:gap-3">
        <button type="button" onClick={togglePlay} className="min-h-11 inline-flex items-center gap-2 rounded-lg bg-white text-black px-3 font-heading text-xs font-bold shrink-0" aria-label={isPlaying ? 'Pause Retro Radio' : 'Play Retro Radio'}>
          <span aria-hidden>{isPlaying ? '⏸' : '▶'}</span><span>{isPlaying ? 'Pause radio' : 'Play Retro Radio'}</span>
        </button>
        <p className={`text-xs text-text-muted truncate flex-1 min-w-0 sm:hidden ${screenOpen ? 'hidden' : ''}`} title={track.title}>{track.title}</p>
        <div className={`${screenOpen ? 'flex order-3 basis-full sm:order-none sm:basis-auto' : 'hidden sm:flex'} items-center gap-2 flex-1 min-w-0`}>
          <button type="button" onClick={() => void loadTrack(trackIndex - 1, true)} className="w-11 h-11 shrink-0 rounded border border-border-line" aria-label="Previous track">⏮</button>
          <button type="button" onClick={() => void loadTrack(trackIndex + 1, true)} className="w-11 h-11 shrink-0 rounded border border-border-line" aria-label="Next track">⏭</button>
          <label className="sr-only" htmlFor="retro-radio-track">Retro Radio track</label>
          <select id="retro-radio-track" value={trackIndex} onChange={(event) => void loadTrack(Number(event.target.value), true)} className="min-h-11 min-w-0 flex-1 rounded border border-border-line bg-card text-text-muted text-xs px-2">
            {PLAYLIST.map((item, index) => <option key={item.id} value={index}>{index + 1}. {item.title}</option>)}
          </select>
          <button type="button" onClick={toggleMute} className="w-11 h-11 shrink-0 rounded border border-border-line" aria-label={isMuted ? 'Unmute radio' : 'Mute radio'} aria-pressed={isMuted}>{isMuted ? '🔇' : '🔊'}</button>
        </div>
        <button type="button" onClick={() => { if (screenOpen) pauseRadio(); else playbackRequested.current = true; setScreenOpen(!screenOpen); }} aria-expanded={screenOpen} aria-controls="radio-screen" className="min-h-11 px-3 text-xs text-text-muted border border-border-line rounded-lg ml-auto shrink-0">
          {screenOpen ? 'Close radio' : 'Open radio'}
        </button>
      </div>
    </aside>
  );
}
