import React from 'react';

/**
 * MuSiK Box turntable banner — original black-type artwork on a white plate
 * so the mark reads correctly against dark chrome.
 */
export default function LogoTheMuSiKBox({
  className = 'h-10 w-auto',
  plate = true,
}: {
  className?: string;
  /** Seat the original light-surface artwork on white (default). */
  plate?: boolean;
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/the-musik-box-banner.png"
      alt="The MuSiK Box — We Skip Study Hall For This..."
      className={`object-contain object-left bg-transparent ${className}`}
      decoding="async"
    />
  );

  if (!plate) return img;

  return (
    <span className="inline-flex items-center rounded-md bg-white px-2 py-1 sm:px-2.5 sm:py-1.5 shrink-0">
      {img}
    </span>
  );
}
