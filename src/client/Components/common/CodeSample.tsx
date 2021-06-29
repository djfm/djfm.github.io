import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import {
  hasOwnProperty,
  trimLeadingWhitespace,
  parseValueWithUnit,
} from '../common/util';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 20px;

  > figure {
    max-width: 100%;

    > figcaption {
      max-width: 100%;
      margin: 0 auto;
    }

    pre {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      max-width: 100%;
      overflow: auto;

      code {
        padding: 2px;
      }
    }

    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
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
  const minZoom = 10;
  const normalZoom = 100;
  const maxZoom = 170;
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

  const highlight = (typeof window !== 'undefined')
    ? (childrenAsCode: unknown): typeof childrenAsCode => {
      if (hasOwnProperty(window, 'hljs')) {
        const { hljs } = window;
        if (hasOwnProperty(hljs, 'highlight')) {
          const trimmedText = trimLeadingWhitespace(childrenAsCode);
          if (typeof trimmedText !== 'string' || typeof hljs.highlight !== 'function') {
            return childrenAsCode;
          }
          return hljs.highlight(trimmedText, {
            language: language || 'typescript',
          }).value;
        }
      }
      return childrenAsCode;
    } : (childrenAsCode: unknown): typeof childrenAsCode => childrenAsCode;

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

  const highlightedChildren = highlight(children);

  const [codeProps, codeChildren] = typeof highlightedChildren === 'string' ? (
    [{
      dangerouslySetInnerHTML: {
        __html: highlightedChildren,
      },
    }, null]
  ) : [{}, children];

  const markup = (
    <Wrapper>
      <figure>
        <figcaption>{title}</figcaption>
        <pre
          className={`language-${language || 'typescript'}`}
          ref={preElementRef}
        >
          <code
            ref={codeElementRef}
            style={codeStyle}
            {...codeProps}
          >
            {codeChildren}
          </code>
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
