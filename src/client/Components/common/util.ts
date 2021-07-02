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

const makeStringTrimmers = () => {
  type StringTrimmer = (str:string) => ({
    charExtracted: string,
    stringMinusThatChar: string,
  });

  const extractFirst: StringTrimmer = (str:string) =>
    ({ charExtracted: str[0], stringMinusThatChar: str.substr(1) });

  const extractLast: StringTrimmer = (str: string) =>
    ({ charExtracted: str[str.length - 1], stringMinusThatChar: str.substr(0, str.length - 1) });

  const makeTrimmer = (
    trimmer: StringTrimmer,
    predicate: (char: string) => boolean,
  ) => (inputString: string): string => {
    if (inputString.length === 0) {
      return inputString;
    }
    const { charExtracted, stringMinusThatChar } = trimmer(inputString);
    if (predicate(charExtracted)) {
      return makeTrimmer(trimmer, predicate)(stringMinusThatChar);
    }
    return inputString;
  };

  const isWSButNotUnbreakableSpace = (char: string) => {
    if (char[0] !== '\u00a0') {
      return /^\s/m.test(char);
    }

    return false;
  };

  const trimLeft = makeTrimmer(extractFirst, isWSButNotUnbreakableSpace);
  const trimRight = makeTrimmer(extractLast, isWSButNotUnbreakableSpace);

  return {
    trimLeft,
    trimRight,
    trim: (str: string) => trimLeft(trimRight(str)),
  };
};

const trimEndUselessWS = (str: string): string => {
  if (str.length === 0) {
    return str;
  }
  const lastChar = str[str.length - 1];
  if (/\s/.test(lastChar) && lastChar !== '\u00a0') {
    // do not trime non-breaking space (\ua00a0), it must
    // be there for a reason
    return trimEndUselessWS(str.substr(0, str.length - 1));
  }

  return str;
};

export const trimLeadingWhitespace = (input: string): string => {
  let lines = input.split('\n');
  let minIndent: number;

  const {
    trimLeft,
    trimRight,
    trim,
  } = makeStringTrimmers();

  for (const line of lines) {
    const trimmedLine = trimLeft(line);
    const indent = line.length - trimmedLine.length;
    if (trim(line).length > 0 && (minIndent === undefined || indent < minIndent)) {
      minIndent = indent;
    }
  }

  const newLines: string[] = [];

  // remove leading empty lines
  while (lines.length > 0 && trim(lines[0]).length === 0) {
    lines = lines.slice(1);
  }

  // trim leading spaces
  for (const line of lines) {
    if (line.length < minIndent) {
      newLines.push('');
    } else {
      newLines.push(trimRight(line.substr(minIndent)));
    }
  }

  // remove trailing empty lines
  while (newLines.length > 0 && trim(newLines[newLines.length - 1]).length === 0) {
    newLines.pop();
  }

  return newLines.join('\n');
};

export const parseValueWithUnit = (val: string): [number, string] => {
  const [, value, unit] = val.match(/(\d+(?:.\d+))(\w+)/);
  return [parseFloat(value), unit];
};
