/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#202124',
        darkCard: '#2d2e30',
        darkBorder: '#5f6368'
      }
    },
  },
  plugins: [],
}
