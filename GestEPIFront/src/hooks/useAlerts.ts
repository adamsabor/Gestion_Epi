// ************************************************************************
// 🎓 HOOK REACT PERSONALISE USEALERTS - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Hooks React pour gérer l'état et les effets de bord
// useState : stocke des données qui peuvent changer (comme en PHP avec $_SESSION)
// useEffect : exécute du code à des moments précis (comme window.onload en JS)
import { useState, useEffect } from 'react';

// Service qui gère les appels API vers le backend
// Pour l'E6 : Équivalent des requêtes AJAX en JS vanilla
import { alerteService } from '../services/alerteService';

// Type TypeScript qui définit la structure d'une alerte
// Pour l'E6 : Comme une classe PHP qui définirait les propriétés obligatoires
import type { Alerte } from '../types';

// ********** HOOK PERSONNALISÉ **********
// Pour l'E6 : Un hook est une fonction qui utilise d'autres hooks React
// C'est comme une classe utilitaire en PHP qui regroupe des fonctionnalités
export const useAlerts = () => {
  // ********** ÉTATS (VARIABLES RÉACTIVES) **********
  // Pour l'E6 : Équivalent des variables de session en PHP
  // pendingControls stocke la liste des contrôles à faire
  const [pendingControls, setPendingControls] = useState<Alerte[]>([]);
  // loading indique si on est en train de charger les données
  const [loading, setLoading] = useState(true);

  // ********** FONCTION DE RÉCUPÉRATION DES DONNÉES **********
  // Pour l'E6 : Fonction asynchrone qui appelle l'API
  // En SQL : SELECT * FROM controles WHERE statut IN ('En retard', 'À venir')
  const fetchPendingControls = async () => {
    try {
      // Active l'indicateur de chargement
      setLoading(true);
      
      // Appel API pour récupérer toutes les alertes
      // Pour l'E6 : Équivalent d'une requête AJAX vers le backend PHP
      const alertes = await alerteService.getAll();
      
      // Filtre les alertes pour ne garder que celles à traiter
      // Pour l'E6 : Comme un WHERE en SQL mais côté frontend
      const pending = alertes.filter(a => 
        a.statut === 'En retard' || a.statut === 'À venir'
      );
      
      // Met à jour l'état avec les alertes filtrées
      setPendingControls(pending);
      
    } catch (error) {
      // Gestion des erreurs (comme try/catch en PHP)
      console.error('Erreur lors de la récupération des contrôles:', error);
    } finally {
      // Désactive l'indicateur de chargement
      setLoading(false);
    }
  };

  // ********** EFFET DE BORD **********
  // Pour l'E6 : useEffect s'exécute après le rendu du composant
  // C'est comme document.ready en jQuery
  useEffect(() => {
    // Charge les données au démarrage
    fetchPendingControls();
    
    // Configure une vérification automatique toutes les heures
    // Pour l'E6 : Comme une tâche CRON en PHP
    const interval = setInterval(fetchPendingControls, 1000 * 60 * 60);
    
    // Nettoyage quand le composant est détruit
    // Pour l'E6 : Évite les fuites mémoire
    return () => clearInterval(interval);
  }, []); // [] = exécuter uniquement au montage

  // Retourne les données et l'état de chargement
  return { pendingControls, loading };
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Crée un hook personnalisé pour gérer les alertes de contrôles
// 2. Utilise les hooks React (useState, useEffect) de manière avancée
// 3. Communique avec une API backend (comme en AJAX)
// 4. Gère les états de chargement et les erreurs
// 5. Met en place une actualisation automatique des données
