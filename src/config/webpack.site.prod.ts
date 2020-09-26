import merge from 'webpack-merge';
import { WebpackConfig } from '../common/types';
import { baseConfig } from './webpack.base';
import { join } from 'path';
import { SITE_DIST_DIR } from '../common/constant';
import { getDocxConfig } from '../common';
import { get } from 'lodash';


const docxConfig = getDocxConfig();

const outputPath = get(docxConfig, 'build.site.outputDir', SITE_DIST_DIR);

console.log(outputPath);

export function getSiteProdConfig(): WebpackConfig {
  return merge(baseConfig, {
    mode: 'production',
    stats: 'none',
    performance: {
      maxAssetSize: 5 * 1024 * 1024,
      maxEntrypointSize: 5 * 1024 * 1024
    },
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

    output: {
      publicPath: '/',
      chunkFilename: '[name].js',
      path: outputPath
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