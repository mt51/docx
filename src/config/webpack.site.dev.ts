import merge from 'webpack-merge';
import webpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackConfig } from '../common/types';
import { baseConfig } from './webpack.base';
import { join } from 'path';
import { GREEN } from '../common/constant';
import DocxSiteCompilerPlugin from '../compiler/docx-site-compiler-plugin';

export function getSiteDevBaseConfig(): WebpackConfig {
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

    plugins: [
      new DocxSiteCompilerPlugin(),
      new webpackBar({
        name: 'docx',
        color: GREEN,
      }),

      new HtmlWebpackPlugin({
        title: 'docx',
        chunks: ['chunks', 'site-desktop'],
        template: join(__dirname, '../../sites/desktop/index.html'),
        filename: 'index.html'
      }),

      new HtmlWebpackPlugin({
        title: 'docx',
        chunks: ['chunks', 'site-simulator'],
        template: join(__dirname, '../../sites/simulator/index.html'),
        filename: 'simulator.html'
      })
    ]
  });
}

export function getSiteDevConfig():WebpackConfig {
  return getSiteDevBaseConfig();
}