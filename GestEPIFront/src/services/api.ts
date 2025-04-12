// src/services/api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Création de l'instance axios avec baseURL propre (sans double /api)
const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Log toutes les requêtes sortantes
instance.interceptors.request.use(
  (config) => {
    console.log(`Tentative de connexion à ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Gestion propre des erreurs
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `Erreur API (${error.config.url}): ${error.response.status} - ${error.response.data?.message || error.message}`
      );
    } else if (error.request) {
      console.error(`Aucune réponse reçue de l’API (${error.config?.url})`);
    } else {
      console.error(`Erreur API: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// Exports des méthodes
export const api = {
  get: async <T>(url: string): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url);
  },
  post: async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return instance.post<T>(url, data);
  },
  put: async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return instance.put<T>(url, data);
  },
  delete: async <T>(url: string): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url);
  },
};

// On exporte l'instance axios configurée pour être utilisée dans d'autres fichiers
export default instance;
