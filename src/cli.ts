#!/usr/bin/env node

import { makeExecutable } from './index.js';
import meow from 'meow';
import path from 'node:path';
import process from 'node:process';

const cli = meow(`
  Make a file executable. A portable \`chmod +x\` equivalent.

  Usage
    $ plus-x <FILE> [ADDITIONAL FILES...]

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

if (cli.input.length === 0) {
  cli.showHelp();
}

const filepaths = cli.input.map(filepath => path.resolve(filepath));

try {
  await Promise.all(filepaths.map(filepath => makeExecutable(filepath)));
} catch (error) {
  console.error(error);
  process.exit(1);
}
