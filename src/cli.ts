#!/usr/bin/env node

import { makeExecutable } from './index.js';
import { glob } from 'glob';
import logSymbols from 'log-symbols';
import meow from 'meow';
import { type Flags, getHelpTextAndOptions } from 'meowtastic';
import process from 'node:process';

const flags: Flags = {
  exclude: {
    description: 'File or glob to exclude. Can be specified multiple times.',
    isMultiple: true,
    type: 'string',
    shortFlag: 'e'
  }
};

const cli = meow(
  ...getHelpTextAndOptions({
    arguments: [{ name: 'FILE', required: true }, { name: 'ADDITIONAL FILES...' }],
    flags,
    importMeta: import.meta
  })
);

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
