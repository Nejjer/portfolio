/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/**/*.tsx', 'index.html', './src/*.tsx'],
  theme: {
    extend: {
      gridTemplateRows: {
        headerBlocks: '280px 280px',
      },
      colors: {
        'text-color': '#32344F',
        blue: '#39BEF4',
        'white-blue': '#75CEF6',
        'dark-blue': '#0772B4',
        grey1: '#EBF9FF',
      },
      textColor: {
        DEFAULT: '#32344F',
      },
    },
  },
  plugins: [],
};
