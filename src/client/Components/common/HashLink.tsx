import React, {
  ReactNode,
} from 'react';

import {
  useLocation,
} from 'react-router-dom';

export type HashLinkProps = {
  anchor: string
  innerHTML?: string
  children?: ReactNode
}

export const HashLink: React.FC<HashLinkProps> = ({
  anchor,
  children,
  innerHTML,
}: HashLinkProps) => {
  const { pathname } = useLocation();

  const href = `${pathname}#${anchor}`;

  return innerHTML ? (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <a
      href={href}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    />
  ) : (<a href={href}>{children}</a>);
};

export default HashLink;
