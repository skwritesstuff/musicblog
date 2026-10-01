import React from 'react';

function coinSizeFromWordmark(className: string) {
  if (/\bh-12\b/.test(className) || /\blg:h-12\b/.test(className)) return 'h-14 sm:h-16 lg:h-[4.5rem]';
  if (/\bh-10\b/.test(className)) return 'h-12 sm:h-14';
  if (/\bh-8\b/.test(className)) return 'h-10 sm:h-12';
  if (/\bh-5\b/.test(className) || /\bh-6\b/.test(className)) return 'h-7 sm:h-8';
  return 'h-8 sm:h-9';
}

/**
 * IAWT coin + original black needle wordmark.
 * Default: white plate so the mark reads on dark chrome.
 * Set plate={false} when already seated on a light surface (e.g. white header banner).
 */
export default function LogoInAudioWeTrust({
  className = 'h-7 w-auto',
  plate = true,
}: {
  className?: string;
  plate?: boolean;
}) {
  const coinClass = coinSizeFromWordmark(className);

  const mark = (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0 bg-transparent">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iawt-coin.png"
        alt=""
        aria-hidden
        className={`${coinClass} w-auto object-contain bg-transparent`}
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iawt-wordmark-black.png"
        alt="In Audio We Trust"
        className={`object-contain bg-transparent ${className}`}
        decoding="async"
      />
    </span>
  );

  if (!plate) return mark;

  return (
    <span className="inline-flex items-center rounded-md bg-white px-2 py-1 sm:px-2.5 sm:py-1.5 shrink-0">
      {mark}
    </span>
  );
}
