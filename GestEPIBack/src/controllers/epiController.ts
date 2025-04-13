import { db } from '../config/database';

export class EpiController {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM Epi');
    return rows;
  }

  async findById(id: number) {
    const [rows] = await db.query('SELECT * FROM Epi WHERE id = ?', [id]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  }

  async create(data: any) {
    const query = `
      INSERT INTO Epi (
        identifiant_custom,
        marque,
        modèle,
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

    const values = [
      data.identifiant_custom,
      data.marque,
      data.modèle,
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

    const [result]: any = await db.query(query, values);
    return { id: result.insertId, ...data };
  }

  async update(id: number, data: any) {
    try {
      const epiData = data;
      console.log('🧠 Données reçues du front (req.body) :', epiData);
      console.log("📦 Données reçues pour update SQL :", id, data);

      const query = `
        UPDATE Epi SET
          identifiant_custom = ?,
          marque = ?,
          modèle = ?,
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

      const values = [
        data.identifiant_custom,
        data.marque,
        data.modèle,
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

      const [result]: any = await db.query(query, values);

      if (result.affectedRows === 0) return null;

      return { id, ...data };
    } catch (error) {
      console.error('❌ ERREUR SQL UPDATE EPI :', error);
      throw error;
    }
  }

  async delete(id: number) {
    const [result]: any = await db.query('DELETE FROM Epi WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export const epiController = new EpiController();
