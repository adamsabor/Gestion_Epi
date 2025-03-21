import { api } from './api';
import { EPI } from '../types';

// Interface pour les alertes
interface Alerte extends EPI {
  dernier_controle: string;
  prochain_controle: string;
  statut: 'À jour' | 'À venir' | 'En retard';
  urgence: 'normale' | 'moyenne' | 'haute';
}

// Définir un type pour la réponse de l'API
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const alerteService = {
  // Récupérer toutes les alertes
  getAll: async (): Promise<Alerte[]> => {
    try {
      const response = await api.get<ApiResponse<Alerte[]>>('/api/alertes');
      return response.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      return [];
    }
  },

  // Récupérer les alertes filtrées par statut
  getByStatut: async (statut: string): Promise<Alerte[]> => {
    try {
      const response = await api.get<ApiResponse<Alerte[]>>(`/api/alertes?statut=${statut}`);
      return response.data || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des alertes avec le statut ${statut}:`, error);
      return [];
    }
  }
}; 