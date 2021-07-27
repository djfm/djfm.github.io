import React, {
  useState,
} from 'react';

import styled from 'styled-components';

import hljs from '../../highlight.js/index';

import {
  trimLeadingWhitespace,
} from '../util';

import {
  defaultColorTheme as colors,
  mediumScreenMin,
  smallScreenMin,
  smallScreenMax,
  spacing,
  tinyScreenMax,
} from '../theme';

const Wrapper = styled.div`
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.large};

  > figure {
    max-width: 100%;

    > figcaption {
      font-size: ${spacing.default};
      font-weight: bold;
      margin-bottom: ${spacing.tiny};
    }

    > pre {
      display: flex;
      overflow: auto;

      > code {
        margin: 0;
        flex-grow: 1;
      }
    }
  }
`;

const Code = styled.code`
  padding: ${spacing.small};
  margin: 0;

  @media(max-width: ${tinyScreenMax}) {
    font-size: ${spacing.small};
  }

  @media (min-width: ${smallScreenMin}) and (max-width: ${smallScreenMax}) {
    font-size: ${spacing.default};
  }

  @media (min-width: ${mediumScreenMin}) {
    font-size: ${spacing.medium};
  }
`;

const highlight = (language: string, sourceCode: string): string => {
  const trimmedText = trimLeadingWhitespace(sourceCode);
  if (typeof trimmedText !== 'string') {
    return sourceCode;
  }
  return hljs.highlight(trimmedText, {
    language: language || 'typescript',
  }).value;
};

const minZoom = 100;
const normalZoom = 200;
const maxZoom = 400;

const minScale = 0.5;
const normalScale = 1;
const maxScale = 2;

const round2 = (n: number): number => Math.round(n * 100) / 100;

const getScaleFactor = (zoom: number): number => {
  if (zoom > normalZoom) {
    return ((maxScale - normalScale)
            * ((zoom - normalZoom)
                / (maxZoom - normalZoom)))
                    + normalScale;
  }

  return ((normalScale - minScale)
          * ((zoom - minZoom)
              / (normalZoom - minZoom)))
                + minScale;
};

export const CodeSample: React.FC<{
  title: string,
  children: string,
  language?: string,
}> = ({
  title,
  children,
  language,
}) => {
  const [zoomLevel, setZoomLevel] = useState(normalZoom);

  const preFontSize = 15;
  const scaleFactor = getScaleFactor(zoomLevel);

  console.log(
    'setting "pre" font size to',
    `${round2(preFontSize * scaleFactor)}px`,
    { scaleFactor, zoomLevel },
  );

  const handleZoomInputChange = (e: React.BaseSyntheticEvent) => {
    const { value: valueString } = e.target;
    const value = parseInt(valueString, 10);
    setZoomLevel(value);
  };

  const highlightedChildren = highlight(language, children);

  const markup = (
    <Wrapper>
      <figure>
        <figcaption>{title}&nbsp;:</figcaption>
        <pre
          style={{
            fontSize: `${round2(preFontSize * scaleFactor)}px`,
          }}
        >
          <Code
            className="hljs no-highlight"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: highlightedChildren,
            }}
          />
        </pre>
      </figure>
      <fieldset
        style={{
          alignItems: 'stretch',
          borderColor: colors.border(),
          color: colors.dark(),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: spacing.tiny,
          padding: spacing.tiny,
        }}
      >
        <legend
          style={{
            fontSize: spacing.small,
          }}
        >
          Zoomez ou dé-zoomez l&apos;exemple avec la commande ci-dessous&nbsp;:
        </legend>
        <input
          max={maxZoom}
          min={minZoom}
          onChange={handleZoomInputChange}
          type="range"
          value={zoomLevel}
        />
      </fieldset>
    </Wrapper>
  );

  return markup;
};

export default CodeSample;
