import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import ArtistsDirectory from '@/components/ArtistsDirectory';
import artists from '@/src/data/artists.json';
import type { ArtistRecord } from '@/src/data/types';

export const metadata: Metadata = {
  title: 'Artists Directory | The MuSiK Box & In Audio We Trust Archive',
  description:
    'Filterable directory of artists covered by The MuSiK Box and In Audio We Trust, with salvaged post counts linking to the archive.',
};

export default function ArtistsPage() {
  return (
    <SiteShell active="artists">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-6">
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>{' '}
          » <span className="text-text-muted">Artists</span>
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Artists Directory</h1>
        <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
          Directory of 76 major figures from the MuSiK Box / IAWT era with salvaged post counts. Select an artist to
          jump into the chronological archive filtered to their recovered coverage.
        </p>
        <ArtistsDirectory artists={artists as ArtistRecord[]} />
      </div>
    </SiteShell>
  );
}
