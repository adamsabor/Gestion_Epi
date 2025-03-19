import { api } from './api';
import { Controle } from '../types';

// Définir un type pour la réponse de l'API
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const controleService = {
  // Récupérer tous les contrôles
  getAll: async (): Promise<Controle[]> => {
    try {
      const response = await api.get<ApiResponse<Controle[]>>('/api/controles');
      return response.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles:', error);
      throw error;
    }
  },

  // Récupérer les contrôles d'un EPI spécifique
  getByEpiId: async (epiId: number): Promise<Controle[]> => {
    try {
      const response = await api.get<ApiResponse<Controle[]>>(`/api/controles/epi/${epiId}`);
      return response.data || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI ${epiId}:`, error);
      throw error;
    }
  },

  // Récupérer un contrôle par son ID
  getById: async (id: number): Promise<Controle> => {
    try {
      const response = await api.get<ApiResponse<Controle>>(`/api/controles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau contrôle
  create: async (controle: Controle): Promise<Controle> => {
    try {
      const response = await api.post<ApiResponse<Controle>>('/api/controles', controle);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      throw error;
    }
  }
}; 