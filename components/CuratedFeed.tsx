'use client';

import React from 'react';

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
    description: 'Published following his May 2010 first out-of-town headlining concert at The Grog Shop in Cleveland Heights. Features the restored June 2010 original headshot photograph.',
    postSlug: '/blog/mac-miller-futuristic-funk',
    waybackUrl: 'https://web.archive.org/web/20110326022122/http://www.inaudiowetrust.com:80/2011/03/mac-miller-futuristic-funk/',
  },
  {
    id: 'childish-gambino',
    artist: 'Childish Gambino',
    title: 'Listen Up // Freaks and Geeks',
    date: '2011-02',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: '27d138zhyZQ',
    description: 'Breakout coverage during Donald Glover’s Community and Derrick Comedy era, pre-dating Camp. Features restored original 2011 custom header artwork and interview.',
    postSlug: '/blog/listen-up-childish-gambino-donald-glover-aka-troy-from-community-aka-derrick-comedy',
    waybackUrl: 'https://web.archive.org/web/20110214165550/http://www.inaudiowetrust.com:80/2011/02/listen-up-childish-gambino-donald-glover-aka-troy-from-community-aka-derrick-comedy/',
  },
  {
    id: 'j-cole',
    artist: 'J. Cole',
    title: 'Return of Simba / Artist of the Week',
    date: '2009-11',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: 'vcr3vH0_MyQ',
    description: 'Named Artist of the Week directly following The Warm Up before Cole World: The Sideline Story. Backed by the restored December 2009 server photograph.',
    postSlug: '/blog/j-cole-artist-of-the-week',
    waybackUrl: 'https://web.archive.org/web/20130507024728/http://www.inaudiowetrust.com:80/2009/11/j-cole-artist-of-the-week/',
  },
  {
    id: 'chiddy-bang',
    artist: 'Chiddy Bang',
    title: 'Bad Day ft. Darwin Deez',
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: '51qOi7QOGsc',
    description: 'Documented directly from their Drexel University dorm room beginnings in Philadelphia. Features recovered November 2009 photograph of producer Xaphoon Jones.',
    postSlug: '/blog/chiddy-bang-bad-day-ft-darwin-deez-theodore-grams',
    waybackUrl: 'https://web.archive.org/web/20101015000000/http://themusikbox.com/2010/10/chiddy-bang-bad-day-ft-darwin-deez-theodore-grams/',
  },
  {
    id: 'mgk',
    artist: 'Machine Gun Kelly',
    title: 'Half Naked & Almost Famous',
    date: '2011-03',
    brand: 'In Audio We Trust',
    category: 'HIP HOP',
    youtubeId: 'I0LNAvvd6Kk',
    description: 'Hometown Cleveland coverage following the April 22, 2010 Saint Ignatius High School parking lot iPhone interview tracking his Lace Up transition.',
    postSlug: '/blog/machine-gun-kelly-x-sxsw-11-half-naked-almost-famous-episode-2',
    waybackUrl: 'https://web.archive.org/web/20110326022127/http://www.inaudiowetrust.com:80/2011/03/machine-gun-kelly-x-sxsw-11-half-naked-almost-famous-episode-2/',
  },
  {
    id: 'the-white-panda',
    artist: 'The White Panda',
    title: 'Shake Drop on Video / Rematch Era',
    date: '2010-07',
    brand: 'In Audio We Trust',
    category: 'MIXTAPE',
    youtubeId: 'YMx0NcmQOvY',
    description: 'Seminal college-era mashup premiere showcasing the duo’s breakout sophomore tape during the peak dorm-party circuit era.',
    postSlug: '/blog/the-white-panda-rematch-mixtape',
    waybackUrl: 'https://web.archive.org/web/20110715000000/http://www.inaudiowetrust.com/2010/07/the-white-panda-rematch-mixtape/',
  },
  {
    id: 'brenton-duvall',
    artist: 'Brenton Duvall',
    title: 'Gucci Mane – That’s All (Remix)',
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'MIXTAPE',
    youtubeId: 'jSCZKmbSL58',
    description: 'Quintessential blog-era production synthesizing Atlanta trap with breezy indie pop hooks, paired with his Childish Gambino Javelin remix.',
    postSlug: '/blog/gucci-mane-thats-all-brenton-duvall-remix',
    waybackUrl: 'https://web.archive.org/web/20101020000000/http://themusikbox.com/2010/10/gucci-mane-thats-all-brenton-duvall-remix/',
  },
  {
    id: 'kid-cudi',
    artist: 'Kid Cudi',
    title: 'Maniac ft. Cage (MOTM II)',
    date: '2010-10',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: 'ZT4hcbSNq6U',
    description: 'Cleveland native spotlight published during the peak rollout for Man on the Moon II: The Legend of Mr. Rager.',
    postSlug: '/blog/kid-cudi-maniac-ft-cage',
    waybackUrl: 'https://web.archive.org/web/20101010000000/http://themusikbox.com/2010/10/kid-cudi-maniac-ft-cage/',
  },
  {
    id: 'chip-tha-ripper',
    artist: 'Chip Tha Ripper',
    title: 'Freestyle (Interior Crocodile Alligator)',
    date: '2009-11',
    brand: 'The MuSiK Box',
    category: 'HIP HOP',
    youtubeId: 'ZIfSaDNVjXI',
    description: 'Foundational local coverage of the Cleveland underground titan and frequent Kid Cudi collaborator with full tracklist and preserved review commentary.',
    postSlug: '/artists/chip-tha-ripper',
    waybackUrl: 'https://web.archive.org/web/20101001000000/http://themusikbox.com/tag/chip-tha-ripper/',
  },
];

export default function CuratedFeed() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-text-primary">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-accent">
            FROM THE ARCHIVE
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-3">
          Foundational Blog Discoveries
        </h2>
        <p className="text-base sm:text-lg text-text-muted max-w-3xl leading-relaxed">
          Nine essential co-signs from The MuSiK Box and In Audio We Trust archives.
        </p>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURATED_POSTS.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col relative rounded-2xl bg-card/95 border border-border-line p-6 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-accent/40"
          >
            {/* Card Meta */}
            <div className="flex justify-between items-center mb-4 gap-3">
              <span className="font-heading text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded bg-[#11141c] border border-red-600/40 text-red-600">
                {post.category}
              </span>
              <span className="text-xs text-text-dark font-medium text-right shrink-0">
                {post.date} • {post.brand}
              </span>
            </div>

            {/* Title & Artist */}
            <div className="mb-4">
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary group-hover:text-accent transition-colors">
                {post.artist}
              </h3>
              <h4 className="font-heading text-sm font-semibold text-accent/90 mt-0.5 line-clamp-1">
                {post.title}
              </h4>
            </div>

            {/* DIRECT INLINE YOUTUBE VIDEO EMBED */}
            <div className="w-full mb-4 rounded-xl bg-card-elevated border border-border-line overflow-hidden shadow-lg">
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeId}?rel=0&modestbranding=1`}
                  title={`${post.artist} - ${post.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">
              {post.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/5 mt-auto">
              <a
                href={post.postSlug}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-bg font-heading text-xs font-bold hover:-translate-y-0.5 transition-transform"
              >
                Read Post
                <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={post.waybackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3.5 py-2 rounded-full bg-white/5 border border-border-line text-text-muted hover:text-text-primary hover:bg-white/10 text-xs font-medium transition-all"
              >
                Wayback Snap ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
