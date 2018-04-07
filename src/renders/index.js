// @flow

import renderTree from './render-tree';
import renderPlain from './render-plain';
import renderJson from './render-json';

const renders = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (renderType: string) => (data: Object) => {
  const render = renders[renderType];
  if (!render) {
    throw new Error(`unkown render: ${render}`);
  }
  return render(data);
};

