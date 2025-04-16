// ************************************************************************
// 🎓 MIDDLEWARE DE SÉCURITÉ - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express fournit 3 types essentiels pour les middlewares :
// - Request : contient toutes les données de la requête HTTP entrante
// - Response : permet d'envoyer une réponse HTTP au client
// - NextFunction : fonction pour passer au middleware suivant
import { Request, Response, NextFunction } from 'express';

// 🔒 MIDDLEWARE DE VÉRIFICATION DU RÔLE GESTIONNAIRE
// Un middleware est une fonction qui s'exécute ENTRE la requête et le contrôleur
// Il peut :
// 1. Vérifier des conditions (ex: droits d'accès)
// 2. Modifier la requête
// 3. Bloquer la requête si nécessaire
export const checkIsGestionnaire = (req: Request, res: Response, next: NextFunction) => {
  // On récupère l'utilisateur depuis req.body
  // Cet utilisateur a été ajouté par le middleware d'authentification
  // qui s'exécute avant celui-ci
  const user = req.body.user;

  // 🔍 VÉRIFICATION DU RÔLE
  // On vérifie deux conditions avec l'opérateur || (OU logique) :
  // 1. !user : vérifie si l'utilisateur n'existe pas
  // 2. user.user_type_id !== 1 : vérifie si l'utilisateur n'est pas gestionnaire
  // Dans la BDD : user_type_id = 1 signifie "gestionnaire"
  if (!user || user.user_type_id !== 1) {
    // ❌ ACCÈS REFUSÉ
    // Status 403 = "Forbidden" en HTTP
    // On renvoie un message explicatif au format JSON
    return res.status(403).json({ message: 'Accès interdit : réservé aux gestionnaires' });
  }

  // ✅ ACCÈS AUTORISÉ
  // La fonction next() est fournie par Express
  // Elle indique que le middleware a terminé son travail
  // et que la requête peut continuer son chemin
  next();
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce middleware est un élément clé de la sécurité de l'application :
// 1. Il protège les routes sensibles
// 2. Il vérifie les droits d'accès
// 3. Il utilise le système de rôles (gestionnaire/utilisateur)
// 4. Il s'intègre dans la chaîne de middleware d'Express
//
// Points techniques à souligner :
// - Utilisation des types TypeScript
// - Gestion des droits d'accès
// - Codes HTTP standards
// - Architecture middleware d'Express
