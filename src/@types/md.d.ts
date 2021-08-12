type MDNodeType =
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

type MaybeWithMeta = {
  anchor: string
  title: string
}

type MDNode = {
  type: MDNodeType
  value?: string;
  children?: MDNode[]
  props?: Record<string,
    string
    | number
    | string[]
    | Record<string, string>
  > & MaybeWithMeta
  key: string,
}

declare module '*.md' {
  const node: MDNode;
  export default node;
}
