// Import de React, nécessaire pour créer des composants
import React from 'react';

// Import des composants Material-UI qui servent à construire le menu latéral
import { 
  Drawer,           // Le conteneur du menu latéral qui "glisse" depuis le côté
  List,             // Pour créer une liste verticale d'éléments
  ListItem,         // Un élément de la liste
  ListItemButton,   // Rend l'élément de liste cliquable
  ListItemIcon,     // Pour ajouter une icône à gauche du texte
  ListItemText,     // Le texte de l'élément de liste
  Toolbar,          // Espace en haut pour aligner avec la barre de navigation
  Divider           // Ligne de séparation entre les sections du menu
} from '@mui/material';

// Import du composant Link de React Router qui permet la navigation entre les pages
import { Link } from 'react-router-dom';

// Import des icônes Material-UI utilisées dans le menu
import DashboardIcon from '@mui/icons-material/Dashboard';    // Icône pour le tableau de bord
import InventoryIcon from '@mui/icons-material/Inventory';    // Icône pour la liste des EPIs
import AssignmentIcon from '@mui/icons-material/Assignment';  // Icône pour les contrôles
import WarningIcon from '@mui/icons-material/Warning';        // Icône pour les alertes

// Définition de la largeur fixe du menu latéral en pixels
const drawerWidth = 240;

// Composant Sidebar : Menu latéral de l'application
// Il contient les liens de navigation principaux
const Sidebar = () => {
  return (
    // Drawer : Menu latéral permanent (toujours visible)
    // Les styles sx permettent de :
    // - Définir la largeur
    // - Empêcher le menu de rétrécir
    // - Cacher le menu sur mobile (xs) et l'afficher sur tablette/desktop (sm)
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          display: { xs: 'none', sm: 'block' } 
        },
      }}
    >
      {/* Espace en haut pour aligner avec la barre de navigation */}
      <Toolbar />

      {/* Liste des éléments du menu */}
      <List>
        {/* Élément "Tableau de bord" */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItemButton>
        </ListItem>
        
        {/* Élément "Liste des EPIs" */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/epis">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Liste des EPIs" />
          </ListItemButton>
        </ListItem>
        
        {/* Ligne de séparation avec marges verticales */}
        <Divider sx={{ my: 1 }} />
        
        {/* Élément "Contrôles" */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/controles">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Contrôles" />
          </ListItemButton>
        </ListItem>
        
        {/* Élément "Alertes" */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/alertes">
            <ListItemIcon>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText primary="Alertes" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

// Export du composant pour l'utiliser dans le Layout principal
export default Sidebar; 