import React from 'react';

import {
  NodePage,
  TitledContent,
  TitledContentFC,
} from '../Components/ContentLayout';

import Introduction from './Copilot/Introduction';

const pages: TitledContent[] = [
  Introduction,
];

const CopilotPage: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <NodePage content={CopilotContent} />
  </Container>
);

const CopilotContent: TitledContent = ({
  anchor: 'ia-github-copilot',
  title: <><i>Copilot</i>, une <i>IA</i> Troublante</>,
  longTitle: (
    <>
      La Fascinante <i>Copilot</i>,
      <br />
      l&apos;IA de <i>GitHub</i> pour les
      Codeurs
    </>
  ),
  documentTitle: 'Copilot par GitHub',
  children: pages,
  Content: CopilotPage,
}
);

export default CopilotContent;
