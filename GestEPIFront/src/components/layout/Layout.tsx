// Import des dépendances React et du système de routage
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Outlet permet d'afficher les routes enfants, useNavigate permet la navigation

// Import des composants Material-UI pour créer l'interface
import { 
  AppBar,      // Barre de navigation en haut de l'écran
  Box,         // Conteneur flexible pour la mise en page
  Drawer,      // Menu latéral
  List,        // Liste pour le menu
  ListItemButton, // Bouton dans la liste
  ListItemIcon,   // Icône dans un élément de liste
  ListItemText,   // Texte dans un élément de liste
  Toolbar,        // Barre d'outils
  Typography,     // Texte stylisé
  Divider,        // Ligne de séparation
  Badge           // Badge pour afficher des notifications
} from '@mui/material';

// Import des icônes Material-UI utilisées dans le menu
import DashboardIcon from '@mui/icons-material/Dashboard';    // Icône tableau de bord
import InventoryIcon from '@mui/icons-material/Inventory';    // Icône inventaire
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icône contrôle
import WarningIcon from '@mui/icons-material/Warning';         // Icône alerte

// Import du hook personnalisé qui gère les alertes
import { useAlerts } from '../../hooks/useAlerts';

// Définition de la largeur du menu latéral en pixels
const drawerWidth = 240;

// Interface TypeScript qui définit les props du composant Layout
interface LayoutProps {
  children?: React.ReactNode; // Peut recevoir des composants enfants (optionnel)
}

// Composant Layout : Structure principale de l'application
// Il définit la mise en page globale avec un menu latéral et une zone de contenu
const Layout: React.FC<LayoutProps> = () => {
  const navigate = useNavigate(); // Hook pour la navigation entre les pages
  const { pendingControls } = useAlerts(); // Récupère le nombre de contrôles en attente

  // Configuration des éléments du menu
  // Chaque élément a un texte, une icône et un chemin de navigation
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'EPIs', icon: <InventoryIcon />, path: '/epis' },
    { 
      text: 'Contrôles', 
      icon: <CheckCircleIcon />, 
      path: '/controles/new' 
    },
    { 
      text: 'Alertes', 
      icon: // Affiche un badge avec le nombre d'alertes sur l'icône
        <Badge badgeContent={pendingControls.length} color="error">
          <WarningIcon />
        </Badge>, 
      path: '/alertes' 
    },
  ];

  // Structure du composant Layout
  return (
    <Box sx={{ display: 'flex' }}> {/* Conteneur principal en flexbox */}
      {/* Barre de navigation supérieure */}
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
          '& .MuiDrawer-paper': { // Style du papier du drawer
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> {/* Espace pour compenser la hauteur de la barre supérieure */}
        <Box sx={{ overflow: 'auto' }}> {/* Zone scrollable pour le menu */}
          <List>
            {/* Génération des éléments du menu à partir du tableau menuItems */}
            {menuItems.map((item) => (
              <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider /> {/* Ligne de séparation */}
        </Box>
      </Drawer>

      {/* Zone de contenu principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espace pour compenser la hauteur de la barre supérieure */}
        <Outlet /> {/* Affiche le contenu des routes enfants */}
      </Box>
    </Box>
  );
};

export default Layout; // Export du composant pour utilisation dans d'autres fichiers