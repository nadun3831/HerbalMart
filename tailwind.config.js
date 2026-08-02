/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          bg: '#101415',
          card: '#1d2022',
          cardHigh: '#272a2c',
          emerald: '#064e3b',
          lime: '#84cc16',
          mint: '#95d3ba',
          moss: '#365314',
          sage: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
