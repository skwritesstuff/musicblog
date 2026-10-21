import { cp, rm, stat } from 'node:fs/promises';

// Cloudflare's configured output may be `Out`. On case-insensitive filesystems
// that is already the same directory as Next's `out`; never delete it.
const source = await stat('out');
const target = await stat('Out').catch((error) => {
  if (error.code !== 'ENOENT') throw error;
  return null;
});
if (!target || source.ino !== target.ino || source.dev !== target.dev) {
  await rm('Out', { recursive: true, force: true });
  await cp('out', 'Out', { recursive: true });
}
