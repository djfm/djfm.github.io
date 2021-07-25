import React from 'react';
import styled from 'styled-components';

import {
  TitledContent,
} from '.';

import HashLink from '../HashLink';

import {
  spacing,
} from '../../theme';

const StyledNav = styled.nav`
  margin-left: ${spacing.small};

  ol {
    display: flex;
    li:not(:first-child) {
      ::before {
        content: '\u00a0-\u00a0';
      }
    }
  }
`;

type SectionNavProps = {
  currentPos: number
  marginBottom: string
  sections: TitledContent[]
  tableOfContentsTopId: string
};

export const SectionNav: React.FC<
  SectionNavProps
> = ({
  currentPos,
  marginBottom,
  sections,
  tableOfContentsTopId,
}) => {
  type LinkTo = {
    anchor: string;
    title: string;
  };

  const itemsToLinkTo = [] as LinkTo[];

  if (currentPos > 0) {
    itemsToLinkTo.push({
      anchor: `${sections[currentPos - 1].anchor}`,
      title: '\u2190\u00a0prec.',
    });
  }

  itemsToLinkTo.push({
    anchor: tableOfContentsTopId,
    title: 'menu',
  });

  if (currentPos < sections.length - 1) {
    itemsToLinkTo.push({
      anchor: `${sections[currentPos + 1].anchor}`,
      title: 'suiv.\u00a0\u2192',
    });
  }

  return (
    <StyledNav>
      <ol style={{ marginBottom }}>
        {itemsToLinkTo.map(({ anchor, title }) => (
          <li key={anchor}>
            <HashLink anchor={anchor}>
              {title}
            </HashLink>
          </li>
        ))}
      </ol>
    </StyledNav>
  );
};

export default SectionNav;
