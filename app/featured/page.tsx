'use client';

import React from 'react';
import SiteShell from '@/components/SiteShell';
import LogoTheMuSiKBox from '@/components/LogoTheMuSiKBox';
import LogoInAudioWeTrust from '@/components/LogoInAudioWeTrust';
import CuratedFeed from '@/components/CuratedFeed';

const STATS = [
  { value: '360', label: 'Salvaged Posts' },
  { value: '54', label: 'Media Records' },
  { value: '4 Years Active', label: '(2009–2012)' },
  { value: 'Partial', label: 'Wayback Rescue' },
];

const PRESCIENT = [
  {
    artist: 'Kendrick Lamar',
    when: 'March 2011',
    blurb: 'Pre-Section.80 documentary trailer',
  },
  {
    artist: 'Childish Gambino',
    when: 'Feb 2011',
    blurb: 'Derrick Comedy era, pre-Camp',
  },
  {
    artist: 'The Weeknd',
    when: 'Sept 2011',
    blurb: 'House of Balloons / “The Morning”',
  },
  {
    artist: 'Frank Ocean',
    when: 'May 2011',
    blurb: '“Acura Integurl”, pre-Channel Orange',
  },
];

export default function FeaturedPage() {
  return (
    <SiteShell active="featured">
      <section className="w-full bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8">
          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 sm:p-8">
            <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              <LogoTheMuSiKBox plate={false} className="h-16 sm:h-20 lg:h-24 w-auto max-w-full" />
              <span className="hidden lg:inline text-[#c4c4c4] text-2xl shrink-0" aria-hidden>
                •
              </span>
              <LogoInAudioWeTrust plate={false} className="h-8 sm:h-10 lg:h-12 w-auto max-w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#000000] border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-10 sm:pb-14">
          <div className="flex flex-col items-start gap-6 sm:gap-8 bg-[#000000]">
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#94a3b8] font-bold">
              PARTIAL DIGITAL RESCUE (2009–2012) • 360 RECOVERED OF THOUSANDS PUBLISHED
            </p>
            <p className="font-heading text-sm sm:text-base font-semibold text-white -mt-3">
              Created & Curated by Seamus Kelleher & Myles Snider
            </p>
            <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl leading-relaxed">
              A salvaged archive from a bygone era of internet music discovery—before discovery was automated by
              streaming algorithms. Punching above its weight and secretly run by high schoolers between classes,
              The MuSiK Box and In Audio We Trust thrived precisely because the digital landscape was shifting so fast
              that no one held an incumbent advantage.
            </p>

            <div className="w-full max-w-3xl rounded-xl border border-[#222222] bg-[#0a0a0a] p-4">
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                <span className="font-heading font-bold text-white">
                  HISTORICAL ARCHIVAL NOTICE // INCOMPLETE SALVAGE
                </span>{' '}
                — This archive is a partial, fragmented rescue of what survived from Wayback Machine web snapshots.
                During its active run (2009–2012), the publication published multiple times daily across thousands of
                underground mixtapes, MP3 premieres, and features. These 360 posts represent only what could be
                successfully salvaged.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {STATS.map((stat) => (
                <span
                  key={stat.value + stat.label}
                  className="inline-flex items-baseline gap-1.5 rounded-full border border-[#262626] bg-[#0a0a0a] px-3.5 py-1.5 font-mono text-[11px] sm:text-xs text-[#94a3b8]"
                >
                  <span className="font-bold text-white">{stat.value}</span>
                  <span>{stat.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#94a3b8] font-bold mb-2">
            Prescient Ear
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">Early Co-Signs</h2>
          <p className="text-[#94a3b8] max-w-2xl text-sm sm:text-base">
            Landmark coverage months ahead of mainstream acclaim — verified from salvaged posts and Wayback snapshots.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESCIENT.map((item) => (
            <article
              key={item.artist}
              className="rounded-2xl border border-[#222222] bg-[#0a0a0a] p-5 hover:border-[#262626] transition-colors"
            >
              <h3 className="font-heading text-lg font-extrabold text-white">{item.artist}</h3>
              <p className="font-mono text-xs text-[#94a3b8] mt-1.5 mb-3">{item.when}</p>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{item.blurb}</p>
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
