// ************************************************************************
// 🎓 MODÈLE DES TYPES D'EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// On importe l'objet db qui contient notre connexion à MySQL
// Il nous permet d'exécuter des requêtes SQL de façon sécurisée
import { db } from '../config/database';

// On importe l'interface TypeEPI qui définit la structure d'un type d'EPI
// Cette interface est un "contrat" TypeScript qui garantit que nos objets
// type d'EPI auront toujours la bonne structure
import { TypeEPI } from '../types';

// 🎯 CLASSE MODÈLE
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle gère toute la logique d'accès aux données des types d'EPI
export class TypeEpiModel {

  // 📥 MÉTHODE : RÉCUPÉRER TOUS LES TYPES D'EPI
  // async car les requêtes SQL sont asynchrones
  // Promise<TypeEPI[]> = on renvoie un tableau d'objets TypeEPI
  async findAll(): Promise<TypeEPI[]> {
    try {
      // REQUÊTE SQL SIMPLE
      // 1. SELECT * : sélectionne toutes les colonnes de Type_EPI
      // 2. Le [rows] utilise la déstructuration d'un tableau
      const [rows] = await db.query('SELECT * FROM Type_EPI');
      
      // RETOUR DES DONNÉES
      // as TypeEPI[] = type casting TypeScript pour garantir le bon type
      return rows as TypeEPI[];
    } catch (error) {
      // GESTION DES ERREURS
      // On log l'erreur pour le debugging
      // throw error la transmet au contrôleur qui gèrera la réponse HTTP
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      throw error;
    }
  }

  // 📥 MÉTHODE : RÉCUPÉRER UN TYPE D'EPI PAR SON ID
  // id: number = l'identifiant unique du type recherché
  // Promise<TypeEPI|null> = renvoie soit le type trouvé soit null
  async findById(id: number): Promise<TypeEPI | null> {
    try {
      // REQUÊTE SQL AVEC PARAMÈTRE
      // 1. WHERE id = ? : filtre sur l'ID demandé
      // 2. Le ? est remplacé par l'id de façon sécurisée (anti-injection SQL)
      const [rows] = await db.query('SELECT * FROM Type_EPI WHERE id = ?', [id]);
      
      // TRAITEMENT DU RÉSULTAT
      // 1. Cast en tableau de TypeEPI
      // 2. Si on trouve un résultat on le renvoie, sinon null
      const types = rows as TypeEPI[];
      return types.length > 0 ? types[0] : null;
    } catch (error) {
      // Log détaillé de l'erreur avec l'ID concerné
      console.error(`Erreur lors de la récupération du type d'EPI ${id}:`, error);
      throw error;
    }
  }
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce modèle est responsable de :
// 1. La récupération de tous les types d'EPI possibles
// 2. La recherche d'un type spécifique par son ID
// 3. La gestion des erreurs de base de données
//
// Points techniques à souligner :
// - Pattern MVC
// - Programmation asynchrone avec async/await
// - Requêtes SQL sécurisées
// - Gestion d'erreurs try/catch
// - Typage fort avec TypeScript