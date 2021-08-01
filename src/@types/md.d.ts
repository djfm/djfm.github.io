type ParserNode = {
  type: string;
  value?: string;
  children?: ParserNode[];
}

declare module '*.md' {
  const node: ParserNode;
  export default node;
}
