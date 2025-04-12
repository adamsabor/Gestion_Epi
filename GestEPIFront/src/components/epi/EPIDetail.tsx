// ********** IMPORTS **********
// Import des fonctionnalités de base de React
import React, { useState, useEffect } from 'react';
// Import des hooks de React Router pour la navigation et les paramètres d'URL
import { useParams, useNavigate } from 'react-router-dom';
// Import des composants Material-UI pour créer l'interface
import { 
  Box,               // Conteneur flexible
  Button,            // Boutons
  CircularProgress,  // Indicateur de chargement
  Grid,              // Grille responsive
  Paper,             // Surface surélevée
  Typography,        // Textes et titres
  Table,             // Tableau
  TableBody,         // Corps du tableau
  TableCell,         // Cellule du tableau
  TableContainer,    // Conteneur du tableau
  TableHead,         // En-tête du tableau
  TableRow,          // Ligne du tableau
  Chip              // Badge/étiquette
} from '@mui/material';
// Import des icônes Material-UI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Flèche retour
import EditIcon from '@mui/icons-material/Edit';            // Crayon modification

// Import des services qui gèrent les appels à l'API
import { epiService } from '../../services/epiService';         // Service pour les EPIs
import { controleService } from '../../services/controleService'; // Service pour les contrôles
// Import des types TypeScript pour le typage des données
import { EPI, Controle } from '../../types';
// Import de la fonction format de date-fns pour formater les dates
import { format } from 'date-fns';

// Composant EPIDetail : Affiche les détails d'un EPI et son historique de contrôles
const EPIDetail: React.FC = () => {
  // Récupère l'ID de l'EPI depuis l'URL (/epis/detail/123 => id = "123")
  const { id } = useParams<{ id: string }>();
  // Hook pour naviguer entre les pages
  const navigate = useNavigate();
  
  // États pour stocker les données et gérer l'interface
  const [epi, setEpi] = useState<EPI | null>(null);           // Données de l'EPI
  const [controles, setControles] = useState<Controle[]>([]); // Liste des contrôles
  const [loading, setLoading] = useState(true);               // Indicateur de chargement
  const [error, setError] = useState<string | null>(null);    // Message d'erreur

  // Fonction qui détermine la couleur du badge de statut selon l'état de l'EPI
  const getStatutColor = (statut: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (statut) {
      case 'Opérationnel':
        return 'success';   // Vert pour opérationnel
      case 'À réparer':
        return 'warning';   // Orange pour à réparer
      case 'Mis au rebut':
        return 'error';     // Rouge pour mis au rebut
      default:
        return 'default';   // Gris par défaut
    }
  };

  // useEffect : Chargement des données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Si pas d'ID, on ne fait rien
      
      try {
        setLoading(true); // Active l'indicateur de chargement
        const epiId = parseInt(id);
        
        // Appelle le service pour récupérer les détails de l'EPI
        const epiData = await epiService.getById(epiId);
        setEpi(epiData);
        
        // Appelle le service pour récupérer l'historique des contrôles
        const controlesData = await controleService.getByEpiId(epiId);
        setControles(controlesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      } finally {
        setLoading(false); // Désactive l'indicateur de chargement
      }
    };

    fetchData();
  }, [id]); // Se déclenche quand l'ID change

  // Affiche un indicateur de chargement pendant le chargement des données
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // Affiche un message d'erreur si quelque chose s'est mal passé
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

  // Affiche un message si l'EPI n'est pas trouvé
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

  // Affichage principal des détails de l'EPI
  return (
    <Box>
      {/* Barre d'actions avec boutons Retour et Modifier */}
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

      {/* Carte des informations de l'EPI */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {epi.identifiant_custom} - {epi.marque} {epi.modèle}
        </Typography>
        
        <Grid container spacing={3} mt={1}>
          {/* Colonne des informations générales */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Informations générales</Typography>
            <Box mt={1}>
              <Typography><strong>Numéro de série:</strong> {epi.numéro_série}</Typography>
              {epi.taille && <Typography><strong>Taille:</strong> {epi.taille}</Typography>}
              {epi.couleur && <Typography><strong>Couleur:</strong> {epi.couleur}</Typography>}
            </Box>
          </Grid>
          
          {/* Colonne des dates importantes */}
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

      {/* Carte de l'historique des contrôles */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Historique des contrôles
        </Typography>
        
        {/* Affiche un message si aucun contrôle n'existe */}
        {controles.length === 0 ? (
          <Typography color="textSecondary" sx={{ py: 2 }}>
            Aucun contrôle enregistré pour cet EPI.
          </Typography>
        ) : (
          // Sinon affiche le tableau des contrôles
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

// Exporte le composant pour l'utiliser dans d'autres fichiers
export default EPIDetail; 

/*
RÉSUMÉ DU FICHIER EPIDetail.tsx :

Ce composant est la page de détail d'un EPI dans l'application GestEPI.
Il affiche toutes les informations d'un EPI et son historique de contrôles.

PLACE DANS L'ARCHITECTURE :
- Situé dans components/epi/ car il gère l'affichage des EPIs
- Utilise les services epiService et controleService pour communiquer avec l'API
- S'intègre avec le système de routage pour afficher les détails d'un EPI spécifique

POINTS CLÉS POUR L'ORAL :
1. Gestion des données avec les hooks useState et useEffect
2. Communication avec l'API via les services
3. Interface utilisateur responsive avec Material-UI
4. Gestion des états de chargement et des erreurs
5. Affichage des données dans un format lisible
*/