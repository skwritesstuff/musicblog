import React from 'react';

function coinSizeFromWordmark(className: string) {
  if (/\bh-12\b/.test(className) || /\blg:h-12\b/.test(className)) return 'h-14 sm:h-16 lg:h-[4.5rem]';
  if (/\bh-10\b/.test(className)) return 'h-12 sm:h-14';
  if (/\bh-8\b/.test(className)) return 'h-10 sm:h-12';
  if (/\bh-5\b/.test(className) || /\bh-6\b/.test(className)) return 'h-7 sm:h-8';
  return 'h-8 sm:h-9';
}

/**
 * IAWT Jefferson coin + needle wordmark.
 * Default: original black wordmark on a white plate (light surfaces).
 * Use `variant="dark"` for the white wordmark on true black.
 */
export default function LogoInAudioWeTrust({
  className = 'h-7 w-auto',
  plate = true,
  variant = 'light',
  showCoin = true,
}: {
  className?: string;
  plate?: boolean;
  variant?: 'light' | 'dark';
  /** Include the Jefferson DJ-headphones coin beside the wordmark (default). */
  showCoin?: boolean;
}) {
  const coinClass = coinSizeFromWordmark(className);
  const wordmark =
    variant === 'dark' ? '/images/iawt-wordmark-white.png' : '/images/iawt-wordmark-black.png';

  const mark = (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0 bg-transparent">
      {showCoin ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/iawt-coin.png"
          alt=""
          aria-hidden
          className={`${coinClass} w-auto object-contain bg-transparent`}
          decoding="async"
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={wordmark}
        alt="In Audio We Trust"
        className={`object-contain bg-transparent ${className}`}
        decoding="async"
      />
    </span>
  );

  if (variant === 'dark' || !plate) return mark;

  return (
    <span className="inline-flex items-center rounded-lg bg-white border border-[#e5e5e5] px-3 py-2 sm:px-4 sm:py-2.5 shrink-0">
      {mark}
    </span>
  );
}
