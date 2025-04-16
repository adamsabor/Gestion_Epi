// 📄 Fichier : layout.tsx
// 📌 Ce fichier fait partie du projet GestEPI (application de gestion des EPI pour cordistes)
// 🧩 Rôle : Définit la structure visuelle commune à toutes les pages (menu, en-tête, etc.)
// 🔄 Interagit avec : App.tsx, React Router, Material UI, autres composants React
// 👶 Niveau débutant : Ce fichier est comme le "plan" de notre site, il définit où va chaque élément !

// ===== IMPORTS =====
// React est nécessaire pour créer nos composants. ReactNode permet de typer les éléments enfants,
// useState permet de gérer l'état local (comme un interrupteur on/off pour le menu)
import React, { ReactNode, useState } from 'react';

// Material UI nous fournit des composants déjà stylisés. C'est comme une boîte à outils de pièces
// détachées pour construire notre interface :
import { 
  AppBar,        // Barre de navigation en haut, comme l'en-tête d'un document
  Box,           // Un conteneur flexible, comme une boîte qu'on peut ajuster
  CssBaseline,   // Réinitialise les styles par défaut du navigateur pour plus de cohérence
  Drawer,        // Menu latéral qui peut s'ouvrir/se fermer, comme un tiroir
  IconButton,    // Bouton spécial pour les icônes, plus joli qu'un bouton standard
  List,          // Permet de créer des listes structurées, comme une liste de courses
  ListItem,      // Un élément dans une liste, comme une ligne dans la liste
  ListItemIcon,  // L'icône à gauche d'un élément de liste
  ListItemText,  // Le texte d'un élément de liste
  Toolbar,       // Conteneur pour organiser les éléments dans la barre de navigation
  Typography     // Composant pour gérer le texte de façon cohérente
} from '@mui/material';

// Importation des icônes qui seront utilisées dans le menu
// Ces icônes viennent de la bibliothèque Material Icons
import MenuIcon from '@mui/icons-material/Menu';           // ☰ Icône du menu "hamburger"
import DashboardIcon from '@mui/icons-material/Dashboard'; // 📊 Icône pour le tableau de bord
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider'; // 🛡️ Icône pour les EPIs
import WarningIcon from '@mui/icons-material/Warning';     // ⚠️ Icône pour les alertes

// React Router permet la navigation entre les pages
// Outlet affiche le contenu de la route active, useNavigate permet de changer de page
import { Outlet, useNavigate } from 'react-router-dom';

// ===== DÉFINITION DU COMPOSANT =====
// Layout est un composant fonctionnel TypeScript (FC = Function Component)
// Il sert de structure commune à toutes les pages
const Layout: React.FC = () => {
  // Gestion de l'état du menu (ouvert/fermé) avec useState
  // open = état actuel, setOpen = fonction pour modifier l'état
  const [open, setOpen] = useState(false);
  
  // Hook de navigation de React Router
  // Permet de changer de page programmatiquement
  const navigate = useNavigate();

  // Fonction qui inverse l'état du menu (ouvert ↔ fermé)
  // Appelée quand on clique sur le bouton du menu
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Configuration des éléments du menu
  // Chaque élément a un texte, une icône et un chemin de navigation
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'EPIs', icon: <SafetyDividerIcon />, path: '/epis' },
    { text: 'Alertes', icon: <WarningIcon />, path: '/alertes' },
  ];

  // Structure visuelle du composant
  return (
    // Box principal qui contient tout le layout
    // display: 'flex' permet une mise en page flexible
    <Box sx={{ display: 'flex' }}>
      {/* Barre de navigation fixe en haut de l'écran */}
      <AppBar position="fixed">
        <Toolbar>
          {/* Bouton pour ouvrir/fermer le menu */}
          <IconButton
            color="inherit"     // Hérite la couleur du parent
            aria-label="ouvrir le menu"  // Pour l'accessibilité
            edge="start"        // Aligné à gauche
            onClick={toggleDrawer}  // Action au clic
          >
            <MenuIcon />
          </IconButton>
          {/* Titre de l'application */}
          <Typography variant="h6" noWrap component="div">
            GestEPI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu latéral (Drawer) qui s'ouvre temporairement */}
      <Drawer
        variant="temporary"  // Le menu se ferme quand on clique ailleurs
        open={open}         // État ouvert/fermé
        onClose={toggleDrawer}  // Action à la fermeture
      >
        {/* Liste des éléments du menu */}
        <List>
          {/* On crée un élément de liste pour chaque item du menu */}
          {menuItems.map((item) => (
            <ListItem
              button          // Rend l'élément cliquable
              key={item.text} // Clé unique pour React
              onClick={() => {
                navigate(item.path);  // Change de page
                toggleDrawer();       // Ferme le menu
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Zone principale de contenu */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espace pour éviter que le contenu soit caché sous la barre de navigation */}
        <Outlet /> {/* Ici s'affiche le contenu spécifique à chaque route */}
      </Box>
    </Box>
  );
};

// On exporte le composant pour pouvoir l'utiliser ailleurs
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
