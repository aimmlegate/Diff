import fs from 'fs';
import gendif from '../src';


test('plain', () => {
  const expected = '__tests__/__fixtures__/result-plain.txt';
  const received = gendif('__tests__/__fixtures__/after-plain.json', '__tests__/__fixtures__/before-plain.json');
  expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
});
