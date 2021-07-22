import React from 'react';

type HeadingProps = Record<string, unknown>;
export interface HeadingFC extends React.FC<HeadingProps> {
  realLevel: number;
}

export const makeHeadingFC = (
  level: number,
): HeadingFC => {
  if (
    level < 1
    || level > 6
    || Math.round(level) !== level
  ) {
    throw new Error(`Invalid level for heading: ${level}.`);
  }

  const tagName = `h${level}` as keyof JSX.IntrinsicElements;

  const heading = (props: HeadingProps) =>
    React.createElement(
      tagName,
      props,
    );

  heading.realLevel = level;

  return heading;
};

export default makeHeadingFC;
