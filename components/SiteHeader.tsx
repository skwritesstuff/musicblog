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
    <header className="border-b border-border-line bg-header-bg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-transparent">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 min-w-0 bg-transparent"
            onClick={() => setOpen(false)}
            aria-label="Home — The MuSiK Box & In Audio We Trust"
          >
            <LogoTheMuSiKBox className="h-8 sm:h-10 lg:h-11 w-auto max-w-[42vw] sm:max-w-[200px] lg:max-w-[240px]" />
            <span className="text-text-dark text-sm hidden md:inline shrink-0">•</span>
            <span className="hidden sm:inline-flex min-w-0 bg-transparent">
              <LogoInAudioWeTrust className="h-5 sm:h-6 w-auto max-w-[130px]" />
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden md:block">
              <AboutCredits />
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-md border border-border-line text-text-primary bg-header-bg"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="font-mono text-lg leading-none">{open ? '×' : '☰'}</span>
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-x-3 lg:gap-x-4 pt-2.5 mt-2.5 border-t border-border-line text-sm font-heading font-medium text-text-muted overflow-x-auto whitespace-nowrap">
          {NAV.map((item) => {
            const isActive = current === item.match;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 ${isActive ? 'text-text-primary' : 'hover:text-text-primary transition-colors'}`}
              >
                {'star' in item && item.star ? (
                  <>
                    <span className="yellow-star" aria-hidden>
                      ★
                    </span>{' '}
                    <span className="text-text-primary">The Story</span>
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
        <div className="md:hidden border-t border-border-line bg-header-bg px-4 py-3 space-y-0.5">
          <div className="pb-3 border-b border-border-line mb-2 sm:hidden">
            <LogoInAudioWeTrust className="h-5 w-auto" />
          </div>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-heading ${
                current === item.match ? 'text-text-primary' : 'text-text-muted'
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
