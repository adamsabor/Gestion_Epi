// 📄 Fichier : Dashboard.tsx
// 📌 Ce fichier fait partie du projet GestEPI (application de gestion des EPI pour cordistes)
// 🧩 Rôle : Composant React qui affiche le tableau de bord principal avec les statistiques et alertes
// 🔄 Interagit avec : Services API (alertes, EPIs, contrôles), Material-UI (interface), React Router (navigation)
// 👶 Niveau débutant : Ce composant crée la page d'accueil avec toutes les infos importantes en un coup d'œil !

// Import des outils React pour gérer l'état (useState) et les effets de bord (useEffect)
import React, { useState, useEffect } from 'react';

// Import des composants Material-UI pour construire une interface pro
// Typography : textes stylés, Box : conteneur flexible, Grid : système de grille
// Paper : carte avec ombre, CircularProgress : animation de chargement
// Alert : messages d'alerte, Card/CardContent : cartes stylées
// List/ListItem : listes structurées, Divider : ligne de séparation
// Button : boutons stylés
import {
  Typography, Box, Grid, Paper, CircularProgress, Alert, Card,
  CardContent, Divider, Button, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';

// Import de Link pour créer des liens de navigation entre les pages
import { Link } from 'react-router-dom';

// Import des icônes Material-UI qui donnent du sens visuel aux informations
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';

// Import des services qui communiquent avec l'API backend
// Ces services gèrent toutes les requêtes HTTP vers le serveur
import { alerteService } from '../../services/alerteService';
import { epiService } from '../../services/epiService';
import { controleService } from '../../services/controleService';

// Import de l'outil de formatage de dates
import { format } from 'date-fns';

// Définition du composant Dashboard comme composant fonctionnel React avec TypeScript
const Dashboard: React.FC = () => {
  // États locaux pour gérer les données et l'état de l'interface
  // loading : indique si les données sont en cours de chargement
  const [loading, setLoading] = useState(true);
  // error : stocke les messages d'erreur éventuels
  const [error, setError] = useState<string | null>(null);
  // stats : stocke les statistiques globales (compteurs)
  const [stats, setStats] = useState({
    totalEpis: 0,
    totalControles: 0,
    alertesEnRetard: 0,
    alertesAVenir: 0
  });
  // recentControles : liste des 5 derniers contrôles effectués
  const [recentControles, setRecentControles] = useState<any[]>([]);
  // urgentAlertes : liste des 5 alertes les plus urgentes
  const [urgentAlertes, setUrgentAlertes] = useState<any[]>([]);

  // useEffect s'exécute au chargement du composant pour récupérer les données
  useEffect(() => {
    // Fonction asynchrone qui va chercher toutes les données nécessaires
    const fetchData = async () => {
      try {
        // Active l'indicateur de chargement
        setLoading(true);

        // Récupère toutes les données depuis l'API via les services
        const epis = await epiService.getAll();
        const controles = await controleService.getAll();
        const alertes = await alerteService.getAll();

        // Calcule le nombre d'alertes par statut
        const enRetard = alertes.filter(a => a.statut === 'En retard').length;
        const aVenir = alertes.filter(a => a.statut === 'À venir').length;

        // Prépare les 5 contrôles les plus récents (triés par date)
        const recentControlesData = controles
          .sort((a, b) => new Date(b.date_controle).getTime() - new Date(a.date_controle).getTime())
          .slice(0, 5);

        // Prépare les 5 alertes les plus urgentes
        // Trie d'abord les alertes en retard, puis par date
        const urgentAlertesData = alertes
          .filter(a => a.statut === 'En retard' || a.statut === 'À venir')
          .sort((a, b) => {
            if (a.statut === 'En retard' && b.statut !== 'En retard') return -1;
            if (a.statut !== 'En retard' && b.statut === 'En retard') return 1;
            return new Date(a.prochain_controle).getTime() - new Date(b.prochain_controle).getTime();
          })
          .slice(0, 5);

        // Met à jour tous les états avec les données récupérées
        setStats({
          totalEpis: epis.length,
          totalControles: controles.length,
          alertesEnRetard: enRetard,
          alertesAVenir: aVenir
        });

        setRecentControles(recentControlesData);
        setUrgentAlertes(urgentAlertesData);
      } catch (error) {
        // En cas d'erreur, affiche un message dans la console et l'interface
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
        setError('Impossible de charger les données du tableau de bord. Veuillez réessayer plus tard.');
      } finally {
        // Dans tous les cas, désactive l'indicateur de chargement
        setLoading(false);
      }
    };

    // Lance la récupération des données
    fetchData();
  }, []); // Le tableau vide signifie que l'effet ne s'exécute qu'au montage du composant

  // Si les données sont en cours de chargement, affiche un spinner centré
  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  }

  // Si une erreur est survenue, affiche un message d'erreur
  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  // Le rendu principal du tableau de bord
  return (
    <Box>
      {/* Titre principal de la page */}
      <Typography variant="h4" gutterBottom>Tableau de bord</Typography>

      {/* Grille de 4 cartes avec les statistiques principales */}
      <Grid container spacing={3} mb={4}>
        {/* Carte des EPIs */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <InventoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">EPIs</Typography>
              </Box>
              <Typography variant="h3">{stats.totalEpis}</Typography>
              <Button component={Link} to="/epis" size="small" sx={{ mt: 2 }}>Voir tous les EPIs</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte des contrôles */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Contrôles</Typography>
              </Box>
              <Typography variant="h3">{stats.totalControles}</Typography>
              <Button component={Link} to="/controles/new" size="small" sx={{ mt: 2 }}>Nouveau contrôle</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte des alertes en retard (rouge si alertes présentes) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: stats.alertesEnRetard > 0 ? 'error.light' : 'inherit' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <ErrorIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">En retard</Typography>
              </Box>
              <Typography variant="h3">{stats.alertesEnRetard}</Typography>
              <Button
                component={Link}
                to="/alertes"
                size="small"
                sx={{ mt: 2 }}
                color="error"
                variant={stats.alertesEnRetard > 0 ? "contained" : "outlined"}
              >
                Voir les alertes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte des alertes à venir (orange si alertes présentes) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: stats.alertesAVenir > 0 ? 'warning.light' : 'inherit' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <WarningIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">À venir</Typography>
              </Box>
              <Typography variant="h3">{stats.alertesAVenir}</Typography>
              <Button
                component={Link}
                to="/alertes"
                size="small"
                sx={{ mt: 2 }}
                color="warning"
                variant={stats.alertesAVenir > 0 ? "contained" : "outlined"}
              >
                Voir les alertes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Grille avec les listes détaillées */}
      <Grid container spacing={3}>
        {/* Liste des contrôles récents */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Contrôles récents</Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Message si aucun contrôle récent */}
            {recentControles.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography color="textSecondary">Aucun contrôle récent</Typography>
                <Button component={Link} to="/controles/new" startIcon={<AddIcon />} variant="contained" sx={{ mt: 2 }}>
                  Ajouter un contrôle
                </Button>
              </Box>
            ) : (
              // Liste des 5 derniers contrôles avec leur statut
              <List>
                {recentControles.map((controle) => (
                  <ListItem key={controle.id} divider>
                    <ListItemIcon>
                      {controle.statut_nom === 'Opérationnel' ? <CheckCircleIcon color="success" /> :
                        controle.statut_nom === 'À réparer' ? <WarningIcon color="warning" /> :
                          <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${controle.epi_identifiant} - ${format(new Date(controle.date_controle), 'dd/MM/yyyy')}`}
                      secondary={`Statut: ${controle.statut_nom} | Gestionnaire: ${controle.gestionnaire_nom}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Liste des alertes urgentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Alertes urgentes</Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Message si aucune alerte urgente */}
            {urgentAlertes.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography color="textSecondary">Aucune alerte urgente</Typography>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mt: 2 }} />
              </Box>
            ) : (
              // Liste des 5 alertes les plus urgentes avec bouton pour créer un contrôle
              <List>
                {urgentAlertes.map((alerte) => (
                  <ListItem key={alerte.id} divider>
                    <ListItemIcon>
                      {alerte.statut === 'En retard' ? <ErrorIcon color="error" /> : <WarningIcon color="warning" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${alerte.identifiant_custom} - ${alerte.marque} ${alerte.modèle}`}
                      secondary={`Prochain contrôle: ${format(new Date(alerte.prochain_controle), 'dd/MM/yyyy')} | Statut: ${alerte.statut}`}
                    />
                    <Button
                      component={Link}
                      to={`/controles/new?epiId=${alerte.id}`}
                      variant="contained"
                      size="small"
                    >
                      Contrôler
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Export du composant pour pouvoir l'utiliser dans d'autres fichiers
export default Dashboard;
