import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  > figure {
    max-width: 100%;

    > figcaption {
      max-width: 100%;
      margin: 0 auto;
    }

    pre {
      max-width: 100%;
      overflow: scroll;
    }

    margin-left: 0;
    margin-right: 0;
  }
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
      <figure>
        <figcaption>{title}</figcaption>
        <pre className={`language-${language || 'typescript'}`}>
          <code>{children}</code>
        </pre>
      </figure>
    </Wrapper>
  );

  return markup;
};

export default CodeSample;
