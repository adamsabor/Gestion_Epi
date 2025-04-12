// Import de React qui est nécessaire pour créer des composants
import React from 'react';
// Import des composants Material-UI nécessaires pour créer une boîte de dialogue
// Ces composants permettent de créer une fenêtre modale professionnelle et responsive
import { 
  Button,        // Bouton standard
  Dialog,        // La fenêtre modale elle-même
  DialogActions, // Zone des boutons d'action (bas de la modale)
  DialogContent, // Zone principale du contenu
  DialogContentText, // Texte dans la zone de contenu
  DialogTitle    // Titre de la modale
} from '@mui/material';

// Interface TypeScript qui définit la structure des props que notre composant va recevoir
// C'est comme un contrat qui garantit que toutes les propriétés nécessaires seront fournies
interface ConfirmDialogProps {
  open: boolean;      // Contrôle si la modale est visible ou non
  title: string;      // Le titre qui sera affiché en haut
  content: string;    // Le message de confirmation
  onConfirm: () => void;  // Fonction appelée quand l'utilisateur confirme
  onCancel: () => void;   // Fonction appelée quand l'utilisateur annule
}

// Composant ConfirmDialog : Une boîte de dialogue de confirmation réutilisable
// FC = Function Component, un composant React moderne sous forme de fonction
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  open, 
  title, 
  content, 
  onConfirm, 
  onCancel 
}) => {
  return (
    // Le composant Dialog est la base de notre modale
    <Dialog
      open={open}           // Contrôle la visibilité
      onClose={onCancel}    // Appelé quand on ferme la modale (clic à l'extérieur/Echap)
      aria-labelledby="confirm-dialog-title"        // Accessibilité : lie le titre
      aria-describedby="confirm-dialog-description" // Accessibilité : lie la description
    >
      {/* Titre de la modale */}
      <DialogTitle id="confirm-dialog-title">
        {title}
      </DialogTitle>

      {/* Contenu principal de la modale */}
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>

      {/* Zone des boutons d'action */}
      <DialogActions>
        {/* Bouton Annuler : style simple */}
        <Button onClick={onCancel} color="primary">
          Annuler
        </Button>
        {/* Bouton Confirmer : style accentué pour l'action principale */}
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Export du composant pour pouvoir l'utiliser dans d'autres fichiers
export default ConfirmDialog;

/*
RÉSUMÉ DU FICHIER ConfirmDialog.tsx :

Ce composant est une boîte de dialogue de confirmation réutilisable dans tout le projet GestEPI.
Il est utilisé quand on veut demander confirmation à l'utilisateur avant une action importante
(comme la suppression d'un EPI).

PLACE DANS L'ARCHITECTURE :
- Situé dans components/common/ car c'est un composant générique réutilisable
- Utilisé par exemple dans EPIList.tsx pour confirmer la suppression d'un EPI
- S'appuie sur Material-UI pour un design professionnel et cohérent

POINTS CLÉS POUR L'ORAL :
1. Composant réutilisable qui améliore l'expérience utilisateur
2. Utilisation de TypeScript pour la sécurité du code
3. Respect des bonnes pratiques d'accessibilité
4. Interface utilisateur professionnelle avec Material-UI
*/