// ********** IMPORTS **********
// On importe l'objet 'db' qui nous permet de nous connecter à la base de données MySQL
// Il vient du fichier database.ts qui configure la connexion avec les bons paramètres
import { db } from '../config/database';

// ********** DÉFINITION DU MODÈLE **********
// Cette classe gère tout ce qui concerne les statuts des EPIs dans la base de données
// Un statut peut être par exemple : "En service", "Hors service", "En contrôle"...
// Elle fait partie de la couche "Model" qui s'occupe des données
export class StatutModel {
  // ********** MÉTHODE : RÉCUPÉRER TOUS LES STATUTS **********
  // Cette méthode va chercher tous les statuts possibles dans la base
  // - async/await : car l'accès à la base de données prend du temps
  // - Promise<any[]> : on promet de renvoyer un tableau de statuts
  async findAll(): Promise<any[]> {
    try {
      // On fait une requête SQL simple pour sélectionner tous les statuts
      // Le résultat est stocké dans 'rows' grâce à la déstructuration [rows]
      const [rows] = await db.query('SELECT * FROM Statut_EPI');
      
      // On convertit et renvoie le résultat en tableau de statuts
      return rows as any[];
    } catch (error) {
      // Si une erreur survient pendant la requête :
      // 1. On l'affiche dans la console pour pouvoir débugger
      console.error('Erreur lors de la récupération des statuts:', error);
      // 2. On la renvoie pour que le contrôleur puisse la gérer
      throw error;
    }
  }
}

/*
RÉSUMÉ DU FICHIER statutModel.ts :
Ce fichier est un "Model" qui gère les statuts des EPIs dans la base de données.
Son rôle est simple mais important :
1. Il permet de récupérer la liste de tous les statuts possibles pour un EPI
2. Ces statuts sont utilisés par le reste de l'application pour :
   - Afficher l'état actuel d'un EPI
   - Mettre à jour le statut d'un EPI lors d'un contrôle
   - Filtrer les EPIs par statut dans l'interface

C'est comme un "assistant" qui va chercher dans la base de données 
toutes les valeurs possibles pour l'état d'un EPI !
*/