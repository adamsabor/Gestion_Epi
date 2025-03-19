import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../common/DataTable';
import { epiService } from '../../services/epiService';
import { EPI } from '../../types';

const EPIList = () => {
  const [epis, setEpis] = useState<EPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEPIs = async () => {
      try {
        const episData = await epiService.getAll();
        // S'assurer que chaque EPI a un id pour DataGrid
        const episWithId = episData.map(epi => ({
          ...epi,
          id: epi.id || Math.random() // Fallback si id est undefined
        }));
        setEpis(episWithId);
      } catch (error) {
        console.error('Erreur lors de la récupération des EPIs:', error);
        setError('Impossible de charger les EPIs. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchEPIs();
  }, []);

  // Définir les colonnes pour le tableau
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'identifiant_custom', headerName: 'Identifiant', width: 130 },
    { field: 'marque', headerName: 'Marque', width: 130 },
    { field: 'modèle', headerName: 'Modèle', width: 130 },
    { field: 'numéro_série', headerName: 'N° Série', width: 130 },
    { field: 'date_achat', headerName: 'Date d\'achat', width: 130 },
    { field: 'date_mise_en_service', headerName: 'Mise en service', width: 150 },
    { field: 'périodicité_controle', headerName: 'Périodicité (mois)', width: 150 },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h1">Liste des EPIs</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          component={Link}
          to="/epis/new"
        >
          Ajouter un EPI
        </Button>
      </Box>
      
      <DataTable 
        rows={epis} 
        columns={columns} 
        pageSize={10}
        rowsPerPageOptions={[5, 10, 25]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};

export default EPIList; 