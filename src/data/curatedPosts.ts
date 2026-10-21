export interface CuratedPost {
  id: string;
  artist: string;
  title: string;
  date: string;
  brand: 'The MuSiK Box' | 'In Audio We Trust';
  category: string;
  youtubeId: string;
  listeningTitle?: string;
  description: string;
  sourceNote?: string;
  recordLabel?: string;
  postSlug: string;
  waybackUrl: string;
}

export const CURATED_POSTS: CuratedPost[] = [
  {
    id: 'mac-miller',
    artist: 'Mac Miller',
    title: "Futuristic Funk",
    date: '2011-03',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: '6bMmhKz6KXg',
    description:
      "A March 2011 record from the archive’s Mac Miller coverage. The related listening selection is Knock Knock; the original article and its images are not reproduced here.",
    postSlug: '/blog/mac-miller-futuristic-funk/',
    waybackUrl:
      'https://web.archive.org/web/20110326022122/http://www.inaudiowetrust.com:80/2011/03/mac-miller-futuristic-funk/',
  },
  {
    id: 'childish-gambino',
    artist: 'Childish Gambino',
    title: "Listen Up // Childish Gambino",
    date: '2011-02',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: '27d138zhyZQ',
    description:
      "The February 2011 catalog introduces Childish Gambino through his Donald Glover, Community, and Derrick Comedy connections. Freaks and Geeks is included as a listening companion.",
    postSlug:
      '/blog/listen-up-childish-gambino-donald-glover-aka-troy-from-community-aka-derrick-comedy/',
    waybackUrl:
      'https://web.archive.org/web/20110214165550/http://www.inaudiowetrust.com:80/2011/02/listen-up-childish-gambino-donald-glover-aka-troy-from-community-aka-derrick-comedy/',
  },
  {
    id: 'j-cole',
    artist: 'J. Cole',
    title: "Artist of the Week",
    date: '2009-11',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: 'vcr3vH0_MyQ',
    description:
      "J. Cole appears as Artist of the Week in the November 2009 catalog. A separately preserved December photograph is in the artwork vault; Return of Simba is a later listening companion.",
    postSlug: '/blog/j-cole-artist-of-the-week/',
    waybackUrl:
      'https://web.archive.org/web/20130507024728/http://www.inaudiowetrust.com:80/2009/11/j-cole-artist-of-the-week/',
  },
  {
    id: 'chiddy-bang',
    artist: 'Chiddy Bang',
    title: "Bad Day ft. Darwin Deez & Theodore Grams",
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: '51qOi7QOGsc',
    description:
      "An October 2010 Chiddy Bang selection from The MuSiK Box. The artwork vault also holds a separate Xaphoon Jones photograph from November 2009.",
    postSlug: '/blog/chiddy-bang-bad-day-ft-darwin-deez-theodore-grams/',
    waybackUrl:
      'https://web.archive.org/web/20101015000000/http://themusikbox.com/2010/10/chiddy-bang-bad-day-ft-darwin-deez-theodore-grams/',
  },
  {
    id: 'mgk',
    artist: 'Machine Gun Kelly',
    title: "SXSW ’11 // Half Naked & Almost Famous, Episode 2",
    date: '2011-03',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: 'WzgJwyb199w',
    description:
      "This March 2011 catalog entry follows Machine Gun Kelly at SXSW. The Cleveland school parking lot interview discussed in The Story is a separate moment in the site’s history.",
    postSlug: '/blog/machine-gun-kelly-x-sxsw-11-half-naked-almost-famous-episode-2/',
    waybackUrl:
      'https://web.archive.org/web/20110326022127/http://www.inaudiowetrust.com:80/2011/03/machine-gun-kelly-x-sxsw-11-half-naked-almost-famous-episode-2/',
  },
  {
    id: 'the-white-panda',
    artist: 'The White Panda',
    title: "Rematch (Mixtape)",
    date: '2010-07',
    brand: 'The MuSiK Box',
    category: 'MIXTAPE',
    youtubeId: 'YMx0NcmQOvY',
    description:
      "A July 2010 record for The White Panda’s Rematch mixtape. Shake Drop on Video accompanies this retrospective as a related listening selection.",
    postSlug: '/blog/the-white-panda-rematch-mixtape/',
    waybackUrl:
      'https://web.archive.org/web/20110715000000/http://www.inaudiowetrust.com/2010/07/the-white-panda-rematch-mixtape/',
  },
  {
    id: 'brenton-duvall',
    artist: 'Brenton Duvall',
    title: "Gucci Mane – That’s All (Brenton Duvall Remix)",
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'MIXTAPE',
    youtubeId: 'jSCZKmbSL58',
    description:
      "An October 2010 entry for Brenton Duvall’s remix of Gucci Mane’s That’s All, preserved in the catalog from The MuSiK Box.",
    postSlug: '/blog/gucci-mane-thats-all-brenton-duvall-remix/',
    waybackUrl:
      'https://web.archive.org/web/20101020000000/http://themusikbox.com/2010/10/gucci-mane-thats-all-brenton-duvall-remix/',
  },
  {
    id: 'kid-cudi',
    artist: 'Kid Cudi',
    title: "Man on the Moon",
    date: '2009',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: 'ZT4hcbSNq6U',
    listeningTitle: 'Kid Cudi — Maniac (2010), later related listening',
    description:
      "The site’s first album reviews in 2009 covered hometown legend Kid Cudi’s debut, Man on the Moon, alongside Jay-Z’s The Blueprint 3. Those reviews predate the salvaged archive. The site’s Cudi coverage began well before the later records that survive here.",
    sourceNote: 'Later surviving record: Maniac ft. Cage · October 2010.',
    recordLabel: 'Later record',
    postSlug: '/blog/kid-cudi-maniac-ft-cage/',
    waybackUrl:
      'https://web.archive.org/web/20101010000000/http://themusikbox.com/2010/10/kid-cudi-maniac-ft-cage/',
  },
  {
    id: 'chip-tha-ripper',
    artist: 'Chip Tha Ripper',
    title: "Freestyle (Interior Crocodile Alligator)",
    date: '2009-11',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: 'ZIfSaDNVjXI',
    description:
      "A Cleveland freestyle selected for this retrospective. The source link leads to an archived Chip Tha Ripper tag page; a complete original review or tracklist is not reproduced here.",
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
