import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import {
} from '../common/Styled';

import HashLink from './HashLink';

export const backToTopAnchorId = 'menu-top';

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
        innerHTML={direction === 'prev' ? 'précédent' : 'suivant'}
      />
    );
  };

  return PrevNextLink;
};

const backToTopLink = (
  <HashLink
    key="back-to-top"
    anchor={backToTopAnchorId}
    innerHTML="revenir au menu"
  />
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

      // TODO documenter cette astuce
      const HTag = `h${nestingLevel}` as keyof JSX.IntrinsicElements;

      const tree = (
        <section id={anchor} className="article-section">
          <HTag>
            {sectionIndex + 1}&nbsp;/&nbsp;{sectionCount})&nbsp;
            {titleHTML}
          </HTag>
          <div>
            {navLinks}
          </div>
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

const findParentH1 = (e: HTMLElement): HTMLElement => {
  const maybeH1 = e.querySelector('h1');
  if (maybeH1) {
    return maybeH1;
  }

  if (e === document.body) {
    return undefined;
  }

  return findParentH1(e.parentElement);
};

type SectionLinksProps = {
  sections: WrappedSection[]
}
export const SectionLinks: React.FC<SectionLinksProps> = (
  { sections }: SectionLinksProps,
): ReactElement => {
  const linkListRef = useRef<HTMLUListElement>();
  const chosenAnchorElt = useRef<HTMLElement>();

  useEffect(() => {
    // exit immediately for SSR if doc undefined
    if (typeof document === 'undefined') {
      return undefined;
    }
    const pickAnchorElt = () => {
      const { current } = linkListRef;
      const anchorElt = (
        current
          ? (findParentH1(current) || current)
          : document.body.querySelector('h1')
      ) || document.body;
      return anchorElt;
    };

    const currentAnchorElt = document.getElementById(backToTopAnchorId);
    const preferredAnchorElt = pickAnchorElt();

    // TODO Manage this mess of a state with Redux

    // if the element marked as a target for the menu
    // is not the one we would have chosen,
    // replace it
    if (currentAnchorElt !== preferredAnchorElt) {
      if (currentAnchorElt) {
        currentAnchorElt.id = '';
      }
      preferredAnchorElt.id = backToTopAnchorId;
      chosenAnchorElt.current = preferredAnchorElt;
    }

    // upon unloading, remove the id we have set,
    // in case the next page sets it directly
    // during rendering
    return () => {
      if (chosenAnchorElt.current) {
        chosenAnchorElt.current.id = '';
      }
    };
  });

  const markup = (
    <LinkList ref={linkListRef}>
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
