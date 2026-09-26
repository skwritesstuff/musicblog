'use client';

import React, { useState, useRef } from 'react';
import type { CuratedPost } from './CuratedFeed';

export default function PersistentPlayer({ activeTrack }: { activeTrack?: CuratedPost | null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const defaultTitle = activeTrack
    ? `${activeTrack.artist} — ${activeTrack.title}`
    : "STREAMPOD RADIO // THE MUSIK BOX & IN AUDIO WE TRUST (2009–2012)";

  return (
    <aside className="fixed bottom-0 inset-x-0 z-50 bg-[#0d1017]/95 border-t border-border-line backdrop-blur-xl px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform ${
              isPlaying ? 'bg-accent text-bg' : 'bg-white/10 text-accent hover:bg-white/20'
            }`}
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

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent truncate">
                {activeTrack ? 'NOW STREAMING' : 'VINTAGE 192 KBPS STREAM'}
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted truncate">{defaultTitle}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-text-dark shrink-0">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-app-accent-text">
            192 KBPS MP3
          </span>
          <span className="text-[11px] text-text-dark">
            THE MUSIK BOX & IN AUDIO WE TRUST · 2009–2012
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src="https://ia601408.us.archive.org/24/items/j-cole-return-of-simba/j-cole-return-of-simba.mp3"
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />
    </aside>
  );
}
