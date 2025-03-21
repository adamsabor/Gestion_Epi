// Énumération pour les types d'EPI
export enum TypeEPIEnum {
  CASQUE = 'CASQUE',
  HARNAIS = 'HARNAIS',
  LONGE = 'LONGE',
  MOUSQUETON = 'MOUSQUETON',
  AUTRE = 'AUTRE'
}

// Interface pour un EPI
export interface EPI {
  id?: number;
  identifiant_custom: string;
  marque: string;
  modèle: string;
  numéro_série: string;
  taille?: string;
  couleur?: string;
  date_achat: Date | string;
  date_fabrication: Date | string;
  date_mise_en_service: Date | string;
  périodicité_controle: number; // en mois
  epi_type_id: number;
}

// Interface pour un type d'EPI
export interface TypeEPI {
  id?: number;
  nom: string;
}

// Enum pour le statut d'un contrôle
export enum StatutControle {
  OPERATIONNEL = "Opérationnel",
  A_REPARER = "À réparer",
  MIS_AU_REBUT = "Mis au rebut"
}

// Interface pour un contrôle d'EPI
export interface Controle {
  id?: number;
  date_controle: Date | string;
  gestionnaire_id: number;
  epi_id: number;
  statut_id: number;
  remarques?: string;
}

export interface StatutEPI {
  id?: number;
  nom: string;
}

export interface Utilisateur {
  id?: number;
  nom: string;
  prénom: string;
  email: string;
  user_type_id: number;
}

export interface TypeUtilisateur {
  id?: number;
  nom: string;
} 