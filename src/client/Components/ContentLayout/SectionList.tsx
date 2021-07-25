// TODO animate :target

// eslint-disable-next-line react/jsx-filename-extension
import React, {
  ReactElement,
} from 'react';

import {
  makeHeadingFC,
  HeadingFC,
  TitledContent,
} from '.';

import BackToTop from '../BackToTop';
import CenteredRow from '../CenteredRow';
import HashLink from '../HashLink';

export type SectionListProps = {
  tableOfContentsTitle?: ReactElement | string,
  depth: number
  sections: TitledContent[]
}

type SectionProps = TitledContent & {
  depth: number
  navLinks: ReactElement
}

const Section: React.FC<SectionProps> = ({
  anchor,
  depth,
  navLinks,
  title,
  Content,
}) => {
  const SectionHeading = makeHeadingFC(depth);

  const H1 = makeHeadingFC(depth + 1);
  const H2 = makeHeadingFC(depth + 2);

  const Container = ({ children }) => (
    <section>
      <SectionHeading id={anchor}>
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

type TableOfContentsProps = {
  sections: TitledContent[]
  title: ReactElement | string,
  H1: HeadingFC,
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
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
