// eslint-disable-next-line react/jsx-filename-extension
import React from 'react';

import {
  HeadingFC,
} from './makeHeadingFC';

export { default as SectionList } from './SectionList';

export type TitledContentFCProps = {
  Container: React.FC
  H1: HeadingFC
  H2: HeadingFC
}

export type TitledContentFC = React.FC<TitledContentFCProps>;

export type TitledContent = {
  anchor: string
  documentTitle?: string
  title: React.ReactElement | string
  Content: TitledContentFC
}
