import copy from '@/src/content/editorial/story.json';
import EditorialText from '@/components/EditorialText';
import { editorialText } from '@/lib/editorial';
import Link from 'next/link';
import { CONTRIBUTING_WRITERS, FOUNDERS, WRITERS_INLINE } from '@/src/data/credits';

const CHAPTERS = [
  { id: 'genesis', num: '01', title: copy.genesis.title },
  { id: 'grog-shop', num: '02', title: copy.grog.title },
  { id: 'viral-surge', num: '03', title: copy.surge.title },
  { id: 'rebrand', num: '04', title: copy.rebrand.title },
  { id: 'finale', num: '05', title: copy.finale.title },
];

/** Oral history at /story/, with copy authored through Decap CMS. */
export default function StoryContent() {
  return (
      <div id="story">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="text-center mb-12 pb-10 border-b border-border-line">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-line bg-card px-4 py-1.5 font-mono text-xs text-text-primary mb-5">
            {copy.header.eyebrow}
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">{copy.header.title}</h1>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-6"><EditorialText>{editorialText(copy.header.intro, { writers: WRITERS_INLINE })}</EditorialText></p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs text-text-dark">
            <span>
              {copy.header.foundersLabel} <strong className="text-white">{FOUNDERS[0]}</strong> &{' '}
              <strong className="text-white">{FOUNDERS[1]}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              {copy.header.eraLabel} <strong className="text-white">{copy.header.era}</strong>
            </span>
          </div>
        </div>

        <nav className="rounded-2xl border border-border-line bg-card p-5 sm:p-6 mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-text-dark mb-4">{copy.header.contentsTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {CHAPTERS.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="flex items-start gap-2 text-text-primary hover:text-text-primary transition-colors"
              >
                <span className="text-text-primary font-mono font-bold shrink-0">{c.num}.</span>
                <span>{c.title}</span>
              </a>
            ))}
          </div>
        </nav>

        <article className="space-y-14 text-base sm:text-[1.05rem] leading-relaxed text-text-muted">
          <section id="genesis">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 01</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">{copy.genesis.title}</h2>
            <figure className="mb-6 rounded-2xl border border-[#e5e5e5] bg-white p-6 sm:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/the-musik-box-banner.png"
                alt="The MuSiK Box turntable banner"
                className="mx-auto max-h-44 w-auto object-contain bg-transparent"
              />
              <figcaption className="mt-4 text-center font-mono text-[11px] text-[#64748b]"><EditorialText>{editorialText(copy.genesis.bannerCaption, { writers: WRITERS_INLINE })}</EditorialText></figcaption>
            </figure>
            <p className="mb-4"><EditorialText>{editorialText(copy.genesis.intro, { writers: WRITERS_INLINE })}</EditorialText></p>
            <p className="mb-4"><EditorialText>{editorialText(copy.genesis.nameOrigin, { writers: WRITERS_INLINE })}</EditorialText></p>
            <p className="mb-4"><EditorialText>{editorialText(copy.genesis.platforms, { writers: WRITERS_INLINE })}</EditorialText></p>
            <blockquote className="border-l-4 border-white/40 bg-card rounded-r-xl px-5 py-4 italic text-text-primary">
              {copy.genesis.motto}
              <footer className="mt-2 not-italic font-mono text-xs text-text-primary"><EditorialText>{editorialText(copy.genesis.mottoCredit, { writers: WRITERS_INLINE })}</EditorialText></footer>
            </blockquote>
          </section>

          <section id="grog-shop">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 02</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">{copy.grog.title}</h2>
            <p className="mb-6"><EditorialText>{editorialText(copy.grog.intro, { writers: WRITERS_INLINE })}</EditorialText></p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <aside className="rounded-2xl border border-[#222222] bg-[#0a0a0a] overflow-hidden flex flex-col">
                <div className="px-4 pt-4 pb-3 border-b border-[#222222]">
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-white"><EditorialText>{editorialText(copy.grog.arroyoLabel, { writers: WRITERS_INLINE })}</EditorialText></p>
                  <p className="mt-1.5 font-heading text-sm font-bold text-white"><EditorialText>{editorialText(copy.grog.arroyoTitle, { writers: WRITERS_INLINE })}</EditorialText></p>
                </div>
                <div className="relative w-full aspect-video bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                    aria-label="Mac Miller on The Arroyo Show citing The Grog Shop as his first out-of-town headlining show"
                  >
                    <source src="/media/mac-miller-arroyo-grog-shop-citation.mp4" type="video/mp4" />
                  </video>
                </div>
                <blockquote className="px-4 py-4 border-t border-[#222222] border-l-0">
                  <p className="italic text-white text-sm sm:text-base leading-relaxed mb-2"><EditorialText>{editorialText(copy.grog.arroyoQuote, { writers: WRITERS_INLINE })}</EditorialText></p>
                  <footer className="font-mono text-xs text-[#94a3b8]"><EditorialText>{editorialText(copy.grog.arroyoCredit, { writers: WRITERS_INLINE })}</EditorialText></footer>
                </blockquote>
              </aside>

              <aside className="rounded-2xl border border-[#222222] bg-[#0a0a0a] overflow-hidden flex flex-col">
                <div className="px-4 pt-4 pb-3 border-b border-[#222222]">
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-white"><EditorialText>{editorialText(copy.grog.liveLabel, { writers: WRITERS_INLINE })}</EditorialText></p>
                  <a
                    href="https://www.youtube.com/watch?v=5nHcZ6xBzJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block font-heading text-sm font-bold text-white hover:underline underline-offset-4"
                  >
                    {copy.grog.liveLinkText}
                  </a>
                </div>
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/5nHcZ6xBzJ8?rel=0&modestbranding=1"
                    title="Mac Miller Live at The Grog Shop — official @macmiller channel"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="px-4 py-4">
                  <p className="text-sm text-[#94a3b8] leading-relaxed"><EditorialText>{editorialText(copy.grog.liveIntro, { writers: WRITERS_INLINE })}</EditorialText></p>
                  <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed"><EditorialText>{editorialText(copy.grog.liveContext, { writers: WRITERS_INLINE })}</EditorialText></p>
                </div>
              </aside>
            </div>

            <p className="mb-6"><EditorialText>{editorialText(copy.grog.mgkIntro, { writers: WRITERS_INLINE })}</EditorialText></p>

            <aside className="rounded-2xl border border-[#222222] bg-[#0a0a0a] overflow-hidden mb-2">
              <div className="px-4 pt-4 pb-3 border-b border-[#222222]">
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-white"><EditorialText>{editorialText(copy.grog.mgkLabel, { writers: WRITERS_INLINE })}</EditorialText></p>
                <a
                  href="https://www.youtube.com/watch?v=WzgJwyb199w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block font-heading text-sm font-bold text-white hover:underline underline-offset-4"
                >
                  {copy.grog.mgkLinkText}
                </a>
              </div>
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src="https://www.youtube.com/embed/WzgJwyb199w?rel=0&modestbranding=1"
                  title="Machine Gun Kelly — The MuSiK Box parking lot interview, April 22, 2010"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="px-4 py-4">
                <p className="text-sm text-[#94a3b8] leading-relaxed"><EditorialText>{editorialText(copy.grog.mgkCaption, { writers: WRITERS_INLINE })}</EditorialText></p>
                <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed"><EditorialText>{editorialText(copy.grog.mgkWatch, { writers: WRITERS_INLINE })}</EditorialText></p>
              </div>
            </aside>
          </section>

          <section id="viral-surge">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 03</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">{copy.surge.title}</h2>
            <p className="mb-4"><EditorialText>{editorialText(copy.surge.readership, { writers: WRITERS_INLINE })}</EditorialText></p>
            <p><EditorialText>{editorialText(copy.surge.mashups, { writers: WRITERS_INLINE })}</EditorialText></p>
          </section>

          <section id="rebrand">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 04</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">{copy.rebrand.title}</h2>
            <figure className="mb-6 rounded-2xl border border-[#e5e5e5] bg-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iawt-coin.png"
                alt="In Audio We Trust Thomas Jefferson DJ headphones emblem"
                className="h-28 w-28 object-contain bg-transparent"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iawt-wordmark-black.png"
                alt="inaudiowetrust wordmark"
                className="h-10 w-auto object-contain bg-transparent"
              />
              <figcaption className="sr-only"><EditorialText>{editorialText(copy.rebrand.bannerCaption, { writers: WRITERS_INLINE })}</EditorialText></figcaption>
            </figure>
            <p className="mb-4"><EditorialText>{editorialText(copy.rebrand.intro, { writers: WRITERS_INLINE })}</EditorialText></p>
            <p className="mb-4"><EditorialText>{editorialText(copy.rebrand.design, { writers: WRITERS_INLINE })}</EditorialText></p>
            <p className="mb-4"><EditorialText>{editorialText(copy.rebrand.contributors, { writers: WRITERS_INLINE })}</EditorialText></p>
            <div className="rounded-xl border border-border-line bg-card p-4 mb-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-dark mb-2"><EditorialText>{editorialText(copy.rebrand.contributorsTitle, { writers: WRITERS_INLINE })}</EditorialText></p>
              <p className="text-sm text-text-primary font-heading font-semibold mb-2">
                {CONTRIBUTING_WRITERS.join(' · ')}
              </p>
              <p className="text-xs text-text-dark leading-relaxed italic"><EditorialText>{editorialText(copy.rebrand.attributionNote, { writers: WRITERS_INLINE })}</EditorialText></p>
            </div>
          </section>

          <section id="finale">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 05</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">{copy.finale.title}</h2>
            <p className="mb-5"><EditorialText>{editorialText(copy.finale.intro, { writers: WRITERS_INLINE })}</EditorialText></p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {copy.finale.artists.map(({name, blurb}) => (
                <div key={name} className="rounded-xl border border-border-line bg-card p-4">
                  <h3 className="font-heading font-bold text-text-primary mb-1">{name}</h3>
                  <p className="text-sm text-text-muted">{blurb}</p>
                </div>
              ))}
            </div>
            <p className="mb-4"><EditorialText>{editorialText(copy.finale.sale, { writers: WRITERS_INLINE })}</EditorialText></p>
            <p className="mb-4"><EditorialText>{editorialText(copy.finale.memories, { writers: WRITERS_INLINE })}</EditorialText></p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/featured/"
                className="inline-flex items-center rounded-full bg-white text-black font-heading text-sm font-bold px-5 py-2.5 hover:-translate-y-0.5 transition-transform"
              >
                {copy.finale.discoveriesLink}
              </Link>
              <Link
                href="/archive/"
                className="inline-flex items-center rounded-full border border-border-line bg-card text-text-primary text-sm font-medium px-5 py-2.5 hover:border-white/30 transition-colors"
              >
                {copy.finale.archiveLink}
              </Link>
              <Link
                href="/vault/"
                className="inline-flex items-center rounded-full border border-border-line bg-card text-text-primary text-sm font-medium px-5 py-2.5 hover:border-white/30 transition-colors"
              >
                {copy.finale.vaultLink}
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
