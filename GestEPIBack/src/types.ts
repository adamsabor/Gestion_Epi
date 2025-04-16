// ************************************************************************
// 🎓 FICHIER DE TYPES TYPESCRIPT - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 DÉFINITION DES TYPES
// Ce fichier est crucial car il définit tous les types TypeScript utilisés dans l'application
// Il sert de "contrat" pour s'assurer que les données sont correctement structurées

// ********** INTERFACE EPI **********
// Une interface définit la structure exacte d'un objet
// Pour l'E6 : C'est comme un plan qui dit quelles propriétés doit avoir un EPI
export interface EPI {
  id?: number;                    // Le ? signifie optionnel car auto-généré en BDD
  identifiant_custom: string;     // Ex: "HARN-001" - Code unique pour tracer l'équipement
  marque: string;                 // Ex: "Petzl" - Important pour la conformité
  modele: string;                 // Ex: "AVAO BOD" - Référence précise du fabricant
  numéro_série: string;          // Numéro unique du fabricant - Crucial pour la traçabilité
  taille?: string;               // Optionnel - Utile pour les harnais (S, M, L...)
  couleur?: string;              // Optionnel - Pour identification visuelle rapide
  date_achat: string;            // Format YYYY-MM-DD - Pour le suivi comptable
  date_fabrication: string;      // Format YYYY-MM-DD - Pour calculer la durée de vie
  date_mise_en_service: string;  // Format YYYY-MM-DD - Début du cycle de vie
  périodicité_controle: number;  // En mois - Pour planifier les contrôles réglementaires
  epi_type_id: number;           // Clé étrangère - Lien vers la table type_epi
  type_nom?: string;             // Ajouté par jointure SQL: SELECT e.*, t.nom as type_nom FROM epi e JOIN type_epi t
}

// ********** INTERFACE CONTROLE **********
// Structure pour tracer les vérifications périodiques obligatoires
// Pour l'E6 : Permet de suivre l'historique des contrôles de sécurité
export interface Controle {
  id?: number;                   // Auto-incrémenté en BDD
  date_controle: string;         // YYYY-MM-DD - Quand le contrôle a été fait
  gestionnaire_id: number;       // Qui a fait le contrôle - Lien vers table utilisateur
  epi_id: number;               // Quel EPI est contrôlé - Lien vers table epi
  statut_id: number;            // Résultat du contrôle - Lien vers table statut
  remarques?: string;           // Notes techniques optionnelles
  // Champs de jointure - Viennent des requêtes SQL avec JOIN
  gestionnaire_nom?: string;    // Nom complet du contrôleur
  statut_nom?: string;         // Ex: "Opérationnel", "À réparer"
  identifiant_custom?: string; // Code de l'EPI pour référence rapide
  marque?: string;            // Marque pour identification
  modèle?: string;            // Modèle pour identification
}

// ********** INTERFACE TYPE_EPI **********
// Table de référence pour catégoriser les équipements
// Pour l'E6 : Structure simple mais essentielle pour la classification
export interface TypeEPI {
  id?: number;                 // Clé primaire auto-incrémentée
  nom: string;                 // Ex: "Casque", "Harnais", "Longe"
}

// ********** INTERFACE STATUT_EPI **********
// États possibles d'un équipement après contrôle
// Pour l'E6 : Permet de suivre le cycle de vie des EPI
export interface StatutEPI {
  id?: number;                 // Clé primaire auto-incrémentée
  nom: string;                 // Ex: "Opérationnel", "À contrôler"
}

// ********** INTERFACE UTILISATEUR **********
// Données des utilisateurs du système
// Pour l'E6 : Gestion des accès et des responsabilités
export interface Utilisateur {
  id?: number;                 // Clé primaire auto-incrémentée
  nom: string;                 // Nom de famille
  prénom: string;             // Prénom
  email: string;              // Sert d'identifiant unique
  user_type_id: number;       // Rôle : admin, gestionnaire...
  type_nom?: string;          // Ajouté par JOIN pour l'affichage
}

// ********** INTERFACE ALERTE **********
// Étend l'interface EPI avec des infos de suivi
// Pour l'E6 : Gestion proactive des contrôles réglementaires
export interface Alerte extends EPI {
  dernier_controle: string;   // Date du dernier contrôle fait
  prochain_controle: string;  // Date limite du prochain contrôle
  statut: 'À jour' | 'À venir' | 'En retard';  // Union type - État actuel
  urgence: 'normale' | 'moyenne' | 'haute';     // Union type - Priorité
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est fondamental car il :
// 1. Définit tous les types de données de l'application
// 2. Assure la cohérence des données via TypeScript
// 3. Documente la structure de la base de données
// 4. Facilite la maintenance et l'évolution du code
//
// Points techniques à souligner :
// - Typage strict avec TypeScript
// - Relations entre tables (clés étrangères)
// - Jointures SQL
// - Bonnes pratiques de développement