import React, { useState, useEffect } from "react";
import { GridCellParams, GridColumns } from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import { DataGridComponent } from "../../components/DataGrid/";
import { Link } from "react-router-dom";
import { PlotsPage } from "./PlotsPage";
import PlotsService from "../../services/PlotsService";
import { QueuesArrayType } from "../../services/PlotsService/types";

export const PlotsPageContainer: React.FC = () => {
  const [plots, setPlots] = useState<QueuesArrayType>();

  async function getPlotQueues(): Promise<void> {
    try {
      const data = await PlotsService.getAllPlotsQueue();
      setPlots(data);
    } catch (error) {
      console.error(error);
      NotificationManager.error(error.message);
    }
  }

  useEffect(() => {
    getPlotQueues();
  }, []);

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 320,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
      },
    },
    {
      field: "plotTaskId",
      headerName: "Plot Task ID",
      width: 320,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/tasks/${params.id}/`}>{params.value}</Link>;
      },
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
      editable: true,
    },
    {
      field: "plotDir",
      headerName: "Plot Dir.",
      width: 150,
      editable: true,
    },
    {
      field: "poolKey",
      headerName: "Pool Key",
      width: 150,
      editable: true,
    },
    {
      field: "farmerKey",
      headerName: "Farmer Key",
      width: 150,
      editable: true,
    },
    {
      field: "plotsAmount",
      headerName: "Plots Amount",
      width: 150,
      editable: true,
    },
    {
      field: "created",
      headerName: "Created",
      width: 180,
      renderCell: (params: GridCellParams) => {
        const value: string | undefined = params.value?.toString();
        return <>{value ? new Date(value).toLocaleString() : ""}</>;
      },
    },
  ];

  return plots ? (
    <PlotsPage
      PlotsDataGrid={
        <DataGridComponent
          style={{ width: "100%", height: 500 }}
          rows={plots.items}
          columns={columns}
          total={plots.amount}
          title="Plot Queues List"
        />
      }
    />
  ) : null;
};
