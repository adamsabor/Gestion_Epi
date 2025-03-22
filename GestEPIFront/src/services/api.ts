import axios, { AxiosResponse } from 'axios';

// Créer une instance axios avec la configuration de base
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour les requêtes
instance.interceptors.request.use(
  (config) => {
    console.log(`Tentative de connexion à ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error(`Erreur lors de l'appel API (${error.config.url}): ${error.response.status} - ${error.response.data.message || error.message}`);
    } else if (error.request) {
      console.error(`Erreur lors de l'appel API (${error.config?.url}): Pas de réponse du serveur`);
    } else {
      console.error(`Erreur lors de l'appel API: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: async <T>(url: string): Promise<T> => {
    try {
      const response = await instance.get<any, T>(url);
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel API (${url}):`, error);
      throw error;
    }
  },
  
  post: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await instance.post<any, T>(url, data);
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel API (${url}):`, error);
      throw error;
    }
  },
  
  put: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await instance.put<any, T>(url, data);
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel API (${url}):`, error);
      throw error;
    }
  },
  
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