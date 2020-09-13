import { existsSync, readFileSync, outputFileSync } from 'fs-extra';

const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;

export function camelize(str: string) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function pascalize(str: string) {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  );
}

export function normalizePath(path: string) {
  return path.replace(/\\/g, '/');
}

export function decamelize(str: string, sep = '-') {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
    .toLowerCase();
}

export function smartOutputFile(filePath: string, content: string) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8');

    if (previousContent === content) {
      return;
    }
  }

  outputFileSync(filePath, content);
}

export function removeExt(path: string) {
  return path.replace('.tsx', '');
}

export function isDev() {
  return process.env.NODE_ENV === 'development';
}
