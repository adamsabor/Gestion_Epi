// ********** IMPORTS **********
// On importe createTheme depuis Material-UI (MUI)
// Cette fonction permet de créer un thème personnalisé pour notre application
import { createTheme } from '@mui/material/styles';

// ********** CRÉATION DU THÈME **********
// On crée un thème personnalisé qui sera utilisé dans toute l'application
// Ce thème définit les couleurs principales qui donnent une identité visuelle cohérente
const theme = createTheme({
  // La palette contient toutes les couleurs du thème
  palette: {
    // Couleur primaire : utilisée pour les éléments principaux 
    // (boutons importants, en-têtes...)
    primary: {
      main: '#1976d2', // Un bleu Material Design standard
    },
    // Couleur secondaire : utilisée pour les éléments d'accent
    // (boutons secondaires, badges...)
    secondary: {
      main: '#dc004e', // Un rose/rouge pour le contraste
    },
  },
});

// On exporte le thème pour qu'il puisse être utilisé dans toute l'application
// Il sera importé dans le composant racine (App.tsx) et appliqué via ThemeProvider
export default theme; 