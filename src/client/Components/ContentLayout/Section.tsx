import React, {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import {
  makeHeadingFC,
  TitledContent,
} from '.';

import {
  defaultColorTheme as colors,
  spacing,
} from '../../theme';

type SectionProps = TitledContent & {
  depth: number;
  navLinks: ReactElement;
};

const StyledSection = styled.section`
  *:target {
    margin-left: ${spacing.tiny};
    padding-left: ${spacing.small};
    border-left: 1px solid ${colors.dark()};
  }
`;

export const Section: React.FC<SectionProps> = ({
  anchor, depth, navLinks, title, Content,
}) => {
  const SectionHeading = makeHeadingFC(depth);

  const H1 = makeHeadingFC(depth + 1);
  const H2 = makeHeadingFC(depth + 2);

  const Container = ({ children }) => (
    <StyledSection>
      <SectionHeading
        id={anchor}
        style={{ marginBottom: spacing.tiny }}
      >
        {title}
      </SectionHeading>
      {navLinks}
      {children}
    </StyledSection>
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
