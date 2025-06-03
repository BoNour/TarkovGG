/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark': '#1a1a1a',
        'darker': '#141414',
        'lighter': '#333333',
        'lightest': '#404040',
      },
      keyframes: {
        'news-ticker': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        'news-ticker': 'news-ticker 30s linear infinite'
      }
    },
  },
  plugins: [],
};