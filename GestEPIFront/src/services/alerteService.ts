// ********** IMPORTS **********
// On importe l'instance axios préconfigurée qui permet de communiquer avec notre API
// Le fichier api.ts contient toute la configuration de base pour les appels HTTP
import { api } from './api';

// ********** INTERFACES **********
// Cette interface définit la structure d'une alerte dans notre application
// Elle sert de "contrat" TypeScript pour s'assurer que les données sont correctes
interface Alerte {
  id?: number;                    // L'ID est optionnel (?) car pas toujours présent
  identifiant_custom: string;     // Identifiant unique de l'EPI concerné
  marque: string;                 // Marque de l'EPI
  modèle: string;                 // Modèle de l'EPI
  dernier_controle: string;       // Date du dernier contrôle effectué
  prochain_controle: string;      // Date du prochain contrôle prévu
  statut: 'À jour' | 'À venir' | 'En retard';  // Le statut ne peut avoir que ces 3 valeurs
  urgence: 'normale' | 'moyenne' | 'haute';     // L'urgence ne peut avoir que ces 3 niveaux
}

// Cette interface définit le format des réponses de notre API
// Elle utilise un générique <T> pour pouvoir s'adapter à différents types de données
interface ApiResponse<T> {
  message: string;    // Message de l'API (succès, erreur, etc.)
  data: T;           // Les données retournées, de type T (flexible)
}

// ********** SERVICE DES ALERTES **********
// Ce service centralise toutes les fonctions qui communiquent avec l'API
// pour la gestion des alertes de contrôle des EPIs
export const alerteService = {
  // Fonction qui récupère TOUTES les alertes depuis l'API
  // async/await permet d'attendre la réponse de l'API avant de continuer
  getAll: async (): Promise<Alerte[]> => {
    try {
      // On fait un appel GET à l'API et on attend la réponse
      // Le <ApiResponse<Alerte[]>> précise qu'on attend un tableau d'alertes
      const response = await api.get<ApiResponse<Alerte[]>>('/api/alertes');
      // On retourne les données ou un tableau vide si pas de données
      return response.data || [];
    } catch (error) {
      // Si une erreur survient, on l'affiche dans la console
      console.error('Erreur lors de la récupération des alertes:', error);
      // Et on la propage pour que les composants puissent la gérer
      throw error;
    }
  },

  // Fonction qui récupère les alertes FILTRÉES par statut
  // Elle prend en paramètre le statut qu'on recherche
  getByStatut: async (statut: string): Promise<Alerte[]> => {
    try {
      // Appel GET à l'API avec le statut dans l'URL
      const response = await api.get<ApiResponse<Alerte[]>>(`/api/alertes/statut/${statut}`);
      return response.data || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des alertes avec le statut ${statut}:`, error);
      throw error;
    }
  }
}; 