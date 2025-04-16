// ************************************************************************
// 🎓 COMPOSANT REACT CONFIRMDIALOG - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React est la bibliothèque de base pour créer des composants
// C'est la première chose à importer dans un fichier React
import React from 'react';

// Material-UI fournit des composants graphiques prêts à l'emploi
// Dialog : Une fenêtre modale qui s'affiche par-dessus l'application
// DialogActions : Conteneur pour les boutons d'action
// DialogContent : Zone principale du contenu
// DialogContentText : Le texte du message
// DialogTitle : La barre de titre en haut
// Button : Les boutons d'action (Confirmer/Annuler)
import { 
  Button,
  Dialog,
  DialogActions, 
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : TypeScript permet de définir précisément la structure des props
// C'est comme un contrat qui garantit que le composant reçoit les bonnes données
interface ConfirmDialogProps {
  open: boolean;      // true = dialogue visible, false = caché
  title: string;      // Titre affiché en haut du dialogue
  content: string;    // Message de confirmation
  onConfirm: () => void;  // Fonction exécutée si l'utilisateur confirme
  onCancel: () => void;   // Fonction exécutée si l'utilisateur annule
}

// ********** COMPOSANT REACT **********
// FC = Function Component (composant fonctionnel)
// Les props sont déstructurées directement dans les paramètres
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  open, 
  title, 
  content, 
  onConfirm, 
  onCancel 
}) => {
  // Le composant retourne du JSX (mélange de HTML et JavaScript)
  return (
    // Dialog est le conteneur principal
    // open={open} contrôle la visibilité
    // onClose est appelé quand l'utilisateur ferme la fenêtre
    <Dialog
      open={open}
      onClose={onCancel}
      // aria-* sont des attributs pour l'accessibilité
      // Ils aident les lecteurs d'écran à comprendre la structure
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      {/* DialogTitle affiche le titre passé en prop */}
      <DialogTitle id="confirm-dialog-title">
        {title}
      </DialogTitle>

      {/* DialogContent contient le message principal */}
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>

      {/* DialogActions contient les boutons alignés à droite */}
      <DialogActions>
        {/* Bouton Annuler : appelle onCancel quand cliqué */}
        <Button onClick={onCancel} color="primary">
          Annuler
        </Button>
        {/* Bouton Confirmer : appelle onConfirm quand cliqué */}
        {/* variant="contained" donne un style rempli au bouton */}
        {/* autoFocus fait que ce bouton a le focus par défaut */}
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Export du composant pour l'utiliser ailleurs
export default ConfirmDialog;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Crée un composant réutilisable pour les confirmations
// 2. Utilise TypeScript pour la sécurité du code
// 3. Implémente une interface utilisateur professionnelle
// 4. Suit les bonnes pratiques d'accessibilité
//
// Points techniques à souligner :
// - Architecture React moderne (composant fonctionnel)
// - Typage strict avec TypeScript
// - Utilisation de Material-UI
// - Props et événements React