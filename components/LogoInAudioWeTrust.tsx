import React from 'react';

export default function LogoInAudioWeTrust({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 420 70" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="In Audio We Trust"
    >
      <text
        x="0"
        y="54"
        fill="#ffffff"
        fontFamily="system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="54"
        letterSpacing="-0.04em"
      >
        inaudiowetrust
      </text>
      <line x1="165" y1="8" x2="182" y2="28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="165" cy="8" r="3.5" fill="#ffffff" />
      <polygon points="181,25 186,30 184,32 179,27" fill="#ffffff" />
    </svg>
  );
}
