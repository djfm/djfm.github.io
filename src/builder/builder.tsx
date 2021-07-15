/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

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

import React, {
  ReactElement,
} from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { ServerStyleSheet } from 'styled-components';

import stripTags from 'striptags';

import {
  ContentMeta,
} from '../client/Components/ContentLayout/Content';
import App from '../client/Components/App';
import tlPages from '../client/topLevelPages';

type PageInfo = {
  link: string
  documentTitle: string
}

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

const renderTitle = (title: ReactElement | string) => {
  if (typeof title === 'string') {
    return title;
  }

  return stripTags(
    ReactDOMServer.renderToString(title),
  );
};

const generatePageInfo = (
  content: ContentMeta,
  depth = 0,
): PageInfo[] => {
  if ((!content.anchor
        || content.anchor === '/')
          && depth === 0) {
    return [{
      link: '/',
      documentTitle: content.documentTitle
        || renderTitle(content.title),
    }];
  }

  const children = content.childrenMeta || [];
  const childInfo = children.map(
    (child) => generatePageInfo(child, depth + 1),
  );

  return [{
    link: `/${content.anchor}`,
    documentTitle: content.documentTitle
      || renderTitle(content.title),
  }].concat(...childInfo.map((
    (info) => info.map(({
      link,
      documentTitle,
    }) => ({
      link: `/${content.anchor}${link}`,
      documentTitle,
    })))));
};

const main = async () => {
  console.log('Pre-rendering all pages...');
  const allLinks = ([] as PageInfo[]).concat(...tlPages.map(
    generatePageInfo,
  ));

  // it is very important for correct directory creation
  // that a link like "a/b" be processed before just "a"
  allLinks.sort((a, b) => {
    if (a.link < b.link) {
      return 1;
    }

    return -1;
  });

  console.log(`found pages: ${allLinks.map((l) => `"${l}"`).join(', ')}.\n`);

  const indexBuffer = await readFile(path.resolve(__dirname, 'index.template.html'));
  const indexTemplate = indexBuffer.toString();

  const docsRootPath = path.resolve(__dirname, '..', '..', 'docs');
  const titlePlaceholder = '#TITLE#';
  const appPlaceholder = '#APP#';
  const stylesPlaceholder = '#STYLES#';

  const createDocPath = async (link: string): Promise<string> => {
    if (link === '/') {
      return path.join(docsRootPath, 'index.html');
    }

    const linkParts = link.split('/');

    // TODO the compiler is right, there may be a subtle issue here
    const fileBasename = linkParts.pop()!;

    const dirs = [] as string[];

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
      if (maybeDir.isDirectory()) {
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
  for (const { link, documentTitle } of allLinks) {
    console.log(`  # processing "${link}"`);
    const sheet = new ServerStyleSheet();

    const [app] = createAppForURL(link);
    const markup = ReactDOMServer.renderToString(sheet.collectStyles(app));

    const styleTags = sheet.getStyleTags();

    const docPath = await createDocPath(link);

    const finalCode = indexTemplate
      .replace(titlePlaceholder, documentTitle)
      .replace(appPlaceholder, markup)
      .replace(stylesPlaceholder, styleTags);

    await writeFile(docPath, finalCode);
  }

  // it seems the function doesn't return if I don't do that...
  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

main();
