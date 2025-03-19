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
  date_achat: string;
  date_fabrication: string;
  date_mise_en_service: string;
  périodicité_controle: number; // en mois
  epi_type_id: number;
}

// Interface pour un type d'EPI
export interface TypeEPI {
  id: number;
  nom: string;
  description?: string;
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
  date_controle: string;
  gestionnaire: string;
  epi_id: number;
  statut: StatutControle;
  remarques?: string;
} 