import fs, { constants } from 'node:fs';
import { open } from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';

export async function makeExecutable(filepath: string): Promise<void> {
  let file: FileHandle;

  try {
    file = await open(filepath, 'r');
    const stats = await file.stat();
    const [owner, group, other] = [...stats.mode.toString(8).slice(-3)].map(Number);
    const permissions: Record<string, number> = { owner: owner!, group: group!, other: other! };

    Object.entries(permissions).forEach(([permission, value]) => {
      if ([0, 4, 6].includes(value)) {
        permissions[permission]! += 1;
      }
    });

    await file.chmod(Number(`0o${permissions.owner}${permissions.group}${permissions.other}`));
  } catch (error) {
    console.error(error);
  } finally {
    // @ts-expect-error File is defined if the try block is executed.
    file?.close();
  }
}

export function makeExecutableSync(filepath: string): void {
  try {
    const stats = fs.statSync(filepath);
    const mode = stats.mode | constants.S_IXUSR | constants.S_IXGRP | constants.S_IXOTH;

    fs.chmodSync(filepath, mode);
  } catch (error) {
    console.error(error);
  }
}
