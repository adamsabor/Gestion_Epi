// ********** IMPORTS **********
// Import des fonctionnalités de base de React : useState pour gérer l'état, useEffect pour les effets
import React, { useState, useEffect } from 'react';

// Import des composants Material-UI pour créer l'interface graphique
// Typography : textes et titres, Box : conteneur flexible, Grid : grille responsive
// Paper : surface surélevée, CircularProgress : indicateur de chargement
// Alert : messages d'alerte, Card/CardContent : cartes stylisées
// Divider : ligne de séparation, Button : boutons
// List/ListItem... : listes et éléments de liste
import { 
  Typography, Box, Grid, Paper, CircularProgress, Alert, Card, CardContent,
  Divider, Button, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';

// Import du composant Link de React Router pour créer des liens entre les pages
import { Link } from 'react-router-dom';

// Import des icônes Material-UI qui seront utilisées dans le tableau de bord
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';

// Import des services qui gèrent les appels à l'API
// Ces services font le lien entre le front et le back-end
import { alerteService } from '../../services/alerteService';
import { epiService } from '../../services/epiService';
import { controleService } from '../../services/controleService';

// Import de la fonction format de date-fns pour formater les dates
import { format } from 'date-fns';

// Composant Dashboard : C'est la page d'accueil de l'application
// Elle affiche un résumé des informations importantes (EPIs, contrôles, alertes)
const Dashboard: React.FC = () => {
  // États pour gérer les données et le chargement
  const [loading, setLoading] = useState(true);        // Indique si les données sont en cours de chargement
  const [error, setError] = useState<string | null>(null);  // Stocke les messages d'erreur éventuels
  
  // État qui stocke les statistiques globales
  const [stats, setStats] = useState({
    totalEpis: 0,          // Nombre total d'EPIs
    totalControles: 0,     // Nombre total de contrôles
    alertesEnRetard: 0,    // Nombre d'alertes en retard
    alertesAVenir: 0       // Nombre d'alertes à venir
  });
  
  // États pour les listes de données
  const [recentControles, setRecentControles] = useState<any[]>([]); // Liste des contrôles récents
  const [urgentAlertes, setUrgentAlertes] = useState<any[]>([]);    // Liste des alertes urgentes

  // useEffect : Chargement des données au montage du composant
  useEffect(() => {
    // Fonction qui récupère toutes les données nécessaires au tableau de bord
    const fetchData = async () => {
      try {
        setLoading(true);  // Active l'indicateur de chargement
        
        // 1. Récupère tous les EPIs via le service
        const epis = await epiService.getAll();
        
        // 2. Récupère tous les contrôles
        const controles = await controleService.getAll();
        
        // 3. Récupère toutes les alertes et les filtre par statut
        const alertes = await alerteService.getAll();
        const enRetard = alertes.filter(a => a.statut === 'En retard').length;
        const aVenir = alertes.filter(a => a.statut === 'À venir').length;
        
        // 4. Prépare les 5 contrôles les plus récents
        // Trie par date décroissante et prend les 5 premiers
        const recentControlesData = controles
          .sort((a, b) => new Date(b.date_controle).getTime() - new Date(a.date_controle).getTime())
          .slice(0, 5);
        
        // 5. Prépare les 5 alertes les plus urgentes
        // Filtre les alertes en retard ou à venir, les trie par priorité
        const urgentAlertesData = alertes
          .filter(a => a.statut === 'En retard' || a.statut === 'À venir')
          .sort((a, b) => {
            if (a.statut === 'En retard' && b.statut !== 'En retard') return -1;
            if (a.statut !== 'En retard' && b.statut === 'En retard') return 1;
            return new Date(a.prochain_controle).getTime() - new Date(b.prochain_controle).getTime();
          })
          .slice(0, 5);
        
        // Met à jour les états avec toutes les données récupérées
        setStats({
          totalEpis: epis.length,
          totalControles: controles.length,
          alertesEnRetard: enRetard,
          alertesAVenir: aVenir
        });
        
        setRecentControles(recentControlesData);
        setUrgentAlertes(urgentAlertesData);

      } catch (error) {
        // En cas d'erreur, affiche un message dans la console et stocke l'erreur
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
        setError('Impossible de charger les données du tableau de bord. Veuillez réessayer plus tard.');
      } finally {
        // Dans tous les cas, désactive l'indicateur de chargement
        setLoading(false);
      }
    };

    // Lance le chargement des données
    fetchData();
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'au montage du composant

  // Si les données sont en cours de chargement, affiche un indicateur de chargement centré
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // Si une erreur s'est produite, affiche un message d'erreur
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  // Rendu principal du tableau de bord
  return (
    <Box>
      {/* Titre principal */}
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      {/* Grille des statistiques principales */}
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
              <Button 
                component={Link} 
                to="/epis" 
                size="small" 
                sx={{ mt: 2 }}
              >
                Voir tous les EPIs
              </Button>
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
              <Button 
                component={Link} 
                to="/controles/new" 
                size="small" 
                sx={{ mt: 2 }}
              >
                Nouveau contrôle
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Carte des alertes en retard */}
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
        
        {/* Carte des alertes à venir */}
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

      {/* Grille des listes détaillées */}
      <Grid container spacing={3}>
        {/* Liste des contrôles récents */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Contrôles récents
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {/* Affiche un message si aucun contrôle récent */}
            {recentControles.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography color="textSecondary">
                  Aucun contrôle récent
                </Typography>
                <Button 
                  component={Link} 
                  to="/controles/new" 
                  startIcon={<AddIcon />}
                  variant="contained" 
                  sx={{ mt: 2 }}
                >
                  Ajouter un contrôle
                </Button>
              </Box>
            ) : (
              // Sinon, affiche la liste des contrôles récents
              <List>
                {recentControles.map((controle) => (
                  <ListItem key={controle.id} divider>
                    <ListItemIcon>
                      {/* Icône selon le statut du contrôle */}
                      {controle.statut_nom === 'Opérationnel' ? (
                        <CheckCircleIcon color="success" />
                      ) : controle.statut_nom === 'À réparer' ? (
                        <WarningIcon color="warning" />
                      ) : (
                        <ErrorIcon color="error" />
                      )}
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
            <Typography variant="h6" gutterBottom>
              Alertes urgentes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {/* Affiche un message si aucune alerte urgente */}
            {urgentAlertes.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography color="textSecondary">
                  Aucune alerte urgente
                </Typography>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mt: 2 }} />
              </Box>
            ) : (
              // Sinon, affiche la liste des alertes urgentes
              <List>
                {urgentAlertes.map((alerte) => (
                  <ListItem key={alerte.id} divider>
                    <ListItemIcon>
                      {/* Icône selon le statut de l'alerte */}
                      {alerte.statut === 'En retard' ? (
                        <ErrorIcon color="error" />
                      ) : (
                        <WarningIcon color="warning" />
                      )}
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

// Exporte le composant pour l'utiliser dans d'autres fichiers
export default Dashboard;

/*
RÉSUMÉ DU FICHIER Dashboard.tsx :

Ce composant est le tableau de bord principal de l'application GestEPI.
C'est la première page que voit l'utilisateur quand il se connecte.

RÔLE DANS L'APPLICATION :
1. Affiche une vue d'ensemble des données importantes :
   - Nombre total d'EPIs et de contrôles
   - Alertes en retard et à venir
2. Permet d'accéder rapidement aux fonctionnalités principales
3. Montre les derniers contrôles effectués
4. Met en évidence les alertes urgentes qui nécessitent une action

INTERACTIONS :
- Utilise les services (alerteService, epiService, controleService) pour récupérer les données
- Communique avec le back-end via ces services
- Utilise React Router pour la navigation entre les pages
- S'appuie sur Material-UI pour un design professionnel

POINTS CLÉS POUR L'ORAL :
1. Interface utilisateur intuitive et professionnelle
2. Gestion des données en temps réel
3. Mise en évidence des informations importantes
4. Navigation facile vers les autres fonctionnalités
5. Gestion des erreurs et des états de chargement
*/