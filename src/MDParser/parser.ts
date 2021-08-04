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

type Parser = (tokens: LexerToken[]) => [
  MarkdownNode[],
  LexerToken[]
];

type ParserTransformer = (...p: Parser[]) => Parser

type TokenPredicate =
  LexerTokenType
  | ((token: LexerToken) => boolean)

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
  (tokens: LexerToken[]) => {
    const [nodes, remainingTokens] = parser(tokens);
    if (remainingTokens.length === 0 || nodes.length === 0) {
      return [nodes, remainingTokens];
    }
    const then = parseMany(parser)(remainingTokens);
    return [nodes.concat(then[0]), then[1]];
  };

const parseSequence: ParserTransformer = (a: Parser, b: Parser) =>
  (tokens: LexerToken[]) => {
    const [aNodes, nextTokens] = a(tokens);
    if (aNodes.length === 0) {
      return [[], tokens];
    }
    const [bNodes, restTokens] = b(nextTokens);
    if (bNodes.length === 0) {
      return [[], tokens];
    }
    return [aNodes.concat(bNodes), restTokens];
  };

const parseEither: ParserTransformer = (...parsers: Parser[]) =>
  (tokens: LexerToken[]) => {
    for (const parser of parsers) {
      const [nodes, remainingTokens] = parser(tokens);
      if (nodes.length > 0) {
        return [nodes, remainingTokens];
      }
    }
    return [[], tokens];
  };

const parseParagraph: Parser = (tokens) => {
  const [
    children,
    nextTokens,
  ] = parseMany(parseText)(
    skip(tokens, 'empty-line'),
  );

  if (children.length === 0) {
    return [[], tokens];
  }

  const next = skip(nextTokens, 'empty-line');

  if (
    next.length > 0
    && next[0].type.startsWith('heading-')
  ) {
    return [[], tokens];
  }

  return [[{
    type: 'paragraph',
    children,
    start: children[0].start,
    end: children[children.length - 1].end,
  }], next];
};

const parseList: Parser = ([token, ...tokens]) => {
  if (token.type !== 'list-item-start') {
    return [[], tokens];
  }
};

const parseBlockQuote: Parser = ([token, ...tokens]) => {
  if (token.type !== 'blockquote-start') {
    return [[], tokens];
  }

  const [
    children,
    [end, ...rest],
  ] = parseMany(parseLiteral)(tokens);

  if (
    children.length === 0
    || end.type !== 'blockquote-end'
  ) {
    return [[], tokens];
  }

  return [[{
    type: 'blockquote',
    children,
    start: token.start,
    end: end.end,
  }], rest];
};

const parseHeading: (level: number) => Parser = (level) =>
  (tokens) => {
    const [
      litNodes,
      [token, ...nextTokens],
    ] = parseText(tokens);

    if (
      litNodes.length === 0
      || !token
      || token.type !== `heading-${level}`
    ) {
      return [[], tokens];
    }

    return [[{
      type: 'heading',
      props: {
        level,
      },
      children: litNodes,
      start: litNodes[0].start,
      end: litNodes[litNodes.length - 1].end,
    }], nextTokens];
  };

const parseLiteral: Parser = ([token, ...tokens]) => {
  if (token.type === 'literal') {
    return [[{
      type: 'literal',
      value: token.value,
      start: token.start,
      end: token.end,
    }], tokens];
  }

  return [[], [token, ...tokens]];
};

const parseIdiomatic: Parser = (tokens) => {
  if (
    tokens.length > 0
    && tokens[0].type === 'idiomatic'
  ) {
    return [[{
      type: 'idiomatic',
      value: tokens[0].value,
      start: tokens[0].start,
      end: tokens[0].end,
    }], tokens.slice(1)];
  }

  return [[], tokens];
};

const parseText: Parser = parseEither(
  parseLiteral,
  parseIdiomatic,
);

const parseSection = (
  level: number,
): Parser =>
  (tokens: LexerToken[]) => {
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

    const [children, nextTokens] = sectionParser(tokens);

    if (children.length === 0) {
      return [[], tokens];
    }

    return [[{
      type: 'section',
      props: {
        level,
      },
      children,
      start: children[0].start,
      end: children[children.length - 1].end,
    }], nextTokens];
  };

const parseDocument = (tokens: LexerToken[]): MarkdownNode => {
  console.dir(
    tokens, {
      colors: true,
      depth: null,
    },
  );

  const [children, nextTokens] = parseSection(0)(tokens);

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
    throw new Error('incomplete parse of document');
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
