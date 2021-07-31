Construction du *Lexer*
=======================

Le *lexer* est la première couche d'analyse du texte
source, en gros, il va s'occuper de séparer les lignes,
d'enlever les espaces entre les suites de caractères qui font
sens ensemble et de grouper ces suites de caractères
dans des tableaux. On simplifie ainsi un peu notre problème.

Les objets renvoyés par le lexer seront appelés des *tokens*.

On parle parfois de *tokenizer* à la place de *lexer*,
ou bien parfois il y a les deux couches.

Comme je ne sais pas vraiment encore comment je vais implémenter
la chose, je pense que ce sera un hybride :
un *lexer* qui crée des *tokens*.

Ah oui, et ces *tokens* contiendront aussi le numéro de ligne
et de colonne qu'ils occupent dans le fichier source original,
ce qui pourra se révéler fort utile pour débugger.

Un bon Début
------------

Ça commence assez, bien, je définis un type `LexerToken` pour
représenter un *token*, i.e. l'équivalent d'un mot pour notre
petit langage de formatage de texte, et *Copilot* me suggère
successivement toutes les propriétés du `LexerToken`.

@@Image(/img/copilot/md/lexer-type.png alt="suggestion du type")

Et ainsi de suite *Copilot* me suggère tout pour avoir au final :

```typescript
export type LexerToken = {
  type: string
  value: string
  line: number
  column: number
}
```

**Je n'ai rien tapé après `export type LexerToken`**.

Le coeur du module
------------------

Ensuite, tout naturellement, je définis ma fonction principale
et *Copilot* en comprend très bien la signature :

@@Image(/img/copilot/md/lexer-function.png alt="suggestion de la fonction")

*Copilot* me sauve
------------------

À un moment je m'apprêtais à faire une erreur, mais fort-heureusement
*Copilot* me fait une suggestion qui est correcte et me fait éviter mon
erreur :

@@Image /img/copilot/md/copilot-me-sauve.png alt="copilot me sauve"

Ce n'était pas complètement trivial.

Peut-être que comme juste avant j'ai écrit
`const endQuote = source.indexOf('```');` et qu'à la simple
lecture de ce code on se doute que la taille de `'```'`,
c'est-à-dire 3, va importer, il s'est dit que si je réutilisais
`endQuote` il fallait ajouter 3.

Peut-être aussi a-t-il compris plus profondément ce que je faisais,
et m'a fait la suggestion pour ça... je ne sais pas.
Est-ce que je vois de l'intelligence là où il n'y a que du hasard ?

Est-ce que l'intelligence, c'est juste la capacité à trier
rapidement parmi les choses plausibles les choses appropriées ?
C'est à dire qu'on aurait à l'intérieur de nous comme un moteur
de suggestions, et de l'autre côté, un mécanisme de tri des
suggestions.

Est-ce que voir de l'intelligence ici est un simple biais cognitif ?

Est-ce la manifestation de la volonté naturelle de l'homme à trouver des explications partout ?
Celle-là même qui fait penser à certains que Dieu existe quand ils
contemplent le paysage merveilleux du haut d'une montagne ?

Plus j'Avance, plus *Copilot* se Rend Utile
-------------------------------------------

Plus j'avance dans le programme, plus j'ai le sentiment
que *Copilot* est utile, ça devient pour moi comme une
véritable présence bienveillante.
