import React from "react";
import { DataGrid, GridRowsProp, GridColumns } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  rows: GridRowsProp;
  columns: GridColumns;
  total: number;
  title: string;
  style?: Object;
}

export const DataGridComponent: React.FC<Props> = ({
  rows,
  columns,
  total,
  title,
  style,
}) => {
  const classes = useStyles();

  return (
    <div style={style}>
      <Typography className={classes.heading} align="center">
        {title}
      </Typography>
      <DataGrid
        pagination
        disableColumnMenu
        rowsPerPageOptions={[25, 50, 100]}
        rows={rows}
        columns={columns}
      />
    </div>
  );
};
