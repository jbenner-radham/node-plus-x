#!/usr/bin/env node

import { makeExecutable } from './index.js';
import { isExecutable } from '@radham/is-x';
import chalk from 'chalk';
import { glob } from 'glob';
import logSymbols from 'log-symbols';
import meow from 'meow';
import { getHelpTextAndOptions } from 'meowtastic';
import path from 'node:path';
import process from 'node:process';

// See: https://no-color.org/
const NO_COLOR = Boolean(process.env.NO_COLOR);

const cli = meow(
  ...getHelpTextAndOptions({
    arguments: [
      { name: 'FILE', isRequired: true },
      { name: 'ADDITIONAL FILES...' }
    ],
    flags: {
      exclude: {
        description: 'File or glob to exclude. Can be specified multiple times.',
        isMultiple: true,
        type: 'string',
        shortFlag: 'e'
      },
      verbose: {
        default: false,
        description: 'Display messages pertaining to each operation.',
        type: 'boolean',
        shortFlag: 'V'
      }
    },
    importMeta: import.meta
  })
);

if (cli.input.length === 0) {
  cli.showHelp();
}

try {
  const ignore = cli.flags.exclude as string[];
  const filepaths = await glob(cli.input, { ignore });
  const passthrough = (value: string) => value;
  const underline = NO_COLOR ? passthrough : chalk.underline;

  if (!filepaths.length) {
    throw new Error('No matching file paths found.');
  }

  await Promise.all(filepaths.map(async filepath => {
    const relativePath = path.relative(process.cwd(), filepath);

    if (await isExecutable(filepath)) {
      if (cli.flags.verbose) {
        console.log(logSymbols.info, `File ${underline(relativePath)} is already executable.`);
      }

      return;
    }

    await makeExecutable(filepath);

    if (cli.flags.verbose) {
      console.log(logSymbols.success, `File ${underline(relativePath)} is now executable.`);
    }
  }));
} catch (error) {
  console.error(logSymbols.error, error instanceof Error ? error.message : error);
  process.exit(1);
}
