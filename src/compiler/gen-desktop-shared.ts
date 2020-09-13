import glob from 'fast-glob';
import { join, parse } from 'path';
import { existsSync, readdirSync } from 'fs-extra';
import { SRC_DIR, DOCS_DIR, SITE_DESKTOP_SHARED_FILE , docxConfigsPath } from '../common/constant';
import { pascalize, normalizePath, smartOutputFile } from '../utils';

interface IDocItem {
  name: string,
  path: string;
}

const configs = require(docxConfigsPath);

function formatName(component: string, lang: string) {
  component = pascalize(component);

  if (lang) {
    return `${component}_${lang.replace('-', '_')}`;
  }

  return component;
}

function resolveDocuments(components: string[]) {
  const docs: IDocItem[] = [];

  const langs = Object.keys(configs);

  langs.forEach(lang => {
    const fileName = `README.${lang}.md`;
    components.forEach(component => {
      docs.push({
        name: formatName(component, lang),
        path: join(SRC_DIR, component, fileName),
      })
    })
    
  })

  const staticDocs = glob.sync(normalizePath(join(DOCS_DIR, '**/*.md'))).map(p => {
    const pairs = parse(p).name.split('.');
    return {
      name: formatName(pairs[0], pairs[1] || 'zh-CN'),
      path: p,
    }
  });

  return [
    ...staticDocs,
    ...docs.filter(item => existsSync(item.path))
  ]
}

function genImports(documents: IDocItem[]) {
  return documents.map(item => `import ${item.name} from '${normalizePath(item.path)}';`).join('\n');
}

function genExport(documents: IDocItem[]) {
  return `export const documents = {
  ${documents.map(item => item.name).join(',\n  ')}
};`
}

export function genSiteDesktopShared() {
  const dirs = readdirSync(SRC_DIR);
  const documents = resolveDocuments(dirs);
  const code = `${genImports(documents)}
${genExport(documents)}
`;
  smartOutputFile(SITE_DESKTOP_SHARED_FILE, code);
}
