import React from 'react';

import {
  useLocation,
} from 'react-router-dom';

export type HashLinkProps = {
  innerHTML: string
  anchor: string
}

export const HashLink: React.FC<HashLinkProps> = ({ innerHTML, anchor: target }: HashLinkProps) => {
  const { pathname } = useLocation();

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <a
      href={`${pathname}#${target}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    />
  );
};

export default HashLink;
