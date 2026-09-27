'use client';

import React, { useRef, useState } from 'react';

const PLAYLIST = [
  {
    title: 'Mac Miller – Futuristic Funk (2011)',
    src: 'https://ia601408.us.archive.org/24/items/j-cole-return-of-simba/j-cole-return-of-simba.mp3',
  },
  {
    title: 'J. Cole – Return of Simba (2009)',
    src: 'https://ia601408.us.archive.org/24/items/j-cole-return-of-simba/j-cole-return-of-simba.mp3',
  },
];

export default function PersistentPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = PLAYLIST[trackIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeTrack = (next: number) => {
    const idx = (next + PLAYLIST.length) % PLAYLIST.length;
    setTrackIndex(idx);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  return (
    <aside className="fixed bottom-0 inset-x-0 z-50 bg-[#000000] border-t border-[#1e2530] px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isPlaying ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => changeTrack(trackIndex - 1)}
            className="hidden sm:inline-flex w-7 h-7 items-center justify-center rounded border border-[#1e2530] bg-[#000000] text-[#94a3b8] hover:text-white"
            aria-label="Previous track"
          >
            ⏮
          </button>
          <button
            type="button"
            onClick={() => changeTrack(trackIndex + 1)}
            className="hidden sm:inline-flex w-7 h-7 items-center justify-center rounded border border-[#1e2530] bg-[#000000] text-[#94a3b8] hover:text-white"
            aria-label="Next track"
          >
            ⏭
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPlaying ? 'player-active-dot' : 'bg-[#64748b]'}`}
                aria-hidden
              />
              <p className="font-heading text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] truncate">
                PARTIAL DIGITAL RESCUE // THE MUSIK BOX • IN AUDIO WE TRUST (2009–2012) • 360 PRESERVED POSTS
              </p>
            </div>
            <p className="font-mono text-xs text-white truncate" title={track.title}>
              {track.title}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-mono shrink-0">
          <span className="px-2 py-0.5 rounded bg-[#000000] border border-[#1e2530] text-[#94a3b8] font-bold tracking-wide">
            BITRATE: 192 KBPS MP3 [ARCHIVED]
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => changeTrack(trackIndex + 1)}
        className="hidden"
      />
    </aside>
  );
}
