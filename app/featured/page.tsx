import copy from '@/src/content/editorial/discoveries.json';
import SiteShell from '@/components/SiteShell';
import CuratedFeed from '@/components/CuratedFeed';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(copy.metaTitle, copy.metaDescription, '/featured/');
export default function FeaturedPage() {
  return <SiteShell active="featured"><div id="featured"><CuratedFeed /></div></SiteShell>;
}
