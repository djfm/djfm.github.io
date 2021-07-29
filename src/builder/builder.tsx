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
  TitledContent,
} from '../client/Components/ContentLayout/index';

import App from '../client/Components/App';
import tlPages from '../client/siteStructure';

type PageInfo = {
  link: string
  documentTitle: string
}

const docsRootPath = path.resolve(__dirname, '..', '..', 'docs');
const titlePlaceholder = '#TITLE#';
const appPlaceholder = '#APP#';
const stylesPlaceholder = '#STYLES#';
const envPlaceholder = '#NODE_ENV#';

const nodeEnv = process.env.NODE_ENV || 'development';

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

const removeTrailingSlash = (url: string) => {
  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }
  return url;
};

/**
 * Only supports 2 levels of nesting.
 */
const generatePageInfo = (
  titledContent: TitledContent,
): PageInfo[] => {
  const output: PageInfo[] = [];

  const link = titledContent.anchor === ''
    ? '/'
    : `/${titledContent.anchor}`;

  const documentTitle = titledContent.documentTitle
    || renderTitle(titledContent.title);

  if (titledContent.children) {
    const [firstChild, ...children] = titledContent.children.map(
      (child: TitledContent): PageInfo => ({
        link: `${removeTrailingSlash(link)}/${child.anchor}`,
        documentTitle: child.documentTitle
          || renderTitle(child.title),
      }),
    );

    firstChild.link = link;
    firstChild.documentTitle = documentTitle;

    output.push(firstChild, ...children);
  } else {
    output.push({ link, documentTitle });
  }

  return output;
};

const createDocPath = async (link: string): Promise<string> => {
  if (link === '/') {
    return path.join(docsRootPath, 'index.html');
  }

  const linkParts = link.split('/');

  const fileBasename = linkParts.pop();

  if (!fileBasename) {
    throw new Error(`Invalid link: "${link}"`);
  }

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

const main = async () => {
  // console.log('Pages structure provided:');
  // logInspect(tlPages);
  // console.log('Pre-rendering all pages...');

  const allPageInfo = ([] as PageInfo[]).concat(...tlPages.map(
    generatePageInfo,
  ));

  // it is very important for correct directory creation
  // that a link like "a/b" be processed before just "a"
  allPageInfo.sort((a, b) => {
    if (a.link < b.link) {
      return 1;
    }

    return -1;
  });

  // console.log('Pages found to render:');
  // logInspect(allPageInfo);

  const indexBuffer = await readFile(path.resolve(__dirname, 'index.template.html'));
  const indexTemplate = indexBuffer.toString();

  console.log('\nCleaning up previously generated pages...');
  await cleanupDocs(docsRootPath);

  console.log('\nNow generating the static pages...');
  for (const { link, documentTitle } of allPageInfo) {
    console.log(`  # processing "${link}"`);
    const sheet = new ServerStyleSheet();

    const [app] = createAppForURL(link);
    const markup = ReactDOMServer.renderToString(sheet.collectStyles(app));

    const styleTags = sheet.getStyleTags();

    const docPath = await createDocPath(link);

    const finalCode = indexTemplate
      .replace(titlePlaceholder, documentTitle)
      .replace(appPlaceholder, markup)
      .replace(stylesPlaceholder, styleTags)
      .replace(envPlaceholder, nodeEnv);

    await writeFile(docPath, finalCode);
  }

  // it seems the function doesn't return if I don't do that...
  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

main();
