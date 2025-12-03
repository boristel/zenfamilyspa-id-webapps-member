/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
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
          50: '#fdfafa',
          100: '#f8f5f2',
          200: '#f1ebe5',
          300: '#e8ddd0',
          400: '#d4c5b0',
          500: '#b8a598',
          600: '#9c8b7d',
          700: '#7d6b5a',
          800: '#5e4a3d',
          900: '#3e2e28',
        },
        'spa': {
          50: '#f0f9f6',
          100: '#e1f4ec',
          200: '#c5ebd9',
          300: '#a7e0c2',
          400: '#82cf9f',
          500: '#68b985',
          600: '#4fa36d',
          700: '#3e8b58',
          800: '#2e7244',
          900: '#1f5e34',
        },
        'lavender': {
          50: '#faf9fd',
          100: '#f5f2fb',
          200: '#ede9f8',
          300: '#e1daf5',
          400: '#d1c5f1',
          500: '#baa5ec',
          600: '#a488e4',
          700: '#8b6cd8',
          800: '#7351c4',
          900: '#5c3a9f',
        },
        'rose': {
          50: '#fdf6f8',
          100: '#fceef3',
          200: '#f8dce7',
          300: '#f3c3d7',
          400: '#eda1c1',
          500: '#e87aa9',
          600: '#d25688',
          700: '#b83c6f',
          800: '#95285a',
          900: '#731f47',
        }
      },
    },
  },
  plugins: [],
}
