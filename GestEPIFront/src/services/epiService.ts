import { api } from './api';
import { EPI } from '../types';

// Définir un type pour la réponse de l'API
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const epiService = {
  // Récupérer tous les EPIs
  getAll: async (): Promise<EPI[]> => {
    try {
      const response = await api.get<ApiResponse<EPI[]>>('/api/epis');
      return response.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des EPIs:', error);
      throw error;
    }
  },

  // Récupérer un EPI par son ID
  getById: async (id: number): Promise<EPI> => {
    try {
      const response = await api.get<ApiResponse<EPI>>(`/api/epis/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouvel EPI
  create: async (epi: EPI): Promise<EPI> => {
    try {
      const response = await api.post<ApiResponse<EPI>>('/api/epis', epi);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'EPI:', error);
      throw error;
    }
  },

  // Mettre à jour un EPI
  update: async (id: number, epi: Partial<EPI>): Promise<EPI> => {
    try {
      const response = await api.put<ApiResponse<EPI>>(`/api/epis/${id}`, epi);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un EPI
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete<ApiResponse<void>>(`/api/epis/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }
}; 