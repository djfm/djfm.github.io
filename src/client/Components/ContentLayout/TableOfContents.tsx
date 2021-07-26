import React, {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import {
  spacing,
  defaultColorTheme as colors,
} from '../../theme';

import {
  HeadingFC,
  TitledContent,
} from '.';

import HashLink from '../HashLink';
import StyledNavVertical from '../StyledNavVertical';

const TOCHeadingWrapper = styled.div`
  align-items: baseline;
  display: flex;

  /* the heading, probably a h2 but not necessarily */
  > *:first-child {
    font-size: 1em;
    margin-top: 0;
  }

  > a {
    font-weight: bold;
    margin-left: ${spacing.small};
  }
`;

const Nav = styled(StyledNavVertical)`
  margin-bottom: ${spacing.xl};
`;

type TableOfContentsProps = {
  sections: TitledContent[];
  title: ReactElement | string;
  H1: HeadingFC;
};

export const TableOfContents: React.FC<
  TableOfContentsProps
> = ({
  sections,
  title: tocTitle,
  H1,
}) => (
  <Nav
    activeLinkColor={colors.dark()}
    defaultMarker="-"
    linkColor={colors.lightContrasting()}
    leftPadding={spacing.medium}
    markerSpacing={spacing.medium}
  >
    <TOCHeadingWrapper>
      <H1>{tocTitle}</H1>
      <HashLink anchor="top">{'\u21c8'}</HashLink>
    </TOCHeadingWrapper>
    <ol>
      {sections.map(({ anchor, title }) => (
        <li key={anchor}>
          <HashLink anchor={anchor}>
            {title}
          </HashLink>
        </li>
      ))}
    </ol>
  </Nav>
);

export default TableOfContents;
