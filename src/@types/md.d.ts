type ParserNode = {
  type: string;
  value?: string;
  children?: ParserNode[]
  props?: Record<string, string>
}

declare module '*.md' {
  const node: ParserNode;
  export default node;
}
