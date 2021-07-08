import React, {
  useEffect,
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
}: RootPageProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  });

  return content.render(
    Template,
    makeHeadingFC(1),
    makeHeadingFC(2),
  );
};

export default RootPage;
