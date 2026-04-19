/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nutri: {
          green: 'hsl(142, 71%, 45%)',   // #22C55E equivalent
          dark:  'hsl(143, 64%, 24%)',   // #14532D equivalent
          light: 'hsl(138, 76%, 97%)',   // #F0FDF4 equivalent
          accent:'hsl(160, 84%, 39%)',
        },
        surface: 'hsl(210, 20%, 98%)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}