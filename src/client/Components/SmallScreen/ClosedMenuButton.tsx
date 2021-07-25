import React from 'react';

import {
  WithMenuListener,
} from './Menu';

export const iconSize = 80;
const offset = iconSize / 4;
export const bottom = offset;
export const left = offset;

export const ClosedMenuButton: React.FC<WithMenuListener> = ({
  onMenuToggle,
}) => {
  const handleClick = () => {
    onMenuToggle(true);
  };

  return (
    <input
      alt="ouvrir le menu"
      onClick={handleClick}
      src="/img/closed-menu.svg"
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
