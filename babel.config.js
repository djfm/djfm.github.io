module.exports = {
  plugins: [
    ['babel-plugin-styled-components', {
      displayName: true,
      fileName: false,
      pure: true,
      transpileTemplateLiterals: true,
    }],
  ],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      corejs: 3,
      targets: {
        esmodules: true,
      },
    }],
  ],
};
