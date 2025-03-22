import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent, 
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { Link } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import { alerteService } from '../../services/alerteService';
import { epiService } from '../../services/epiService';
import { controleService } from '../../services/controleService';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalEpis: 0,
    totalControles: 0,
    alertesEnRetard: 0,
    alertesAVenir: 0
  });
  const [recentControles, setRecentControles] = useState<any[]>([]);
  const [urgentAlertes, setUrgentAlertes] = useState<any[]>([]);

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
        
        // Récupérer les contrôles récents (5 derniers)
        const recentControlesData = controles
          .sort((a, b) => new Date(b.date_controle).getTime() - new Date(a.date_controle).getTime())
          .slice(0, 5);
        
        // Récupérer les alertes urgentes (en retard ou à venir prochainement)
        const urgentAlertesData = alertes
          .filter(a => a.statut === 'En retard' || a.statut === 'À venir')
          .sort((a, b) => {
            if (a.statut === 'En retard' && b.statut !== 'En retard') return -1;
            if (a.statut !== 'En retard' && b.statut === 'En retard') return 1;
            return new Date(a.prochain_controle).getTime() - new Date(b.prochain_controle).getTime();
          })
          .slice(0, 5);
        
        setStats({
          totalEpis: epis.length,
          totalControles: controles.length,
          alertesEnRetard: enRetard,
          alertesAVenir: aVenir
        });
        
        setRecentControles(recentControlesData);
        setUrgentAlertes(urgentAlertesData);
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <InventoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">EPIs</Typography>
              </Box>
              <Typography variant="h3">{stats.totalEpis}</Typography>
              <Button 
                component={Link} 
                to="/epis" 
                size="small" 
                sx={{ mt: 2 }}
              >
                Voir tous les EPIs
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Contrôles</Typography>
              </Box>
              <Typography variant="h3">{stats.totalControles}</Typography>
              <Button 
                component={Link} 
                to="/controles/new" 
                size="small" 
                sx={{ mt: 2 }}
              >
                Nouveau contrôle
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: stats.alertesEnRetard > 0 ? 'error.light' : 'inherit' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <ErrorIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">En retard</Typography>
              </Box>
              <Typography variant="h3">{stats.alertesEnRetard}</Typography>
              <Button 
                component={Link} 
                to="/alertes" 
                size="small" 
                sx={{ mt: 2 }}
                color="error"
                variant={stats.alertesEnRetard > 0 ? "contained" : "outlined"}
              >
                Voir les alertes
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: stats.alertesAVenir > 0 ? 'warning.light' : 'inherit' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <WarningIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">À venir</Typography>
              </Box>
              <Typography variant="h3">{stats.alertesAVenir}</Typography>
              <Button 
                component={Link} 
                to="/alertes" 
                size="small" 
                sx={{ mt: 2 }}
                color="warning"
                variant={stats.alertesAVenir > 0 ? "contained" : "outlined"}
              >
                Voir les alertes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Contrôles récents
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {recentControles.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography color="textSecondary">
                  Aucun contrôle récent
                </Typography>
                <Button 
                  component={Link} 
                  to="/controles/new" 
                  startIcon={<AddIcon />}
                  variant="contained" 
                  sx={{ mt: 2 }}
                >
                  Ajouter un contrôle
                </Button>
              </Box>
            ) : (
              <List>
                {recentControles.map((controle) => (
                  <ListItem key={controle.id} divider>
                    <ListItemIcon>
                      {controle.statut_nom === 'Opérationnel' ? (
                        <CheckCircleIcon color="success" />
                      ) : controle.statut_nom === 'À réparer' ? (
                        <WarningIcon color="warning" />
                      ) : (
                        <ErrorIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${controle.epi_identifiant} - ${format(new Date(controle.date_controle), 'dd/MM/yyyy')}`}
                      secondary={`Statut: ${controle.statut_nom} | Gestionnaire: ${controle.gestionnaire_nom}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Alertes urgentes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {urgentAlertes.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography color="textSecondary">
                  Aucune alerte urgente
                </Typography>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mt: 2 }} />
              </Box>
            ) : (
              <List>
                {urgentAlertes.map((alerte) => (
                  <ListItem key={alerte.id} divider>
                    <ListItemIcon>
                      {alerte.statut === 'En retard' ? (
                        <ErrorIcon color="error" />
                      ) : (
                        <WarningIcon color="warning" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${alerte.identifiant_custom} - ${alerte.marque} ${alerte.modèle}`}
                      secondary={`Prochain contrôle: ${format(new Date(alerte.prochain_controle), 'dd/MM/yyyy')} | Statut: ${alerte.statut}`}
                    />
                    <Button 
                      component={Link} 
                      to={`/controles/new?epiId=${alerte.id}`}
                      variant="contained"
                      size="small"
                    >
                      Contrôler
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 