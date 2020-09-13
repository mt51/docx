module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
    }],
    [
      '@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ]
}