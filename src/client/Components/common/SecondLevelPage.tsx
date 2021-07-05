import React from 'react';

import BackToTop from './BackToTop';

import {
  Sections,
  SectionLinks,
  WrappedSection,
} from './Section';

type SecondLevelPageProps = {
  title: string,
  sections: WrappedSection[]
};

export const SecondLevelPage: React.FC<SecondLevelPageProps> = ({
  title,
  sections,
}: SecondLevelPageProps) => {
  const markup = (
    <article>
      <h2>{title}</h2>
      <SectionLinks sections={sections} />
      <Sections sections={sections} nestingLevel={3} />
      <BackToTop />
    </article>
  );

  return markup;
};

export default SecondLevelPage;
