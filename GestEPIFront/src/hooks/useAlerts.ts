import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { EPI } from '../types';

export const useAlerts = () => {
  const [pendingControls, setPendingControls] = useState<EPI[]>([]);

  useEffect(() => {
    const fetchPendingControls = async () => {
      try {
        const data = await api.get<EPI[]>('/api/epis/pending-controls');
        setPendingControls(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des contrôles en attente:', error);
      }
    };

    fetchPendingControls();
    const interval = setInterval(fetchPendingControls, 1000 * 60 * 60); // Vérification toutes les heures

    return () => clearInterval(interval);
  }, []);

  return { pendingControls };
}; 