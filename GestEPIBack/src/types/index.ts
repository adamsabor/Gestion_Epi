// ************************************************************************
// 🎓 FICHIER DE TYPES TYPESCRIPT - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 DÉFINITION DES TYPES
// Ce fichier est crucial car il définit tous les types TypeScript utilisés dans l'application
// Il sert de "contrat" pour s'assurer que les données sont correctement structurées

// ********** TYPES D'ÉQUIPEMENTS **********
// Une énumération (enum) est un type spécial qui permet de définir un ensemble de constantes nommées
// Ici on liste tous les types d'EPI possibles dans l'application
// L'avantage est qu'on ne peut pas utiliser d'autres valeurs que celles définies ici
export enum TypeEPIEnum {
  CASQUE = 'CASQUE',        // Pour protéger la tête lors des travaux en hauteur
  HARNAIS = 'HARNAIS',      // Équipement principal de sécurité qui retient le corps
  LONGE = 'LONGE',          // Corde ou sangle qui relie le harnais au point d'ancrage
  MOUSQUETON = 'MOUSQUETON', // Connecteur métallique pour relier les équipements
  AUTRE = 'AUTRE'           // Catégorie pour les équipements non standards
}

// ********** STRUCTURE D'UN EPI **********
// Une interface définit la structure exacte d'un objet
// C'est comme un plan qui dit quelles propriétés doit avoir un EPI
// Le ? après le nom signifie que la propriété est optionnelle
export interface EPI {
  id?: number;                      // Clé primaire en base de données (auto-incrémentée)
  identifiant_custom: string;       // Code unique attribué par l'entreprise (ex: EPI-2024-001)
  marque: string;                   // Nom du fabricant (ex: Petzl, Black Diamond)
  modele: string;                   // Référence du produit (ex: VERTEX VENT)
  numéro_série: string;             // Numéro unique du fabricant pour la traçabilité
  taille?: string;                  // Optionnel - Utile pour les harnais (S, M, L, etc.)
  couleur?: string;                 // Optionnel - Pour identifier facilement l'équipement
  date_achat: Date | string;        // Date d'acquisition - Format accepté: Date ou string
  date_fabrication: Date | string;  // Date de production par le fabricant
  date_mise_en_service: Date | string; // Date de première utilisation
  périodicité_controle: number;     // Nombre de mois entre chaque contrôle obligatoire
  epi_type_id: number;              // Clé étrangère vers la table des types d'EPI
}

// ********** TYPE D'EPI SIMPLIFIÉ **********
// Structure pour la table de référence des types d'EPI
// Utilisée dans les relations avec la table principale des EPI
export interface TypeEPI {
  id?: number;    // Clé primaire auto-incrémentée
  nom: string;    // Nom du type (doit correspondre à TypeEPIEnum)
}

// ********** STATUTS DE CONTRÔLE **********
// Énumération des états possibles après un contrôle
// Permet de suivre le cycle de vie des équipements
export enum StatutControle {
  OPERATIONNEL = "Opérationnel",  // EPI vérifié et sûr d'utilisation
  A_REPARER = "À réparer",        // EPI nécessitant une maintenance
  MIS_AU_REBUT = "Mis au rebut"   // EPI à retirer définitivement du service
}

// ********** STRUCTURE D'UN CONTRÔLE **********
// Définit les données nécessaires pour tracer un contrôle d'EPI
// Chaque contrôle est lié à un EPI et un gestionnaire
export interface Controle {
  id?: number;                   // Identifiant unique en base de données
  date_controle: string;        // Date de réalisation du contrôle
  gestionnaire_id: number;      // Clé étrangère vers l'utilisateur qui fait le contrôle
  epi_id: number;              // Clé étrangère vers l'EPI contrôlé
  statut_id: number;           // Clé étrangère vers le statut attribué
  remarques?: string;          // Notes optionnelles sur l'état de l'équipement
}

// ********** STATUT GÉNÉRAL D'UN EPI **********
// Table de référence pour les différents états possibles
export interface StatutEPI {
  id?: number;    // Clé primaire auto-incrémentée
  nom: string;    // Libellé du statut
}

// ********** STRUCTURE D'UN UTILISATEUR **********
// Définit les informations requises pour chaque utilisateur
export interface Utilisateur {
  id?: number;        // Clé primaire auto-incrémentée
  nom: string;        // Nom de famille de l'utilisateur
  prénom: string;     // Prénom de l'utilisateur
  email: string;      // Email unique servant d'identifiant
  user_type_id: number; // Clé étrangère vers le type d'utilisateur
}

// ********** TYPE D'UTILISATEUR **********
// Table de référence pour les rôles utilisateur
export interface TypeUtilisateur {
  id?: number;    // Clé primaire auto-incrémentée
  nom: string;    // Nom du rôle (ex: Admin, Gestionnaire)
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est fondamental car il :
// 1. Définit tous les types de données utilisés dans l'application
// 2. Assure la cohérence des données entre le front-end et le back-end
// 3. Facilite la maintenance en centralisant les structures de données
// 4. Permet la détection d'erreurs avant l'exécution grâce au typage fort
//
// Points techniques à souligner :
// - Utilisation de TypeScript pour la sécurité du typage
// - Modélisation des données métier
// - Relations entre les tables (clés étrangères)
// - Documentation claire pour la maintenabilité