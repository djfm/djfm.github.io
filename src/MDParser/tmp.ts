import util from 'util';
import path from 'path';
import { readFile } from 'fs/promises';
import { parser } from './parser';

// eslint-disable-next-line no-console
const inspect = (obj: unknown) => console.log(
  util.inspect(obj, false, null, true),
);

const main = async () => {
  const rootDir = path.resolve(__dirname, '../Pages');

  const testFileBuf = await readFile(path.join(rootDir, 'Home.md'));
  const testFile = testFileBuf.toString();
  const parsed = await parser(testFile, rootDir);
  inspect(parsed);
};

main();
