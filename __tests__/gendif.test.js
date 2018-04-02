import fs from 'fs';
import gendif from '../src';


test('half', () => {
  const expected = '__tests__/__fixtures__/result.txt';
  const received = gendif('/mnt/o/learn/hexlet/before.json', '/mnt/o/learn/hexlet/after.json');
  expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
});
