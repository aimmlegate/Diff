// @flow
import path from 'path';
import getResult from './generate-result';
import getJointObj from './generate-joint-obj';
import readFile from './read-files';


export default (path1: string, path2: string) => {
  const beforeExt = path.extname(path1);
  const afterExt = path.extname(path2);
  const before = readFile[beforeExt](path1);
  const after = readFile[afterExt](path2);
  return getResult(getJointObj(before, after));
};
