import React from 'react';

/**
 * MuSiK Box turntable banner.
 * Default: original black-type mark (`the-musik-box-banner.png`) on a white plate.
 * Use `variant="dark"` for the white-type transparent mark on true black.
 */
export default function LogoTheMuSiKBox({
  className = 'h-10 w-auto',
  plate = true,
  variant = 'light',
}: {
  className?: string;
  /** Seat the light-surface artwork on white (default). Ignored for dark variant. */
  plate?: boolean;
  /** light = black artwork for white surfaces; dark = white artwork for black chrome */
  variant?: 'light' | 'dark';
}) {
  const src =
    variant === 'dark'
      ? '/images/the-musik-box-banner-dark.png'
      : '/images/the-musik-box-banner.png';

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="The MuSiK Box — We Skip Study Hall For This..."
      className={`object-contain object-left bg-transparent ${className}`}
      decoding="async"
    />
  );

  if (variant === 'dark' || !plate) return img;

  return (
    <span className="inline-flex items-center rounded-lg bg-white border border-[#e5e5e5] px-3 py-2 sm:px-4 sm:py-2.5 shrink-0">
      {img}
    </span>
  );
}
