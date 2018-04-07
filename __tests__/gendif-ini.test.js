import fs from 'fs';
import gendif from '../src';

test('plain-file-ini', () => {
  const expected = '__tests__/__fixtures__/result-plain.txt';
  const received = gendif('__tests__/__fixtures__/ini/before-plain.ini', '__tests__/__fixtures__/ini/after-plain.ini');
  expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
});

test('ini', () => {
  const expected = '__tests__/__fixtures__/result.txt';
  const received = gendif('__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});

test('plain-render-ini', () => {
  const expected = '__tests__/__fixtures__/result-render-plain.txt';
  const received = gendif('__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini', 'plain');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});

test('json-render-ini', () => {
  const expected = '__tests__/__fixtures__/result-json.txt';
  const received = gendif('__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini', 'json');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});
