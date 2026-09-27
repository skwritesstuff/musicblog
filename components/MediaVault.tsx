'use client';

import React, { useMemo, useState } from 'react';
import type { RecoveredMedia, UploadRecord } from '@/src/data/types';

export default function MediaVault({
  recovered,
  registry,
}: {
  recovered: RecoveredMedia[];
  registry: UploadRecord[];
}) {
  const [query, setQuery] = useState('');

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
      <div className="rounded-xl bg-notice-bg border border-accent/30 p-4 border-l-4 border-l-accent mb-10">
        <h2 className="font-heading font-bold text-text-primary mb-2">Digital Preservation & Provenance Transparency</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          <strong className="text-accent">Part 1:</strong> The <strong>9 authentic recovered visual assets</strong>{' '}
          below were successfully salvaged and restored in their original photographic and graphic formats.
          <br />
          <strong className="text-accent">Part 2:</strong> For the remaining{' '}
          <strong>45 additional server upload records</strong> ({registry.length} total WordPress media records),
          Wayback Machine crawlers indexed filenames but did not cache every binary. Rather than inventing
          placeholders, their complete filenames and snapshot links are preserved in the searchable registry.
        </p>
        <p className="mt-3 font-mono text-xs text-text-dark">
          9 authentic images preserved · {uncachedCount} server records logged · {registry.length} total WordPress media
          records ({preservedCount} marked preserved in ledger)
        </p>
      </div>

      <section className="mb-14">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-text-primary">
              ★ Recovered Cover Art & Photography
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Verified original photographs, press images, album art, and site logos.
            </p>
          </div>
          <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-heading font-bold text-accent">
            9 Verified Visual Assets
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recovered.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-border-line bg-card p-4 hover:border-accent/40 transition-colors"
            >
              <div className="relative mb-4 flex h-52 items-center justify-center overflow-hidden rounded-xl border border-border-line bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute top-2 right-2 rounded bg-accent px-2 py-0.5 text-[10px] font-heading font-extrabold uppercase tracking-wide text-bg">
                  ★ Preserved
                </span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">{item.badge}</p>
              <h3 className="font-heading text-lg font-extrabold text-text-primary mb-1 leading-snug">{item.title}</h3>
              <p className="font-mono text-[11px] text-text-dark mb-2">
                File: <code>{item.filename}</code> · {item.platform}
              </p>
              <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <a
                  href={item.fullRes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-accent/40 px-3 py-1.5 text-xs font-heading font-bold text-accent hover:bg-accent hover:text-bg transition-colors"
                >
                  View Full High-Res ↗
                </a>
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
            <p className="font-mono text-xs text-text-dark">
              Showing <span className="text-accent font-bold">{filtered.length}</span> records
            </p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archival uploads by artist, title, or filename…"
            className="w-full rounded-xl border border-border-line bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-text-dark outline-none focus:border-accent"
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
                    <div className="font-bold text-accent">{row.subject}</div>
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
                          ? 'border-accent/40 text-accent'
                          : 'border-border-line text-text-dark'
                      }`}
                    >
                      {row.status === 'preserved' ? '★ Preserved' : 'Uncached'}
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
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
