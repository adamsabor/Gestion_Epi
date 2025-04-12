// ********** IMPORTS **********
// On importe l'instance axios configurée qui nous permet de communiquer avec l'API
import { api } from './api';
// On importe le type Controle qui définit la structure d'un contrôle dans notre application
import { Controle } from '../types';

// ********** TYPES **********
// On définit le format des réponses que notre API nous renvoie
// C'est comme une "enveloppe" qui contient :
// - Un message (ex: "Succès", "Erreur"...)  
// - Les données demandées (de type T, qui change selon ce qu'on demande)
interface ApiResponse<T> {
  message: string;
  data: T;
}

// ********** SERVICE DES CONTRÔLES **********
// Ce service centralise toutes les fonctions qui communiquent avec l'API
// pour gérer les contrôles des EPIs (création, lecture, etc.)
export const controleService = {
  
  // Fonction qui récupère TOUS les contrôles depuis l'API
  // Promise<Controle[]> signifie qu'on va recevoir un tableau de contrôles
  getAll: async (): Promise<Controle[]> => {
    try {
      // On fait un appel GET à l'API et on attend la réponse
      const response = await api.get<ApiResponse<Controle[]>>('/api/controles');
      // On retourne les données ou un tableau vide si pas de données
      return response.data || [];
    } catch (error) {
      // Si une erreur survient, on l'affiche dans la console pour débugger
      console.error('Erreur lors de la récupération des contrôles:', error);
      // On propage l'erreur pour que les composants puissent la gérer
      throw error;
    }
  },

  // Fonction qui récupère tous les contrôles d'UN SEUL EPI
  // On lui donne l'ID de l'EPI en paramètre
  getByEpiId: async (epiId: number): Promise<Controle[]> => {
    try {
      // On fait un appel GET avec l'ID de l'EPI dans l'URL
      const response = await api.get<ApiResponse<Controle[]>>(`/api/controles/epi/${epiId}`);
      return response.data || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI ${epiId}:`, error);
      throw error;
    }
  },

  // Fonction qui récupère UN SEUL contrôle via son ID
  // Cette fois on reçoit un seul contrôle, pas un tableau
  getById: async (id: number): Promise<Controle> => {
    try {
      // On fait un appel GET avec l'ID du contrôle dans l'URL
      const response = await api.get<ApiResponse<Controle>>(`/api/controles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${id}:`, error);
      throw error;
    }
  },

  // Fonction qui CRÉE un nouveau contrôle
  // Elle reçoit toutes les infos du contrôle en paramètre
  create: async (controle: Controle): Promise<Controle> => {
    try {
      // On fait un appel POST avec les données du contrôle
      const response = await api.post<ApiResponse<Controle>>('/api/controles', controle);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      throw error;
    }
  }
}; 