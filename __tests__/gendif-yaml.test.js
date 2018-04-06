import fs from 'fs';
import gendif from '../src';

test('plain-yaml', () => {
  const expected = '__tests__/__fixtures__/result-plain.txt';
  const received = gendif('__tests__/__fixtures__/yml/before-plain.yaml', '__tests__/__fixtures__/yml/after-plain.yaml');
  expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
});

test('yaml', () => {
  const expected = '__tests__/__fixtures__/result.txt';
  const received = gendif('__tests__/__fixtures__/yml/before.yaml', '__tests__/__fixtures__/yml/after.yaml');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});

test('yaml-render-plain', () => {
  const expected = '__tests__/__fixtures__/result-render-plain.txt';
  const received = gendif('__tests__/__fixtures__/yml/before.yaml', '__tests__/__fixtures__/yml/after.yaml', 'plain');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});
