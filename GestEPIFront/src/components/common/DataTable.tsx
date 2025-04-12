// Import de React, nécessaire pour créer des composants
import React from 'react';
// Import des éléments de Material-UI DataGrid pour créer des tableaux de données avancés
// DataGrid : Le composant principal pour afficher les données en tableau
// GridColDef : Type TypeScript qui définit la structure d'une colonne
// GridPaginationModel : Type pour gérer la pagination
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

// Interface qui définit les propriétés (props) que notre composant DataTable peut recevoir
// C'est comme un contrat qui garantit que les bonnes données seront fournies
export interface DataTableProps {
  rows: any[];                          // Les données à afficher dans le tableau (lignes)
  columns: GridColDef[];                // La définition des colonnes du tableau
  rowsPerPageOptions?: number[];        // Options pour le nombre de lignes par page (optionnel)
  checkboxSelection?: boolean;          // Active/désactive les cases à cocher (optionnel)
  disableSelectionOnClick?: boolean;    // Désactive la sélection au clic (optionnel)
  pageSize?: number;                    // Nombre de lignes par page par défaut (optionnel)
}

// Composant DataTable : Un tableau de données réutilisable dans tout le projet
// Il utilise les props définies ci-dessus avec des valeurs par défaut pour les props optionnelles
const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  rowsPerPageOptions = [5, 10, 25],    // Par défaut : choix entre 5, 10 ou 25 lignes/page
  checkboxSelection = false,            // Par défaut : pas de cases à cocher
  disableSelectionOnClick = false,      // Par défaut : sélection au clic activée
  pageSize = 10                         // Par défaut : 10 lignes par page
}) => {
  // État local pour gérer la pagination
  // useState conserve les informations de page actuelle et lignes par page
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    pageSize: pageSize,   // Nombre de lignes par page
    page: 0,             // Page actuelle (commence à 0)
  });

  // Rendu du composant
  return (
    // Conteneur avec une hauteur fixe et largeur complète
    <div style={{ height: 400, width: '100%' }}>
      {/* Composant DataGrid de Material-UI qui affiche le tableau */}
      <DataGrid
        rows={rows}                                     // Les données à afficher
        columns={columns}                               // Structure des colonnes
        paginationModel={paginationModel}              // Configuration de la pagination
        onPaginationModelChange={setPaginationModel}   // Gestion des changements de page
        pageSizeOptions={rowsPerPageOptions}           // Options de nombre de lignes/page
        checkboxSelection={checkboxSelection}          // Cases à cocher
        disableRowSelectionOnClick={disableSelectionOnClick}  // Désactive sélection au clic
      />
    </div>
  );
};

// Export du composant pour l'utiliser dans d'autres fichiers
export default DataTable;

/*
RÉSUMÉ DU FICHIER DataTable.tsx :

Ce composant est un tableau de données réutilisable qui simplifie l'affichage
des données dans tout le projet GestEPI. Il encapsule le composant DataGrid
de Material-UI en le rendant plus facile à utiliser.

PLACE DANS L'ARCHITECTURE :
- Situé dans components/common/ car c'est un composant générique réutilisable
- Utilisé par exemple dans EPIList.tsx pour afficher la liste des EPIs
- S'appuie sur Material-UI DataGrid pour un affichage professionnel

POINTS CLÉS POUR L'ORAL :
1. Composant réutilisable qui uniformise l'affichage des données
2. Utilisation de TypeScript pour la sécurité du code
3. Pagination intégrée pour gérer de grandes quantités de données
4. Interface utilisateur professionnelle avec Material-UI
*/