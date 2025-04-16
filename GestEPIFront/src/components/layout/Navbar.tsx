// ************************************************************************
// 🎓 COMPOSANT REACT NAVBAR - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React pour créer notre composant
import React from 'react';

// Composants Material-UI pour l'interface graphique
// AppBar : barre de navigation supérieure
// Toolbar : conteneur horizontal pour organiser les éléments
// Typography : texte stylé
// IconButton : bouton avec icône
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

// Icône de menu "hamburger" de Material-UI
import MenuIcon from '@mui/icons-material/Menu';

// ********** COMPOSANT REACT **********
// Pour l'E6 : Composant qui crée la barre de navigation supérieure
// C'est un composant fonctionnel (pas de state) qui retourne du JSX
const Navbar = () => {
  // Pour l'E6 : Le composant retourne la structure JSX de la navbar
  return (
    // AppBar avec position fixe pour rester visible lors du défilement
    // zIndex élevé pour être au-dessus des autres éléments
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      {/* Toolbar organise horizontalement les éléments */}
      <Toolbar>
        {/* IconButton pour le menu mobile 
            Pour l'E6 : Bouton qui s'affiche uniquement sur mobile
            color="inherit" : hérite la couleur du parent
            edge="start" : aligné à gauche
            sx={{ ... }} : styles personnalisés avec Material-UI */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          {/* Icône du menu hamburger */}
          <MenuIcon />
        </IconButton>

        {/* Typography pour le titre de l'application
            Pour l'E6 : Utilise les styles prédéfinis de Material-UI
            variant="h6" : taille de titre niveau 6
            noWrap : pas de retour à la ligne */}
        <Typography variant="h6" noWrap component="div">
          GestEPI - Gestion des Équipements de Protection Individuelle
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// Export du composant pour utilisation dans d'autres fichiers
export default Navbar;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Crée la barre de navigation principale de l'application
// 2. Utilise Material-UI pour un design professionnel
// 3. Est responsive (s'adapte au mobile avec le menu hamburger)
// 4. Suit les bonnes pratiques React (composant fonctionnel)
// 5. Intègre l'accessibilité (aria-label)