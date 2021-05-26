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

## Préparation de l'environnement de travail

Pour utiliser yarn 2 en Zéro-Install mais en conservant le familier
dossier node_modules :

```bash
yarn init
yarn set version berry
echo 'nodeLinker: node-modules' >> .yarnrc.yml
yarn set version latest
```

J'ajoute également le .gitignore recommandé par Yarn 2 dans le cas du Zéro Install,
qui est le mien. Zéro Install c'est à dire que sitôt clôné, le projet est prêt à tourner.
Oui on commite les node_modules. On s'en fout, la bande passante et le stockage ne coûtent
rien. Moi je trouve ça très bien comme approche, on a des programmes parfaitement reproductibles.

## Setup du Linter

On va faire du TypeScript, du React, et du SSR - au moins.

### Typescript

Donc j'installe ce qu'il faut pour typescript :

```
yarn add typescript
yarn add ts-node @types/node
```

### Eslint

#### Côté JS

Et j'enchaîne sur eslint.

Comme d'hab, je pars de la doc sur [le site](https://yarnpkg.com/package/eslint-config-airbnb) du paquet.

```bash
npm info "eslint-config-airbnb@latest" peerDependencies
# use the appropriate versions when installing, as given by the previous command
yarn add -D eslint-config-airbnb@latest
yarn add -D eslint@7.2.0 eslint-plugin-import@^2.22.1 eslint-plugin-jsx-a11y@^6.4.1
yarn add -D eslint-plugin-react@^7.21.5 eslint-plugin-react-hooks@^4
```

Et là je prépare un peu la config d'eslint.

Vous pouvez retrouver l'état du .eslintrc dans l'[historique de GitHub](https://github.com/djfm/djfm.github.io/blob/1c3ce0204dd0dc9c06b85f37fec435580856fcbb/.eslintrc.json).

#### Côté TypeScript

Je suis la [doc officielle](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md) de typescript-eslint :

```bash
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Vous pouvez voir le nouveau .eslintrc.json dans [le commit qui correspond](https://github.com/djfm/djfm.github.io/blob/f6a503aaef023f1e41a24576e802054be411bbb5/.eslintrc.json)...

#### A last plugin for eslint

I'm gonna do some node-side things so:

```
yarn add -D eslint-plugin-node
```

Et on ajoute aux plugins dans le .eslintrc l'entrée :

`"plugin:node/recommended"`

Voilà, on est à peu près prêts à travailler.

## Configuration de webpack et du serveur local

J'ai parlé un peu vite, on a tout de suite besoin de webpack
pour travailler, donc c'est reparti pour du setup !

J'installe donc :

```bash
yarn add -D ts-loader babel-loader @babel/core webpack webpack-cli
```

Puis je crée [une config webpack minimale](https://github.com/djfm/djfm.github.io/blob/d259695204c81d2baedc1ef71e1b0b83ca8cf8ba/webpack.config.ts) et un [script build](https://github.com/djfm/djfm.github.io/blob/d259695204c81d2baedc1ef71e1b0b83ca8cf8ba/package.json#L10) dans
mon package.json que j'invoquerai avec :

```
yarn build
```

Il me manque encore la configuration de babel.

J'installe :

```bash
yarn add -D @babel/plugin-transform-react-jsx @babel/preset-env
```

Et je crée [une config babel minimale](https://github.com/djfm/djfm.github.io/blob/d259695204c81d2baedc1ef71e1b0b83ca8cf8ba/babel.config.json).

Enfin j'installe React pour avoir quelque chose à mettre sous la dent de webpack :

```bash
yarn add react react-dom @types/react
```

Et je crée [un composant minimal](https://github.com/djfm/djfm.github.io/blob/d259695204c81d2baedc1ef71e1b0b83ca8cf8ba/src/client/index.tsx).

Enfin, encore un déboire avec le fichier tsconfig.json que
je n'avais pas créé, donc j'en mets [un minimal](https://github.com/djfm/djfm.github.io/blob/d259695204c81d2baedc1ef71e1b0b83ca8cf8ba/tsconfig.json), et enfin, `yarn build` fait son oeuvre.


Il est grand temps de faire un commit.
