import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Exercise the production filter functions without introducing a test runtime.
const source = readFileSync(new URL('../lib/archiveFilters.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { EMPTY_FILTERS, readFilters, filtersUrl, filterArchive } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const originals = JSON.parse(readFileSync(new URL('../src/data/archivePosts.json', import.meta.url)));
const notes = JSON.parse(readFileSync(new URL('../src/data/catalogAnnotations.json', import.meta.url)));
const posts = originals.map(post => ({ ...post, artists: notes[post.slug]?.artists ?? post.artists, discoveryGenres: notes[post.slug]?.genres ?? [post.genre] }));
const genres = [...new Set(posts.flatMap(post => post.discoveryGenres))];

test('the recovery corpus keeps its original scope', () => {
  assert.equal(originals.length, 360);
  assert.equal(new Set(originals.map(post => post.slug)).size, 360);
  assert.deepEqual([2009, 2010, 2011, 2012].map(year => originals.filter(post => post.year === year).length), [8, 45, 305, 2]);
  assert.ok(originals.every(post => post.date >= '2009-08' && post.date <= '2012-01'));
  assert.ok(Object.keys(notes).every(slug => originals.some(post => post.slug === slug)));
});

test('shared filter URLs preserve punctuation and reject unsupported categories', () => {
  const filters = { year: '2011', genre: 'R&B / Soul', query: 'A$AP & Curren$y', artist: 'Tyler, The Creator' };
  assert.deepEqual(readFilters(new URL(filtersUrl(filters), 'https://shameis.com').search, genres), filters);
  assert.deepEqual(readFilters('?year=2030&genre=unknown', genres), EMPTY_FILTERS);
});

test('R&B discovers Frank Ocean and The Weeknd without changing original categories', () => {
  const results = filterArchive(posts, { ...EMPTY_FILTERS, genre: 'R&B / Soul' });
  assert.ok(results.some(post => post.artists.includes('Frank Ocean')));
  assert.ok(results.some(post => post.artists.includes('The Weeknd')));
  assert.ok(results.every(post => post.category === originals.find(original => original.slug === post.slug).category));
});

test('artist links exactly match records and include title-based additions', () => {
  assert.ok(filterArchive(posts, { ...EMPTY_FILTERS, artist: 'Shwayze' }).some(post => post.slug === 'shwayze-let-it-beat-review'));
  assert.equal(filterArchive(posts, { ...EMPTY_FILTERS, artist: 'Miller' }).length, 0);
  assert.ok(filterArchive(posts, { ...EMPTY_FILTERS, artist: 'Mac Miller' }).length > 0);
  assert.ok(!posts.some(post => post.artists.includes('The Creator')));
  assert.deepEqual(posts.find(post => post.slug === 'iawt-current-rotation-updated-daily').artists, []);
});

test('year, genre, artist, and search compose and allow an honest empty result', () => {
  assert.ok(filterArchive(posts, { ...EMPTY_FILTERS, query: 'MAC MILLER' }).length > 0);
  assert.equal(filterArchive(posts, { ...EMPTY_FILTERS, year: '2009', artist: 'Frank Ocean', genre: 'R&B / Soul' }).length, 0);
  const fixture = [{ title: 'Beyoncé – Déjà Vu', artists: ['Beyoncé'], year: 2011, genre: 'R&B / Soul' }];
  assert.equal(filterArchive(fixture, { ...EMPTY_FILTERS, query: 'beyonce' }).length, 1);
});
