import React from "react";
import { Breadcrumbs, Container, Paper, Typography } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DataList } from "../../components/DataList/DataList";
import { PlotsArrayType, ServerType } from "../../services/ServerService/types";
import { DataGridComponent } from "../../components/DataGrid";

const plotsColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 320,
    renderCell: (params: GridCellParams) => {
      return <Link to={`/plots/${params.id}/`}>{params.value}</Link>;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "createdServerId",
    headerName: "Created Server ID",
    width: 320,
    renderCell: (params: GridCellParams) => {
      return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
    },
  },
  {
    field: "locatedServerId",
    headerName: "Located Server ID",
    width: 320,
    renderCell: (params: GridCellParams) => {
      return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
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

interface Props {
  QueuesDataGrid: React.ReactChild;
  locatedPlots: PlotsArrayType;
  serverData: ServerType;
}

export const SingleServerPage: React.FC<Props> = ({
  QueuesDataGrid,
  serverData,
  locatedPlots,
}) => {
  return (
    <Container>
      <Breadcrumbs style={{ marginTop: 10, marginBottom: 20 }}>
        <Link style={{ color: "black", textDecoration: "none" }} to="/servers">
          Servers
        </Link>
        <Typography>{serverData.id}</Typography>
      </Breadcrumbs>
      <DataList title="Server Data" data={serverData} />
      <Paper style={{ marginTop: 100, marginBottom: 50 }}>
        <DataGridComponent
          title="Located Plots"
          style={{ width: "100%", height: 500 }}
          rows={locatedPlots.items}
          columns={plotsColumns}
          total={locatedPlots.amount}
        />
      </Paper>
      <Paper style={{ marginTop: 100, marginBottom: 50 }}>
        {QueuesDataGrid}
      </Paper>
    </Container>
  );
};
