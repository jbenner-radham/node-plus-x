import { makeExecutable, makeExecutableSync } from '../src/index.js';
import { isExecutable, isExecutableSync } from '@radham/is-x';
import fs from 'node:fs';
import { open } from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';
import { rimraf } from 'rimraf';
import { temporaryWrite } from 'tempy';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('makeExecutable', () => {
  let file: FileHandle;
  let filepath: string;

  beforeEach(async () => {
    filepath = await temporaryWrite('#!/usr/bin/env node');
    file = await open(filepath);
  });

  afterEach(async () => {
    await file?.close();
    await rimraf(filepath);
  });

  it('is a function', () => {
    expect(makeExecutable).toBeTypeOf('function');
  });

  it('resolves to be undefined', async () => {
    await expect(makeExecutable(filepath)).resolves.toBeUndefined();
  });

  it('makes a read only file executable for all', async () => {
    await file.chmod(0o444);
    await makeExecutable(filepath);

    await expect(isExecutable(filepath)).resolves.toBe(true);
  });

  it('makes a 554 file executable for all', async () => {
    await file.chmod(0o554);
    await makeExecutable(filepath);

    await expect(isExecutable(filepath)).resolves.toBe(true);
  });

  it('retains the permissions on a file which is executable for all', async () => {
    await file.chmod(0o777);
    await makeExecutable(filepath);

    await expect(isExecutable(filepath)).resolves.toBe(true);
  });
});

describe('makeExecutableSync', () => {
  let filepath: string;

  beforeEach(async () => {
    filepath = await temporaryWrite('#!/usr/bin/env node');
  });

  afterEach(async () => {
    await rimraf(filepath);
  });

  it('is a function', () => {
    expect(makeExecutableSync).toBeTypeOf('function');
  });

  it('returns undefined', () => {
    expect(makeExecutableSync(filepath)).toBeUndefined();
  });

  it('makes a read only file executable for all', () => {
    fs.chmodSync(filepath, 0o444);
    makeExecutableSync(filepath);

    expect(isExecutableSync(filepath)).toBe(true);
  });

  it('makes a 554 file executable for all', () => {
    fs.chmodSync(filepath, 0o554);
    makeExecutableSync(filepath);

    expect(isExecutableSync(filepath)).toBe(true);
  });

  it('retains the permissions on a file which is executable for all', () => {
    fs.chmodSync(filepath, 0o777);
    makeExecutableSync(filepath);

    expect(isExecutableSync(filepath)).toBe(true);
  });
});
