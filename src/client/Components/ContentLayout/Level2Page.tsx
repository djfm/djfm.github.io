import React from 'react';

import BackToTop from '../common/BackToTop';

import {
  backToMenuAnchorId,
  Sections,
  SectionLinks,
} from './Section';

import { ReadyToRenderContent } from './Content';

type SubPageProps = {
  title: string
  sections: ReadyToRenderContent[]
};

export const SecondLevelPage: React.FC<SubPageProps> = ({
  title,
  sections,
}: SubPageProps) => (
  <article>
    { /* eslint-disable-next-line react/no-danger */ }
    <h2 id={backToMenuAnchorId} dangerouslySetInnerHTML={{ __html: title }} />
    <SectionLinks sections={sections} />
    <Sections sections={sections} nestingLevel={3} />
    <BackToTop />
  </article>
);

export default SecondLevelPage;
