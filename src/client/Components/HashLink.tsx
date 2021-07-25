import React from 'react';
import { useLocation } from 'react-router-dom';

export type HashLinkProps = React.PropsWithChildren<{
  anchor: string
}>

export const HashLink: React.FC<HashLinkProps> = ({
  anchor,
  children,
}: HashLinkProps) => {
  const { hash } = useLocation();

  const className = hash === `#${anchor}`
    ? 'active'
    : null;

  return (
    <a
      className={className}
      href={`#${anchor}`}
    >
      {children}
    </a>
  );
};

export default HashLink;
