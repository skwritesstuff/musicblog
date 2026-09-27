'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LogoTheMuSiKBox from '@/components/LogoTheMuSiKBox';
import LogoInAudioWeTrust from '@/components/LogoInAudioWeTrust';
import AboutCredits from '@/components/AboutCredits';

const NAV = [
  { href: '/', label: 'Home', match: 'home' as const },
  { href: '/story/', label: 'The Story', match: 'story' as const, star: true },
  { href: '/archive/', label: 'Master Archive', match: 'archive' as const },
  { href: '/artists/', label: 'Artists', match: 'artists' as const },
  { href: '/vault/', label: 'Artwork Vault', match: 'vault' as const },
];

export default function SiteHeader({
  active,
}: {
  active?: 'home' | 'story' | 'archive' | 'artists' | 'media' | 'vault';
}) {
  const [open, setOpen] = useState(false);
  const current = active === 'media' ? 'vault' : active;

  return (
    <header className="border-b border-[#1e2530] bg-[#000000] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-[#000000]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <a
              href="https://shameis.com"
              className="text-[#64748b] hover:text-white text-[11px] font-mono shrink-0 hidden xl:inline"
            >
              ← shameis.com
            </a>
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-4 min-w-0 bg-transparent"
              onClick={() => setOpen(false)}
              aria-label="Home — The MuSiK Box & In Audio We Trust"
            >
              <LogoTheMuSiKBox className="h-9 sm:h-11 lg:h-12 w-auto max-w-[46vw] sm:max-w-[240px] lg:max-w-[280px]" />
              <span className="text-white/25 text-sm hidden md:inline shrink-0">•</span>
              <span className="hidden sm:inline-flex min-w-0 bg-transparent">
                <LogoInAudioWeTrust className="h-5 sm:h-6 w-auto max-w-[150px]" />
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block">
              <AboutCredits />
            </div>
            <button
              type="button"
              className="inline-flex sm:hidden items-center justify-center w-9 h-9 rounded-md border border-[#1e2530] text-white bg-[#000000]"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="font-mono text-lg leading-none">{open ? '×' : '☰'}</span>
            </button>
          </div>
        </div>

        <nav className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 mt-3 border-t border-[#1e2530] text-sm font-heading font-medium text-[#94a3b8]">
          {NAV.map((item) => {
            const isActive = current === item.match;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'text-white' : 'hover:text-white transition-colors'}
              >
                {'star' in item && item.star ? (
                  <>
                    <span className="yellow-star" aria-hidden>
                      ★
                    </span>{' '}
                    <span className="text-white">The Story</span>
                  </>
                ) : (
                  item.label
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <div className="sm:hidden border-t border-[#1e2530] bg-[#000000] px-4 py-3 space-y-1">
          <div className="pb-3 border-b border-[#1e2530] mb-2 bg-[#000000]">
            <LogoInAudioWeTrust className="h-5 w-auto" />
          </div>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-heading ${
                current === item.match ? 'text-white' : 'text-[#94a3b8]'
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
          ))}
          <div className="pt-2 border-t border-[#1e2530]">
            <AboutCredits />
          </div>
        </div>
      )}
    </header>
  );
}
