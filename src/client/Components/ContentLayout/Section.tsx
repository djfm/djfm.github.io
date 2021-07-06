import React, {
  Fragment,
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { responsiveSpan } from '../common/ResponsiveUtil';

import HashLink from '../common/HashLink';
import { ReadyToRenderContent, PrevNextMap } from './Content';

import makeHeadingFC from '../common/makeHeadingFC';

export const backToMenuAnchorId = 'menu-top';

const StyledSection = styled.section`
  .section-heading {
    margin-bottom: 0;
    & + span {
      display: block;
      margin-bottom: 30px;
    }
  }
`;

const LinkList = styled.ul`
  margin-bottom: 35px;

  a:active {
    font-weight: bold;
  }
`;

type SectionsProps = {
  sections: ReadyToRenderContent[]
  nestingLevel: number
}

const smallSpanSizeStyle = {
  fontSize: '0.8em',
};

const prevLinkBody = responsiveSpan(
  (
    <span style={smallSpanSizeStyle}>
      &lt;&lt;&nbsp;prec.
    </span>
  ),
  (
    <>
      &lt;&lt;&nbsp;précédent
    </>
  ),
);

const nextLinkBody = responsiveSpan(
  (
    <span style={smallSpanSizeStyle}>
      suiv.&nbsp;&gt;&gt;
    </span>
  ),
  (
    <>
      suivant&nbsp;&gt;&gt;
    </>
  ),
);

const upLinkBody = responsiveSpan(
  (
    <span style={smallSpanSizeStyle}>
      menu
    </span>
  ),
  (
    <>
      menu
    </>
  ),
);

const getPrevNextLink = (
  anchor: string,
  prevNext: PrevNextMap,
) => {
  const PrevNextLink = (direction: 'prev' | 'next'): ReactElement => {
    const pn = prevNext.get(anchor);
    if (!pn) {
      return null;
    }

    const target = pn[direction];

    if (!target) {
      return null;
    }

    return (
      <HashLink
        key={direction}
        anchor={target.anchor}
      >
        {direction === 'prev' ? prevLinkBody : nextLinkBody}
      </HashLink>
    );
  };

  return PrevNextLink;
};

const backToTopLink = (
  <HashLink
    key="back-to-top"
    anchor={backToMenuAnchorId}
  >
    {upLinkBody}
  </HashLink>
);

const sectionRenderer = (
  prevNext: PrevNextMap,
  nestingLevel: number,
) => {
  const SectionWithHeaderAndNavLinks = (
    { title, anchor, render }: ReadyToRenderContent,
    sectionIndex: number,
  ): ReactElement => {
    const sectionCount = prevNext.size;

    const Section: React.FC = ({ children }) => {
      const getLink = getPrevNextLink(anchor, prevNext);

      const navLinks = [
        getLink('prev'),
        sectionIndex > 0 && backToTopLink,
        getLink('next'),
      ].filter(Boolean).reduce((elts, next, index) => {
        if (index === 0) {
          return [next];
        }
        return elts.concat('\u00a0-\u00a0', next);
      }, []);

      // eslint-disable-next-line react/no-danger
      const titleHTML = <span dangerouslySetInnerHTML={{ __html: title }} />;

      // TODO documenter cette astuce
      const HTag = `h${nestingLevel}` as keyof JSX.IntrinsicElements;

      const tree = (
        <StyledSection id={anchor}>
          <HTag className="section-heading">
            {sectionIndex + 1}&nbsp;/&nbsp;{sectionCount})&nbsp;
            {titleHTML}
          </HTag>
          <span>
            {navLinks}
          </span>
          {children}
        </StyledSection>
      );

      return tree;
    };

    const H1Tag = makeHeadingFC(nestingLevel + 1);
    const H2Tag = makeHeadingFC(nestingLevel + 2);

    return <Fragment key={title}>{render(Section, H1Tag, H2Tag)}</Fragment>;
  };

  return SectionWithHeaderAndNavLinks;
};

export const Sections: React.FC<SectionsProps> = ({
  sections,
  nestingLevel,
}: SectionsProps) => {
  const prevNext: PrevNextMap = new Map();

  for (let i = 0; i < sections.length; i += 1) {
    const prev = i > 0 ? sections[i - 1] : undefined;
    const next = i < sections.length - 1 ? sections[i + 1] : undefined;
    prevNext.set(sections[i].anchor, { prev, next });
  }

  const renderSection = sectionRenderer(
    prevNext,
    nestingLevel,
  );

  return <>{sections.map(renderSection)}</>;
};

type SectionLinksProps = {
  sections: ReadyToRenderContent[]
}
export const SectionLinks: React.FC<SectionLinksProps> = (
  { sections }: SectionLinksProps,
): ReactElement => {
  const markup = (
    <LinkList>
      {sections.map(({ anchor, title }) => (
        <li key={`intra-page-link-to-${anchor}`}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/no-danger */}
          <HashLink
            anchor={anchor}
            innerHTML={title}
          />
        </li>
      ))}
    </LinkList>
  );

  return markup;
};
