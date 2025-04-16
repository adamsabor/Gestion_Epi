// ************************************************************************
// 🎓 COMPOSANT REACT NOTFOUND - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React est la bibliothèque de base pour créer des composants
// C'est la première chose à importer dans un fichier React
import React from 'react';

// Material-UI fournit des composants graphiques prêts à l'emploi
// Box : Conteneur flexible pour organiser les éléments (comme une div améliorée)
// Typography : Pour gérer les textes avec des styles cohérents
// Button : Pour créer des boutons interactifs stylés
import { Box, Typography, Button } from '@mui/material';

// Link de React Router permet de créer des liens entre les pages
// Au lieu de recharger la page, il met à jour l'URL et le contenu dynamiquement
import { Link } from 'react-router-dom';

// ********** COMPOSANT REACT **********
// Pour l'E6 : Un composant fonctionnel qui affiche une page d'erreur 404
// Il s'affiche quand l'utilisateur essaie d'accéder à une URL qui n'existe pas
const NotFound = () => {
  // ********** RENDU JSX **********
  // Pour l'E6 : Le JSX est comme du HTML amélioré qui peut inclure du JavaScript
  return (
    // Box est un conteneur qui utilise flexbox pour centrer son contenu
    // Pour l'E6 : Les props de style sont passées via l'objet sx
    <Box
      display="flex"              // Active flexbox pour le positionnement
      flexDirection="column"      // Empile les éléments verticalement
      alignItems="center"         // Centre horizontalement
      justifyContent="center"     // Centre verticalement
      minHeight="70vh"           // Hauteur minimum de 70% de l'écran
    >
      {/* Typography avec variant="h1" crée un titre principal */}
      {/* color="primary" utilise la couleur principale du thème */}
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>

      {/* variant="h4" crée un sous-titre plus petit */}
      {/* gutterBottom ajoute une marge en bas */}
      <Typography variant="h4" gutterBottom>
        Page non trouvée
      </Typography>

      {/* variant="body1" pour le texte normal */}
      {/* color="textSecondary" utilise une couleur de texte plus claire */}
      <Typography variant="body1" color="textSecondary" paragraph>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </Typography>

      {/* Button transformé en lien avec component={Link} */}
      {/* Pour l'E6 : to="/" définit la destination (page d'accueil) */}
      <Button
        component={Link}          // Transforme le bouton en lien
        to="/"                    // URL de destination
        variant="contained"       // Style "plein" du bouton
        color="primary"          // Couleur principale du thème
        sx={{ mt: 2 }}          // Marge supérieure de 16px (2 * 8px)
      >
        Retour à l'accueil
      </Button>
    </Box>
  );
};

// Export du composant pour l'utiliser ailleurs
export default NotFound;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Gère les erreurs 404 de manière professionnelle
// 2. Utilise Material-UI pour un design cohérent
// 3. Intègre React Router pour la navigation
// 4. Montre la gestion de l'expérience utilisateur