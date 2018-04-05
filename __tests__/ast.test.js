import createAst from '../src/create-ast';


test('ast', () => {
  const expected = [
    {
      key: 'common',
      value: null,
      oldValue: null,
      children: [
        {
          key: 'setting1',
          value: 'Value 1',
          oldValue: 'Value 1',
          children: [],
        },
        {
          key: 'setting2',
          value: null,
          oldValue: '200',
          children: [],
        },
        {
          key: 'setting3',
          value: {
            key: 'value',
          },
          oldValue: true,
          children: [],
        },
        {
          key: 'setting6',
          value: null,
          oldValue: null,
          children: [
            {
              key: 'value',
              change: false,
              value: 'value',
              oldValue: null,
              children: [],
            },
            {
              key: 'ops',
              value: 'vops',
              oldValue: null,
              children: [],
            },
          ],
        },
        {
          key: 'setting4',
          value: 'blah blah',
          oldValuse: null,
          children: [],
        },
        {
          key: 'setting5',
          value: {
            key5: 'value',
          },
          oldValuse: null,
          children: [],
        },
      ],
    },
    {
      key: 'group2',
      value: null,
      oldValue: {
        abc: '12345',
      },
      children: [],
    },
  ];
  const received = createAst('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
  expect(received).toEqual(expected);
});
