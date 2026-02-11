module.exports = {
  plugins: {
    autoprefixer: {
      // Suppress color-adjust deprecation warning
      overrideBrowserslist: ['>0.2%', 'not dead', 'not op_mini all'],
    },
  },
};
