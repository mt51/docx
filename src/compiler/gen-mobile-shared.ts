import { join } from 'path';
import { existsSync, readdirSync } from 'fs-extra';

import { SRC_DIR, SITE_MOBILE_SHARED_FILE, docxConfigsPath } from '../common/constant';
import { pascalize, normalizePath, decamelize, removeExt, smartOutputFile } from '../utils';

interface IDemo {
  name: string;
  path: string;
  component: string;
}

interface INavItem {
  title: string;
  path?: string;
  items?: INavItem[]
}

const configs = require(docxConfigsPath);


function genImports(demos: IDemo[]) {
  return demos.map(item => `import ${item.name} from '${removeExt(normalizePath(item.path))}';`).join('\n');
}

function genExports(demos: IDemo[]) {
  return `export const demos = {\n  ${demos
    .map(item => item.name)
    .join(',\n  ')}\n};`;
}

function genConfigs(demos: IDemo[]) {
  const demoNames = demos.map(item => decamelize(item.name));

  function demoFilter(nav: INavItem[]) {
    return nav.filter(group => {
      if (group.items) {
        group.items = group.items.filter((item) =>
          demoNames.includes(item.path!)
        );
        return group.items.length;
      }
    });
  }

  Object.keys(configs).forEach(lang => {
    if (configs[lang].nav) {
      configs[lang].nav = demoFilter(configs[lang].nav)
    }
  })

  return `export const config = ${JSON.stringify(configs, null, 2)}`;
}

function genCode(components: string[]) {
  const demos: IDemo[] = components.map(component => ({
    component,
    name: pascalize(component),
    path: join(SRC_DIR, component, 'demo/index.tsx')
  })).filter(item => existsSync(item.path));
  return `${genImports(demos)}
  ${genExports(demos)}
  ${genConfigs(demos)}
  `;
}

export function genSiteMobileShared() {
  const dirs = readdirSync(SRC_DIR);
  const code = genCode(dirs);

  smartOutputFile(SITE_MOBILE_SHARED_FILE, code);
}
