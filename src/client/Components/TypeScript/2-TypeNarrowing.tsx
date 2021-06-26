import React from 'react';

import {
  Article,
  H1,
} from '../common/Styled';

export const TypeNarrowing: React.FC<{
  title: string,
}> = ({
  title,
}) => {
  const markup = (
    <Article>
      <H1>{title}</H1>
    </Article>
  );

  return markup;
};

export default TypeNarrowing;
