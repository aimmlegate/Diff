// @flow
import _ from 'lodash';

const render = (ast: Object, name: string = '') => {
  const getStrGen = {
    added: (node: Object) => {
      const valueStr = (_.isObject(node.value)) ? 'with complex value' : `with value: '${node.value}'`;
      return `Property ${name}${node.key} was added ${valueStr}`;
    },
    deleted: (node: Object) => `Property ${name}${node.key} was removed`,
    updated: (node: Object) => {
      const valueStr = (_.isObject(node.value)) ? 'complex value' : `'${node.value}'`;
      const valueOldStr = (_.isObject(node.oldValue)) ? 'From complex value' : `From: '${node.oldValue}'`;
      return `Property ${name}${node.key} was updated. ${valueOldStr} to ${valueStr}`;
    },
    nested: node => render(node.children, `${name}${node.key}.`),
    unchanged: () => '',
  };
  const resultArray = ast.reduce((acc, el) => [...acc, getStrGen[el.type](el)], []);
  return `${_.flatten(resultArray).filter(el => (!(el === ''))).join('\n')}`;
};

export default (diff: Object) => render(diff);
