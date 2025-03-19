# GestEPI - Gestion des Équipements de Protection Individuelle

Application de gestion des EPI (Équipements de Protection Individuelle) pour les travaux en hauteur.

## Structure du projet

- **GestEPIBack** : API backend en Node.js/Express/TypeScript
- **GestEPIFront** : Interface utilisateur en React/TypeScript

## Installation

### Prérequis

- Node.js (v14+)
- MariaDB ou MySQL

### Backend (GestEPIBack)

1. Installer les dépendances :
   ```bash
   cd GestEPIBack
   npm install
   ```

2. Configurer la base de données :
   - Créer une base de données MariaDB/MySQL
   - Exécuter le script SQL dans `database.sql`
   - Copier `.env.example` vers `.env` et configurer les variables

3. Démarrer le serveur :
   ```bash
   npm run dev
   ```

### Frontend (GestEPIFront)

1. Installer les dépendances :
   ```bash
   cd GestEPIFront
   npm install
   ```

2. Configurer l'API :
   - Copier `.env.example` vers `.env` et configurer l'URL de l'API

3. Démarrer l'application :
   ```bash
   npm start
   ```

## Fonctionnalités

- Gestion des EPI (ajout, modification, suppression)
- Suivi des contrôles périodiques
- Alertes pour les contrôles à venir
- Consultation de l'historique des contrôles

## Licence

MIT 