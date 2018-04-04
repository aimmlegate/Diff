// @flow

import _ from 'lodash';
import parse from './parsers';
import readFile from './read-file';

const getDiffLine = (prefix: string, key: string, val: string) => `${prefix} ${key}: ${val}`;

const createString = (before: Object, after: Object) => {
  const unionKeys = _.union(_.keys(before), _.keys(after));
  const result = unionKeys.reduce((acc, key) => {
    if (!_.has(before, key)) {
      return `${acc}\n ${getDiffLine('+', key, after[key])}`;
    }
    if (!_.has(after, key)) {
      return `${acc}\n ${getDiffLine('-', key, before[key])}`;
    }
    if (after[key] === before[key]) {
      return `${acc}\n ${getDiffLine(' ', key, after[key])}`;
    }
    if (!(after[key] === before[key])) {
      const doubleStr = `${getDiffLine('+', key, after[key])}\n ${getDiffLine('-', key, before[key])}`;
      return `${acc}\n ${doubleStr}`;
    }
    return '';
  }, '');
  return `{${result}\n}`;
};

export default (path1: string, path2: string) => {
  const beforeFile = readFile(path1);
  const afterFile = readFile(path2);
  const before = parse(beforeFile.ext)(beforeFile.data);
  const after = parse(afterFile.ext)(afterFile.data);
  return createString(before, after);
};

