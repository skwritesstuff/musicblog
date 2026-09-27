import React from 'react';

export default function LogoInAudioWeTrust({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-2 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iawt-headphone-coin.png"
        alt=""
        aria-hidden
        className="h-8 sm:h-10 w-auto object-contain"
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iawt-needle-logo.png"
        alt="In Audio We Trust"
        className={className}
        decoding="async"
      />
    </span>
  );
}
