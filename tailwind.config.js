/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      'extra-bold': '800',
      black: '900',
    },
    extend: {
      colors: {
        'primary-1': '#008AFE',
        'primary-2': '#5CDDD4',
        'primary-3': '#9EEDE3',
        'primary-4': '#000000',
        'secondary': '#346DD8',
        'neutral-1': '#3D3D3D',
        'neutral-2': '#848B90',
        'neutral-3': '#BDC5CD',
        'neutral-4': '#EBF0F5',
        'neutral-5': '#F6F9FC',
        'neutral-6': '#6D6E70',
        'disabled-text-1': '#939597',
        'disabled-1': '#DBDCDE',

        'error-1': '#EB5757',

        // Dark Mode
        'custom-dark': '#282828',
        'accent-1': '#04B6C1'
      },
    },
  },
  plugins: [],
}

