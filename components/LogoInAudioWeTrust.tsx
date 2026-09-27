import React from 'react';

export default function LogoInAudioWeTrust({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iawt-coin.png"
        alt=""
        aria-hidden
        className="h-9 sm:h-11 w-auto object-contain"
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iawt-wordmark-white.png"
        alt="In Audio We Trust"
        className={`object-contain ${className}`}
        decoding="async"
      />
    </span>
  );
}
