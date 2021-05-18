import React, { useState, useEffect, useCallback } from "react";
import {
  GridCellParams,
  GridColumns,
  GridEditCellPropsParams,
} from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import ServerService from "../../services/ServerService";
import {
  ConfigurableServerFieldsType,
  PlotsArrayType,
  ServersArrayType,
  ServerType,
} from "../../services/ServerService/types";
import { DataGridContainer } from "../../components/EditableDataGrid/DataGridContainer";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link, useParams } from "react-router-dom";
import { Toolbox } from "../../components/Toolbox";
import { FieldsType } from "../../components/AddModal/types";
import { SingleServerPage } from "./SingleServerPage";
import {
  ConfigurableQueueFieldsType,
  QueuesArrayType,
  QueueType,
} from "../../services/PlotsService/types";
import PlotsService from "../../services/PlotsService";

export const SingleServerPageContainer: React.FC = () => {
  const [serverData, setServerData] = useState<ServerType>();
  const [locatedPlots, setLocatedPlots] = useState<PlotsArrayType>();
  const [createdPlots, setCreatedPlots] = useState<PlotsArrayType>();
  const [queues, setQueues] = useState<QueuesArrayType>();

  const { id }: any = useParams();

  const getServerData = useCallback(async (): Promise<void> => {
    const data = await ServerService.getServer(id);
    setServerData(data);
  }, [id]);

  const getLocatedPlots = useCallback(async (): Promise<void> => {
    const data = await ServerService.getLocatedPlots(id);
    setLocatedPlots(data);
  }, [id]);

  const getCreatedPlots = useCallback(async (): Promise<void> => {
    const data = await ServerService.getCreatedPlots(id);
    setCreatedPlots(data);
  }, [id]);

  const getQueueData = useCallback(async (): Promise<void> => {
    const data = await ServerService.getQueues(id);
    setQueues(data);
  }, [id]);

  async function addPlotQueue(
    fields: ConfigurableQueueFieldsType
  ): Promise<void> {
    try {
      const data: QueueType = await PlotsService.addPlotQueue(id, fields);
      if (queues) {
        setQueues({ ...queues, items: [...queues.items, data] });
      } else {
        setQueues({ amount: 1, items: [data] });
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  async function updatePlotQueue(
    id: string,
    fields: ConfigurableQueueFieldsType
  ) {
    try {
      const data = await PlotsService.updatePlotQueue(id, fields);
      if (queues) {
        const idx = queues.items.map((queue) => queue.id).indexOf(id);
        const queueItems = [...queues.items];
        queueItems.splice(idx, 1, data);
        setQueues({
          ...queues,
          items: queueItems,
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
      label: "Pool key",
    },
    {
      name: "farmerKey",
      id: "farmerKey",
      label: "Farmer key",
    },
    {
      name: "plotsAmount",
      id: "plotsAmount",
      label: "Plots Amount",
    },
  ];

  const initialRequests = useCallback(
    () =>
      Promise.all([
        getServerData(),
        getLocatedPlots(),
        getCreatedPlots(),
        getQueueData(),
      ]),
    [getServerData, getLocatedPlots, getCreatedPlots, getQueueData]
  );

  useEffect(() => {
    initialRequests();
  }, [initialRequests]);

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
    },
    // {
    //   field: "serverId",
    //   headerName: "Server ID",
    //   width: 320,
    //   renderCell: (params: GridCellParams) => {
    //     return <Link to={`/server/${params.id}/`}>{params.value}</Link>;
    //   },
    // },
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
      width: 320,
      editable: true,
    },
    {
      field: "farmerKey",
      headerName: "Farmer Key",
      width: 320,
      editable: true,
    },
    {
      field: "plotsAmount",
      headerName: "Plots Amount",
      width: 130,
      editable: true,
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

  return serverData &&
    queues &&
    locatedPlots !== undefined &&
    createdPlots !== undefined ? (
    <SingleServerPage
      locatedPlots={locatedPlots}
      createdPlots={createdPlots}
      serverData={serverData}
      QueuesDataGrid={
        <DataGridContainer
          rows={queues.items}
          columns={columns}
          total={queues.amount}
          title="Plot Queues List"
          editHandler={editCellHandler}
          Toolbox={
            <Toolbox
              title="Add Queue"
              submitHandler={addPlotQueue}
              modalFields={modalFields}
            />
          }
        />
      }
    />
  ) : null;
};
