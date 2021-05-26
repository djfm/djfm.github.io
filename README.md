# djfm-site-perso

Mon site perso, pas encore construit, où je tâcherai quand même de publier mes avancées
à mesure que j'apprends de nouvelles choses en pratiquant.

## Les contraintes pour ce projet

- je ne veux pas payer un centime en hébergement
- je veux que ça charge à une vitesse sans pareil
- je veux utiliser des technos cool
- je veux tout faire à la main
- je veux que ce soit facile à maintenir

## Étude de solutions

Je n'ai pas cherché très longtemps, je pense que GitHub pages fera très bien l'affaire.
Je me crée donc le repo djfm.github.io

J'ajoute un fichier index.html à la raçine pour voir si le site marche.

Je commit, j'ajoute le remote qui va bien, et je push sur djfm.github.io.

Et donc ça marche, quand je vais sur [mon site](https://djfm.github.io/) après avoir fait
ce commit : [085b264](https://github.com/djfm/djfm.github.io/commit/085b264),
je vois bien hello qui s'affiche !

## Avant toute chose, j'ajoute mon nom de domaine

Je suis [le tutoriel](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain) sur l'ajout d'un "apex domain",
je ne sais pas du toût comment, et si ça se traduit.

En 5 minutes après 2 clics dans l'interface de GitHub et deux clics dans l'interface de Gandhi, c'est fait.
À mon agréable surprise, GitHub me génère un certificat SSL, et annonce que ça devrait prendre 30 minutes au plus.

Dès que ce sera bon, il faudra que je pense à aller cocher la case "Enforce HTTPs".
