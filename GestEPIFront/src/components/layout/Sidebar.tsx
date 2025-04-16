// ************************************************************************
// 🎓 COMPOSANT REACT SIDEBAR - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React pour créer notre composant
import React from 'react';

// Composants Material-UI pour l'interface graphique
// Drawer : menu latéral coulissant
// List : liste d'éléments verticale
// ListItem : élément de liste individuel
// ListItemButton : rend l'élément cliquable
// ListItemIcon : zone pour l'icône
// ListItemText : zone pour le texte
// Toolbar : espace en haut du menu
// Divider : ligne de séparation
import { 
  Drawer,
  List,
  ListItem, 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider
} from '@mui/material';

// Link de React Router pour la navigation
// Pour l'E6 : Permet de naviguer sans recharger la page
// Équivalent en PHP : header('Location: /page')
import { Link } from 'react-router-dom';

// Icônes Material-UI pour le menu
// Pour l'E6 : Améliore l'expérience utilisateur avec des repères visuels
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningIcon from '@mui/icons-material/Warning';

// Largeur fixe du menu en pixels
// Pour l'E6 : Constante réutilisable pour maintenir la cohérence du design
const drawerWidth = 240;

// ********** COMPOSANT REACT **********
// Pour l'E6 : Composant fonctionnel qui crée le menu latéral
// Pas de state ni de hooks car c'est un composant statique
const Sidebar = () => {
  // ********** RENDU DU COMPOSANT **********
  return (
    // Drawer : conteneur principal du menu latéral
    // variant="permanent" : toujours visible (pas de menu hamburger)
    // sx : styles personnalisés avec Material-UI
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          // Responsive : caché sur mobile (xs), visible sur desktop (sm)
          display: { xs: 'none', sm: 'block' } 
        },
      }}
    >
      {/* Toolbar vide pour aligner avec la navbar */}
      <Toolbar />

      {/* Liste des éléments du menu */}
      <List>
        {/* Tableau de bord - Page d'accueil */}
        {/* Pour l'E6 : component={Link} transforme le bouton en lien */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItemButton>
        </ListItem>
        
        {/* Liste des EPIs */}
        {/* Pour l'E6 : Route vers /epis qui affiche EPIList.tsx */}
        {/* En SQL : SELECT * FROM epis */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/epis">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Liste des EPIs" />
          </ListItemButton>
        </ListItem>
        
        {/* Séparateur visuel */}
        <Divider sx={{ my: 1 }} />
        
        {/* Contrôles */}
        {/* Pour l'E6 : Route vers /controles qui affiche ControlList.tsx */}
        {/* En SQL : SELECT * FROM controles */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/controles">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Contrôles" />
          </ListItemButton>
        </ListItem>
        
        {/* Alertes */}
        {/* Pour l'E6 : Route vers /alertes qui affiche AlertList.tsx */}
        {/* En SQL : SELECT * FROM controles WHERE date_prochaine < NOW() */}
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

export default Sidebar;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Crée le menu de navigation principal de l'application
// 2. Utilise React Router pour la navigation entre les pages
// 3. Intègre Material-UI pour une interface professionnelle
// 4. Est responsive (s'adapte aux différentes tailles d'écran)
// 5. Structure clairement les différentes sections de l'application