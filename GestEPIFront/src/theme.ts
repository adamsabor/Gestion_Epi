// 📄 Fichier : theme.ts
// 📌 Ce fichier fait partie du projet GestEPI (application de gestion des EPI pour cordistes)
// 🧩 Rôle : Définit le thème visuel global de l'application (couleurs, polices, styles)
// 🔄 Interagit avec : Material UI, composants React, App.tsx
// 👶 Niveau débutant : Ce fichier est comme le "guide de style" de notre application !

// ===== IMPORTS =====
// On importe createTheme depuis Material UI, c'est l'outil qui nous permet 
// de créer un thème personnalisé. C'est comme avoir un pinceau magique pour peindre notre app !
import { createTheme } from '@mui/material/styles';

// ===== CRÉATION DU THÈME =====
// On crée notre thème personnalisé avec createTheme
// C'est comme définir une "recette" pour l'apparence de notre application
const theme = createTheme({
  // La palette définit toutes les couleurs de notre application
  // C'est comme choisir les couleurs pour peindre une maison
  palette: {
    // Couleur principale : utilisée pour les éléments importants (boutons, liens, etc.)
    // Le bleu #1976d2 est une couleur professionnelle qui inspire confiance
    primary: {
      main: '#1976d2', // Cette teinte de bleu est la couleur signature de notre app
    },
    // Couleur secondaire : pour les accents et actions secondaires
    // Le rose/rouge #dc004e attire l'attention sur les éléments importants
    secondary: {
      main: '#dc004e', // Utilisé pour les boutons d'action, alertes, etc.
    },
  },

  // La typographie définit tout ce qui concerne le texte
  // C'est comme choisir les polices d'écriture pour un document important
  typography: {
    // On définit une liste de polices par ordre de préférence
    // Si la première n'est pas disponible, on passe à la suivante
    fontFamily: [
      '-apple-system',         // Police optimisée pour Mac
      'BlinkMacSystemFont',    // Version spéciale pour Chrome sur Mac
      '"Segoe UI"',           // Police moderne de Windows
      'Roboto',               // Police par défaut de Material UI - très lisible !
      '"Helvetica Neue"',     // Version moderne de Helvetica
      'Arial',                // Police universelle de secours
      'sans-serif',           // Police générique sans empattements
      '"Apple Color Emoji"',  // Support des émojis sur Mac
      '"Segoe UI Emoji"',     // Support des émojis sur Windows
      '"Segoe UI Symbol"',    // Pour les caractères spéciaux
    ].join(','),  // On joint toutes les polices avec des virgules pour le CSS
  },
});

// On exporte notre thème pour pouvoir l'utiliser partout dans l'application
// C'est comme partager notre "guide de style" avec toute l'équipe
export default theme;

/* ===== RÉSUMÉ DU FICHIER =====
Ce fichier theme.ts est crucial car :
1. Il centralise tous les styles visuels de l'application
2. Il assure une cohérence visuelle sur toutes les pages
3. Il facilite les changements de style globaux
4. Il optimise l'expérience utilisateur sur différents appareils

🎨 C'est comme avoir un guide de décoration complet pour une maison :
- Les couleurs sont choisies pour leur signification
- Les polices sont sélectionnées pour leur lisibilité
- Tout est pensé pour créer une expérience utilisateur agréable
*/