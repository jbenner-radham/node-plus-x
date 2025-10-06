#!/usr/bin/env node

import pkg from '../package.json' with { type: 'json' };
import { makeExecutable } from './index.js';
import meow from 'meow';
import path from 'node:path';
import process from 'node:process';

const cli = meow(`
  Usage
    $ ${pkg.name} <FILE>

  Options
    --help, -h     Display this message.
    --version, -v  Display the application version.
`, {
  importMeta: import.meta,
  flags: {
    help: {
      type: 'boolean',
      shortFlag: 'h'
    },
    version: {
      type: 'boolean',
      shortFlag: 'v'
    }
  }
});

if (cli.input.length !== 1) {
  cli.showHelp();
}

const filepath = path.resolve(cli.input.at(0)!);

try {
  await makeExecutable(filepath);
} catch (error) {
  console.error(error);
  process.exit(1);
}
