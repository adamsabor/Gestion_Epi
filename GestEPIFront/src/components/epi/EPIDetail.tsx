import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Grid, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { epiService } from '../../services/epiService';
import { controleService } from '../../services/controleService';
import { EPI, Controle } from '../../types';
import { format } from 'date-fns';

const EPIDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [epi, setEpi] = useState<EPI | null>(null);
  const [controles, setControles] = useState<Controle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour déterminer la couleur du statut
  const getStatutColor = (statut: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (statut) {
      case 'Opérationnel':
        return 'success';
      case 'À réparer':
        return 'warning';
      case 'Mis au rebut':
        return 'error';
      default:
        return 'default';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const epiId = parseInt(id);
        
        // Récupérer les détails de l'EPI
        const epiData = await epiService.getById(epiId);
        setEpi(epiData);
        
        // Récupérer l'historique des contrôles
        const controlesData = await controleService.getByEpiId(epiId);
        setControles(controlesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/epis')}
          sx={{ mt: 2 }}
        >
          Retour à la liste
        </Button>
      </Box>
    );
  }

  if (!epi) {
    return (
      <Box p={3}>
        <Typography>EPI non trouvé.</Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/epis')}
          sx={{ mt: 2 }}
        >
          Retour à la liste
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/epis')}
        >
          Retour à la liste
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<EditIcon />}
          onClick={() => navigate(`/epis/edit/${epi.id}`)}
        >
          Modifier
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {epi.identifiant_custom} - {epi.marque} {epi.modèle}
        </Typography>
        
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Informations générales</Typography>
            <Box mt={1}>
              <Typography><strong>Numéro de série:</strong> {epi.numéro_série}</Typography>
              {epi.taille && <Typography><strong>Taille:</strong> {epi.taille}</Typography>}
              {epi.couleur && <Typography><strong>Couleur:</strong> {epi.couleur}</Typography>}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Dates importantes</Typography>
            <Box mt={1}>
              <Typography><strong>Date d'achat:</strong> {format(new Date(epi.date_achat), 'dd/MM/yyyy')}</Typography>
              <Typography><strong>Date de fabrication:</strong> {format(new Date(epi.date_fabrication), 'dd/MM/yyyy')}</Typography>
              <Typography><strong>Date de mise en service:</strong> {format(new Date(epi.date_mise_en_service), 'dd/MM/yyyy')}</Typography>
              <Typography><strong>Périodicité de contrôle:</strong> {epi.périodicité_controle} mois</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Historique des contrôles
        </Typography>
        
        {controles.length === 0 ? (
          <Typography color="textSecondary" sx={{ py: 2 }}>
            Aucun contrôle enregistré pour cet EPI.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Gestionnaire</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Remarques</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {controles.map((controle) => (
                  <TableRow key={controle.id}>
                    <TableCell>{format(new Date(controle.date_controle), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{controle.gestionnaire_nom}</TableCell>
                    <TableCell>
                      <Chip 
                        label={controle.statut_nom || ''} 
                        color={getStatutColor(controle.statut_nom || '')}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{controle.remarques || '-'}</TableCell>
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

export default EPIDetail; 