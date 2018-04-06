
import fs from 'fs';
import path from 'path';
import ini from 'ini';
import { safeLoad } from 'js-yaml';
import buildDiff from './buid-diff';
import { renderTree, renderPlain } from './renders';

const readFile = (filePatch) => {
  const data = fs.readFileSync(filePatch).toString();
  const ext = path.extname(filePatch);
  return { data, ext };
};

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
  '.ini': ini.parse,
};

const getParse = format => (data) => {
  const parse = parsers[format];
  if (!parse) {
    throw new Error(`unkown format: ${format}`);
  }
  return parse(data);
};


export default (path1, path2, output = 'tree') => {
  const confBeforeFile = readFile(path1);
  const confAfterFile = readFile(path2);
  const before = getParse(confBeforeFile.ext)(confBeforeFile.data);
  const after = getParse(confAfterFile.ext)(confAfterFile.data);
  const diff = buildDiff(before, after);
  if (output === 'plain') return renderPlain(diff);
  return renderTree(diff);
};
