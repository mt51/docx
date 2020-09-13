export type NodeEnv = 'production' | 'development';

export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value;
}
