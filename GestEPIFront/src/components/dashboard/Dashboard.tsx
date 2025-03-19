import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress } from '@mui/material';
import { api } from '../../services/api';
import { EPI } from '../../types';

// Définir un type pour la réponse de l'API
interface ApiResponse<T> {
  message: string;
  data: T;
}

const Dashboard = () => {
  const [epis, setEpis] = useState<EPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ApiResponse<EPI[]>>('/api/epis');
        console.log("Réponse API:", response);
        
        if (response && response.data) {
          setEpis(response.data);
        } else {
          console.warn("Format de réponse inattendu:", response);
          setEpis([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calcul des statistiques
  const totalEPIs = epis.length;
  
  const episAControler = epis.filter(epi => {
    if (!epi.date_mise_en_service || !epi.périodicité_controle) return false;
    
    const miseEnService = new Date(epi.date_mise_en_service);
    const prochainControle = new Date(miseEnService);
    prochainControle.setMonth(prochainControle.getMonth() + epi.périodicité_controle);
    
    return prochainControle <= new Date();
  }).length;

  if (loading) return <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>;
  
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Tableau de bord
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total des EPIs</Typography>
            <Typography variant="h3">{totalEPIs}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">EPIs à contrôler</Typography>
            <Typography variant="h3">{episAControler}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 