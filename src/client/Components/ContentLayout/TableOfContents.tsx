import React, {
  ReactElement,
} from 'react';

import {
  HeadingFC,
  TitledContent,
} from '.';

import CenteredRow from '../CenteredRow';

import HashLink from '../HashLink';

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
      <CenteredRow>
        <H1>{tocTitle}</H1>
        <HashLink anchor="top">{'\u21c8'}</HashLink>
      </CenteredRow>
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
