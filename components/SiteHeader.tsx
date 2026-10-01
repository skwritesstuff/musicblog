'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LogoTheMuSiKBox from '@/components/LogoTheMuSiKBox';
import LogoInAudioWeTrust from '@/components/LogoInAudioWeTrust';
import AboutCredits from '@/components/AboutCredits';

const NAV = [
  { href: '/', label: 'Home', match: 'story' as const },
  { href: '/story/', label: 'The Story', match: 'story-alias' as const, star: true },
  { href: '/featured/', label: 'Discoveries', match: 'featured' as const },
  { href: '/archive/', label: 'Master Archive', match: 'archive' as const },
  { href: '/artists/', label: 'Artists', match: 'artists' as const },
  { href: '/vault/', label: 'Artwork Vault', match: 'vault' as const },
];

export default function SiteHeader({
  active,
}: {
  active?: 'home' | 'story' | 'featured' | 'archive' | 'artists' | 'media' | 'vault';
}) {
  const [open, setOpen] = useState(false);
  const current = active === 'media' ? 'vault' : active === 'home' ? 'story' : active;

  return (
    <header className="sticky top-0 z-40">
      {/* Full-bleed white top — original logos on light surface */}
      <div className="w-full bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-4 min-w-0"
              onClick={() => setOpen(false)}
              aria-label="Home — The MuSiK Box & In Audio We Trust"
            >
              <LogoTheMuSiKBox
                plate={false}
                className="h-10 sm:h-12 lg:h-14 w-auto max-w-[46vw] sm:max-w-[260px] lg:max-w-[300px]"
              />
              <span className="text-[#b0b0b0] text-sm hidden md:inline shrink-0" aria-hidden>
                •
              </span>
              <span className="hidden sm:inline-flex min-w-0">
                <LogoInAudioWeTrust plate={false} className="h-6 sm:h-7 w-auto max-w-[160px]" />
              </span>
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:block">
                <AboutCredits tone="onLight" />
              </div>
              <button
                type="button"
                className="inline-flex sm:hidden items-center justify-center w-9 h-9 rounded-md border border-[#d4d4d4] text-black bg-white"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="font-mono text-lg leading-none">{open ? '×' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Black menu row */}
      <nav className="hidden sm:flex items-center justify-center gap-x-4 lg:gap-x-5 flex-wrap px-4 sm:px-6 lg:px-8 py-2.5 bg-black border-b border-[#1a1a1a] text-sm font-heading font-medium text-[#94a3b8]">
        {NAV.map((item) => {
          const isActive =
            current === item.match ||
            (current === 'story' && (item.match === 'story' || item.match === 'story-alias'));
          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`shrink-0 ${isActive ? 'text-white' : 'hover:text-white transition-colors'}`}
            >
              {'star' in item && item.star ? (
                <>
                  <span className="yellow-star" aria-hidden>
                    ★
                  </span>{' '}
                  <span className={isActive ? 'text-white' : ''}>The Story</span>
                </>
              ) : (
                item.label
              )}
            </Link>
          );
        })}
      </nav>

      {open && (
        <div className="sm:hidden border-b border-[#1a1a1a] bg-black px-4 py-3 space-y-0.5">
          <div className="pb-3 border-b border-[#1a1a1a] mb-2">
            <div className="inline-flex rounded-md bg-white px-2 py-1.5">
              <LogoInAudioWeTrust plate={false} className="h-5 w-auto" />
            </div>
          </div>
          {NAV.map((item) => {
            const isActive =
              current === item.match ||
              (current === 'story' && (item.match === 'story' || item.match === 'story-alias'));
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block py-2.5 text-sm font-heading ${
                  isActive ? 'text-white' : 'text-[#94a3b8]'
                }`}
              >
                {'star' in item && item.star ? (
                  <>
                    <span className="yellow-star" aria-hidden>
                      ★
                    </span>{' '}
                    The Story
                  </>
                ) : (
                  item.label
                )}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#1a1a1a]">
            <AboutCredits />
          </div>
        </div>
      )}
    </header>
  );
}
