// ************************************************************************
// 🎓 SERVICE API - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// axios : bibliothèque pour faire des requêtes HTTP
// Pour l'E6 : Équivalent de file_get_contents() ou cURL en PHP
// AxiosInstance : type qui définit la configuration d'axios
// AxiosResponse : type qui définit le format des réponses
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// ********** CONFIGURATION AXIOS **********
// Pour l'E6 : On configure une instance axios réutilisable
// Comme une connexion PDO en PHP avec des paramètres par défaut
const instance = axios.create({
  // URL de base de l'API (comme define('API_URL', '...') en PHP)
  baseURL: 'http://localhost:3001/api',
  // En-têtes par défaut (comme header() en PHP)
  headers: { 'Content-Type': 'application/json' },
});

// ********** INTERCEPTEUR DE REQUÊTES **********
// Pour l'E6 : Intercepte chaque requête avant envoi
// Comme un middleware en PHP qui s'exécute avant chaque route
instance.interceptors.request.use(
  (config) => {
    // Log de debug (comme error_log() en PHP)
    console.log(`📡 Requête envoyée vers ${config.baseURL}${config.url}`);
    return config;
  },
  // Gestion des erreurs (comme try/catch en PHP)
  (error) => Promise.reject(error)
);

// ********** INTERCEPTEUR DE RÉPONSES **********
// Pour l'E6 : Intercepte chaque réponse de l'API
// Comme un middleware qui traite la réponse avant de la renvoyer
instance.interceptors.response.use(
  // Si succès, renvoie la réponse telle quelle
  (response) => response,
  // Si erreur, log détaillé pour debug
  (error) => {
    if (error.response) {
      // Erreur avec réponse (ex: 404, 500...)
      // Pour l'E6 : Comme une erreur SQL avec un message
      console.error(
        `❌ Erreur API (${error.config.url}) : ${error.response.status} - ${error.response.data?.message || error.message}`
      );
    } 
    else if (error.request) {
      // Pas de réponse (serveur injoignable)
      // Pour l'E6 : Comme une erreur de connexion à la BDD
      console.error(`❌ Aucune réponse de l'API pour : ${error.config?.url}`);
    } 
    else {
      // Autre erreur
      console.error(`❌ Erreur lors de la requête API : ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// ********** MÉTHODES API **********
// Pour l'E6 : Objet qui regroupe toutes les méthodes HTTP
// Comme une classe de service en PHP avec des méthodes CRUD
export const api = {
  // GET : Récupérer des données
  // Pour l'E6 : Équivalent SQL = SELECT
  get: async <T>(url: string): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url);
  },
  
  // POST : Créer des données
  // Pour l'E6 : Équivalent SQL = INSERT
  post: async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return instance.post<T>(url, data);
  },
  
  // PUT : Modifier des données
  // Pour l'E6 : Équivalent SQL = UPDATE
  put: async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return instance.put<T>(url, data);
  },
  
  // DELETE : Supprimer des données
  // Pour l'E6 : Équivalent SQL = DELETE
  delete: async <T>(url: string): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url);
  },
};

// Export de l'instance pour usage direct si nécessaire
export default instance;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Configure la communication avec l'API backend
// 2. Gère les erreurs de manière centralisée
// 3. Fournit des méthodes CRUD réutilisables
// 4. Utilise TypeScript pour la sécurité du typage
// 5. Log les requêtes pour faciliter le debug
