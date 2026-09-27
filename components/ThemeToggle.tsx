'use client';

import React, { useEffect, useState } from 'react';

type ThemeId = 'dark' | 'light' | 'sepia' | 'neon';

const THEMES: { id: ThemeId; label: string; icon: string }[] = [
  { id: 'dark', label: 'Dark', icon: '\u263E' },
  { id: 'light', label: 'Light', icon: '\u2600' },
  { id: 'sepia', label: 'Tape', icon: '\u25A6' },
  { id: 'neon', label: 'Neon', icon: '\u26A1' },
];

const STORAGE_KEY = 'musikbox-archive-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeId>('dark');

  useEffect(() => {
    try {
      const saved =
        (localStorage.getItem(STORAGE_KEY) as ThemeId | null) ||
        (localStorage.getItem('vintage-archive-theme') as ThemeId | null);
      const next = THEMES.some((t) => t.id === saved) ? (saved as ThemeId) : 'dark';
      setTheme(next);
      document.documentElement.setAttribute('data-theme', next);
    } catch {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const cycle = () => {
    const idx = THEMES.findIndex((t) => t.id === theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next.id);
    document.documentElement.setAttribute('data-theme', next.id);
    try {
      localStorage.setItem(STORAGE_KEY, next.id);
      localStorage.removeItem('vintage-archive-theme');
    } catch {
      /* ignore */
    }
  };

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex items-center gap-1.5 rounded-md border border-border-line bg-card px-2.5 py-1.5 text-xs font-heading font-medium text-text-muted hover:text-text-primary transition-colors"
      title="Toggle Theme (Dark / Light / Tape / Neon)"
      aria-label="Toggle Theme"
    >
      <span className="theme-icon-glyph text-sm leading-none" aria-hidden>
        {current.icon}
      </span>
      <span className="hidden sm:inline">{current.label}</span>
    </button>
  );
}
