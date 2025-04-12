// ********** IMPORTS **********
// On importe l'objet 'db' qui nous permet de nous connecter à la base de données MySQL
// Il vient du fichier database.ts qui configure la connexion
import { db } from '../config/database';

// On importe le type 'EPI' qui définit la structure d'un EPI (casque, harnais, etc.)
// Ce type nous aide à avoir un code plus sûr en vérifiant les données
import { EPI } from '../types';

// ********** DÉFINITION DU MODÈLE **********
// Cette classe gère toutes les opérations sur les EPIs dans la base de données
// Elle fait partie de la couche "Model" de l'architecture MVC
export class EpiModel {
  // ********** MÉTHODE : RÉCUPÉRER TOUS LES EPIs **********
  // Cette méthode va chercher tous les EPIs dans la base de données
  // Elle renvoie un tableau d'EPIs (Promise<EPI[]>)
  async findAll(): Promise<EPI[]> {
    try {
      // On fait une requête SQL simple pour sélectionner tous les EPIs
      const [rows] = await db.query('SELECT * FROM EPI');
      // On convertit le résultat en tableau d'EPIs et on le renvoie
      return rows as EPI[];
    } catch (error) {
      // Si une erreur survient :
      // 1. On l'affiche dans la console pour le debugging
      console.error('Erreur lors de la récupération des EPIs:', error);
      // 2. On la renvoie pour que le contrôleur puisse la gérer
      throw error;
    }
  }

  // ********** MÉTHODE : RÉCUPÉRER UN EPI PAR SON ID **********
  // Cette méthode cherche un EPI spécifique grâce à son ID
  // Elle renvoie soit l'EPI trouvé, soit null si aucun EPI n'existe avec cet ID
  async findById(id: number): Promise<EPI | null> {
    try {
      // On fait une requête SQL avec un WHERE pour filtrer par ID
      // Le '?' est remplacé par l'id de façon sécurisée (évite les injections SQL)
      const [rows] = await db.query('SELECT * FROM EPI WHERE id = ?', [id]);
      const epis = rows as EPI[];
      // Si on trouve un EPI, on le renvoie, sinon on renvoie null
      return epis.length > 0 ? epis[0] : null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // ********** MÉTHODE : CRÉER UN NOUVEL EPI **********
  // Cette méthode ajoute un nouvel EPI dans la base de données
  // Elle prend en paramètre les données de l'EPI et renvoie l'EPI créé avec son ID
  async create(epi: EPI): Promise<EPI> {
    try {
      // On insère le nouvel EPI dans la base
      // Les '?' sont remplacés par les valeurs dans l'ordre du tableau qui suit
      const [result] = await db.query(
        'INSERT INTO EPI (identifiant_custom, marque, modèle, numéro_série, taille, couleur, date_achat, date_fabrication, date_mise_en_service, périodicité_controle, epi_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          epi.identifiant_custom,
          epi.marque,
          epi.modèle,
          epi.numéro_série,
          epi.taille || null, // Si pas de taille, on met null
          epi.couleur || null, // Si pas de couleur, on met null
          epi.date_achat,
          epi.date_fabrication,
          epi.date_mise_en_service,
          epi.périodicité_controle,
          epi.epi_type_id
        ]
      );
      
      // On récupère l'ID généré automatiquement par MySQL
      const insertId = (result as any).insertId;
      // On renvoie l'EPI complet avec son nouvel ID
      return { ...epi, id: insertId };
    } catch (error) {
      console.error('Erreur lors de la création de l\'EPI:', error);
      throw error;
    }
  }

  // ********** MÉTHODE : METTRE À JOUR UN EPI **********
  // Cette méthode modifie un EPI existant dans la base
  // Elle prend l'ID de l'EPI et les champs à modifier (Partial = certains champs optionnels)
  async update(id: number, epi: Partial<EPI>): Promise<EPI | null> {
    try {
      // On crée dynamiquement la partie SET de la requête SQL
      // Ex: "marque = ?, modèle = ?" à partir des champs fournis
      const fields = Object.keys(epi).map(key => `${key} = ?`).join(', ');
      // On extrait les valeurs à mettre à jour
      const values = Object.values(epi);
      
      // On ajoute l'ID pour la clause WHERE
      values.push(id);
      
      // On exécute la mise à jour
      await db.query(`UPDATE EPI SET ${fields} WHERE id = ?`, values);
      
      // On récupère et renvoie l'EPI mis à jour
      return this.findById(id);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // ********** MÉTHODE : SUPPRIMER UN EPI **********
  // Cette méthode supprime un EPI et tous ses contrôles associés
  // Elle renvoie true si la suppression a réussi, false sinon
  async delete(id: number): Promise<boolean> {
    try {
      // D'abord on vérifie s'il existe des contrôles liés à cet EPI
      const [controles] = await db.query('SELECT id FROM Controle_EPI WHERE epi_id = ?', [id]);
      
      // Si oui, on les supprime en premier (contrainte de clé étrangère)
      if ((controles as any[]).length > 0) {
        await db.query('DELETE FROM Controle_EPI WHERE epi_id = ?', [id]);
      }
      
      // Ensuite on supprime l'EPI lui-même
      const [result] = await db.query('DELETE FROM EPI WHERE id = ?', [id]);
      // On renvoie true si au moins une ligne a été supprimée
      return (result as any).affectedRows > 0;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }
} 