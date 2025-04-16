// ************************************************************************
// 🎓 MODÈLE DES STATUTS - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// On importe l'objet db qui contient notre connexion à MySQL
// Il nous permet d'exécuter des requêtes SQL de façon sécurisée
import { db } from '../config/database';

// 🎯 CLASSE MODÈLE
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle gère toute la logique d'accès aux données des statuts d'EPI
export class StatutModel {

  // 📥 MÉTHODE : RÉCUPÉRER TOUS LES STATUTS
  // async car les requêtes SQL sont asynchrones
  // Promise<any[]> = on renvoie un tableau d'objets statuts
  async findAll(): Promise<any[]> {
    try {
      // REQUÊTE SQL SIMPLE
      // 1. SELECT * : sélectionne toutes les colonnes de Statut_EPI
      // 2. Le [rows] utilise la déstructuration d'un tableau
      const [rows] = await db.query('SELECT * FROM Statut_EPI');
      
      // RETOUR DES DONNÉES
      // as any[] = type casting TypeScript pour indiquer qu'on renvoie un tableau
      return rows as any[];

    } catch (error) {
      // GESTION DES ERREURS
      // On log l'erreur pour le debugging
      // throw error la transmet au contrôleur qui gèrera la réponse HTTP
      console.error('Erreur lors de la récupération des statuts:', error);
      throw error;
    }
  }
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce modèle est responsable de :
// 1. La récupération des statuts possibles pour les EPI
// 2. Ces statuts servent à indiquer l'état d'un EPI (neuf, bon état, à contrôler, etc.)
// 3. La gestion des erreurs de base de données
//
// Points techniques à souligner :
// - Pattern MVC
// - Programmation asynchrone avec async/await
// - Requêtes SQL sécurisées
// - Gestion d'erreurs try/catch