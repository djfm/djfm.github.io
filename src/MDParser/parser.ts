import {
  lexer, LexerToken,
} from './lexer';

type ParserNodeType = 'literal'
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

export type ParserNode = {
  type: ParserNodeType
  value?: string
  line?: number
  column?: number
  children?: ParserNode[]
}

export const parser = (source: string): ParserNode[] => {
  const tokens = lexer(source);

  console.log(tokens);

  return [];
};
