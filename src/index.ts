#!/usr/bin/env node
import { command, parse, version } from 'commander';
// @ts-ignore
import packageJson from '../package.json';

import { dev } from './command/dev';

version(`docx ${packageJson.version}`);

process.env.DOCX_VERSION = packageJson.version;

command('dev').description('Run webpack dev server').action(dev);

parse();
