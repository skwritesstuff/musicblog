'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { ArchivePost } from '@/src/data/types';
import { EMPTY_FILTERS, filterArchive, filtersUrl, readFilters, type ArchiveFilters } from '@/lib/archiveFilters';

export default function ArchiveBrowser({ posts }: { posts: ArchivePost[] }) {
  const genres = useMemo(() => ['All', ...Array.from(new Set(posts.flatMap((post) => post.discoveryGenres ?? [post.genre]))).sort()], [posts]);
  const [filters, setFilters] = useState<ArchiveFilters>(EMPTY_FILTERS);
  const [shareStatus, setShareStatus] = useState('');
  const editingSearch = useRef(false);
  useEffect(() => {
    const restore = () => { setFilters(readFilters(window.location.search, genres)); editingSearch.current = false; setShareStatus(''); };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [genres]);
  function update(next: Partial<ArchiveFilters>, searchEdit = false) {
    const value = { ...filters, ...next };
    const url = filtersUrl(value);
    if (url !== window.location.pathname + window.location.search) {
      if (searchEdit && editingSearch.current) window.history.replaceState(null, '', url);
      else window.history.pushState(null, '', url);
    }
    editingSearch.current = searchEdit;
    setFilters(value);
    setShareStatus('');
  }
  async function copyView() {
    try {
      await navigator.clipboard.writeText(new URL(filtersUrl(filters), window.location.origin).href);
      setShareStatus('Link copied');
    } catch { setShareStatus('Copy this view’s address from your browser.'); }
  }
  const filtered = useMemo(() => filterArchive(posts, filters), [posts, filters]);
  const hasFilters = Object.keys(EMPTY_FILTERS).some((key) => filters[key as keyof ArchiveFilters] !== EMPTY_FILTERS[key as keyof ArchiveFilters]);
  const pill = (active: boolean) => `min-h-11 rounded-full px-3 py-2 text-xs font-heading font-semibold border transition-colors ${active ? 'bg-white text-black border-white' : 'bg-card text-text-muted border-border-line hover:border-white/50'}`;
  return <div>
    <div className="mb-5">
      <label htmlFor="archive-search" className="block font-heading font-semibold mb-2">Search titles & artists</label>
      <input id="archive-search" type="search" value={filters.query}
        onChange={(event) => update({ query: event.target.value }, true)}
        onBlur={() => { editingSearch.current = false; }} placeholder="Try Mac Miller, Frank Ocean, or a song title…"
        className="w-full rounded-xl border border-border-line bg-card px-4 py-3 text-base placeholder:text-text-muted" />
    </div>
    <div className="space-y-4 mb-5">
      <fieldset><legend className="font-mono text-xs text-text-muted mb-2">Year</legend>
        <div className="flex flex-wrap gap-2">{['all', '2009', '2010', '2011', '2012'].map((year) => <button key={year} type="button" aria-pressed={filters.year === year} onClick={() => update({ year })} className={pill(filters.year === year)}>
          {year === 'all' ? 'All years' : year} ({year === 'all' ? posts.length : posts.filter((p) => String(p.year) === year).length})
        </button>)}</div>
      </fieldset>
      <fieldset><legend className="font-mono text-xs text-text-muted mb-2">Browse by genre</legend>
        <div className="flex flex-wrap gap-2">{genres.map((genre) => <button key={genre} type="button" aria-pressed={filters.genre === genre} onClick={() => update({ genre })} className={pill(filters.genre === genre)}>
          {genre} ({genre === 'All' ? posts.length : posts.filter((p) => (p.discoveryGenres ?? [p.genre]).includes(genre)).length})
        </button>)}</div>
      </fieldset>
    </div>
    <div className="flex flex-wrap items-center gap-3 mb-5">
      {filters.artist && <button type="button" onClick={() => update({ artist: '' })} className={pill(true)} aria-label={`Remove artist filter ${filters.artist}`}>{filters.artist} ×</button>}
      {hasFilters && <button type="button" onClick={() => update(EMPTY_FILTERS)} className="min-h-11 text-sm underline underline-offset-4">Clear filters</button>}
      <button type="button" onClick={() => void copyView()} className="min-h-11 text-sm text-text-muted underline underline-offset-4">Copy link to this view</button>
      <span role="status" className="text-sm text-text-muted">{shareStatus}</span>
    </div>
    <div className="flex items-baseline justify-between gap-3 mb-4">
      <h2 role="status" aria-live="polite" aria-atomic="true" className="font-heading text-xl font-extrabold">{filtered.length} result{filtered.length === 1 ? '' : 's'}</h2>
      <span className="font-mono text-xs text-text-muted">{posts.length} preserved records</span>
    </div>
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-border-line bg-card">
      <table className="w-full text-sm"><caption className="sr-only">Preserved archive entries matching your filters</caption>
        <thead><tr className="border-b border-border-line text-left font-mono text-xs text-text-muted">
          {['Date', 'Entry', 'Artists', 'Browsing genre', 'Source'].map((label) => <th key={label} scope="col" className="px-4 py-3">{label}</th>)}
        </tr></thead>
        <tbody>{filtered.map((post) => <tr key={post.slug} className="border-b border-border-line hover:bg-white/5">
          <td className="px-4 py-4 whitespace-nowrap font-mono text-xs text-text-muted">{post.date}</td>
          <td className="px-4 py-4 font-semibold"><Link href={`/blog/${post.slug}/`} className="underline decoration-white/25 underline-offset-4 hover:decoration-white">{post.title}</Link></td>
          <td className="px-4 py-4 text-text-muted">{post.artists.join(', ') || 'Not identified'}</td>
          <td className="px-4 py-4 text-xs text-text-muted">{(post.discoveryGenres ?? [post.genre]).join(' · ')}</td>
          <td className="px-4 py-4"><a href={post.waybackUrl} target="_blank" rel="noopener noreferrer" aria-label={`Wayback snapshot: ${post.title}`} className="underline underline-offset-4">Wayback ↗</a></td>
        </tr>)}</tbody>
      </table>
    </div>
    <div className="md:hidden space-y-3">{filtered.map((post) => <article key={post.slug} className="rounded-2xl border border-border-line bg-card p-4">
      <p className="font-mono text-xs text-text-muted mb-2">{post.date} · {(post.discoveryGenres ?? [post.genre]).join(' / ')}</p>
      <h3 className="font-heading font-bold mb-2"><Link href={`/blog/${post.slug}/`} className="underline decoration-white/25 underline-offset-4">{post.title}</Link></h3>
      <p className="text-sm text-text-muted mb-3">{post.artists.join(', ') || 'Artist not identified'}</p>
      <div className="flex flex-wrap gap-4"><Link href={`/blog/${post.slug}/`} className="inline-flex min-h-11 items-center text-sm font-semibold">View archive entry →</Link>
      <a href={post.waybackUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-text-muted underline">Wayback ↗</a></div>
    </article>)}</div>
    {!filtered.length && <div className="text-center py-12"><p className="text-text-muted mb-3">No entries match this combination.</p><button type="button" onClick={() => update(EMPTY_FILTERS)} className="rounded-full bg-white text-black px-5 py-3 font-semibold">Clear all filters</button></div>}
    <p className="mt-8 text-sm text-text-muted">This is a partial recovery. Browsing genres are present-day catalog labels; original catalog categories remain on each entry. <Link href="/artists/" className="text-white underline underline-offset-4">Browse artists</Link>.</p>
  </div>;
}
