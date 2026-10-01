import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import ArchiveBrowser from '@/components/ArchiveBrowser';
import posts from '@/src/data/archivePosts.json';
import type { ArchivePost } from '@/src/data/types';

export const metadata: Metadata = {
  title: 'Master Archive | The MuSiK Box & In Audio We Trust',
  description: 'Searchable catalog of all 360 salvaged blog posts from The MuSiK Box and In Audio We Trust (2009–2012).',
};

export default function ArchivePage() {
  return (
    <SiteShell active="archive">
      <div id="archive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-6">
          <Link href="/" className="hover:text-text-primary">
            The Story
          </Link>{' '}
          » <span className="text-text-muted">Archive</span>
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Master Chronological Archive
        </h1>
        <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
          All 360 preserved blog articles from <em>The MuSiK Box</em> and <em>In Audio We Trust</em>, ordered
          chronologically from August 2009 through January 2012 with verified publication dates, genre categories, and
          direct Wayback Machine historical links.
        </p>
        <ArchiveBrowser posts={posts as ArchivePost[]} />
      </div>
    </div>
    </SiteShell>
  );
}
