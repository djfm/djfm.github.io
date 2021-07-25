import React, {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import {
  spacing,
} from '../../theme';

import {
  HeadingFC,
  TitledContent,
} from '.';

import HashLink from '../HashLink';

const TOCHeadingWrapper = styled.div`
  align-items: center;
  display: flex;

  /* the heading, probably a h2 but not necessarily */
  > *:first-child {
    font-size: 1rem;
  }

  > a {
    font-weight: bold;
    margin-left: ${spacing.small};
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
  <nav>
    {tocTitle && (
      <TOCHeadingWrapper>
        <H1>{tocTitle}</H1>
        <HashLink anchor="top">{'\u21c8'}</HashLink>
      </TOCHeadingWrapper>
    )}
    <ul>
      {sections.map(({ anchor, title }) => (
        <li key={anchor}>
          <HashLink anchor={anchor}>
            {title}
          </HashLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default TableOfContents;
