import React from 'react';

import {
  NavLink,
} from 'react-router-dom';

import { TitledContent } from '.';

import StyledNavVertical from '../StyledNavVertical';

import {
  defaultColorTheme as colors,
} from '../../theme';

type NavProps = {
  parentItem: TitledContent | undefined
  items: TitledContent[]
}

export const Nav: React.FC<NavProps> = ({
  basePathname,
  items,
  parentItem,
}) => {
  const top = parentItem ? (
    <h1>{parentItem.title}</h1>
  ) : null;

  return (
    <StyledNavVertical
      linkColor={colors.dark()}
      activeLinkColor={colors.dark()}
    >
      <ol>
        {items.map((item) => (
          <li key={item.anchor}>
            <Link
              to={`${basePathname}/${item.anchor}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
      {top}
    </StyledNavVertical>
  );
};

export default Nav;
