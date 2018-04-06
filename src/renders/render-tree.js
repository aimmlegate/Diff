import _ from 'lodash';

const infoChar = { add: ' + ', remov: ' - ', none: '   ' };

const genSpace = spaces => ' '.repeat(spaces);

const renderObj = (val, localDeep) => {
  if (!_.isObject(val)) return val;
  const keys = _.keys(val);
  const values = keys.map(key =>
    `${localDeep}${infoChar.none}${key}: ${val[key]}`).join('\n');
  return `{\n${values}\n${localDeep}}`;
};

const render = (ast, deep = '') => {
  const moreDeep = deep + genSpace(4);
  const getStrGen = {
    nested: node =>
      [
        `${deep}${infoChar.none}${node.key}: {`,
        `${render(node.children, moreDeep)}\n${deep}${infoChar.none}}`,
      ],
    added: node =>
      [`${deep}${infoChar.add}${node.key}: ${renderObj(node.value, moreDeep)}`],
    deleted: node =>
      [`${deep}${infoChar.remov}${node.key}: ${renderObj(node.value, moreDeep)}`],
    unchanged: node =>
      [`${deep}${infoChar.none}${node.key}: ${renderObj(node.value, moreDeep)}`],
    updated: node =>
      [
        `${deep}${infoChar.add}${node.key}: ${renderObj(node.value, moreDeep)}`,
        `${deep}${infoChar.remov}${node.key}: ${renderObj(node.oldValue, moreDeep)}`,
      ],
  };
  const resultArray = ast.reduce((acc, el) => [...acc, getStrGen[el.type](el)], []);
  return `${_.flatten(resultArray).join('\n')}`;
};

export default diff => `{\n${render(diff)}\n}`;
