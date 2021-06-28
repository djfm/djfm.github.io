import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import {
  darkColor,
} from './Styled';

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

const parseValueWithUnit = (val: string): [number, string] => {
  const [, value, unit] = val.match(/(\d+(?:.\d+))(\w+)/);
  return [parseFloat(value), unit];
};

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
          >
            {trimLeadingWhitespace(children)}
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
