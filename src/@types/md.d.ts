type ParserNodeType =
  'document'
  | 'section'
  | 'heading-1'
  | 'heading-2'
  | 'literal'
  | 'paragraph'
  | 'bold'
  | 'idiomatic'
  | 'blockquote'
  | 'list'
  | 'list-item'
  | 'function-call'
  | 'function-call-arg'

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
