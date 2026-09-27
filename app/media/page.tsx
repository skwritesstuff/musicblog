import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import MediaVault from '@/components/MediaVault';
import recovered from '@/src/data/recoveredMedia.json';
import registry from '@/src/data/uploadsRegistry.json';
import type { RecoveredMedia, UploadRecord } from '@/src/data/types';

export const metadata: Metadata = {
  title: 'Preserved Media & Artwork Vault | The MuSiK Box & In Audio We Trust',
  description:
    '9 authentic recovered visual assets and the searchable WordPress server uploads registry from The MuSiK Box and In Audio We Trust.',
};

export default function MediaPage() {
  return (
    <SiteShell active="media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-6">
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>{' '}
          » <span className="text-text-muted">Media & Art</span>
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Preserved Media & Artwork Vault
        </h1>
        <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
          A transparent historical catalog of the 54 verified WordPress media uploads from <em>The MuSiK Box</em> and{' '}
          <em>In Audio We Trust</em> (2009–2012).
        </p>
        <MediaVault recovered={recovered as RecoveredMedia[]} registry={registry as UploadRecord[]} />
      </div>
    </SiteShell>
  );
}
