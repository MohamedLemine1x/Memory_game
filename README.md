# Memory Game 🎮

## À propos
Memory Game est un jeu de mémoire interactif développé avec React et TypeScript. Le jeu consiste à retrouver les paires de cartes identiques en les retournant deux par deux. Un jeu simple mais captivant qui met à l'épreuve votre mémoire !

## Fonctionnalités

- 🎲 8 paires de cartes avec des symboles uniques
- ⏱️ Chronomètre pour mesurer votre temps de jeu
- 🏆 Système de score et de meilleur score sauvegardé localement
- 📊 Compteur de mouvements
- 🎯 Détection automatique de fin de partie
- 🔄 Possibilité de réinitialiser la partie à tout moment

## Technologies utilisées

- **React** - Bibliothèque front-end pour la création d'interfaces utilisateur
- **TypeScript** - Ajout de typage statique à JavaScript
- **Vite** - Outil de build rapide pour le développement moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **LocalStorage** - Pour sauvegarder les meilleurs scores

## Comment jouer

1. Cliquez sur n'importe quelle carte pour commencer la partie
2. Retournez deux cartes pour tenter de trouver une paire
3. Si les deux cartes sont identiques, elles restent visibles
4. Si elles sont différentes, elles se retournent après un court délai
5. Le jeu est terminé lorsque toutes les paires sont trouvées
6. Essayez de terminer avec le moins de mouvements et le temps le plus court possible !

## Installation et lancement

```bash
# Cloner le dépôt
git clone [URL du dépôt]

# Accéder au répertoire du projet
cd Memory_Game/project

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev

# Construire pour la production
npm run build
```

## Développement

Le projet est structuré comme suit :
- `src/App.tsx` - Composant principal du jeu
- `src/types.ts` - Définition des types TypeScript
- `src/index.css` - Styles CSS de l'application

## Auteur

[Lemine]

## Licence

Ce projet est sous licence MIT.

---

Amusez-vous bien ! 🎮
