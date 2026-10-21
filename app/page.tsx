import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { pageMetadata } from '@/lib/metadata';
import { archivePosts } from '@/lib/archive';
import artwork from '@/src/content/editorial/artwork.json';
import copy from '@/src/content/editorial/home.json';
import { editorialText } from '@/lib/editorial';

const recovered = artwork.items;

export const metadata = pageMetadata(copy.metaTitle, copy.metaDescription, '/');

export default function Home() {
  return (
    <SiteShell active="home">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-16 items-center">
        <div>
        <p className="font-mono text-xs uppercase tracking-[.18em] text-text-muted mb-5">{copy.eyebrow}</p>
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-5xl whitespace-pre-line">{copy.title}</h1>
        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-2xl mt-6">{editorialText(copy.intro, { recordCount: archivePosts.length })}</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/archive/" className="rounded-full bg-white text-black px-6 py-3 font-heading font-bold text-sm">{copy.archiveLink}</Link>
          <Link href="/story/" className="rounded-full border border-border-line px-6 py-3 font-heading font-bold text-sm hover:bg-white/10">{copy.storyLink}</Link>
        </div>
        <p className="text-xs text-text-muted mt-5">{copy.recoveryNote}</p>
        </div>
        <div className="flex flex-col items-center gap-7 lg:gap-6" aria-label="The two blog identities">
          {copy.brandArtwork.map((artwork) => (
            <figure key={artwork.src} className="w-40 sm:w-48 xl:w-52 text-center">
              <Link href={artwork.href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} className="w-full h-auto object-contain" />
              </Link>
              <figcaption className="mt-2 text-[11px] font-mono text-text-muted">{artwork.label}</figcaption>
            </figure>
          ))}
        </div>
        </div>
      </section>
      <section className="border-y border-border-line bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-wrap justify-between items-baseline gap-3 mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">{copy.discoveriesTitle}</h2>
            <Link href="/featured/" className="text-sm text-text-muted hover:text-white underline underline-offset-4">{copy.discoveriesLink}</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {copy.picks.map((pick) => (
              <article key={pick.artist} className="rounded-xl overflow-hidden border border-border-line bg-black">
                <Link href={pick.href} className="block group">
                  <div className="h-56 sm:h-52 lg:h-64 bg-[#111] flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pick.image.src} alt={pick.image.alt} width="600" height="400" className="h-full w-full object-contain" />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs text-text-muted mb-2">{pick.date}</p>
                    <h3 className="font-heading text-2xl font-bold group-hover:underline underline-offset-4">{pick.artist}</h3>
                    <p className="text-text-muted mt-1">{pick.title}</p>
                    {pick.description && <p className="text-sm text-text-muted mt-3 leading-relaxed">{pick.description}</p>}
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
          <h2 className="font-heading text-2xl font-extrabold mb-6">{copy.timelineTitle}</h2>
          <ol className="border-l border-border-line pl-6 space-y-7">
            {copy.timeline.map(({ year, title, copy }) => <li key={year}><p className="font-mono text-xs text-text-muted mb-1">{year}</p><h3 className="font-heading font-bold">{title}</h3><p className="text-text-muted text-sm mt-1 leading-relaxed">{copy}</p></li>)}
          </ol>
        </div>
        <Link href="/vault/" className="block rounded-xl border border-border-line p-6 bg-card hover:border-white/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recovered[0].src} alt={recovered[0].alt} width="600" height="200" loading="lazy" className="w-full h-40 object-contain bg-white rounded mb-6" />
          <h2 className="font-heading text-2xl font-extrabold">{copy.vaultTitle}</h2>
          <p className="text-text-muted mt-3 leading-relaxed">{editorialText(copy.vaultIntro, { imageCount: recovered.length })}</p>
          <span className="inline-block text-sm font-bold mt-5">{copy.vaultLink}</span>
        </Link>
      </section>
    </SiteShell>
  );
}
