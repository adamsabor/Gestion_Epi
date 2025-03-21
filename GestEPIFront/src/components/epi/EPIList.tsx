import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Button, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { epiService } from '../../services/epiService';
import { EPI } from '../../types';
import ConfirmDialog from '../common/ConfirmDialog';

const EPIList: React.FC = () => {
  const navigate = useNavigate();
  const [epis, setEpis] = useState<EPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [epiToDelete, setEpiToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchEPIs();
  }, []);

  const fetchEPIs = async () => {
    try {
      setLoading(true);
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

  const handleDelete = async () => {
    if (epiToDelete === null) return;
    
    try {
      await epiService.delete(epiToDelete);
      // Rafraîchir la liste après suppression
      fetchEPIs();
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${epiToDelete}:`, error);
      setError('Impossible de supprimer l\'EPI. Veuillez réessayer plus tard.');
    } finally {
      setDeleteDialogOpen(false);
      setEpiToDelete(null);
    }
  };

  const openDeleteDialog = (id: number) => {
    setEpiToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Définir les colonnes pour le tableau
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'identifiant_custom', headerName: 'Identifiant', width: 130 },
    { field: 'marque', headerName: 'Marque', width: 130 },
    { field: 'modèle', headerName: 'Modèle', width: 130 },
    { field: 'numéro_série', headerName: 'N° Série', width: 130 },
    { 
      field: 'date_achat', 
      headerName: 'Date d\'achat', 
      width: 130,
      valueFormatter: (params: { value: any }) => new Date(params.value).toLocaleDateString()
    },
    { 
      field: 'date_mise_en_service', 
      headerName: 'Mise en service', 
      width: 150,
      valueFormatter: (params: { value: any }) => new Date(params.value).toLocaleDateString()
    },
    { field: 'périodicité_controle', headerName: 'Périodicité (mois)', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            size="small"
            onClick={() => navigate(`/epis/${params.row.id}`)}
            startIcon={<VisibilityIcon />}
          >
            Voir
          </Button>
          <Button
            size="small"
            onClick={() => navigate(`/epis/edit/${params.row.id}`)}
            startIcon={<EditIcon />}
          >
            Éditer
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => openDeleteDialog(params.row.id)}
            startIcon={<DeleteIcon />}
          >
            Supprimer
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Liste des EPIs
        </Typography>
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={epis}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          autoHeight
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Confirmer la suppression"
        content="Êtes-vous sûr de vouloir supprimer cet EPI ? Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setEpiToDelete(null);
        }}
      />
    </Box>
  );
};

export default EPIList; 