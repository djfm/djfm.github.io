import React, {
  Fragment,
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { responsiveSpan } from '../common/ResponsiveUtil';

import HashLink from '../common/HashLink';
import { ContentWithRender, PrevNextMap } from './Content';

import makeHeadingFC from '../common/makeHeadingFC';

export const backToMenuAnchorId = 'menu-top';

const StyledSection = styled.section`
`;

const LinkList = styled.ul`
  margin-bottom: 30px;

  a:active {
    font-weight: bold;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap:wrap;

  > *:first-child {
    font-weight: bold;
  }

  > *:last-child {
    margin: 0;
  }

  margin-bottom: 0;
  & + span {
    display: block;
    margin-bottom: 30px;
  }
`;

type SectionsProps = {
  sections: ContentWithRender[]
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
    { title, anchor, render }: ContentWithRender,
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

      // TODO documenter cette astuce
      const HTag = makeHeadingFC(nestingLevel);

      const tree = (
        <StyledSection id={anchor}>
          <HeadingWrapper>
            <span>
              {sectionIndex + 1}/{sectionCount})&nbsp;
            </span>
            <HTag>
              {title}
            </HTag>
          </HeadingWrapper>
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

    return <Fragment key={`section-${anchor}`}>{render(Section, H1Tag, H2Tag)}</Fragment>;
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
  sections: ContentWithRender[]
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
          >
            {title}
          </HashLink>
        </li>
      ))}
    </LinkList>
  );

  return markup;
};
