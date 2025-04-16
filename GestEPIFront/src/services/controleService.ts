// ************************************************************************
// 🎓 SERVICE CONTROLE - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// api : instance axios configurée pour notre backend
// Pour l'E6 : Équivalent des requêtes AJAX en JS vanilla ou fetch
import { api } from './api';

// Type Controle : définit la structure d'un contrôle
// Pour l'E6 : Comme une classe PHP qui définirait les propriétés obligatoires
import { Controle } from '../types';

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : Définit le format de réponse de l'API
// Équivalent en PHP : class ApiResponse { public string $message; public $data; }
// Le T est un "générique" - il s'adapte au type de données retourné
interface ApiResponse<T> {
  message: string;  // Message de l'API (succès/erreur)
  data: T;         // Données retournées (type variable)
}

// ********** SERVICE CONTROLE **********
// Pour l'E6 : Objet qui regroupe toutes les fonctions liées aux contrôles
// En PHP : ce serait une classe de service avec des méthodes statiques
export const controleService = {
  // Fonction qui récupère tous les contrôles
  // Pour l'E6 : Équivalent SQL = SELECT * FROM controles
  // async/await : gestion asynchrone comme les Promises en JS
  getAll: async (): Promise<Controle[]> => {
    try {
      // Appel API GET vers /controles
      // Pour l'E6 : Comme un fetch() en JS ou file_get_contents() en PHP
      const response = await api.get<ApiResponse<Controle[]>>('/controles');
      // Retourne les données ou tableau vide si null
      return response.data.data || [];
    } catch (error) {
      // Gestion des erreurs (comme try/catch en PHP)
      console.error('Erreur lors de la récupération des contrôles:', error);
      throw error;
    }
  },

  // Fonction qui récupère les contrôles d'un EPI spécifique
  // Pour l'E6 : Équivalent SQL = SELECT * FROM controles WHERE epi_id = ?
  // epiId : identifiant de l'EPI dont on veut l'historique
  getByEpiId: async (epiId: number): Promise<Controle[]> => {
    try {
      // Appel API avec l'ID dans l'URL
      // Pour l'E6 : L'URL est construite dynamiquement avec l'ID
      const response = await api.get<ApiResponse<Controle[]>>(`/epi/${epiId}`);
      return response.data.data || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI ${epiId}:`, error);
      throw error;
    }
  },

  // Fonction qui récupère un contrôle par son ID
  // Pour l'E6 : Équivalent SQL = SELECT * FROM controles WHERE id = ? LIMIT 1
  // id : identifiant unique du contrôle recherché
  getById: async (id: number): Promise<Controle> => {
    try {
      // Appel API avec l'ID du contrôle
      const response = await api.get<ApiResponse<Controle>>(`/controles/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${id}:`, error);
      throw error;
    }
  },

  // Fonction qui crée un nouveau contrôle
  // Pour l'E6 : Équivalent SQL = INSERT INTO controles (champs...) VALUES (...)
  // controle : objet contenant toutes les données du nouveau contrôle
  create: async (controle: Controle): Promise<Controle> => {
    try {
      // Appel API POST avec les données du contrôle
      const response = await api.post<ApiResponse<Controle>>('/controles', controle);
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      throw error;
    }
  }
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Gère toutes les interactions avec l'API concernant les contrôles
// 2. Utilise TypeScript pour la sécurité du typage
// 3. Implémente les opérations CRUD (Create, Read)
// 4. Gère les erreurs de manière centralisée
// 5. Suit le pattern Service pour une meilleure organisation du code