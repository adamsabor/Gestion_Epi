// ************************************************************************
// 🎓 COMPOSANT REACT LAYOUT - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// ReactNode est un type TypeScript qui représente n'importe quel élément React valide
// On l'utilise pour typer les "children" qui peuvent être du texte, des composants, etc.
import { ReactNode } from 'react';

// Material-UI fournit des composants graphiques prêts à l'emploi
// Box : Conteneur flexible (comme une div améliorée)
// AppBar : Barre de navigation en haut de l'application
// Drawer : Menu latéral coulissant
// List/ListItem : Pour créer des listes structurées
import { 
  Box, AppBar, Toolbar, Typography, 
  Drawer, List, ListItemButton, 
  ListItemIcon, ListItemText 
} from '@mui/material';

// useNavigate est un hook de React Router pour la navigation
// Il permet de changer de page sans recharger l'application
import { useNavigate } from 'react-router-dom';

// Icônes Material-UI pour le menu
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

// ********** CONSTANTES **********
// Largeur fixe du menu latéral en pixels
const drawerWidth = 240;

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : Cette interface définit la structure des props du composant
// children est de type ReactNode et contiendra le contenu des pages
interface LayoutProps {
  children: ReactNode;
}

// ********** COMPOSANT REACT **********
// Layout est un composant qui enveloppe toutes les pages de l'application
// Il fournit la structure commune : barre du haut + menu latéral + zone de contenu
const Layout = ({ children }: LayoutProps) => {
  // Hook useNavigate pour la navigation
  // Exemple : navigate('/epis') redirige vers la page des EPIs
  const navigate = useNavigate();

  // Configuration du menu principal
  // Chaque élément a un texte, une icône et un chemin de destination
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'EPIs', icon: <InventoryIcon />, path: '/epis' },
    { text: 'Contrôles', icon: <CheckCircleIcon />, path: '/controls' },
  ];

  // ********** RENDU JSX **********
  return (
    // Box principal avec flexbox pour le layout
    // display: 'flex' permet d'avoir le menu à gauche et le contenu à droite
    <Box sx={{ display: 'flex' }}>
      {/* AppBar : Barre de navigation supérieure fixe */}
      {/* zIndex élevé pour rester au-dessus des autres éléments */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            GestEPI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer : Menu latéral permanent */}
      {/* variant="permanent" signifie qu'il est toujours visible */}
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
        {/* Espace pour compenser la hauteur de l'AppBar */}
        <Toolbar />
        
        {/* Liste des éléments du menu */}
        <List>
          {/* Map sur menuItems pour générer les boutons du menu */}
          {/* Chaque clic déclenche une navigation via navigate() */}
          {menuItems.map((item) => (
            <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Zone principale de contenu */}
      {/* flexGrow: 1 fait grandir cette zone pour occuper l'espace disponible */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espace pour l'AppBar */}
        {children} {/* Affichage du contenu de la page active */}
      </Box>
    </Box>
  );
};

// Export du composant pour l'utiliser dans App.tsx
export default Layout;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Définit la structure visuelle commune à toute l'application
// 2. Gère la navigation principale via React Router
// 3. Utilise Material-UI pour un design professionnel
// 4. Implémente un layout responsive avec flexbox
// 5. Utilise TypeScript pour le typage des props
//
// Points techniques à souligner :
// - Architecture React moderne (hooks, composants fonctionnels)
// - Typage TypeScript
// - Utilisation de Material-UI
// - Navigation avec React Router
// - Structure de code maintenable et réutilisable