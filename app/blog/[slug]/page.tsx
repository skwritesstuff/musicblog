import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import SiteShell from '@/components/SiteShell';
import { getAllBlogSlugs, getBlogPostBySlug, getRelatedBlogPosts } from '@/src/data/blogPosts';

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
  return pageMetadata(post.title, post.description, `/blog/${post.slug}/`);
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();
  const related = getRelatedBlogPosts(params.slug);

  return (
    <SiteShell>
      <article className="w-full bg-[#000000]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 pb-24">
          <Link
            href="/archive/"
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#94a3b8] hover:text-white transition-colors mb-8"
          >
            ← Back to archive
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
              <p className="p-3 text-xs text-text-muted">Related listening · selected for this retrospective</p>
            </div>
          )}

          <section className="mb-8">
            <h2 className="font-heading text-lg sm:text-xl font-extrabold text-white mb-3">
              {post.curated ? 'Retrospective note' : 'Catalog record'}
            </h2>
            <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed">{post.description}</p>
          </section>

          <section className="rounded-xl border border-[#222222] bg-[#0a0a0a] p-5 sm:p-6 mb-10">
            <h2 className="font-heading text-sm font-extrabold uppercase tracking-wider text-white mb-3">
              Historical Archival Notes
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-4">
              This page combines preserved catalog metadata with present-day context. The note above is not a transcription of the original article.
              Dates are recorded to the month. The source link may lead to a captured article, a tag page, or a Wayback search;
              availability varies. Related videos are listening companions selected for the retrospective, not verified original embeds.
            </p>
            {post.waybackUrl ? (
              <a
                href={post.waybackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black font-heading text-xs font-bold px-4 py-2.5 hover:-translate-y-0.5 transition-transform"
              >
                View historical source on Wayback
                <span aria-hidden>↗</span>
              </a>
            ) : (
              <p className="font-mono text-xs text-[#94a3b8]">No Wayback snapshot on file.</p>
            )}
          </section>

          {related.length > 0 && <section className="mb-10">
            <h2 className="font-heading text-xl font-bold mb-4">Related archive records</h2>
            <ul className="space-y-3">{related.map((record) => <li key={record.slug}>
              <Link href={`/blog/${record.slug}/`} className="block border border-border-line rounded-xl p-4 hover:bg-card">
                <span className="block text-xs font-mono text-text-muted mb-1">{record.date}</span>
                <span className="font-semibold underline underline-offset-4 decoration-white/30">{record.title}</span>
              </Link>
            </li>)}</ul>
          </section>}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-[#222222]">
            <Link
              href="/archive/"
              className="font-mono text-sm text-[#94a3b8] hover:text-white transition-colors"
            >
              ← Back to archive
            </Link>
            <Link href="/featured/" className="font-mono text-sm text-[#94a3b8] hover:text-white transition-colors">
              More discoveries →
            </Link>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
