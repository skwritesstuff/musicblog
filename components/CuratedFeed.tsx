'use client';

import React from 'react';
import { CURATED_POSTS, type CuratedPost } from '@/src/data/curatedPosts';

export type { CuratedPost };
export { CURATED_POSTS };

export default function CuratedFeed() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-text-primary">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0a] border border-[#222222] mb-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-white">
            FROM THE ARCHIVE
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Foundational Blog Discoveries
        </h2>
        <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl leading-relaxed">
          Nine essential co-signs from The MuSiK Box and In Audio We Trust archives.
        </p>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURATED_POSTS.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col relative rounded-2xl bg-[#0a0a0a] border border-[#222222] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#262626]"
          >
            {/* Card Meta */}
            <div className="flex justify-between items-center mb-4 gap-3">
              <span className="font-heading text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded bg-[#0f0f0f] border border-[#262626] text-[#94a3b8]">
                {post.category}
              </span>
              <span className="text-xs text-text-dark font-medium text-right shrink-0">
                {post.date} • {post.brand}
              </span>
            </div>

            {/* Title & Artist */}
            <div className="mb-4">
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary group-hover:text-text-primary transition-colors">
                {post.artist}
              </h3>
              <h4 className="font-heading text-sm font-semibold text-text-muted mt-0.5 line-clamp-1">
                {post.title}
              </h4>
            </div>

            {/* DIRECT INLINE YOUTUBE VIDEO EMBED */}
            <div className="w-full mb-4 rounded-xl bg-card-elevated border border-border-line overflow-hidden shadow-lg">
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeId}?rel=0&modestbranding=1`}
                  title={`${post.artist} - ${post.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">
              {post.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/5 mt-auto">
              <a
                href={post.postSlug}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-heading text-xs font-bold hover:-translate-y-0.5 transition-transform"
              >
                Read Post
                <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={post.waybackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3.5 py-2 rounded-full bg-white/5 border border-border-line text-text-muted hover:text-text-primary hover:bg-white/10 text-xs font-medium transition-all"
              >
                Wayback Snap ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
