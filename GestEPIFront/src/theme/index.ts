// 📄 Fichier : index.ts (dans le dossier theme)
// 📌 Ce fichier fait partie du projet GestEPI (application de gestion des EPI pour cordistes)
// 🧩 Rôle : Configuration du thème visuel global de l'application avec Material-UI
// 🔄 Interagit avec : Composants React, Material-UI, App.tsx
// 👶 Niveau débutant : Ce fichier est comme un "livre de style" qui définit l'apparence de toute l'application !

// ===== IMPORTS =====
// Material-UI (MUI) est une bibliothèque de composants React prêts à l'emploi
// createTheme est l'outil qui nous permet de personnaliser l'apparence de ces composants
// C'est comme avoir une palette de peinture pour customiser notre maison !
import { createTheme } from '@mui/material/styles';

// ===== CRÉATION DU THÈME =====
// On utilise createTheme pour définir notre "livre de style" personnalisé
// C'est comme créer un guide de marque qui assure que toute l'application 
// aura une apparence cohérente et professionnelle
const theme = createTheme({
  // La "palette" est l'ensemble des couleurs utilisées dans l'application
  // C'est comme définir les couleurs officielles d'une marque
  palette: {
    // La couleur "primary" est la plus importante, elle définit l'identité visuelle
    // Elle sera utilisée pour les éléments principaux comme les boutons d'action
    // #1976d2 est un bleu professionnel qui inspire confiance
    primary: {
      main: '#1976d2', // Cette teinte de bleu est la couleur officielle de Material Design
    },
    // La couleur "secondary" est utilisée pour créer des contrastes et mettre en valeur
    // certains éléments comme les notifications ou les badges
    // #dc004e est un rose/rouge qui attire l'attention sans être agressif
    secondary: {
      main: '#dc004e', // Cette couleur crée un beau contraste avec le bleu primary
    },
  },
});

// On exporte notre thème pour pouvoir l'utiliser partout dans l'application
// Il sera importé dans App.tsx et appliqué via un ThemeProvider
// C'est comme diffuser notre "livre de style" à tous les composants
export default theme;