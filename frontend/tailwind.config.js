/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Dark Titanium Slate & Charcoal
        slate: {
          950: '#0a0c0e',
          900: '#111317',
          850: '#16191f',
          800: '#1c2027',
          750: '#232832',
          700: '#2c333f',
          600: '#3e4757',
          500: '#5c677a',
          400: '#8c99ac',
          300: '#b8c3d3',
          200: '#dce2ec',
          100: '#f0f3f8',
          50: '#f8fafc',
        },
        // Mapped ochre aliases to Deep Dark Canvas
        ochre: {
          950: '#080a0c',
          900: '#0d0f12',
          850: '#121418',
          800: '#171a1f',
          700: '#1e2229',
          600: '#13161a', // Deep Dark Base Canvas
          500: '#1a1e24',
          400: '#242a33',
          300: '#8c99ac',
          200: '#b8c3d3',
          100: '#f0f3f8',
          50: '#f8fafc',
        },
        // Mapped clay aliases to Dark Graphite & Flat Cyan
        clay: {
          950: '#0a0c0e',
          900: '#111317',
          850: '#16191f',
          800: '#1d2128',
          750: '#242932',
          700: '#2e3542',
          600: '#424b5c',
          500: '#0ea5e9', // Sky Blue Accent
          400: '#38bdf8',
          300: '#8c99ac',
          200: '#cbd5e1',
          100: '#f1f5f9',
        },
        accent: {
          cyan: '#0ea5e9',
          sky: '#38bdf8',
          dark: '#0284c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
