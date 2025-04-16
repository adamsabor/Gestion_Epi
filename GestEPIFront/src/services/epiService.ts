// ************************************************************************
// 🎓 SERVICE EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// api : instance axios configurée pour notre backend
// Pour l'E6 : Équivalent des requêtes AJAX en JS vanilla ou fetch
import { api } from './api';

// Type EPI : définit la structure d'un équipement
// Pour l'E6 : Comme une classe PHP qui définirait les propriétés obligatoires
import { EPI } from '../types';

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : Définit le format de réponse de l'API
// Équivalent en PHP : class ApiResponse { public string $message; public $data; }
// Le T est un "générique" - il s'adapte au type de données retourné
interface ApiResponse<T> {
  message: string;  // Message de l'API (succès/erreur)
  data: T;         // Données retournées (type variable)
}

// ********** SERVICE EPI **********
// Pour l'E6 : Objet qui regroupe toutes les fonctions liées aux EPI
// En PHP : ce serait une classe de service avec des méthodes statiques
export const epiService = {
  // Fonction qui récupère tous les EPI
  // Pour l'E6 : Équivalent SQL = SELECT * FROM epis
  // async/await : gestion asynchrone comme les Promises en JS
  getAll: async (): Promise<EPI[]> => {
    const response = await api.get<ApiResponse<EPI[]>>('/epis');
    return response.data.data;
  },

  // Fonction qui récupère un EPI par son ID
  // Pour l'E6 : Équivalent SQL = SELECT * FROM epis WHERE id = ? LIMIT 1
  // id : identifiant unique de l'EPI recherché
  getById: async (id: number): Promise<EPI> => {
    const response = await api.get<ApiResponse<EPI>>(`/epis/${id}`);
    return response.data.data;
  },

  // Fonction qui crée un nouvel EPI
  // Pour l'E6 : Équivalent SQL = INSERT INTO epis (champs...) VALUES (...)
  // epi : objet contenant toutes les données du nouvel équipement
  create: async (epi: EPI): Promise<EPI> => {
    const response = await api.post<ApiResponse<EPI>>('/epis', epi);
    return response.data.data;
  },

  // Fonction qui modifie un EPI existant
  // Pour l'E6 : Équivalent SQL = UPDATE epis SET champ1=val1, ... WHERE id = ?
  // Partial<EPI> : permet de ne mettre à jour que certains champs
  update: async (id: number, epi: Partial<EPI>): Promise<EPI> => {
    const response = await api.put<ApiResponse<EPI>>(`/epis/${id}`, epi);
    return response.data.data;
  },

  // Fonction qui supprime un EPI
  // Pour l'E6 : Équivalent SQL = DELETE FROM epis WHERE id = ?
  // void : la fonction ne retourne rien
  delete: async (id: number): Promise<void> => {
    await api.delete(`/epis/${id}`);
  }
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Gère toutes les interactions avec l'API concernant les EPI
// 2. Implémente les opérations CRUD (Create, Read, Update, Delete)
// 3. Utilise TypeScript pour la sécurité du typage
// 4. Suit le pattern Service pour une meilleure organisation du code
// 5. Gère les appels asynchrones avec async/await
