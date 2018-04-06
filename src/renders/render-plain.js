import _ from 'lodash';

const render = (ast, name = '') => {
  const getStrGen = {
    added: (node) => {
      const valueStr = (_.isObject(node.value)) ? 'with complex value' : `with value: '${node.value}'`;
      return `Property ${name}${node.key} was added ${valueStr}`;
    },
    deleted: node => `Property ${name}${node.key} was removed`,
    updated: (node) => {
      const valueStr = (_.isObject(node.value)) ? 'complex value' : `'${node.value}'`;
      const valueOldStr = (_.isObject(node.oldValue)) ? 'From complex value' : `From: '${node.oldValue}'`;
      return `Property ${name}${node.key} was updated. ${valueOldStr} to ${valueStr}`;
    },
    nested: node => render(node.children, `${node.key}.`),
    unchanged: () => '',
  };
  const resultArray = ast.reduce((acc, el) => [...acc, getStrGen[el.type](el)], []);
  return `${_.flatten(resultArray).filter(el => (!(el === ''))).join('\n')}`;
};

export default diff => render(diff);
