// ********** IMPORTS **********
// On importe l'instance axios configurée qui nous permet de communiquer avec l'API
import { api } from './api';
// On importe le type TypeEPI qui définit la structure d'un type d'EPI dans notre application
import { TypeEPI } from '../types';
// Import de composants Material UI (non utilisés dans ce service - à supprimer)
import { Container, Typography, Grid, Button, TextField, Box } from '@mui/material';

// ********** TYPES **********
// Cette interface définit le format des réponses de notre API
// Elle utilise un type générique <T> qui s'adapte selon les données reçues
interface ApiResponse<T> {
  message: string;    // Message de l'API (succès, erreur...)
  data: T;           // Les données reçues, de type T (flexible)
}

// ********** SERVICE DES TYPES D'EPI **********
// Ce service centralise toutes les fonctions qui communiquent avec l'API
// pour gérer les types d'EPI (casques, harnais, etc.)
export const typeEpiService = {
  
  // Fonction qui RÉCUPÈRE TOUS les types d'EPI depuis l'API
  // Promise<TypeEPI[]> signifie qu'on va recevoir un tableau de types d'EPI
  getAll: async (): Promise<TypeEPI[]> => {
    try {
      // On fait un appel GET à l'API et on attend la réponse
      const response = await api.get<ApiResponse<TypeEPI[]>>('/api/epi-types');
      // On retourne les données ou un tableau vide si pas de données
      return response.data || [];
    } catch (error) {
      // Si une erreur survient, on l'affiche dans la console pour débugger
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      // On renvoie un tableau vide pour éviter les erreurs dans l'interface
      return [];
    }
  },

  // Fonction qui RÉCUPÈRE UN SEUL type d'EPI via son ID
  // Elle peut renvoyer soit un TypeEPI soit null si pas trouvé
  getById: async (id: number): Promise<TypeEPI | null> => {
    try {
      // On fait un appel GET avec l'ID dans l'URL
      const response = await api.get<ApiResponse<TypeEPI>>(`/api/epi-types/${id}`);
      return response.data;
    } catch (error) {
      // En cas d'erreur, on affiche un message dans la console
      console.error(`Erreur lors de la récupération du type d'EPI avec l'ID ${id}:`, error);
      // Et on renvoie null pour indiquer que le type n'a pas été trouvé
      return null;
    }
  }
}; 