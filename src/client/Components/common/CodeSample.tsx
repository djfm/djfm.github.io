import React, {
  useState,
  useEffect,
  useRef,
  BaseSyntheticEvent,
} from 'react';

import styled from 'styled-components';

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
      flex-direction: row;
      justify-content: center;
      align-items: center;

      max-width: 100%;
      overflow: auto;

      code {
        width: fit-content;
      }
    }

    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
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
  const minZoom = 30;
  const maxZoom = 100;

  const [zoomLevel, setZoomLevel] = useState(maxZoom);
  const [initialFontSize, setInitialFontSize] = useState(0);
  const [fontUnit, setFontUnit] = useState('');
  const codeElementRef = useRef(null);

  useEffect(() => {
    // necessary to prevent errors in the SSR code where
    // document is not defined
    if (typeof document !== 'undefined') {
      const { fontSize } = document.defaultView.getComputedStyle(codeElementRef.current);
      const [, value, unit] = fontSize.match(/(\d+(?:.\d+))(\w+)/);
      setInitialFontSize(parseFloat(value));
      setFontUnit(unit);
    }
  }, []);

  const updateZoomLevel = (e: BaseSyntheticEvent) => {
    const { value: valueString } = e.target;
    const value = parseInt(valueString, 10);
    setZoomLevel(value);
  };

  const scaleFactor = zoomLevel / maxZoom;
  const fontSize = Math.round(100 * scaleFactor * initialFontSize) / 100;
  const fontSizeWithUnit = `${fontSize}${fontUnit}`;

  const style = fontSize > 0 ? ({ fontSize: fontSizeWithUnit }) : undefined;

  const markup = (
    <Wrapper>
      <figure>
        <figcaption>{title}</figcaption>
        <pre className={`language-${language || 'typescript'}`}>
          <code
            ref={codeElementRef}
            style={style}
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
          onChange={updateZoomLevel}
        />
      </label>
    </Wrapper>
  );

  return markup;
};

export default CodeSample;
