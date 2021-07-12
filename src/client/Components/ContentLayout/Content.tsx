/* eslint-disable react/jsx-filename-extension */
import React, { ReactElement } from 'react';

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
  title: string
}
export type ContentRenderer = (
  tag: React.FC,
  h1Tag: React.FC,
  h2Tag: React.FC
) => ReactElement;

export type ReadyToRenderContent = ContentMeta & {
  render: ContentRenderer;
}

export const wrapContent = (
  title: string,
  anchor: string,
  render: ContentRenderer,
): ReadyToRenderContent => ({
  title,
  anchor,
  render,
});

export default wrapContent;
