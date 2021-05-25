import React, { useState, useEffect, useCallback } from "react";
import { GridCellParams } from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import { DataGridComponent } from "../../components/DataGrid/";
import { Link } from "react-router-dom";
import { PlotsPage } from "./PlotsPage";
import PlotsService from "../../services/PlotsService";
import { QueuesArrayType } from "../../services/PlotsService/types";
import { Checkbox } from "@material-ui/core";
import ServerService from "../../services/ServerService";

export const PlotsPageContainer: React.FC = () => {
  const [plots, setPlots] = useState<QueuesArrayType>();

  const getPlotQueues = useCallback(async (): Promise<void> => {
    try {
      const plotsData = await PlotsService.getAllPlotsQueue();
      const newPlotsData: any = Object.assign({}, plotsData);
      newPlotsData.items.forEach(async (data: any) => {
        const res = await ServerService.getServerDirectories(data.serverId);
        data.tempDirName = res.items.find(
          (dir) => dir.id === data.tempDirId
        )?.location;
        data.finalDirName = res.items.find(
          (dir) => dir.id === data.finalDirId
        )?.location;
      });
      setPlots(newPlotsData);
    } catch (error) {
      console.error(error);
      NotificationManager.error(error.message);
    }
  }, []);

  useEffect(() => {
    getPlotQueues();
  }, [getPlotQueues]);

  const columns = [
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
      width: 350,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/tasks/${params.value}/`}>{params.value}</Link>;
      },
    },
    {
      field: "tempDirName",
      headerName: "Temp Dir.",
      width: 150,
      renderCell: (params: GridCellParams) => {
        return <>{params!.value}</>;
      },
    },
    {
      field: "finalDirName",
      headerName: "Final Dir.",
      width: 200,
      renderCell: (params: GridCellParams) => {
        return <>{params!.value}</>;
      },
    },
    {
      field: "plotsAmount",
      headerName: "Plots Amount",
      width: 130,
      editable: true,
    },
    {
      field: "autoplot",
      headerName: "Autoplot",
      width: 100,
      renderCell: (params: GridCellParams) => {
        const idx: number = plots!.items.findIndex(
          (queue) => queue.id === params.id
        );
        const value = plots!.items[idx].autoplot;
        return <Checkbox disabled checked={value} />;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
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
      field: "plottingStarted",
      headerName: "Plotting Started",
      width: 200,
      renderCell: (params: GridCellParams) => {
        const value: any = params.value;
        return <>{value ? new Date(value).toLocaleString() : ""}</>;
      },
    },
    {
      field: "plottingDuration",
      headerName: "Plotting Duration",
      width: 200,
      renderCell: (params: GridCellParams) => {
        const value: any = params.value;
        return <>{value ? new Date(value).toLocaleTimeString() : ""}</>;
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
