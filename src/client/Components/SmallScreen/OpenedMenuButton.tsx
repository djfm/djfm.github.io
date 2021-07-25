import React from 'react';

import {
  WithMenuListener,
} from './Menu';

import {
  iconSize,
  bottom,
  left,
} from './ClosedMenuButton';

const size = (3 * iconSize) / 5;
const bPos = (5 * bottom) / 3;
const lPos = (5 * left) / 3;

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
      width={size}
      style={{
        position: 'fixed',
        bottom: bPos,
        left: lPos,
      }}
    />
  );
};

export default ClosedMenuButton;
