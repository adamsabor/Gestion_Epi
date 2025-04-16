// ************************************************************************
// 🎓 CONTRÔLEUR DES EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Request et Response sont des types TypeScript fournis par Express
// Ils permettent de typer les paramètres des fonctions du contrôleur
import { Request, Response } from 'express';

// On importe la connexion à la base de données configurée dans database.ts
import { db } from '../config/database';

// 🎯 CLASSE CONTRÔLEUR
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle reçoit les requêtes HTTP et coordonne les actions avec la BDD
export class EpiController {

  // 📥 MÉTHODE FINDALL : Récupère TOUS les EPI
  // async/await = gestion asynchrone pour les requêtes SQL
  // Promise<void> = la fonction ne retourne rien mais est asynchrone
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      // Log pour tracer l'appel de la route
      console.log("📥 [EPI] ➤ Route atteinte : /api/epis");
  
      // Exécution de la requête SQL : SELECT * FROM Epi
      // Le résultat est destructuré avec [rows] pour récupérer les données
      const [rows] = await db.query('SELECT * FROM Epi');
      console.log("✅ [EPI] ➤ Résultats SQL :", rows);
  
      // Réponse HTTP 200 (succès) avec les données au format JSON
      res.status(200).json({
        message: 'EPIs récupérés avec succès',
        data: rows
      });
    } catch (error) {
      // En cas d'erreur (ex: problème BDD)
      console.error('❌ [EPI] ➤ Erreur SQL /api/epis :', error);
      res.status(500).json({
        message: 'Erreur lors de la récupération des EPIs',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  // 🔍 MÉTHODE FINDBYID : Trouve un EPI par son ID
  // req.params.id = paramètre dans l'URL (ex: /epis/123)
  async findById(req: Request, res: Response): Promise<void | Response> {
    try {
      // Conversion de l'ID en nombre et vérification
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID d'EPI invalide." });   
      }

      // Requête SQL préparée avec paramètre [id] pour éviter les injections SQL
      const [rows] = await db.query('SELECT * FROM Epi WHERE id = ?', [id]);

      // Vérification si l'EPI existe
      const epi = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
      if (!epi) {
        return res.status(404).json({ message: 'EPI non trouvé.' });
      }

      res.status(200).json({
        message: 'EPI récupéré avec succès',
        data: epi
      });
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de l\'EPI :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  // ➕ MÉTHODE CREATE : Crée un nouvel EPI
  // req.body contient les données envoyées par le client (formulaire)
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Requête SQL préparée avec les champs de la table
      const query = `
        INSERT INTO Epi (
          identifiant_custom, marque, modele, numéro_série,
          taille, couleur, date_achat, date_fabrication,
          date_mise_en_service, périodicité_controle,
          epi_type_id, statut_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Tableau des valeurs à insérer, avec gestion des valeurs nulles
      const values = [
        req.body.identifiant_custom,
        req.body.marque,
        req.body.modele,
        req.body.numéro_série,
        req.body.taille || null,
        req.body.couleur || null,
        req.body.date_achat || null,
        req.body.date_fabrication || null,
        req.body.date_mise_en_service || null,
        req.body.périodicité_controle,
        req.body.epi_type_id,
        req.body.statut_id
      ];

      // Exécution de la requête et récupération de l'ID inséré
      const [result]: any = await db.query(query, values);
      res.status(201).json({
        message: 'EPI créé avec succès',
        data: { id: result.insertId, ...req.body }
      });
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'EPI :', error);
      res.status(500).json({
        message: 'Erreur lors de la création de l\'EPI',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  // 🔄 MÉTHODE UPDATE : Met à jour un EPI existant
  async update(req: Request, res: Response): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id);
      
      // Requête SQL UPDATE avec tous les champs
      const query = `
        UPDATE Epi SET
          identifiant_custom = ?, marque = ?, modèle = ?,
          numéro_série = ?, taille = ?, couleur = ?,
          date_achat = ?, date_fabrication = ?,
          date_mise_en_service = ?, périodicité_controle = ?,
          epi_type_id = ?, statut_id = ?
        WHERE id = ?
      `;

      // Valeurs à mettre à jour + ID pour la clause WHERE
      const values = [
        req.body.identifiant_custom,
        req.body.marque,
        req.body.modèle,
        req.body.numéro_série,
        req.body.taille || null,
        req.body.couleur || null,
        req.body.date_achat || null,
        req.body.date_fabrication || null,
        req.body.date_mise_en_service || null,
        req.body.périodicité_controle,
        req.body.epi_type_id,
        req.body.statut_id,
        id
      ];

      const [result]: any = await db.query(query, values);
      
      // Vérification si l'EPI existait
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'EPI non trouvé' });
      }

      res.status(200).json({
        message: 'EPI mis à jour avec succès',
        data: { id, ...req.body }
      });
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour de l\'EPI :', error);
      res.status(500).json({
        message: 'Erreur lors de la mise à jour de l\'EPI',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  // ❌ MÉTHODE DELETE : Supprime un EPI
  async delete(req: Request, res: Response): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id);
      // Requête SQL DELETE avec clause WHERE sur l'ID
      const [result]: any = await db.query('DELETE FROM Epi WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'EPI non trouvé' });
      }

      res.status(200).json({
        message: 'EPI supprimé avec succès'
      });
    } catch (error) {
      console.error('❌ Erreur lors de la suppression de l\'EPI :', error);
      res.status(500).json({
        message: 'Erreur lors de la suppression de l\'EPI',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}

// 📤 EXPORT
// On crée et exporte directement une instance du contrôleur
export const epiController = new EpiController();

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce contrôleur est crucial car il gère toute la logique des EPI :
// 1. Structure en MVC (séparation des responsabilités)
// 2. CRUD complet (Create, Read, Update, Delete)
// 3. Validation des données
// 4. Gestion des erreurs
// 5. Requêtes SQL préparées (sécurité)
//
// Points techniques à souligner :
// - Utilisation de TypeScript pour la sécurité du typage
// - Programmation asynchrone avec async/await
// - Pattern MVC
// - Gestion des erreurs avec try/catch
// - Logs pour le debug
