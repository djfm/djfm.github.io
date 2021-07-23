import React, {
  useEffect,
  ReactNode,
} from 'react';

import { NotTooWide } from '../common/Styled';

import { ContentWithRender } from './Content';
import makeHeadingFC from './makeHeadingFC';

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
  content: ContentWithRender,
};

export const RootPage: React.FC<RootPageProps> = ({
  content,
}: RootPageProps) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (content.documentTitle) {
        document.title = content.documentTitle;
        return;
      }

      const [el] = document.getElementsByTagName('h1');
      if (el) {
        document.title = el.innerText;
      }
    }
  });

  return content.render(
    Template,
    makeHeadingFC(1),
    makeHeadingFC(2),
  );
};

export default RootPage;
