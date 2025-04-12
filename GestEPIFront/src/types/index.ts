export interface EPI {
  id?: number;
  identifiant_custom: string;
  marque: string;
  modèle: string;
  numéro_série: string;
  taille?: string | null;
  couleur?: string | null;
  date_achat: string;
  date_fabrication: string;
  date_mise_en_service: string;
  périodicité_controle: number;
  epi_type_id: number;
  type_nom?: string; // jointure optionnelle côté affichage
}

export interface Controle {
  id?: number;
  date_controle: string;
  gestionnaire_id: number;
  epi_id: number;
  statut_id: number;
  remarques?: string;
  gestionnaire_nom?: string;
  statut_nom?: string;
  epi_identifiant?: string;
}

export interface Alerte {
  id: number;
  identifiant_custom: string;
  marque: string;
  modèle: string;
  dernier_controle: string;
  prochain_controle: string;
  statut: 'À jour' | 'À venir' | 'En retard';
  urgence: 'normale' | 'moyenne' | 'haute';
}

export interface TypeEPI {
  id: number;
  nom: string;
}

export interface Utilisateur {
  id: number;
  nom: string;
  prénom: string;
  email: string;
  user_type_id: number;
}