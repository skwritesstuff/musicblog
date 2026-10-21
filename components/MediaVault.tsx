'use client';

import React, { useMemo, useState } from 'react';
import Modal from '@/components/Modal';
import type { RecoveredMedia, UploadRecord } from '@/src/data/types';

export default function MediaVault({
  recovered,
  registry,
}: {
  recovered: RecoveredMedia[];
  registry: UploadRecord[];
}) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<RecoveredMedia | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return registry;
    return registry.filter((r) =>
      `${r.subject} ${r.artist} ${r.filename} ${r.platform} ${r.date}`.toLowerCase().includes(q),
    );
  }, [registry, query]);

  const preservedCount = registry.filter((r) => r.status === 'preserved').length;
  const uncachedCount = registry.length - preservedCount;

  return (
    <div>
      <div className="rounded-xl bg-notice-bg border border-border-line p-4 border-l-4 border-l-white/40 mb-10">
        <h2 className="font-heading font-bold text-text-primary mb-2">What survived</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          The gallery contains {recovered.length} image files available to view here. The separate uploads ledger contains {registry.length} records:
          {' '}{preservedCount} marked preserved and {uncachedCount} marked uncached. A ledger status does not mean a file is included in this gallery.
          Each entry retains its source link; some links open a Wayback search rather than a single captured file.
        </p>
      </div>

      <section className="mb-14">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-text-primary">
              Recovered Cover Art & Photography
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Click any asset for lightbox preview and View full-size file.
            </p>
          </div>
          <span className="rounded-full border border-border-line px-3 py-1 text-xs font-heading font-bold text-text-primary">
            {recovered.length} Recovered Images
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recovered.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-border-line bg-card p-4 hover:border-border-line transition-colors"
            >
              <button
                type="button"
                onClick={() => setActive(item)}
                className="relative mb-4 flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-border-line bg-black focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute top-2 right-2 rounded bg-white px-2 py-0.5 text-[10px] font-heading font-extrabold uppercase tracking-wide text-black">
                  Preserved
                </span>
              </button>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-primary mb-1">{item.badge}</p>
              <h3 className="font-heading text-lg font-extrabold text-text-primary mb-1 leading-snug">{item.title}</h3>
              <p className="font-mono text-[11px] text-text-dark mb-2 break-words">
                File: <code>{item.filename}</code> · {item.platform}
              </p>
              <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="rounded-full border border-border-line px-3 py-1.5 text-xs font-heading font-bold text-text-primary hover:bg-white hover:text-black transition-colors"
                >
                  View full-size file ↗
                </button>
                {item.waybackUrl && (
                  <a
                    href={item.waybackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border-line px-3 py-1.5 text-xs text-text-muted hover:text-text-primary"
                  >
                    Wayback Record ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {active && (
        <Modal label={active.title} onClose={() => setActive(null)} wide>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-text-primary uppercase tracking-wider mb-1">{active.badge}</p>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold text-text-primary">{active.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-md border border-border-line w-11 h-11 text-text-muted hover:text-text-primary"
                aria-label="Close lightbox"
              >
                ×
              </button>
            </div>
            <div className="flex items-center justify-center rounded-xl border border-border-line bg-black p-2 sm:p-4 mb-4 min-h-[40vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.fullRes}
                alt={active.alt}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={active.fullRes}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white text-black px-4 py-2 text-xs font-heading font-bold"
              >
                View full-size file ↗
              </a>
              {active.waybackUrl && (
                <a
                  href={active.waybackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border-line px-4 py-2 text-xs text-text-muted hover:text-text-primary"
                >
                  Wayback Record ↗
                </a>
              )}
            </div>
        </Modal>
      )}

      <section>
        <div className="rounded-2xl border border-border-line bg-card p-5 sm:p-6 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-heading text-xl font-extrabold">WordPress Server Uploads Registry</h2>
              <p className="text-sm text-text-muted mt-1">
                Complete database of all {registry.length} media uploads cataloged across The MuSiK Box and In Audio We
                Trust (2009–2012).
              </p>
            </div>
            <p role="status" aria-live="polite" className="font-mono text-xs text-text-dark">
              Showing <span className="text-text-primary font-bold">{filtered.length}</span> records
            </p>
          </div>
          <label htmlFor="vault-search" className="block text-sm font-medium mb-2">Search the uploads ledger</label>
          <input
            id="vault-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archival uploads by artist, title, or filename…"
            className="w-full rounded-xl border border-border-line bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-text-dark outline-none focus:border-white/40"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border-line bg-card">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-border-line text-left font-mono text-[11px] uppercase tracking-wider text-text-dark">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Artist / Subject</th>
                <th className="px-4 py-3">Filename</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Wayback</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={`${row.date}-${row.filename}`} className="border-b border-border-line/60 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-mono text-xs text-text-dark whitespace-nowrap">{row.date}</td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-text-primary">{row.subject}</div>
                    <div className="text-xs text-text-dark">{row.artist}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted break-all">
                    <code>{row.filename}</code>
                  </td>
                  <td className="px-4 py-3 text-text-muted whitespace-nowrap">{row.platform}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-heading font-bold ${
                        row.status === 'preserved'
                          ? 'border-border-line text-text-primary'
                          : 'border-border-line text-text-dark'
                      }`}
                    >
                      {row.status === 'preserved' ? 'Ledger: preserved' : 'Ledger: uncached'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {row.waybackUrl ? (
                      <a
                        href={row.waybackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-app-accent hover:underline"
                      >
                        Snapshot ↗
                      </a>
                    ) : (
                      <span className="text-text-dark">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-text-muted">No uploads match this search. <button className="underline" onClick={() => setQuery('')}>Clear search</button></td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
