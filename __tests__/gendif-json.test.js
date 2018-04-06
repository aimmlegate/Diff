import fs from 'fs';
import gendif from '../src';

test('plain-json', () => {
  const expected = '__tests__/__fixtures__/result-plain.txt';
  const received = gendif('__tests__/__fixtures__/json/before-plain.json', '__tests__/__fixtures__/json/after-plain.json');
  expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
});


test('json', () => {
  const expected = '__tests__/__fixtures__/result.txt';
  const received = gendif('__tests__/__fixtures__/json/before.json', '__tests__/__fixtures__/json/after.json');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});

test('json-render-plain', () => {
  const expected = '__tests__/__fixtures__/result-render-plain.txt';
  const received = gendif('__tests__/__fixtures__/json/before.json', '__tests__/__fixtures__/json/after.json', 'plain');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});
