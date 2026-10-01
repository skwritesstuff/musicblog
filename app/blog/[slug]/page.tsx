import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/src/data/blogPosts';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found | The MuSiK Box & In Audio We Trust' };
  }
  return {
    title: `${post.artist} — ${post.title} | The MuSiK Box & In Audio We Trust`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <article className="w-full bg-[#000000]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 pb-24">
          <Link
            href="/featured/#featured"
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#94a3b8] hover:text-white transition-colors mb-8"
          >
            ← Back to Featured
          </Link>

          <header className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="font-heading text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded bg-[#0f0f0f] border border-[#262626] text-[#94a3b8]">
                {post.category}
              </span>
              <span className="font-heading text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded bg-[#0a0a0a] border border-[#222222] text-white">
                {post.brand}
              </span>
              <span className="font-mono text-xs text-[#94a3b8]">{post.date}</span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#94a3b8] font-bold mb-2">
              {post.artist}
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>
          </header>

          {post.youtubeId && (
            <div className="w-full mb-8 rounded-xl bg-[#0a0a0a] border border-[#222222] overflow-hidden">
              <div className="relative w-full aspect-video bg-[#000000]">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeId}?rel=0&modestbranding=1`}
                  title={`${post.artist} — ${post.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <section className="mb-8">
            <h2 className="font-heading text-lg sm:text-xl font-extrabold text-white mb-3">
              Editorial
            </h2>
            <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed">{post.description}</p>
          </section>

          <section className="rounded-xl border border-[#222222] bg-[#0a0a0a] p-5 sm:p-6 mb-10">
            <h2 className="font-heading text-sm font-extrabold uppercase tracking-wider text-white mb-3">
              Historical Archival Notes
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-4">
              {post.curated
                ? `This feature was originally published on ${post.brand} in ${post.date}. The page you are reading is a curated retrospective reconstruction from the salvaged MuSiK Box / In Audio We Trust archive (2009–2012). Surviving media embeds and editorial context have been restored where recoverable; thousands of contemporaneous posts remain lost beyond Wayback Machine crawls.`
                : `This entry exists in the master chronological catalog of 360 salvaged posts. Editorial body text and embeds for many archive records were not recovered; the Wayback Machine snapshot remains the authoritative contemporary source.`}
            </p>
            {post.waybackUrl ? (
              <a
                href={post.waybackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black font-heading text-xs font-bold px-4 py-2.5 hover:-translate-y-0.5 transition-transform"
              >
                Open original Wayback Machine snapshot
                <span aria-hidden>↗</span>
              </a>
            ) : (
              <p className="font-mono text-xs text-[#94a3b8]">No Wayback snapshot on file.</p>
            )}
          </section>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-[#222222]">
            <Link
              href="/featured/#featured"
              className="font-mono text-sm text-[#94a3b8] hover:text-white transition-colors"
            >
              ← Back to Featured
            </Link>
            <Link href="/archive/" className="font-mono text-sm text-[#94a3b8] hover:text-white transition-colors">
              Master Archive →
            </Link>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
