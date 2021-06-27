import React from 'react';

import styled from 'styled-components';

import {
  Figure,
  Pre,
} from './Styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: auto;
  max-width: 100%;
  overflow: hidden;
`;

export const CodeSample: React.FC<{
  title: string,
  children: unknown,
  language?: string,
}> = ({
  title,
  children,
  language,
}) => {
  const markup = (
    <Wrapper>
      <Figure>
        <figcaption>{title}</figcaption>
        <Pre className={`language-${language || 'typescript'}`}>
          <code>{children}</code>
        </Pre>
      </Figure>
    </Wrapper>
  );

  return markup;
};

export default CodeSample;
