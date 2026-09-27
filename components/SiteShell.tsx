import React from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PersistentPlayer from '@/components/PersistentPlayer';

export default function SiteShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: 'home' | 'story' | 'archive' | 'artists' | 'media';
}) {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col font-body selection:bg-white/20 pb-20">
      <SiteHeader active={active} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <PersistentPlayer />
    </div>
  );
}
