// ************************************************************************
// 🎓 TYPES TYPESCRIPT - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 DÉFINITION DES TYPES
// Pour l'E6 : Les interfaces TypeScript sont comme des classes PHP
// Elles définissent la structure des données manipulées par l'application

// ********** INTERFACE EPI **********
// Pour l'E6 : Équivalent PHP d'une classe EPI avec ses propriétés
// En SQL : Correspond à la table 'epis' avec ses colonnes
export interface EPI {
  id?: number;                    // Clé primaire auto-incrémentée (comme en SQL)
  identifiant_custom: string;     // Code unique (ex: VARCHAR(50) NOT NULL)
  marque: string;                 // Marque (VARCHAR(100) NOT NULL)
  modèle: string;                 // Modèle (VARCHAR(100) NOT NULL)
  numéro_série: string;          // N° série unique (VARCHAR(100) NOT NULL)
  taille?: string | null;        // Taille (VARCHAR(50) NULL)
  couleur?: string | null;       // Couleur (VARCHAR(50) NULL)
  date_achat: string;            // Date d'achat (DATE NOT NULL)
  date_fabrication: string;      // Date fabrication (DATE NOT NULL)
  date_mise_en_service: string;  // Date 1ère utilisation (DATE NOT NULL)
  périodicité_controle: number;  // Mois entre contrôles (INT NOT NULL)
  epi_type_id: number;          // Clé étrangère vers types_epi (INT NOT NULL)
  type_nom?: string;            // Pour affichage uniquement, pas en BDD
}

// ********** INTERFACE CONTROLE **********
// Pour l'E6 : Équivalent table 'controles' en SQL
// Stocke l'historique des contrôles effectués
export interface Controle {
  id?: number;                   // Clé primaire (AUTO_INCREMENT)
  date_controle: string;        // Date contrôle (DATE NOT NULL)
  gestionnaire_id: number;      // Clé étrangère utilisateurs (INT NOT NULL)
  epi_id: number;              // Clé étrangère epis (INT NOT NULL)
  statut_id: number;           // Clé étrangère statuts (INT NOT NULL)
  remarques?: string;          // Commentaires (TEXT NULL)
  // Champs calculés pour l'affichage (pas en BDD)
  gestionnaire_nom?: string;   // JOIN avec table utilisateurs
  statut_nom?: string;        // JOIN avec table statuts
  epi_identifiant?: string;   // JOIN avec table epis
}

// ********** INTERFACE ALERTE **********
// Pour l'E6 : Vue SQL ou requête complexe
// Calcule les alertes de contrôle à partir des dates
export interface Alerte {
  id: number;                  // ID de l'EPI concerné
  identifiant_custom: string;  // Code EPI pour identification
  marque: string;             // Informations EPI
  modèle: string;             // pour affichage
  dernier_controle: string;   // MAX(date_controle) de controles
  prochain_controle: string;  // date_dernier_controle + periodicite
  // Types union (comme ENUM en SQL)
  statut: 'À jour' | 'À venir' | 'En retard';  
  urgence: 'normale' | 'moyenne' | 'haute';     
}

// ********** INTERFACE TYPE EPI **********
// Pour l'E6 : Table de référence types_epi
// Comme une table de paramétrage
export interface TypeEPI {
  id: number;    // Clé primaire (AUTO_INCREMENT)
  nom: string;   // Nom du type (VARCHAR(100) NOT NULL)
}

// ********** INTERFACE UTILISATEUR **********
// Pour l'E6 : Table utilisateurs
// Gestion des comptes et droits
export interface Utilisateur {
  id: number;         // Clé primaire (AUTO_INCREMENT)
  nom: string;        // VARCHAR(100) NOT NULL
  prénom: string;     // VARCHAR(100) NOT NULL
  email: string;      // VARCHAR(255) NOT NULL UNIQUE
  user_type_id: number; // Clé étrangère types_utilisateur
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Définit la structure de toutes les données de l'application
// 2. Assure la cohérence entre le front, l'API et la BDD
// 3. Facilite la détection d'erreurs avec TypeScript
// 4. Documente la structure de la base de données
// 5. Utilise les types TypeScript comme les classes PHP