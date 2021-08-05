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
 | typeof openerClosers[number]

export type MarkdownNode = {
  type: MarkdownNodeType
  value?: string
  children?: MarkdownNode[]
  props?: Record<string, string | number>
  start: Pos
  end: Pos
}

type ParserState = {
  idiomatic: boolean
  bold: boolean
}

type Parser = (tokens: LexerToken[], state: ParserState) => [
  MarkdownNode[],
  LexerToken[],
  ParserState,
];

type ParserTransformer = (...p: Parser[]) => Parser

type TokenPredicate =
  LexerTokenType
  | ((token: LexerToken) => boolean)

const fail = (token: LexerToken, ...msgParts: string[]): never => {
  const msg = msgParts.concat(
    'at', `"${token.value}"`,
    `${token.start.line}:${token.start.column}`,
    '-',
    `${token.end.line}:${token.end.column}`,
  ).join(' ');
  throw new Error(msg);
};

const skip = (
  tokens: LexerToken[],
  p: TokenPredicate,
): LexerToken[] => {
  if (tokens.length === 0) {
    return [];
  }

  const [token, ...nextTokens] = tokens;

  if (
    typeof p === 'string'
    && token.type === p
  ) {
    return skip(nextTokens, p);
  }

  if (
    typeof p === 'function'
    && p(token)
  ) {
    return skip(nextTokens, p);
  }

  return tokens;
};

const parseMany: ParserTransformer = (parser: Parser) =>
  (tokens, state) => {
    const [nodes, remainingTokens, newState] = parser(tokens, state);
    if (
      (remainingTokens.length === 0 || nodes.length === 0)
      && (newState === state)
    ) {
      return [nodes, remainingTokens, newState];
    }
    const then = parseMany(parser)(remainingTokens, newState);
    return [nodes.concat(then[0]), then[1], then[2]];
  };

const parseSequence: ParserTransformer = (a: Parser, b: Parser) =>
  (tokens, state) => {
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

const parseEither: ParserTransformer = (...parsers: Parser[]) =>
  (tokens, state) => {
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

const parseParagraph: Parser = (tokens, state) => {
  const [
    children,
    nextTokens,
    newState,
  ] = parseText(
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

// eslint-disable-next-line arrow-body-style
const parseList: Parser = (tokens, state) => {
  return [[], tokens, state];
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

const parseHeading: (level: number) => Parser = (level) =>
  (tokens, state) => {
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

const parseIdiomatic: Parser = (tokens, state) => {
  if (
    tokens.length > 0
    && tokens[0].type === 'idiomatic'
  ) {
    if (state.idiomatic) {
      return [[], tokens.slice(1), {
        ...state,
        idiomatic: false,
      }];
    }

    const [
      [child, ...children],
      nextTokens,
      nextState,
    ] = parseText(
      tokens.slice(1), {
        ...state,
        idiomatic: true,
      },
    );

    return [[{
      type: 'idiomatic',
      children: [child],
      start: tokens[0].start,
      end: child.end,
    }, ...children], nextTokens, nextState];
  }

  return [[], tokens, state];
};

const parseBold: Parser = (tokens, state) => {
  if (
    tokens.length > 0
    && tokens[0].type === 'bold'
  ) {
    if (state.bold) {
      return [[], tokens.slice(1), {
        ...state,
        bold: false,
      }];
    }

    const [children, nextTokens, nextState] = parseText(
      tokens.slice(1), {
        ...state,
        bold: true,
      },
    );

    return [[{
      type: 'bold',
      children,
      start: tokens[0].start,
      end: children[children.length - 1].end,
    }], nextTokens, nextState];
  }

  return [[], tokens, state];
};

const parseText: Parser = parseMany(parseEither(
  parseLiteral,
  parseIdiomatic,
  parseBold,
));

const parseSection = (
  level: number,
): Parser =>
  (tokens: LexerToken[], state) => {
    const parseContents = parseMany(
      parseEither(
        parseSection(level + 1),
        parseParagraph,
        parseList,
        parseBlockQuote,
      ),
    );

    const sectionParser = level === 0
      ? parseContents
      : parseSequence(
        parseHeading(level),
        parseContents,
      );

    const [
      children,
      nextTokens,
      nextState,
    ] = sectionParser(tokens, state);

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

const parseDocument = (tokens: LexerToken[]): MarkdownNode => {
  console.dir(
    tokens, {
      colors: true,
      depth: null,
    },
  );

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
    console.dir(
      {
        nextToken: nextTokens[0],
        children,
      }, {
        depth: null,
        colors: true,
      },
    );
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
