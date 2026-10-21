import discoveries from '@/src/content/editorial/discoveries.json';

export interface CuratedPost {
  id: string;
  artist: string;
  title: string;
  date: string;
  brand: 'The MuSiK Box' | 'In Audio We Trust';
  category: string;
  youtubeId?: string;
  videoSrc?: string;
  poster?: string;
  mediaLabel?: string;
  readHref?: string;
  listeningTitle?: string;
  description: string;
  sourceNote?: string;
  recordLabel?: string;
  postSlug: string;
  waybackUrl: string;
}

export const CURATED_POSTS: CuratedPost[] = discoveries.entries as CuratedPost[];

/** Curated entries that resolve under `/blog/[slug]`. */
export function getCuratedBlogPosts(): CuratedPost[] {
  return CURATED_POSTS.filter((post) => post.postSlug.startsWith('/blog/'));
}

export function getCuratedPostBySlug(slug: string): CuratedPost | undefined {
  return getCuratedBlogPosts().find((post) => {
    const postSlug = post.postSlug.replace(/\/$/, '');
    return postSlug === `/blog/${slug}` || postSlug.endsWith(`/${slug}`);
  });
}

/**
 * Safe "Read Post" href: only in-app `/blog/...` paths (trailing slash),
 * otherwise the Wayback snapshot — never a missing internal deep-link.
 */
export function resolveCuratedReadHref(post: CuratedPost): string {
  if (post.readHref?.startsWith('/') && !post.readHref.startsWith('//')) return post.readHref;
  if (post.postSlug.startsWith('/blog/')) {
    return post.postSlug.endsWith('/') ? post.postSlug : `${post.postSlug}/`;
  }
  return post.waybackUrl;
}
