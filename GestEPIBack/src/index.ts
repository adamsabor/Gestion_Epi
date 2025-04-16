// ************************************************************************
// 🎓 POINT D'ENTRÉE PRINCIPAL - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// On importe l'application Express qui a été configurée dans app.ts
// app.ts contient toute la configuration : middlewares, routes, sécurité...
import app from './app';

// ⚙️ CONFIGURATION DU PORT D'ÉCOUTE
// Pour l'épreuve E6, il est important de comprendre :
// 1. process.env.PORT : Variable d'environnement qui permet de:
//    - Laisser l'hébergeur (ex: Heroku) choisir son port
//    - Ne pas exposer le port en dur dans le code (sécurité)
//    - Adapter le port selon l'environnement (dev/prod)
// 2. || 3001 : Opérateur "OU logique"
//    - Si process.env.PORT n'existe pas, on utilise 3001
//    - C'est une bonne pratique pour le développement local
const port = process.env.PORT || 3001;

// 🚀 DÉMARRAGE DU SERVEUR
// La méthode app.listen() est cruciale car elle :
// 1. Démarre le serveur HTTP sur le port spécifié
// 2. Met l'application en attente de requêtes
// 3. Exécute une fonction callback quand le serveur est prêt
//
// Syntaxe importante pour l'E6 :
// - Fonction fléchée (=>): Syntaxe moderne de JavaScript/TypeScript
// - Template literal (`...${port}`): Permet d'insérer des variables dans un string
app.listen(port, () => {
  console.log(`✅ Serveur GestEPI démarré sur http://localhost:${port}`);
});

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est le point de départ de l'application. Il :
// 1. Charge la configuration du serveur Express
// 2. Définit le port d'écoute de manière sécurisée
// 3. Démarre le serveur HTTP
//
// Points techniques à souligner :
// - Architecture Node.js/Express
// - Variables d'environnement (process.env)
// - Gestion des environnements (dev/prod)
// - Bonnes pratiques de sécurité
