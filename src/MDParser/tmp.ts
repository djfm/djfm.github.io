import path from 'path';
import { readFile } from 'fs/promises';
import { parser } from './parser';

const main = async () => {
  const rootDir = path.resolve(__dirname, '../Pages');

  const testFileBuf = await readFile(path.join(rootDir, 'Home.md'));
  const testFile = testFileBuf.toString();
  const parsed = await parser(testFile, rootDir);

  console.log(parsed);
};

main();
