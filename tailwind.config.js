/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        crust: '#f4a52a',
        ember: '#e84c1c',
        ink: '#0b1220',
        cream: '#fdf8f0',
        sage: '#94a89a',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'rise': 'rise 0.8s ease-out forwards',
      },
      keyframes: {
        breathe: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.04)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        rise: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      }
    }
  },
  plugins: []
};
