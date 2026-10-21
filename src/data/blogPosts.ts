import { archivePosts } from '@/lib/archive';
import { getCuratedBlogPosts, getCuratedPostBySlug, type CuratedPost } from '@/src/data/curatedPosts';
import type { ArchivePost } from '@/src/data/types';

export type BlogBrand = 'The MuSiK Box' | 'In Audio We Trust';

export type ResolvedBlogPost = {
  slug: string;
  artist: string;
  title: string;
  date: string;
  brand: BlogBrand;
  category: string;
  youtubeId?: string;
  description: string;
  waybackUrl: string;
  curated: boolean;
};

const ARCHIVE_POSTS = archivePosts as ArchivePost[];

function inferBrand(waybackUrl: string, date: string): BlogBrand {
  if (date < '2011-01') return 'The MuSiK Box';
  if (/themusikbox\.com/i.test(waybackUrl)) return 'The MuSiK Box';
  return 'In Audio We Trust';
}

function fromCurated(post: CuratedPost): ResolvedBlogPost {
  const slug = post.postSlug.replace(/^\/blog\//, '').replace(/\/$/, '');
  const original = ARCHIVE_POSTS.find((record) => record.slug === slug);
  return {
    slug,
    artist: original?.artists.join(', ') || post.artist,
    title: original?.title ?? post.title,
    date: original?.date ?? post.date,
    brand: original ? inferBrand(original.waybackUrl, original.date) : post.brand,
    category: original?.category ?? post.category,
    youtubeId: post.youtubeId,
    description: post.description,
    waybackUrl: original?.waybackUrl ?? post.waybackUrl,
    curated: true,
  };
}

function fromArchive(post: ArchivePost): ResolvedBlogPost {
  const artist = post.artists.join(', ') || 'Artist not identified';
  return {
    slug: post.slug,
    artist,
    title: post.title,
    date: post.date,
    brand: inferBrand(post.waybackUrl, post.date),
    category: post.category || post.genre,
    description: `Salvaged archive record for “${post.title}” (${post.date}). Full editorial body was not recovered from surviving Wayback Machine crawls; use the original snapshot for the contemporary write-up.`,
    waybackUrl: post.waybackUrl,
    curated: false,
  };
}

export function getAllBlogSlugs(): string[] {
  const slugs = new Set<string>();
  for (const post of getCuratedBlogPosts()) {
    slugs.add(post.postSlug.replace(/^\/blog\//, '').replace(/\/$/, ''));
  }
  for (const post of ARCHIVE_POSTS) {
    if (post.slug) slugs.add(post.slug);
  }
  return Array.from(slugs);
}

export function getBlogPostBySlug(slug: string): ResolvedBlogPost | undefined {
  const curated = getCuratedPostBySlug(slug);
  if (curated) return fromCurated(curated);

  const archive = ARCHIVE_POSTS.find((post) => post.slug === slug);
  if (archive) return fromArchive(archive);

  return undefined;
}

/** Related records share an explicitly cataloged artist, never a substring match. */
export function getRelatedBlogPosts(slug: string, limit = 3): ArchivePost[] {
  const original = ARCHIVE_POSTS.find((post) => post.slug === slug);
  const curated = getCuratedPostBySlug(slug);
  const artists = original?.artists ?? (curated ? [curated.artist] : []);
  return ARCHIVE_POSTS.filter((post) => post.slug !== slug && post.artists.some((artist) => artists.includes(artist))).slice(0, limit);
}
