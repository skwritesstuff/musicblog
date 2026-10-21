import copy from '@/src/content/editorial/story.json';
import { pageMetadata } from '@/lib/metadata';
import SiteShell from '@/components/SiteShell';
import StoryContent from '@/components/StoryContent';

export const metadata = pageMetadata(copy.metaTitle, copy.metaDescription, "/story/");

/** Full oral history, separate from the discovery homepage. */
export default function StoryPage() {
  return (
    <SiteShell active="story">
      <StoryContent />
    </SiteShell>
  );
}
