/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const { join, sep } = require('path');
const { writeFile, stat } = require('fs/promises');

const findProjectRoot = async (currentDir) => {
  try {
    const candidate = join(currentDir, 'package.json');
    await stat(candidate);
    return currentDir;
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }
  const parts = currentDir.split(sep);
  parts.pop();
  return findProjectRoot(join(sep, ...parts));
};

const hljsPath = require.resolve('highlight.js');
const hljsPathParts = hljsPath.split(sep);
hljsPathParts.unshift('.');

while (hljsPathParts[hljsPathParts.length - 1] !== 'highlight.js') {
  hljsPathParts.pop();
}

while (hljsPathParts[0] !== 'node_modules') {
  hljsPathParts.splice(0, 1);
}

const hljsRoot = hljsPathParts.join('/');

const main = async () => {
  const root = await findProjectRoot(__dirname);
  const rootParts = root.split(sep);
  const dirParts = __dirname.split(sep);

  const prefixParts = [];
  while (dirParts.length > rootParts.length) {
    dirParts.pop();
    prefixParts.push('..');
  }

  const hljsRelPath = join(...prefixParts, hljsRoot.substr(0, root.length));

  const languages = require('./languages');
  const lines = [
    '/* eslint-disable @typescript-eslint/no-var-requires */',
    '',
    `const hljs = require('${join(hljsRelPath, 'lib', 'core')}');`,
    '',
    ...languages.map(
      (language) => `hljs.registerLanguage('${language}', require('${join(
        hljsRelPath, 'lib', 'languages', `${language}`,
      )}'));`,
    ),
    '',
    'module.exports = hljs;',
    '',
  ];

  await writeFile(join(__dirname, 'index.js'), lines.join('\n'));
};

main();
