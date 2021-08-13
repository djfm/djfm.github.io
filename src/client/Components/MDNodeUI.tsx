import React, {
  useContext,
} from 'react';

import {
  useRouteMatch,
  NavLink,
} from 'react-router-dom';

import {
  DPageContext,
} from './App';

import {
  PageRefs,
} from '../pages';

export type WithNode = {
  node: RMarkdownNode
}

const MDSectionUI: React.FC<{
  node: RSectionNode
}> = ({
  node,
}) => (
  <section>
    {node.children && node.children.map(
      (child) =>
        <ReactMarkdownNodeUI key={child.key} node={child} />,
    )}
  </section>
);

const MDHeadingUI: React.FC<{
  node: RHeadingNode
}> = ({
  node,
}) => React.createElement(
  `h${node.level}`,
  undefined,
  ...node.children.map((child) =>
    <ReactMarkdownNodeUI key={child.key} node={child} />),
);

const MDBoldUI: React.FC<{
  node: RBoldNode
}> = ({
  node,
}) => React.createElement(
  'strong',
  undefined,
  ...node.children.map((child) =>
    <ReactMarkdownNodeUI key={child.key} node={child} />),
);

const MDIdiomaticUI: React.FC<{
  node: RIdiomaticNode
}> = ({
  node,
}) => React.createElement(
  'i',
  undefined,
  ...node.children.map((child) =>
    <ReactMarkdownNodeUI key={child.key} node={child} />),
);

const MDParagraphUI: React.FC<{
  node: RParagraphNode
}> = ({
  node,
}) => React.createElement(
  'p',
  undefined,
  ...node.children.map((child) =>
    <ReactMarkdownNodeUI key={child.key} node={child} />),
);

const MDListUI: React.FC<{
  node: RListNode,
}> = ({
  node,
}) => (
  <ol>
    {node.children.map((child) => (
      <li key={child.key}>
        <ReactMarkdownNodeUI key={child.key} node={child} />
      </li>
    ))}
  </ol>
);

const MDListItemUI: React.FC<{
  node: RListItemNode
}> = ({
  node,
}) => (
  <>
    {node.children.map((child) => (
      <ReactMarkdownNodeUI key={child.key} node={child} />
    ))}
  </>
);

const MDBlockquoteUI: React.FC<{
  node: RBlockquoteNode
}> = ({
  node,
}) => {
  const contents = node.children.map((child, i) => (
    <React.Fragment key={child.key}>
      <ReactMarkdownNodeUI node={child} />
      {i < node.children.length - 1 && '\n'}
    </React.Fragment>
  ));

  if (node.syntax) {
    return (
      <pre>
        <code>
          {contents}
        </code>
      </pre>
    );
  }

  return (<pre>{contents}</pre>);
};

const MDLiteralUI: React.FC<{
  node: RLiteralNode
}> = ({
  node,
}) => <>{node.value}</>;

const MDSubpagesUI: React.FC<{
  paths: string[]
  refs: PageRefs | undefined
}> = ({
  paths,
  refs,
}) => {
  const { url } = useRouteMatch();

  if (!refs) {
    return null;
  }

  const nav = (
    <nav>
      <ol>
        {paths.map((path) => (
          <li key={path}>
            <NavLink
              to={`${url}/${refs[path].anchor}`}
            >
              {refs[path].title}
            </NavLink>
          </li>
        ))}
      </ol>
    </nav>
  );

  return nav;
};

export const ReactMarkdownNodeUI: React.FC<WithNode> = ({
  node,
}) => {
  const context = useContext(DPageContext);

  if (node.type === 'section') {
    return <MDSectionUI node={node} />;
  }

  if (node.type === 'heading') {
    return <MDHeadingUI node={node} />;
  }

  if (node.type === 'bold') {
    return <MDBoldUI node={node} />;
  }

  if (node.type === 'literal') {
    return <MDLiteralUI node={node} />;
  }

  if (node.type === 'idiomatic') {
    return <MDIdiomaticUI node={node} />;
  }

  if (node.type === 'paragraph') {
    return <MDParagraphUI node={node} />;
  }

  if (node.type === 'list') {
    return <MDListUI node={node} />;
  }

  if (node.type === 'list-item') {
    return <MDListItemUI node={node} />;
  }

  if (node.type === 'blockquote') {
    return <MDBlockquoteUI node={node} />;
  }

  if (node.type === 'function-call') {
    if (node.name === 'META') {
      // ignore this
      return null;
    }

    if (node.name === 'SUBPAGES') {
      return (
        <MDSubpagesUI
          paths={node.positionalArgs}
          refs={context.dPage?.refs}
        />
      );
    }
  }

  // eslint-disable-next-line no-console
  console.error(`Unsupported node type: ${node.type}.`);
  // eslint-disable-next-line no-console
  console.dir(node, { depth: null, colors: true });
  return null;
};

export default ReactMarkdownNodeUI;
