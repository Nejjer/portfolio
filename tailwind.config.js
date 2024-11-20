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
      colors: {
        'text-color': '#32344F',
        blue: '#39BEF4',
        'white-blue': '#75CEF6',
        'ultra-white-blue': 'rgba(203, 240, 255, 1)',
        'white-transparent': 'rgba(255, 255, 255, 0.7)',
        'dark-blue': '#0772B4',
        grey1: '#EBF9FF',
        grey4: '#9EBECB',
      },
      textColor: {
        DEFAULT: '#32344F',
      },
    },
  },
  plugins: [],
};
