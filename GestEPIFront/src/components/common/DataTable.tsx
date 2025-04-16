// ************************************************************************
// 🎓 COMPOSANT REACT DATATABLE - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React est la bibliothèque de base pour créer des composants
// C'est la première chose à importer dans un fichier React
import React from 'react';

// Material-UI DataGrid : une bibliothèque de tableaux avancés
// - DataGrid : Le composant principal qui crée le tableau
// - GridColDef : Interface TypeScript qui définit la structure d'une colonne
// - GridPaginationModel : Interface pour gérer la pagination (nb lignes par page, page actuelle)
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : Cette interface définit les props que notre composant peut recevoir
// C'est comme un contrat qui garantit que le composant reçoit les bonnes données
export interface DataTableProps {
  rows: any[];                    // Les données à afficher dans le tableau
  columns: GridColDef[];          // Définition des colonnes (nom, type, largeur...)
  rowsPerPageOptions?: number[];  // Options pour le nombre de lignes par page
  checkboxSelection?: boolean;    // Active/désactive les cases à cocher
  disableSelectionOnClick?: boolean; // Empêche la sélection au clic
  pageSize?: number;              // Nombre de lignes par page par défaut
}

// ********** COMPOSANT REACT **********
// Pour l'E6 : Un composant fonctionnel (FC) qui crée un tableau réutilisable
// Il utilise les generics (<DataTableProps>) pour le typage des props
const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  rowsPerPageOptions = [5, 10, 25],    // Valeurs par défaut
  checkboxSelection = false,
  disableSelectionOnClick = false,
  pageSize = 10
}) => {
  // ********** HOOK USESTATE **********
  // Pour l'E6 : useState est un hook React qui gère l'état local du composant
  // Ici, il gère la pagination (quelle page on affiche, combien de lignes)
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    pageSize: pageSize,  // Nombre de lignes par page
    page: 0,            // On commence à la page 0
  });

  // ********** RENDU JSX **********
  // Pour l'E6 : Le JSX est comme du HTML amélioré qui peut inclure du JavaScript
  return (
    // Conteneur avec hauteur fixe pour le tableau
    <div style={{ height: 400, width: '100%' }}>
      {/* DataGrid de Material-UI avec toutes ses props configurées */}
      <DataGrid
        rows={rows}                   // Données à afficher
        columns={columns}             // Structure des colonnes
        paginationModel={paginationModel}        // État de la pagination
        onPaginationModelChange={setPaginationModel}  // Mise à jour pagination
        pageSizeOptions={rowsPerPageOptions}     // Options nb lignes/page
        checkboxSelection={checkboxSelection}     // Cases à cocher
        disableRowSelectionOnClick={disableSelectionOnClick}  // Désactive sélection
      />
    </div>
  );
};

// Export du composant pour l'utiliser dans d'autres fichiers
export default DataTable;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Crée un composant réutilisable pour afficher des données en tableau
// 2. Utilise TypeScript pour garantir la sécurité du code
// 3. Intègre Material-UI pour une interface professionnelle
// 4. Gère la pagination et les interactions utilisateur
//
// Points techniques à souligner :
// - Composant React moderne (Function Component)
// - Typage strict avec TypeScript
// - Props avec valeurs par défaut
// - Hook useState pour la gestion d'état
// - Intégration d'une bibliothèque externe (Material-UI)