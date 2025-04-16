// ************************************************************************
// 🎓 SERVICE ALERTE - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// api : instance axios configurée pour notre backend
// Pour l'E6 : Équivalent des requêtes AJAX en JS vanilla ou fetch
import { api } from './api';

// Type Alerte : définit la structure d'une alerte
// Pour l'E6 : Comme une classe PHP qui définirait les propriétés obligatoires
import { Alerte } from '../types';

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : Définit le format de réponse de l'API
// Équivalent en PHP : class ApiResponse { public string $message; public $data; }
// Le T est un "générique" - il s'adapte au type de données retourné
interface ApiResponse<T> {
  message: string;  // Message de l'API (succès/erreur)
  data: T;         // Données retournées (type variable)
}

// ********** SERVICE ALERTE **********
// Pour l'E6 : Objet qui regroupe toutes les fonctions liées aux alertes
// En PHP : ce serait une classe de service avec des méthodes statiques
export const alerteService = {
  // Fonction qui récupère toutes les alertes
  // Pour l'E6 : Équivalent en SQL = SELECT * FROM alertes
  // async/await : gestion asynchrone comme les Promises en JS
  getAll: async (): Promise<Alerte[]> => {
    try {
      // Appel API GET vers /alertes
      // Pour l'E6 : Comme un fetch() en JS ou file_get_contents() en PHP
      const response = await api.get<ApiResponse<Alerte[]>>('/alertes');
      
      // Retourne uniquement le tableau d'alertes
      // Pour l'E6 : Équivalent d'un return json_decode($response)->data;
      return response.data.data;
    } catch (error) {
      // Gestion des erreurs (comme try/catch en PHP)
      console.error('Erreur lors de la récupération des alertes:', error);
      throw error;
    }
  },

  // Fonction qui filtre les alertes par statut
  // Pour l'E6 : Équivalent SQL = SELECT * FROM alertes WHERE statut = ?
  // statut : paramètre qui définit le filtre ("En retard", "À venir"...)
  getByStatut: async (statut: string): Promise<Alerte[]> => {
    try {
      // Appel API avec le statut dans l'URL
      // Pour l'E6 : L'URL est construite dynamiquement avec le statut
      const response = await api.get<ApiResponse<Alerte[]>>(`/alertes/statut/${statut}`);
      
      // Retourne les alertes filtrées
      return response.data.data;
    } catch (error) {
      // Log détaillé avec le statut problématique
      console.error(`Erreur lors de la récupération des alertes avec le statut ${statut}:`, error);
      throw error;
    }
  },
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Gère toutes les interactions avec l'API concernant les alertes
// 2. Utilise TypeScript pour la sécurité du typage
// 3. Implémente la gestion d'erreurs
// 4. Permet de filtrer les alertes par statut
// 5. Suit le pattern Service pour une meilleure organisation du code