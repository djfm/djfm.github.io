import React from 'react';

type HeadingProps = Record<string, unknown>;
export interface HeadingFC extends React.FC<HeadingProps> {
  depth: number;
}

export const makeHeadingFC = (
  depth: number,
): HeadingFC => {
  if (
    depth < 1
    || depth > 6
    || Math.round(depth) !== depth
  ) {
    throw new Error(`Invalid level for heading: ${depth}.`);
  }

  const tagName = `h${depth}` as keyof JSX.IntrinsicElements;

  const heading = (props: HeadingProps) =>
    React.createElement(
      tagName,
      props,
    );

  heading.depth = depth;

  return heading;
};

export default makeHeadingFC;
