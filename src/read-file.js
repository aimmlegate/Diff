// @flow

import fs from 'fs';
import path from 'path';

export default (filePatch: string) => {
  const data = fs.readFileSync(filePatch).toString();
  const ext = path.extname(filePatch);
  return { data, ext };
};
