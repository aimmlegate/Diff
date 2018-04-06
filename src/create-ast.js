// @flow

import _ from 'lodash';
import getParse from './parsers';
import readFile from './read-file';


const buildAst = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return { key, type: 'nested', children: buildAst(before[key], after[key]) };
    }
    if (!_.has(before, key)) {
      return { key, type: 'added', value: after[key] };
    }
    if (!_.has(after, key)) {
      return { key, type: 'deleted', value: before[key] };
    }
    if (before[key] === after[key]) {
      return { key, type: 'unchanged', value: before[key] };
    }
    return {
      key,
      type: 'updated',
      value: after[key],
      oldValue: before[key],
    };
  });
};


const createLine = (val, deep = ' ') => {
  if (!_.isObject(val)) return val;
  const keys = _.keys(val);
  const values = keys.map(key =>
    `${deep.repeat(2)}${infoChar.none}${key}: ${val[key]}`).join('\n');
  return `{\n${values}\n}`;
};

const renderObj = (val) => {
  if (!_.isObject(val)) return val;
  const keys = _.keys(val);
  return keys.map(key => `\n${key}: ${val[key]}`);
};

const infoChar = { add: '+', remov: '-', none: ' ' };

const parseAst = (ast, deep = ' ') => {
  const selectLine = {
    nested: node =>
      [
        `${deep}${infoChar.none} ${node.key}:`,
        `${parseAst(node.children, deep.repeat(2))}\n${deep}}`,
      ],
    added: node =>
      [`${deep}${infoChar.add} ${node.key}: ${renderObj(node.value)}`],
    deleted: node =>
      [`${deep}${infoChar.remov} ${node.key}: ${renderObj(node.value)}`],
    unchanged: node =>
      [`${deep}${infoChar.none} ${node.key}: ${renderObj(node.value)}`],
    updated: node =>
      [
        `${deep}${infoChar.remov} ${node.key}: ${renderObj(node.oldValue)}`,
        `${deep}${infoChar.add} ${node.key}: ${renderObj(node.value)}`,
      ],
  };
  const resultArray = ast.reduce((acc, el) => [...acc, selectLine[el.type](el)], []);
  return _.flatten(resultArray).join('\n');
};

export default (path1: string, path2: string) => {
  const confBeforeFile = readFile(path1);
  const confAfterFile = readFile(path2);
  const before = getParse(confBeforeFile.ext)(confBeforeFile.data);
  const after = getParse(confAfterFile.ext)(confAfterFile.data);
  console.log(parseAst(buildAst(before, after)));
};

