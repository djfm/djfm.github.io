import React from 'react';

import CodeSample from '../../common/CodeSample';
import wrapContent from '../../common/Content';

const pageTitle = 'Types vs. Interfaces';

export default wrapContent(
  pageTitle,
  'types-vs-interfaces',
  (Container, H1) => (
    <Container>
      <p>
        En fait, c&apos;est à peu de choses près la même chose.
      </p>
      <p>
        La différence principale vient de la façon dont on peut
        combiner ces deux &quot;types de types&quot;:
      </p>
      <section>
        <H1>Une interface peut étendre une autre interface</H1>

        <CodeSample title="Un exemple d'interface">
          {`
            interface Node {
              type: string
            }

            interface TextNode
              extends Node {
                type: 'TextNode'
                value: string
              }
          `}
        </CodeSample>

        <p>
          Cela dit, on pourrait dire qu&apos;en <i>TypeScript</i>&nbsp;
          tout étend à peu près tout, dans la mesure où même si
          on type les paramètres d&apos;une fonction,
          on pourra lui passer n&apos;importe quel type jugé compatible
          par <i>TypeScript</i>.
        </p>

        <CodeSample title="Exemple d&apos;usage d&apos;un mauvais type, mais compatible">
          {`
            type Rectangle = {
              width: number
              height: number
            }

            type Square = {
              width: number
              height: number
            }

            const computeArea = (rect: Rectangle) =>
              rect.width * rect.height;

            const square1: Square = {
              width: 10,
              height: 10,
            };

            console.log(computeArea(square1));
          `}
        </CodeSample>

        <p>
          <strong>
            C&apos;est différent de pas mal de langages
          </strong>, comme le PHP par exemple, où si vous déclarez
          que votre fonction a besoin d&apos;un paramètre implémentant
          telle interface, vous ne pourrez utiliser cette fonction
          qu&apos;avec un paramètre de l&apos;interface prévue.
        </p>
        <p>
          <strong>
            En <i>TypeScript</i>, tant que l&apos;analyse statique
            du code conclut que ça va marcher, vous faites ce que
            vous voulez.
          </strong>
        </p>
      </section>
      <section>
        <H1>
          Les types peuvent être combinés par union (<i>|</i>)&nbsp;
          ou par intersection (<i>&</i>)
        </H1>

        <CodeSample title="Exemple de d'intersection et d'union de types">
          {`
            type Person = {
              name: string
            }

            type Traveller = Person & {
              hasPassport: boolean
            }

            type PeopleIMetAtTheAirport = (
              Person | Traveller
            )[]
          `}
        </CodeSample>

        <p>
          Quand on fait une intersection de deux types, on déclare
          que le type résultant aura chacune des propriétés des
          deux types, en même temps.
        </p>

        <p>
          Quand on fait une union de deux types, on déclare que le
          type résultant aura un sous-ensemble de l&apos;union
          des propriétés des deux types.
          <strong>Mais pas n&apos;importe quel sous-ensemble</strong>, un
          objet, pour appartenir à une union, doit avoir au moins toutes
          les propriétés de l&apos;un des types de l&apos;union. On
          verra ça dans l&apos;exemple d&apos;après.
        </p>

        <CodeSample title="Exemple d&apos;union de types">
          {`
            interface Rectangle {
              width: number
              height: number
            }

            const computeArea = (rect: Rectangle) =>
              rect.width * rect.height;

            type hasWidth = {
              width: number
            }

            type hasHeight = {
              height: number
            }

            type UnionSquare = hasWidth | hasHeight;

            const unionSquareW: UnionSquare = {
              width: 15,
            };

            const unionSquareH: UnionSquare = {
              height: 15,
            };

            const unionSquare: UnionSquare = {
              width: 15,
              height: 32,
            };

            /**
             * La ligne qui suit provoque l'erreur suivante :
             *
             * Argument of type 'UnionSquare' is not assignable to
             * parameter of type 'Rectangle'. Property 'height'
             * is missing in type 'hasWidth' but
             * required in type 'Rectangle'.
             */

            console.log(
              computeArea(unionSquare),
            );

            type InterSquare = hasWidth & hasHeight

            const interSquare: InterSquare = {
              width: 30,
              height: 30,
            };

            /**
             * Mais ça, ça va très bien :
             */

            console.log(
              computeArea(interSquare),
            );
          `}
        </CodeSample>

        <p>
          Comme je le disais plus haut:&nbsp;pour être mêmbre
          d&apos;une union de types A et B, on objet peut avoir
          n&apos;importe quelles propriétés de A ou de B, mais il
          doit au moins avoir soit toutes celles de A, soit
          toutes celles de B.
        </p>

        <CodeSample title="Un membre d&apos;une union doit correspondre à au moins un type">
          {`
            type hasWidth = {
              width: number
            }

            type hasHeight = {
              height: number
              unitOfMeasurement: string
            }

            type UnionSquare = hasWidth | hasHeight;

            const unionSquareW: UnionSquare = {
              width: 15,
            };

            /**
             * La ligne qui suit provoque l'erreur suivante :
             *
             * Type '{ height: number; }' is not assignable to type
             * 'UnionSquare'. Property 'unitOfMeasurement'
             * is missing in type '{ height: number; }'
             * but required in type 'hasHeight'.
             */

            const unionSquareH: UnionSquare = {
              height: 15,
            };
          `}
        </CodeSample>

        <p>
          Enfin, ça va de soi, mais un membre d&apos;une union
          de types ne peut pas avoir de propriétés qui ne sont dans
          aucun des types de l&apos;union.
        </p>

        <CodeSample title="Les propriétés doivent être définies sur au moins un type">
          {`
            type hasWidth = {
              width: number
            }

            type hasHeight = {
              height: number
            }

            type UnionSquare = hasWidth | hasHeight;

            /**
             * La ligne qui suit provoque l'erreur suivante :
             *
             * Type '{ width: number; somethingElse: boolean; }'
             * is not assignable to type 'UnionSquare'.
             * Object literal may only specify known properties,
             * and 'somethingElse'
             * does not exist in type 'UnionSquare'.
             */

            const union: UnionSquare = {
              width: 15,
              somethingElse: true;
            };
          `}
        </CodeSample>
      </section>
    </Container>
  ),
);
