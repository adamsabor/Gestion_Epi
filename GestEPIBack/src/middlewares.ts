// ************************************************************************
// 🎓 MIDDLEWARES EXPRESS - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express.js fournit des types TypeScript pour typer nos fonctions
// Request : Contient toutes les informations de la requête HTTP entrante
// Response : Permet de construire et envoyer la réponse HTTP
// NextFunction : Fonction pour passer au middleware suivant dans la chaîne
import { NextFunction, Request, Response } from "express";

// On importe notre interface personnalisée pour les erreurs
// Elle définit la structure exacte que doivent avoir nos messages d'erreur
import ErrorResponse from "./pages/interfaces/ErrorResponse";

// 🛡️ MIDDLEWARE 404 - ROUTES NON TROUVÉES
// Ce middleware est exécuté quand aucune route ne correspond à l'URL demandée
// Important pour l'E6 : Comprendre qu'il agit comme un "filet de sécurité"
export const notFound = (
  request: Request,           // La requête HTTP avec l'URL non trouvée
  response: Response,         // L'objet pour construire notre réponse d'erreur
  nextFunction: NextFunction  // Permet de transmettre l'erreur au handler suivant
) => {
  // On définit le statut HTTP 404 (Not Found)
  response.status(404);
  // On crée une erreur avec l'URL qui a posé problème
  // request.originalUrl contient l'URL complète demandée
  const error = new Error(`Not found - ${request.originalUrl}`);
  // On passe l'erreur au gestionnaire global
  nextFunction(error);
};

// 🔍 GESTIONNAIRE D'ERREURS GLOBAL
// Ce middleware centralise la gestion de TOUTES les erreurs de l'application
// Pour l'E6 : C'est un point crucial pour la maintenance et le débogage
export const errorHandler = (
  error: Error,              // L'erreur qui s'est produite (message + stack)
  request: Request,          // La requête qui a causé l'erreur
  response: Response<ErrorResponse>, // Réponse typée avec notre interface
  nextFunction: NextFunction // Rarement utilisé dans un error handler
) => {
  // LOGIQUE DU CODE HTTP
  // Si un code d'erreur existe déjà et n'est pas 200 (succès)
  // on le garde, sinon on utilise 500 (erreur serveur)
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;
  
  // ENVOI DE LA RÉPONSE
  // Format JSON standardisé pour toutes nos erreurs
  // message : Description claire de l'erreur pour l'utilisateur
  // stack : Trace technique pour le développement (à retirer en production)
  response
    .status(statusCode)
    .json({ message: error.message, stack: error.stack });
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Gère de façon centralisée toutes les erreurs de l'API
// 2. Assure une réponse cohérente pour les URLs invalides
// 3. Standardise le format des messages d'erreur
//
// Points techniques à souligner :
// - Utilisation des middlewares Express
// - Typage strict avec TypeScript
// - Gestion professionnelle des erreurs
// - Bonnes pratiques de développement
