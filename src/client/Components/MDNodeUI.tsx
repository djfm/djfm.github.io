import React from 'react';

export type WithNode = {
  node: MDNode
}

const MDSectionUI: React.FC<WithNode> = ({
  node,
}) => (
  <section>
    {node.children.map(
      (child) =>
        <MDNodeUI key={child.key} node={child} />,
    )}
  </section>
);

const MDHeadingUI: React.FC<WithNode> = ({
  node,
}) => React.createElement(
  `h${node.props.level}`,
  undefined,
  ...node.children.map((child) =>
    <MDNodeUI key={child.key} node={child} />),
);

const MDBoldUI: React.FC<WithNode> = ({
  node,
}) => React.createElement(
  'strong',
  undefined,
  ...node.children.map((child) =>
    <MDNodeUI key={child.key} node={child} />),
);

const MDIdiomaticUI: React.FC<WithNode> = ({
  node,
}) => React.createElement(
  'i',
  undefined,
  ...node.children.map((child) =>
    <MDNodeUI key={child.key} node={child} />),
);

const MDParagraphUI: React.FC<WithNode> = ({
  node,
}) => React.createElement(
  'p',
  undefined,
  ...node.children.map((child) =>
    <MDNodeUI key={child.key} node={child} />),
);

const MDListUI: React.FC<WithNode> = ({
  node,
}) => (
  <ol>
    {node.children.map((child) => (
      <li key={child.key}>
        <MDNodeUI key={child.key} node={child} />
      </li>
    ))}
  </ol>
);

const MDListItemUI: React.FC<WithNode> = ({
  node,
}) => (
  <>
    {node.children.map((child) => (
      <MDNodeUI key={child.key} node={child} />
    ))}
  </>
);

const MDBlockquoteUI: React.FC<WithNode> = ({
  node,
}) => {
  const contents = node.children.map((child, i) => (
    <React.Fragment key={child.key}>
      <MDNodeUI node={child} />
      {i < node.children.length - 1 && '\n'}
    </React.Fragment>
  ));

  if (node.props.syntax) {
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

const MDLiteralUI: React.FC<WithNode> = ({
  node,
}) => <>{node.value}</>;

export const MDNodeUI: React.FC<WithNode> = ({
  node,
}) => {
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

  const body = node.type;

  return (
    <>
      Unsupported node type &quot;{body}&quot;
    </>
  );
};

export default MDNodeUI;
