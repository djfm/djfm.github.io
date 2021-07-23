/* eslint-disable react/jsx-filename-extension */
import React, { ReactElement } from 'react';

import {
  HeadingFC,
} from './makeHeadingFC';

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
  title: ReactElement | string
  documentTitle?: string
  childrenMeta?: ContentMeta[]
}

export type ContentRenderer = (
  tag: React.FC,
  h1Tag: HeadingFC,
  h2Tag: HeadingFC,
) => ReactElement;

export type ContentWithRender = ContentMeta & {
  render: ContentRenderer
}

export type WrappedContent = ContentWithRender & {
  setDocumentTitle: (documentTitle: string) => WrappedContent
}

export const wrapContent = (
  title: ReactElement | string,
  anchor: string,
  render: ContentRenderer,
  childrenMeta?: ContentMeta[],
): WrappedContent => {
  const data = {
    title,
    anchor,
    render,
    childrenMeta,
    setDocumentTitle: (
      documentTitle: string,
    ) => ({
      ...data,
      documentTitle,
    }),
  };

  return data;
};

export default wrapContent;
