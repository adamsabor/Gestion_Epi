import { api } from './api';
import { TypeEPI } from '../types';

// Définir un type pour la réponse de l'API
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const typeEpiService = {
  getAll: async (): Promise<TypeEPI[]> => {
    try {
      const response = await api.get<ApiResponse<TypeEPI[]>>('/api/epi-types');
      return response.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      return [];
    }
  }
}; 