import React from 'react';

export default function LogoTheMuSiKBox({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/The_MuSiK_Box_Banner_DarkTheme.png"
      alt="The MuSiK Box — We Skip Study Hall For This..."
      className={className}
      decoding="async"
    />
  );
}
