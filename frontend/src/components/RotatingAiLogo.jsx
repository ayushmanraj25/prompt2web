import React from 'react';
import logoImg from '../assets/logo.png';

/**
 * RotatingAiLogo
 * Displays strictly the isolated 3D spiral torus logo with continuous 360° rotation.
 * Memoized so it never re-renders or resets CSS animations when other components update.
 */
function RotatingAiLogoComponent({ size = 'md', className = '', showDust = true }) {
  // Dimension presets
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-14 h-14',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-36 h-36',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Soft natural vapor mist aura */}
      {showDust && size !== 'sm' && (
        <>
          <div
            className="absolute -inset-4 sm:-inset-6 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(148, 163, 184, 0.15) 45%, transparent 75%)',
              filter: 'blur(20px)',
              animation: 'smokePulse 5.5s ease-in-out infinite',
            }}
          />

          <div
            className="absolute -inset-6 sm:-inset-8 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 45% 45%, rgba(255, 255, 255, 0.18) 0%, rgba(148, 163, 184, 0.1) 40%, transparent 80%)',
              filter: 'blur(26px)',
              animation: 'mistDrift 7s ease-in-out infinite',
            }}
          />
        </>
      )}

      {/* 3D Spiral Torus */}
      <div
        className={`relative ${currentSize} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 z-10`}
      >
        <img
          src={logoImg}
          alt="Prompt2Web AI Emblem"
          className="w-full h-full object-contain select-none pointer-events-none"
          style={{
            animation: 'spinSlow 20s linear infinite',
            transformOrigin: 'center center',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))',
          }}
        />
      </div>
    </div>
  );
}

const RotatingAiLogo = React.memo(RotatingAiLogoComponent);
export default RotatingAiLogo;
