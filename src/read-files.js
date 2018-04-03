// @flow

import yaml from 'js-yaml';
import fs from 'fs';

export default {
  '.json': filePath => JSON.parse(fs.readFileSync(filePath).toString()),
  '.yaml': filePath => yaml.safeLoad(fs.readFileSync(filePath).toString()),
};
