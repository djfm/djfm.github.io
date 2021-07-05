import React, {
  ReactElement,
} from 'react';

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

  const HTag = `h${level}` as keyof JSX.IntrinsicElements;

  const SynthesizedHeading: React.FC<HeadingProps> = (
    props: HeadingProps,
  ): ReactElement => {
    const { children, ...tagProps } = props;
    return <HTag {...tagProps}>{children}</HTag>;
  };

  return SynthesizedHeading;
};

export default makeHeadingFC;
