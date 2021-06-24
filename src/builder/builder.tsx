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

    return path.join(docsRootPath, ...dirs, `${fileBasename}.html`);
  };

  const cleanupDocs = async (dirPath: string, currentDepth = 0): Promise<void> => {
    const entries = await readdir(dirPath);
    const kept = [];

    const rm = async (p: string): Promise<void> => {
      console.log(`  - unlinking "${p}"...`);
      await unlink(p);
    };

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry);
      const s = await stat(entryPath);
      if (s.isDirectory()) {
        await cleanupDocs(entryPath, currentDepth + 1);
        await rm(entryPath);
      } else if (/\.html$/.test(entry)) {
        await rm(entryPath);
      } else {
        kept.push(entryPath);
      }
    }
    if (kept.length === 0 && currentDepth > 0) {
      await rm(dirPath);
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
