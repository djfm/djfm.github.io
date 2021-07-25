import React, {
  ReactNode,
} from 'react';

import {
  useLocation,
} from 'react-router-dom';

export type HashLinkProps = {
  anchor: string
  children: ReactNode
}

export const HashLink: React.FC<HashLinkProps> = ({
  anchor,
  children,
}: HashLinkProps) => {
  const { pathname } = useLocation();

  const href = `${pathname}#${anchor}`;

  return <a href={href}>{children}</a>;
};

export default HashLink;
