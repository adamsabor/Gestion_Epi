// ********** IMPORTS **********
// On importe l'objet 'db' qui nous permet de nous connecter à la base de données MySQL
// Il vient du fichier database.ts qui configure la connexion
import { db } from '../config/database';

// On importe le type 'Controle' qui définit la structure d'un contrôle d'EPI
// Ce type nous aide à avoir un code plus sûr en vérifiant les données
import { Controle } from '../types';

// ********** DÉFINITION DU MODÈLE **********
// Cette classe gère toutes les opérations liées aux contrôles des EPIs dans la base de données
// Elle fait partie de la couche "Model" de l'architecture MVC
export class ControleModel {
  // ********** MÉTHODE : RÉCUPÉRER TOUS LES CONTRÔLES **********
  // Cette méthode va chercher tous les contrôles dans la base avec leurs informations associées
  // Elle renvoie un tableau de contrôles (Promise<Controle[]>)
  async findAll(): Promise<Controle[]> {
    try {
      // On fait une requête SQL qui :
      // 1. Sélectionne tous les contrôles (table Controle_EPI)
      // 2. Joint les infos de l'EPI concerné (table EPI)
      // 3. Joint le nom du gestionnaire qui a fait le contrôle (table Utilisateur)
      // 4. Joint le nom du statut (table Statut_EPI)
      // 5. Trie les résultats par date de contrôle (du plus récent au plus ancien)
      const [rows] = await db.query(`
        SELECT c.*, e.identifiant_custom, e.marque, e.modèle, u.nom as gestionnaire_nom, s.nom as statut_nom
        FROM Controle_EPI c
        JOIN EPI e ON c.epi_id = e.id
        JOIN Utilisateur u ON c.gestionnaire_id = u.id
        JOIN Statut_EPI s ON c.statut_id = s.id
        ORDER BY c.date_controle DESC
      `);
      // On renvoie les résultats en les convertissant au type Controle[]
      return rows as Controle[];
    } catch (error) {
      // Si une erreur survient :
      // 1. On l'affiche dans la console pour le debugging
      console.error('Erreur lors de la récupération des contrôles:', error);
      // 2. On la renvoie pour que le contrôleur puisse la gérer
      throw error;
    }
  }

  // ********** MÉTHODE : RÉCUPÉRER LES CONTRÔLES D'UN EPI **********
  // Cette méthode récupère tous les contrôles d'un EPI spécifique
  // Elle prend en paramètre l'ID de l'EPI et renvoie ses contrôles
  async findByEpiId(epiId: number): Promise<Controle[]> {
    try {
      // Requête SQL similaire à findAll() mais avec un filtre sur l'EPI
      // Le '?' est remplacé par epiId de façon sécurisée (évite les injections SQL)
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

  // ********** MÉTHODE : RÉCUPÉRER UN CONTRÔLE PAR SON ID **********
  // Cette méthode cherche un contrôle spécifique grâce à son ID
  // Elle renvoie soit le contrôle trouvé, soit null si aucun contrôle n'existe avec cet ID
  async findById(id: number): Promise<Controle | null> {
    try {
      // Requête SQL similaire mais qui ne retourne qu'un seul contrôle
      const [rows] = await db.query(`
        SELECT c.*, u.nom as gestionnaire_nom, s.nom as statut_nom
        FROM Controle_EPI c
        JOIN Utilisateur u ON c.gestionnaire_id = u.id
        JOIN Statut_EPI s ON c.statut_id = s.id
        WHERE c.id = ?
      `, [id]);
      // On convertit le résultat en tableau de Controle
      const controles = rows as Controle[];
      // Si on trouve un contrôle, on le renvoie, sinon on renvoie null
      return controles.length > 0 ? controles[0] : null;
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // ********** MÉTHODE : CRÉER UN NOUVEAU CONTRÔLE **********
  // Cette méthode ajoute un nouveau contrôle dans la base de données
  // Elle prend en paramètre les données du contrôle et renvoie le contrôle créé avec son ID
  async create(controle: Controle): Promise<Controle> {
    try {
      // On insère le nouveau contrôle dans la base
      // Les '?' sont remplacés par les valeurs dans l'ordre du tableau qui suit
      const [result] = await db.query(
        'INSERT INTO Controle_EPI (date_controle, gestionnaire_id, epi_id, statut_id, remarques) VALUES (?, ?, ?, ?, ?)',
        [
          controle.date_controle,
          controle.gestionnaire_id,
          controle.epi_id,
          controle.statut_id,
          controle.remarques || null // Si pas de remarques, on met null
        ]
      );
      
      // On récupère l'ID généré automatiquement par MySQL
      const insertId = (result as any).insertId;
      // On renvoie le contrôle complet avec son nouvel ID
      return { ...controle, id: insertId };
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      throw error;
    }
  }
} 