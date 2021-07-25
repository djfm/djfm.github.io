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

const TOCHeadingWrapper = styled.div`
  align-items: baseline;
  display: flex;

  /* the heading, probably a h2 but not necessarily */
  > *:first-child {
    font-size: 1em;
  }

  > a {
    font-weight: bold;
    margin-left: ${spacing.small};
  }
`;

const StyledNav = styled.nav`
  ol {
    margin-left: ${spacing.small};
    padding-left: ${spacing.default};

    li {
      position: relative;

      &:not(:last-child) {
        margin-bottom:${spacing.small};
      }

      a::before {
        content: '\u2219';
        left: -${spacing.default};
        position: absolute;
      }

      a.active {
        color: ${colors.dark()};

        ::before {
          content: '\u2605';
        }
      }
    }
  }
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
  <StyledNav>
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
  </StyledNav>
);

export default TableOfContents;
