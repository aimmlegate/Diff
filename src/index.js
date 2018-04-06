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

const infoChar = { add: ' + ', remov: ' - ', none: '   ' };

const genSpace = spaces => ' '.repeat(spaces);

const renderObj = (val, localDeep) => {
  if (!_.isObject(val)) return val;
  const keys = _.keys(val);
  const values = keys.map(key =>
    `${localDeep}${infoChar.none}${key}: ${val[key]}`).join('\n');
  return `{\n${values}\n${localDeep}}`;
};

const renderAst = (ast, deep = '') => {
  const moreDeep = deep + genSpace(4);
  const selectLine = {
    nested: node =>
      [
        `${deep}${infoChar.none}${node.key}: {`,
        `${renderAst(node.children, moreDeep)}\n${deep}${infoChar.none}}`,
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
  const resultArray = ast.reduce((acc, el) => [...acc, selectLine[el.type](el)], []);
  return `${_.flatten(resultArray).join('\n')}`;
};

const finalRender = render => `{\n${render}\n}`;

export default (path1, path2) => {
  const confBeforeFile = readFile(path1);
  const confAfterFile = readFile(path2);
  const before = getParse(confBeforeFile.ext)(confBeforeFile.data);
  const after = getParse(confAfterFile.ext)(confAfterFile.data);
  const preRender = renderAst(buildAst(before, after));

  return finalRender(preRender);
};
