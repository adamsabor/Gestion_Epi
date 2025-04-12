import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { epiService } from '../../services/epiService';
import { EPI } from '../../types';
import {
  Box, Typography, Paper, CircularProgress, Alert, Button, Divider
} from '@mui/material';

const EPIDetails: React.FC = () => {
  const { id } = useParams();
  const [epi, setEpi] = useState<EPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEPI = async () => {
      try {
        const epiData = await epiService.getById(Number(id));
        setEpi(epiData);
      } catch (err) {
        setError('Impossible de charger cet EPI.');
      } finally {
        setLoading(false);
      }
    };
    fetchEPI();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !epi) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        {error || "EPI introuvable."}
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 4, m: 4 }}>
      <Typography variant="h5" gutterBottom>Détails de l'EPI</Typography>
      <Divider sx={{ mb: 2 }} />

      <Box mb={2}><strong>Identifiant :</strong> {epi.identifiant_custom}</Box>
      <Box mb={2}><strong>Marque :</strong> {epi.marque}</Box>
      <Box mb={2}><strong>Modèle :</strong> {epi.modèle}</Box>
      <Box mb={2}><strong>N° série :</strong> {epi.numéro_série}</Box>
      <Box mb={2}><strong>Date d'achat :</strong> {new Date(epi.date_achat).toLocaleDateString()}</Box>
      <Box mb={2}><strong>Date fabrication :</strong> {new Date(epi.date_fabrication).toLocaleDateString()}</Box>
      <Box mb={2}><strong>Date mise en service :</strong> {new Date(epi.date_mise_en_service).toLocaleDateString()}</Box>
      <Box mb={2}><strong>Périodicité contrôle :</strong> {epi.périodicité_controle} mois</Box>
      <Box mb={2}><strong>Type :</strong> {epi.type_nom || 'Non spécifié'}</Box>

      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        component={RouterLink}
        to="/epis"
      >
        Retour à la liste
      </Button>
    </Paper>
  );
};

export default EPIDetails;
