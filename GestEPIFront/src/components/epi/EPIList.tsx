// ********** IMPORTS **********
// Import des fonctionnalités de base de React : useState pour gérer l'état, useEffect pour les effets
import React, { useState, useEffect } from 'react';

// Import des composants Material-UI pour créer une interface moderne
import { Typography, CircularProgress, Box, Button, Alert } from '@mui/material';

// Import des outils de navigation de React Router
import { Link, useNavigate } from 'react-router-dom';

// Import des icônes Material-UI qui seront utilisées dans la liste
import AddIcon from '@mui/icons-material/Add';            // Icône "+" pour ajouter
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icône "œil" pour voir
import EditIcon from '@mui/icons-material/Edit';          // Icône "crayon" pour modifier 
import DeleteIcon from '@mui/icons-material/Delete';      // Icône "poubelle" pour supprimer

// Import du composant DataGrid de Material-UI qui crée un tableau interactif
// GridColDef définit la structure des colonnes
// GridRenderCellParams permet de personnaliser l'affichage des cellules
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Import du service qui gère les appels API pour les EPIs
import { epiService } from '../../services/epiService';

// Import du type TypeScript qui définit la structure d'un EPI
import { EPI } from '../../types';

// Import de notre composant de dialogue de confirmation personnalisé
import ConfirmDialog from '../common/ConfirmDialog';

// Composant principal EPIList : Affiche la liste des EPIs sous forme de tableau
const EPIList: React.FC = () => {
  // Hook pour naviguer entre les pages
  const navigate = useNavigate();
  
  // États pour gérer les données et l'interface
  const [epis, setEpis] = useState<EPI[]>([]);                    // Liste des EPIs
  const [loading, setLoading] = useState(true);                   // État de chargement
  const [error, setError] = useState<string | null>(null);        // Message d'erreur
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);// État d'ouverture du dialogue
  const [epiToDelete, setEpiToDelete] = useState<number | null>(null); // ID de l'EPI à supprimer

  // useEffect : Charge la liste des EPIs au montage du composant
  useEffect(() => {
    fetchEPIs();
  }, []);

  // Fonction qui récupère tous les EPIs depuis l'API
  const fetchEPIs = async () => {
    try {
      setLoading(true); // Active l'indicateur de chargement
      const episData = await epiService.getAll(); // Appelle l'API
      // Ajoute un ID unique si manquant (important pour DataGrid)
      const episWithId = episData.map(epi => ({
        ...epi,
        id: epi.id || Math.random()
      }));
      setEpis(episWithId); // Met à jour la liste
    } catch (error) {
      console.error('Erreur lors de la récupération des EPIs:', error);
      setError('Impossible de charger les EPIs. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false); // Désactive l'indicateur de chargement
    }
  };

  // Fonction qui gère la suppression d'un EPI
  const handleDelete = async () => {
    if (epiToDelete === null) return;
    
    try {
      await epiService.delete(epiToDelete); // Appelle l'API pour supprimer
      fetchEPIs(); // Recharge la liste après suppression
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${epiToDelete}:`, error);
      setError('Impossible de supprimer l\'EPI. Veuillez réessayer plus tard.');
    } finally {
      setDeleteDialogOpen(false); // Ferme le dialogue
      setEpiToDelete(null);       // Réinitialise l'ID
    }
  };

  // Fonction qui ouvre le dialogue de confirmation de suppression
  const openDeleteDialog = (id: number) => {
    setEpiToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Définition des colonnes du tableau
  const columns: GridColDef[] = [
    // Chaque objet définit une colonne : son nom, sa largeur, comment afficher les données
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'identifiant_custom', headerName: 'Identifiant', width: 130 },
    { field: 'marque', headerName: 'Marque', width: 130 },
    { field: 'modèle', headerName: 'Modèle', width: 130 },
    { field: 'numéro_série', headerName: 'N° Série', width: 130 },
    { 
      field: 'date_achat', 
      headerName: 'Date d\'achat', 
      width: 130,
      // Formate la date pour l'affichage
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
      // Colonne spéciale qui contient les boutons d'action
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          {/* Boutons Voir, Éditer et Supprimer pour chaque ligne */}
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

  // Rendu du composant
  return (
    <Box>
      {/* En-tête avec titre et bouton d'ajout */}
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

      {/* Affichage des erreurs éventuelles */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Affiche soit le chargement soit le tableau */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        // Tableau des EPIs avec pagination et tri
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

      {/* Dialogue de confirmation pour la suppression */}
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

// Export du composant pour pouvoir l'utiliser ailleurs
export default EPIList; 