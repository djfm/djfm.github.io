import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import hljs from '../../../highlight.js/index';

import {
  parseValueWithUnit,
  trimLeadingWhitespace,
} from '../common/util';

import {
  bp0Max,
  bp1Min,
  bp1Max,
  bp2Min,
} from './Styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 20px;

  > figure {
    max-width: 100%;

    > figcaption {
      max-width: 100%;
    }

    pre {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      max-width: 100%;
      overflow: auto;
    }

    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
`;

const Code = styled.code`
  padding: 2px;
  margin: auto;

  @media(max-width: ${bp0Max}) {
    font-size: 8px;
  }

  @media (min-width: ${bp1Min}) and (max-width: ${bp1Max}) {
    font-size: 10px;
  }

  @media (min-width: ${bp2Min}) {
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
  const readjustDelay = 2000;

  const [isZooming, setIsZooming] = useState(false);
  const [readjustNeeded, setReadjustNeeded] = useState(false);
  const [heightWasFixed, setHeightWasFixed] = useState(false);
  const [latestZoomOperationTime, setLatestZoomOperationTime] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(normalZoom);
  const [initialFontSize, setInitialFontSize] = useState(0);
  const [fontUnit, setFontUnit] = useState('');

  const codeElementRef = useRef(null);
  const preElementRef = useRef(null);

  useEffect(() => {
    // necessary to prevent errors in the SSR code where
    // document is not defined
    if (typeof document !== 'undefined') {
      if (heightWasFixed || !isZooming) {
        return;
      }

      const codeStyle = document.defaultView.getComputedStyle(
        codeElementRef.current,
      );

      if (initialFontSize === 0) {
        const { fontSize } = codeStyle;
        const [domInitialFontSize, domFontUnit] = parseValueWithUnit(fontSize);
        setInitialFontSize(domInitialFontSize);
        setFontUnit(domFontUnit);
      }

      const { height } = document.defaultView.getComputedStyle(preElementRef.current);

      preElementRef.current.style.minHeight = height;
      setHeightWasFixed(true);
    }
  }, [isZooming, heightWasFixed, initialFontSize]);

  useEffect(() => {
    if (readjustNeeded) {
      readjust();
      setReadjustNeeded(false);
    }
  }, [readjustNeeded]);

  useEffect(() => {
    if (latestZoomOperationTime === 0) {
      return undefined;
    }

    const h = setTimeout(() => {
      if (Date.now() > latestZoomOperationTime + readjustDelay) {
        stopZooming();
      }
    }, readjustDelay);

    return () => {
      clearTimeout(h);
    };
  }, [latestZoomOperationTime]);

  const readjust = () => {
    preElementRef.current.style.minHeight = 'auto';
  };

  const handleZoomInputChange = (e: React.BaseSyntheticEvent) => {
    const { value: valueString } = e.target;
    const value = parseInt(valueString, 10);
    setZoomLevel(value);
    setIsZooming(true);
    setLatestZoomOperationTime(Date.now());
  };

  const stopZooming = () => {
    setIsZooming(false);
    setReadjustNeeded(true);
    setHeightWasFixed(false);
    setLatestZoomOperationTime(0);
  };

  const scaleFactor = zoomLevel / normalZoom;
  const fontSize = Math.round(100 * scaleFactor * initialFontSize) / 100;
  const fontSizeWithUnit = `${fontSize}${fontUnit}`;

  const codeStyle = fontSize > 0 ? ({ fontSize: fontSizeWithUnit }) : undefined;

  const highlightedChildren = highlight(language, children);

  const markup = (
    <Wrapper>
      <figure>
        <figcaption>{title}</figcaption>
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
        <div style={{
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '1rem',
        }}
        >
          Zoom:
        </div>
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
