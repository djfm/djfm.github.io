import React from 'react';

import {
  useLocation,
} from 'react-router-dom';

export type HashLinkProps = React.PropsWithChildren<{
  anchor: string
}>

export const HashLink: React.FC<HashLinkProps> = ({
  anchor,
  children,
}: HashLinkProps) => {
  const { pathname } = useLocation();
  console.log(pathname);

  return <a href={`#${anchor}`}>{children}</a>;
};

export default HashLink;
