// ************************************************************************
// 🎓 COMPOSANT REACT LAYOUT - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React et outils de navigation
// Outlet : zone où s'affichent les composants enfants
// Navigate : redirige l'utilisateur
// useNavigate : hook pour naviguer entre les pages
import React from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';

// Composants Material-UI pour l'interface graphique
// AppBar : barre de navigation supérieure
// Drawer : menu latéral
// Box : conteneur flexible
// List : liste d'éléments
// etc.
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Badge,
} from '@mui/material';

// Icônes Material-UI pour le menu
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LogoutIcon from '@mui/icons-material/Logout';

// Hook personnalisé qui gère les alertes
// Pour l'E6 : Vérifie en BDD les contrôles à effectuer
// En SQL : SELECT * FROM controles WHERE date_prochaine < NOW()
import { useAlerts } from '../../hooks/useAlerts';

// Largeur fixe du menu en pixels
const drawerWidth = 240;

// ********** COMPOSANT REACT **********
// Pour l'E6 : Composant qui définit la structure globale de l'application
const Layout: React.FC = () => {
  // Hook pour la navigation
  // Pour l'E6 : Permet de rediriger l'utilisateur (ex: déconnexion)
  const navigate = useNavigate();
  
  // Hook personnalisé qui récupère les contrôles en attente
  // Pour l'E6 : Utilisé pour afficher un badge avec le nombre d'alertes
  const { pendingControls } = useAlerts();

  // ********** VÉRIFICATION AUTHENTIFICATION **********
  // Pour l'E6 : Vérifie si l'utilisateur est connecté
  // Si non connecté (pas de token), redirige vers /login
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ********** FONCTION DE DÉCONNEXION **********
  // Pour l'E6 : Supprime les infos utilisateur et redirige
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ********** CONFIGURATION DU MENU **********
  // Pour l'E6 : Définit les éléments du menu avec leurs propriétés
  // text : texte affiché
  // icon : icône Material-UI
  // path : URL de destination
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'EPIs', icon: <InventoryIcon />, path: '/epis' },
    { text: 'Contrôles', icon: <CheckCircleIcon />, path: '/controles/new' },
    {
      text: 'Alertes',
      // Badge qui affiche le nombre d'alertes
      icon: (
        <Badge badgeContent={pendingControls.length} color="error">
          <WarningIcon />
        </Badge>
      ),
      path: '/alertes',
    },
    {
      text: 'Déconnexion',
      icon: <LogoutIcon />,
      path: '/login',
      onClick: handleLogout,
    },
  ];

  // ********** RENDU DU COMPOSANT **********
  // Pour l'E6 : Structure JSX qui définit la mise en page
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barre supérieure fixe */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            GestEPI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu latéral permanent */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {/* Liste des éléments du menu */}
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  // Navigation ou déconnexion selon l'élément
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Zone de contenu principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Définit la structure globale de l'application (menu + contenu)
// 2. Gère l'authentification (redirection si non connecté)
// 3. Utilise React Router pour la navigation
// 4. Intègre Material-UI pour une interface professionnelle
// 5. Affiche les alertes de contrôles à effectuer
