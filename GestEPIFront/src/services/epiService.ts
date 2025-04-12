// ********** IMPORTS **********
// On importe l'instance axios configurée depuis api.ts
// Cette instance nous permet de communiquer facilement avec notre API
import { api } from './api';
// On importe le type EPI qui définit la structure d'un EPI dans notre application
// Ce type est défini dans le dossier types et sert de "modèle" pour nos données
import { EPI } from '../types';

// ********** TYPES **********
// On définit le format des réponses que notre API nous renvoie
// C'est comme une "enveloppe" qui contient toujours :
// - Un message (ex: "Succès", "Erreur"...)
// - Les données demandées (de type T, qui change selon ce qu'on demande)
interface ApiResponse<T> {
  message: string;
  data: T;
}

// ********** SERVICE DES EPIs **********
// Ce service centralise toutes les fonctions qui communiquent avec l'API
// pour gérer les EPIs (Équipements de Protection Individuelle)
// Il suit le modèle CRUD : Create (créer), Read (lire), Update (modifier), Delete (supprimer)
export const epiService = {
  
  // Fonction qui RÉCUPÈRE TOUS les EPIs depuis l'API
  // Promise<EPI[]> signifie qu'on va recevoir un tableau d'EPIs
  getAll: async (): Promise<EPI[]> => {
    try {
      // On fait un appel GET à l'API et on attend la réponse
      const response = await api.get<ApiResponse<EPI[]>>('/api/epis');
      // On retourne les données ou un tableau vide si pas de données
      return response.data || [];
    } catch (error) {
      // Si une erreur survient, on l'affiche dans la console pour débugger
      console.error('Erreur lors de la récupération des EPIs:', error);
      // On propage l'erreur pour que les composants puissent la gérer
      throw error;
    }
  },

  // Fonction qui RÉCUPÈRE UN SEUL EPI via son ID
  // On lui donne l'ID en paramètre et elle renvoie l'EPI correspondant
  getById: async (id: number): Promise<EPI> => {
    try {
      // On fait un appel GET avec l'ID dans l'URL
      const response = await api.get<ApiResponse<EPI>>(`/api/epis/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  },

  // Fonction qui CRÉE un nouvel EPI
  // Elle reçoit toutes les infos du nouvel EPI en paramètre
  create: async (epi: EPI): Promise<EPI> => {
    try {
      // On fait un appel POST avec les données du nouvel EPI
      const response = await api.post<ApiResponse<EPI>>('/api/epis', epi);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'EPI:', error);
      throw error;
    }
  },

  // Fonction qui MODIFIE un EPI existant
  // Elle prend l'ID de l'EPI à modifier et les nouvelles données
  // Partial<EPI> signifie qu'on peut envoyer juste une partie des infos
  update: async (id: number, epi: Partial<EPI>): Promise<EPI> => {
    try {
      // On fait un appel PUT avec l'ID dans l'URL et les nouvelles données
      const response = await api.put<ApiResponse<EPI>>(`/api/epis/${id}`, epi);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  },

  // Fonction qui SUPPRIME un EPI via son ID
  // Promise<void> signifie qu'elle ne renvoie rien (juste confirmation)
  delete: async (id: number): Promise<void> => {
    try {
      // On fait un appel DELETE avec l'ID dans l'URL
      await api.delete<ApiResponse<void>>(`/api/epis/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }
}; 