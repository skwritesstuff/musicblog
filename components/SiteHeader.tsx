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
    <header className="border-b border-[#1a1a1a] bg-black sticky top-0 z-40">
      {/* Black chrome → large white dual-era logo block → black menu */}
      <div className="bg-black px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2.5 sm:pb-3">
        <div className="max-w-5xl mx-auto rounded-xl bg-white border border-[#e5e5e5] px-4 sm:px-6 py-4 sm:py-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#64748b] font-bold">
              Dual-era archive · 2009–2012
            </p>
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

          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Home — The MuSiK Box & In Audio We Trust"
            className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-5"
          >
            <span className="flex flex-col items-center sm:items-end gap-1.5 min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#e32507] font-bold">
                The MuSiK Box
              </span>
              <span className="inline-flex w-full justify-center sm:justify-end rounded-lg bg-white border border-[#f0f0f0] px-3 py-2.5 sm:px-4 sm:py-3">
                <LogoTheMuSiKBox
                  plate={false}
                  className="h-12 sm:h-14 lg:h-16 w-auto max-w-full"
                />
              </span>
            </span>

            <span className="hidden sm:flex items-center justify-center text-[#c4c4c4] text-2xl font-light leading-none pt-5" aria-hidden>
              •
            </span>

            <span className="flex flex-col items-center sm:items-start gap-1.5 min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#111111] font-bold">
                In Audio We Trust
              </span>
              <span className="inline-flex w-full justify-center sm:justify-start rounded-lg bg-white border border-[#f0f0f0] px-3 py-2.5 sm:px-4 sm:py-3">
                <LogoInAudioWeTrust
                  plate={false}
                  showCoin
                  className="h-6 sm:h-7 lg:h-8 w-auto max-w-full"
                />
              </span>
            </span>
          </Link>
        </div>
      </div>

      <nav className="hidden sm:flex items-center justify-center gap-x-4 lg:gap-x-5 flex-wrap px-4 sm:px-6 lg:px-8 py-2.5 bg-black border-t border-[#1a1a1a] text-sm font-heading font-medium text-[#94a3b8]">
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
        <div className="sm:hidden border-t border-[#1a1a1a] bg-black px-4 py-3 space-y-0.5">
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
