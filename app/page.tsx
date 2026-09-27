'use client';

import React from 'react';
import SiteShell from '@/components/SiteShell';
import CuratedFeed from '@/components/CuratedFeed';

export default function Home() {
  return (
    <SiteShell active="home">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border-line backdrop-blur-xl relative overflow-hidden">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            PARTIAL DIGITAL RESCUE (2009–2012)
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-2 mb-4">
            The Vintage Audio Archive
          </h1>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed mb-6">
            A preserved digital retrospective of <em>The MuSiK Box</em> and <em>In Audio We Trust</em>, chronicling
            early indie hip-hop, mixtape culture, and generational discoveries from high school hallways to thousands
            of daily readers.
          </p>

          <div className="rounded-xl bg-notice-bg border border-accent/30 p-4 border-l-4 border-l-accent flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div className="text-xs sm:text-sm text-text-muted leading-relaxed">
              <strong className="text-accent font-heading block mb-0.5">
                HISTORICAL ARCHIVAL NOTICE // INCOMPLETE SALVAGE
              </strong>
              This archive is a partial, fragmented rescue of what survived from Internet Archive web snapshots. The
              site published multiple times daily across thousands of premieres—these 360 cataloged posts represent
              what could be verified.
            </div>
          </div>
        </div>
      </section>

      <div id="featured">
        <CuratedFeed />
      </div>
    </SiteShell>
  );
}
