import {
  lexer,
  LexerToken,
} from './lexer';

type MarkdownNodeType = 'literal'
 | 'blockquote'
 | 'literal'
 | 'quote'
 | 'bold'
 | 'idiomatic'
 | 'heading-1'
 | 'heading-2'
 | 'function-call'
 | 'paragraph'
 | 'section'
 | 'document'

export type MarkdownNode = {
  type: MarkdownNodeType
  value?: string
  children?: MarkdownNode[]
}

export const parser = async (
  source: string,
  directory: string,
):Promise<MarkdownNode> => {
  const tokens = lexer(source);

  console.log(tokens);

  return {
    type: 'document',
  };
};
