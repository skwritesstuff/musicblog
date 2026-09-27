'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { ArtistRecord } from '@/src/data/types';

export default function ArtistsDirectory({ artists }: { artists: ArtistRecord[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return artists;
    return artists.filter((a) => a.name.toLowerCase().includes(q));
  }, [artists, query]);

  return (
    <div>
      <div className="rounded-xl bg-notice-bg border border-accent/30 p-4 border-l-4 border-l-accent mb-8 flex items-start gap-3">
        <span className="text-lg">⚠️</span>
        <div className="text-xs sm:text-sm text-text-muted leading-relaxed">
          <strong className="text-accent font-heading block mb-0.5">CRITICAL ARCHIVAL NOTICE</strong>
          DO NOT INFER COVERAGE FROM POST COUNTS. During active years, the site published multiple times daily across
          thousands of artists. Post counts reflect only what was captured in fragmented Wayback Machine crawl passes.
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="artist-search" className="font-mono text-[11px] uppercase tracking-widest text-text-dark mb-2 block">
          Filter artists
        </label>
        <input
          id="artist-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artists (Skrillex, Mac Miller, Kendrick…)"
          className="w-full max-w-xl rounded-xl border border-border-line bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-dark outline-none focus:border-accent"
        />
      </div>

      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h2 className="font-heading text-xl font-extrabold">
          {filtered.length} artist{filtered.length === 1 ? '' : 's'}
        </h2>
        <span className="font-mono text-xs text-text-dark">Click any name to filter the Archive</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((artist) => (
          <Link
            key={artist.slug}
            href={`/archive?artist=${encodeURIComponent(artist.name)}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border-line bg-card px-4 py-3.5 hover:border-accent/40 transition-colors"
          >
            <span className="font-heading font-bold text-text-primary group-hover:text-accent transition-colors truncate">
              {artist.name}
            </span>
            <span className="shrink-0 rounded-full border border-border-line px-2.5 py-0.5 font-mono text-[11px] text-text-dark group-hover:border-accent/40 group-hover:text-accent">
              {artist.count} post{artist.count === 1 ? '' : 's'}
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-16">No artists match that search.</p>
      )}
    </div>
  );
}
