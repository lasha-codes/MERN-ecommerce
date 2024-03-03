/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#353839',
        grayGradient: 'linear-gradient(#000, #fff)',
      },
    },
  },
  plugins: [],
}
