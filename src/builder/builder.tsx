/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspect } from 'util';

import path from 'path';
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
import ReactDOMServer from 'react-dom/server';
import ReactTestRenderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';

import App from '../client/Components/App';

const createAppForURL = (url: string): [React.ReactElement, Record<string, unknown>] => {
  const context = {};

  const Router: React.FC = () => (
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );

  const router = <Router />;

  return [router, context];
};

const extractLinks = (
  node: ReactTestRenderer.ReactTestRendererNode
    | ReactTestRenderer.ReactTestRendererNode[],
): string[] => {
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
  const allLinks = extractAllLinks();

  // it is very important for correct directory creation
  // that a link like "a/b" be processed before just "a"
  allLinks.sort().reverse();

  console.log(`found pages: ${allLinks.map((l) => `"${l}"`).join(', ')}.\n`);

  const indexBuffer = await readFile(path.resolve(__dirname, 'index.template.html'));
  const indexTemplate = indexBuffer.toString();

  const docsRootPath = path.resolve(__dirname, '..', '..', 'docs');
  const appPlaceholder = '#APP#';

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
    const kept = [];

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry);
      const s = await stat(entryPath);
      if (s.isDirectory()) {
        await cleanupDocs(entryPath);
        console.log(`  - unlinking "${entryPath}"...`);
        await rmdir(entryPath);
      } else if (/\.html$/.test(entry)) {
        console.log(`  - unlinking "${entryPath}"...`);
        await unlink(entryPath);
      } else {
        kept.push(entryPath);
      }
    }
  };

  console.log('\nCleaning up previously generated pages...');
  await cleanupDocs(docsRootPath);

  console.log('\nNow generating the static pages...');
  for (const link of allLinks) {
    console.log(`  # processing "${link}"`);
    console.log(`    1. rendering "${link}"...`);
    const [app] = createAppForURL(link);
    const markup = ReactDOMServer.renderToString(app);
    console.log('    2. creating directory structure if necessary');
    const docPath = await createDocPath(link);
    console.log(`    3. writing template file "${docPath}"...`);
    await writeFile(docPath, indexTemplate.replace(appPlaceholder, markup));
  }
};

main();
