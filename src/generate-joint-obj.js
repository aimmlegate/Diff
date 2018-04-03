// @flow

import _ from 'lodash';

export default (before: object, after: object) => {
  const oldKeys = Object.keys(before);
  const newKeys = Object.keys(after);
  const uniqKeys = new Set([...oldKeys, ...newKeys]);
  const jointObj = [...uniqKeys].reduce((acc, key) => {
    const inner = {
      oldValue: (_.has(before, key)) ? before[key] : null,
      newValue: (_.has(after, key)) ? after[key] : null,
    };
    return { ...acc, [key]: inner };
  }, {});
  return jointObj;
};
