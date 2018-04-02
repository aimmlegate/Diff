// @ flow
import fs from 'fs';

export default (pathToFile1, pathToFile2) => {
  const after = JSON.parse(fs.readFileSync(pathToFile1));
  const before = JSON.parse(fs.readFileSync(pathToFile2));
  console.log(after instanceof Object);
  console.log(before instanceof Object);
};
