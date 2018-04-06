import getParse from './parsers';
import readFile from './read-file';
import buildDiff from './buid-diff';
import render from './render';

export default (path1, path2) => {
  const confBeforeFile = readFile(path1);
  const confAfterFile = readFile(path2);
  const before = getParse(confBeforeFile.ext)(confBeforeFile.data);
  const after = getParse(confAfterFile.ext)(confAfterFile.data);
  const diff = buildDiff(before, after);

  return render(diff);
};
