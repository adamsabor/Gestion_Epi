import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Divider, 
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
import { EPI, Controle, StatutControle } from '../../types';

const EPIDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [epi, setEpi] = useState<EPI | null>(null);
  const [controles, setControles] = useState<Controle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatutColor = (statut: StatutControle) => {
    switch (statut) {
      case StatutControle.OPERATIONNEL:
        return 'success';
      case StatutControle.A_REPARER:
        return 'warning';
      case StatutControle.MIS_AU_REBUT:
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
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
          startIcon={<EditIcon />}
          onClick={() => navigate(`/epis/edit/${id}`)}
        >
          Modifier
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Détails de l'EPI: {epi.identifiant_custom}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Informations générales</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><strong>Marque:</strong> {epi.marque}</Typography>
            <Typography><strong>Modèle:</strong> {epi.modèle}</Typography>
            <Typography><strong>Numéro de série:</strong> {epi.numéro_série}</Typography>
            {epi.taille && <Typography><strong>Taille:</strong> {epi.taille}</Typography>}
            {epi.couleur && <Typography><strong>Couleur:</strong> {epi.couleur}</Typography>}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Dates importantes</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><strong>Date d'achat:</strong> {new Date(epi.date_achat).toLocaleDateString()}</Typography>
            <Typography><strong>Date de fabrication:</strong> {new Date(epi.date_fabrication).toLocaleDateString()}</Typography>
            <Typography><strong>Date de mise en service:</strong> {new Date(epi.date_mise_en_service).toLocaleDateString()}</Typography>
            <Typography><strong>Périodicité de contrôle:</strong> {epi.périodicité_controle} mois</Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
          Historique des contrôles
        </Typography>
        
        {controles.length === 0 ? (
          <Typography>Aucun contrôle enregistré pour cet EPI.</Typography>
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
                    <TableCell>{new Date(controle.date_controle).toLocaleDateString()}</TableCell>
                    <TableCell>{controle.gestionnaire}</TableCell>
                    <TableCell>
                      <Chip 
                        label={controle.statut} 
                        color={getStatutColor(controle.statut) as any}
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