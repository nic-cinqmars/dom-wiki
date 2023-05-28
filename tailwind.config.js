/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#09090a',
        secondary: '#3bc8c0',
        hover: '#352e38'
      },
      fontFamily: {
        body: ['Verdana', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

