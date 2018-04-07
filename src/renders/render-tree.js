// @flow

import _ from 'lodash';

const infoChar = { add: ' + ', remov: ' - ', none: '   ' };

const genSpace = spaces => ' '.repeat(spaces);

const renderObj = (val: any, localDeep: string) => {
  if (!_.isObject(val)) return val;
  const keys = _.keys(val);
  const values = keys.map(key =>
    `${localDeep}${infoChar.none}${key}: ${val[key]}`).join('\n');
  return `{\n${values}\n${localDeep.slice(1)}}`;
};

const render = (ast: Object, deep: string = '') => {
  const moreDeep = deep + genSpace(4);
  const getStrGen = {
    nested: (node: Object) =>
      `${deep}${infoChar.none}${node.key}: {\n${render(node.children, moreDeep)}\n${deep}${infoChar.none}}`,
    added: (node: Object) =>
      `${deep}${infoChar.add}${node.key}: ${renderObj(node.value, moreDeep)}`,
    deleted: (node: Object) =>
      `${deep}${infoChar.remov}${node.key}: ${renderObj(node.value, moreDeep)}`,
    unchanged: (node: Object) =>
      `${deep}${infoChar.none}${node.key}: ${renderObj(node.value, moreDeep)}`,
    updated: (node: Object) => {
      const newStr = `${deep}${infoChar.add}${node.key}: ${renderObj(node.newValue, moreDeep)}`;
      const oldStr = `${deep}${infoChar.remov}${node.key}: ${renderObj(node.oldValue, moreDeep)}`;
      return `${newStr}\n${oldStr}`;
    },
  };
  const resultArray = ast.map(el => [getStrGen[el.type](el)]);
  return `${_.flatten(resultArray).join('\n')}`;
};

export default (diff: Object) => `{\n${render(diff)}\n}`;
