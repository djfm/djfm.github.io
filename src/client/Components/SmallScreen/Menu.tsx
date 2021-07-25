import React, {
  useState,
} from 'react';

import styled from 'styled-components';

import {
  TitledContent,
} from '../ContentLayout';

import ClosedMenuButton from './ClosedMenuButton';
import OpenMenu from './OpenedMenu';

import {
  mediumScreenMin,
} from '../../theme';

const SmallScreenOnly = styled.div`
  @media(min-width: ${mediumScreenMin}) {
    display: none;
  }
`;

export type WithMenuListener = {
  onMenuToggle: (isOpen: boolean) => void
}

export type MenuProps = {
  pages: TitledContent[]
} & WithMenuListener

// eslint-disable-next-line arrow-body-style
export const Menu: React.FC<MenuProps> = ({
  pages,
  onMenuToggle,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const enhancedToggle = (open: boolean) => {
    setIsMenuOpen(open);
    onMenuToggle(open);
  };

  if (isMenuOpen) {
    return (
      <SmallScreenOnly>
        <OpenMenu
          onMenuToggle={enhancedToggle}
          pages={pages}
        />
      </SmallScreenOnly>
    );
  }

  return (
    <SmallScreenOnly>
      <ClosedMenuButton onMenuToggle={enhancedToggle} />
    </SmallScreenOnly>
  );
};

export default Menu;
