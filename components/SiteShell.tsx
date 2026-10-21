import React from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PersistentPlayer from '@/components/PersistentPlayer';

export default function SiteShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: 'home' | 'story' | 'featured' | 'archive' | 'artists' | 'media' | 'vault';
}) {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col font-body selection:bg-white/20 pb-28">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader active={active} />
      <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
      <SiteFooter />
      <PersistentPlayer />
    </div>
  );
}
