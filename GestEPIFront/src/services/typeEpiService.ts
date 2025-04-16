// ************************************************************************
// 🎓 SERVICE TYPE EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// api : instance axios configurée pour notre backend
// Pour l'E6 : Équivalent des requêtes AJAX en JS vanilla ou fetch
import { api } from './api';

// Type TypeEPI : définit la structure d'un type d'équipement
// Pour l'E6 : Comme une classe PHP qui définirait les propriétés obligatoires
import { TypeEPI } from '../types';

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : Définit le format de réponse de l'API
// Équivalent en PHP : class ApiResponse { public string $message; public $data; }
// Le T est un "générique" - il s'adapte au type de données retourné
interface ApiResponse<T> {
  message: string;  // Message de l'API (succès/erreur)
  data: T;         // Données retournées (type variable)
}

// ********** SERVICE TYPE EPI **********
// Pour l'E6 : Objet qui regroupe toutes les fonctions liées aux types d'EPI
// En PHP : ce serait une classe de service avec des méthodes statiques
export const typeEpiService = {
  // Fonction qui récupère tous les types d'EPI
  // Pour l'E6 : Équivalent SQL = SELECT * FROM type_epis
  // async/await : gestion asynchrone comme les Promises en JS
  getAll: async (): Promise<TypeEPI[]> => {
    try {
      // Appel API GET vers /epi-types
      // Pour l'E6 : Comme un fetch() en JS ou file_get_contents() en PHP
      const response = await api.get<ApiResponse<TypeEPI[]>>('/epi-types');
      // Retourne les données ou tableau vide si null
      return response.data.data || [];
    } catch (error) {
      // Gestion des erreurs (comme try/catch en PHP)
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      return [];
    }
  },

  // Fonction qui récupère un type d'EPI par son ID
  // Pour l'E6 : Équivalent SQL = SELECT * FROM type_epis WHERE id = ? LIMIT 1
  // id : identifiant unique du type d'EPI recherché
  getById: async (id: number): Promise<TypeEPI | null> => {
    try {
      // Appel API avec l'ID dans l'URL
      // Pour l'E6 : L'URL est construite dynamiquement avec l'ID
      const response = await api.get<ApiResponse<TypeEPI>>(`/epi-types/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du type d'EPI avec l'ID ${id}:`, error);
      return null;
    }
  }
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Gère toutes les interactions avec l'API concernant les types d'EPI
// 2. Utilise TypeScript pour la sécurité du typage
// 3. Implémente la gestion d'erreurs
// 4. Permet de récupérer la liste des types ou un type spécifique
// 5. Suit le pattern Service pour une meilleure organisation du code