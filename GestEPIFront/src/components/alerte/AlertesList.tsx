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
  Chip,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { alerteService } from '../../services/alerteService';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { format } from 'date-fns';

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
  const navigate = useNavigate();
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  const [filteredAlertes, setFilteredAlertes] = useState<Alerte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    enRetard: 0,
    aVenir: 0
  });

  useEffect(() => {
    const fetchAlertes = async () => {
      try {
        setLoading(true);
        const data = await alerteService.getAll();
        setAlertes(data);
        
        // Calculer les statistiques
        const enRetard = data.filter(a => a.statut === 'En retard').length;
        const aVenir = data.filter(a => a.statut === 'À venir').length;
        
        setStats({
          total: data.length,
          enRetard,
          aVenir
        });
        
        // Filtrer selon l'onglet actif
        filterAlertesByTab(tabValue, data);
      } catch (error) {
        console.error('Erreur lors de la récupération des alertes:', error);
        setError('Erreur lors du chargement des alertes. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlertes();
  }, []);

  const filterAlertesByTab = (tabIndex: number, data: Alerte[] = alertes) => {
    switch (tabIndex) {
      case 0: // Toutes
        setFilteredAlertes(data);
        break;
      case 1: // En retard
        setFilteredAlertes(data.filter(a => a.statut === 'En retard'));
        break;
      case 2: // À venir
        setFilteredAlertes(data.filter(a => a.statut === 'À venir'));
        break;
      case 3: // À jour
        setFilteredAlertes(data.filter(a => a.statut === 'À jour'));
        break;
      default:
        setFilteredAlertes(data);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    filterAlertesByTab(newValue);
  };

  const handleViewEPI = (id?: number) => {
    if (id) {
      navigate(`/epis/${id}`);
    }
  };

  const handleAddControle = (id?: number) => {
    if (id) {
      navigate(`/controles/new?epiId=${id}`);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Alertes de contrôle
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <span>Toutes ({stats.total})</span>
              </Box>
            } 
          />
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <ErrorIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
                En retard ({stats.enRetard})
              </Box>
            } 
          />
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <WarningIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                À venir ({stats.aVenir})
              </Box>
            } 
          />
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <CheckCircleIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                À jour ({stats.total - stats.enRetard - stats.aVenir})
              </Box>
            } 
          />
        </Tabs>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : filteredAlertes.length === 0 ? (
          <Typography color="textSecondary" sx={{ p: 2 }}>
            Aucune alerte à afficher dans cette catégorie.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Identifiant</TableCell>
                  <TableCell>EPI</TableCell>
                  <TableCell>Dernier contrôle</TableCell>
                  <TableCell>Prochain contrôle</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAlertes.map((alerte) => (
                  <TableRow key={alerte.id}>
                    <TableCell>{alerte.identifiant_custom}</TableCell>
                    <TableCell>{alerte.marque} {alerte.modèle}</TableCell>
                    <TableCell>{format(new Date(alerte.dernier_controle), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{format(new Date(alerte.prochain_controle), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <Chip 
                        label={alerte.statut} 
                        color={
                          alerte.statut === 'En retard' 
                            ? 'error' 
                            : alerte.statut === 'À venir' 
                              ? 'warning' 
                              : 'success'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Button 
                          size="small" 
                          onClick={() => handleViewEPI(alerte.id)}
                          sx={{ mr: 1 }}
                        >
                          Voir
                        </Button>
                        <Button 
                          size="small" 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleAddControle(alerte.id)}
                        >
                          Contrôler
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default AlertesList; 