import React from 'react';

/** MuSiK Box turntable banner — white-type transparent mark for true black chrome. */
export default function LogoTheMuSiKBox({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/the-musik-box-banner-dark.png"
      alt="The MuSiK Box — We Skip Study Hall For This..."
      className={`object-contain object-left bg-transparent ${className}`}
      decoding="async"
    />
  );
}
