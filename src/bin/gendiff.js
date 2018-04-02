#!/usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';

commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

