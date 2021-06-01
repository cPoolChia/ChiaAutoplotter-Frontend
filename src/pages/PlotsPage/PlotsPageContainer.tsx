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
import { useGlobalState } from "../../common/GlobalState/hooks/useGlobalState";

export const PlotsPageContainer: React.FC = () => {
  const [globalState, setGlobalState] = useGlobalState();

  const columns = [
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
      field: "tempDirName",
      headerName: "Temp Dir.",
      width: 280,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            {
              globalState.directories.find(
                (dir) => dir.id === params.row.tempDirId
              )?.location
            }
          </>
        );
      },
    },
    {
      field: "finalDirName",
      headerName: "Final Dir.",
      width: 280,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            {
              globalState.directories.find(
                (dir) => dir.id === params.row.tempDirId
              )?.location
            }
          </>
        );
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
        const idx: number = globalState.plotsQueues.findIndex(
          (queue) => queue.id === params.id
        );
        const value = globalState.plotsQueues[idx].autoplot;
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

  return (
    <PlotsPage
      PlotsDataGrid={
        <DataGridComponent
          style={{ width: "100%", height: 500 }}
          rows={globalState.plotsQueues}
          columns={columns}
          total={globalState.plotsQueues.length}
          title="Plot Queues List"
        />
      }
    />
  );
};
