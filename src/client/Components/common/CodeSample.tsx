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

const trimLeadingWhitespace = (input: unknown): typeof input => {
  if (typeof input !== 'string') {
    return input;
  }

  let lines = input.split('\n');
  let minIndent: number;

  for (const line of lines) {
    const trimmedLine = line.trimLeft();
    const indent = line.length - trimmedLine.length;
    if (line.trim().length > 0 && (minIndent === undefined || indent < minIndent)) {
      minIndent = indent;
    }
  }

  const newLines: string[] = [];

  // remove leading empty lines
  while (lines.length > 0 && lines[0].trim().length === 0) {
    lines = lines.slice(1);
  }

  // trim leading spaces
  for (const line of lines) {
    if (line.length < minIndent) {
      newLines.push('');
    } else {
      newLines.push(line.substr(minIndent).trimRight());
    }
  }

  // remove trailing empty lines
  while (newLines.length > 0 && newLines[newLines.length - 1].trim().length === 0) {
    newLines.pop();
  }

  return newLines.join('\n');
};

export const CodeSample: React.FC<{
  title: string,
  children: unknown,
  language?: string,
  childIsPre?: boolean,
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
          <code>{trimLeadingWhitespace(children)}</code>
        </pre>
      </figure>
    </Wrapper>
  );

  return markup;
};

export default CodeSample;
