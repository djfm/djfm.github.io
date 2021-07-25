import React, {
  useState,
} from 'react';

import {
  TitledContent,
} from '../ContentLayout';

import ClosedMenuButton from './ClosedMenuButton';
import OpenMenu from './OpenedMenu';

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
      <OpenMenu
        onMenuToggle={enhancedToggle}
        pages={pages}
      />
    );
  }

  return <ClosedMenuButton onMenuToggle={enhancedToggle} />;
};

export default Menu;
