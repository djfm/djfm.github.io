import React from 'react';

import CodeSample from '../../common/CodeSample';

import {
  useDocument,
} from '../../common/hooks';

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
    <article>
      <header>
        <h1>{title}</h1>
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
            <CodeSample title="Un exemple d'interface">
              {`
              interface Node {
                type: string
              }

              interface TextNode
                extends Node {
                  type: 'TextNode'
                  value: string
              }`}
            </CodeSample>
          </li>
          <li>
            les types peuvent être combinés par union (<i>|</i>) ou par
            intersection (<i>&</i>)
          </li>
        </ul>
      </section>
    </article>
  );

  return markup;
};

export default TypesVSInterfaces;
