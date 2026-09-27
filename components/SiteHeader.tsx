'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LogoTheMuSiKBox from '@/components/LogoTheMuSiKBox';
import LogoInAudioWeTrust from '@/components/LogoInAudioWeTrust';
import ThemeToggle from '@/components/ThemeToggle';

const NAV = [
  { href: '/', label: 'Home', match: 'home' },
  { href: '/story', label: '★ The Story', match: 'story', accent: true },
  { href: '/archive', label: 'Archive', match: 'archive' },
  { href: '/artists', label: 'Artists', match: 'artists' },
  { href: '/media', label: 'Media & Art', match: 'media' },
] as const;

export default function SiteHeader({ active }: { active?: 'home' | 'story' | 'archive' | 'artists' | 'media' }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border-line bg-header-bg/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <a href="https://shameis.com" className="text-text-muted hover:text-text-primary text-xs font-mono shrink-0">
            ← shameis.com
          </a>
          <div className="h-6 w-px bg-white/10 shrink-0" />
          <Link href="/" className="flex items-center gap-3 sm:gap-5 min-w-0" onClick={() => setOpen(false)}>
            <LogoTheMuSiKBox className="h-8 sm:h-11 w-auto" />
            <span className="text-white/20 text-sm hidden sm:inline">•</span>
            <LogoInAudioWeTrust className="h-5 sm:h-7 w-auto" />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-heading font-medium text-text-muted">
          {NAV.map((item) => {
            const isActive = active === item.match;
            const accent = 'accent' in item && item.accent;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  accent
                    ? 'text-accent font-bold hover:underline underline-offset-4 transition-colors'
                    : isActive
                      ? 'text-text-primary border-b-2 border-accent pb-0.5'
                      : 'hover:text-text-primary transition-colors'
                }
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border-line text-text-primary"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-mono text-lg leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border-line bg-header-bg px-4 py-3 space-y-2">
          {NAV.map((item) => {
            const accent = 'accent' in item && item.accent;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm font-heading ${
                  accent ? 'text-accent font-bold' : active === item.match ? 'text-text-primary' : 'text-text-muted'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
