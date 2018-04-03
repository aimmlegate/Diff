// @flow

import fs from 'fs';
import _ from 'lodash';

const getDiffLine = (prefix: string, key: string, val: string) => `${prefix} ${key}: ${val}`;

const parse = (jointObj: Object) => {
  const keys = Object.keys(jointObj);
  const result = keys.reduce((acc, key) => {
    if (jointObj[key].oldValue === null) {
      return `${acc}\n ${getDiffLine('+', key, jointObj[key].newValue)}`;
    }
    if (jointObj[key].newValue === null) {
      return `${acc}\n ${getDiffLine('-', key, jointObj[key].oldValue)}`;
    }
    if (jointObj[key].newValue === jointObj[key].oldValue) {
      return `${acc}\n ${getDiffLine(' ', key, jointObj[key].newValue)}`;
    }
    if (!(jointObj[key].newValue === jointObj[key].oldValue)) {
      const doubleStr = `${getDiffLine('+', key, jointObj[key].newValue)}\n ${getDiffLine('-', key, jointObj[key].oldValue)}`;
      return `${acc}\n ${doubleStr}`;
    }
    return '';
  }, '');
  return `{${result}\n}`;
};

export default (pathToFile1: any, pathToFile2: any) => {
  const after = JSON.parse(fs.readFileSync(pathToFile1).toString());
  const before = JSON.parse(fs.readFileSync(pathToFile2).toString());
  const oldKeys = Object.keys(before);
  const newKeys = Object.keys(after);
  const uniqKeys = new Set([...oldKeys, ...newKeys]);
  const jointObj = [...uniqKeys].reduce((acc, key) => {
    const inner = {
      oldValue: (_.has(after, key)) ? after[key] : null,
      newValue: (_.has(before, key)) ? before[key] : null,
    };
    return { ...acc, [key]: inner };
  }, {});
  return parse(jointObj);
};

