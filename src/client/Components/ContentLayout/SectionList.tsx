// TODO animate :target

// eslint-disable-next-line react/jsx-filename-extension
import React, {
  ReactElement,
} from 'react';

import {
  makeHeadingFC,
  TitledContent,
} from '.';

import BackToTop from '../BackToTop';
import HashLink from '../HashLink';
import Section from './Section';
import TableOfContents from './TableOfContents';

export type SectionListProps = {
  tableOfContentsTitle?: ReactElement | string,
  depth: number
  sections: TitledContent[]
}

/**
 * Function that creates the links below each
 * section's header
 */
const createSectionNavLinks: (
  sections: TitledContent[],
  topOfLinkListId: string,
  currentPos: number,
) => ReactElement = (
  sections,
  backToTopAnchor,
  currentPos,
) => {
  type LinkTo = {
    anchor: string
    title: string
  }

  const itemsToLinkTo = [] as LinkTo[];

  if (currentPos > 0) {
    itemsToLinkTo.push({
      anchor: `${sections[currentPos - 1].anchor}`,
      title: 'prec.',
    });
  }

  itemsToLinkTo.push({
    anchor: backToTopAnchor,
    title: 'menu',
  });

  if (currentPos < sections.length - 1) {
    itemsToLinkTo.push({
      anchor: `${sections[currentPos + 1].anchor}`,
      title: 'suiv.',
    });
  }

  return (
    <nav>
      <ul>
        {itemsToLinkTo.map(({ anchor, title }) => (
          <li key={anchor}>
            <HashLink anchor={anchor}>
              {title}
            </HashLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

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

  const body = sections.map((section, i) => (
    <React.Fragment key={section.anchor}>
      <Section
        {...{
          depth,
          navLinks: createSectionNavLinks(
            sections,
            tableOfContentsTopId,
            i,
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
