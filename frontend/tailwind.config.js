/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nutri: {
          green: '#22C55E',
          dark: '#14532D',
          light: '#F0FDF4',
          accent: '#10B981'
        },
        surface: '#F9FAFB',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}