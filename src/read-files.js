// @flow

import yaml from 'js-yaml';
import fs from 'fs';

export default {
  '.json': (filePath: string) => JSON.parse(fs.readFileSync(filePath).toString()),
  '.yaml': (filePath: string) => yaml.safeLoad(fs.readFileSync(filePath).toString()),
};
