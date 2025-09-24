import { promises as fs } from 'fs';
import * as path from 'path';

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function removeFile(filePath: string): Promise<void> {
  try {
    const absolutePath = path.resolve(filePath);
    await fs.unlink(absolutePath);
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 'ENOENT') {
      console.warn(`File not found: ${filePath}`);
      return;
    }
    throw error;
  }
}
