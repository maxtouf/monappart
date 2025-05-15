# MonAppart - Application de suivi d'achat d'appartement

Cette application web permet aux particuliers de suivre l'ensemble des étapes de l'achat d'un appartement, de la recherche initiale à la remise des clés, avec centralisation des informations, gestion des documents et rappels de tâches.

## Fonctionnalités principales

- **Tableau de bord** : Vue synthétique de l'avancement du projet d'achat
- **Gestion des tâches** : Liste des tâches à accomplir à chaque étape avec alertes pour les échéances importantes
- **Centralisation des documents** : Espace pour stocker et organiser les documents importants
- **Gestion des contacts** : Fiches pour les intervenants (notaire, agent immobilier, banque, etc.)
- **Suivi des financements** : Calculatrice de financement et suivi des démarches

## Technologies utilisées

- Next.js (React)
- TypeScript
- Tailwind CSS
- DaisyUI
- Zustand (gestion d'état)
- localStorage (stockage local des données)

## Installation et démarrage

1. Cloner le dépôt :
```bash
git clone https://github.com/maxtouf/monappart.git
cd monappart
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Structure du projet

- `src/app/` - Pages principales de l'application
- `src/components/` - Composants React réutilisables
- `src/lib/` - Utilitaires, constantes et magasin de données

## Stockage des données

Toutes les données sont stockées localement dans le navigateur via localStorage. L'application fonctionne entièrement côté client, sans nécessiter de serveur backend.

## Confidentialité

Les données ne quittent jamais votre navigateur, ce qui garantit la confidentialité de vos informations.

## Licence

MIT