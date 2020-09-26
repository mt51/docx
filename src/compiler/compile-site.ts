import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { getPort } from 'portfinder';
import { logBanner } from '../utils/logger';
import { getSiteDevConfig } from '../config/webpack.site.dev';
import { getSiteProdConfig } from '../config/webpack.site.prod';

function runDevServer(port: number, config: ReturnType<typeof getSiteDevConfig>) {

  const server = new WebpackDevServer(webpack(config), config.devServer);

  (server as any).showStatus = function () {};

  const host = config.devServer?.host || 'localhost';

  server.listen(port, host, (err) => {
    if (err) {
      console.log(err);
    }
  })
}

function watch() {
  const config = getSiteDevConfig();
  getPort({ port: config.devServer!.port }, (err: Error, port: number) => {
    if (err) {
      console.log(err);
      return;
    }
    logBanner(process.env.NODE_ENV!, port);
    runDevServer(port, config);
  })
}

function build() {
  return new Promise((resolve, reject) => {
    const config = getSiteProdConfig();
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject();
      } else {
        resolve();
      }
    });
  })
}


export async function compileSite(production = false) {
  if (production) {
    await build();
  } else {
    watch();
  }
}