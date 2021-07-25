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

export type SectionListProps = {
  depth: number
  sections: TitledContent[]
}

type SectionProps = TitledContent & {
  depth: number
  navLinks: ReactElement
}

type SectionListLinksProps = {
  sections: TitledContent[]
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

const SectionListLinks: React.FC<SectionListLinksProps> = ({
  sections,
}) => (
  <nav>
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

const createNavLinks: (
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

export const SectionList = ({
  sections,
  depth,
}: SectionListProps): ReactElement => {
  const linkList = <SectionListLinks sections={sections} />;
  const topOfListId = 'menu';

  const body = sections.map((section, i) => (
    <React.Fragment key={section.anchor}>
      <Section
        {...{
          depth,
          navLinks: createNavLinks(sections, topOfListId, i),
          ...section,
        }}
      />
    </React.Fragment>
  ));

  return (
    <>
      <div id={topOfListId}>
        {linkList}
      </div>
      {body}
      <BackToTop anchor={topOfListId} />
    </>
  );
};

export default SectionList;
