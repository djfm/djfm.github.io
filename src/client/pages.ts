export type PageRefs = Record<string, DecoratedPage>

export type DecoratedPage = {
  anchor: string
  page: MDNode
  refs?: PageRefs
  title?: string
}

const hasProperties = <
  Keys extends string[]
> (
    obj: unknown,
    props: Keys,
  ): obj is {
    [k in Keys[number]]: unknown
  } => {
  if (typeof obj !== 'object') {
    return false;
  }

  for (const prop of props) {
    if (!Object.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
};

const decorate = (page: MDNode): DecoratedPage | string => {
  if (page.type !== 'document') {
    return 'Page must be a document';
  }
  if (!page.children) {
    return 'Page must have children';
  }
  if (page.children.length !== 1) {
    return 'Page must have exactly one child';
  }
  if (page.children[0].type !== 'section') {
    return 'Page must have a section';
  }
  if (page.children[0].children.length === 0) {
    return 'Page root section must not be empty';
  }
  for (const child of page.children[0].children) {
    if (child.type === 'function-call' && child.value === 'META') {
      if (!child.props || !child.props.namedArgs) {
        return 'META has no arguments';
      }
      const meta = child.props.namedArgs;
      if (!hasProperties(meta, ['title', 'anchor'])) {
        return 'META must have title and anchor properties';
      }
      return {
        anchor: meta.anchor,
        title: meta.title,
        page: page.children[0],
        refs: !page.refs
          ? undefined
          : Object.entries(page.refs).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: wrapDecorate(value),
            }),
            {},
          ),
      };
    }
  }
  return 'Could not find page meta info';
};

const wrapDecorate = (page: MDNode): DecoratedPage => {
  const mbDecdPage = decorate(page);
  if (typeof mbDecdPage === 'string') {
    throw new Error(
      `${mbDecdPage} (in "${page.resourcePath}").`,
    );
  }
  return mbDecdPage;
};

export const decoratePages = (pages: MDNode[]): DecoratedPage[] =>
  pages.map(wrapDecorate);

export default decoratePages;
