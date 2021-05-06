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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
