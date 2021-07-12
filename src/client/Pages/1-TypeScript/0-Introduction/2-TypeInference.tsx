import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

export default wrapContent(
  <>L&apos;inférence de types</>,
  'inference-de-types',
  (Section) => (
    <Section>
      <p>
        TypeScript est <strong>très bon pour faire de l&apos;inférence de types</strong>.
      </p>
      <p>
        J&apos;y reviendrai.
      </p>
    </Section>
  ),
);
