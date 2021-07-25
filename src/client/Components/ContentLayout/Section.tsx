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
  depth: number
  navLinks: ReactElement
  number: string | undefined
  vMargin: string
}

type StyledSectionProps = {
  vMargin: string;
}

const StyledSection = styled.section`
  *:target {
    margin-left: ${spacing.tiny};
    padding-left: ${spacing.small};
    border-left: 1px solid ${colors.dark()};
  }

  > *:first-child * {
    margin: 0;
  }

  > *:first-child {
    margin-top: ${(props: StyledSectionProps) => props.vMargin};
  }

  > *:first-child + nav {
    margin-bottom: ${(props: StyledSectionProps) => props.vMargin};
  }

  > *:first-child + :not(nav) + * {
  margin-top: ${(props: StyledSectionProps) => props.vMargin};
}
`;

const NumberedHeading = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  flex-wrap: wrap;

  > *:first-child {
    margin-right: ${spacing.small};
  }
`;

export const Section: React.FC<SectionProps> = ({
  anchor, depth, navLinks, number, title, vMargin, Content,
}) => {
  const SectionHeading = makeHeadingFC(depth);

  const H1 = makeHeadingFC(depth + 1);
  const H2 = makeHeadingFC(depth + 2);

  const Container = ({ children }) => {
    const heading = (
      <SectionHeading
        id={anchor}
      >
        {title}
      </SectionHeading>
    );

    const top = number ? (
      <NumberedHeading>
        <div>{number}</div>
        {heading}
      </NumberedHeading>
    ) : heading;

    return (
      <StyledSection vMargin={vMargin}>
        {top}
        {navLinks}
        {children}
      </StyledSection>
    );
  };

  return (
    <Content
      Container={Container}
      H1={H1}
      H2={H2}
    />
  );
};
export default Section;
