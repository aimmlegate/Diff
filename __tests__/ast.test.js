import createAst from '../src/create-ast';


test('ast', () => {
  const expected = '__tests__/__fixtures__/result.txt';
  const received = createAst('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
  expect(received).toEqual(expected);
});
