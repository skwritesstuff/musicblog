import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { WRITERS_INLINE } from '@/src/data/credits';

export const metadata: Metadata = {
  title: 'The Story | The MuSiK Box & In Audio We Trust',
  description:
    'Oral history of The MuSiK Box and In Audio We Trust — five chapters from Cleveland hallways to the final broadcast.',
};

const CHAPTERS = [
  { id: 'genesis', num: '01', title: "The High School Genesis & The 'MSK' Code" },
  { id: 'grog-shop', num: '02', title: 'Mac Miller at The Grog Shop & The MGK Video' },
  { id: 'viral-surge', num: '03', title: 'The Viral Surge & The 100k Ceiling' },
  { id: 'rebrand', num: '04', title: 'The 301 Rebrand to In Audio We Trust' },
  { id: 'finale', num: '05', title: 'The Prescient Ear & Final Broadcast' },
];

export default function StoryPage() {
  return (
    <SiteShell active="story">
      <div id="story">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-8">
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>{' '}
          » <span className="text-text-muted">The Story</span>
        </p>

        <div className="text-center mb-12 pb-10 border-b border-border-line">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-line bg-card px-4 py-1.5 font-mono text-xs text-text-primary mb-5">
            HISTORICAL RETROSPECTIVE • 2009–2012
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            The Story of The MuSiK Box & In Audio We Trust
          </h1>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
            From Cleveland high school hallways to 100,000+ daily visitors: the oral history and digital chronicle of an
            era-defining music publication.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs text-text-dark">
            <span>
              Founded by: <strong className="text-white">Seamus Kelleher</strong> &{' '}
              <strong className="text-white">Myles Snider</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              Era: <strong className="text-white">August 2009 – January 2012</strong>
            </span>
          </div>
        </div>

        <nav className="rounded-2xl border border-border-line bg-card p-5 sm:p-6 mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-text-dark mb-4">
            Table of Contents
          </h2>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              The High School Genesis & The &apos;MSK&apos; Code
            </h2>
            <figure className="mb-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/the-musik-box-banner-dark.png"
                alt="The MuSiK Box turntable banner"
                className="mx-auto max-h-40 w-auto object-contain bg-transparent"
              />
              <figcaption className="mt-3 text-center font-mono text-[11px] text-[#94a3b8]">
                The MuSiK Box turntable banner · transparent mark on true black
              </figcaption>
            </figure>
            <p className="mb-4">
              In late 2008 and early 2009, during their sophomore year at{' '}
              <strong className="text-text-primary">Saint Ignatius High School</strong> in Cleveland, Ohio, co-founders{' '}
              <strong className="text-text-primary">Myles Snider</strong> and{' '}
              <strong className="text-text-primary">Seamus Kelleher</strong> launched an underground music destination
              straight from their laptops: <em>The MuSiK Box</em> (
              <code className="text-text-primary text-sm">themusikbox.com</code>).
            </p>
            <p className="mb-4">
              The publication&apos;s distinct capitalization was a subtle in-joke and personal signature:{' '}
              <strong className="text-text-primary">The MuSiK Box</strong> cleverly embedded the co-founders&apos;
              initials — <strong>M</strong>yles <strong>S</strong>nider and <strong>S</strong>eamus{' '}
              <strong>K</strong>elleher — spelling out <strong className="text-text-primary">MSK</strong> within{' '}
              <em>MuSiK</em> using lowercase &quot;u&quot; and &quot;i&quot;.
            </p>
            <p className="mb-4">
              Built on early WordPress architectures and powered by DatPiff mixtape rips, Mediafire downloads, and
              direct email submissions from hungry indie artists, the site stood at the vanguard of the burgeoning
              music-blog revolution.
            </p>
            <blockquote className="border-l-4 border-white/40 bg-card rounded-r-xl px-5 py-4 italic text-text-primary">
              &ldquo;We Skip Study Hall For This...&rdquo;
              <footer className="mt-2 not-italic font-mono text-xs text-text-primary">— Motto of The MuSiK Box</footer>
            </blockquote>
          </section>

          <section id="grog-shop">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 02</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              Mac Miller at The Grog Shop & The MGK Video
            </h2>
            <p className="mb-6">
              The MuSiK Box was never just digital commentary; it was a physical live-music catalyst in the Midwest. In
              the spring of 2010, Seamus and Myles partnered with Cleveland promotion crew <em>The Coventry Kids</em> to
              book an 18-year-old Pittsburgh prodigy named <strong className="text-text-primary">Mac Miller</strong> at{' '}
              <strong className="text-text-primary">The Grog Shop</strong> in Cleveland Heights — Mac&apos;s first
              out-of-town headline show.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <aside className="rounded-2xl border border-[#222222] bg-[#0a0a0a] overflow-hidden flex flex-col">
                <div className="px-4 pt-4 pb-3 border-b border-[#222222]">
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-white">
                    PRIMARY SOURCE // THE ARROYO SHOW
                  </p>
                  <p className="mt-1.5 font-heading text-sm font-bold text-white">
                    Mac Miller cites The Grog Shop — House of Blues Cleveland, Oct 10, 2011
                  </p>
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
                  <p className="italic text-white text-sm sm:text-base leading-relaxed mb-2">
                    &ldquo;Cleveland, little fun fact for you: actually the first out-of-town headlining show I ever did
                    was at the Grog Shop.&rdquo;
                  </p>
                  <footer className="font-mono text-xs text-[#94a3b8]">
                    — Mac Miller on <em className="text-white">The Arroyo Show</em>
                  </footer>
                </blockquote>
              </aside>

              <aside className="rounded-2xl border border-[#222222] bg-[#0a0a0a] overflow-hidden flex flex-col">
                <div className="px-4 pt-4 pb-3 border-b border-[#222222]">
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-white">
                    IMMUTABLE DIGITAL RECORD // @MACMILLER ARCHIVE
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=5nHcZ6xBzJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block font-heading text-sm font-bold text-white hover:underline underline-offset-4"
                  >
                    Mac Miller Live at The Grog Shop ↗
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
                  <p className="text-sm text-[#94a3b8] leading-relaxed">
                    On May 8, 2010, an 18-year-old Mac Miller drove out from Pittsburgh to play his maiden out-of-town
                    headlining concert at The Grog Shop in Cleveland Heights. Documenting that night is a 1-minute live
                    clip uploaded directly to Mac&apos;s official verified YouTube channel (@macmiller) in 2010.
                  </p>
                  <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
                    Today, across a channel with over 5.04 million subscribers and hundreds of videos spanning a global
                    legacy,{' '}
                    <a
                      href="https://www.youtube.com/watch?v=5nHcZ6xBzJ8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold hover:underline underline-offset-2"
                    >
                      Mac Miller Live at The Grog Shop
                    </a>{' '}
                    stands as one of the single oldest surviving uploads on his entire account—an immutable historical
                    record of his first show outside Pittsburgh.
                  </p>
                </div>
              </aside>
            </div>

            <p>
              Just weeks earlier, on <strong className="text-text-primary">April 22, 2010</strong>, the co-founders shot
              a now-legendary parking lot interview on an iPhone in the school lot with a 19-year-old{' '}
              <strong className="text-text-primary">Machine Gun Kelly (MGK)</strong>, breaking down his breakout mixtape{' '}
              <em>100 Words and Running</em>.
            </p>
          </section>

          <section id="viral-surge">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 03</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              The Viral Surge & The 100k Ceiling
            </h2>
            <p className="mb-4">
              During its peak in 2011, <em>In Audio We Trust</em> averaged 2,000 to 6,000+ daily readers. On
              record-shattering days, viral algorithmic traffic from{' '}
              <strong className="text-text-primary">StumbleUpon</strong>, Reddit, Hype Machine, DJ Earworm mashups, and
              college network word-of-mouth propelled single-day visitor counts above{' '}
              <strong className="text-text-primary">100,000 unique visitors</strong>.
            </p>
            <p>
              A major engine of this explosive growth was the golden age of collegiate mashup culture. IAWT was a
              premiere launchpad for artists like <strong className="text-text-primary">The White Panda</strong>, The
              Hood Internet, Super Mashed Bros, Norwegian Recycling, Brenton Duvall, and Big Z Remixes.
            </p>
          </section>

          <section id="rebrand">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 04</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              The 301 Rebrand to In Audio We Trust
            </h2>
            <figure className="mb-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] p-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iawt-coin.png"
                alt="In Audio We Trust Thomas Jefferson DJ headphones emblem"
                className="h-28 w-28 object-contain bg-transparent"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iawt-wordmark-white.png"
                alt="inaudiowetrust wordmark"
                className="h-10 w-auto object-contain bg-transparent"
              />
              <figcaption className="sr-only">IAWT 2.0 Jefferson coin emblem and needle wordmark</figcaption>
            </figure>
            <p className="mb-4">
              As readership expanded beyond Ohio into a national footprint, the co-founders orchestrated a comprehensive
              brand evolution in early 2011, executing a 301 permanent redirect from{' '}
              <code className="text-[#94a3b8] text-sm">themusikbox.com</code> to{' '}
              <code className="text-[#94a3b8] text-sm">inaudiowetrust.com</code>.
            </p>
            <p className="mb-4">
              &quot;IAWT 2.0&quot; introduced a sleek, high-contrast dark aesthetic, custom audio streaming players,
              categorized music channels, and the Thomas Jefferson in DJ headphones emblem that became the brand&apos;s
              signature seal.
            </p>
            <p className="mb-4">
              To keep up with the unrelenting volume of PR submissions and exclusive premieres, the blog&apos;s circle
              grew the way so many 2009–2012 college-era sites did — friends pitching in between classes, guest writers
              dropping album reviews, and late-night track tips landing in the inbox. Core contributors included{' '}
              <strong className="text-text-primary">{WRITERS_INLINE}</strong>, who helped review tracks, cover shows,
              and manage the daily premiere queue.
            </p>
            <div className="rounded-xl border border-border-line bg-card p-4 mb-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-dark mb-2">
                Confirmed Contributors & Writers
              </p>
              <p className="text-sm text-text-primary font-heading font-semibold mb-2">
                Matt · Ben · Helen · Pilo · Lesia · Tricia · Heather
              </p>
              <p className="text-xs text-text-dark leading-relaxed italic">
                …and other contributors we&apos;re surely forgetting. If you wrote for us, sent in music, or helped run
                the site during those years, please reach out so we can claim your byline and get your name properly
                added to the record.
              </p>
            </div>
          </section>

          <section id="finale">
            <div className="font-mono text-xs font-bold text-text-primary tracking-wider mb-2">CHAPTER 05</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              The Prescient Ear & Final Broadcast
            </h2>
            <p className="mb-5">
              What made The MuSiK Box & IAWT unique was their track record of identifying future megastars months or
              years before mainstream recognition — tracking early mixtapes of{' '}
              <strong className="text-text-primary">
                Tyler, The Creator, A$AP Rocky, Macklemore, Skrillex, Avicii
              </strong>
              , Kendrick Lamar, Childish Gambino, The Weeknd, Frank Ocean, and more.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                ['Tyler, The Creator', 'Spring 2011 Goblin-era coverage with OFWGKTA.'],
                ['A$AP Rocky', 'October 2011 Live. Love. A$AP debut wave.'],
                ['Macklemore', 'August 2010 archive — two years before The Heist.'],
                ['Skrillex', 'Peak electronic / dubstep premiere cycle (18 salvaged posts).'],
                ['Avicii', 'Early progressive-house blog-era features.'],
                ['Mike Posner', 'Final post: “Looks Like Sex,” January 25, 2012.'],
              ].map(([name, blurb]) => (
                <div key={name} className="rounded-xl border border-border-line bg-card p-4">
                  <h3 className="font-heading font-bold text-text-primary mb-1">{name}</h3>
                  <p className="text-sm text-text-muted">{blurb}</p>
                </div>
              ))}
            </div>
            <p className="mb-4">
              By early 2012, Seamus and Myles were college freshmen living in different cities. The publication had grown
              into a beast that demanded multiple posts daily, relentless track scouring, and constant coordination.
              Realizing they could not maintain the high editorial standards and hands-on curation they had established
              from separate college campuses, they made the decision to sell the blog in early 2012—officially
              concluding their authentic founder run on{' '}
              <strong className="text-text-primary">January 25, 2012</strong>.
            </p>
            <p className="mb-4">
              For 15 years, until the compilation of this archive was established, they thought only their memories —
              and the still-regular reminders of its impact from some former readers via DM — would be all they had to
              remember this fun time from.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/archive/"
                className="inline-flex items-center rounded-full bg-white text-black font-heading text-sm font-bold px-5 py-2.5 hover:-translate-y-0.5 transition-transform"
              >
                Explore the Chronological Archive →
              </Link>
              <Link
                href="/vault/"
                className="inline-flex items-center rounded-full border border-border-line bg-card text-text-primary text-sm font-medium px-5 py-2.5 hover:border-white/30 transition-colors"
              >
                View Artwork Vault →
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
    </SiteShell>
  );
}
