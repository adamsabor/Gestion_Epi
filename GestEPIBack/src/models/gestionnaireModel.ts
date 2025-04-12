// ********** IMPORTS **********
// On importe l'objet 'db' qui nous permet de nous connecter à la base de données MySQL
// Il vient du fichier database.ts qui configure la connexion avec les bons paramètres
import { db } from '../config/database';

// ********** DÉFINITION DU MODÈLE **********
// Cette classe s'occupe de toutes les opérations en base de données concernant les gestionnaires
// Elle fait partie de la couche "Model" de l'architecture MVC (Model-View-Controller)
export class GestionnaireModel {
  // ********** MÉTHODE : RÉCUPÉRER TOUS LES GESTIONNAIRES **********
  // Cette méthode va chercher tous les utilisateurs qui sont des gestionnaires dans la base
  // - async/await : car l'accès à la base de données prend du temps
  // - Promise<any[]> : on promet de renvoyer un tableau de gestionnaires
  async findAll(): Promise<any[]> {
    try {
      // On fait une requête SQL pour sélectionner tous les utilisateurs de type "gestionnaire"
      // - SELECT * : on prend toutes les colonnes
      // - WHERE user_type_id = 1 : on ne prend que les gestionnaires (type_id = 1)
      // Le résultat est stocké dans 'rows' grâce à la déstructuration [rows]
      const [rows] = await db.query('SELECT * FROM Utilisateur WHERE user_type_id = 1');

      // On convertit et renvoie le résultat en tableau de gestionnaires
      return rows as any[];
    } catch (error) {
      // Si une erreur survient pendant la requête :
      // 1. On l'affiche dans la console pour pouvoir débugger
      console.error('Erreur lors de la récupération des gestionnaires:', error);
      // 2. On la renvoie pour que le contrôleur puisse la gérer
      throw error;
    }
  }
} 