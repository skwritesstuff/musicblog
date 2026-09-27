'use client';

import React, { useEffect, useState } from 'react';

function coinSizeFromWordmark(className: string) {
  if (/\bh-12\b/.test(className) || /\blg:h-12\b/.test(className)) return 'h-14 sm:h-16 lg:h-[4.5rem]';
  if (/\bh-10\b/.test(className)) return 'h-12 sm:h-14';
  if (/\bh-8\b/.test(className)) return 'h-10 sm:h-12';
  if (/\bh-5\b/.test(className) || /\bh-6\b/.test(className)) return 'h-7 sm:h-8';
  return 'h-8 sm:h-9';
}

export default function LogoInAudioWeTrust({ className = 'h-7 w-auto' }: { className?: string }) {
  const coinClass = coinSizeFromWordmark(className);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const read = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setLight(theme === 'light');
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const wordmark = light ? '/images/iawt-wordmark-black.png' : '/images/iawt-wordmark-white.png';

  return (
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
        src={wordmark}
        alt="In Audio We Trust"
        className={`object-contain bg-transparent ${className}`}
        decoding="async"
      />
    </span>
  );
}
