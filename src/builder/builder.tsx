/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

// TODO add static title to pages on compile, and add it in React too btw.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspect } from 'util';
import { URL } from 'url';

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

import { ServerStyleSheet } from 'styled-components';

import App from '../client/Components/App';

type Heading = {
  title: string
  tag: string
  children: Heading[]
}

const isURLToPreRender = (href: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(href);
    return false;
  } catch (e) {
    if (href.includes('#')) {
      return false;
    }
    if (href.startsWith('/')) {
      return true;
    }
    return false;
  }
};

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

const extractLinksFromNode = (
  node: ReactTestRenderer.ReactTestRendererNode,
): string[] => {
  if (!node) {
    return [];
  }

  if (typeof node === 'string') {
    return [];
  }

  if (node.type === 'a') {
    if (!isURLToPreRender(node.props.href)) {
      return [];
    }

    return [node.props.href];
  }

  if (!node.children) {
    return [];
  }

  return ([] as string[]).concat(
    ...node.children.map(extractLinksFromNode),
  );
};

const extractLinksAtURL = (url: string): string[] => {
  const [app] = createAppForURL(url);
  const renderer = ReactTestRenderer.create(app);
  const rendered = renderer.toJSON();
  if (!rendered) {
    throw new Error('Meh, renderer did not render anything.');
  }
  if (rendered instanceof Array) {
    throw new Error('Meh, renderer produced an array of nodes.');
  }
  const links = extractLinksFromNode(rendered);
  return links;
};

const extractAllLinksFromSPA = () => {
  const allLinks = new Set<string>(['/']);
  const links = extractLinksAtURL('/');
  while (links.length > 0) {
    // links is not empty, so... I'm pretty sure link is defined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const link = links.pop()!;
    if (!allLinks.has(link)) {
      allLinks.add(link);
      links.push(...extractLinksAtURL(link));
    }
  }
  return [...allLinks.values()];
};

const toSimpleString = (
  nodes: ReactTestRenderer.ReactTestRendererNode[]
    | ReactTestRenderer.ReactTestRendererNode,
): string => {
  if (nodes instanceof Array) {
    return nodes.map(toSimpleString).join('');
  }

  if (typeof nodes === 'string') {
    return nodes;
  }

  if (nodes.children) {
    return toSimpleString(nodes.children);
  }

  throw new Error('This should not happen.');
};

const extractHeadingsFromNode = (
  node: ReactTestRenderer.ReactTestRendererNode,
): Heading | undefined => {
  if (!node) {
    return undefined;
  }

  if (typeof node === 'string') {
    return undefined;
  }

  const headingsList = [
    'h1', 'h2', 'h3',
    'h4', 'h5', 'h6',
  ];

  if (headingsList.includes(node.type)) {
    return {
      tag: node.type,
      title: toSimpleString(node.children),
      children: [],
    };
  }

  if (node.children) {
    const headingsNodesReducer = (
      heading: Heading,
      child: ReactTestRenderer.ReactTestRendererNode,
    ) => {
      const hChild = extractHeadingsFromNode(child);

      if (hChild === undefined) {
        return heading;
      }

      if (heading === undefined) {
        return hChild;
      }

      if (hChild.tag > heading.tag) {
        return {
          ...heading,
          children: heading.children.concat(hChild),
        };
      }

      return {
        tag: undefined,
        title: undefined,
        children: [heading, hChild],
      };
    };

    return node.children.reduce(
      headingsNodesReducer,
      undefined,
    );
  }

  return undefined;
};

// TODO actually do something besides shouting in the log
const sanitizeHeadings = (heading: Heading): Heading => {
  if (heading.tag === undefined) {
    console.log('  <!#?? headings layout looks fucked-up ??#!>');
  }

  return {
    ...heading,
    children: heading.children.map(sanitizeHeadings),
  };
};

const getFirstHeadingWithMultipleChildren = (
  heading: Heading,
): Heading => {
  if (heading.children.length === 0) {
    return heading;
  }

  if (heading.children.length > 1) {
    return heading;
  }

  return getFirstHeadingWithMultipleChildren(
    heading.children[0],
  );
};

const getMostSignificantHeadingTitle = (url: string): string => {
  const [app] = createAppForURL(url);
  const renderer = ReactTestRenderer.create(app);
  const rendered = renderer.toJSON();
  if (!rendered) {
    throw new Error('Meh, renderer did not render anything.');
  }
  if (rendered instanceof Array) {
    throw new Error('Meh, renderer produced an array of nodes.');
  }
  const headings = sanitizeHeadings(
    extractHeadingsFromNode(rendered),
  );

  return getFirstHeadingWithMultipleChildren(
    headings,
  ).title;
};

const main = async () => {
  console.log('Pre-rendering all pages...');
  const allLinks = extractAllLinksFromSPA().filter(isURLToPreRender);

  // it is very important for correct directory creation
  // that a link like "a/b" be processed before just "a"
  allLinks.sort().reverse();

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
  for (const link of allLinks) {
    console.log(`  # processing "${link}"`);
    const sheet = new ServerStyleSheet();

    const [app] = createAppForURL(link);
    const markup = ReactDOMServer.renderToString(sheet.collectStyles(app));

    const styleTags = sheet.getStyleTags();

    const docPath = await createDocPath(link);

    const title = getMostSignificantHeadingTitle(link);

    const finalCode = indexTemplate
      .replace(titlePlaceholder, title)
      .replace(appPlaceholder, markup)
      .replace(stylesPlaceholder, styleTags);

    await writeFile(docPath, finalCode);
  }

  // it seems the function doesn't return if I don't do that...
  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

main();
