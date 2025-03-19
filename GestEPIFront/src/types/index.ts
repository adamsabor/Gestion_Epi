export enum EpiTypeEnum {
  CASQUE = 'CASQUE',
  HARNAIS = 'HARNAIS',
  LONGE = 'LONGE',
  MOUSQUETON = 'MOUSQUETON',
  AUTRE = 'AUTRE'
}

export enum StatutControle {
  OPERATIONNEL = "Opérationnel",
  A_REPARER = "À réparer",
  MIS_AU_REBUT = "Mis au rebut"
}

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

export interface TypeEPI {
  id: number;
  nom: string;
  description?: string;
}

export interface Controle {
  id?: number;
  date_controle: string;
  gestionnaire: string;
  epi_id: number;
  statut: StatutControle;
  remarques?: string;
}

export interface StatutEPI {
  id: number;
  nom: string;
  description?: string;
}

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  type_utilisateur_id: number;
} 