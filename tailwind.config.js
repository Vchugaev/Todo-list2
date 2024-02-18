/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        hoverDialog: {
          'from': {
            opacity: '0',
            transform: 'scale(0.96)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        }
      },
      animation: {
        rotate: 'rotate 1s ease-in-out infinite',
        hoverDialog: 'hoverDialog 100ms ease-in-out forwards'
      },
      boxShadow: {
        'alert-shadow': 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;'
      }
    },
    colors: {
      'yellow': '#FABB18',
      'white': 'white',
      'red': 'red',
      'stroke-10': 'stroke-width: 10',
      'green': '#00a300;',
      'grey': '#e0e0e0;',
      'black-grey': '#242424',
      'black': '#000',
      'folder-green': '#47FA18',
      'white_bg': '#F9F9F9',
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

