'use client';

import React from 'react';
import CuratedFeed from '@/components/CuratedFeed';
import PersistentPlayer from '@/components/PersistentPlayer';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col font-body selection:bg-accent selection:text-bg pb-20">
      <header className="border-b border-border-line bg-[#141414]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Left: Dual Authentic Logos */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <a href="https://shameis.com" className="shrink-0 text-text-muted hover:text-white text-xs font-mono">
              ← shameis.com
            </a>
            <div className="h-6 w-px bg-white/10 shrink-0" />

            {/* Logos group */}
            <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
              {/* The MuSiK Box Logo */}
              <a href="/" className="shrink-0 hover:opacity-90 transition-opacity">
                <img
                  src="/logo-the-musik-box.png"
                  alt="The MuSiK Box - We Skip Study Hall For This"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </a>

              <span className="text-white/20 text-xs hidden sm:inline">•</span>

              {/* In Audio We Trust Wordmark */}
              <a href="/" className="shrink-0 hover:opacity-90 transition-opacity">
                <img
                  src="/logo-in-audio-we-trust.png"
                  alt="In Audio We Trust"
                  className="h-6 sm:h-8 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Right: Navigation */}
          <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-heading font-medium text-text-muted shrink-0">
            <a href="#curated" className="text-red-accent font-bold">
              Curated
            </a>
            <a href="/archive" className="hover:text-yellow-highlight transition-colors">
              Archive (360)
            </a>
            <a href="/story" className="hover:text-yellow-highlight transition-colors">
              The Story
            </a>
            <a href="/media" className="hover:text-yellow-highlight transition-colors">
              Media Vault
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-card/80 border border-border-line backdrop-blur-xl relative overflow-hidden">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            PARTIAL DIGITAL RESCUE (2009–2012)
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-2 mb-4">
            The Vintage Audio Archive
          </h1>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed mb-6">
            A preserved digital retrospective of <em>The MuSiK Box</em> and <em>In Audio We Trust</em>, chronicling early indie hip-hop, mixtape culture, and generational discoveries from high school hallways to thousands of daily readers.
          </p>

          <div className="rounded-xl bg-[#18130e] border border-amber-500/30 p-4 border-l-4 border-l-accent flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div className="text-xs sm:text-sm text-text-muted leading-relaxed">
              <strong className="text-accent font-heading block mb-0.5">HISTORICAL ARCHIVAL NOTICE // INCOMPLETE SALVAGE</strong>
              This archive is a partial, fragmented rescue of what survived from Internet Archive web snapshots. The site published multiple times daily across thousands of premieres—these 360 cataloged posts represent what could be verified.
            </div>
          </div>
        </div>
      </section>

      <main id="curated" className="flex-1">
        <CuratedFeed />
      </main>

      <PersistentPlayer />
    </div>
  );
}
