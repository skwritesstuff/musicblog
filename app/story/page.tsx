import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { WRITERS_INLINE } from '@/src/data/credits';

export const metadata: Metadata = {
  title: 'The Story | The MuSiK Box & In Audio We Trust (2009–2012)',
  description:
    'Oral history of The MuSiK Box and In Audio We Trust — five chapters from Saint Ignatius High School to the final broadcast.',
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-8">
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>{' '}
          » <span className="text-text-muted">The Story</span>
        </p>

        <div className="text-center mb-12 pb-10 border-b border-border-line">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-line bg-card px-4 py-1.5 font-mono text-xs text-accent mb-5">
            ★ HISTORICAL RETROSPECTIVE • 2009–2012
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            The Story of The MuSiK Box & In Audio We Trust
          </h1>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
            From Saint Ignatius High School hallways to 100,000+ daily visitors: the oral history and digital chronicle
            of an era-defining music publication.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs text-text-dark">
            <span>
              Founded by: <strong className="text-accent">Seamus Kelleher</strong> &{' '}
              <strong className="text-app-accent">Myles Snider</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              Architecture & Design: <strong className="text-text-primary">Evan Edwards</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              Era: <strong className="text-text-primary">August 2009 – January 2012</strong>
            </span>
          </div>
        </div>

        <nav className="rounded-2xl border border-border-line bg-card p-5 sm:p-6 mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-text-dark mb-4">
            Anthology Table of Contents
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {CHAPTERS.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="flex items-start gap-2 text-text-primary hover:text-accent transition-colors"
              >
                <span className="text-accent font-mono font-bold shrink-0">{c.num}.</span>
                <span>{c.title}</span>
              </a>
            ))}
          </div>
        </nav>

        <article className="space-y-14 text-base sm:text-[1.05rem] leading-relaxed text-text-muted">
          <section id="genesis">
            <div className="font-mono text-xs font-bold text-accent tracking-wider mb-2">CHAPTER 01</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              The High School Genesis & The &apos;MSK&apos; Code
            </h2>
            <figure className="mb-6 rounded-2xl border border-border-line bg-black p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recovered_media/The_MuSiK_Box_Original_Logo_2010.png"
                alt="The MuSiK Box 2010 cassette logo"
                className="mx-auto max-h-40 w-auto object-contain"
              />
              <figcaption className="mt-3 text-center font-mono text-[11px] text-text-dark">
                The MuSiK Box cassette mark · recovered March 2010 WordPress upload
              </figcaption>
            </figure>
            <p className="mb-4">
              In late 2008 and early 2009, during their sophomore year at{' '}
              <strong className="text-text-primary">Saint Ignatius High School</strong> in Cleveland, Ohio, co-founders{' '}
              <strong className="text-text-primary">Myles Snider</strong> and{' '}
              <strong className="text-text-primary">Seamus Kelleher</strong> launched an underground music destination
              straight from their laptops: <em>The MuSiK Box</em> (
              <code className="text-accent text-sm">themusikbox.com</code>).
            </p>
            <p className="mb-4">
              The publication&apos;s distinct capitalization was a subtle in-joke and personal signature:{' '}
              <strong className="text-text-primary">The MuSiK Box</strong> cleverly embedded the co-founders&apos;
              initials — <strong>M</strong>yles <strong>S</strong>nider and <strong>S</strong>eamus{' '}
              <strong>K</strong>elleher — spelling out <strong className="text-accent">MSK</strong> within{' '}
              <em>MuSiK</em> using lowercase &quot;u&quot; and &quot;i&quot;.
            </p>
            <p className="mb-4">
              Built on early WordPress architectures and powered by DatPiff mixtape rips, Mediafire downloads, and
              direct email submissions from hungry indie artists, the site stood at the vanguard of the burgeoning
              music-blog revolution.
            </p>
            <blockquote className="border-l-4 border-accent bg-card rounded-r-xl px-5 py-4 italic text-text-primary">
              &ldquo;We Skip Study Hall For This...&rdquo;
              <footer className="mt-2 not-italic font-mono text-xs text-accent">— Motto of The MuSiK Box</footer>
            </blockquote>
            <figure className="mt-6 rounded-2xl border border-border-line bg-black p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recovered_media/media-007_Musikbox%20Logo1.Png"
                alt="The MuSiK Box turntable and speaker mark"
                className="mx-auto max-h-28 w-auto object-contain"
              />
              <figcaption className="mt-3 text-center font-mono text-[11px] text-text-dark">
                Early turntable & speaker identity mark · 2009–2010
              </figcaption>
            </figure>
          </section>

          <section id="grog-shop">
            <div className="font-mono text-xs font-bold text-accent tracking-wider mb-2">CHAPTER 02</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              Mac Miller at The Grog Shop & The MGK Video
            </h2>
            <p className="mb-4">
              The MuSiK Box was never just digital commentary; it was a physical live-music catalyst in the Midwest. In
              the spring of 2010, Seamus and Myles partnered with Cleveland promotion crew <em>The Coventry Kids</em> to
              book an 18-year-old Pittsburgh prodigy named <strong className="text-text-primary">Mac Miller</strong> at{' '}
              <strong className="text-text-primary">The Grog Shop</strong> in Cleveland Heights — Mac&apos;s first
              out-of-town headline show.
            </p>
            <blockquote className="border-l-4 border-accent bg-card rounded-r-xl px-5 py-4 mb-4">
              <p className="italic text-text-primary mb-2">
                &ldquo;Cleveland, a little fun fact for you: actually the first out-of-town headlining show I ever did
                was at the Grog Shop.&rdquo;
              </p>
              <footer className="font-mono text-xs text-accent">
                — Mac Miller on <em>The Arroyo Show</em> (House of Blues Cleveland, Oct 10, 2011)
              </footer>
            </blockquote>
            <p>
              Just weeks earlier, on <strong className="text-text-primary">April 22, 2010</strong>, the co-founders shot
              a now-legendary parking lot interview on an iPhone in the Saint Ignatius High School lot with a 19-year-old{' '}
              <strong className="text-text-primary">Machine Gun Kelly (MGK)</strong>, breaking down his breakout mixtape{' '}
              <em>100 Words and Running</em>.
            </p>
          </section>

          <section id="viral-surge">
            <div className="font-mono text-xs font-bold text-accent tracking-wider mb-2">CHAPTER 03</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              The Viral Surge & The 100k Ceiling
            </h2>
            <p className="mb-4">
              During its peak in 2011, <em>In Audio We Trust</em> averaged 2,000 to 6,000+ daily readers. On
              record-shattering days, viral algorithmic traffic from{' '}
              <strong className="text-text-primary">StumbleUpon</strong>, Reddit, Hype Machine, DJ Earworm mashups, and
              college network word-of-mouth propelled single-day visitor counts above{' '}
              <strong className="text-accent">100,000 unique visitors</strong>.
            </p>
            <p>
              A major engine of this explosive growth was the golden age of collegiate mashup culture. IAWT was a
              premiere launchpad for artists like <strong className="text-text-primary">The White Panda</strong>, The
              Hood Internet, Super Mashed Bros, Norwegian Recycling, Brenton Duvall, and Big Z Remixes.
            </p>
          </section>

          <section id="rebrand">
            <div className="font-mono text-xs font-bold text-accent tracking-wider mb-2">CHAPTER 04</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-5">
              The 301 Rebrand to In Audio We Trust
            </h2>
            <figure className="mb-6 rounded-2xl border border-border-line bg-black p-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iawt-headphone-coin.png"
                alt="In Audio We Trust Thomas Jefferson DJ headphones emblem"
                className="h-28 w-28 object-contain"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iawt-needle-logo.png"
                alt="inaudiowetrust wordmark"
                className="h-10 w-auto object-contain"
              />
              <figcaption className="sr-only">IAWT 2.0 emblem and wordmark by Evan Edwards</figcaption>
            </figure>
            <p className="mb-4">
              As readership expanded beyond Ohio into a national footprint, the co-founders orchestrated a comprehensive
              brand evolution in early 2011, executing a 301 permanent redirect from{' '}
              <code className="text-accent text-sm">themusikbox.com</code> to{' '}
              <code className="text-accent text-sm">inaudiowetrust.com</code>.
            </p>
            <p className="mb-4">
              Collaborating with web designer and technical architect{' '}
              <strong className="text-text-primary">Evan Edwards</strong>, &quot;IAWT 2.0&quot; introduced a sleek,
              high-contrast dark aesthetic, custom audio streaming players, categorized music channels, and the Thomas
              Jefferson in DJ headphones emblem that became the brand&apos;s signature seal.
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
            <div className="font-mono text-xs font-bold text-accent tracking-wider mb-2">CHAPTER 05</div>
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
                  <h3 className="font-heading font-bold text-accent mb-1">{name}</h3>
                  <p className="text-sm text-text-muted">{blurb}</p>
                </div>
              ))}
            </div>
            <p className="mb-4">
              By early 2012, as high school drew toward graduation, the co-founders sold the publication. Active
              publishing by the founders concluded on <strong className="text-text-primary">January 25, 2012</strong>{' '}
              with Mike Posner&apos;s &ldquo;Looks Like Sex&rdquo; — the final broadcast of the authentic era.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/archive"
                className="inline-flex items-center rounded-full bg-accent text-bg font-heading text-sm font-bold px-5 py-2.5 hover:-translate-y-0.5 transition-transform"
              >
                Explore the Chronological Archive →
              </Link>
              <Link
                href="/media"
                className="inline-flex items-center rounded-full border border-border-line bg-card text-text-primary text-sm font-medium px-5 py-2.5 hover:border-accent/40 transition-colors"
              >
                View Recovered Media & Artwork →
              </Link>
            </div>
          </section>
        </article>
      </div>
    </SiteShell>
  );
}
