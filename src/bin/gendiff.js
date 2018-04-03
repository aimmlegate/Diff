#!/usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';
import gendif from '../index';

commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .action((firstConfig, secondConfig) => console.log(gendif(firstConfig, secondConfig)))
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

