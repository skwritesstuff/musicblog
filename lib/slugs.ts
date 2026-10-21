/** Next's static export can supply percent-encoded route params. */
export function decodeArchiveSlug(slug: string): string | undefined {
  try { return decodeURIComponent(slug); }
  catch { return undefined; }
}
