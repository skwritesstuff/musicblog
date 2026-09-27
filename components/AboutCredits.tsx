'use client';

import React, { useEffect, useState } from 'react';
import {
  COLOPHON_STAFF_NOTE,
  CONTRIBUTING_WRITERS,
  FOUNDERS,
  OPEN_ATTRIBUTION_NOTE,
  SITE_ARCHITECT,
} from '@/src/data/credits';

export default function AboutCredits() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs sm:text-sm font-heading font-medium text-text-muted hover:text-text-primary transition-colors"
      >
        Colophon
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="colophon-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border-line bg-card p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-text-primary mb-1">Archival Credits</p>
                <h2 id="colophon-title" className="font-heading text-xl font-extrabold text-text-primary">
                  Colophon
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-border-line px-2 py-1 text-text-muted hover:text-text-primary"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-dark mb-1">
                  Founders & Curators
                </dt>
                <dd className="text-text-primary font-heading font-bold">
                  {FOUNDERS[0]} & {FOUNDERS[1]}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-dark mb-1">
                  Website Architecture & Design
                </dt>
                <dd className="text-text-primary font-heading font-bold">{SITE_ARCHITECT}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-dark mb-2">
                  Confirmed Contributors & Writers
                </dt>
                <dd className="flex flex-wrap gap-2 mb-2">
                  {CONTRIBUTING_WRITERS.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-border-line px-2.5 py-1 text-xs text-text-muted"
                    >
                      {name}
                    </span>
                  ))}
                </dd>
                <dd className="text-xs text-text-dark leading-relaxed italic">{OPEN_ATTRIBUTION_NOTE}</dd>
              </div>
            </dl>

            <div className="mt-5 rounded-xl border border-border-line bg-notice-bg p-4 border-l-4 border-l-white/40">
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{COLOPHON_STAFF_NOTE}</p>
            </div>

            <p className="mt-5 text-xs text-text-dark leading-relaxed border-t border-border-line pt-4">
              Saint Ignatius High School · Cleveland, Ohio · The MuSiK Box (2009–2011) · In Audio We Trust (2011–2012)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
