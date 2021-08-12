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
 | 'whitespace'
 | typeof openerClosers[number]

export type BaseMarkdownNode = {
  type: MarkdownNodeType
  value?: string
  props?: Record<string, unknown>
}

export type MarkdownNode = BaseMarkdownNode & {
  children?: MarkdownNode[]
  start: Pos
  end: Pos
}

export type ReactMarkdownNode = BaseMarkdownNode & {
  children?: ReactMarkdownNode[]
  key: string,
}

type Parser = (tokens: LexerToken[]) => [
  MarkdownNode[],
  LexerToken[]
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
  ) => {
    if (tokens.length === 0) {
      return [[], []];
    }
    const [nodes, remainingTokens] = parser(tokens);
    if (remainingTokens.length === 0 || nodes.length === 0) {
      return [nodes, remainingTokens];
    }
    const [nextParsed, nextTokens] = parseMany(parser)(
      remainingTokens,
    );
    return [nodes.concat(nextParsed), nextTokens];
  };

  Object.defineProperty(manyParser, 'name', {
    value: `many(${parser.name})`,
  });

  return manyParser;
};

const parseSequence: ParserTransformer = (a: Parser, b: Parser) => {
  const sequenceParser: Parser = (
    tokens,
  ) => {
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

  Object.defineProperty(sequenceParser, 'name', {
    value: `sequence(${a.name}, ${b.name})`,
  });

  return sequenceParser;
};

const parseEither: ParserTransformer = (...parsers: Parser[]) => {
  const eitherParser: Parser = (tokens) => {
    for (const parser of parsers) {
      const [
        nodes,
        remainingTokens,
      ] = parser(tokens);

      if (nodes.length > 0) {
        return [nodes, remainingTokens];
      }
    }
    return [[], tokens];
  };

  Object.defineProperty(eitherParser, 'name', {
    value: `either(${parsers.map((p) => p.name).join(', ')})`,
  });

  return eitherParser;
};

const normalizeWhitespace: ParserTransformer = (parser: Parser) => {
  const whitespaceRestorer: Parser = (tokens) => {
    const [nodes, remainingTokens] = parser(tokens);

    const updatedNodes = nodes.reduce(
      (nodeList: MarkdownNode[], nextNode) => {
        if (nodeList.length === 0) {
          return [nextNode];
        }

        const prevNode = nodeList[nodeList.length - 1];

        // if there is no line difference between the nodes,
        // whitespace is not altered
        if (nextNode.start.line - prevNode.end.line > 1) {
          return nodeList.concat(nextNode);
        }

        // if we can act on the text of the previousNode, do so
        if (prevNode.type === 'literal') {
          const prevNodeValue = `${prevNode.value.trimEnd()} `;

          if (nextNode.type !== 'literal') {
            return nodeList.slice(0, -1).concat({
              ...prevNode,
              value: prevNodeValue,
            }, nextNode);
          }

          // so now both prev and next are literal
          const value = `${prevNodeValue}${nextNode.value}`;

          return nodeList.slice(0, -1).concat({
            ...nextNode,
            value,
            start: prevNode.start,
            end: nextNode.end,
          });
        }

        if (nextNode.type === 'literal') {
          return nodeList.concat({
            ...nextNode,
            value: ` ${nextNode.value.trimStart()}`,
            start: prevNode.end,
            end: nextNode.end,
          });
        }

        return nodeList.concat({
          type: 'whitespace',
          value: ' ',
          start: prevNode.end,
          end: nextNode.start,
        }, nextNode);
      },
      [],
    );

    return [updatedNodes, remainingTokens];
  };

  return whitespaceRestorer;
};

const parseParagraph: Parser = (tokens) => {
  const [
    children,
    nextTokens,
  ] = normalizeWhitespace(
    parseMany(
      parseEither(
        parseText,
        parseFunctionCall,
      ),
    ),
  )(
    skip(tokens, 'empty-line'),
  );

  if (children.length === 0) {
    return [[], tokens];
  }

  const next = skip(nextTokens, 'empty-line');

  if (next.length > 0
    && next[0].type.startsWith('heading-')) {
    return [[], tokens];
  }

  return [[{
    type: 'paragraph',
    children,
    start: tokens[0].start,
    end: children[children.length - 1].end,
  }], next];
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

  const listItemParser: Parser = (tokens) => {
    const noop: ReturnType<Parser> = [[], tokens];

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
          parseFunctionCall,
          parseParagraph,
        ),
      )(itemContents);

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

      return [[listItem], next];
    }

    return noop;
  };

  Object.defineProperty(listItemParser, 'name', {
    value: `listItem(${level})`,
  });

  return listItemParser;
};

const parseList: (level: number) => Parser = (level) => {
  const listParser: Parser = (tokens) => {
    const [children, afterList] = parseMany(
      parseListItem(level),
    )(tokens);

    if (children.length > 0) {
      return [[{
        type: 'list',
        children,
        start: tokens[0].start,
        end: children[children.length - 1].end,
      }],
      afterList,
      ];
    }

    return [[], tokens];
  };

  Object.defineProperty(listParser, 'name', {
    value: `list(${level})`,
  });

  return listParser;
};

const parseBlockQuote: Parser = ([token, ...tokens]) => {
  if (!token || token.type !== 'blockquote-start') {
    return [[], tokens];
  }

  const [
    children,
    [end, ...rest],
  ] = parseMany(parseLiteral)(tokens);

  if (
    children.length === 0
    || !end
    || end.type !== 'blockquote-end'
  ) {
    fail(token, 'could not parse block-quote');
  }

  return [[{
    type: 'blockquote',
    props: {
      syntax: token.value,
    },
    children,
    start: token.start,
    end: end.end,
  }], rest];
};

const parseHeading: (level: number) => Parser = (level) => {
  const headingParser: Parser = (tokens) => {
    const [
      litNodes,
      [token, ...nextTokens],
    ] = normalizeWhitespace(parseMany(parseText))(
      skip(tokens, 'empty-line'),
    );

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
    }], skip(nextTokens, 'empty-line')];
  };

  Object.defineProperty(headingParser, 'name', {
    value: `heading(${level})`,
  });

  return headingParser;
};

const parseLiteral: Parser = ([token, ...tokens]) => {
  if (token && token.type === 'literal') {
    return [[{
      type: 'literal',
      value: token.value,
      start: token.start,
      end: token.end,
    }], tokens];
  }

  return [[], [token, ...tokens]];
};

const parseIdiomaticOrBold: Parser = (
  [token, ...tokens],
) => {
  if (!token) {
    return [[], []];
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
      }], tokens.slice(1)];
    }

    const [children, nt] = parseMany(parseText)(toParse);

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
    }], nextTokens.slice(1)];
  }

  return [[], []];
};

const parseQuote: Parser = (tokens) => {
  if (tokens.length === 0 || tokens[0].type !== 'quote') {
    return [[], tokens];
  }

  return [[{
    type: 'quote',
    value: tokens[0].value,
    start: tokens[0].start,
    end: tokens[0].end,
  }], tokens.slice(1)];
};

const parseText: Parser = parseEither(
  parseIdiomaticOrBold,
  parseLiteral,
  parseQuote,
);

const parseFunctionCall: Parser = (tokens) => {
  if (tokens.length === 0 || tokens[0].type !== 'function-call') {
    return [[], tokens];
  }

  const baseNode = {
    type: 'function-call',
    value: tokens[0].value,
    props: {
      positionalArgs: [] as string[],
      namedArgs: {},
    },
    start: tokens[0].start,
    end: undefined,
  };

  let nameSeen: string | false = false;
  let i = 1;
  for (
    ;
    i < tokens.length
      && tokens[i].type.startsWith('function-call-arg-');
    i += 1
  ) {
    const token = tokens[i];
    baseNode.end = token.end;

    if (token.type === 'function-call-arg-name') {
      if (nameSeen) {
        fail(token, 'cannot have multiple named arguments');
      }

      nameSeen = token.value;
      baseNode.props.namedArgs[token.value] = [];
    } else if (token.type === 'function-call-arg-value') {
      if (nameSeen !== false) {
        baseNode.props.namedArgs[nameSeen] = token.value;
        nameSeen = false;
      } else {
        baseNode.props.positionalArgs.push(token.value);
      }
    } else {
      fail(token, 'unexpected token in function call');
    }
  }

  return [[baseNode], skip(tokens.slice(i), 'empty-line')];
};

const parseSection = (
  level: number,
): Parser => {
  const sectionParser: Parser = (
    tokens,
  ) => {
    const parseContents = parseMany(
      parseEither(
        parseFunctionCall,
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
    ] = innerSectionParser(tokens);

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

  Object.defineProperty(sectionParser, 'name', {
    value: `section(${level})`,
  });

  return sectionParser;
};

const parseDocument = (tokens: LexerToken[]): MarkdownNode => {
  const [children, nextTokens] = parseSection(0)(
    tokens,
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

export const cleanUpAndAddKey = (
  node: MarkdownNode,
  id: number,
): ReactMarkdownNode => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    start, end,
    children,
    ...cleanedNode
  } = node;

  if (children) {
    return {
      ...cleanedNode,
      children: children.map(
        cleanUpAndAddKey,
      ),
      key: `${id}`,
    };
  }

  return {
    ...cleanedNode,
    key: `${id}`,
  };
};

export const parser = async (
  source: string,
  directory: string,
):Promise<MarkdownNode> => {
  const tokens = lexer(source);

  const doc = parseDocument(skip(tokens, 'empty-line'));

  return doc;
};
