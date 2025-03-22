import { api } from './api';
import { TypeEPI } from '../types';
import { Container, Typography, Grid, Button, TextField, Box } from '@mui/material';

// Définir un type pour la réponse de l'API
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const typeEpiService = {
  // Récupérer tous les types d'EPI
  getAll: async (): Promise<TypeEPI[]> => {
    try {
      const response = await api.get<ApiResponse<TypeEPI[]>>('/api/epi-types');
      return response.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      // Retourner un tableau vide en cas d'erreur pour éviter les erreurs dans l'interface
      return [];
    }
  },

  // Récupérer un type d'EPI par son ID
  getById: async (id: number): Promise<TypeEPI | null> => {
    try {
      const response = await api.get<ApiResponse<TypeEPI>>(`/api/epi-types/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du type d'EPI avec l'ID ${id}:`, error);
      return null;
    }
  }
}; 