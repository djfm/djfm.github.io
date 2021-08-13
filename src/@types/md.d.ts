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

type MDNode = {
  type: MDNodeType
  value?: string;
  children?: MDNode[]
  props?: {
    syntax?: string
    positionalArgs?: string[]
    namedArgs?: { [key: string]: string }
    level?: number
    indent?: number
  }
  key: string,
  refs?: Record<string, MDNode>
  resourcePath?: string
}

declare module '*.md' {
  const node: MDNode;
  export default node;
}
