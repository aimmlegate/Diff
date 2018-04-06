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

const infoChar = { add: '+', remov: '-', none: ' ' };

const createLine = (val, deep = ' ') => {
  if (!_.isObject(val)) return val;
  const keys = _.keys(val);
  const values = keys.map(key =>
    `${deep.repeat(2)}${infoChar.none}${key}: ${val[key]}`).join('\n');
  return `{\n${values}\n}`;
};

const renderAst = (ast, deps = ' ') => {
  const selectLine = {
    added: node => [`${deps}${infoChar.add} ${node.key}: ${createLine(node.value, deps)}`],
    deleted: node => [`${deps}${infoChar.remov} ${node.key}: ${createLine(node.value, deps)}`],
    update: node => [
      `${deps}${infoChar.add} ${node.key}: ${createLine(node.value, deps)}`,
      `${deps}${infoChar.remov} ${node.key}: ${createLine(node.oldValue, deps)}`,
    ],
    unchanged: node => [`${deps}${infoChar.none} ${node.key}: ${createLine(node.children, deps)}`],
    nested: node => [`${deps}${infoChar.none} ${node.key}: ${renderAst(node.children, deps.repeat(2))}`],
  };
  const result = ast.reduce((acc, node) => {
    return [...acc, selectLine[node.type](node)];
  }, []);
  return `{\n${_.flatten(result).join('\n')}\n}`;
};

export default (path1: string, path2: string) => {
  const confBeforeFile = readFile(path1);
  const confAfterFile = readFile(path2);
  const before = getParse(confBeforeFile.ext)(confBeforeFile.data);
  const after = getParse(confAfterFile.ext)(confAfterFile.data);
  //console.log(JSON.stringify(buildAst(before, after)));
  console.log(renderAst(buildAst(before, after)));  
};

