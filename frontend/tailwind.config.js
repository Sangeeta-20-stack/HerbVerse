/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
       fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
         cinzel: ['"Cinzel"', 'serif'],
        inter: ['Inter', 'sans-serif'], // keep your existing font
      },
      colors: {
        deepForest: '#0F3D2E',
        mintGreen: '#6EE7B7',
        oliveAccent: '#84A98C',
        softWhite: '#F8FAF9',
        charcoal: '#111827',
      }
    },
  },
  plugins: [],
}