/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

// TODO add static title to pages on compile, and add it in React too btw.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspect } from 'util';

import path from 'path';
import { URL } from 'url';

import {
  readFile,
  writeFile,
  readdir,
  stat,
  mkdir,
  unlink,
  rmdir,
} from 'fs/promises';

import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import ReactTestRenderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';

import { ServerStyleSheet } from 'styled-components';

import App from '../client/Components/App';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const findProjectRoot = async (currentPath: string): Promise<string> => {
  try {
    await stat(path.join(currentPath, 'package.json'));
    return currentPath;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
    const parentPath = currentPath.split(path.sep).slice(0, -1).join(path.sep);
    return findProjectRoot(parentPath);
  }
};

const createAppForURL = (url: string): [React.ReactElement, Record<string, unknown>] => {
  const context = {};

  /*
  const Router: React.FC = () => (
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
  */

  const router = React.createElement(StaticRouter, {
    location: url,
    context,
  }, React.createElement(App));

  return [router, context];
};

const extractLinks = (
  node: ReactTestRenderer.ReactTestRendererNode
    | ReactTestRenderer.ReactTestRendererNode[],
): string[] => {
  if (!node) {
    return [];
  }

  if (typeof node === 'string') {
    return [];
  }

  if (node instanceof Array) {
    for (const item of node) {
      extractLinks(item);
    }
    return ([] as string[]).concat(...node.map(extractLinks));
  }

  if (node.type === 'a') {
    return [node.props.href];
  }

  return extractLinks(node.children);
  // console.log(inspect(node, false, null, false));
};

const extractLinksAtURL = (url: string): string[] => {
  const [app] = createAppForURL(url);
  const renderer = ReactTestRenderer.create(app);
  const links = extractLinks(renderer.toJSON());
  return links;
};

const extractAllLinks = () => {
  const allLinks = new Set<string>(['/']);
  const links = extractLinksAtURL('/');
  while (links.length > 0) {
    const link = links.pop();
    if (!allLinks.has(link)) {
      allLinks.add(link);
      links.push(...extractLinksAtURL(link));
    }
  }
  return [...allLinks.values()];
};

const main = async () => {
  console.log('Pre-rendering all pages...');
  const allLinks = extractAllLinks().filter((link) => link.startsWith('/'));

  // it is very important for correct directory creation
  // that a link like "a/b" be processed before just "a"
  allLinks.sort().reverse();

  console.log(`found pages: ${allLinks.map((l) => `"${l}"`).join(', ')}.\n`);

  const indexBuffer = await readFile(path.resolve(dirname, 'index.template.html'));
  const indexTemplate = indexBuffer.toString();

  const projectRoot = await findProjectRoot(dirname);
  const docsRootPath = path.join(projectRoot, 'docs');
  const appPlaceholder = '#APP#';
  const stylesPlaceholder = '#STYLES#';

  const createDocPath = async (link: string): Promise<string> => {
    if (link === '/') {
      return path.join(docsRootPath, 'index.html');
    }

    const linkParts = link.split('/');
    const fileBasename = linkParts.pop();

    const dirs = [];

    for (const part of linkParts) {
      dirs.push(part);
      const dirPath = path.join(docsRootPath, ...dirs);
      try {
        await stat(dirPath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
        mkdir(dirPath);
      }
    }

    const baseNamePath = path.join(docsRootPath, ...dirs, fileBasename);
    try {
      // if a route has the same name as a directory,
      // use an index.html file in that directory for that route
      const maybeDir = await stat(baseNamePath);
      if (maybeDir.isDirectory) {
        return `${baseNamePath}/index.html`;
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    return `${baseNamePath}.html`;
  };

  const cleanupDocs = async (dirPath: string): Promise<void> => {
    const entries = await readdir(dirPath);

    for (const entry of entries) {
      if (entry !== 'img' && entry !== 'assets') {
        const entryPath = path.join(dirPath, entry);
        const s = await stat(entryPath);
        if (s.isDirectory()) {
          await cleanupDocs(entryPath);
          console.log(`  - unlinking "${entryPath}"...`);
          await rmdir(entryPath);
        } else if (/\.html$/.test(entry)) {
          console.log(`  - unlinking "${entryPath}"...`);
          await unlink(entryPath);
        }
      }
    }
  };

  console.log('\nCleaning up previously generated pages...');
  await cleanupDocs(docsRootPath);

  console.log('\nNow generating the static pages...');
  for (const link of allLinks) {
    console.log(`  # processing "${link}"`);
    const sheet = new ServerStyleSheet();

    console.log(`    1. rendering "${link}"...`);
    const [app] = createAppForURL(link);
    const markup = ReactDOMServer.renderToString(sheet.collectStyles(app));

    console.log('    2. getting the style tags');
    const styleTags = sheet.getStyleTags();

    console.log('    3. creating directory structure if necessary');
    const docPath = await createDocPath(link);

    console.log(`    4. writing template file "${docPath}"...`);
    const finalCode = indexTemplate
      .replace(appPlaceholder, markup)
      .replace(stylesPlaceholder, styleTags);

    await writeFile(docPath, finalCode);
  }

  // it seems the function doesn't return if I don't do that...
  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

main();
