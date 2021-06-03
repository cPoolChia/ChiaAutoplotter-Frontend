import React from "react";
import {
  DataGrid,
  GridEditCellPropsParams,
  GridRowData,
  GridColumns,
} from "@material-ui/data-grid";
import { useStyles } from "./styles";

interface Props {
  rows: GridRowData[];
  columns: GridColumns;
  editHandler?: (params: GridEditCellPropsParams) => void;
}

export const DataGridComponent: React.FC<Props> = ({
  rows,
  columns,
  editHandler,
}) => {
  const classes = useStyles();

  return (
    <DataGrid
      pagination
      rowsPerPageOptions={[25, 50, 100]}
      className={classes.root}
      disableColumnMenu={true}
      onEditCellChangeCommitted={editHandler}
      rows={rows}
      columns={columns}
    />
  );
};
