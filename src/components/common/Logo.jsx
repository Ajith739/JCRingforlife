import React from 'react';

export default function Logo({
  className = '',
  width = 130,
  showTagline = false,
  gradientId = 'aionLogoGradient',
}) {
  const height = showTagline ? width * 0.65 : width * 0.5;
  const viewBox = showTagline ? '0 0 120 78' : '0 0 120 60';

  return (
    <svg
      className={`text-ink ${className}`}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="aiOn"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A9E0" />
          <stop offset="50%" stopColor="#1878E0" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      {/* "ai" */}
      <text
        x="8"
        y="42"
        textAnchor="start"
        fill="currentColor"
        fontFamily="'Inter', -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="-1.5"
      >
        ai
      </text>
      {/* Smart Ring "O" */}
      <circle
        cx="60"
        cy="30"
        r="12"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.5"
      />
      {/* "n" */}
      <text
        x="76"
        y="42"
        textAnchor="start"
        fill="currentColor"
        fontFamily="'Inter', -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="-1.5"
      >
        n
      </text>
      {/* Optional Tagline */}
      {showTagline && (
        <text
          x="60"
          y="66"
          textAnchor="middle"
          fill="#6B7A8C"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="7"
          letterSpacing="2"
        >
          VITAL · LIFE · FORCE
        </text>
      )}
    </svg>
  );
}

