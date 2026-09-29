export interface CuratedPost {
  id: string;
  artist: string;
  title: string;
  date: string;
  brand: 'The MuSiK Box' | 'In Audio We Trust';
  category: string;
  youtubeId: string;
  description: string;
  postSlug: string;
  waybackUrl: string;
}

export const CURATED_POSTS: CuratedPost[] = [
  {
    id: 'mac-miller',
    artist: 'Mac Miller',
    title: 'Knock Knock / Futuristic Funk',
    date: '2011-03',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: '6bMmhKz6KXg',
    description:
      'Published following his May 2010 first out-of-town headlining concert at The Grog Shop in Cleveland Heights. Features the restored June 2010 original headshot photograph.',
    postSlug: '/blog/mac-miller-futuristic-funk/',
    waybackUrl:
      'https://web.archive.org/web/20110326022122/http://www.inaudiowetrust.com:80/2011/03/mac-miller-futuristic-funk/',
  },
  {
    id: 'childish-gambino',
    artist: 'Childish Gambino',
    title: 'Listen Up // Freaks and Geeks',
    date: '2011-02',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: '27d138zhyZQ',
    description:
      'Breakout coverage during Donald Glover’s Community and Derrick Comedy era, pre-dating Camp. Features restored original 2011 custom header artwork and interview.',
    postSlug:
      '/blog/listen-up-childish-gambino-donald-glover-aka-troy-from-community-aka-derrick-comedy/',
    waybackUrl:
      'https://web.archive.org/web/20110214165550/http://www.inaudiowetrust.com:80/2011/02/listen-up-childish-gambino-donald-glover-aka-troy-from-community-aka-derrick-comedy/',
  },
  {
    id: 'j-cole',
    artist: 'J. Cole',
    title: 'Return of Simba / Artist of the Week',
    date: '2009-11',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: 'vcr3vH0_MyQ',
    description:
      'Named Artist of the Week directly following The Warm Up before Cole World: The Sideline Story. Backed by the restored December 2009 server photograph.',
    postSlug: '/blog/j-cole-artist-of-the-week/',
    waybackUrl:
      'https://web.archive.org/web/20130507024728/http://www.inaudiowetrust.com:80/2009/11/j-cole-artist-of-the-week/',
  },
  {
    id: 'chiddy-bang',
    artist: 'Chiddy Bang',
    title: 'Bad Day ft. Darwin Deez',
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: '51qOi7QOGsc',
    description:
      'Documented directly from their Drexel University dorm room beginnings in Philadelphia. Features recovered November 2009 photograph of producer Xaphoon Jones.',
    postSlug: '/blog/chiddy-bang-bad-day-ft-darwin-deez-theodore-grams/',
    waybackUrl:
      'https://web.archive.org/web/20101015000000/http://themusikbox.com/2010/10/chiddy-bang-bad-day-ft-darwin-deez-theodore-grams/',
  },
  {
    id: 'mgk',
    artist: 'Machine Gun Kelly',
    title: 'Half Naked & Almost Famous',
    date: '2011-03',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: 'I0LNAvvd6Kk',
    description:
      'Hometown Cleveland coverage following the April 22, 2010 Saint Ignatius High School parking lot iPhone interview tracking his Lace Up transition.',
    postSlug: '/blog/machine-gun-kelly-x-sxsw-11-half-naked-almost-famous-episode-2/',
    waybackUrl:
      'https://web.archive.org/web/20110326022127/http://www.inaudiowetrust.com:80/2011/03/machine-gun-kelly-x-sxsw-11-half-naked-almost-famous-episode-2/',
  },
  {
    id: 'the-white-panda',
    artist: 'The White Panda',
    title: 'Shake Drop on Video / Rematch Era',
    date: '2010-07',
    brand: 'In Audio We Trust',
    category: 'MIXTAPE',
    youtubeId: 'YMx0NcmQOvY',
    description:
      'Seminal college-era mashup premiere showcasing the duo’s breakout sophomore tape during the peak dorm-party circuit era.',
    postSlug: '/blog/the-white-panda-rematch-mixtape/',
    waybackUrl:
      'https://web.archive.org/web/20110715000000/http://www.inaudiowetrust.com/2010/07/the-white-panda-rematch-mixtape/',
  },
  {
    id: 'brenton-duvall',
    artist: 'Brenton Duvall',
    title: 'Gucci Mane – That’s All (Remix)',
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'MIXTAPE',
    youtubeId: 'jSCZKmbSL58',
    description:
      'Quintessential blog-era production synthesizing Atlanta trap with breezy indie pop hooks, paired with his Childish Gambino Javelin remix.',
    postSlug: '/blog/gucci-mane-thats-all-brenton-duvall-remix/',
    waybackUrl:
      'https://web.archive.org/web/20101020000000/http://themusikbox.com/2010/10/gucci-mane-thats-all-brenton-duvall-remix/',
  },
  {
    id: 'kid-cudi',
    artist: 'Kid Cudi',
    title: 'Maniac ft. Cage (MOTM II)',
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: 'ZT4hcbSNq6U',
    description:
      'Cleveland native spotlight published during the peak rollout for Man on the Moon II: The Legend of Mr. Rager.',
    postSlug: '/blog/kid-cudi-maniac-ft-cage/',
    waybackUrl:
      'https://web.archive.org/web/20101010000000/http://themusikbox.com/2010/10/kid-cudi-maniac-ft-cage/',
  },
  {
    id: 'chip-tha-ripper',
    artist: 'Chip Tha Ripper',
    title: 'Freestyle (Interior Crocodile Alligator)',
    date: '2009-11',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: 'ZIfSaDNVjXI',
    description:
      'Foundational local coverage of the Cleveland underground titan and frequent Kid Cudi collaborator with full tracklist and preserved review commentary.',
    postSlug: '/blog/chip-tha-ripper-freestyle/',
    waybackUrl:
      'https://web.archive.org/web/20101001000000/http://themusikbox.com/tag/chip-tha-ripper/',
  },
];

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
  if (post.postSlug.startsWith('/blog/')) {
    return post.postSlug.endsWith('/') ? post.postSlug : `${post.postSlug}/`;
  }
  return post.waybackUrl;
}
