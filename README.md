# Application de Gestion de Tâches

Cette application de gestion de tâches est développée avec Angular et Firebase. Elle permet aux utilisateurs de créer, modifier, supprimer des tâches, et de collaborer avec d'autres utilisateurs en les invitant à rejoindre leurs listes de tâches.

## Fonctionnalités

- **Authentification Firebase** : Inscription, connexion et gestion de l'authentification des utilisateurs via Firebase Authentication.
- **Gestion des Tâches** : Création, modification, suppression et visualisation des tâches.
- **Collaboration en Temps Réel** : Les utilisateurs peuvent inviter d'autres personnes à collaborer sur leurs listes de tâches.
- **Stockage Cloud** : Toutes les tâches et les listes sont stockées dans Firebase Firestore, permettant un accès et une synchronisation en temps réel.

## Installation et Démarrage

Pour installer et démarrer le projet, suivez ces étapes :

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/bibangjoseph/task-manager.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd task-manager
   ```
3. Installez les dépendances :
   ```bash
   npm install -f
   ```
4. Configurez Firebase en suivant les instructions dans le fichier `environment.ts` :

- Ajoutez vos clés d'API Firebase, les informations du projet, etc.

5. Démarrez l'application :
   ```bash
   ng serve
   ```
6. Ouvrez votre navigateur et accédez à :
   ```
   http://localhost:4200
   ```

## Utilisation

- **Créer une Tâche** : Utilisez le formulaire de création pour ajouter une nouvelle tâche.
- **Modifier une Tâche** : Cliquez sur une tâche existante pour la modifier.
- **Supprimer une Tâche** : Utilisez l'option de suppression pour retirer une tâche.
- **Inviter des Collaborateurs** : Invitez d'autres utilisateurs à collaborer sur une liste de tâches. Lors de l'invitation, vous pouvez spécifier les permissions des collaborateurs :
    - **Modification** : Permet au collaborateur de modifier les tâches existantes.
    - **Ajout** : Permet au collaborateur d'ajouter de nouvelles tâches à la liste.

## Génération de Fichiers

Le projet inclut des commandes pour générer différents types de fichiers :

- Pour créer une nouvelle page :
  ```bash
  npm run create-page
  ```
- Pour créer un nouveau composant :
  ```bash
  npm run create-component
  ```
- Pour créer un nouveau service :
  ```bash
  npm run create-service
  ```

## Contribution

Les contributions sous forme de suggestions, rapports de bogues, et améliorations sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Auteur

L'auteur de ce projet est **BIBANG BEFENE Joseph Donovan** (Développeur FullStack, Angular).
