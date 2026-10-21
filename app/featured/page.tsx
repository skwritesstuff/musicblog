import SiteShell from '@/components/SiteShell';
import CuratedFeed from '@/components/CuratedFeed';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Discoveries', 'Nine selections from the archive, with retrospective notes, listening companions, and links to surviving snapshots.', '/featured/');
export default function FeaturedPage() {
  return <SiteShell active="featured"><div id="featured"><CuratedFeed /></div></SiteShell>;
}
