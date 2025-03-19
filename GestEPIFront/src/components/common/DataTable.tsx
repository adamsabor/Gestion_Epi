import React from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

export interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  rowsPerPageOptions?: number[];
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  pageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  rowsPerPageOptions = [5, 10, 25],
  checkboxSelection = false,
  disableSelectionOnClick = false,
  pageSize = 10
}) => {
  // Utiliser le modèle de pagination correct
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    pageSize: pageSize,
    page: 0,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={rowsPerPageOptions}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableSelectionOnClick}
      />
    </div>
  );
};

export default DataTable; 