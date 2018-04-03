// @flow

const getDiffLine = (prefix: string, key: string, val: string) => `${prefix} ${key}: ${val}`;

export default (jointObj: Object) => {
  const keys = Object.keys(jointObj);
  const result = keys.reduce((acc, key) => {
    if (jointObj[key].oldValue === null) {
      return `${acc}\n ${getDiffLine('+', key, jointObj[key].newValue)}`;
    }
    if (jointObj[key].newValue === null) {
      return `${acc}\n ${getDiffLine('-', key, jointObj[key].oldValue)}`;
    }
    if (jointObj[key].newValue === jointObj[key].oldValue) {
      return `${acc}\n ${getDiffLine(' ', key, jointObj[key].newValue)}`;
    }
    if (!(jointObj[key].newValue === jointObj[key].oldValue)) {
      const doubleStr = `${getDiffLine('+', key, jointObj[key].newValue)}\n ${getDiffLine('-', key, jointObj[key].oldValue)}`;
      return `${acc}\n ${doubleStr}`;
    }
    return '';
  }, '');
  return `{${result}\n}`;
};
