/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kart: {
          bg: '#08080a',
          card: '#0f0f14',
          border: 'rgba(255, 69, 0, 0.2)',
          orange: '#FF4500',
          red: '#FF1E00',
          amber: '#FF8C00',
          gold: '#FFD700',
          gray: '#8E8E93',
          dark: '#050507',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'Chakra Petch', 'sans-serif'],
      },
      animation: {
        'light-sweep': 'sweep 3s infinite linear',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', filter: 'drop-shadow(0 0 10px rgba(255, 69, 0, 0.5))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(255, 69, 0, 0.9))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
