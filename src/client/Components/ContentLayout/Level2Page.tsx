import React, {
  ReactNode,
  useEffect,
} from 'react';

import BackToTop from '../common/BackToTop';

import {
  backToMenuAnchorId,
  Sections,
  SectionLinks,
} from './Section';

import { ContentWithRender } from './Content';

type SubPageProps = {
  title: ReactNode
  sections: ContentWithRender[]
};

export const SecondLevelPage: React.FC<SubPageProps> = ({
  title,
  sections,
}: SubPageProps) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const [el] = document.getElementsByTagName('h2');
      if (el) {
        document.title = el.innerText;
      }
    }
  });

  const markup = (
    <article>
      { /* eslint-disable-next-line react/no-danger */ }
      <h2 id={backToMenuAnchorId}>
        {title}
      </h2>
      <SectionLinks sections={sections} />
      <Sections sections={sections} nestingLevel={3} />
      <BackToTop />
    </article>
  );

  return markup;
};

export default SecondLevelPage;
