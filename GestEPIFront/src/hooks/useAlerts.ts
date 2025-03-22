import { useState, useEffect } from 'react';
import { alerteService } from '../services/alerteService';

interface Alerte {
  id?: number;
  identifiant_custom: string;
  marque: string;
  modèle: string;
  dernier_controle: string;
  prochain_controle: string;
  statut: 'À jour' | 'À venir' | 'En retard';
  urgence: 'normale' | 'moyenne' | 'haute';
}

export const useAlerts = () => {
  const [pendingControls, setPendingControls] = useState<Alerte[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingControls = async () => {
    try {
      setLoading(true);
      // Récupérer les alertes en retard et à venir
      const alertes = await alerteService.getAll();
      const pending = alertes.filter(a => a.statut === 'En retard' || a.statut === 'À venir');
      setPendingControls(pending);
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles en attente:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingControls();
    const interval = setInterval(fetchPendingControls, 1000 * 60 * 60); // Vérification toutes les heures

    return () => clearInterval(interval);
  }, []);

  return { pendingControls, loading };
}; 