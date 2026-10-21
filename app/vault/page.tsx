import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import MediaVault from '@/components/MediaVault';
import artwork from '@/src/content/editorial/artwork.json';
const recovered = artwork.items;
import registry from '@/src/data/uploadsRegistry.json';
import type { RecoveredMedia, UploadRecord } from '@/src/data/types';

export const metadata = pageMetadata("Artwork Vault", "Explore recovered artwork and photography alongside the original media uploads ledger.", "/vault/");

export default function VaultPage() {
  return (
    <SiteShell active="vault">
      <div id="media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <p className="text-sm text-text-dark mb-6">
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>{' '}
          » <span className="text-text-muted">Artwork Vault</span>
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
          Artwork Vault
        </h1>
        <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
          {recovered.length} recovered images from <em>The MuSiK Box</em> and <em>In Audio We Trust</em>,
          alongside a searchable ledger of {registry.length} cataloged WordPress uploads. Explore what is here and trace each file to its archival source.
        </p>
        <MediaVault recovered={recovered as RecoveredMedia[]} registry={registry as UploadRecord[]} />
      </div>
    </div>
    </SiteShell>
  );
}
