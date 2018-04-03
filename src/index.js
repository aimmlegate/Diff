// @flow

import fs from 'fs';

const print = (prefix: string, key: string, val: string) => `${prefix} ${key}: ${val}`;

const parse = (ast: Object) => {
  const keys = Object.keys(ast);
  const result = keys.reduce((acc, key) => {
    if (ast[key].oldValue === null) {
      return `${acc}\n ${print('+', key, ast[key].newValue)}`;
    }
    if (ast[key].newValue === null) {
      return `${acc}\n ${print('-', key, ast[key].oldValue)}`;
    }
    if (ast[key].newValue === ast[key].oldValue) {
      return `${acc}\n ${print(' ', key, ast[key].newValue)}`;
    }
    if (!(ast[key].newValue === ast[key].oldValue)) {
      const doubleStr = `${print('+', key, ast[key].newValue)}\n ${print('-', key, ast[key].oldValue)}`;
      return `${acc}\n ${doubleStr}`;
    }
    return '';
  }, '');
  return `{${result}\n}`;
};

export default (pathToFile1: any, pathToFile2: any) => {
  const after = JSON.parse(fs.readFileSync(pathToFile1));
  const before = JSON.parse(fs.readFileSync(pathToFile2));
  const oldKeys = Object.keys(before);
  const newKeys = Object.keys(after);
  const metaKeys = new Set([...oldKeys, ...newKeys]);
  const ast = [...metaKeys].reduce((acc, key) => {
    const inner = { oldValue: (after[key]) || null, newValue: (before[key] || null) };
    return { ...acc, [key]: inner };
  }, {});
  console.log(parse(ast));
  return parse(ast);
};

