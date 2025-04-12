// ********** IMPORTS **********
// React : La bibliothèque de base pour créer notre interface
import React, { ReactNode, useState } from 'react';
// Material UI : Composants pour l'interface utilisateur
import { 
  AppBar,        // Barre de navigation en haut
  Box,           // Conteneur flexible
  CssBaseline,   // Réinitialisation des styles CSS
  Drawer,        // Menu latéral
  IconButton,    // Bouton avec icône
  List,          // Liste d'éléments
  ListItem,      // Élément de liste
  ListItemIcon,  // Icône dans un élément de liste
  ListItemText,  // Texte dans un élément de liste
  Toolbar,       // Barre d'outils
  Typography     // Texte stylisé
} from '@mui/material';
// Icônes pour le menu
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import WarningIcon from '@mui/icons-material/Warning';
// React Router : Pour la navigation
import { Outlet, useNavigate } from 'react-router-dom';

// ********** COMPOSANT LAYOUT **********
// Ce composant définit la structure de base de notre application
// C'est comme le "squelette" qui contient tous les autres composants
const Layout: React.FC = () => {
  // État pour gérer l'ouverture/fermeture du menu latéral
  const [open, setOpen] = useState(false);
  // Hook pour la navigation entre les pages
  const navigate = useNavigate();

  // Fonction pour basculer l'état du menu
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Liste des éléments du menu
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'EPIs', icon: <SafetyDividerIcon />, path: '/epis' },
    { text: 'Alertes', icon: <WarningIcon />, path: '/alertes' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barre de navigation en haut */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="ouvrir le menu"
            edge="start"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GestEPI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu latéral */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                toggleDrawer();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenu principal de l'application */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espace pour la barre de navigation */}
        <Outlet /> {/* Ici s'affiche le contenu de chaque page */}
      </Box>
    </Box>
  );
};

export default Layout;

/*
RÉSUMÉ DU FICHIER layout.tsx :
Ce fichier est le "CADRE" de notre application. C'est comme le squelette qui maintient tout ensemble !

1. STRUCTURE :
   - Une barre de navigation en haut (AppBar)
   - Un menu latéral qui peut s'ouvrir/fermer (Drawer)
   - Une zone principale pour le contenu (Box)

2. FONCTIONNALITÉS :
   - Navigation entre les différentes pages
   - Menu responsive qui s'adapte aux différentes tailles d'écran
   - Structure cohérente pour toutes les pages

3. COMPOSANTS IMPORTANTS :
   - AppBar : La barre en haut avec le titre et le bouton menu
   - Drawer : Le menu latéral qui contient les liens vers les différentes pages
   - Outlet : L'endroit où s'affiche le contenu spécifique à chaque page

4. INTERACTIONS :
   - Communique avec React Router pour la navigation
   - Utilise Material UI pour un design professionnel
   - Gère l'état du menu (ouvert/fermé)

C'est comme la structure d'une maison : elle définit où vont les murs, les portes et les fenêtres, 
mais le contenu (meubles, décoration) change selon la pièce !
*/
