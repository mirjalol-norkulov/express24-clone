module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: '#2c2c2c',
        lightgreen: 'rgb(42, 197, 11)',
        gray: {
          DEFAULT: '#ABABAB',
          light: '#DEDEDE',
        },
        blue: '#008dff',
        primary: {
          DEFAULT: '#F7E233',
          light: 'hsl(54, 92%, 70%)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
        },
      });
    },
  ],
};
