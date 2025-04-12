// ✅ alerteService.ts corrigé
import { api } from './api';
import { Alerte } from '../types';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const alerteService = {
  // Récupérer toutes les alertes
  getAll: async (): Promise<Alerte[]> => {
    try {
      const response = await api.get<ApiResponse<Alerte[]>>('/alertes');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      throw error;
    }
  },

  // Récupérer les alertes par statut
  getByStatut: async (statut: string): Promise<Alerte[]> => {
    try {
      const response = await api.get<ApiResponse<Alerte[]>>(`/alertes/statut/${statut}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des alertes avec le statut ${statut}:`, error);
      throw error;
    }
  },
};