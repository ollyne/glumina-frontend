/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        glumina: {
          navy: '#1e2a78',
          blue: '#6b7fd7',
          lavender: '#a5b4fc',
          purple: '#c4b5fd',
          mist: '#e0e7ff',
          cloud: '#f0f4ff',
        },
      },
      boxShadow: {
        'glow': '0 8px 32px 0 rgba(99, 102, 241, 0.15)',
        'glow-lg': '0 20px 60px 0 rgba(99, 102, 241, 0.2)',
        'soft': '0 4px 24px rgba(99, 102, 241, 0.08)',
      },
    },
  },
  plugins: [],
}