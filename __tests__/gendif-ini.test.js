import fs from 'fs';
import gendif from '../src';

test('plain-ini', () => {
  const expected = '__tests__/__fixtures__/result-plain.txt';
  const received = gendif('__tests__/__fixtures__/ini/before-plain.ini', '__tests__/__fixtures__/ini/after-plain.ini');
  expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
});

test('ini', () => {
  const expected = '__tests__/__fixtures__/result.txt';
  const received = gendif('__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini');
  expect(received).toEqual(fs.readFileSync(expected, 'utf-8'));
});
