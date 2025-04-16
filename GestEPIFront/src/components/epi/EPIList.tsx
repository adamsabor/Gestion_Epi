// ************************************************************************
// 🎓 COMPOSANT REACT EPILIST - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React et ses hooks pour gérer l'état et les effets
// useState : stocke des données qui peuvent changer
// useEffect : exécute du code quand le composant est monté/mis à jour
import React, { useState, useEffect } from 'react';

// Composants Material-UI pour l'interface graphique
// Typography : textes stylés, CircularProgress : animation de chargement
// Box : conteneur flexible, Button : boutons stylés, Alert : messages d'erreur
import {
  Typography, CircularProgress, Box, Button, Alert
} from '@mui/material';

// Outils de navigation et icônes
// Link : crée des liens sans recharger la page
// useNavigate : permet de rediriger programmatiquement
import { Link, useNavigate } from 'react-router-dom';
// Icônes pour les actions (ajouter, voir, modifier, supprimer)
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// DataGrid : tableau avancé de Material-UI
// Pour l'E6 : Permet d'afficher les données avec tri, pagination, etc.
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Service qui gère les appels à l'API backend
// Pour l'E6 : Contient les fonctions qui font les requêtes HTTP
import { epiService } from '../../services/epiService';
// Interface TypeScript qui définit la structure d'un EPI
import { EPI } from '../../types';
// Composant de dialogue de confirmation
import ConfirmDialog from '../common/ConfirmDialog';

// ********** COMPOSANT REACT **********
// Pour l'E6 : Un composant fonctionnel qui affiche la liste des EPIs
const EPIList: React.FC = () => {
  // Hook de navigation pour rediriger l'utilisateur
  const navigate = useNavigate();
  // Récupère les infos utilisateur du localStorage
  // Pour l'E6 : Permet de gérer les permissions (admin vs utilisateur)
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // ********** ÉTATS (VARIABLES RÉACTIVES) **********
  // Pour l'E6 : useState crée des variables qui, quand modifiées, mettent à jour l'interface
  const [epis, setEpis] = useState<EPI[]>([]); // Liste des EPIs (tableau vide au début)
  const [loading, setLoading] = useState(true); // Indique si chargement en cours
  const [error, setError] = useState<string | null>(null); // Message d'erreur éventuel
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // État du dialogue de suppression
  const [epiToDelete, setEpiToDelete] = useState<number | null>(null); // ID de l'EPI à supprimer

  // ********** EFFET DE CHARGEMENT **********
  // Pour l'E6 : useEffect s'exécute quand le composant est monté
  // Ici, il charge la liste des EPIs depuis l'API
  useEffect(() => {
    fetchEPIs();
  }, []); // [] = exécution unique au montage

  // ********** FONCTIONS **********
  // Pour l'E6 : Fonction qui charge les EPIs depuis l'API
  // En SQL : SELECT * FROM epis
  const fetchEPIs = async () => {
    try {
      setLoading(true); // Active le loader
      const episData = await epiService.getAll(); // Appel API
      // Ajoute un ID si manquant (sécurité)
      const episWithId = episData.map(epi => ({
        ...epi,
        id: epi.id || Math.random()
      }));
      setEpis(episWithId); // Met à jour la liste
    } catch (error) {
      console.error('Erreur lors de la récupération des EPIs:', error);
      setError("Impossible de charger les EPIs. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false); // Désactive le loader
    }
  };

  // Pour l'E6 : Fonction qui supprime un EPI
  // En SQL : DELETE FROM epis WHERE id = ?
  const handleDelete = async () => {
    if (epiToDelete === null) return;
    try {
      await epiService.delete(epiToDelete); // Appel API DELETE
      fetchEPIs(); // Recharge la liste
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI ${epiToDelete}:`, error);
      setError("Impossible de supprimer l'EPI. Veuillez réessayer plus tard.");
    } finally {
      setDeleteDialogOpen(false); // Ferme le dialogue
      setEpiToDelete(null); // Réinitialise l'ID
    }
  };

  // Pour l'E6 : Ouvre le dialogue de confirmation de suppression
  const openDeleteDialog = (id: number) => {
    setEpiToDelete(id);
    setDeleteDialogOpen(true);
  };

  // ********** DÉFINITION DES COLONNES **********
  // Pour l'E6 : Configuration du tableau avec toutes les colonnes
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'identifiant_custom', headerName: 'Identifiant', width: 130 },
    { field: 'marque', headerName: 'Marque', width: 130 },
    { field: 'modèle', headerName: 'Modèle', width: 130 },
    { field: 'numéro_série', headerName: 'N° Série', width: 130 },
    {
      field: 'date_achat',
      headerName: "Date d'achat",
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
      // Pour l'E6 : Rendu personnalisé avec les boutons d'action
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            size="small"
            onClick={() => navigate(`/epis/${params.row.id}`)}
            startIcon={<VisibilityIcon />}
          >
            
          </Button>
          {/* Boutons modifier/supprimer uniquement pour les admins */}
          {user.user_type_id === 1 && (
            <>
              <Button
                size="small"
                onClick={() => navigate(`/epis/edit/${params.row.id}`)}
                startIcon={<EditIcon />}
              >
                
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => openDeleteDialog(params.row.id)}
                startIcon={<DeleteIcon />}
              >
                
              </Button>
            </>
          )}
        </Box>
      )
    }
  ];

  // ********** RENDU JSX **********
  // Pour l'E6 : Structure de l'interface utilisateur
  return (
    <Box>
      {/* En-tête avec titre et bouton d'ajout */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Liste des EPIs
        </Typography>
        {/* Bouton d'ajout visible uniquement pour les admins */}
        {user.user_type_id === 1 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/epis/new"
          >
            Ajouter un EPI
          </Button>
        )}
      </Box>

      {/* Affichage des erreurs */}
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

export default EPIList;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Affiche la liste des EPIs dans un tableau interactif
// 2. Gère les opérations CRUD (Create, Read, Update, Delete)
// 3. Utilise les hooks React (useState, useEffect) pour la réactivité
// 4. Communique avec l'API via le service epiService
// 5. Gère les permissions utilisateur (admin vs utilisateur)
// 6. Utilise Material-UI pour une interface professionnelle