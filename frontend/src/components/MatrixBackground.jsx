import React, { memo } from 'react';

/**
 * MatrixBackground
 * Restored to the user's preferred version:
 * - Deep dark black canvas (#08090b) with ZERO blue tint.
 * - Organic, non-uniform scattered letter fragments ("khi dikhe khi na dikhe").
 * - Left-side focused: right side is 100% pitch black with zero letters.
 * - Stays 100% stationary on viewport while page content scrolls smoothly over it.
 */
const SCATTERED_CLUSTERS = [
  { text: 'F W Q R - U & σ 8', top: '4%', left: '3%', opacity: 0.24 },
  { text: 'F N T R G U Z I U . N K λ S', top: '8%', left: '4%', opacity: 0.18 },
  { text: 'Q G M O T σ Z R V N', top: '12%', left: '6%', opacity: 0.14 },
  { text: 'Q V . * @ X & R . θ . V λ', top: '16%', left: '2%', opacity: 0.22 },
  { text: 'V + D U F . U V S S L', top: '7%', left: '26%', opacity: 0.10 },
  { text: 'θ * v B ( + . P + K', top: '13%', left: '28%', opacity: 0.08 },
  { text: 'C 0 N + Z C + N U T L', top: '22%', left: '4%', opacity: 0.16 },
  { text: '+ U N δ . H Ω Ω Z W λ', top: '27%', left: '3%', opacity: 0.20 },
  { text: 'A Z X . R + * D', top: '25%', left: '24%', opacity: 0.09 },
  { text: 'μ φ * * - M U M E * v', top: '33%', left: '5%', opacity: 0.25 },
  { text: 'H L M X & H P . E N M', top: '35%', left: '22%', opacity: 0.07 },
  { text: 'F γ U δ S X Z Ω U β l', top: '39%', left: '2%', opacity: 0.15 },
  { text: '- S & β R + T D', top: '44%', left: '6%', opacity: 0.20 },
  { text: 'S A + B O D Y И G', top: '46%', left: '25%', opacity: 0.11 },
  { text: '! C + Q H + L π B δ . 8', top: '51%', left: '3%', opacity: 0.22 },
  { text: 'I C O X C O . O A', top: '53%', left: '27%', opacity: 0.08 },
  { text: 'N U 5 H Q O Z W A', top: '58%', left: '5%', opacity: 0.16 },
  { text: 'D U F . U V S S', top: '60%', left: '24%', opacity: 0.10 },
  { text: 'Q G M O T σ', top: '65%', left: '3%', opacity: 0.13 },
  { text: 'B ( + . P + K . T μ σ', top: '67%', left: '26%', opacity: 0.08 },
  { text: 'V . * @ X & R . θ . V', top: '72%', left: '2%', opacity: 0.19 },
  { text: 'C N + Z C + N U T L', top: '78%', left: '5%', opacity: 0.22 },
  { text: 'Q q J , K T S + @ G I', top: '80%', left: '25%', opacity: 0.09 },
  { text: '+ U N δ . H Ω Ω Z W λ', top: '85%', left: '3%', opacity: 0.15 },
  { text: 'μ φ * * - M U M E *', top: '90%', left: '6%', opacity: 0.18 },
  { text: 'C + Q H + L π B . 8', top: '92%', left: '24%', opacity: 0.10 },
  { text: 'F γ U δ S X Z Ω U β L', top: '95%', left: '2%', opacity: 0.14 },
];

function MatrixBackgroundComponent() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#08090b] select-none matrix-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -50,
      }}
    >
      {/* Subtle monochrome dark ambient lighting on top-left (ZERO BLUE TINT) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.035) 0%, transparent 45%),
            radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 40%)
          `,
        }}
      />

      {/* Left-Focused Mask Container: Right side is 100% Pitch Black */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage:
            'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 22%, rgba(0, 0, 0, 0.15) 38%, rgba(0, 0, 0, 0) 48%)',
          WebkitMaskImage:
            'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 22%, rgba(0, 0, 0, 0.15) 38%, rgba(0, 0, 0, 0) 48%)',
        }}
      >
        {SCATTERED_CLUSTERS.map((item, idx) => (
          <div
            key={idx}
            className="absolute font-mono text-[12px] sm:text-[13px] tracking-[0.32em] text-slate-300 font-medium whitespace-nowrap select-none matrix-glyph"
            style={{
              top: item.top,
              left: item.left,
              opacity: item.opacity,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

const MatrixBackground = memo(MatrixBackgroundComponent);
export default MatrixBackground;
