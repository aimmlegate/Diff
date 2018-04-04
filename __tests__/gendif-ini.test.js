import fs from 'fs';
import gendif from '../src';


test('plain-ini', () => {
  const expected = '__tests__/__fixtures__/result-plain.txt';
  const received = gendif('__tests__/__fixtures__/before-plain.ini', '__tests__/__fixtures__/after-plain.ini');
  expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
});
