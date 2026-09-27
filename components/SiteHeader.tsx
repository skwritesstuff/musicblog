'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LogoTheMuSiKBox from '@/components/LogoTheMuSiKBox';
import LogoInAudioWeTrust from '@/components/LogoInAudioWeTrust';
import ThemeToggle from '@/components/ThemeToggle';
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
    <header className="border-b border-border-line bg-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 bg-black">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <a
            href="https://shameis.com"
            className="text-text-dark hover:text-white text-[11px] font-mono shrink-0 hidden xl:inline"
          >
            ← shameis.com
          </a>
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-5 min-w-0 bg-transparent"
            onClick={() => setOpen(false)}
            aria-label="Home — The MuSiK Box & In Audio We Trust"
          >
            <LogoTheMuSiKBox className="h-10 sm:h-12 lg:h-14 w-auto max-w-[48vw] sm:max-w-[300px] lg:max-w-[360px]" />
            <span className="text-white/25 text-sm hidden md:inline shrink-0">•</span>
            <span className="hidden sm:inline-flex min-w-0 bg-transparent">
              <LogoInAudioWeTrust className="h-5 sm:h-6 lg:h-7 w-auto max-w-[170px] lg:max-w-none" />
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-heading font-medium text-[#94a3b8] shrink-0">
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
          <AboutCredits />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border-line text-white bg-black"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-mono text-lg leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border-line bg-black px-4 py-3 space-y-1">
          <div className="pb-3 sm:hidden border-b border-border-line mb-2 bg-black">
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
          <div className="pt-2 border-t border-border-line">
            <AboutCredits />
          </div>
        </div>
      )}
    </header>
  );
}
