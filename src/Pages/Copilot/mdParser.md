@@META(
  anchor="md-parser-example"
  title="Exemple de Copilot à l'Oeuvre dans l'Écriture d'un Parser"
)

Un Cas Pratique : l'Écriture d'un Parser de *Markdown*
======================================================

Je vais essayer d'illustrer le comportement de *Copilot*
à l'échelle d'un projet entier pour bien mettre en valeur
ce qu'il apporte.

J'ai choisi de créer un parser qui va transformer du texte
agréable à écrire en *HTML* pour ce site, parce que je me rends
compte que tous les aspects techniques du *React/HTML*
nuisent considérablement à ma créativité et me brident.

Alors oui, je sais, les parsers de *Markdown* qui produisent
du *HTML* ça existe déjà à la pelle mais :

- je veux générer des composants *React*, ce n'est pas
  tout à fait la même chose et je n'en ai pas trouvé
  qui convenait très bien à mes besoins

- j'aime bien faire les choses par moi même, c'est comme
  ça que j'apprends le plus

- j'aime particulièrement bien écrire des parsers

C'est de la totale improvisation, je définis les spécifications
au fur et à mesure que je développe l'outil, en fonction de ce
qui me semble pratique à l'usage.

Pardon je me trompe de terme, c'est du développement agile
orienté utilisateur et bottom-up.

Alors essayons ça, c'est parti !

@@SECTIONS(
  ./mdParser/lexer.md
  ./mdParser/unitTests.md
)
