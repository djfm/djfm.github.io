/* eslint-disable import/prefer-default-export */

export const hasOwnProperty = <
  Y extends PropertyKey
>(obj: unknown, prop: Y):
  obj is Record<Y, unknown> =>
    Object
      .prototype
      .hasOwnProperty.call(
        obj,
        prop,
      );

export const buildURL = (
  base: string,
  additionalSegment: string,
): string => {
  if (base[base.length - 1] === '/') {
    return `${base}${additionalSegment}`;
  }

  return `${base}/${additionalSegment}`;
};

export const trimLeadingWhitespace = (input: string): string => {
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

export const parseValueWithUnit = (val: string): [number, string] => {
  const [, value, unit] = val.match(/(\d+(?:.\d+))(\w+)/);
  return [parseFloat(value), unit];
};
