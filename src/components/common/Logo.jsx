import React from 'react';

export default function Logo({
  className = '',
  width = 160,
  showTagline = false,
  gradientId = 'jcringLogoGradient',
}) {
  const height = showTagline ? width * 0.36 : width * 0.24;
  const viewBox = showTagline ? '0 0 240 84' : '0 0 240 56';

  return (
    <svg
      className={`text-ink ${className}`}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="JCRingforlife"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A9E0" />
          <stop offset="50%" stopColor="#1878E0" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      {/* "JC" in bold brand color */}
      <text
        x="6"
        y="38"
        textAnchor="start"
        fill="currentColor"
        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="-1.2"
      >
        JC
      </text>
      {/* "Ring" in vibrant brand gradient */}
      <text
        x="52"
        y="38"
        textAnchor="start"
        fill={`url(#${gradientId})`}
        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="-1"
      >
        Ring
      </text>
      {/* "forlife" in elegant clean weight */}
      <text
        x="122"
        y="38"
        textAnchor="start"
        fill="currentColor"
        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="400"
        fontSize="30"
        letterSpacing="-0.8"
      >
        forlife
      </text>
      {/* Optional Tagline */}
      {showTagline && (
        <text
          x="120"
          y="70"
          textAnchor="middle"
          fill="#6B7A8C"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="9"
          letterSpacing="2.5"
        >
          THE FULL CIRCLE OF HEALTH
        </text>
      )}
    </svg>
  );
}
