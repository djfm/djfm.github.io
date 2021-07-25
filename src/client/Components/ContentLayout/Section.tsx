import React, {
  ReactElement,
} from 'react';

import {
  makeHeadingFC,
  TitledContent,
} from '.';

import {
  spacing,
} from '../../theme';

type SectionProps = TitledContent & {
  depth: number;
  navLinks: ReactElement;
};
export const Section: React.FC<SectionProps> = ({
  anchor, depth, navLinks, title, Content,
}) => {
  const SectionHeading = makeHeadingFC(depth);

  const H1 = makeHeadingFC(depth + 1);
  const H2 = makeHeadingFC(depth + 2);

  const Container = ({ children }) => (
    <section>
      <SectionHeading
        id={anchor}
        style={{ marginBottom: spacing.tiny }}
      >
        {title}
      </SectionHeading>
      {navLinks}
      {children}
    </section>
  );

  return (
    <Content
      Container={Container}
      H1={H1}
      H2={H2}
    />
  );
};
export default Section;
