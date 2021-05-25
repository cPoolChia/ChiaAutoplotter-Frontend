import React, { useState, useEffect, useCallback } from "react";
import {
  GridCellParams,
  GridEditCellPropsParams,
} from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import ServerService from "../../services/ServerService";
import { ServerType } from "../../services/ServerService/types";
import { PlotsArrayType } from "../../services/PlotsService/types";
import { DataGridContainer } from "../../components/EditableDataGrid/DataGridContainer";
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
import { DirectoryArrayType } from "../../services/DirectoryService/types";

export const SingleServerPageContainer: React.FC = () => {
  const [serverData, setServerData] = useState<ServerType>();
  const [locatedPlots, setLocatedPlots] = useState<PlotsArrayType>();
  const [queues, setQueues] = useState<QueuesArrayType>();
  const [directories, setDirectories] = useState<DirectoryArrayType>();

  const { id }: any = useParams();

  const getServerData = useCallback(async (): Promise<void> => {
    try {
      const data = await ServerService.getServer(id);
      setServerData(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const getLocatedPlots = useCallback(async (): Promise<void> => {
    try {
      const data = await ServerService.getLocatedPlots(id);
      setLocatedPlots(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const getQueueData = useCallback(async (): Promise<void> => {
    try {
      const data = await ServerService.getQueues(id);
      setQueues(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const getServerDirectories = useCallback(async (): Promise<void> => {
    try {
      const data = await ServerService.getServerDirectories(id);
      setDirectories(data);
      console.log(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
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
      name: "tempDirId",
      id: "tempDirId",
      label: "Temporary Dir. Id",
      type: "autocomplete",
      data: directories?.items.map((directory) => {
        return {
          label: directory.location,
          value: directory.id,
        };
      }),
    },
    {
      name: "finalDirId",
      id: "finalDirId",
      label: "Final Dir. Id",
      type: "autocomplete",
      data: directories?.items.map((directory) => {
        return {
          label: directory.location,
          value: directory.id,
        };
      }),
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
        getQueueData(),
        getServerDirectories(),
      ]),
    [getServerData, getLocatedPlots, getQueueData, getServerDirectories]
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
    {
      field: "serverId",
      headerName: "Server ID",
      width: 320,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
      },
    },
    {
      field: "tempDirId",
      headerName: "Temp Dir.",
      width: 150,
      editable: true,
    },
    {
      field: "finalDirId",
      headerName: "Final Dir.",
      width: 150,
      editable: true,
    },
    {
      field: "plotsAmount",
      headerName: "Plots Amount",
      width: 130,
      editable: true,
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
  ];

  return serverData && queues && directories && locatedPlots !== undefined ? (
    <SingleServerPage
      locatedPlots={locatedPlots}
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
