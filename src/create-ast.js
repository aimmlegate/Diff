// @flow

import _ from 'lodash';
import getParse from './parsers';
import readFile from './read-file';


const buildAst = (before, after) => {
  const build = (bef, aft) => {
    const keys = _.union(_.keys(bef), _.keys(aft));
    return keys.reduce((acc, key) => {
      if (!(_.isObject(bef[key]) && _.isObject(aft[key]))) {
        const node = {
          key,
          value: (_.has(aft, key)) ? aft[key] : null,
          oldValue: (_.has(bef, key)) ? bef[key] : null,
          children: [],
        };
        return [...acc, node];
      }
      const node = {
        key,
        value: null,
        oldValue: null,
        children: build(bef[key], aft[key]),
      };
      return [...acc, node];
    }, []);
  };
  return build(before, after);
};

const parseAst = (ast) => {
  const parseNode = (node, str = '') => {
    if (node.children.length === 0) {
      if (node.value === node.oldValue) {
        return `${str}\n${node.key}:${node.value}`;
      }
      if (node.value === null) {
        return `${str}\n - ${node.key}:${node.oldValue}`;
      }
      if (node.oldValue === null) {
        return `${str}\n + ${node.key}:${node.value}`;
      }
      return `${str}\n + ${node.key}:${node.value}\n - ${node.key}:${node.oldValue}`;
    }
    return node.children.reduce((acc, el) => (`${acc} ${parseNode(el)}`), str);
  };
  return ast.reduce((acc, el) => (`${acc} ${parseNode(el, acc)}`), '');
};

export default (path1: string, path2: string) => {
  const confBeforeFile = readFile(path1);
  const confAfterFile = readFile(path2);
  const before = getParse(confBeforeFile.ext)(confBeforeFile.data);
  const after = getParse(confAfterFile.ext)(confAfterFile.data);
  return parseAst(buildAst(before, after));
};

