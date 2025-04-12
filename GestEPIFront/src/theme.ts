// ********** IMPORTS **********
// Material UI : Pour créer notre thème personnalisé
import { createTheme } from '@mui/material/styles';

// ********** DÉFINITION DU THÈME **********
// Ce fichier définit l'apparence visuelle de notre application
// C'est comme la "décoration" de notre application
const theme = createTheme({
  // Palette de couleurs
  palette: {
    // Couleur principale (bleu)
    primary: {
      main: '#1976d2', // Un bleu professionnel
    },
    // Couleur secondaire (rose/rouge)
    secondary: {
      main: '#dc004e', // Pour les accents et les actions importantes
    },
  },
  // Configuration des polices de caractères
  typography: {
    // Liste des polices à utiliser, dans l'ordre de préférence
    fontFamily: [
      '-apple-system',    // Pour Mac
      'BlinkMacSystemFont', // Pour Chrome sur Mac
      '"Segoe UI"',       // Pour Windows
      'Roboto',           // Police par défaut de Material UI
      '"Helvetica Neue"', // Alternative moderne
      'Arial',            // Police de secours
      'sans-serif',       // Police générique de secours
      '"Apple Color Emoji"',    // Pour les emojis sur Mac
      '"Segoe UI Emoji"',       // Pour les emojis sur Windows
      '"Segoe UI Symbol"',      // Pour les symboles spéciaux
    ].join(','), // Transforme le tableau en une seule chaîne de caractères
  },
});

// On exporte notre thème pour l'utiliser dans toute l'application
export default theme;

/*
RÉSUMÉ DU FICHIER theme.ts :
Ce fichier est le "STYLE" de notre application. C'est comme la charte graphique qui définit son apparence !

1. RÔLE PRINCIPAL :
   - Définit les couleurs principales de l'application
   - Configure les polices de caractères
   - Assure une apparence cohérente dans toute l'application

2. ÉLÉMENTS CLÉS :
   - Palette de couleurs :
     * primary : Couleur principale (bleu)
     * secondary : Couleur d'accent (rose/rouge)
   - Typographie :
     * Liste de polices de secours
     * Support des emojis et symboles

3. AVANTAGES :
   - Cohérence visuelle
   - Facilité de maintenance
   - Support multi-plateforme

4. UTILISATION :
   - Ce thème est appliqué à toute l'application via ThemeProvider
   - Tous les composants Material UI utilisent ces styles par défaut
   - Facilite les changements de style globaux

C'est comme la décoration d'une maison : elle définit les couleurs des murs, 
le style des meubles, et crée une ambiance cohérente dans tout l'espace !
*/ 