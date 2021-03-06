import merge from 'webpack-merge';
import { WebpackConfig } from '../common/types';
import { baseConfig } from './webpack.base';
import { join } from 'path';

export function getSiteDevConfig(): WebpackConfig {
  return merge(baseConfig, {
    entry: {
      'site-desktop': [join(__dirname, '../../sites/desktop/main.tsx')],
      'site-simulator': [join(__dirname, '../../sites/simulator/main.js')]
    },

    resolve: {
      alias: {
        'site-desktop-shared': join(__dirname, '../../sites/configs/site-desktop-shared'),
        'site-mobile-shared': join(__dirname, '../../sites/configs/site-mobile-shared')
      }
    },

    devServer: {
      port: 8080,
      quiet: true,
      host: '0.0.0.0',
      stats: 'errors-only',
      publicPath: '/',
      disableHostCheck: true,
    },

    output: {
      chunkFilename: '[name].js',
      path: join(__dirname, '../../dist')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          chunks: {
            chunks: 'all',
            minChunks: 2,
            minSize: 0,
            name: 'chunks',
          }
        }
      }
    },
  });
}