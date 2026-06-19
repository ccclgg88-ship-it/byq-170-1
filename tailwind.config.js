/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cyber: ['"Orbitron"', 'system-ui', 'sans-serif'],
        healing: ['"Quicksand"', 'system-ui', 'sans-serif'],
        retro: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
