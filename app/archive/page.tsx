import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import ArchiveBrowser from '@/components/ArchiveBrowser';
import { archivePosts } from '@/lib/archive';

export const metadata = pageMetadata("Master Archive", "Search 360 preserved records from The MuSiK Box and In Audio We Trust, August 2009\u2013January 2012.", "/archive/");

export default function ArchivePage() {
  return (
    <SiteShell active="archive">
      <div id="archive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-6">
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>{' '}
          » <span className="text-text-muted">Archive</span>
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Master Chronological Archive
        </h1>
        <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
          Browse {archivePosts.length} preserved records from August 2009 through January 2012.
          Open a record for its catalog details and retrospective notes, or follow its Wayback link to the historical source.
          This is a partial recovery; full article text is not available for every entry.
        </p>
        <ArchiveBrowser posts={archivePosts} />
      </div>
    </div>
    </SiteShell>
  );
}
