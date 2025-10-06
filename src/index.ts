import fs, { constants } from 'node:fs';
import { open } from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';

export async function makeExecutable(filepath: string): Promise<void> {
  let file: FileHandle;

  try {
    file = await open(filepath);
    const stats = await file.stat();
    const mode = stats.mode | constants.S_IXUSR | constants.S_IXGRP | constants.S_IXOTH;

    await file.chmod(mode);
  } finally {
    // @ts-expect-error File is defined if the try block is executed.
    file?.close();
  }
}

export function makeExecutableSync(filepath: string): void {
  const stats = fs.statSync(filepath);
  const mode = stats.mode | constants.S_IXUSR | constants.S_IXGRP | constants.S_IXOTH;

  fs.chmodSync(filepath, mode);
}
