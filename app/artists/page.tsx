import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import ArtistsDirectory from '@/components/ArtistsDirectory';
import { archiveArtists } from '@/lib/archive';

export const metadata = pageMetadata("Artists", "Browse artists identified in the preserved catalog and explore their surviving coverage.", "/artists/");

export default function ArtistsPage() {
  return (
    <SiteShell active="artists">
      <div id="artists">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-6">
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>{' '}
          » <span className="text-text-muted">Artists</span>
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Artists Directory</h1>
        <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
          {archiveArtists.length} artists identified in the surviving catalog. Select a name to explore its records.
          Counts describe this partial archive, not the total coverage an artist received.
        </p>
        <ArtistsDirectory artists={archiveArtists} />
      </div>
    </div>
    </SiteShell>
  );
}
