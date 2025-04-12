// ********** IMPORTS **********
// Import des éléments de base de React
import React, { useState, useEffect } from 'react';
// Import des composants Material-UI pour l'interface graphique
import { 
  Box,  // Conteneur flexible
  Typography,  // Pour les textes et titres
  Paper,  // Carte/surface surélevée
  Tabs, Tab,  // Onglets de navigation
  CircularProgress,  // Indicateur de chargement
  Alert,  // Messages d'alerte
  Table, TableBody, TableCell,  // Composants pour créer des tableaux
  TableContainer, TableHead, TableRow,
  Chip,  // Badge/étiquette
  Button  // Bouton
} from '@mui/material';

// Hook de navigation de React Router
import { useNavigate } from 'react-router-dom';
// Service qui gère les appels API pour les alertes
import { alerteService } from '../../services/alerteService';
// Icônes pour les différents états
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Fonction pour formater les dates
import { format } from 'date-fns';

// Interface TypeScript qui définit la structure d'une alerte
interface Alerte {
  id?: number;  // ? signifie optionnel
  identifiant_custom: string;  // Identifiant unique de l'EPI
  marque: string;
  modèle: string;
  dernier_controle: string;  // Date du dernier contrôle
  prochain_controle: string;  // Date du prochain contrôle prévu
  statut: 'À jour' | 'À venir' | 'En retard';  // Statut possible de l'alerte
  urgence: 'normale' | 'moyenne' | 'haute';  // Niveau d'urgence
}

// Composant principal qui affiche la liste des alertes
const AlertesList: React.FC = () => {
  // Hook de navigation pour rediriger l'utilisateur
  const navigate = useNavigate();
  
  // États (variables) du composant avec useState
  const [alertes, setAlertes] = useState<Alerte[]>([]);  // Toutes les alertes
  const [filteredAlertes, setFilteredAlertes] = useState<Alerte[]>([]);  // Alertes filtrées
  const [loading, setLoading] = useState(true);  // État de chargement
  const [error, setError] = useState<string | null>(null);  // Message d'erreur
  const [tabValue, setTabValue] = useState(0);  // Onglet actif
  const [stats, setStats] = useState({  // Statistiques des alertes
    total: 0,
    enRetard: 0,
    aVenir: 0
  });

  // useEffect : s'exécute au chargement du composant
  useEffect(() => {
    // Fonction qui récupère les alertes depuis l'API
    const fetchAlertes = async () => {
      try {
        setLoading(true);  // Affiche le loader
        const data = await alerteService.getAll();  // Appel API
        setAlertes(data);  // Stocke les alertes
        
        // Calcule les statistiques pour chaque catégorie
        const enRetard = data.filter(a => a.statut === 'En retard').length;
        const aVenir = data.filter(a => a.statut === 'À venir').length;
        
        setStats({
          total: data.length,
          enRetard,
          aVenir
        });
        
        filterAlertesByTab(tabValue, data);  // Filtre initial selon l'onglet
      } catch (error) {
        console.error('Erreur lors de la récupération des alertes:', error);
        setError('Erreur lors du chargement des alertes. Veuillez réessayer.');
      } finally {
        setLoading(false);  // Cache le loader
      }
    };

    fetchAlertes();  // Lance la récupération des données
  }, []);  // [] signifie "une seule fois au chargement"

  // Fonction qui filtre les alertes selon l'onglet sélectionné
  const filterAlertesByTab = (tabIndex: number, data: Alerte[] = alertes) => {
    switch (tabIndex) {
      case 0: // Toutes les alertes
        setFilteredAlertes(data);
        break;
      case 1: // Uniquement les alertes en retard
        setFilteredAlertes(data.filter(a => a.statut === 'En retard'));
        break;
      case 2: // Uniquement les alertes à venir
        setFilteredAlertes(data.filter(a => a.statut === 'À venir'));
        break;
      case 3: // Uniquement les alertes à jour
        setFilteredAlertes(data.filter(a => a.statut === 'À jour'));
        break;
      default:
        setFilteredAlertes(data);
    }
  };

  // Gère le changement d'onglet
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    filterAlertesByTab(newValue);
  };

  // Redirige vers la page de détail d'un EPI
  const handleViewEPI = (id?: number) => {
    if (id) {
      navigate(`/epis/${id}`);
    }
  };

  // Redirige vers le formulaire de contrôle avec l'ID de l'EPI pré-rempli
  const handleAddControle = (id?: number) => {
    if (id) {
      navigate(`/controles/new?epiId=${id}`);
    }
  };

  // Rendu du composant
  return (
    <Box>
      {/* Titre de la page */}
      <Typography variant="h5" gutterBottom>
        Alertes de contrôle
      </Typography>
      
      {/* Barre d'onglets pour filtrer les alertes */}
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {/* Onglet "Toutes" avec le nombre total */}
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <span>Toutes ({stats.total})</span>
              </Box>
            } 
          />
          {/* Onglet "En retard" avec icône rouge */}
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <ErrorIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
                En retard ({stats.enRetard})
              </Box>
            } 
          />
          {/* Onglet "À venir" avec icône orange */}
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <WarningIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                À venir ({stats.aVenir})
              </Box>
            } 
          />
          {/* Onglet "À jour" avec icône verte */}
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
      
      {/* Contenu principal */}
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Affiche les erreurs s'il y en a */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {/* Affichage conditionnel selon l'état :
            - Chargement : affiche un spinner
            - Pas d'alertes : affiche un message
            - Alertes présentes : affiche le tableau */}
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : filteredAlertes.length === 0 ? (
          <Typography color="textSecondary" sx={{ p: 2 }}>
            Aucune alerte à afficher dans cette catégorie.
          </Typography>
        ) : (
          // Tableau des alertes
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
                {/* Parcourt et affiche chaque alerte */}
                {filteredAlertes.map((alerte) => (
                  <TableRow key={alerte.id}>
                    <TableCell>{alerte.identifiant_custom}</TableCell>
                    <TableCell>{alerte.marque} {alerte.modèle}</TableCell>
                    <TableCell>{format(new Date(alerte.dernier_controle), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{format(new Date(alerte.prochain_controle), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      {/* Badge coloré selon le statut */}
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
                        {/* Boutons d'action pour chaque alerte */}
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

// Exporte le composant pour l'utiliser ailleurs
export default AlertesList; 