import React from 'react';
import { useLocation } from 'react-router-dom';

export type HashLinkProps = React.PropsWithChildren<{
  anchor: string
}> & React.HTMLProps<HTMLAnchorElement>;

export const HashLink: React.FC<HashLinkProps> = ({
  anchor,
  children,
  className: providedClassName,
  ...props
}) => {
  const { hash } = useLocation();

  const classNames = (providedClassName || '').split(/\s+/g);

  if (hash === `#${anchor}`) {
    classNames.push('active');
  }

  const className = classNames.length > 0
    ? classNames.join(' ')
    : null;

  return (
    <a
      className={className}
      href={`#${anchor}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default HashLink;
