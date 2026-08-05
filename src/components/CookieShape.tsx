import React from 'react';

interface CookieShapeProps {
  className?: string;
  children?: React.ReactNode;
}

export const CookieShape: React.FC<CookieShapeProps> = ({ className = '', children }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Material 3 8-Lobed Scalloped Cookie Shape SVG */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-current pointer-events-none">
        <path d="M 50,0 C 58,0 63,8 72,8 C 81,8 88,2 94,8 C 100,14 93,22 94,31 C 95,40 100,45 100,50 C 100,55 95,60 94,69 C 93,78 100,86 94,92 C 88,98 81,92 72,92 C 63,92 58,100 50,100 C 42,100 37,92 28,92 C 19,92 12,98 6,92 C 0,86 7,78 6,69 C 5,60 0,55 0,50 C 0,45 5,40 6,31 C 7,22 0,14 6,8 C 12,2 19,8 28,8 C 37,8 42,0 50,0 Z" />
      </svg>
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
