/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'yellow': '#FABB18'
    }
  }, 
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

