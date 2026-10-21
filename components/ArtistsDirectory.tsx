'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { normalizeSearch } from '@/lib/archiveFilters';
import type { ArtistRecord } from '@/src/data/types';

export default function ArtistsDirectory({ artists }: { artists: ArtistRecord[] }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name');

  const filtered = useMemo(() => {
    const q = normalizeSearch(query.trim());
    const matches = artists.filter((artist) => normalizeSearch(artist.name).includes(q));
    return matches.sort((a, b) => sort === 'count' ? b.count - a.count || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
  }, [artists, query, sort]);

  return (
    <div>
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
          className="w-full max-w-xl rounded-xl border border-border-line bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-dark outline-none focus:border-white/40"
        />
        <label htmlFor="artist-sort" className="block text-sm text-text-muted mt-4 mb-2">Sort artists</label>
        <select id="artist-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-xl bg-card border border-border-line px-4 py-3 text-sm">
          <option value="name">Alphabetical</option><option value="count">Most preserved records</option>
        </select>
      </div>

      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h2 role="status" aria-live="polite" className="font-heading text-xl font-extrabold">
          {filtered.length} artist{filtered.length === 1 ? '' : 's'}
        </h2>
        <span className="font-mono text-xs text-text-dark">Select a name to explore</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((artist) => (
          <Link
            key={artist.slug}
            href={`/archive/?artist=${encodeURIComponent(artist.name)}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border-line bg-card px-4 py-3.5 hover:border-border-line transition-colors"
          >
            <span className="font-heading font-bold text-text-primary group-hover:text-text-primary transition-colors truncate">
              {artist.name}
            </span>
            <span className="shrink-0 rounded-full border border-border-line px-2.5 py-0.5 font-mono text-[11px] text-text-dark group-hover:border-border-line group-hover:text-text-primary">
              {artist.count} record{artist.count === 1 ? '' : 's'}
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
