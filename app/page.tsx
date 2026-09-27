'use client';

import React from 'react';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import CuratedFeed from '@/components/CuratedFeed';

const STATS = [
  '360 Salvaged Posts',
  '54 WordPress Media Uploads',
  '4 Years Active (2009–2012)',
  'Partial Wayback Rescue',
];

const PRESCIENT = [
  {
    artist: 'Kendrick Lamar',
    when: 'March 2011',
    blurb: 'Pre-Section.80 documentary trailer coverage — months before the album that announced a generation.',
  },
  {
    artist: 'Childish Gambino',
    when: 'Feb 2011',
    blurb: 'Derrick Comedy / Community-era spotlight, long before Camp and the stadium years.',
  },
  {
    artist: 'The Weeknd',
    when: 'Sept 2011',
    blurb: 'House of Balloons era coverage of “The Morning” while Abel Tesfaye was still anonymous.',
  },
  {
    artist: 'Frank Ocean',
    when: 'May 2011',
    blurb: '“Acura Integurl” feature more than a year before Channel Orange.',
  },
  {
    artist: 'Mac Miller',
    when: 'Spring 2010',
    blurb: 'Co-promoting his first out-of-town headline show at The Grog Shop in Cleveland Heights.',
  },
  {
    artist: 'Mike Posner',
    when: 'Fall 2009',
    blurb: 'Early Duke University dorm recordings, “Drug Dealer Girl,” and hosting Reflections of a Lost Teen.',
  },
];

export default function Home() {
  return (
    <SiteShell active="home">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border-line relative overflow-hidden">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            PARTIAL DIGITAL RESCUE (2009–2012)
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-2 mb-4 uppercase">
            Vintage Blog Era Digital Archive
          </h1>
          <p className="text-base sm:text-lg text-text-muted max-w-3xl leading-relaxed mb-6">
            A preserved digital retrospective of <em>The MuSiK Box</em> and <em>In Audio We Trust</em> (2009–2012),
            chronicling early indie hip-hop, mixtape culture, blog-house, and early co-signs for future icons.
          </p>

          <div className="rounded-xl bg-notice-bg border border-accent/30 p-4 border-l-4 border-l-accent flex items-start gap-3 mb-6">
            <span className="text-lg">⚠️</span>
            <div className="text-xs sm:text-sm text-text-muted leading-relaxed">
              <strong className="text-accent font-heading block mb-0.5">
                HISTORICAL ARCHIVAL NOTICE // INCOMPLETE SALVAGE
              </strong>
              This archive is a partial, fragmented rescue of what survived Wayback Machine crawl passes. During active
              years, posts were published multiple times daily across thousands of releases. These 360 posts represent
              only what could be salvaged.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {STATS.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-border-line bg-black px-3 py-1.5 font-mono text-[11px] sm:text-xs text-text-muted"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <Link
          href="/story"
          className="group block rounded-2xl border border-accent/40 bg-black px-6 py-5 sm:px-8 sm:py-6 hover:border-accent transition-colors"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-2">Primary Feature</p>
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-accent group-hover:underline underline-offset-4">
            ★ THE DEFINITIVE ANTHOLOGY: High School Hallways to 100k+ Daily Readers
          </h2>
          <p className="mt-2 text-sm text-text-muted max-w-3xl">
            Read the five-chapter oral history of The MuSiK Box and In Audio We Trust — from Saint Ignatius study hall
            to the final broadcast on January 25, 2012.
          </p>
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-2">Prescient Ear</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-2">
            Landmark Discoveries
          </h2>
          <p className="text-text-muted max-w-2xl">
            Early coverage months or years ahead of mainstream acclaim — verified from salvaged posts and Wayback
            snapshots.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESCIENT.map((item) => (
            <article
              key={item.artist}
              className="rounded-2xl border border-border-line bg-card p-5 hover:border-accent/40 transition-colors"
            >
              <h3 className="font-heading text-lg font-extrabold text-text-primary">{item.artist}</h3>
              <p className="font-mono text-xs text-accent mt-1 mb-3">{item.when}</p>
              <p className="text-sm text-text-muted leading-relaxed">{item.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <div id="featured">
        <CuratedFeed />
      </div>
    </SiteShell>
  );
}
