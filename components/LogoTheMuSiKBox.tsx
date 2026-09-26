import React from 'react';

export default function LogoTheMuSiKBox({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 540 85" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The MuSiK Box - We Skip Study Hall For This..."
    >
      <g transform="translate(5, 5)">
        <polygon points="12,38 48,15 76,32 40,55" fill="#181818" stroke="#ffffff" strokeWidth="1.5" />
        <ellipse cx="44" cy="35" rx="20" ry="11" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
        <ellipse cx="44" cy="35" rx="7" ry="4" fill="#ffffff" />
        <circle cx="28" cy="18" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="23" y1="13" x2="33" y2="23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="13" x2="23" y2="23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="28" cy="18" r="14" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" fill="none" />
      </g>
      <text
        x="95"
        y="45"
        fill="#ffffff"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="44"
        letterSpacing="-0.02em"
      >
        The MuSiK Box
      </text>
      <text
        x="98"
        y="68"
        fill="#a1a1aa"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="16"
        letterSpacing="0.02em"
      >
        We Skip Study Hall For This...
      </text>
    </svg>
  );
}
