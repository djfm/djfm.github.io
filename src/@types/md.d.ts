type ParserNodeType =
  'literal'
  | 'blockquote'
  | 'heading'
  | 'function-call'
  | 'paragraph'
  | 'section'
  | 'document'
  | 'list'
  | 'list-item'
  | 'whitespace'
  | 'quote'
  | 'bold'
  | 'idiomatic'

type ParserNode = {
  type: ParserNodeType
  value?: string;
  children?: ParserNode[]
  props?: Record<string, string | number>
}

declare module '*.md' {
  const node: ParserNode;
  export default node;
}
