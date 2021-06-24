/* eslint-disable no-console */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspect } from 'util';

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

const allLinks = extractAllLinks();

console.log(`Found links: ${allLinks.map((l) => `"${l}"`).join(', ')}.`);

console.log('Now generating the static pages...');
for (const link of allLinks) {
  console.log(`Processing ${link}`);
  const [app] = createAppForURL(link);
  const markup = ReactDOMServer.renderToString(app);
  console.log(markup);
}
