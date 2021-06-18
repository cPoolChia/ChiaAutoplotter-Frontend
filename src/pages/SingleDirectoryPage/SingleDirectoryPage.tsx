import React from "react";
import { Container, Paper } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DataList } from "../../components/DataList";
import {
  PlotsArrayType,
  QueuesArrayType,
} from "../../services/PlotsService/types";
import { DataGridComponent } from "../../components/DataGrid";
import { DirectoryType } from "../../services/DirectoryService/types";

const queueColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 180,
    renderCell: (params: GridCellParams) => {
      return (
        <Link to={`/plots/${params.id}/`}>
          {params.value!.toString().slice(0, 6) +
            "..." +
            params.value!.toString().slice(-6)}
        </Link>
      );
    },
  },
  {
    field: "serverId",
    headerName: "Server ID",
    width: 180,
    renderCell: (params: GridCellParams) => {
      return (
        <Link to={`/servers/${params.value}/`}>
          {params.value!.toString().slice(0, 6) +
            "..." +
            params.value!.toString().slice(-6)}
        </Link>
      );
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
    width: 110,
    type: "date",
    renderCell: (params: GridCellParams) => {
      const value: any = params.value;
      const date = new Date(value);
      const result = date.toLocaleDateString().split("/").reverse().join("-");
      return <>{result}</>;
    },
  },
];
const plotsColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 180,
    renderCell: (params: GridCellParams) => {
      return (
        <Link to={`/plots/${params.id}/`}>
          {params.value!.toString().slice(0, 6) +
            "..." +
            params.value!.toString().slice(-6)}
        </Link>
      );
    },
  },
  {
    field: "created",
    headerName: "Created",
    width: 110,
    type: "date",
    renderCell: (params: GridCellParams) => {
      const value: any = params.value;
      const date = new Date(value);
      const result = date.toLocaleDateString().split("/").reverse().join("-");
      return <>{result}</>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];

interface Props {
  queuesData: QueuesArrayType;
  plotsData: PlotsArrayType;
  directoryData: DirectoryType;
}

export const SingleDirectoryPage: React.FC<Props> = ({
  queuesData,
  plotsData,
  directoryData,
}) => {
  return (
    <Container>
      <DataList title="Directory Data" data={directoryData} />
      <Paper
        style={{ marginTop: 50, marginBottom: 50, padding: 20, height: 600 }}
      >
        <DataGridComponent
          title="Directory Plots"
          style={{ width: "100%", height: 500 }}
          rows={plotsData.items}
          columns={queueColumns}
          total={plotsData.amount}
        />
      </Paper>
      <Paper
        style={{ marginTop: 50, marginBottom: 50, padding: 20, height: 600 }}
      >
        <DataGridComponent
          title="Directory Queues"
          style={{ width: "100%", height: 500 }}
          rows={queuesData.items}
          columns={plotsColumns}
          total={queuesData.amount}
        />
      </Paper>
    </Container>
  );
};
