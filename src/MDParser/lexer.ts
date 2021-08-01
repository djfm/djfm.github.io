type LexerTokenType =
    'literal'
  | 'blockquote-start'
  | 'blockquote-end'
  | 'quote'
  | 'bold'
  | 'idiomatic'
  | 'heading-1'
  | 'heading-2'
  | 'function-call'
  | 'function-call-args'
  | 'function-call-args-name'
  | 'function-call-args-value'

export type LexerToken = {
  type: LexerTokenType
  value: string
  line: number
  column: number
}

type LexerState =
  | 'default'
  | 'blockquote'
  | 'function-call-args'
  | 'quoted-function-call-args-value'

const lexLine = (
  lineNumber: number,
  columnNumber: number,
  state: LexerState,
) => (lineSrc: string): [LexerToken[], LexerState] => {
  const mkToken = (
    type: LexerTokenType,
    value: string,
  ): LexerToken => ({
    type,
    value,
    line: lineNumber,
    column: columnNumber,
  });

  const consume = (
    token: LexerToken,
    columns: number,
    updatedState = state,
  ): [LexerToken[], LexerState] => {
    const [nextTokens, nextState] = lexLine(
      lineNumber,
      columnNumber + columns,
      updatedState,
    )(lineSrc.slice(columns));

    return [
      [token, ...nextTokens],
      nextState,
    ];
  };

  const skip = (
    columns: number,
    updatedState = state,
  ): [LexerToken[], LexerState] =>
    lexLine(
      lineNumber,
      columnNumber + columns,
      updatedState,
    )(lineSrc.slice(columns));

  if (lineSrc.length === 0) {
    return [[], state];
  }

  if (state === 'blockquote') {
    if (lineSrc.startsWith('```')) {
      const quoteEnd = mkToken(
        'blockquote-end',
        '```',
      );

      const [nextTokens, nextState] = consume(
        quoteEnd,
        3,
      );

      return [[
        quoteEnd,
        ...nextTokens,
      ], nextState];
    }

    return [[mkToken('literal', lineSrc)], state];
  }

  if (state === 'function-call-args') {
    if (lineSrc[0] === ')') {
      return skip(1, 'default');
    }

    const ws = lineSrc.match(/^\s+/);
    if (ws) {
      return skip(ws[0].length);
    }

    const namedArg = lineSrc.match(/^\(w+)\s*=\s*"/);
    if (namedArg) {
      return consume(
        mkToken(
          'function-call-args-name',
          namedArg[1],
        ),
        namedArg[0].length,
        'quoted-function-call-args-value',
      );
    }

    const argValue = lineSrc.match(/^([^)\s]+)/);
    if (argValue) {
      return consume(
        mkToken(
          'function-call-args-value',
          argValue[1],
        ),
        argValue[0].length,
      );
    }

    return skip(0, 'default');
  }

  if (state === 'quoted-function-call-args-value') {
    const eat = (str: string, len?: number) =>
      consume(
        mkToken(
          'function-call-args-value',
          str,
        ),
        len || str.length,
      );

    if (lineSrc.startsWith('\\"')) {
      return eat('"', 2);
    }

    if (lineSrc.startsWith('"')) {
      return skip(1, 'function-call-args');
    }

    const escapedQuoteIndex = lineSrc.indexOf('\\"');
    if (escapedQuoteIndex !== -1) {
      return eat(lineSrc.slice(0, escapedQuoteIndex));
    }

    const quoteIndex = lineSrc.indexOf('"');
    if (quoteIndex !== -1) {
      return eat(lineSrc.slice(0, quoteIndex));
    }

    return eat(lineSrc);
  }

  if (lineSrc.startsWith('**')) {
    return consume(mkToken('bold', '**'), 2);
  }

  if (lineSrc.startsWith('*')) {
    return consume(mkToken('idiomatic', '*'), 1);
  }

  if (lineSrc.startsWith('```')) {
    if (columnNumber > 0) {
      return consume(mkToken('literal', '```'), 3);
    }

    const maybeType = lineSrc.slice(3).match(/^\w+/);
    const type = maybeType ? maybeType[0] : 'default';

    return consume(
      mkToken('blockquote-start', type),
      3 + (maybeType ? maybeType[0].length : 0),
      'blockquote',
    );
  }

  if (lineSrc.startsWith('`')) {
    return consume(
      mkToken('quote', '`'),
      1,
    );
  }

  if (lineSrc.startsWith('@@')) {
    const m = lineSrc.match(/^@@(\w+)\s*(\()?/);
    if (m) {
      const fnValue = m[1];
      const hasArguments = m[2] === '(';
      return consume(
        mkToken('function-call', fnValue),
        m[0].length,
        hasArguments ? 'function-call-args' : state,
      );
    }
  }

  const maybeLexHeading = (
    exp: RegExp,
    headingType: LexerTokenType,
  ): [LexerToken[], LexerState] | undefined => {
    if (columnNumber > 0) {
      return undefined;
    }

    if (lineSrc.match(exp)) {
      return consume(
        mkToken(
          headingType,
          lineSrc,
        ),
        lineSrc.length,
      );
    }

    return undefined;
  };

  const mbH1 = maybeLexHeading(/^==+\s*$/, 'heading-1');
  if (mbH1) {
    return mbH1;
  }

  const mbH2 = maybeLexHeading(/^--+\s*$/, 'heading-2');
  if (mbH2) {
    return mbH2;
  }

  const specialChars = ['`', '*', '@'];

  const getLiteralLen = (): number => {
    for (const specialChar of specialChars) {
      const index = lineSrc.indexOf(specialChar);
      if (index > -1) {
        return index;
      }
    }

    return lineSrc.length;
  };

  const litLen = getLiteralLen();

  const literal: LexerToken = mkToken(
    'literal',
    lineSrc.slice(0, litLen),
  );

  return consume(literal, litLen);
};

type ReducerState = {
  state: LexerState
  tokens: LexerToken[]
}

const linesReducer = (
  rst: ReducerState,
  lineSource: string,
  lineNumber: number,
): ReducerState => {
  const [
    tokensOnLine,
    nextState,
  ] = lexLine(
    lineNumber,
    0,
    rst.state,
  )(lineSource);

  const nextRst: ReducerState = {
    state: nextState,
    tokens: rst.tokens.concat(tokensOnLine),
  };

  return nextRst;
};

export const lexer = (input: string): LexerToken[] => {
  const initialRst: ReducerState = {
    state: 'default',
    tokens: [],
  };

  return input.split('\n').reduce(
    linesReducer,
    initialRst,
  ).tokens;
};
