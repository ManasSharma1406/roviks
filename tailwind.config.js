/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: '1100px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Poppins', 'sans-serif'],
        mono: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
