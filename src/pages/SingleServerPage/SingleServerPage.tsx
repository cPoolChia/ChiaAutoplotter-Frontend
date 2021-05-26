import React from "react";
import { Breadcrumbs, Container, Paper, Typography } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DataList } from "../../components/DataList";
import { PlotsArrayType } from "../../services/PlotsService/types";
import { ServerType } from "../../services/ServerService/types";
import { DataGridComponent } from "../../components/DataGrid";
import { useStyles } from "./styles";
import { DirectoryArrayType } from "../../services/DirectoryService/types";

interface Props {
  QueuesDataGrid: React.ReactChild;
  DirectoriesDataGrid: React.ReactChild;
  locatedPlots: PlotsArrayType;
  serverData: ServerType;
  directories: DirectoryArrayType;
}

export const SingleServerPage: React.FC<Props> = ({
  QueuesDataGrid,
  DirectoriesDataGrid,
  serverData,
  locatedPlots,
  directories,
}) => {
  const classes = useStyles();

  const plotsColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/plots/${params.id}/`}>{params.value}</Link>;
      },
    },
    {
      field: "locatedDirectoryId",
      headerName: "Located Directory ID",
      width: 320,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            {
              directories!.items.find((dir) => dir.id === params.value)
                ?.location
            }
          </>
        );
      },
    },
    {
      field: "created",
      headerName: "Created",
      width: 200,
      renderCell: (params: GridCellParams) => {
        const value: any = params.value;
        return <>{new Date(value).toLocaleString()}</>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
  ];

  return (
    <Container>
      <Breadcrumbs className={classes.breadcrumbs}>
        <Link className={classes.breadcrumbsLink} to="/servers">
          Servers
        </Link>
        <Typography>{serverData.id}</Typography>
      </Breadcrumbs>
      <DataList title="Server Data" data={serverData} />
      <Paper className={classes.paper}>
        <DataGridComponent
          title="Plots"
          style={{ width: "100%", height: 500 }}
          rows={locatedPlots.items}
          columns={plotsColumns}
          total={locatedPlots.amount}
        />
      </Paper>
      {QueuesDataGrid}
      {DirectoriesDataGrid}
    </Container>
  );
};
