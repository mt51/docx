#!/usr/bin/env node
import { command, parse, version } from 'commander';
// @ts-ignore
import packageJson from '../package.json';
import { dev } from './command/dev';
import { build } from './command/build';
import { deploy } from './command/deploy';

version(`docx ${packageJson.version}`);

process.env.DOCX_VERSION = packageJson.version;

command('dev').description('Run webpack dev server').action(dev);

command('build').description('Compile site in production mode').action(build);

command('deploy').description('Deploy site by gh-page').action(deploy);

parse();
