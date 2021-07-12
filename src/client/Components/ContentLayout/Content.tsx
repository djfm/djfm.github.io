/* eslint-disable react/jsx-filename-extension */
import React, { ReactElement, ReactNode } from 'react';

export type PrevNext = {
  prev?: ContentMeta;
  next?: ContentMeta;
}
export type PrevNextMap = Map<string, PrevNext>;

export interface WithAnchor {
  anchor: string
}

export type ContentMeta = {
  anchor: string
  title: ReactNode
}
export type ContentRenderer = (
  tag: React.FC,
  h1Tag: React.FC,
  h2Tag: React.FC
) => ReactElement;

export type ReadyToRenderContent = ContentMeta & {
  render: ContentRenderer
  childrenMeta?: ContentMeta[]
}

export const wrapContent = (
  title: ReactNode,
  anchor: string,
  render: ContentRenderer,
  childrenMeta?: ContentMeta[],
): ReadyToRenderContent => ({
  title,
  anchor,
  render,
  childrenMeta,
});

export default wrapContent;
