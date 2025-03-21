import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress, Alert, Card, CardContent, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { alerteService } from '../../services/alerteService';
import { epiService } from '../../services/epiService';
import { controleService } from '../../services/controleService';
import AlertesList from '../alerte/AlertesList';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalEpis: 0,
    totalControles: 0,
    alertesEnRetard: 0,
    alertesAVenir: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer le nombre total d'EPIs
        const epis = await epiService.getAll();
        
        // Récupérer le nombre total de contrôles
        const controles = await controleService.getAll();
        
        // Récupérer les alertes
        const alertes = await alerteService.getAll();
        const enRetard = alertes.filter(a => a.statut === 'En retard').length;
        const aVenir = alertes.filter(a => a.statut === 'À venir').length;
        
        setStats({
          totalEpis: epis.length,
          totalControles: controles.length,
          alertesEnRetard: enRetard,
          alertesAVenir: aVenir
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
        setError('Impossible de charger les données du tableau de bord. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Tableau de bord
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total des EPIs
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalEpis}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total des contrôles
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalControles}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: stats.alertesEnRetard > 0 ? 'error.light' : 'inherit' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Contrôles en retard
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h4" component="div" sx={{ mr: 1 }}>
                  {stats.alertesEnRetard}
                </Typography>
                {stats.alertesEnRetard > 0 ? (
                  <ErrorIcon color="error" />
                ) : (
                  <CheckCircleIcon color="success" />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: stats.alertesAVenir > 0 ? 'warning.light' : 'inherit' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Contrôles à venir
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h4" component="div" sx={{ mr: 1 }}>
                  {stats.alertesAVenir}
                </Typography>
                {stats.alertesAVenir > 0 ? (
                  <WarningIcon color="warning" />
                ) : (
                  <CheckCircleIcon color="success" />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Divider sx={{ mb: 4 }} />
      
      <AlertesList />
    </Box>
  );
};

export default Dashboard; 