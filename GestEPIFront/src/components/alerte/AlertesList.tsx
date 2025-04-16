// ************************************************************************
// 🎓 COMPOSANT REACT ALERTESLIST - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React et ses hooks pour gérer l'état et le cycle de vie du composant
// useState : stocke des données qui peuvent changer
// useEffect : exécute du code quand le composant est monté/mis à jour
import React, { useState, useEffect } from 'react';

// Material-UI : bibliothèque de composants graphiques prêts à l'emploi
// Box : conteneur flexible pour la mise en page
// Typography : textes avec styles prédéfinis
// Paper : conteneur avec ombre portée
// Table... : composants pour créer des tableaux structurés
import {
  Box, Typography, Paper, Tabs, Tab, CircularProgress, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button
} from '@mui/material';

// Hook de React Router pour la navigation entre pages
// Permet de changer d'URL sans recharger la page
import { useNavigate } from 'react-router-dom';

// Service qui contient les fonctions d'appel à l'API
// Exemple : alerteService.getAll() fait un GET /api/alertes
import { alerteService } from '../../services/alerteService';

// Icônes pour les différents états d'alerte
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Fonction pour formater les dates en format français
import { format } from 'date-fns';

// Interface TypeScript qui définit la structure d'une alerte
// Voir le fichier types.ts pour le détail des champs
import type { Alerte } from '../../types';

// ********** DÉFINITION DU COMPOSANT **********
// FC = Function Component, un composant React moderne
const AlertesList: React.FC = () => {
  // Hook de navigation - sera utilisé pour rediriger l'utilisateur
  const navigate = useNavigate();

  // ********** ÉTATS DU COMPOSANT (HOOKS USESTATE) **********
  // Ces états sont comme des variables qui, quand modifiées, 
  // déclenchent une mise à jour de l'affichage
  
  // Liste complète des alertes venant de l'API
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  // Liste filtrée selon l'onglet sélectionné
  const [filteredAlertes, setFilteredAlertes] = useState<Alerte[]>([]);
  // true pendant le chargement des données
  const [loading, setLoading] = useState(true);
  // Stocke les messages d'erreur éventuels
  const [error, setError] = useState<string | null>(null);
  // Index de l'onglet actif (0 = tous, 1 = retard...)
  const [tabValue, setTabValue] = useState(0);
  
  // Statistiques affichées dans les onglets
  const [stats, setStats] = useState({
    total: 0,
    enRetard: 0,
    aVenir: 0
  });

  // ********** EFFET DE CHARGEMENT (HOOK USEEFFECT) **********
  // Ce code s'exécute quand le composant est monté dans la page
  useEffect(() => {
    // Fonction asynchrone qui récupère les alertes
    const fetchAlertes = async () => {
      try {
        setLoading(true);  // Affiche le loader
        // Appel API via le service (fait un GET /api/alertes en base)
        const data = await alerteService.getAll();
        setAlertes(data);

        // Calcul des stats avec filter() qui compte les alertes par statut
        const enRetard = data.filter(a => a.statut === 'En retard').length;
        const aVenir = data.filter(a => a.statut === 'À venir').length;

        // Mise à jour des compteurs
        setStats({
          total: data.length,
          enRetard,
          aVenir
        });

        // Filtre initial des alertes selon l'onglet actif
        filterAlertesByTab(tabValue, data);
      } catch (error) {
        // En cas d'erreur API, on l'affiche
        console.error('Erreur lors de la récupération des alertes:', error);
        setError('Erreur lors du chargement des alertes. Veuillez réessayer.');
      } finally {
        setLoading(false);  // Cache le loader
      }
    };

    fetchAlertes();
  }, []);  // [] = exécuté une seule fois au montage

  // ********** FONCTIONS DE GESTION DES FILTRES **********
  // Filtre les alertes selon l'onglet sélectionné
  const filterAlertesByTab = (tabIndex: number, data: Alerte[] = alertes) => {
    switch (tabIndex) {
      case 0:  // Toutes les alertes
        setFilteredAlertes(data);
        break;
      case 1:  // Uniquement les retards
        setFilteredAlertes(data.filter(a => a.statut === 'En retard'));
        break;
      case 2:  // Uniquement les alertes à venir
        setFilteredAlertes(data.filter(a => a.statut === 'À venir'));
        break;
      case 3:  // Uniquement les EPI à jour
        setFilteredAlertes(data.filter(a => a.statut === 'À jour'));
        break;
      default:
        setFilteredAlertes(data);
    }
  };

  // ********** GESTIONNAIRES D'ÉVÉNEMENTS **********
  // Appelé quand l'utilisateur change d'onglet
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    filterAlertesByTab(newValue);
  };

  // Navigation vers la page de détail d'un EPI
  const handleViewEPI = (id?: number) => {
    if (id) navigate(`/epis/${id}`);
  };

  // Navigation vers le formulaire de nouveau contrôle
  const handleAddControle = (id?: number) => {
    if (id) navigate(`/controles/new?epiId=${id}`);
  };

  // ********** RENDU DU COMPOSANT (JSX) **********
  // Structure HTML/CSS générée par le composant
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Alertes de contrôle</Typography>

      {/* Barre d'onglets avec compteurs */}
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={<Box display="flex" alignItems="center">Toutes ({stats.total})</Box>} />
          <Tab label={<Box display="flex" alignItems="center"><ErrorIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />En retard ({stats.enRetard})</Box>} />
          <Tab label={<Box display="flex" alignItems="center"><WarningIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />À venir ({stats.aVenir})</Box>} />
          <Tab label={<Box display="flex" alignItems="center"><CheckCircleIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />À jour ({stats.total - stats.enRetard - stats.aVenir})</Box>} />
        </Tabs>
      </Paper>

      {/* Contenu principal : erreur, loader ou tableau */}
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Affiche l'erreur si elle existe */}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* Affiche le loader pendant le chargement */}
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
                {/* Boucle sur les alertes pour créer les lignes */}
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
                          alerte.statut === 'En retard' ? 'error' :
                          alerte.statut === 'À venir' ? 'warning' :
                          'success'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Button size="small" onClick={() => handleViewEPI(alerte.id)} sx={{ mr: 1 }}>Voir</Button>
                        <Button size="small" variant="contained" color="primary" onClick={() => handleAddControle(alerte.id)}>Contrôler</Button>
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

// Export du composant pour pouvoir l'utiliser ailleurs
export default AlertesList;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Affiche un tableau de bord des EPI à contrôler
// 2. Utilise les hooks React (useState, useEffect) pour gérer les données
// 3. Fait des appels API (via alerteService) pour récupérer les alertes
// 4. Utilise TypeScript pour le typage strict des données
// 5. Gère le filtrage et l'affichage des données avec Material-UI
//
// Points techniques à souligner :
// - Architecture React moderne (hooks)
// - Appels API asynchrones (async/await)
// - Typage TypeScript
// - Interface utilisateur responsive
// - Gestion des erreurs et du chargement
