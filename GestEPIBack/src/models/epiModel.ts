// ************************************************************************
// 🎓 MODÈLE DES EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// On importe l'objet db qui contient notre connexion à MySQL
// Il nous permet d'exécuter des requêtes SQL de façon sécurisée
import { db } from '../config/database';

// 🎯 CLASSE MODÈLE
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle gère toute la logique d'accès aux données des EPI
export class EpiModel {

  // 📥 MÉTHODE : RÉCUPÉRER TOUS LES EPI
  // async car les requêtes SQL sont asynchrones
  // Promise<any[]> = on renvoie un tableau d'objets
  async findAll() {
    // Exécute un simple SELECT * et retourne tous les EPI
    const [rows] = await db.query('SELECT * FROM Epi');
    return rows;
  }

  // 📥 MÉTHODE : RÉCUPÉRER UN EPI PAR SON ID
  // id: number = l'identifiant unique de l'EPI recherché
  // Promise<any|null> = renvoie soit l'EPI trouvé soit null
  async findById(id: number) {
    // Requête SQL avec WHERE et paramètre sécurisé (?)
    const [rows] = await db.query('SELECT * FROM Epi WHERE id = ?', [id]);
    // Si on trouve au moins 1 résultat on renvoie le premier, sinon null
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  }

  // ➕ MÉTHODE : CRÉER UN NOUVEL EPI
  // data: any = objet contenant toutes les données du nouvel EPI
  // Promise<any> = renvoie l'EPI créé avec son ID
  async create(data: any) {
    try {
      // REQUÊTE SQL D'INSERTION
      // 1. Les champs de la table sont listés explicitement
      // 2. VALUES (?, ?, ...) = paramètres sécurisés contre les injections
      const query = `
        INSERT INTO Epi (
          identifiant_custom,
          marque,
          modele,
          numéro_série,
          taille,
          couleur,
          date_achat,
          date_fabrication,
          date_mise_en_service,
          périodicité_controle,
          epi_type_id,
          statut_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // PRÉPARATION DES VALEURS
      // || null = si la valeur n'existe pas, on met null
      // Cela gère les champs optionnels
      const values = [
        data.identifiant_custom,
        data.marque,
        data.modele,
        data.numéro_série,
        data.taille || null,
        data.couleur || null,
        data.date_achat || null,
        data.date_fabrication || null,
        data.date_mise_en_service || null,
        data.périodicité_controle,
        data.epi_type_id,
        data.statut_id
      ];

      // EXÉCUTION DE LA REQUÊTE
      // result.insertId = l'ID auto-incrémenté généré par MySQL
      const [result]: any = await db.query(query, values);
      return { id: result.insertId, ...data };

    } catch (error) {
      console.error("❌ Erreur lors de la création de l'EPI:", error);
      throw error;
    }
  }

  // 🔄 MÉTHODE : METTRE À JOUR UN EPI
  // id: number = l'identifiant de l'EPI à modifier
  // data: any = nouvelles données à enregistrer
  async update(id: number, data: any) {
    try {
      // Log pour debugging
      console.log("📦 Données reçues pour update SQL:", id, data);

      // REQUÊTE SQL DE MISE À JOUR
      // SET field = ? : chaque champ est mis à jour de façon sécurisée
      // WHERE id = ? : on cible l'EPI par son ID
      const query = `
        UPDATE Epi SET
          identifiant_custom = ?,
          marque = ?,
          modele = ?,
          numéro_série = ?,
          taille = ?,
          couleur = ?,
          date_achat = ?,
          date_fabrication = ?,
          date_mise_en_service = ?,
          périodicité_controle = ?,
          epi_type_id = ?,
          statut_id = ?
        WHERE id = ?
      `;

      // PRÉPARATION DES VALEURS
      // Même principe que create() pour les champs optionnels
      const values = [
        data.identifiant_custom,
        data.marque,
        data.modele,
        data.numéro_série,
        data.taille || null,
        data.couleur || null,
        data.date_achat || null,
        data.date_fabrication || null,
        data.date_mise_en_service || null,
        data.périodicité_controle,
        data.epi_type_id,
        data.statut_id,
        id
      ];

      // Logs pour debugging
      console.log('📦 Requête SQL exécutée :', query);
      console.log('📦 Valeurs envoyées à MySQL :', values);

      // EXÉCUTION DE LA MISE À JOUR
      const [result]: any = await db.query(query, values);

      // Si aucune ligne modifiée = l'ID n'existe pas
      if (result.affectedRows === 0) return null;

      return { id, ...data };

    } catch (error) {
      console.error('❌ ERREUR SQL UPDATE EPI :', error);
      throw error;
    }
  }

  // ❌ MÉTHODE : SUPPRIMER UN EPI
  // id: number = l'identifiant de l'EPI à supprimer
  // Promise<boolean> = true si supprimé, false si non trouvé
  async delete(id: number) {
    const [result]: any = await db.query('DELETE FROM Epi WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce modèle est le cœur de la gestion des EPI dans l'application.
// Points techniques à souligner :
// 1. Pattern MVC avec séparation des responsabilités
// 2. Requêtes SQL paramétrées contre les injections
// 3. Gestion des erreurs et logging
// 4. CRUD complet (Create, Read, Update, Delete)
// 5. Gestion des champs optionnels avec || null
