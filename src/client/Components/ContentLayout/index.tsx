// eslint-disable-next-line react/jsx-filename-extension
import React from 'react';

import {
  HeadingFC,
} from './makeHeadingFC';

export { HeadingFC };
export { default as SectionList } from './SectionList';
export { default as NodePage } from './NodePage';
export { default as makeHeadingFC } from './makeHeadingFC';

export type TitledContentFCProps = {
  Container: React.FC
  H1: HeadingFC
  H2: HeadingFC
}

export type TitledContentFC = React.FC<TitledContentFCProps>;

export type TitledContent = {
  anchor: string
  children?: TitledContent[]
  documentTitle?: string
  headerBody?: TitledContentFC
  isLeaf?: true
  title: React.ReactElement | string
  Content?: TitledContentFC
}
