# Mise en place du service exercice

## Version des logiciels nécessaires

[**Docker**](https://www.docker.com/products/docker-desktop) : v20.10.14, build a224086349

[**Docker Compose**](https://docs.docker.com/compose/install/) : v2.4.1

[**NodeJs**](https://nodejs.org/en/download/) : v16.13.2

[**npm**](https://www.npmjs.com/get-npm) : v8.1.2

[**nvm**](https://github.com/nvm-sh/nvm) : v0.39.1

## Installation avec docker (docker-compose).

**Attention** : bien remplir les champs obligatoires dans le .env.

1. Copier env.example.prod en .env et le remplir si besoin (normalement pas besoin) avec docker

2. lancement les conteneurs

```bash
docker-compose up
```

3. Éteindre et supprimer les conteneurs (ajouter -v pour supprimer les volumes de données)

```bash
docker-compose down
```

## Installation sans docker

Pour l'installation sans docker, Il est nécessaire d'avoir installé une base de données mongoDB.

### Build du service exercice

**Attention** : vérifier que la version de node (v16.13.2) est installée sur votre système.
Utiliser nvm pour installer la version de node souhaitée si besoin (`nvm install && nvm use`).

1. executer la commande suivante pour installer et/ou mettre a jour les dépendances :
   `npm install`

2. build le projet :
   `npm run build`

3. Éventuellement, supprimer les dépendances de developpement :
   `rm -r node_modules && npm install --production`

4. lancer le service :
   `npm run start`
