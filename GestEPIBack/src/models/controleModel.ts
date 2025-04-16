// ************************************************************************
// 🎓 MODÈLE DES CONTRÔLES D'EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// On importe l'objet db qui contient notre connexion à MySQL
// Il nous permet d'exécuter des requêtes SQL de façon sécurisée
import { db } from '../config/database';

// On importe l'interface Controle qui définit la structure d'un contrôle
// Cette interface est un "contrat" TypeScript qui garantit que nos objets
// contrôle auront toujours la bonne structure
import { Controle } from '../types';

// 🎯 CLASSE MODÈLE
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle gère toute la logique d'accès aux données des contrôles d'EPI
export class ControleModel {

  // 📥 MÉTHODE : RÉCUPÉRER TOUS LES CONTRÔLES
  // async car les requêtes SQL sont asynchrones
  // Promise<Controle[]> = on renvoie un tableau d'objets Controle
  async findAll(): Promise<Controle[]> {
    try {
      // REQUÊTE SQL AVEC JOINTURES
      // 1. SELECT c.* : sélectionne toutes les colonnes de Controle_EPI
      // 2. JOIN avec EPI : récupère les infos de l'équipement contrôlé
      // 3. JOIN avec Utilisateur : récupère le nom du gestionnaire
      // 4. JOIN avec Statut_EPI : récupère le libellé du statut
      // 5. ORDER BY : trie par date décroissante (plus récent d'abord)
      const [rows] = await db.query(`
        SELECT c.*, e.identifiant_custom, e.marque, e.modele, u.nom as gestionnaire_nom, s.nom as statut_nom
        FROM Controle_EPI c
        JOIN EPI e ON c.epi_id = e.id
        JOIN Utilisateur u ON c.gestionnaire_id = u.id
        JOIN Statut_EPI s ON c.statut_id = s.id
        ORDER BY c.date_controle DESC
      `);
      return rows as Controle[];
    } catch (error) {
      // GESTION DES ERREURS
      // On log l'erreur pour le debugging
      // throw error la transmet au contrôleur qui gèrera la réponse HTTP
      console.error('Erreur lors de la récupération des contrôles:', error);
      throw error;
    }
  }

  // 📥 MÉTHODE : RÉCUPÉRER LES CONTRÔLES D'UN EPI
  // epiId: number = identifiant de l'EPI dont on veut l'historique
  async findByEpiId(epiId: number): Promise<Controle[]> {
    try {
      // REQUÊTE SQL FILTRÉE
      // Même structure que findAll() mais avec WHERE c.epi_id = ?
      // Le ? est un paramètre qui protège contre les injections SQL
      const [rows] = await db.query(`
        SELECT c.*, u.nom as gestionnaire_nom, s.nom as statut_nom
        FROM Controle_EPI c
        JOIN Utilisateur u ON c.gestionnaire_id = u.id
        JOIN Statut_EPI s ON c.statut_id = s.id
        WHERE c.epi_id = ?
        ORDER BY c.date_controle DESC
      `, [epiId]);
      return rows as Controle[];
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI ${epiId}:`, error);
      throw error;
    }
  }

  // 📥 MÉTHODE : RÉCUPÉRER UN CONTRÔLE SPÉCIFIQUE
  // id: number = identifiant du contrôle recherché
  // Promise<Controle | null> = renvoie soit un contrôle, soit null si non trouvé
  async findById(id: number): Promise<Controle | null> {
    try {
      // REQUÊTE SQL AVEC CONDITION UNIQUE
      // WHERE c.id = ? cherche un contrôle précis
      const [rows] = await db.query(`
        SELECT c.*, u.nom as gestionnaire_nom, s.nom as statut_nom
        FROM Controle_EPI c
        JOIN Utilisateur u ON c.gestionnaire_id = u.id
        JOIN Statut_EPI s ON c.statut_id = s.id
        WHERE c.id = ?
      `, [id]);
      // Si on trouve un résultat on le renvoie, sinon null
      const controles = rows as Controle[];
      return controles.length > 0 ? controles[0] : null;
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // 📤 MÉTHODE : CRÉER UN NOUVEAU CONTRÔLE
  // controle: Controle = données du nouveau contrôle à créer
  async create(controle: Controle): Promise<Controle> {
    try {
      // REQUÊTE SQL D'INSERTION
      // 1. INSERT INTO avec les colonnes concernées
      // 2. VALUES (?, ?, ?, ?, ?) pour les paramètres sécurisés
      // 3. Les valeurs sont passées dans un tableau
      const [result] = await db.query(
        'INSERT INTO Controle_EPI (date_controle, gestionnaire_id, epi_id, statut_id, remarques) VALUES (?, ?, ?, ?, ?)',
        [
          controle.date_controle,
          controle.gestionnaire_id,
          controle.epi_id,
          controle.statut_id,
          controle.remarques || null // Gestion des remarques optionnelles
        ]
      );
      
      // On récupère l'ID auto-incrémenté généré par MySQL
      const insertId = (result as any).insertId;
      // On renvoie l'objet complet avec son nouvel ID
      return { ...controle, id: insertId };
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      throw error;
    }
  }
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce modèle est crucial car il gère tout l'historique des contrôles des EPI :
// 1. Architecture MVC avec séparation des responsabilités
// 2. Requêtes SQL sécurisées avec paramètres
// 3. Gestion des erreurs avec try/catch
// 4. Typage strict avec TypeScript
// 5. Jointures SQL pour récupérer les données liées