/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'amiko': ['Amiko', 'sans-serif'],
        'monoton': ['Monoton', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
