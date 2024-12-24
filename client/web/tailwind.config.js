/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.tsx',
    'index.html',
    './src/*.tsx',
    './src/pages/**/*.tsx',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        headerBlocks: '280px 280px',
      },
      gridTemplateColumns: {
        'work-exp': '200px 1fr',
        'work-exp-mobile': '100px 1fr',
      },
      colors: {
        'text-color': '#32344F',
        blue: '#39BEF4',
        'white-blue': '#75CEF6',
        'ultra-white-blue': 'rgba(203, 240, 255, 1)',
        'white-transparent': 'rgb(171,228,250)',
        'dark-blue': '#0772B4',
        grey1: '#EBF9FF',
        grey4: '#9EBECB',
        greytext: '#84A6B4',
        grey5: '#EBF9FF'
      },
      textColor: {
        DEFAULT: '#32344F',
      },
    },
  },
  plugins: [],
};
