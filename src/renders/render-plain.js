// @flow
import _ from 'lodash';

const render = (ast: Object, name: string = '') => {
  const getStrGen = {
    added: (node: Object) => {
      const valueStr = (_.isObject(node.value)) ? 'with complex value' : `with value: '${node.value}'`;
      return `Property '${name}${node.key}' was added ${valueStr}`;
    },
    deleted: (node: Object) => `Property '${name}${node.key}' was removed`,
    updated: (node: Object) => {
      const valueStr = (_.isObject(node.newValue)) ? 'complex value' : `'${node.newValue}'`;
      const valueOldStr = (_.isObject(node.oldValue)) ? 'From complex value' : `From: '${node.oldValue}'`;
      return `Property '${name}${node.key}' was updated. ${valueOldStr} to ${valueStr}`;
    },
    nested: node => render(node.children, `${name}${node.key}.`),
  };
  const filterUnchange = (obj: Object) => obj.filter((node) => {
    if (node.type === 'nested') return filterUnchange(node.children);
    return !(node.type === 'unchanged');
  });
  const resultArray = filterUnchange(ast).map(el => [getStrGen[el.type](el)]);
  return `${_.flatten(resultArray).join('\n')}`;
};

export default (diff: Object) => render(diff);
