// ************************************************************************
// 🎓 MODÈLE DES GESTIONNAIRES - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// On importe l'objet db qui contient notre connexion à MySQL
// Il nous permet d'exécuter des requêtes SQL de façon sécurisée
import { db } from '../config/database';

// 🎯 CLASSE MODÈLE
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle gère toute la logique d'accès aux données des gestionnaires
export class GestionnaireModel {

  // 📥 MÉTHODE : RÉCUPÉRER TOUS LES GESTIONNAIRES
  // async car les requêtes SQL sont asynchrones
  // Promise<any[]> = on renvoie un tableau d'objets gestionnaires
  async findAll(): Promise<any[]> {
    try {
      // REQUÊTE SQL AVEC FILTRE
      // 1. SELECT * : sélectionne toutes les colonnes de Utilisateur
      // 2. WHERE user_type_id = 1 : filtre uniquement les gestionnaires
      // Le [rows] utilise la déstructuration d'un tableau
      const [rows] = await db.query('SELECT * FROM Utilisateur WHERE user_type_id = 1');

      // RETOUR DES DONNÉES
      // as any[] = type casting TypeScript pour indiquer qu'on renvoie un tableau
      return rows as any[];

    } catch (error) {
      // GESTION DES ERREURS
      // On log l'erreur pour le debugging
      // throw error la transmet au contrôleur qui gèrera la réponse HTTP
      console.error('Erreur lors de la récupération des gestionnaires:', error);
      throw error;
    }
  }
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce modèle est responsable de :
// 1. La récupération des gestionnaires en base de données
// 2. Le filtrage pour n'avoir que les utilisateurs de type gestionnaire
// 3. La gestion des erreurs de base de données
//
// Points techniques à souligner :
// - Pattern MVC
// - Programmation asynchrone avec async/await
// - Requêtes SQL sécurisées
// - Gestion d'erreurs try/catch