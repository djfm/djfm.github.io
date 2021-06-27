import React from 'react';

import {
  Article,
  H1,
} from '../common/Styled';

import CodeSample from '../common/CodeSample';

import {
  useDocument,
} from '../common/hooks';

const extendExample = `interface Node {
  type: string
}

interface TextNode
  extends Node {
    type: 'TextNode'
    value: string
  }`;

const TypesVSInterfaces: React.FC<{
  title: string,
  docTitle?: string,
}> = ({
  title,
  docTitle,
}) => {
  useDocument((document) => {
    document.title = docTitle || title;
  });

  const markup = (
    <Article>
      <header>
        <H1>{title}</H1>
        <p>
          En fait, c&apos;est à peu de choses près la même chose.
        </p>
      </header>
      <section>
        La différence principale vient de la façon dont on peut les
        combiner&nbsp;:
        <ul>
          <li>
            une interface peut étendre une autre interface
            <CodeSample title={"Un exemple d'interface\u00a0:"}>
              {extendExample}
            </CodeSample>
          </li>
          <li>
            les types peuvent être combinés par union (<i>|</i>) ou par
            intersection (<i>&</i>)
          </li>
        </ul>
      </section>
    </Article>
  );

  return markup;
};

export default TypesVSInterfaces;
