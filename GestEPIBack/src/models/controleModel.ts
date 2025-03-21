import { db } from '../config/database';
import { Controle } from '../types';

export class ControleModel {
  // Récupérer tous les contrôles
  async findAll(): Promise<Controle[]> {
    try {
      const [rows] = await db.query(`
        SELECT c.*, e.identifiant_custom, e.marque, e.modèle, u.nom as gestionnaire_nom, s.nom as statut_nom
        FROM Controle_EPI c
        JOIN EPI e ON c.epi_id = e.id
        JOIN Utilisateur u ON c.gestionnaire_id = u.id
        JOIN Statut_EPI s ON c.statut_id = s.id
        ORDER BY c.date_controle DESC
      `);
      return rows as Controle[];
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles:', error);
      throw error;
    }
  }

  // Récupérer les contrôles d'un EPI spécifique
  async findByEpiId(epiId: number): Promise<Controle[]> {
    try {
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

  // Récupérer un contrôle par son ID
  async findById(id: number): Promise<Controle | null> {
    try {
      const [rows] = await db.query(`
        SELECT c.*, u.nom as gestionnaire_nom, s.nom as statut_nom
        FROM Controle_EPI c
        JOIN Utilisateur u ON c.gestionnaire_id = u.id
        JOIN Statut_EPI s ON c.statut_id = s.id
        WHERE c.id = ?
      `, [id]);
      const controles = rows as Controle[];
      return controles.length > 0 ? controles[0] : null;
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // Créer un nouveau contrôle
  async create(controle: Controle): Promise<Controle> {
    try {
      const [result] = await db.query(
        'INSERT INTO Controle_EPI (date_controle, gestionnaire_id, epi_id, statut_id, remarques) VALUES (?, ?, ?, ?, ?)',
        [
          controle.date_controle,
          controle.gestionnaire_id,
          controle.epi_id,
          controle.statut_id,
          controle.remarques || null
        ]
      );
      
      const insertId = (result as any).insertId;
      return { ...controle, id: insertId };
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      throw error;
    }
  }
} 