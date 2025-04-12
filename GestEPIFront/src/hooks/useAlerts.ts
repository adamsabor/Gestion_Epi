import { useState, useEffect } from 'react';
import { alerteService } from '../services/alerteService';
import type { Alerte } from '../types'; // ✅ import centralisé

export const useAlerts = () => {
  const [pendingControls, setPendingControls] = useState<Alerte[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingControls = async () => {
    try {
      setLoading(true);
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
    const interval = setInterval(fetchPendingControls, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return { pendingControls, loading };
};
