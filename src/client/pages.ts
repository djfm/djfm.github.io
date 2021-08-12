export type DecoratedPage = {
  page: MDNode
  title?: string
  anchor: string
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
      };
    }
  }
  return 'Could not find page meta info';
};

export const decoratePages = (pages: MDNode[]): DecoratedPage[] =>
  pages.map((page) => {
    const mbDecdPage = decorate(page);
    if (typeof mbDecdPage === 'string') {
      throw new Error(
        `${mbDecdPage} (in "${page.props.resourcePath}").`,
      );
    }
    return mbDecdPage;
  });

export default decoratePages;
