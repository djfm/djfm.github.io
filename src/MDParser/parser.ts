import {
  lexer,
  LexerToken,
  LexerTokenType,
  Pos,
} from './lexer';

const openerClosers: readonly string[] = [
  'quote',
  'bold',
  'idiomatic',
] as const;

type MarkdownNodeType =
 | 'blockquote'
 | 'literal'
 | 'heading'
 | 'function-call'
 | 'paragraph'
 | 'section'
 | 'document'
 | 'list'
 | 'list-item'
 | typeof openerClosers[number]

export type MarkdownNode = {
  type: MarkdownNodeType
  value?: string
  children?: MarkdownNode[]
  props?: Record<string, string | number>
  start: Pos
  end: Pos
  state?: ParserState
}

type ParserState = {
  idiomatic: boolean
  bold: boolean
}

type Parser = (tokens: LexerToken[], state: ParserState) => [
  MarkdownNode[],
  LexerToken[],
  ParserState
]

type ParserTransformer = (...p: Parser[]) => Parser

type TokenPredicate =
  LexerTokenType
  | ((token: LexerToken) => boolean)

const fail = (token: LexerToken | MarkdownNode | undefined, ...msgParts: string[]): never => {
  const msg = token
    ? msgParts.concat(
      'at', `"${token.value}"`,
      `${token.start.line}:${token.start.column}`,
      '-',
      `${token.end.line}:${token.end.column}`,
    ).join(' ')
    : msgParts.concat('at end of input').join(' ');
  throw new Error(msg);
};

const match = (p: TokenPredicate) => (token: LexerToken) => {
  if (typeof p === 'string') {
    return token.type === p;
  }

  return p(token);
};

const skip = (
  tokens: LexerToken[],
  p: TokenPredicate,
): LexerToken[] => {
  if (tokens.length === 0) {
    return [];
  }

  const [token, ...nextTokens] = tokens;

  if (match(p)(token)) {
    return skip(nextTokens, p);
  }

  return tokens;
};

const splitUntil = (
  tokens: LexerToken[],
  p: TokenPredicate,
): [LexerToken[], LexerToken[]] => {
  if (tokens.length === 0) {
    return [[], []];
  }

  if (match(p)(tokens[0])) {
    return [[], tokens];
  }

  const [splat, rest] = splitUntil(tokens.slice(1), p);
  return [[tokens[0], ...splat], rest];
};

const parseMany: ParserTransformer = (
  parser: Parser,
) => {
  const manyParser: Parser = (
    tokens,
    state,
  ) => {
    if (tokens.length === 0) {
      return [[], [], state];
    }
    const [nodes, remainingTokens, newState] = parser(tokens, state);
    if ((remainingTokens.length === 0 || nodes.length === 0)
          && (newState === state)) {
      return [nodes, remainingTokens, newState];
    }
    const then = parseMany(parser)(remainingTokens, newState);
    return [nodes.concat(then[0]), then[1], then[2]];
  };

  Object.defineProperty(manyParser, 'name', {
    value: `many(${parser.name})`,
  });

  return manyParser;
};

const parseSequence: ParserTransformer = (a: Parser, b: Parser) => {
  const sequenceParser: Parser = (
    tokens,
    state,
  ) => {
    const [aNodes, nextTokens, newState] = a(tokens, state);
    if (aNodes.length === 0 && newState === state) {
      return [[], tokens, state];
    }
    const [bNodes, restTokens, finalState] = b(nextTokens, newState);
    if (bNodes.length === 0 && finalState === newState) {
      return [[], tokens, state];
    }
    return [aNodes.concat(bNodes), restTokens, finalState];
  };

  Object.defineProperty(sequenceParser, 'name', {
    value: `sequence(${a.name}, ${b.name})`,
  });

  return sequenceParser;
};

const parseEither: ParserTransformer = (...parsers: Parser[]) => {
  const eitherParser: Parser = (tokens, state) => {
    for (const parser of parsers) {
      const [
        nodes,
        remainingTokens,
        newState,
      ] = parser(tokens, state);

      if (nodes.length > 0 || newState !== state) {
        return [nodes, remainingTokens, newState];
      }
    }
    return [[], tokens, state];
  };

  Object.defineProperty(eitherParser, 'name', {
    value: `either(${parsers.map((p) => p.name).join(', ')})`,
  });

  return eitherParser;
};

const parseParagraph: Parser = (tokens, state) => {
  const [
    children,
    nextTokens,
    newState,
  ] = parseMany(parseText)(
    skip(tokens, 'empty-line'),
    state,
  );

  if (children.length === 0) {
    return [[], tokens, state];
  }

  const next = skip(nextTokens, 'empty-line');

  if (
    next.length > 0
    && next[0].type.startsWith('heading-')
  ) {
    return [[], tokens, state];
  }

  return [[{
    type: 'paragraph',
    children,
    start: tokens[0].start,
    end: children[children.length - 1].end,
  }], next, newState];
};

const parseListItem: (level: number) => Parser = (level) => {
  const getIndent = (token: LexerToken): number => {
    if (token.type === 'list-item-start') {
      return (token.value.length - 2) / 2 + 1;
    }
    if (token.type === 'empty-line') {
      return Infinity;
    }
    return token.start.column;
  };

  const listItemParser: Parser = (tokens, state) => {
    const noop: ReturnType<Parser> = [[], tokens, state];

    if (tokens.length === 0) {
      return noop;
    }

    if (tokens[0].type === 'list-item-start') {
      const indent = getIndent(tokens[0]);

      if (indent < level + 1) {
        return noop;
      }

      const [itemContents, next] = splitUntil(
        tokens.slice(1),
        (token) => (
          token.type === 'blockquote-start'
          || getIndent(token) <= indent
        ),
      );

      const [children, rest] = parseMany(
        parseEither(
          parseList(level + 1),
          parseParagraph,
        ),
      )(itemContents, state);

      if (rest.length > 0) {
        fail(rest[0], 'unexpected token');
      }

      const listItem: MarkdownNode = {
        type: 'list-item',
        props: {
          indent,
        },
        children,
        start: tokens[0].start,
        end: children[children.length - 1].end,
      };

      return [[listItem], next, state];
    }

    return noop;
  };

  Object.defineProperty(listItemParser, 'name', {
    value: `listItem(${level})`,
  });

  return listItemParser;
};

const parseList: (level: number) => Parser = (level) => {
  const listParser: Parser = (tokens, state) => {
    const [children, afterList] = parseMany(
      parseListItem(level),
    )(tokens, state);

    if (children.length > 0) {
      return [[{
        type: 'list',
        children,
        start: tokens[0].start,
        end: children[children.length - 1].end,
      }],
      afterList,
      state,
      ];
    }

    return [[], tokens, state];
  };

  Object.defineProperty(listParser, 'name', {
    value: `list(${level})`,
  });

  return listParser;
};

const parseBlockQuote: Parser = ([token, ...tokens], state) => {
  if (!token || token.type !== 'blockquote-start') {
    return [[], tokens, state];
  }

  const [
    children,
    [end, ...rest],
    newState,
  ] = parseMany(parseLiteral)(tokens, state);

  if (
    children.length === 0
    || end.type !== 'blockquote-end'
  ) {
    return [[], tokens, state];
  }

  return [[{
    type: 'blockquote',
    children,
    start: token.start,
    end: end.end,
  }], rest, newState];
};

const parseHeading: (level: number) => Parser = (level) => {
  const headingParser: Parser = (tokens, state) => {
    const [
      litNodes,
      [token, ...nextTokens],
      newState,
    ] = parseText(tokens, state);

    if (
      litNodes.length === 0
      || !token
      || token.type !== `heading-${level}`
    ) {
      return [[], tokens, state];
    }

    return [[{
      type: 'heading',
      props: {
        level,
      },
      children: litNodes,
      start: litNodes[0].start,
      end: litNodes[litNodes.length - 1].end,
    }], nextTokens, newState];
  };

  Object.defineProperty(headingParser, 'name', {
    value: `heading(${level})`,
  });

  return headingParser;
};

const parseLiteral: Parser = ([token, ...tokens], state) => {
  if (token && token.type === 'literal') {
    return [[{
      type: 'literal',
      value: token.value,
      start: token.start,
      end: token.end,
    }], tokens, state];
  }

  return [[], [token, ...tokens], state];
};

const parseIdiomaticOrBold: Parser = (
  [token, ...tokens],
  state,
) => {
  if (!token) {
    return [[], [], state];
  }

  if (token.type === 'bold' || token.type === 'idiomatic') {
    const [toParse, nextTokens] = splitUntil(
      tokens, (t) => (
        t.start.line > token.end.line
        || t.type === token.type
      ),
    );

    if (nextTokens.length === 0 || nextTokens[0].type !== token.type) {
      return [[{
        type: 'literal',
        value: token.value,
        start: token.start,
        end: token.end,
      }], tokens.slice(1), state];
    }

    const [children, nt] = parseMany(parseText)(toParse, state);

    if (children.length === 0) {
      fail(token, 'could not recognize text');
    }

    if (nt.length > 0) {
      fail(nt[0], 'could not parse full text');
    }

    return [[{
      type: token.type,
      children,
      start: token.start,
      end: children[children.length - 1].end,
    }], nextTokens.slice(1), state];
  }

  return [[], [], state];
};

const parseQuote: Parser = (tokens, state) => {
  if (tokens.length === 0 || tokens[0].type !== 'quote') {
    return [[], tokens, state];
  }

  return [[{
    type: 'quote',
    value: tokens[0].value,
    start: tokens[0].start,
    end: tokens[0].end,
  }], tokens.slice(1), state];
};

const parseText: Parser = parseEither(
  parseIdiomaticOrBold,
  parseLiteral,
  parseQuote,
);

const parseSection = (
  level: number,
): Parser => {
  const sectionParser: Parser = (
    tokens,
    state,
  ) => {
    const parseContents = parseMany(
      parseEither(
        parseSection(level + 1),
        parseParagraph,
        parseBlockQuote,
        parseList(0),
      ),
    );

    const innerSectionParser = level === 0
      ? parseContents
      : parseSequence(
        parseHeading(level),
        parseContents,
      );

    const [
      children,
      nextTokens,
      nextState,
    ] = innerSectionParser(tokens, state);

    if (children.length === 0) {
      return [[], tokens, state];
    }

    return [[{
      type: 'section',
      props: {
        level,
      },
      children,
      start: children[0].start,
      end: children[children.length - 1].end,
    }], nextTokens, nextState];
  };

  Object.defineProperty(sectionParser, 'name', {
    value: `section(${level})`,
  });

  return sectionParser;
};

const parseDocument = (tokens: LexerToken[]): MarkdownNode => {
  const [children, nextTokens] = parseSection(0)(
    tokens, {
      idiomatic: false,
      bold: false,
    },
  );

  if (children.length === 0) {
    throw new Error('empty document');
  }

  if (nextTokens.length > 0) {
    fail(nextTokens[0], 'incomplete parse of document');
  }

  return {
    type: 'document',
    children,
    start: children[0].start,
    end: children[children.length - 1].end,
  };
};

export const parser = async (
  source: string,
  directory: string,
):Promise<MarkdownNode> => {
  const tokens = lexer(source);

  const doc = parseDocument(tokens);

  return doc;
};
