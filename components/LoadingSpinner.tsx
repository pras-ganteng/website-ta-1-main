import React from 'react';

interface Props {
  className?: string;
  size?: number;
  stroke?: string;
}

export default function LoadingSpinner({ className = '', size = 20, stroke = '#000' }: Props) {
  const s = size;
  const strokeWidth = Math.max(2, Math.round(s / 8));
  return (
    <svg
      className={className}
      width={s}
      height={s}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stroke} stopOpacity="1" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle cx="25" cy="25" r="20" stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
      <path
        d="M45 25a20 20 0 0 1-20 20"
        stroke="url(#spinGrad)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
