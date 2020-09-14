export function getBabelConfig() {
  return {
    presets: [
      [
        require('@babel/preset-env'),
        {
          loose: true,
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      require('@babel/preset-react'),
      require('@babel/preset-typescript')
    ],
    plugins: [
      [require('@babel/plugin-transform-runtime'), {
        corejs: false,
      }],
      [
        require('@babel/plugin-proposal-decorators'), { decoratorsBeforeExport: true }
      ],
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-proposal-export-default-from'),
    ],
    babelrc: false
  }
}