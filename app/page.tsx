import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { pageMetadata } from '@/lib/metadata';
import { archivePosts } from '@/lib/archive';
import recovered from '@/src/data/recoveredMedia.json';

export const metadata = pageMetadata('Music before the feed', 'Explore 360 preserved records, recovered artwork, and the story of The MuSiK Box and In Audio We Trust (2009–2012).', '/');
const PICKS = [
  { artist: 'J. Cole', title: 'Artist of the Week', date: 'November 2009', slug: 'j-cole-artist-of-the-week', image: recovered[1], caption: 'Recovered photo · December 2009' },
  { artist: 'Chiddy Bang', title: 'Bad Day', date: 'October 2010', slug: 'chiddy-bang-bad-day-ft-darwin-deez-theodore-grams', image: recovered[2], caption: 'Recovered Xaphoon Jones photo · November 2009' },
  { artist: 'Lupe Fiasco', title: 'Words I Never Said', date: 'February 2011', slug: 'lupe-fiasco-words-i-never-said-ft-skylar-grey', image: recovered[6], caption: 'Recovered feature artwork · February 2011' },
];

export default function Home() {
  return (
    <SiteShell active="home">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
        <p className="font-mono text-xs uppercase tracking-[.18em] text-text-muted mb-5">The MuSiK Box → In Audio We Trust · 2009–2012</p>
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl">We Skip Study Hall<br className="hidden sm:block" /> For This…</h1>
        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-2xl mt-6">Before the feed, there was the blog. Music discovered between classes, shared one post at a time. Explore {archivePosts.length} preserved records from our Cleveland beginnings to the final broadcast.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/archive/" className="rounded-full bg-white text-black px-6 py-3 font-heading font-bold text-sm">Explore the archive →</Link>
          <Link href="/story/" className="rounded-full border border-border-line px-6 py-3 font-heading font-bold text-sm hover:bg-white/10">Read the story</Link>
        </div>
        <p className="text-xs text-text-muted mt-5">A partial recovery, August 2009–January 2012. Original snapshots remain linked throughout.</p>
      </section>
      <section className="border-y border-border-line bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-wrap justify-between items-baseline gap-3 mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">Start with a discovery</h2>
            <Link href="/featured/" className="text-sm text-text-muted hover:text-white underline underline-offset-4">All discoveries →</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {PICKS.map((pick) => (
              <article key={pick.artist} className="rounded-xl overflow-hidden border border-border-line bg-black">
                <Link href={`/blog/${pick.slug}/`} className="block group">
                  <div className="h-56 sm:h-52 lg:h-64 bg-[#111] flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pick.image.src} alt={pick.image.alt} width="600" height="400" className="h-full w-full object-contain" />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs text-text-muted mb-2">{pick.date}</p>
                    <h3 className="font-heading text-2xl font-bold group-hover:underline underline-offset-4">{pick.artist}</h3>
                    <p className="text-text-muted mt-1">{pick.title}</p>
                    <p className="text-xs text-text-muted mt-4">{pick.caption}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-2xl font-extrabold mb-6">Two names. One shared obsession.</h2>
          <ol className="border-l border-border-line pl-6 space-y-7">
            {[
              ['2009', 'The MuSiK Box begins', 'Cleveland high school friends start sharing the music they cannot stop playing.'],
              ['2011', 'In Audio We Trust', 'A new name for a growing circle of writers and listeners.'],
              ['January 2012', 'The final chapter', 'The surviving catalog ends. The music, artwork, and stories live here.'],
            ].map(([year, title, copy]) => <li key={year}><p className="font-mono text-xs text-text-muted mb-1">{year}</p><h3 className="font-heading font-bold">{title}</h3><p className="text-text-muted text-sm mt-1 leading-relaxed">{copy}</p></li>)}
          </ol>
        </div>
        <Link href="/vault/" className="block rounded-xl border border-border-line p-6 bg-card hover:border-white/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recovered[0].src} alt={recovered[0].alt} width="600" height="200" loading="lazy" className="w-full h-40 object-contain bg-white rounded mb-6" />
          <h2 className="font-heading text-2xl font-extrabold">The artwork survived, too.</h2>
          <p className="text-text-muted mt-3 leading-relaxed">{recovered.length} recovered images, from early logos to artist photography. See the files and their archival sources.</p>
          <span className="inline-block text-sm font-bold mt-5">Open the artwork vault →</span>
        </Link>
      </section>
    </SiteShell>
  );
}
