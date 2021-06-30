import React from 'react';

import {
  useDocument,
} from '../common/hooks';

import {
  Article,
  H1,
} from '../common/Styled';

export const TypeNarrowing: React.FC<{
  title: string,
  docTitle?: string,
}> = ({
  title,
  docTitle,
}) => {
  useDocument((document) => {
    document.title = docTitle || title;
  });

  const markup = (
    <Article>
      <H1 id="scroll-transition-anchor">{title}</H1>
    </Article>
  );

  return markup;
};

export default TypeNarrowing;
