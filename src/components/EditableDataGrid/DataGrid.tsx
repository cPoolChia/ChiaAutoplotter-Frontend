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
  editHandler: (params: GridEditCellPropsParams) => void;
}

export const DataGridComponent: React.FC<Props> = ({
  rows,
  columns,
  editHandler,
}) => {
  const classes = useStyles();

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <DataGrid
        className={classes.root}
        disableColumnMenu={true}
        autoHeight={true}
        onEditCellChangeCommitted={editHandler}
        rows={rows}
        columns={columns}
      />
    </div>
  );
};
