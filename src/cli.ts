#!/usr/bin/env node

import { makeExecutable } from './index.js';
import chalk from 'chalk';
import { glob } from 'glob';
import logSymbols from 'log-symbols';
import meow from 'meow';
import process from 'node:process';

const cli = meow(`
  Make a file executable. A portable ${chalk.bold('chmod +x')} equivalent.

  Usage
    $ plus-x <FILE> [ADDITIONAL FILES...]

  Options
    --exclude, -e  File or glob to exclude. Can be specified multiple times.
    --help, -h     Display this message.
    --version, -v  Display the application version.
`, {
  importMeta: import.meta,
  flags: {
    exclude: {
      isMultiple: true,
      type: 'string',
      shortFlag: 'e'
    },
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
  const ignore = cli.flags.exclude!;
  const filepaths = await glob(cli.input, { ignore });

  if (!filepaths.length) {
    throw new Error('No matching file paths found.');
  }

  await Promise.all(filepaths.map(filepath => makeExecutable(filepath)));
} catch (error) {
  console.error(logSymbols.error, error instanceof Error ? error.message : error);
  process.exit(1);
}
