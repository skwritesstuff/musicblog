import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import StoryContent from '@/components/StoryContent';

export const metadata: Metadata = {
  title: 'The Story | The MuSiK Box & In Audio We Trust',
  description:
    'Oral history of The MuSiK Box and In Audio We Trust — five chapters from Cleveland hallways to the final broadcast.',
};

/** Home destination: The Story oral history. */
export default function Home() {
  return (
    <SiteShell active="story">
      <StoryContent />
    </SiteShell>
  );
}
