import { pageMetadata } from '@/lib/metadata';
import SiteShell from '@/components/SiteShell';
import StoryContent from '@/components/StoryContent';

export const metadata = pageMetadata("The Story", "The history of The MuSiK Box and In Audio We Trust, from its Cleveland beginnings to the final posts in 2012.", "/story/");

/** Full oral history, separate from the discovery homepage. */
export default function StoryPage() {
  return (
    <SiteShell active="story">
      <StoryContent />
    </SiteShell>
  );
}
