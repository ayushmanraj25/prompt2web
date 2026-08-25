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
        // Base Background: Warm Camel Ochre (Swatch Image 2)
        ochre: {
          950: '#2b2213',
          900: '#42341d',
          800: '#5c4929',
          700: '#735c34',
          600: '#8b734b', // Exact background swatch
          500: '#9e8457',
          400: '#b59d70',
          300: '#cdb992',
          200: '#e4d7be',
          100: '#f5efe4',
          50: '#fbf9f5',
        },
        // KPI & Card Surfaces: Terracotta Cocoa Clay (Rock Image 1)
        clay: {
          950: '#1c0c08',
          900: '#2c140e',
          850: '#3a1b13', // KPI Card Dark Surface
          800: '#4d241a',
          750: '#5c2b1f',
          700: '#703527', // Terracotta Border
          600: '#8c4231', // Terracotta Rust
          500: '#a8513d', // Terracotta Accent
          400: '#c46b55',
          300: '#dc9280',
          200: '#f0c1b5',
          100: '#faeae6',
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
