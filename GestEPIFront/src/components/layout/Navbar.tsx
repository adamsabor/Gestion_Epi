// ********** IMPORTS **********
// Import de React, nécessaire pour créer des composants
import React from 'react';

// Import des composants Material-UI pour créer la barre de navigation
// - AppBar : barre de navigation en haut de l'écran
// - Toolbar : conteneur horizontal pour organiser les éléments
// - Typography : composant pour gérer les textes de façon cohérente
// - IconButton : bouton contenant une icône
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

// Import de l'icône de menu "hamburger" (les 3 barres horizontales)
import MenuIcon from '@mui/icons-material/Menu';

// ********** COMPOSANT NAVBAR **********
// Ce composant représente la barre de navigation principale de l'application
// Il est affiché en haut de toutes les pages
const Navbar = () => {
  return (
    // AppBar avec position fixe (reste visible même quand on scrolle)
    // zIndex élevé pour s'assurer qu'elle reste au-dessus des autres éléments
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      {/* Toolbar contient tous les éléments de la barre de navigation */}
      <Toolbar>
        {/* Bouton du menu hamburger qui n'apparaît que sur mobile (display: none sur desktop) */}
        <IconButton
          color="inherit" // Hérite la couleur du thème
          aria-label="open drawer" // Label pour l'accessibilité
          edge="start" // Aligné au début de la barre
          sx={{ mr: 2, display: { sm: 'none' } }} // Marge droite de 2, caché sur desktop
        >
          <MenuIcon /> {/* Icône du menu hamburger */}
        </IconButton>

        {/* Titre de l'application */}
        {/* noWrap empêche le texte de passer à la ligne */}
        <Typography variant="h6" noWrap component="div">
          GestEPI - Gestion des Équipements de Protection Individuelle
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// Export du composant pour pouvoir l'utiliser dans d'autres fichiers
export default Navbar; 