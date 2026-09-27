'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import type { ArchivePost } from '@/src/data/types';

const YEAR_FILTERS = [
  { id: 'all', label: 'All' },
  { id: '2009', label: '2009' },
  { id: '2010', label: '2010' },
  { id: '2011', label: '2011' },
  { id: '2012', label: '2012' },
] as const;

const GENRE_FILTERS = [
  'All',
  'Hip-Hop',
  'Electronic / Dubstep',
  'Mashup',
  'R&B / Soul',
  'Indie',
] as const;

function matchesGenre(post: ArchivePost, genre: string) {
  if (genre === 'All') return true;
  if (genre === 'Hip-Hop') {
    return (
      post.genre === 'Hip-Hop' ||
      /hip hop|mixtape|playlist|interview|live/i.test(post.category)
    );
  }
  if (genre === 'R&B / Soul') {
    return /r&b|soul|rnb/i.test(post.category) || post.genre === 'R&B / Soul';
  }
  return post.genre === genre || post.category.toLowerCase().includes(genre.toLowerCase().split(' / ')[0]);
}

export default function ArchiveBrowser({ posts }: { posts: ArchivePost[] }) {
  const [year, setYear] = useState<string>('all');
  const [genre, setGenre] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [artistParam, setArtistParam] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const a = params.get('artist');
    const y = params.get('year');
    const g = params.get('genre');
    const q = params.get('q');
    if (a) {
      setArtistParam(a);
      setQuery(a);
    }
    if (y) setYear(y);
    if (g) setGenre(g);
    if (q) setQuery(q);
  }, []);

  const yearCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length };
    for (const p of posts) {
      const key = String(p.year);
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (year !== 'all' && String(p.year) !== year) return false;
      if (!matchesGenre(p, genre)) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.artists.join(' ')} ${p.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, year, genre, query]);

  return (
    <div>
      <div className="rounded-xl bg-notice-bg border border-accent/30 p-4 border-l-4 border-l-accent mb-8 flex items-start gap-3">
        <span className="text-lg">⚠️</span>
        <div className="text-xs sm:text-sm text-text-muted leading-relaxed">
          <strong className="text-accent font-heading block mb-0.5">Incomplete Salvage</strong>
          Thousands of daily tracks were published between 2009–2012; these 360 posts represent only what survived
          Wayback Machine crawler passes.
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-dark mb-2">Filter by Year</p>
          <div className="flex flex-wrap gap-2">
            {YEAR_FILTERS.map((y) => {
              const count = yearCounts[y.id] || 0;
              const active = year === y.id;
              return (
                <button
                  key={y.id}
                  type="button"
                  onClick={() => setYear(y.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-heading font-semibold border transition-colors ${
                    active
                      ? 'bg-accent text-bg border-accent'
                      : 'bg-card text-text-muted border-border-line hover:border-accent/40'
                  }`}
                >
                  {y.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-dark mb-2">Filter by Tag / Genre</p>
          <div className="flex flex-wrap gap-2">
            {GENRE_FILTERS.map((g) => {
              const active = genre === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`rounded-full px-3 py-1.5 text-xs font-heading font-semibold border transition-colors ${
                    active
                      ? 'bg-accent text-bg border-accent'
                      : 'bg-card text-text-muted border-border-line hover:border-accent/40'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="archive-search" className="font-mono text-[11px] uppercase tracking-widest text-text-dark mb-2 block">
            Search titles & artists
          </label>
          <input
            id="archive-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setArtistParam('');
            }}
            placeholder="Search post titles or artist names…"
            className="w-full rounded-xl border border-border-line bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-dark outline-none focus:border-accent"
          />
          {artistParam && (
            <p className="mt-2 text-xs text-text-dark">
              Filtering from Artists directory:{' '}
              <span className="text-accent font-semibold">{artistParam}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h2 className="font-heading text-xl font-extrabold text-text-primary">
          {filtered.length.toLocaleString()} result{filtered.length === 1 ? '' : 's'}
        </h2>
        <span className="font-mono text-xs text-text-dark">360 salvaged total</span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-line text-left font-mono text-[11px] uppercase tracking-wider text-text-dark">
              <th className="px-4 py-3 w-[12%]">Date</th>
              <th className="px-4 py-3 w-[38%]">Title</th>
              <th className="px-4 py-3 w-[18%]">Artist</th>
              <th className="px-4 py-3 w-[16%]">Genre</th>
              <th className="px-4 py-3 w-[16%] text-right">Wayback</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.slug} className="border-b border-border-line/60 hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-mono text-xs text-text-dark whitespace-nowrap">{post.date}</td>
                <td className="px-4 py-3 font-semibold text-text-primary">{post.title}</td>
                <td className="px-4 py-3 text-text-muted">{post.artists.join(', ') || '—'}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-accent/30 px-2 py-0.5 text-[11px] font-heading font-bold text-accent">
                    {post.category || post.genre}
                  </span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {post.waybackUrl ? (
                    <a
                      href={post.waybackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-app-accent hover:underline"
                    >
                      Snapshot ↗
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-text-dark">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-border-line bg-card p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs text-text-dark">{post.date}</span>
              <span className="inline-flex rounded-full border border-accent/30 px-2 py-0.5 text-[10px] font-heading font-bold text-accent">
                {post.category || post.genre}
              </span>
            </div>
            <h3 className="font-heading font-bold text-text-primary mb-1">{post.title}</h3>
            <p className="text-sm text-text-muted mb-3">{post.artists.join(', ') || 'Various'}</p>
            {post.waybackUrl && (
              <a
                href={post.waybackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-app-accent hover:underline"
              >
                Wayback Snapshot ↗
              </a>
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-16">No posts match these filters.</p>
      )}

      <p className="mt-8 text-center text-xs text-text-dark">
        Looking for a specific artist?{' '}
        <Link href="/artists" className="text-accent hover:underline">
          Browse the Artists Directory
        </Link>
      </p>
    </div>
  );
}
