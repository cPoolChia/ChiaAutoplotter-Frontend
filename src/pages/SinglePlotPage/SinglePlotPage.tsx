import React from "react";
import { Breadcrumbs, Container, Paper, Typography } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DataList } from "../../components/DataList/DataList";
import { PlotsArrayType } from "../../services/ServerService/types";
import { DataGridComponent } from "../../components/DataGrid";
import { QueueType } from "../../services/PlotsService/types";

const queueColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 320,
    renderCell: (params: GridCellParams) => {
      return <Link to={`/plots/${params.id}/`}>{params.value}</Link>;
    },
  },
  {
    field: "plotTaskId",
    headerName: "Plot Task ID",
    width: 150,
  },
  {
    field: "serverId",
    headerName: "Server ID",
    width: 320,
    renderCell: (params: GridCellParams) => {
      return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
    },
  },
  {
    field: "createDir",
    headerName: "Create Dir.",
    width: 150,
  },
  {
    field: "plotDir",
    headerName: "Plot Dir.",
    width: 150,
  },
  {
    field: "poolKey",
    headerName: "Pool Key",
    width: 320,
  },
  {
    field: "farmerKey",
    headerName: "Farmer Key",
    width: 320,
  },
  {
    field: "plotsAmount",
    headerName: "Plots Amount",
    width: 150,
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
];

interface Props {
  queueData: QueueType;
  plotsData: PlotsArrayType;
}

export const SinglePlotPage: React.FC<Props> = ({ queueData, plotsData }) => {
  return (
    <Container>
      <Breadcrumbs style={{ marginTop: 10, marginBottom: 20 }}>
        <Link style={{ color: "black", textDecoration: "none" }} to="/plots">
          Plots
        </Link>
        <Typography>{queueData.id}</Typography>
      </Breadcrumbs>
      <DataList title="Queue Data" data={queueData} />
      <Paper style={{ marginTop: 50, marginBottom: 50 }}>
        <DataGridComponent
          title="Created Plots"
          style={{ width: "100%", height: 500 }}
          rows={plotsData.items}
          columns={queueColumns}
          total={plotsData.amount}
        />
      </Paper>
    </Container>
  );
};