'use client';

import React, { useEffect, useState } from 'react';

/**
 * MuSiK Box turntable banner — original black-type artwork for light surfaces.
 * On dark/neon/sepia chrome, seats the mark on a white plate so it reads correctly.
 */
export default function LogoTheMuSiKBox({
  className = 'h-10 w-auto',
  plate = 'auto',
}: {
  className?: string;
  /** true = always plate; false = never; auto = plate unless Light theme */
  plate?: boolean | 'auto';
}) {
  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    if (plate !== 'auto') return;
    const read = () => {
      setLightTheme(document.documentElement.getAttribute('data-theme') === 'light');
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [plate]);

  const showPlate = plate === true || (plate === 'auto' && !lightTheme);

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/the-musik-box-banner.png"
      alt="The MuSiK Box — We Skip Study Hall For This..."
      className={`object-contain object-left bg-transparent ${className}`}
      decoding="async"
    />
  );

  if (!showPlate) return img;

  return (
    <span className="inline-flex items-center rounded-md bg-white px-2 py-1 sm:px-2.5 sm:py-1.5 shrink-0">
      {img}
    </span>
  );
}
