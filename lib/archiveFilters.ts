import type { ArchivePost } from '../src/data/types';
export type ArchiveFilters = { year: string; genre: string; query: string; artist: string };
export const EMPTY_FILTERS: ArchiveFilters = { year: 'all', genre: 'All', query: '', artist: '' };
export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
export function readFilters(search: string, genres: string[]): ArchiveFilters {
  const params = new URLSearchParams(search);
  const year = params.get('year') ?? 'all';
  const genre = params.get('genre') ?? 'All';
  return {
    year: ['2009', '2010', '2011', '2012'].includes(year) ? year : 'all',
    genre: genres.includes(genre) ? genre : 'All',
    query: params.get('q') ?? '', artist: params.get('artist') ?? '',
  };
}
export function filtersUrl(filters: ArchiveFilters) {
  const params = new URLSearchParams();
  if (filters.year !== 'all') params.set('year', filters.year);
  if (filters.genre !== 'All') params.set('genre', filters.genre);
  if (filters.artist) params.set('artist', filters.artist);
  if (filters.query.trim()) params.set('q', filters.query.trim());
  return `/archive/${params.size ? `?${params.toString()}` : ''}`;
}
export function filterArchive(posts: ArchivePost[], filters: ArchiveFilters) {
  const query = normalizeSearch(filters.query.trim());
  return posts.filter((post) => {
    if (filters.year !== 'all' && String(post.year) !== filters.year) return false;
    if (filters.genre !== 'All' && !(post.discoveryGenres ?? [post.genre]).includes(filters.genre)) return false;
    if (filters.artist && !post.artists.some((artist) => normalizeSearch(artist) === normalizeSearch(filters.artist))) return false;
    return !query || normalizeSearch(`${post.title} ${post.artists.join(' ')}`).includes(query);
  });
}
