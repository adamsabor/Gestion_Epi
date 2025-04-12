// ********** IMPORTS **********
// On importe l'objet 'db' qui nous permet de nous connecter à la base de données MySQL
// Il vient du fichier database.ts qui configure la connexion avec les bons paramètres
import { db } from '../config/database';

// On importe le type 'TypeEPI' qui définit la structure d'un type d'EPI (casque, harnais, etc.)
// Ce type nous aide à avoir un code plus sûr en vérifiant les données
import { TypeEPI } from '../types';

// ********** DÉFINITION DU MODÈLE **********
// Cette classe gère tout ce qui concerne les types d'EPIs dans la base de données
// Un type d'EPI peut être par exemple : "Casque", "Harnais", "Longe"...
// Elle fait partie de la couche "Model" qui s'occupe des données
export class TypeEpiModel {
  // ********** MÉTHODE : RÉCUPÉRER TOUS LES TYPES D'EPI **********
  // Cette méthode va chercher tous les types d'EPIs possibles dans la base
  // - async/await : car l'accès à la base de données prend du temps
  // - Promise<TypeEPI[]> : on promet de renvoyer un tableau de types d'EPI
  async findAll(): Promise<TypeEPI[]> {
    try {
      // On fait une requête SQL simple pour sélectionner tous les types d'EPI
      // Le résultat est stocké dans 'rows' grâce à la déstructuration [rows]
      const [rows] = await db.query('SELECT * FROM Type_EPI');
      
      // On convertit et renvoie le résultat en tableau de types d'EPI
      return rows as TypeEPI[];
    } catch (error) {
      // Si une erreur survient pendant la requête :
      // 1. On l'affiche dans la console pour pouvoir débugger
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      // 2. On la renvoie pour que le contrôleur puisse la gérer
      throw error;
    }
  }

  // ********** MÉTHODE : RÉCUPÉRER UN TYPE D'EPI PAR SON ID **********
  // Cette méthode cherche un type d'EPI spécifique grâce à son ID
  // Elle renvoie soit le type trouvé, soit null si aucun type n'existe avec cet ID
  async findById(id: number): Promise<TypeEPI | null> {
    try {
      // On fait une requête SQL avec un WHERE pour filtrer par ID
      // Le '?' est remplacé par l'id de façon sécurisée (évite les injections SQL)
      const [rows] = await db.query('SELECT * FROM Type_EPI WHERE id = ?', [id]);
      
      // On convertit le résultat en tableau de types d'EPI
      const types = rows as TypeEPI[];
      
      // Si on trouve un type, on le renvoie, sinon on renvoie null
      return types.length > 0 ? types[0] : null;
    } catch (error) {
      // En cas d'erreur, on l'affiche et on la renvoie
      console.error(`Erreur lors de la récupération du type d'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }
}

/*
RÉSUMÉ DU FICHIER typeEpiModel.ts :
Ce fichier est un "Model" qui gère les types d'EPIs dans la base de données.
Son rôle est essentiel car il permet de :
1. Récupérer la liste de tous les types d'EPIs possibles (casques, harnais, etc.)
2. Retrouver un type d'EPI spécifique grâce à son ID

Ces informations sont utilisées par le reste de l'application pour :
- Créer de nouveaux EPIs en choisissant leur type
- Afficher le type d'un EPI dans les listes et les détails
- Filtrer les EPIs par type dans l'interface

C'est comme un "catalogue" qui répertorie toutes les catégories 
d'équipements de protection que l'application peut gérer !
*/