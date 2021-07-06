import React, {
  ReactNode,
} from 'react';

import { NotTooWide } from '../common/Styled';

import { ReadyToRenderContent } from './Content';
import makeHeadingFC from '../common/makeHeadingFC';

type TemplateProps = {
  children: ReactNode
}

const Template: React.FC<TemplateProps> = ({
  children,
}: TemplateProps) => (
  <main>
    <NotTooWide>
      {children}
    </NotTooWide>
  </main>
);

type RootPageProps = {
  content: ReadyToRenderContent,
};

export const RootPage: React.FC<RootPageProps> = ({
  content,
}: RootPageProps) => content.render(Template, makeHeadingFC(1));

export default RootPage;
