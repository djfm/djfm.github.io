import React, {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { NavHashLink } from 'react-router-hash-link';

import {
} from '../common/Styled';

export type SectionProps = {
  title: string
  anchor: string
}

type PrevNext = {
  prev?: SectionProps
  next?: SectionProps
}

type PrevNextMap = Map<string, PrevNext>

type SectionRenderer = (tag: React.FC) => ReactElement;

type WrappedSection = SectionProps & {
  render: SectionRenderer
}

export const wrapSection = (
  title: string,
  anchor: string,
  render: SectionRenderer,
): WrappedSection => ({
  title,
  anchor,
  render,
});

type SectionsProps = {
  sections: WrappedSection[]
}

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
      <NavHashLink
        key={direction}
        to={`#${target.anchor}`}
      >
        {direction === 'prev' ? 'précédent' : 'suivant'}
      </NavHashLink>
    );
  };

  return PrevNextLink;
};

const sectionRenderer = (
  prevNext: PrevNextMap,
) => (
  { title, anchor, render }: WrappedSection,
  sectionIndex: number,
): ReactElement => {
  const sectionCount = prevNext.size;

  const backToTopLink = (
    <NavHashLink
      key="back-to-top"
      to="#intro"
    >
      revenir au menu
    </NavHashLink>
  );

  const section: React.FC = ({ children }) => {
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

    const tree = (
      <section key={`section-${anchor}`} id={anchor} className="article-section">
        <h1>
          {sectionIndex + 1}&nbsp;/&nbsp;{sectionCount})&nbsp;
          {titleHTML}
        </h1>
        <div>
          {navLinks}
        </div>
        {children}
      </section>
    );

    return tree;
  };

  return render(section);
};

export const Sections: React.FC<SectionsProps> = ({ sections }: SectionsProps) => {
  const prevNext: PrevNextMap = new Map();

  for (let i = 0; i < sections.length; i += 1) {
    const prev = i > 0 ? sections[i - 1] : undefined;
    const next = i < sections.length - 1 ? sections[i + 1] : undefined;
    prevNext.set(sections[i].anchor, { prev, next });
  }

  return <>{sections.map(sectionRenderer(prevNext))}</>;
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
): ReactElement => (
  <LinkList>
    {sections.map(({ anchor, title }) => (
      <li key={`link-to-${anchor}`}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/no-danger */}
        <NavHashLink
          to={`#${anchor}`}
          dangerouslySetInnerHTML={{ __html: title }}
          activeClassName="active"
        />
      </li>
    ))}
  </LinkList>
);

export default wrapSection;
