import { Compiler } from 'webpack';
import { isDev } from '../utils';
import genSiteShared from './gen-shared';

const pluginName = 'docx-site-compiler-plugin';

function getSiteEntry() {
  return new Promise((resolve, reject) => {
    try {
      genSiteShared();
      resolve();
    } catch(e) {
      console.log(e);
      reject(e);
    }
  })
}

export default class DocxSiteCompilerPlugin {
  apply(compiler: Compiler) {
    if (isDev()) {
      compiler.hooks.watchRun.tapPromise(pluginName, getSiteEntry)
    } else {
      compiler.hooks.beforeCompile.tapPromise(pluginName, getSiteEntry)
    };
  }
}