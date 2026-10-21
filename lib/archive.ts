import originalPosts from '@/src/data/archivePosts.json';
import annotations from '@/src/data/catalogAnnotations.json';
import type { ArchivePost, ArtistRecord } from '@/src/data/types';

type Annotation = { artists?: string[]; genres?: string[] };
const notes = annotations as Record<string, Annotation>;

/** Recovery data stays unchanged. These are separately documented browsing annotations. */
export const archivePosts = (originalPosts as ArchivePost[]).map((post) => ({
  ...post,
  artists: notes[post.slug]?.artists ?? post.artists,
  discoveryGenres: notes[post.slug]?.genres ?? [post.genre],
}));

const counts = new Map<string, number>();
for (const post of archivePosts) {
  for (const artist of Array.from(new Set(post.artists))) counts.set(artist, (counts.get(artist) ?? 0) + 1);
}
export const archiveArtists: ArtistRecord[] = Array.from(counts, ([name, count]) => ({
  name, count, slug: encodeURIComponent(name.toLowerCase()),
})).sort((a, b) => a.name.localeCompare(b.name));
