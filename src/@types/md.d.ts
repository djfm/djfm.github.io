type ParserNode = {
  type: string;
  value?: string;
  children?: ParserNode[]
  props?: Record<string, string>
  start: {
    line: number
    column: number
  }
  end: {
    line: number
    column: number
  }
}

declare module '*.md' {
  const node: ParserNode;
  export default node;
}
