import React from 'react';

export type HashLinkProps = React.PropsWithChildren<{
  anchor: string
}>

export const HashLink: React.FC<HashLinkProps> = ({
  anchor,
  children,
}: HashLinkProps) => <a href={`#${anchor}`}>{children}</a>;

export default HashLink;
