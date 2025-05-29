# Crypto SaaS Landing Page

Bienvenue sur la landing page de votre SaaS Crypto, un projet développé avec Vite.js, React, TypeScript et Tailwind CSS. Ce site est conçu pour offrir une expérience utilisateur ultra-moderne et immersive, avec des animations sophistiquées propulsées par GSAP.

## Fonctionnalités Clés

- **Design Minimaliste et Ultra-moderne :** Inspiré par les tendances de design web de 2025 et les sites primés sur Awwwards/Framer.
- **Animations GSAP Avancées :**
    - ScrollTrigger pour le parallaxe et les révélations au défilement.
    - Timeline pour des séquences d'animations complexes.
    - Morphing SVG pour des transitions organiques.
    - Effets de déformation et micro-interactions.
    - Défilement horizontal intégré.
- **Typographie Dramatique :** Utilisation de polices Google Fonts (DM Sans, Space Grotesk, Poppins) pour un impact visuel fort.
- **Palette de Couleurs Époustouflante :** Mode sombre par défaut avec des accents néon subtils et des dégradés complexes.
- **Responsif :** Optimisé pour toutes les tailles d'écran (mobile, tablette, desktop).
- **Structure de Composants Modulaire :** Facile à maintenir et à étendre.
- **Curseur Personnalisé :** Un curseur interactif qui réagit au contexte.
- **Preloader Stylisé :** Une animation d'introduction fluide au chargement de la page.

## Technologies Utilisées

- **Framework :** React.js
- **Build Tool :** Vite.js
- **Langage :** TypeScript
- **Styling :** Tailwind CSS
- **Animations :** GSAP (GreenSock Animation Platform)

## Installation

Pour lancer le projet en local, suivez ces étapes :

1.  **Cloner le dépôt :**
    ```bash
    git clone <URL_DU_DEPOT>
    cd crypto-saas-landing
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    Le site sera disponible à l'adresse `http://localhost:5173` (ou un port similaire).

## Build pour la Production

Pour créer une version optimisée pour la production :

```bash
npm run build
# ou
yarn build
```
Les fichiers compilés seront disponibles dans le dossier `dist`.

## Linting

Pour vérifier la conformité du code aux règles ESLint :

```bash
npm run lint
# ou
yarn lint
```

## Structure du Projet

La structure du projet est organisée de manière logique pour faciliter le développement et la maintenance :

```
.
├── public/
├── src/
│   ├── assets/           # Images, SVGs, etc.
│   ├── components/       # Composants React réutilisables
│   │   ├── animations/   # Composants spécifiques aux animations (Preloader, Background)
│   │   ├── layout/       # Composants de mise en page (Header, Footer)
│   │   ├── sections/     # Composants de sections complètes (Hero, Features, etc.)
│   │   └── ui/           # Composants d'interface utilisateur génériques (Button, Cursor, etc.)
│   ├── hooks/            # Hooks React personnalisés (GSAP, curseur)
│   ├── main.tsx          # Point d'entrée de l'application
│   ├── App.tsx           # Composant racine de l'application
│   ├── index.css         # Styles globaux et imports Tailwind
│   └── vite-env.d.ts     # Déclarations d'environnement Vite
├── .gitignore            # Fichiers et dossiers à ignorer par Git
├── index.html            # Point d'entrée HTML
├── package.json          # Dépendances et scripts du projet
├── postcss.config.js     # Configuration PostCSS pour Tailwind
├── README.md             # Ce fichier
├── tailwind.config.js    # Configuration de Tailwind CSS
├── tsconfig.json         # Configuration TypeScript
├── tsconfig.node.json    # Configuration TypeScript pour Node.js
└── vite.config.ts        # Configuration de Vite.js
```