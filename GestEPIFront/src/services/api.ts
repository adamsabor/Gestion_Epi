// ********** IMPORTS **********
// On importe axios qui permet de faire des appels HTTP (requêtes vers l'API)
// et AxiosResponse qui définit le format des réponses
import axios, { AxiosResponse } from 'axios';

// ********** CONFIGURATION D'AXIOS **********
// On crée une instance personnalisée d'axios avec des paramètres par défaut
// Cette instance sera utilisée pour TOUS les appels API de l'application
const instance = axios.create({
  // L'URL de base de notre API. Si pas de variable d'environnement, on utilise localhost:4000
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  // On précise que toutes nos requêtes enverront et recevront du JSON
  headers: {
    'Content-Type': 'application/json'
  }
});

// ********** INTERCEPTEURS **********
// Les intercepteurs sont comme des "gardiens" qui surveillent toutes les requêtes
// et réponses. Ils permettent d'ajouter des comportements automatiques.

// Intercepteur pour les REQUÊTES (avant d'envoyer au serveur)
instance.interceptors.request.use(
  // Fonction exécutée AVANT chaque requête
  (config) => {
    // On affiche dans la console l'URL complète de la requête (pour le debug)
    console.log(`Tentative de connexion à ${config.baseURL}${config.url}`);
    return config;
  },
  // Fonction exécutée si la requête échoue
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les RÉPONSES (après réception du serveur)
instance.interceptors.response.use(
  // Si la réponse est OK, on ne renvoie que les données (pas les métadonnées)
  (response) => {
    return response.data;
  },
  // Si la réponse contient une erreur, on la traite
  (error) => {
    // Si on a reçu une réponse du serveur mais avec une erreur
    if (error.response) {
      console.error(`Erreur lors de l'appel API (${error.config.url}): ${error.response.status} - ${error.response.data.message || error.message}`);
    } 
    // Si le serveur n'a pas répondu du tout
    else if (error.request) {
      console.error(`Erreur lors de l'appel API (${error.config?.url}): Pas de réponse du serveur`);
    } 
    // Pour toute autre erreur
    else {
      console.error(`Erreur lors de l'appel API: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// ********** MÉTHODES HTTP **********
// On exporte un objet 'api' qui contient les 4 méthodes principales HTTP :
// GET (lire), POST (créer), PUT (modifier), DELETE (supprimer)
export const api = {
  // Méthode GET : pour LIRE des données
  // <T> est un type générique qui s'adapte selon ce qu'on veut récupérer
  get: async <T>(url: string): Promise<T> => {
    try {
      const response = await instance.get<any, T>(url);
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel API (${url}):`, error);
      throw error;
    }
  },
  
  // Méthode POST : pour CRÉER des données
  // data contient les informations à envoyer au serveur
  post: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await instance.post<any, T>(url, data);
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel API (${url}):`, error);
      throw error;
    }
  },
  
  // Méthode PUT : pour MODIFIER des données existantes
  put: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await instance.put<any, T>(url, data);
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel API (${url}):`, error);
      throw error;
    }
  },
  
  // Méthode DELETE : pour SUPPRIMER des données
  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await instance.delete<any, T>(url);
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel API (${url}):`, error);
      throw error;
    }
  }
}; 