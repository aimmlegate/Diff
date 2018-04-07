// @flow

import _ from 'lodash';

const buildAst = (before: Object, after: Object) => {
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

export default buildAst;
