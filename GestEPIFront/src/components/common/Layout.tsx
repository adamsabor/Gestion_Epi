// ********** IMPORTS **********
// ReactNode permet de typer les éléments enfants (children) qu'on peut passer à un composant
import { ReactNode } from 'react';

// Import des composants Material-UI nécessaires pour créer la mise en page
// Box : conteneur flexible, AppBar : barre de navigation en haut
// Drawer : menu latéral, List/ListItem... : éléments de liste pour le menu
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// Hook de React Router pour la navigation entre les pages
import { useNavigate } from 'react-router-dom';

// Import des icônes Material-UI qui seront utilisées dans le menu
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Largeur fixe du menu latéral en pixels
const drawerWidth = 240;

// Interface TypeScript qui définit les props que notre Layout peut recevoir
// children représente tout le contenu qui sera placé dans la mise en page
interface LayoutProps {
  children: ReactNode;
}

// Composant Layout : C'est la structure principale de l'application
// Il crée une mise en page avec une barre de navigation en haut et un menu latéral
const Layout = ({ children }: LayoutProps) => {
  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  // Configuration des éléments du menu
  // Chaque élément a un texte, une icône et un chemin de destination
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'EPIs', icon: <InventoryIcon />, path: '/epis' },
    { text: 'Contrôles', icon: <CheckCircleIcon />, path: '/controls' },
  ];

  return (
    // Conteneur principal qui utilise Flexbox pour la mise en page
    <Box sx={{ display: 'flex' }}>
      {/* Barre de navigation supérieure fixe */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            GestEPI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu latéral permanent (toujours visible) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {  // Style du papier du drawer
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> {/* Espace pour compenser la hauteur de la barre supérieure */}
        {/* Liste des éléments du menu */}
        <List>
          {/* Parcourt et affiche chaque élément du menu */}
          {menuItems.map((item) => (
            <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Zone principale de contenu */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espace pour compenser la hauteur de la barre supérieure */}
        {children} {/* Affiche le contenu spécifique de chaque page */}
      </Box>
    </Box>
  );
};

// Exporte le composant pour l'utiliser dans toute l'application
export default Layout;

/*
RÉSUMÉ DU FICHIER Layout.tsx :

Ce composant est la structure de base de toute l'application GestEPI.
Il crée une mise en page cohérente avec :
- Une barre de navigation en haut
- Un menu latéral permanent
- Une zone principale où s'affiche le contenu des pages

PLACE DANS L'ARCHITECTURE :
- Situé dans components/common/ car c'est un composant utilisé par toutes les pages
- Enveloppe toutes les autres pages de l'application
- Gère la navigation principale entre les différentes sections

POINTS CLÉS POUR L'ORAL :
1. Structure commune à toutes les pages pour une expérience utilisateur cohérente
2. Utilisation de Material-UI pour un design professionnel
3. Navigation fluide entre les pages grâce à React Router
4. Organisation claire du code avec TypeScript
*/