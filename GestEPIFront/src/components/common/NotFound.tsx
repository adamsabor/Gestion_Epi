// ********** IMPORTS **********
// Import de React, nécessaire pour créer des composants
import React from 'react';
// Import des composants Material-UI pour créer l'interface
// Box : conteneur flexible pour la mise en page
// Typography : pour gérer les textes et titres
// Button : pour créer des boutons stylisés
import { Box, Typography, Button } from '@mui/material';
// Import du composant Link de React Router pour la navigation entre pages
import { Link } from 'react-router-dom';

// Composant NotFound : Page d'erreur 404 affichée quand une URL n'existe pas
// C'est une page simple et claire qui aide l'utilisateur à revenir à l'accueil
const NotFound = () => {
  return (
    // Box : Conteneur principal qui centre tout son contenu verticalement et horizontalement
    <Box
      display="flex"              // Utilise Flexbox pour la mise en page
      flexDirection="column"      // Empile les éléments verticalement
      alignItems="center"         // Centre les éléments horizontalement
      justifyContent="center"     // Centre les éléments verticalement
      minHeight="70vh"           // Prend au moins 70% de la hauteur de l'écran
    >
      {/* Affiche le code d'erreur 404 en grand */}
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>

      {/* Titre explicatif de l'erreur */}
      <Typography variant="h4" gutterBottom>
        Page non trouvée
      </Typography>

      {/* Message d'explication pour l'utilisateur */}
      <Typography variant="body1" color="textSecondary" paragraph>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </Typography>

      {/* Bouton qui permet de revenir à la page d'accueil */}
      <Button
        component={Link}          // Transforme le bouton en lien de navigation
        to="/"                    // Redirige vers la page d'accueil
        variant="contained"       // Style "plein" du bouton
        color="primary"          // Utilise la couleur principale du thème
        sx={{ mt: 2 }}          // Ajoute une marge en haut (margin-top)
      >
        Retour à l'accueil
      </Button>
    </Box>
  );
};

// Exporte le composant pour pouvoir l'utiliser dans d'autres fichiers
export default NotFound;

/*
RÉSUMÉ DU FICHIER NotFound.tsx :

Ce composant est la page d'erreur 404 de l'application GestEPI.
Il s'affiche automatiquement quand l'utilisateur essaie d'accéder à une URL qui n'existe pas.

PLACE DANS L'ARCHITECTURE :
- Situé dans components/common/ car c'est une page d'erreur générique
- Utilisé par le système de routage (React Router) quand aucune route ne correspond
- Dépend de Material-UI pour un design cohérent avec le reste de l'application

POINTS CLÉS POUR L'ORAL :
1. Gestion des erreurs utilisateur de manière élégante
2. Interface claire qui guide l'utilisateur
3. Utilisation de Material-UI pour un design professionnel
4. Intégration avec React Router pour la navigation
*/