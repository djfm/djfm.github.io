import React from 'react';

import {
  SectionList,
  TitledContent,
  TitledContentFC,
} from '../../Components/ContentLayout';

import CodeSample from '../../Components/CodeSample';

const sections = [] as TitledContent[];

const Introduction: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      En fait, en <i>TypeScript</i>, un type et une interface
      c&apos;est à peu de choses près la même chose.
    </p>
    <p>
      La différence principale vient de la façon dont on peut
      combiner ces deux &quot;types de types&quot;:
    </p>
    <p>
      Une interface peut étendre une autre interface,
      tandis qu&apos;un type ne peut ni étendre un autre type
      ni étendre une interface.
    </p>
    <p>
      Les types peuvent se combiner les uns avec les autres,
      soit par union, soit par intersection.
    </p>
    <p>
      Cette distinction de comportement entre types et interface
      reflète bien les fameux paradigmes de l&apos;extension
      de fonctionnalité - qu&apos; on oppose souvent - que sont
      la composition et l&apos; héritage. <i>TypeScript</i> propose
      des constructions pour chacun des deux clans.
    </p>
  </Container>
);

sections.push({
  title: 'Introduction',
  anchor: 'types-de-types',
  Content: Introduction,
});

const Interfaces: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      Les interfaces en <i>TypeScript</i> sont, je pense, similaires aux interfaces
      dans tous les langages qui ont des interfaces&nbsp;: elles décrivent
      la &quot;forme&quot; que peut prendre un objet, une classe, une fonction...
      mais elle n&apos;en définissent pas l&apos;implémentation.
    </p>
    <p>
      Une interface peut étendre une autre interface, en voici un exemple&nbsp;:
    </p>
    <CodeSample title={'"TextNode" étend "Node"'}>
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
      Cela dit, la notion d&apos;extension ou d&apos;implémentation en<i>TypeScript</i>&nbsp;
      est un peu différente d&apos;autres langages comme le C++ ou le PHP par exemple.
    </p>
    <p>
      En effet on pourrait dire qu&apos;en <i>TypeScript</i>&nbsp;
      tout étend à peu près tout, dans la mesure où même si
      on type les paramètres d&apos;une fonction,
      on pourra <strong>lui passer n&apos;importe quel type jugé compatible</strong>&nbsp;
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
      En PHP si vous déclarez que votre fonction a besoin d&apos;un
      paramètre implémentant telle interface, vous ne pourrez utiliser
      cette fonction qu&apos;avec un paramètre implémentant explicitement
      l&apos;interface attendue.
    </p>
    <p>
      <strong>
        En <i>TypeScript</i>, en gros, tant que l&apos;analyse statique
        du code conclut que ça va marcher, vous faites ce que
        vous voulez.
      </strong>
    </p>
  </Container>
);

sections.push({
  title: 'Une interface peut en étendre une autre',
  anchor: 'interface-extend',
  Content: Interfaces,
});

const Types: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      Les types en <i>TypeScript</i> peuvent se combiner
      par union avec l&apos;opérateur &quot;|&quot;, ou
      par intersection avec l&apos;opérateur &quot;&amp;&quot;, pour créer
      des types plus complexes.
    </p>
    <CodeSample title="Exemples d'intersection et d'union de types">
      {`
        type Person = {
          name: string
        }

        type Traveller = Person & {
          hasPassport: true
        }

        type Robot = {
          CPUs: number
          RAM: number
          version: string
        }

        type Employee = Person | Robot
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

    <CodeSample title="Union de types">
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
      n&apos;importe laquelle des propriétés de A ou de B, mais il
      doit au moins avoir soit toutes les propriétés de A, soit
      toutes les propriétés de B.
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
  </Container>
);

sections.push({
  title: 'Union et intersection de types',
  anchor: 'types-union-intersection',
  Content: Types,
});

export const TypesVSInterfacesPage: TitledContentFC = ({
  Container,
  H1,
}) => (
  <Container>
    <SectionList depth={H1.depth} sections={sections} />
  </Container>
);

const TypesVSInterfacesContent: TitledContent = {
  anchor: 'types-vs-interfaces',
  children: sections,
  documentTitle: 'Types vs. Interfaces en TypeScript',
  title: 'Types vs. interfaces',
  isLeaf: true,
  Content: TypesVSInterfacesPage,
};

export default TypesVSInterfacesContent;
