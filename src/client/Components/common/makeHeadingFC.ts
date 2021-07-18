import React from 'react';

type HeadingProps = Record<string, unknown>;

export const makeHeadingFC = (
  level: number,
): React.FC<HeadingProps> => {
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

  return heading;
};

export default makeHeadingFC;
