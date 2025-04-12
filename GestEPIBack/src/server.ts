// ********** IMPORTS **********
// dotenv permet de charger les variables d'environnement depuis le fichier .env
// Ces variables contiennent des informations sensibles comme les ports, mots de passe, etc.
import dotenv from 'dotenv';

// On importe notre application Express configurée dans app.ts
// app.ts contient toute la configuration de notre serveur : routes, middlewares, etc.
import app from './app';

// On charge les variables d'environnement dans process.env
// Après cette ligne, on peut accéder aux variables comme process.env.PORT
dotenv.config();

// On définit le port sur lequel notre serveur va écouter
// Si PORT existe dans le .env on l'utilise, sinon on prend 3001 par défaut
// Le front React tourne sur le port 3000, donc on utilise 3001 pour le back
const PORT = process.env.PORT || 3001;

// On démarre le serveur Express sur le port choisi
// La méthode listen() fait deux choses :
// 1. Elle démarre le serveur sur le port spécifié
// 2. Elle exécute la fonction (callback) une fois le serveur démarré
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

/*
RÉSUMÉ DU FICHIER server.ts :
C'est le point d'entrée de notre API GestEPI. Son rôle est simple mais crucial :
1. Charger la configuration (.env)
2. Démarrer le serveur Express (configuré dans app.ts)
3. Afficher un message de confirmation

Ce fichier fait le lien entre :
- La configuration (variables d'environnement)
- L'application Express (app.ts)
- Le démarrage concret du serveur

C'est comme le "bouton ON/OFF" de notre API !
*/