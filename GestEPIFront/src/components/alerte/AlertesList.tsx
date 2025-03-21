import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Alert, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';
import { alerteService } from '../../services/alerteService';

// Interface pour les alertes
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

const AlertesList: React.FC = () => {
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchAlertes();
  }, [tabValue]);

  const fetchAlertes = async () => {
    setLoading(true);
    try {
      let data: Alerte[];
      
      switch (tabValue) {
        case 0: // Toutes les alertes
          data = await alerteService.getAll();
          break;
        case 1: // À venir
          data = await alerteService.getByStatut('À venir');
          break;
        case 2: // En retard
          data = await alerteService.getByStatut('En retard');
          break;
        default:
          data = await alerteService.getAll();
      }
      
      setAlertes(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      setError('Impossible de charger les alertes. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getUrgenceColor = (urgence: string) => {
    switch (urgence) {
      case 'normale':
        return 'success';
      case 'moyenne':
        return 'warning';
      case 'haute':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Alertes de contrôle
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="alertes tabs">
          <Tab label="Toutes les alertes" />
          <Tab label="À venir" />
          <Tab label="En retard" />
        </Tabs>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : alertes.length === 0 ? (
        <Alert severity="info">
          Aucune alerte à afficher dans cette catégorie.
        </Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Identifiant</TableCell>
                <TableCell>Marque / Modèle</TableCell>
                <TableCell>Dernier contrôle</TableCell>
                <TableCell>Prochain contrôle</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Urgence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alertes.map((alerte) => (
                <TableRow key={alerte.id}>
                  <TableCell>{alerte.identifiant_custom}</TableCell>
                  <TableCell>{alerte.marque} {alerte.modèle}</TableCell>
                  <TableCell>{new Date(alerte.dernier_controle).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(alerte.prochain_controle).toLocaleDateString()}</TableCell>
                  <TableCell>{alerte.statut}</TableCell>
                  <TableCell>
                    <Chip 
                      label={alerte.urgence} 
                      color={getUrgenceColor(alerte.urgence) as any}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default AlertesList; 