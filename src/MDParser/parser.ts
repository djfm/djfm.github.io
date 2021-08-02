import {
  lexer,
  LexerToken,
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
 | 'heading-1'
 | 'heading-2'
 | 'function-call'
 | 'function-call-arg'
 | 'paragraph'
 | 'section'
 | 'document'
 | 'empty-lines'
 | 'list-item-start'
 | typeof openerClosers[number]

type WithStartingTokenOrNode = {
  startingToken: LexerToken | MarkdownNode
};

type BaseMarkdownNode = {
  type: MarkdownNodeType
  value?: string
  children?: MarkdownNode[]
  props?: Record<string, string>
};

type StartedMarkdownNode =
  BaseMarkdownNode & WithStartingTokenOrNode;

export type MarkdownNode = BaseMarkdownNode & {
  start: Pos
  end: Pos
}

const omit = <
  T extends Record<string, unknown>,
  Del extends keyof T,
  U = { [Key in Exclude<keyof T, Del>]: T[Key] }
> (obj: T, ...props: Del[]): U =>
    Object.entries(obj).reduce((acc, [key, value]): U => {
      for (const del of props) {
        if (del === key) {
          return acc;
        }
      }
      return { ...acc, [key]: value };
    }, {} as U);

const toMarkdownNode = (node: StartedMarkdownNode): MarkdownNode => {
  const { startingToken, ...rest } = node;
  return {
    ...rest,
    start: startingToken.start,
    end: node.children
      ? node.children[node.children.length - 1].end
      : node.startingToken.end,
  };
};

const cleanEmptyLines = (nodes: MarkdownNode[]): MarkdownNode[] => {
  const newNodes = [];
  let lastNode: MarkdownNode | undefined;

  for (const node of nodes) {
    if (node.type !== 'empty-lines') {
      newNodes.push(node);
      lastNode = node;
    } else if (lastNode) {
      if (lastNode.type === 'empty-lines') {
        lastNode.value += `\n${node.value}`;
        lastNode.end = node.end;
      } else if (!lastNode.type.startsWith('heading-')) {
        newNodes.push(node);
        lastNode = node;
      }
    }
  }

  return newNodes;
};

const buildParagraphs = (nodes: MarkdownNode[]): MarkdownNode[] => {
  const newNodes: MarkdownNode[] = [];
  const currentParagraph: MarkdownNode[] = [];

  for (const node of nodes) {
    newNodes.push(node);
  }

  return newNodes;
};

const buildTree = (
  tokens:Array<LexerToken>,
  directory: string,
): MarkdownNode[] => {
  const previousNodes: MarkdownNode[][] = [];
  const previousNodesBeingBuilt: StartedMarkdownNode[] = [];

  let nodes: MarkdownNode[] = [];
  let nodeBeingBuilt: StartedMarkdownNode | undefined;

  const peekNode = (): MarkdownNode | undefined =>
    nodes[nodes.length - 1];

  const popNode = (): MarkdownNode | never => {
    const node = nodes.pop();
    if (node) {
      return node;
    }
    throw new Error('popNode called on empty stack');
  };

  const open = (
    token: LexerToken,
    type: MarkdownNodeType,
  ): void => {
    const node: StartedMarkdownNode = {
      type,
      children: [],
      startingToken: token,
    };

    if (nodeBeingBuilt) {
      previousNodesBeingBuilt.push(nodeBeingBuilt);
    }

    previousNodes.push(nodes);
    nodes = node.children;
    nodeBeingBuilt = node;
  };

  const push = (node: MarkdownNode): void => {
    nodes.push(node);
  };

  const close = (type: MarkdownNodeType | 'anything'): void => {
    if (nodeBeingBuilt) {
      while (nodeBeingBuilt) {
        if (type !== 'anything' && nodeBeingBuilt.type !== type) {
          throw new Error(
            `Expected "${nodeBeingBuilt.type}" to be "${type}".`,
          );
        }
        nodes = previousNodes.pop();
        nodes.push(toMarkdownNode(nodeBeingBuilt));
        nodeBeingBuilt = previousNodesBeingBuilt.pop();
      }
    } else if (type !== 'anything') {
      throw new Error(`Unexpected closing of "${type}".`);
    }
  };

  const currentType = (): MarkdownNodeType => {
    if (nodeBeingBuilt) {
      return nodeBeingBuilt.type;
    }

    return undefined;
  };

  for (let tIndex = 0; tIndex < tokens.length; tIndex += 1) {
    const token = tokens[tIndex];
    const fail = (...msgParts: string[]): never => {
      const preMsg = msgParts.join(' ');
      const msg = `${
        preMsg[0].toLocaleUpperCase()
      }${
        preMsg.slice(1)
      } at (${
        token.start.line
      }:${
        token.start.column
      }-${
        token.end.line
      }:${
        token.end.column
      }).`;

      throw new Error(msg);
    };

    const handleOpenerClosers = (): boolean => {
      const t = openerClosers.indexOf(token.type);
      if (t === -1) {
        return false;
      }

      const type = openerClosers[t];

      if (currentType() === type) {
        close(type);
        return true;
      }

      if (currentType() === 'quote') {
        push({
          type: 'literal',
          value: token.value,
          start: token.start,
          end: token.end,
        });
        return true;
      }

      open(token, type);
      return true;
    };

    const handleHeadings = (): boolean => {
      const types = ['heading-1', 'heading-2'];
      if (!types.includes(token.type)) {
        return false;
      }

      close('anything');

      const children: MarkdownNode[] = [];
      while (
        peekNode()
        && peekNode().end.line === token.start.line - 1
      ) {
        children.push(popNode());
      }

      if (children.length === 0) {
        fail(
          'missing text before heading',
        );
      }

      push({
        type: token.type,
        children,
        start: children[0].start,
        end: children[children.length - 1].end,
      });
      return true;
    };

    const buildFunctionCall = (): void => {
      const node: StartedMarkdownNode = {
        type: 'function-call',
        value: token.value,
        startingToken: token,
      };

      let argName: string | undefined;
      let argValue = '';
      let argStart: LexerToken | undefined;

      const conclude = (end: Pos) => {
        if (argValue.length > 0) {
          if (argName && argValue.length > 0) {
            if (!node.props) {
              node.props = {};
            }
            node.props[argName] = argValue;
            argName = undefined;
            argValue = '';
          } else if (argValue.length > 0) {
            if (!node.children) {
              node.children = [];
            }
            node.children.push({
              type: 'function-call-arg',
              value: argValue,
              start: argStart.start,
              end,
            });
            argValue = '';
          }
        }
      };

      while (
        tIndex + 1 < tokens.length
        && tokens[tIndex + 1].type.startsWith(
          'function-call-args',
        )
      ) {
        tIndex += 1;
        const nextToken = tokens[tIndex];

        if (!argStart) {
          argStart = nextToken;
        }

        if (nextToken.type === 'function-call-args-name') {
          conclude(nextToken.end);
          argName = nextToken.value;
        } else {
          argValue += nextToken.value;
        }
      }
      const newToken = tokens[tIndex];

      conclude(newToken.end);

      push({
        ...omit(node, 'startingToken'),
        end: newToken.end,
      });
    };

    if (currentType() === 'blockquote') {
      if (token.type === 'blockquote-end') {
        close('blockquote');
      } else if (token.type !== 'literal') {
        fail(
          'unexpected token of type',
          `"${token.type}"`,
          'in a "blockquote"',
        );
      } else {
        push({
          type: 'literal',
          value: token.value,
          start: token.start,
          end: token.end,
        });
      }
    } else if (token.type === 'literal') {
      push(token);
    } else if (token.type === 'blockquote-start') {
      close('anything');
      open(token, 'blockquote');
    } else if (token.type === 'bold-idiomatic-close') {
      close('anything');
    } else if (token.type === 'list-item-start') {
      push(token);
    } else if (
      !handleOpenerClosers()
      && !handleHeadings()
    ) {
      if (token.type === 'empty-line') {
        push({ ...token, type: 'empty-lines' });
      } else if (token.type === 'function-call') {
        buildFunctionCall();
      } else {
        fail('unexpected token', `${token.type}`);
      }
    }
  }

  close('anything');

  return buildParagraphs(cleanEmptyLines(nodes));
};

export const parser = async (
  source: string,
  directory: string,
):Promise<MarkdownNode> => {
  const tokens = lexer(source);

  const children = buildTree(tokens, directory);

  const doc: MarkdownNode = {
    type: 'document',
    children,
    start: children[0].start,
    end: children[children.length - 1].end,
  };

  return doc;
};
