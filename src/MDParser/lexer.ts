export type LexerTokenType =
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
  | 'function-call-arg-name'
  | 'function-call-arg-value'
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
  | 'function-call'
  | 'function-call-arg-value'

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

  if (state === 'function-call') {
    const whiteLine = lineSrc.match(/^\s*$/);
    if (whiteLine) {
      return [[], state];
    }

    const done = lineSrc.match(/^\s*\)/);
    if (done) {
      return skip(done[0].length, 'default');
    }

    const namedArg = lineSrc.match(/^\s*(\w+)\s*=\s*"/);

    if (namedArg) {
      return consume(
        'function-call-arg-name',
        namedArg[1],
        namedArg[0].length,
        'function-call-arg-value',
      );
    }

    const arg = lineSrc.match(/^\s*([^\s)]+)/);
    if (arg) {
      return consume(
        'function-call-arg-value',
        arg[1],
        arg[0].length,
      );
    }

    throw new Error('could not lex function call');
  }

  if (state === 'function-call-arg-value') {
    const val = lineSrc.match(/^([^"]*)+"/);

    if (val) {
      return consume(
        'function-call-arg-value',
        val[1],
        val[0].length,
        'function-call',
      );
    }

    throw new Error('could not lex function arg value');
  }

  if (columnNumber === 0) {
    const mbListInit = lineSrc.match(/^(\s*-\s)[^\s]/);
    if (mbListInit && mbListInit.length % 2 === 0) {
      return consume('list-item-start', mbListInit[1]);
    }

    const leadingWhitespace = lineSrc.match(/^\s*/);
    if (leadingWhitespace[0].length > 0) {
      return skip(leadingWhitespace[0].length);
    }

    if (leadingWhitespace[0].length === lineSrc.length) {
      return consume('empty-line', lineSrc);
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
    const endQuote = lineSrc.indexOf('`', 1);
    if (endQuote === -1) {
      return consume(
        'literal',
        '`',
      );
    }
    const text = lineSrc.slice(1, endQuote);
    return consume(
      'quote',
      text,
      endQuote + 1,
    );
  }

  if (lineSrc.startsWith('@@')) {
    const m = lineSrc.match(/^@@\s*(\w+)\s*(\()?/);
    if (m) {
      const fnValue = m[1];
      const hasArguments = m[2] === '(';
      return consume(
        'function-call',
        fnValue,
        m[0].length,
        hasArguments ? 'function-call' : state,
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
