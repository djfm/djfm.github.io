type LexerTokenType =
    'literal'
  | 'blockquote-start'
  | 'blockquote-end'
  | 'quote'
  | 'bold'
  | 'idiomatic'
  | 'bold-idiomatic-close'
  | 'heading-1'
  | 'heading-2'
  | 'function-call'
  | 'function-call-args'
  | 'function-call-args-name'
  | 'function-call-args-value'
  | 'empty-line'
  | 'list-item-start'

export type Pos = {
  line: number
  column: number
}

export type LexerToken = {
  type: LexerTokenType
  value: string
  start: Pos
  end: Pos
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
  const createToken = (
    type: LexerTokenType,
    value: string,
    length = value.length,
  ): LexerToken => ({
    type,
    value,
    start: {
      line: lineNumber,
      column: columnNumber,
    },
    end: {
      line: lineNumber,
      column: columnNumber + length,
    },
  });

  const consumeAndLexRest = (
    token: LexerToken,
    columns: number,
    updatedState = state,
  ): [LexerToken[], LexerState] => {
    const sourceLeft = lineSrc.slice(columns);

    if (sourceLeft.length === 0) {
      return [[token], updatedState];
    }

    const [nextTokens, nextState] = lexLine(
      lineNumber,
      columnNumber + columns,
      updatedState,
    )(sourceLeft);

    return [
      [token, ...nextTokens],
      nextState,
    ];
  };

  const consume = (
    type: LexerTokenType,
    value: string,
    columnsUsed = value.length,
    nextState = state,
  ) => consumeAndLexRest(
    createToken(type, value, columnsUsed),
    columnsUsed,
    nextState,
  );

  const skip = (
    columns: number,
    updatedState = state,
  ): [LexerToken[], LexerState] =>
    lexLine(
      lineNumber,
      columnNumber + columns,
      updatedState,
    )(lineSrc.slice(columns));

  const empty = lineSrc.match(/^\s*$/);
  if (empty) {
    return [[createToken('empty-line', empty[0], empty[0].length)], state];
  }

  if (state === 'blockquote') {
    if (lineSrc.startsWith('```')) {
      return consume(
        'blockquote-end',
        '```',
        3,
        'default',
      );
    }

    return consume('literal', lineSrc);
  }

  if (state === 'function-call-args') {
    if (lineSrc[0] === ')') {
      return skip(1);
    }

    const ws = lineSrc.match(/^\s+/);
    if (ws) {
      return skip(ws[0].length);
    }

    const namedArg = lineSrc.match(/^(\w+)\s*=\s*"/);
    if (namedArg) {
      return consume(
        'function-call-args-name',
        namedArg[1],
        namedArg[0].length,
        'quoted-function-call-args-value',
      );
    }

    const argValue = lineSrc.match(/^([^)\s$]+)/);
    if (argValue) {
      return consume(
        'function-call-args-value',
        argValue[1],
        argValue[0].length,
      );
    }

    return skip(0, 'default');
  }

  if (state === 'quoted-function-call-args-value') {
    const eat = (str: string, len?: number) =>
      consume(
        'function-call-args-value',
        str,
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

  if (columnNumber === 0) {
    const init = lineSrc.match(/^(\s*[-*>]\s)[^s]/);
    if (init && init.length % 2 === 0) {
      return consume('list-item-start', init[1]);
    }
  }

  if (lineSrc.startsWith('***')) {
    return consume('bold-idiomatic-close', '***');
  }

  if (lineSrc.startsWith('**')) {
    return consume('bold', '**');
  }

  if (lineSrc.startsWith('*')) {
    return consume('idiomatic', '*');
  }

  if (lineSrc.startsWith('```')) {
    if (columnNumber > 0) {
      return consume('literal', '```');
    }

    const maybeType = lineSrc.slice(3).match(/^\w+/);
    const type = maybeType ? maybeType[0] : 'default';
    const length = 3 + (maybeType ? maybeType[0].length : 0);

    return consume(
      'blockquote-start',
      type,
      length,
      'blockquote',
    );
  }

  if (lineSrc.startsWith('`')) {
    return consume(
      'quote',
      '`',
    );
  }

  if (lineSrc.startsWith('@@')) {
    const m = lineSrc.match(/^@@(\w+)\s*(\()?/);
    if (m) {
      const fnValue = m[1];
      const hasArguments = m[2] === '(';
      return consume(
        'function-call',
        fnValue,
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
        headingType,
        lineSrc,
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

  const specialChars = ['`', '*', '@@'];

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

  return consume(
    'literal',
    lineSrc.slice(0, litLen),
  );
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
    lineNumber + 1,
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
