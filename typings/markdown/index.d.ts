interface BaseMarkdownNode extends Record<PropertyKey, unknown>{
  type: MarkdownNode['type']
}

type Pos = {
  line: number
  column: number
}

interface IMarkdownNode extends BaseMarkdownNode {
  start: Pos
  end: Pos
}

interface IRMarkdownNode extends BaseMarkdownNode {
  key: string
}

type MarkdownNode =
 QuoteNode
 | BoldNode
 | IdiomaticNode
 | BlockquoteNode
 | LiteralNode
 | HeadingNode
 | FunctionCallNode
 | ParagraphNode
 | SectionNode
 | DocumentNode
 | ListNode
 | ListItemNode
 | WhitespaceNode

type RMarkdownNode =
 RQuoteNode
 | RBoldNode
 | RIdiomaticNode
 | RBlockquoteNode
 | RLiteralNode
 | RHeadingNode
 | RFunctionCallNode
 | RParagraphNode
 | RSectionNode
 | RDocumentNode
 | RListNode
 | RListItemNode
 | RWhitespaceNode

interface QuoteNode extends IMarkdownNode {
  type: 'quote'
  value: string
}

interface RQuoteNode extends IRMarkdownNode {
  type: 'quote'
  value: string
}

interface BoldNode extends IMarkdownNode {
  type: 'bold'
  children: MarkdownNode[]
}

interface RBoldNode extends IRMarkdownNode {
  type: 'bold'
  children: RMarkdownNode[]
}

interface IdiomaticNode extends IMarkdownNode {
  type: 'idiomatic'
  children: MarkdownNode[]
}

interface RIdiomaticNode extends IRMarkdownNode {
  type: 'idiomatic'
  children: RMarkdownNode[]
}

interface BlockquoteNode extends IMarkdownNode {
  type: 'blockquote'
  syntax?: string
  children: MarkdownNode[]
}

interface RBlockquoteNode extends IRMarkdownNode {
  type: 'blockquote'
  syntax?: string
  children: RMarkdownNode[]
}

interface LiteralNode extends IMarkdownNode {
  type: 'literal'
  value: string
}

interface RLiteralNode extends IRMarkdownNode {
  type: 'literal'
  value: string
}

interface HeadingNode extends IMarkdownNode {
  type: 'heading'
  level: number
  children: MarkdownNode[]
}

interface RHeadingNode extends IRMarkdownNode {
  type: 'heading'
  level: number
  children: RMarkdownNode[]
}

interface FunctionCallNode extends IMarkdownNode {
  type: 'function-call'
  name: string
  namedArgs?: { [key: string]: string }
  positionalArgs?: string[]
}

interface RFunctionCallNode extends IRMarkdownNode {
  type: 'function-call'
  name: string
  namedArgs?: { [key: string]: string }
  positionalArgs?: string[]
}

interface ParagraphNode extends IMarkdownNode {
  type: 'paragraph'
  children: MarkdownNode[]
}

interface RParagraphNode extends IRMarkdownNode {
  type: 'paragraph'
  children: RMarkdownNode[]
}

interface SectionNode extends IMarkdownNode {
  type: 'section'
  level: number
  children: MarkdownNode[]
}

interface RSectionNode extends IRMarkdownNode {
  type: 'section'
  level: number
  children: RMarkdownNode[]
}

interface DocumentNode extends IMarkdownNode {
  type: 'document'
  resourcePath: string
  refs?: Record<string, MarkdownNode>
  children: MarkdownNode[]
}

interface RDocumentNode extends IRMarkdownNode {
  type: 'document'
  resourcePath: string
  refs?: Record<string, RMarkdownNode>
  children: RMarkdownNode[]
}

interface ListNode extends IMarkdownNode {
  type: 'list'
  children: MarkdownNode[]
}

interface RListNode extends IRMarkdownNode {
  type: 'list'
  children: RMarkdownNode[]
}

interface ListItemNode extends IMarkdownNode {
  type: 'list-item'
  children: MarkdownNode[]
}

interface RListItemNode extends IRMarkdownNode {
  type: 'list-item'
  children: RMarkdownNode[]
}

interface WhitespaceNode extends IMarkdownNode {
  type: 'whitespace'
  value: string
}

interface RWhitespaceNode extends IRMarkdownNode {
  type: 'whitespace'
  value: string
}

declare module '*.md' {
  const node: RMarkdownNode;
  export default node;
}
