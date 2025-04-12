// ********** IMPORTS **********
// Import des hooks React nécessaires :
// - useState : pour gérer l'état local du composant
// - useEffect : pour exécuter du code quand le composant est monté/mis à jour
import { useState, useEffect } from 'react';
// Import du service qui gère les appels API pour les alertes
// Ce service fait le lien entre le front et le back-end
import { alerteService } from '../services/alerteService';

// ********** INTERFACE **********
// Définition du type TypeScript pour une alerte
// Cette interface décrit la structure exacte d'une alerte dans l'application
interface Alerte {
  id?: number;                    // ID optionnel de l'alerte
  identifiant_custom: string;     // Identifiant personnalisé de l'EPI
  marque: string;                 // Marque de l'EPI
  modèle: string;                 // Modèle de l'EPI
  dernier_controle: string;       // Date du dernier contrôle effectué
  prochain_controle: string;      // Date du prochain contrôle prévu
  statut: 'À jour' | 'À venir' | 'En retard';  // État actuel du contrôle (3 valeurs possibles)
  urgence: 'normale' | 'moyenne' | 'haute';     // Niveau d'urgence du contrôle
}

// ********** HOOK PERSONNALISÉ useAlerts **********
// Ce hook permet de :
// 1. Récupérer les alertes de contrôle en attente
// 2. Gérer le chargement des données
// 3. Actualiser automatiquement les données toutes les heures
export const useAlerts = () => {
  // État pour stocker les contrôles en attente
  const [pendingControls, setPendingControls] = useState<Alerte[]>([]);
  // État pour gérer l'affichage d'un loader pendant le chargement
  const [loading, setLoading] = useState(true);

  // Fonction qui récupère les alertes depuis l'API
  // Cette fonction est asynchrone car elle fait des appels réseau
  const fetchPendingControls = async () => {
    try {
      setLoading(true); // Active l'indicateur de chargement
      // Appel au service pour récupérer toutes les alertes
      const alertes = await alerteService.getAll();
      // Filtre pour ne garder que les alertes "En retard" ou "À venir"
      const pending = alertes.filter(a => a.statut === 'En retard' || a.statut === 'À venir');
      // Met à jour l'état avec les alertes filtrées
      setPendingControls(pending);
    } catch (error) {
      // En cas d'erreur, affiche dans la console pour le débogage
      console.error('Erreur lors de la récupération des contrôles en attente:', error);
    } finally {
      // Dans tous les cas, désactive l'indicateur de chargement
      setLoading(false);
    }
  };

  // Effect qui s'exécute au montage du composant
  // Il configure la récupération automatique des alertes
  useEffect(() => {
    fetchPendingControls(); // Premier appel immédiat
    // Configure une vérification automatique toutes les heures
    const interval = setInterval(fetchPendingControls, 1000 * 60 * 60);

    // Fonction de nettoyage : arrête la vérification automatique
    // quand le composant est démonté
    return () => clearInterval(interval);
  }, []); // Le tableau vide signifie "exécuter uniquement au montage"

  // Retourne les données et l'état de chargement
  // Ces valeurs seront utilisées par les composants qui utilisent ce hook
  return { pendingControls, loading };
}; 