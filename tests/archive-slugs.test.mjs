import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../lib/slugs.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { decodeArchiveSlug } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const posts = JSON.parse(readFileSync(new URL('../src/data/archivePosts.json', import.meta.url)));
test('every catalog slug resolves from an encoded URL, including dashes and curly quotes', () => {
  for (const post of posts) {
    assert.equal(decodeArchiveSlug(encodeURIComponent(post.slug)), post.slug);
    assert.equal(decodeArchiveSlug(post.slug), post.slug);
  }
});
test('malformed URI parameters do not crash record lookup', () => {
  assert.equal(decodeArchiveSlug('%E2%80'), undefined);
});
