import React, {
  Fragment,
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { responsiveSpan } from './ResponsiveUtil';

import HashLink from './HashLink';

export const backToMenuAnchorId = 'menu-top';

export type SectionProps = {
  title: string
  anchor: string
}

type PrevNext = {
  prev?: SectionProps
  next?: SectionProps
}

type PrevNextMap = Map<string, PrevNext>

type Renderer = (tag: React.FC) => ReactElement;

export type WrappedSection = SectionProps & {
  render: Renderer
}

export const wrapSection = (
  title: string,
  anchor: string,
  render: Renderer,
): WrappedSection => ({
  title,
  anchor,
  render,
});

type SectionsProps = {
  sections: WrappedSection[]
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
    { title, anchor, render }: WrappedSection,
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

      // TODO documenter cette ast  uce
      const HTag = styled(`h${nestingLevel}` as keyof JSX.IntrinsicElements)`
        margin-bottom: 0;
        + span {
          margin-bottom: 15px;
        }
      `;

      const tree = (
        <section id={anchor} className="article-section">
          <HTag>
            {sectionIndex + 1}&nbsp;/&nbsp;{sectionCount})&nbsp;
            {titleHTML}
          </HTag>
          <span>
            {navLinks}
          </span><br />
          {children}
        </section>
      );

      return tree;
    };

    return <Fragment key={title}>{render(Section)}</Fragment>;
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

const LinkList = styled.ul`
  a:active {
    font-weight: bold;
  }
`;

type SectionLinksProps = {
  sections: WrappedSection[]
}
export const SectionLinks: React.FC<SectionLinksProps> = (
  { sections }: SectionLinksProps,
): ReactElement => {
  const markup = (
    <LinkList>
      {sections.map(({ anchor, title }) => (
        <li key={`link-to-${anchor}`}>
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

export default wrapSection;
