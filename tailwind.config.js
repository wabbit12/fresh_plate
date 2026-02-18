/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        dark: {
          900: '#1a1d2e',
          800: '#22273b',
          700: '#2d3349',
        }
      }
    },
  },
  plugins: [],
}
