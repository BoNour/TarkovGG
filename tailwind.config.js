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
        },
        'fade-in-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '0.5',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)'
          }
        }
      },
      animation: {
        'news-ticker': 'news-ticker 30s linear infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
      },
      backgroundSize: {
        '200%': '200% auto'
      }
    },
  },
  plugins: [],
};