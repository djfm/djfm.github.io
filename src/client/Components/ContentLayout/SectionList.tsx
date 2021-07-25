// TODO animate :target

// eslint-disable-next-line react/jsx-filename-extension
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

import BackToTop from '../BackToTop';
import Section from './Section';
import SectionNav from './SectionNav';
import TableOfContents from './TableOfContents';

export type SectionListProps = {
  tableOfContentsTitle?: ReactElement | string,
  depth: number
  sections: TitledContent[]
}

/**
 * Renders a list of sections with its table
 * of contents.
 */
export const SectionList = ({
  tableOfContentsTitle,
  sections,
  depth,
}: SectionListProps): ReactElement => {
  const H1 = makeHeadingFC(depth);

  const tableOfContents = (
    <TableOfContents
      sections={sections}
      title={tableOfContentsTitle || 'Table des matières'}
      H1={H1}
    />
  );

  const tableOfContentsTopId = 'table-of-contents';

  const navLinksMarginBottom = spacing.headingMargins[depth];

  const body = sections.map((section, i) => (
    <React.Fragment key={section.anchor}>
      <Section
        {...{
          depth,
          navLinks: (
            <SectionNav
              sections={sections}
              tableOfContentsTopId={tableOfContentsTopId}
              currentPos={i}
              marginBottom={navLinksMarginBottom}
            />
          ),
          ...section,
        }}
      />
    </React.Fragment>
  ));

  return (
    <>
      <div id={tableOfContentsTopId}>
        {tableOfContents}
      </div>
      {body}
      <BackToTop anchor={tableOfContentsTopId} />
    </>
  );
};

export default SectionList;
