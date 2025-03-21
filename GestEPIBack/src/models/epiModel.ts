import { db } from '../config/database';
import { EPI } from '../types';

export class EpiModel {
  // Récupérer tous les EPIs
  async findAll(): Promise<EPI[]> {
    try {
      const [rows] = await db.query('SELECT * FROM EPI');
      return rows as EPI[];
    } catch (error) {
      console.error('Erreur lors de la récupération des EPIs:', error);
      throw error;
    }
  }

  // Récupérer un EPI par son ID
  async findById(id: number): Promise<EPI | null> {
    try {
      const [rows] = await db.query('SELECT * FROM EPI WHERE id = ?', [id]);
      const epis = rows as EPI[];
      return epis.length > 0 ? epis[0] : null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // Créer un nouvel EPI
  async create(epi: EPI): Promise<EPI> {
    try {
      const [result] = await db.query(
        'INSERT INTO EPI (identifiant_custom, marque, modèle, numéro_série, taille, couleur, date_achat, date_fabrication, date_mise_en_service, périodicité_controle, epi_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          epi.identifiant_custom,
          epi.marque,
          epi.modèle,
          epi.numéro_série,
          epi.taille || null,
          epi.couleur || null,
          epi.date_achat,
          epi.date_fabrication,
          epi.date_mise_en_service,
          epi.périodicité_controle,
          epi.epi_type_id
        ]
      );
      
      const insertId = (result as any).insertId;
      return { ...epi, id: insertId };
    } catch (error) {
      console.error('Erreur lors de la création de l\'EPI:', error);
      throw error;
    }
  }

  // Mettre à jour un EPI
  async update(id: number, epi: Partial<EPI>): Promise<EPI | null> {
    try {
      // Construire la requête de mise à jour dynamiquement
      const fields = Object.keys(epi).map(key => `${key} = ?`).join(', ');
      const values = Object.values(epi);
      
      // Ajouter l'ID à la fin des valeurs pour la clause WHERE
      values.push(id);
      
      await db.query(`UPDATE EPI SET ${fields} WHERE id = ?`, values);
      
      // Récupérer l'EPI mis à jour
      return this.findById(id);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // Supprimer un EPI
  async delete(id: number): Promise<boolean> {
    try {
      const [result] = await db.query('DELETE FROM EPI WHERE id = ?', [id]);
      return (result as any).affectedRows > 0;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }
} 