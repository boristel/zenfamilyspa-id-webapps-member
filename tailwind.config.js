/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zen color palette
        'zen-green': '#8DA399',
        'zen-sand': '#F5F5F1',
        'zen-brown': '#5D4037',
        // Luxurious spa-inspired color palette
        'zen': {
          50: '#fdfafa',    // Softest background
          100: '#f8f5f2',   // Creamy white
          200: '#f1ebe5',   // Warm cream
          300: '#e8ddd0',   // Soft sand
          400: '#d4c5b0',   // Sage beige
          500: '#b8a598',   // Warm stone
          600: '#9c8b7d',   // Earthy brown
          700: '#7d6b5a',   // Deep earth
          800: '#5e4a3d',   // Rich soil
          900: '#3e2e28',   // Dark bark
        },
        'spa': {
          50: '#f0f9f6',    // Mint whisper
          100: '#e1f4ec',   // Soft mint
          200: '#c5ebd9',   // Light sage
          300: '#a7e0c2',   // Fresh green
          400: '#82cf9f',   // Tranquil green
          500: '#68b985',   // Spa green
          600: '#4fa36d',   // Restorative green
          700: '#3e8b58',   // Healing green
          800: '#2e7244',   // Forest green
          900: '#1f5e34',   // Deep forest
        },
        'lavender': {
          50: '#faf9fd',    // Lightest lavender
          100: '#f5f2fb',   // Soft cloud
          200: '#ede9f8',   // Dreamy lavender
          300: '#e1daf5',   // Soft lilac
          400: '#d1c5f1',   // Calm lavender
          500: '#baa5ec',   // Zen lavender
          600: '#a488e4',   // Relaxing purple
          700: '#8b6cd8',   // Meditation purple
          800: '#7351c4',   // Deep violet
          900: '#5c3a9f',   // Night violet
        },
        'rose': {
          50: '#fdf6f8',    // Blush whisper
          100: '#fceef3',   // Soft rose
          200: '#f8dce7',   // Gentle pink
          300: '#f3c3d7',   // Warm blush
          400: '#eda1c1',   // Soft rose
          500: '#e87aa9',   // Spa rose
          600: '#d25688',   // Rose quartz
          700: '#b83c6f',   // Deep rose
          800: '#95285a',   // Rich rose
          900: '#731f47',   // Wine rose
        }
      },
      fontFamily: {
        'zen': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      backdropBlur: {
        'zen': '12px',
      },
      boxShadow: {
        'zen': '0 8px 32px rgba(190, 165, 152, 0.15)',
        'zen-lg': '0 20px 40px rgba(94, 74, 61, 0.12)',
        'spa': '0 4px 20px rgba(168, 185, 133, 0.2)',
      }
    },
  },
  plugins: [],
}