import { docxConfigsPath } from './constant';

export type NodeEnv = 'production' | 'development';

export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value;
}


export function getDocxConfig() {
  return require(docxConfigsPath);
}
