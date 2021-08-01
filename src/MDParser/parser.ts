/* eslint-disable no-loop-func */
import util from 'util';

import {
  lexer,
  LexerToken,
  Pos,
} from './lexer';

// eslint-disable-next-line no-console
const inspect = (obj: unknown) => console.log(
  util.inspect(obj, false, undefined, true),
);

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
 | typeof openerClosers[number]

type StartedMarkdownNode = {
  type: MarkdownNodeType
  value?: string
  children?: MarkdownNode[]
  props?: Record<string, string>
  start: Pos
  token: LexerToken
};

export type MarkdownNode = StartedMarkdownNode & {
  end: Pos
};

const addEnd = (node: StartedMarkdownNode): MarkdownNode => ({
  ...node,
  end: node.children
    ? node.children[node.children.length - 1].end
    : node.token.end,
});

const buildTree = (
  tokens:Array<LexerToken>,
  directory: string,
): MarkdownNode[] => {
  const nodes: MarkdownNode[] = [];

  let currentNode: StartedMarkdownNode | undefined;

  for (let tIndex = 0; tIndex < tokens.length; tIndex += 1) {
    const token = tokens[tIndex];

    console.log({ token });

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

      if (!currentNode) {
        currentNode = {
          type,
          value: '',
          start: token.start,
          token,
        };

        return true;
      }

      if (currentNode.type !== type) {
        fail(
          `unexpected "${type}" token`,
          'in a node of type',
          `"${currentNode.type}"`,
        );
      }

      nodes.push({
        ...currentNode,
        start: token.start,
        end: token.end,
      });
      currentNode = undefined;
      return true;
    };

    const handleHeadings = (): boolean => {
      const types = ['heading-1', 'heading-2'];
      if (!types.includes(token.type)) {
        return false;
      }

      if (currentNode) {
        nodes.push(addEnd(currentNode));
        currentNode = undefined;
      }

      const children: MarkdownNode[] = [];
      while (
        nodes.length > 0
        && nodes[nodes.length - 1].end.line === token.start.line - 1
      ) {
        children.push(nodes.pop());
      }

      if (children.length === 0) {
        fail(
          'missing text before heading',
        );
      }

      nodes.push({
        type: token.type,
        children,
        start: children[0].start,
        end: children[children.length - 1].end,
        token,
      });
      currentNode = undefined;
      return true;
    };

    const buildFunctionCall = (): void => {
      const node: StartedMarkdownNode = {
        type: 'function-call',
        value: token.value,
        start: token.start,
        token,
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
              token: argStart,
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

      nodes.push({ ...node, end: newToken.end });
    };

    if (currentNode && currentNode.type === 'blockquote') {
      if (token.type !== 'literal') {
        fail(
          'unexpected token of type',
          `"${token.type}"`,
          'in a "blockquote"',
        );
      }

      currentNode.children.push({
        type: 'literal',
        value: token.value,
        start: token.start,
        end: token.end,
        token,
      });
    } else if (token.type === 'literal') {
      nodes.push({ ...token, token });
    } else if (token.type === 'blockquote-start') {
      if (currentNode) {
        nodes.push({
          ...currentNode,
          end: token.start,
        });
      }

      currentNode = {
        type: 'blockquote',
        children: [],
        token,
        start: token.start,
      };
    } else if (token.type === 'blockquote-end') {
      if (!currentNode || currentNode.type !== 'blockquote') {
        throw new Error(
          'Unexpected blockquote-end token.',
        );
      }
      nodes.push({ ...currentNode, end: token.end });
      currentNode = undefined;
    } else if (
      !handleOpenerClosers()
      && !handleHeadings()
    ) {
      if (token.type !== 'function-call') {
        fail('unexpected token', `${token.type}`);
      }
      if (currentNode) {
        nodes.push({ ...currentNode, end: token.start });
        currentNode = undefined;
      }
      buildFunctionCall();
    }
  }

  return nodes;
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
    token: tokens[0],
  };

  inspect(doc);

  return doc;
};
