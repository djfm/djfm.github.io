import React from 'react';

import {
  WithMenuListener,
} from './Menu';

import {
  iconSize,
  bottom,
  left,
} from './ClosedMenuButton';

export const height = iconSize + 2 * bottom;
export { left };

export const ClosedMenuButton: React.FC<WithMenuListener> = ({
  onMenuToggle,
}) => {
  const handleClick = () => {
    onMenuToggle(false);
  };

  return (
    <input
      alt="fermer le menu"
      onClick={handleClick}
      src="/img/opened-menu.svg"
      type="image"
      width={iconSize}
      style={{
        position: 'fixed',
        bottom,
        left,
      }}
    />
  );
};

export default ClosedMenuButton;
