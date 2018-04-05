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
    return { key, type: 'updated', value: after[key], oldValue: before[key] };
  });
};

const stringify = val => JSON.stringify(val);


const parseAst = (ast) => {
  const parseNode = (node, deep = ' ') => {
    if (node.children.length === 0) {
      if (node.value === node.oldValue) {
        return `${deep}   ${node.key}: ${stringify(node.value)}\n`;
      }
      if (node.value === null) {
        return `${deep} - ${node.key}: ${stringify(node.oldValue)}\n`;
      }
      if (node.oldValue === null) {
        return `${deep} + ${node.key}: ${stringify(node.value)}\n`;
      }
      return `${deep} + ${node.key}: ${stringify(node.value)}\n${deep} - ${node.key}: ${stringify(node.oldValue)}\n`;
    }
    return node.children.reduce((acc, el) => (`${acc}\n ${parseNode(el, deep.repeat(2))}`), '');
  };
  return ast.reduce((acc, el) => (`${el.key}: ${parseNode(el, acc)}`), '');
};

export default (path1: string, path2: string) => {
  const confBeforeFile = readFile(path1);
  const confAfterFile = readFile(path2);
  const before = getParse(confBeforeFile.ext)(confBeforeFile.data);
  const after = getParse(confAfterFile.ext)(confAfterFile.data);
  console.log(stringify(buildAst(before, after)));
  return parseAst(buildAst(before, after));
};

