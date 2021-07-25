import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import hljs from '../../highlight.js/index';

import {
  parseValueWithUnit,
  trimLeadingWhitespace,
} from '../../util';

import {
  tinyScreenMax,
  smallScreenMin,
  smallScreenMax,
  mediumScreenMin,
} from '../../theme';

const Wrapper = styled.div`
  margin-bottom: 20px;

  > figure {
    max-width: 100%;

    > figcaption {
      font-weight: bold;
    }

    > pre {
      display: flex;
      overflow: auto;

      > code {
        margin: 0;
        flex-grow: 1;
      }
    }

    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
`;

const Code = styled.code`
  padding: 10px;
  margin: 0;

  @media(max-width: ${tinyScreenMax}) {
    font-size: 8px;
  }

  @media (min-width: ${smallScreenMin}) and (max-width: ${smallScreenMax}) {
    font-size: 10px;
  }

  @media (min-width: ${mediumScreenMin}) {
    font-size: 19px;
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

export const CodeSample: React.FC<{
  title: string,
  children: string,
  language?: string,
}> = ({
  title,
  children,
  language,
}) => {
  const minZoom = 10;
  const normalZoom = 100;
  const maxZoom = 200;

  const [zoomLevel, setZoomLevel] = useState(normalZoom);
  const [initialFontSize, setInitialFontSize] = useState(0);
  const [fontUnit, setFontUnit] = useState('');

  const codeElementRef = useRef(null);
  const preElementRef = useRef(null);

  useEffect(() => {
    // necessary to prevent errors in the SSR code where
    // document is not defined
    if (
      typeof document !== 'undefined'
        && initialFontSize === 0
    ) {
      const codeStyle = document.defaultView.getComputedStyle(
        codeElementRef.current,
      );

      const { fontSize } = codeStyle;
      const [domInitialFontSize, domFontUnit] = parseValueWithUnit(fontSize);
      setInitialFontSize(domInitialFontSize);
      setFontUnit(domFontUnit);
    }
  }, [initialFontSize]);

  const handleZoomInputChange = (e: React.BaseSyntheticEvent) => {
    const { value: valueString } = e.target;
    const value = parseInt(valueString, 10);
    setZoomLevel(value);
  };

  const scaleFactor = zoomLevel / normalZoom;
  const fontSize = Math.round(100 * scaleFactor * initialFontSize) / 100;
  const fontSizeWithUnit = `${fontSize}${fontUnit}`;

  const codeStyle = fontSize > 0 ? ({ fontSize: fontSizeWithUnit }) : undefined;

  const highlightedChildren = highlight(language, children);

  const markup = (
    <Wrapper>
      <figure>
        <figcaption>{title}&nbsp;:</figcaption>
        <pre ref={preElementRef}>
          <Code
            className="hljs no-highlight"
            ref={codeElementRef}
            style={codeStyle}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: highlightedChildren,
            }}
          />
        </pre>
      </figure>
      <label>
        <span style={{
          display: 'block',
          textAlign: 'left',
          fontFamily: 'monospace',
          fontSize: '1rem',
          marginLeft: '10px',
        }}
        >
          Zoom&nbsp;:
        </span>
        <input
          type="range"
          min={minZoom}
          max={maxZoom}
          value={zoomLevel}
          onChange={handleZoomInputChange}
        />
      </label>
    </Wrapper>
  );

  return markup;
};

export default CodeSample;
