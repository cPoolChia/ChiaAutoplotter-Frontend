import React, { useState, useEffect } from "react";
import {
  GridCellParams,
  GridColumns,
  GridEditCellPropsParams,
} from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import { DataGridContainer } from "../../components/EditableDataGrid/DataGridContainer";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import { Toolbox } from "../../components/Toolbox";
import { FieldsType } from "../../components/AddModal/types";
import { PlotsPage } from "./PlotsPage";
import PlotsService from "../../services/PlotsService";
import {
  ConfigurableQueueFieldsType,
  QueuesArrayType,
  QueueType,
} from "../../services/PlotsService/types";

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

  async function addPlotQueue(
    fields: ConfigurableQueueFieldsType
  ): Promise<void> {
    if (fields.serverId) {
      try {
        const data: QueueType = await PlotsService.addPlotQueue(
          fields.serverId,
          fields
        );
        if (plots) {
          setPlots({ ...plots, items: [...plots.items, data] });
        } else {
          setPlots({ amount: 1, items: [data] });
        }
      } catch (error) {
        NotificationManager.error(error.message);
      }
    } else {
      NotificationManager.error("Unable to add a plot queue.", "Error!");
    }
  }

  async function updatePlotQueue(
    id: string,
    fields: ConfigurableQueueFieldsType
  ) {
    try {
      const data = await PlotsService.updatePlotQueue(id, fields);
      if (plots) {
        const idx = plots.items.map((server) => server.id).indexOf(id);
        const plotsItems = [...plots.items];
        plotsItems.splice(idx, 1, data);
        setPlots({
          ...plots,
          items: plotsItems,
        });
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  const editCellHandler = async (params: GridEditCellPropsParams) => {
    try {
      await updatePlotQueue(params.id.toString(), {
        [params.field]: params.props.value,
      });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const modalFields: FieldsType[] = [
    {
      name: "serverId",
      id: "serverId",
      label: "Server ID",
    },
    {
      name: "createDir",
      id: "createDir",
      label: "Create Dir.",
    },
    {
      name: "plotDir",
      id: "plotDir",
      label: "Plot Dir.",
    },
    {
      name: "poolKey",
      id: "poolKey",
      label: "Pool Key",
    },
    {
      name: "farmerKey",
      id: "farmerKey",
      label: "Farmer Key",
    },
    {
      name: "plotsAmount",
      id: "plotsAmount",
      label: "Plots Amount",
    },
  ];

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
        <DataGridContainer
          rows={plots.items}
          columns={columns}
          total={plots.amount}
          title="Plot Queues List"
          editHandler={editCellHandler}
          Toolbox={
            <Toolbox
              title="Add Server"
              submitHandler={addPlotQueue}
              modalFields={modalFields}
            />
          }
        />
      }
    />
  ) : null;
};
