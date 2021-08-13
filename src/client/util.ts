type WithAnchor = {
  anchor: string
}

// TODO remove
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

export const hasProperties = <
  Keys extends PropertyKey[],
  T extends Record<PropertyKey, unknown>,
> (
    obj: T,
    ...props: Keys
  ): obj is {
    [k in typeof props[number]]: typeof obj[k]
  } => {
  for (const prop of props) {
    if (!Object.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
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

  const isBreakableWSChar = (char: string) => char[0] !== '\u00a0' && /\s/.test(char);

  const trimLeft = makeTrimmer(extractFirst, isBreakableWSChar);
  const trimRight = makeTrimmer(extractLast, isBreakableWSChar);

  return {
    trimLeft,
    trimRight,
    trim: (str: string) => trimLeft(trimRight(str)),
  };
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
  const [, value, unit] = val.match(/^(\d*(?:.\d+)?)(\w+)/);
  return [parseFloat(value), unit];
};

export const sortByAnchorForRouterSwitch = <T extends WithAnchor>(
  items: T[],
): T[] =>
    // sort the items by decreasing alphabetical order so that
    // the longest routes are displayed first and we reduce
    // the chance of a <Route> matching too early
    //
    // e.g. if we have two pages:
    // - A with url "/a/b"
    // - B with url "/a"
    //
    // if we had:
    //
    // <Route path="/a"><A /></Route>
    // <Route path="/a/b"><B /></Route>
    //
    // then on the "a/b" url component A would be rendered
    // unless we added the "exact" prop to the first route
    //
    // but I do not wanna do that because I may use nested URLs
    // that need to be rendered by their parent, e.g. maybe
    // "a/c" should be rendered by A
    // -- with this sort order, it will
    items.slice().sort(
      (
        { anchor: a },
        { anchor: b },
      ) => (a < b ? 1 : -1),
    );

export const runBinOpWithUnits = (
  aWithUnit: string,
  bWithUnit: string,
  op: (a: number, b: number) => number,
): string => {
  const [a, aUnit] = parseValueWithUnit(aWithUnit);
  const [b, bUnit] = parseValueWithUnit(bWithUnit);

  if (aUnit !== bUnit) {
    throw new Error(`Cannot apply "${op.name}" operator to units "${aUnit}" and "${bUnit}"`);
  }

  return `${op(a, b)}${aUnit}`;
};
