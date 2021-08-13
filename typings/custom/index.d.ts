interface BaseMarkdownNode <T> {
  type: MarkdownNode['type']
  children?: T[]
}

type Pos = {
  line: number
  column: number
}

interface IMarkdownNode extends BaseMarkdownNode<MarkdownNode> {
  start: Pos
  end: Pos
}

interface IRMarkdownNode extends BaseMarkdownNode<RMarkdownNode> {
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
}

interface RBoldNode extends IRMarkdownNode {
  type: 'bold'
}

interface IdiomaticNode extends IMarkdownNode {
  type: 'idiomatic'
}

interface RIdiomaticNode extends IRMarkdownNode {
  type: 'idiomatic'
}

interface BlockquoteNode extends IMarkdownNode {
  type: 'blockquote'
  syntax?: string
}

interface RBlockquoteNode extends IRMarkdownNode {
  type: 'blockquote'
  syntax?: string
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
}

interface RHeadingNode extends IRMarkdownNode {
  type: 'heading'
  level: number
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
}

interface RParagraphNode extends IRMarkdownNode {
  type: 'paragraph'
}

interface SectionNode extends IMarkdownNode {
  type: 'section'
  level: number
}

interface RSectionNode extends IRMarkdownNode {
  type: 'section'
  level: number
}

interface DocumentNode extends IMarkdownNode {
  type: 'document'
  resourcePath: string
  refs?: Record<string, MarkdownNode>
}

interface RDocumentNode extends IRMarkdownNode {
  type: 'document'
  resourcePath: string
  refs?: Record<string, RMarkdownNode>
}

interface ListNode extends IMarkdownNode {
  type: 'list'
}

interface RListNode extends IRMarkdownNode {
  type: 'list'
}

interface ListItemNode extends IMarkdownNode {
  type: 'list-item'
}

interface RListItemNode extends IRMarkdownNode {
  type: 'list-item'
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
