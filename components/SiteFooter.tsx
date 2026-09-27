import React from 'react';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border-line mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-heading font-extrabold text-text-primary text-sm sm:text-base mb-1">
            The MuSiK Box (2009–2011) • In Audio We Trust (2011–2012)
          </p>
          <p className="text-sm text-text-muted mb-2">
            Original publication created & curated by{' '}
            <strong className="text-accent">Seamus Kelleher</strong> &{' '}
            <strong className="text-app-accent">Myles Snider</strong>.
          </p>
          <p className="text-xs text-text-dark leading-relaxed">
            An incomplete historical salvage of what could be recovered from surviving Wayback Machine archives.
            Published multiple times daily from August 2009 – January 2012; thousands of original posts and media
            assets remain lost to time.
          </p>
        </div>
        <div className="text-sm text-text-muted space-y-1 md:text-right">
          <p>
            <Link href="/story" className="text-accent font-bold hover:underline">
              ★ The Story
            </Link>
            {' • '}
            <Link href="/archive" className="hover:text-text-primary">
              Archive
            </Link>
            {' • '}
            <Link href="/artists" className="hover:text-text-primary">
              Artists
            </Link>
            {' • '}
            <Link href="/media" className="hover:text-text-primary">
              Media & Art
            </Link>
          </p>
          <p className="text-xs text-text-dark">Saint Ignatius High School • Cleveland, Ohio • 2009–2012</p>
        </div>
      </div>
    </footer>
  );
}
