import sass from 'sass';
import { join } from 'path';
import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { getBabelConfig } from './babel.config';
import { WebpackConfig } from '../common/types';
import { SCRIPT_EXTS, STYLE_EXTS} from '../common/constant';

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: './.cache',
  }
}

const cssLoaders = ['style-loader', 'css-loader'];

const babelLoader = {
  loader: 'babel-loader',
  options: getBabelConfig(),
}

const plugins = [new FriendlyErrorsPlugin()];

export const baseConfig: WebpackConfig = {
  mode: 'development',
  resolve: {
    extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules\/(?!(docx))/,
        use: [cacheLoader, babelLoader],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: cssLoaders,
      },
      {
        test: /\.less$/,
        use: [...cssLoaders, 'less-loader']
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          ...cssLoaders,
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [cacheLoader, babelLoader, join(__dirname, '../loaders/markdown-loader')]
      }
    ],
  },
  plugins,
}