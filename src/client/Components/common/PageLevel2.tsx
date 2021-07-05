import React from 'react';

import BackToTop from './BackToTop';

import {
  backToMenuAnchorId,
  Sections,
  SectionLinks,
} from './Section';

import { ReadyToRenderContent } from './Content';

type SecondLevelPageProps = {
  title: string,
  sections: ReadyToRenderContent[]
};

export const SecondLevelPage: React.FC<SecondLevelPageProps> = ({
  title,
  sections,
}: SecondLevelPageProps) => {
  const markup = (
    <article>
      <h2 id={backToMenuAnchorId}>{title}</h2>
      <SectionLinks sections={sections} />
      <Sections sections={sections} nestingLevel={3} />
      <BackToTop />
    </article>
  );

  return markup;
};

export default SecondLevelPage;
