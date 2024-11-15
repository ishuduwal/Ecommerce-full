/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-heart': {
          '50': '#f5f3ff',
          '100': '#ece9fe',
          '200': '#dcd6fe',
          '300': '#c2b5fd',
          '400': '#a48bfa',
          '500': '#865cf6',
          '600': '#773aed',
          '700': '#6828d9',
          '800': '#5721b7',
          '900': '#481d95',
          '950': '#2c1065',
        },
        'purple-main': {
          '69': '#5721b7',
        }
      },
      screens: {
        'max-sm': { 'max': '640px' },
        'max-md': { 'max': '767px' },
        'max-ap': { 'max': '930px' },
        'max-lg': { 'max': '1024px' },
      },
      text: {
        'font-size': '1rem'
      },
    },
  },
  plugins: [],
}

