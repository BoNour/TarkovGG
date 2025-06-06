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
        },
        'pulse-subtle': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.95',
            transform: 'scale(1.005)'
          }
        },
        'lighting-sweep': {
          '0%': { 
            backgroundPosition: '-200% center',
            opacity: '0.3'
          },
          '50%': { 
            backgroundPosition: '0% center',
            opacity: '0.6'
          },
          '100%': { 
            backgroundPosition: '200% center',
            opacity: '0.3'
          }
        },
        'ambient-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.1), 0 0 40px rgba(239, 68, 68, 0.05), 0 0 80px rgba(239, 68, 68, 0.02)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.2), 0 0 60px rgba(239, 68, 68, 0.1), 0 0 120px rgba(239, 68, 68, 0.05)'
          }
        }
      },
      animation: {
        'news-ticker': 'news-ticker 30s linear infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'lighting-sweep': 'lighting-sweep 4s ease-in-out infinite',
        'ambient-glow': 'ambient-glow 2.5s ease-in-out infinite'
      },
      backgroundSize: {
        '200%': '200% auto',
        '300%': '300% auto'
      }
    },
  },
  plugins: [],
};