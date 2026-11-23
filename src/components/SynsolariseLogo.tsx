interface SynsolariseLogoProps {
  size?: number;
  className?: string;
}

export function SynsolariseLogo({ size = 34, className = '' }: SynsolariseLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="syn-sun" x1="16" y1="8" x2="48" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="55%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="syn-panel-left" x1="8" y1="28" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B3B8C" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="syn-panel-right" x1="32" y1="28" x2="56" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* Rising Sun Crown */}
      <path
        d="M17 26C17 17.7 23.7 11 32 11C40.3 11 47 17.7 47 26H43C43 19.9 38.1 15 32 15C25.9 15 21 19.9 21 26H17Z"
        fill="url(#syn-sun)"
      />
      <path
        d="M21 15L25 8L29.5 11.5L32 7L34.5 11.5L39 8L43 15L47.5 13.5L46 19L50 22L47 26H42.5C42.5 20.2 37.8 15.5 32 15.5C26.2 15.5 21.5 20.2 21.5 26H17L14 22L18 19L16.5 13.5L21 15Z"
        fill="url(#syn-sun)"
        opacity="0.95"
      />

      {/* Two Green Leaves */}
      <path
        d="M31.2 26.5C31.2 21.2 26.5 17.8 20.2 18.6C21.2 23.4 25.4 26.5 31.2 26.5Z"
        fill="#16A34A"
      />
      <path
        d="M32.8 26.5C32.8 21.2 37.5 17.8 43.8 18.6C42.8 23.4 38.6 26.5 32.8 26.5Z"
        fill="#22C55E"
      />

      {/* Winged Dual Solar Panel Grid */}
      <path d="M6 28.5H30.8V56L6 28.5Z" fill="url(#syn-panel-left)" />
      <path d="M58 28.5H33.2V56L58 28.5Z" fill="url(#syn-panel-right)" />

      {/* Panel Grid Lines */}
      <path
        d="M12 34.5H30.8M18.5 41.5H30.8M24.5 48.5H30.8M14 28.5L26 50.5M22.5 28.5L28.5 53"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      <path
        d="M52 34.5H33.2M45.5 41.5H33.2M39.5 48.5H33.2M50 28.5L38 50.5M41.5 28.5L35.5 53"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeOpacity="0.75"
      />
    </svg>
  );
}
