'use client';

import React, { useEffect, useState } from 'react';

type Surface = 'auto' | 'on-dark' | 'on-light';

const DARK_SRC = '/images/the-musik-box-banner-dark.png';
const LIGHT_SRC = '/images/the-musik-box-banner.png';

function useLightSurface() {
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

  return light;
}

/**
 * MuSiK Box turntable banner.
 * - on-dark: white type for true-black / dark chrome (hero, Story figures)
 * - on-light: original black type for cream/white surfaces
 * - auto: follows data-theme (light → black type; otherwise white type)
 */
export default function LogoTheMuSiKBox({
  className = 'h-10 w-auto',
  surface = 'auto',
}: {
  className?: string;
  surface?: Surface;
}) {
  const lightTheme = useLightSurface();
  const onLight = surface === 'on-light' || (surface === 'auto' && lightTheme);
  const src = onLight ? LIGHT_SRC : DARK_SRC;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="The MuSiK Box — We Skip Study Hall For This..."
      className={`object-contain object-left bg-transparent ${className}`}
      decoding="async"
    />
  );
}
