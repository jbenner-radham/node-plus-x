#!/usr/bin/env node

import { makeExecutable } from './index.js';
import { glob } from 'glob';
import meow from 'meow';
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

try {
  const filepaths = await glob(cli.input);

  await Promise.all(filepaths.map(filepath => makeExecutable(filepath)));
} catch (error) {
  console.error(error);
  process.exit(1);
}
