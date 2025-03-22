// Types pour les EPIs
export interface EPI {
  id?: number;
  identifiant_custom: string;
  marque: string;
  modèle: string;
  numéro_série: string;
  taille?: string;
  couleur?: string;
  date_achat: string; // Format YYYY-MM-DD
  date_fabrication: string; // Format YYYY-MM-DD
  date_mise_en_service: string; // Format YYYY-MM-DD
  périodicité_controle: number;
  epi_type_id: number;
  type_nom?: string; // Pour les jointures
}

// Types pour les contrôles
export interface Controle {
  id?: number;
  date_controle: string; // Format YYYY-MM-DD
  gestionnaire_id: number;
  epi_id: number;
  statut_id: number;
  remarques?: string;
  gestionnaire_nom?: string; // Pour les jointures
  statut_nom?: string; // Pour les jointures
  identifiant_custom?: string; // Pour les jointures
  marque?: string; // Pour les jointures
  modèle?: string; // Pour les jointures
}

// Types pour les types d'EPI
export interface TypeEPI {
  id?: number;
  nom: string;
}

// Types pour les statuts d'EPI
export interface StatutEPI {
  id?: number;
  nom: string;
}

// Types pour les utilisateurs
export interface Utilisateur {
  id?: number;
  nom: string;
  prénom: string;
  email: string;
  user_type_id: number;
  type_nom?: string; // Pour les jointures
}

// Types pour les alertes
export interface Alerte extends EPI {
  dernier_controle: string;
  prochain_controle: string;
  statut: 'À jour' | 'À venir' | 'En retard';
  urgence: 'normale' | 'moyenne' | 'haute';
}