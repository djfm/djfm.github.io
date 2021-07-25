import React from 'react';

import {
  SectionList,
  TitledContent,
  TitledContentFC,
} from '../../Components/ContentLayout';

import CodeSample from '../../Components/common/CodeSample';

const sections = [] as TitledContent[];

const StunningFeature: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      C&apos;est vraiment la fonctionnalité de <i>TypeScript</i> qui
      m&apos;émerveille le plus pour le moment.
    </p>
    <p>
      Le &quot;<strong><i>type-narrowing</i></strong>&quot;&nbsp;-&nbsp;que
      je traduis par &quot;
      <strong>
        découverte incrémentale des types
      </strong>&quot;
      (mais je n&apos;ai trouvé aucune traduction du
      terme nulle-part et donc j&apos;ai du l&apos; inventer, ce n&apos;est peut-être pas
      la plus juste... cela-dit, <strong>personne ne parle de TypeScript</strong> en
      français donc je fais ce que je veux&nbsp;!) mais je crois que dans la suite je dirai
      plus simplement <strong>type-narrowing</strong> ou encore
      simplement <strong>narrowing</strong>
      &nbsp;- est en gros&nbsp;:
    </p>
    <p>
      <strong>
        le fait, pour le compilateur, d&apos;assigner à
        un symbole (une variable, une fonction) ou même à une expression en général un type,
        d&apos;abord assez générique, puis, selon l&apos;usage de l&apos;expression
        fait par le code, de déduire un type plus précis,
        de resserrer (&quot;narrow&quot; = étroit) le champ
        des possibles pour le type considéré
      </strong>.
    </p>
  </Container>
);

sections.push({
  title: 'Une fonctionnalité épatante',
  anchor: 'top-ts-feature',
  Content: StunningFeature,
});

const TypeSystemPhilosophy: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>Pour moi le <i>narrowing</i> est la clef de voûte de TypeScript.</p>
    <p>
      J&apos;ai déjà utilisé plein de langages typés (TurboPascal, C, C++, Haskell...) et
      j&apos;ai toujours trouvé que les types étaient d&apos;un&nbsp;
      <strong>
        grand intérêt pour minimiser
        les erreurs d&apos;exécution
      </strong>. Mais je n&apos;ai jamais vu un système de types se comporter
      comme celui de <i>TypeScript</i>.
    </p>
    <p>
      En même-temps, pour rajouter des types à un langage par nature
      aussi anarchique que <i>JavaScript</i> sans
      pourrir complètement l&apos;expérience de développement il fallait frapper fort.
    </p>
    <p>
      Et c&apos;est exactement ce qu&apos;à fait l&apos;équipe de <i>TypeScript</i>. Bravo.
    </p>
    <p>
      J&apos;avais longtemps été réticent à utiliser <i>TypeScript</i> parce que
      j&apos;étais persuadé que cela allait dénaturer&nbsp; <i>JavaScript</i>, me rendre
      moins productif.
    </p>
    <p>
      Ça c&apos;était à cause des système de types que je connaissais&nbsp;: tous très rigides.
    </p>
    <p>
      Mais le système de types de <i>TypeScript</i> est à ma connaissance unique en son genre.
      <br />
      C&apos;était vraiment la manière intelligente de typer JavaScript.
    </p>
    <p>
      En gros, le système de types de <i>TypeScript</i> pourrait se résumer à
      cette question, qui est celle que je m&apos;imagine que le compilateur se
      pose en permanence :
    </p>
    <p>
      <strong>
        &quot;Est-ce que, en fonction de tout ce que je sais à ce stade, l&apos;utilisateur
        est en train de potentiellement faire une grosse connerie ou pas ?&quot;
      </strong>
    </p>
    <p>
      Et la <strong>grande finesse</strong> de <i>TypeScript</i> tient dans le&nbsp;:
      <br />
      <strong>tout ce que je sais à ce stade</strong>
    </p>
    <p>
      C&apos;est à dire que <i>TypeScript</i> ne va pas se contenter de regarder les types
      des symboles qu&apos;on manipule.
      <br />
      Il va aussi regarder comment on les manipules,
      et <strong>intégrer dynamiquement</strong>&nbsp;
      dans la résolution des types les informations <strong>sûres</strong> qu&apos;il
      est capable de déduire du code qu&apos;on écrit.
    </p>
    <p>
      Souvent ce qui se passe, c&apos;est qu&apos;on va passer d&apos;un type assez vague
      à un type très précis, et ce de manière <strong>sûre</strong>, c&apos;est pourquoi
      je me concentre autant sur le <i>narrowing</i> dans ce chapître.
    </p>
  </Container>
);

sections.push({
  title: <>La philosophie du système de types en <i>TypeScript</i></>,
  anchor: 'philosophie-typescript',
  Content: TypeSystemPhilosophy,
});

const CPPCounterExample: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      Souvent, en C++, je me retrouvais à vouloir faire des choses du genre
      de ce qui suit&nbsp;:
    </p>
    <CodeSample language="cpp" title="Quelque chose qui ne marche pas en CPP">
      {`
        class Base {
          public:
          std::string type;
        };

        class A : public Base {
          public:

          A() {
            type = 'A';
          }
        };

        class B : public Base {
          public:
          std::string somethingOnlyBHas;

          B() {
            type = 'B';
            somethingOnlyBHas = "this is my secret message";
          }
        };

        void useInstance(Base *inst) {
          std::cout << "Instance type " << inst->type << std::endl;

          if (inst->type == "B") {
            // erreur : class "Base" has no member "somethingOnlyBHas"
            std::cout << inst->somethingOnlyBHas << std::endl;
          }
        }
      `}
    </CodeSample>
    <p>
      Il y a bien sûr une solution, mais le problème est qu&apos;elle nous fait perdre
      toute l&apos;aide du compilateur.
    </p>
    <p>
      La solution est de brutalement caster <i>Base</i> vers <i>B</i>, ce qu&apos;on peut faire,
      mais qui nous fait perdre tout contrôle du compilateur car le compilateur ne cherche
      pas à savoir si <i>inst</i> peut être castée en <i>B</i>.
    </p>
    <CodeSample language="cpp" title="Le contournement qui marche en CPP">
      {`
        void useInstance(Base *inst) {
          std::cout << "Instance type " << inst->type << std::endl;

          if (inst->type == "B") {

            // Ici, le compilateur se fiche pas mal que
            // inst soit vraiment de type B, si jamais il y a d'autres
            // classes qui héritent de Base et qui ont le type B,
            // on court droit à la segfault
            B *b = (B *) inst;

            std::cout << b->somethingOnlyBHas << std::endl;
          }
        }
      `}
    </CodeSample>
    <p>Voilà un équivalent qui marche et qui est sûr en <i>TypeScript</i>&nbsp;:</p>
    <CodeSample language="typescript" title="Exemple de narrowing dans un cas d'héritage">
      {`
        interface Base {
          type: string
        }
        interface A extends Base {
          type: 'A'
        }

        interface B extends Base {
          type: 'B'
          somethingOnlyBHas: string
        }

        type ChildOfBase = A | B;

        const useInstance = (inst: ChildOfBase) => {
          if (inst.type === 'B') {
            console.log(inst.somethingOnlyBHas);
          }
        };
      `}
    </CodeSample>
  </Container>
);

sections.push({
  title: <>Une Comparaison au C++ qui Fait Briller <i>TypeScript</i></>,
  anchor: 'comparaison-cpp-ts',
  Content: CPPCounterExample,
});

export const TypeNarrowingPage: TitledContentFC = ({
  Container,
  H1,
}) => (
  <Container>
    <SectionList depth={H1.depth} sections={sections} />
  </Container>
);

const TypeNarrowingContent: TitledContent = {
  anchor: 'type-narrowing',
  documentTitle: 'Le Type Narrowing en TypeScript',
  title: <>Le &quot;Type Narrowing&quot;</>,
  Content: TypeNarrowingPage,
};

export default TypeNarrowingContent;
