import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { GridRowsProp, GridColumns } from "@material-ui/data-grid";
import { DataGridComponent } from "./DataGrid";
import { useStyles } from "./styles";

interface Props {
  rows: GridRowsProp;
  columns: GridColumns;
  total: number;
  title: string;
  editHandler: any;
  Toolbox?: React.ReactChild;
  style?: Object;
}

export const DataGridContainer: React.FC<Props> = ({
  rows,
  columns,
  total,
  title,
  editHandler,
  Toolbox,
  style,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography
        component="h2"
        variant="h4"
        align="center"
        className={classes.gridHeading}
      >
        {title}
      </Typography>
      {Toolbox}
      <DataGridComponent
        rows={rows}
        columns={columns}
        editHandler={editHandler}
      />
    </Paper>
  );
};
