// ********** FICHIER DES TYPES **********
// Ce fichier est TRÈS IMPORTANT car il définit la structure de toutes les données
// de notre application. C'est comme un "plan" qui décrit la forme de chaque information.

// Liste des types d'EPI disponibles dans l'application
// Un enum est comme une liste de choix fixes qu'on ne peut pas modifier
export enum EpiTypeEnum {
  CASQUE = 'CASQUE',         // Pour protéger la tête
  HARNAIS = 'HARNAIS',       // Pour sécuriser le corps
  LONGE = 'LONGE',          // Corde de sécurité
  MOUSQUETON = 'MOUSQUETON', // Pour s'accrocher
  AUTRE = 'AUTRE'           // Pour tout autre type d'EPI
}

// Les différents états possibles après un contrôle d'EPI
export enum StatutControle {
  Operationnel = 'Opérationnel',  // L'EPI peut être utilisé
  AReparer = 'À réparer',         // L'EPI doit être réparé
  MisAuRebut = 'Mis au rebut'     // L'EPI n'est plus utilisable
}

// Structure d'un EPI (Équipement de Protection Individuelle)
// Cette interface définit TOUTES les informations qu'on doit avoir sur un EPI
export interface EPI {
  id?: number;                    // Numéro unique de l'EPI (optionnel car auto-généré)
  identifiant_custom: string;     // Code unique donné par l'entreprise
  marque: string;                 // Fabricant de l'EPI
  modèle: string;                 // Modèle spécifique
  numéro_série: string;          // Numéro unique du fabricant
  taille?: string;               // Taille de l'EPI (optionnel)
  couleur?: string;              // Couleur de l'EPI (optionnel)
  date_achat: string;            // Quand l'EPI a été acheté
  date_fabrication: string;      // Quand l'EPI a été fabriqué
  date_mise_en_service: string;  // Quand on a commencé à utiliser l'EPI
  périodicité_controle: number;  // Nombre de mois entre chaque contrôle
  epi_type_id: number;           // Lien vers le type d'EPI (casque, harnais...)
}

// Structure simplifiée d'un type d'EPI
// Utilisée pour catégoriser les EPIs
export interface TypeEPI {
  id: number;     // Identifiant unique du type
  nom: string;    // Nom du type (ex: "Casque", "Harnais"...)
}

// Structure d'un contrôle d'EPI
// Chaque contrôle enregistre l'état d'un EPI à un moment donné
export interface Controle {
  id?: number;                // Numéro unique du contrôle
  date_controle: string;      // Date à laquelle le contrôle a été fait
  epi_id: number;            // Lien vers l'EPI contrôlé
  gestionnaire_id: number;    // Lien vers la personne qui a fait le contrôle
  statut_id: number;         // État de l'EPI après contrôle
  remarques?: string;        // Notes sur l'état de l'EPI (optionnel)
  
  // Ces champs sont remplis automatiquement quand on récupère un contrôle
  gestionnaire_nom?: string;  // Nom de la personne qui a fait le contrôle
  statut_nom?: string;       // Nom du statut en texte
}

// Structure d'un statut possible pour un EPI
export interface StatutEPI {
  id: number;           // Identifiant unique du statut
  nom: string;         // Nom du statut
  description?: string; // Explication du statut (optionnel)
}

// Structure d'un utilisateur de l'application
export interface Utilisateur {
  id: number;               // Identifiant unique de l'utilisateur
  nom: string;             // Nom de famille
  prenom: string;          // Prénom
  type_utilisateur_id: number; // Type d'utilisateur (admin, gestionnaire...)
}