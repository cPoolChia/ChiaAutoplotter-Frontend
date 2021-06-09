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
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  ConfigurableQueueFieldsType,
  QueuesArrayType,
  QueueType,
} from "../../services/PlotsService/types";
import PlotsService from "../../services/PlotsService";
import {
  DirectoryArrayType,
  DirectoryType,
} from "../../services/DirectoryService/types";
import { Button, Checkbox, MenuItem, Select } from "@material-ui/core";
import {
  formatDiskSize,
  getTakenDiskSizePercentage,
} from "../../utils/diskSizeFormatter";
import { useGlobalState } from "../../common/GlobalState/hooks/useGlobalState";

export const SingleServerPageContainer: React.FC = () => {
  const { id }: any = useParams();
  const [locatedPlots, setLocatedPlots] = useState<PlotsArrayType>();
  const [globalState, setGlobalState] = useGlobalState();

  const queues = globalState.plotsQueues.filter((q) => q.serverId === id);
  const directories = globalState.directories.filter((d) => d.serverId === id);

  const getLocatedPlots = useCallback(async (): Promise<void> => {
    try {
      const data = await ServerService.getLocatedPlots(id);
      setLocatedPlots(data);
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
        // setGlobalState({ ...queues, items: [...queues.items, data] });
        setGlobalState({
          ...globalState,
          plotsQueues: [...globalState.plotsQueues, data],
        });
      } else {
        setGlobalState({
          ...globalState,
          plotsQueues: [data],
        });
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  async function addDirectory(fields: any): Promise<void> {
    try {
      const data: DirectoryType = await ServerService.addServerDirectory(
        id,
        fields.location
      );
      if (directories) {
        setGlobalState({
          ...globalState,
          directories: [...globalState.directories, data],
        });
      } else {
        setGlobalState({ ...globalState, directories: [data] });
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
        const idx = queues.map((queue) => queue.id).indexOf(id);
        const queueItems = [...queues];
        queueItems.splice(idx, 1, data);
        setGlobalState({
          ...globalState,
          plotsQueues: queueItems,
        });
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  const editPlotCellHandler = async (params: GridEditCellPropsParams) => {
    try {
      await updatePlotQueue(params.id.toString(), {
        [params.field]: params.props.value,
      });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const CustomFieldOnChangeHandler = async (
    id: string,
    fieldName: string,
    value: unknown
  ) => {
    try {
      await updatePlotQueue(id, {
        [fieldName]: value,
      });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const restartPlottingQueueHandler = async (id: string) => {
    try {
      const result = await PlotsService.restartPlotQueue(id);
      await updatePlotQueue(id, result);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const pausePlottingQueueHandler = async (id: string) => {
    try {
      const result = await PlotsService.pausePlotQueue(id);
      await updatePlotQueue(id, result);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const plotsModalFields: FieldsType[] = [
    {
      name: "tempDirId",
      id: "tempDirId",
      label: "Temporary Dir. Id",
      type: "autocomplete",
      data: directories?.map((directory) => {
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
      data: directories?.map((directory) => {
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

  const DirectoriesModalFields: FieldsType[] = [
    {
      name: "location",
      id: "location",
      label: "Location",
    },
  ];

  const initialRequests = useCallback(
    async () => await getLocatedPlots(),
    [getLocatedPlots]
  );

  useEffect(() => {
    initialRequests();
  }, [initialRequests]);

  const plotsGridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 85,
      renderCell: (params: GridCellParams) => {
        return (
          <Link to={`/plots/${params.id}/`}>
            {params.value!.toString().slice(0, 6) + "..."}
          </Link>
        );
      },
    },
    {
      field: "serverName",
      headerName: "Server Name",
      width: 120,
      renderCell: (params: GridCellParams) => {
        return (
          <Link to={`/servers/${id}/`}>
            {globalState.servers.find((server) => server.id === id)?.name}
          </Link>
        );
      },
    },
    {
      field: "tempDirId",
      headerName: "Temp Dir.",
      width: 280,
      renderCell: (params: GridCellParams) => {
        return (
          <Select
            style={{ width: "100%", height: "100%" }}
            value={directories!.find((dir) => dir.id === params.value)?.id}
            onChange={(
              event: React.ChangeEvent<{ name?: string; value: unknown }>
            ) =>
              CustomFieldOnChangeHandler(
                params.id.toString(),
                params.field,
                event.target.value
              )
            }
          >
            {directories!.map((dir) => (
              <MenuItem key={dir.id} value={dir.id}>
                {dir.location}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "finalDirId",
      headerName: "Final Dir.",
      width: 280,
      renderCell: (params: GridCellParams) => {
        return (
          <Select
            style={{ width: "100%", height: "100%" }}
            value={directories!.find((dir) => dir.id === params.value)?.id}
            onChange={(
              event: React.ChangeEvent<{ name?: string; value: unknown }>
            ) =>
              CustomFieldOnChangeHandler(
                params.id.toString(),
                params.field,
                event.target.value
              )
            }
          >
            {directories!.map((dir) => (
              <MenuItem key={dir.id} value={dir.id}>
                {dir.location}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "plotsAmount",
      headerName: "Plots Amount",
      width: 123,
      editable: true,
    },
    {
      field: "autoplot",
      headerName: "Auto",
      width: 70,
      renderCell: (params: GridCellParams) => {
        const idx: number = queues!.findIndex(
          (queue) => queue.id === params.id
        );
        const value = queues[idx].autoplot;
        return (
          <Checkbox
            onChange={() =>
              CustomFieldOnChangeHandler(
                String(params.id),
                params.field,
                !value
              )
            }
            checked={value}
          />
        );
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
      width: 110,
      renderCell: (params: GridCellParams) => {
        const value: any = params.value;
        const date = new Date(value);
        const result = date.toLocaleDateString().split("/").reverse().join("-");
        return <>{result}</>;
      },
    },
    {
      field: "plottingStarted",
      headerName: "Plotting Started",
      width: 200,
      renderCell: (params: GridCellParams) => {
        const value: any = params.value;
        return (
          <>{value ? new Date(value).toLocaleString().slice(0, -3) : ""}</>
        );
      },
    },
    {
      field: "plottingDuration",
      headerName: "Plotting Duration",
      width: 200,
      renderCell: (params: GridCellParams) => {
        const value: any = params.value;
        return (
          <>{value ? new Date(value).toLocaleTimeString().slice(0, -3) : ""}</>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params: GridCellParams) => {
        return params.row.status === "failed" ||
          params.row.status === "paused" ? (
          <Button
            onClick={() => restartPlottingQueueHandler(params.id.toString())}
            color="secondary"
            variant="outlined"
          >
            RESTART
          </Button>
        ) : (
          <Button
            onClick={() => pausePlottingQueueHandler(params.id.toString())}
            color="primary"
            variant="outlined"
          >
            PAUSE
          </Button>
        );
      },
    },
  ];

  const directoriesGridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params: GridCellParams) => {
        return (
          <Link to={`/directories/${params.id}/`}>
            {params.value!.toString().slice(0, 6) + "..."}
          </Link>
        );
      },
    },
    {
      field: "location",
      headerName: "Location / Path",
      width: 220,
    },
    {
      field: "status",
      headerName: "status",
      width: 160,
    },
    {
      field: "diskSize",
      headerName: "Disk Size",
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            {params.value ? formatDiskSize(Number(params.value), "GB") : null}
          </>
        );
      },
    },
    {
      field: "diskSizeLeft",
      headerName: "Free Disk Size",
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            {params.value
              ? formatDiskSize(
                  Number(params.row.diskSize - params.row.diskTaken),
                  "GB"
                )
              : null}
          </>
        );
      },
    },
    {
      field: "diskTaken",
      headerName: "Taken Disk Space",
      width: 220,
      renderCell: (params: GridCellParams) => {
        const value = Number(
          getTakenDiskSizePercentage(
            params.row.diskSize,
            params.row.diskTaken
          ).toFixed(2)
        );
        return params.value ? (
          <div style={{ width: 200, position: "relative" }}>
            <LinearProgress
              variant="buffer"
              style={{ height: 25, marginTop: 25, marginBottom: 25 }}
              valueBuffer={100}
              value={value}
            />
            <span
              style={{
                position: "absolute",
                top: 12,
                left: "42.5%",
                zIndex: 1,
              }}
            >
              {value}%
            </span>
          </div>
        ) : (
          <></>
        );
      },
    },
  ];

  return queues && directories && locatedPlots ? (
    <SingleServerPage
      locatedPlots={locatedPlots}
      globalState={globalState}
      setGlobalState={setGlobalState}
      id={id}
      directories={directories}
      QueuesDataGrid={
        <DataGridContainer
          rows={queues}
          columns={plotsGridColumns}
          total={queues.length}
          title="Plot Queues List"
          editHandler={editPlotCellHandler}
          Toolbox={
            <Toolbox
              title="Add Queue"
              submitHandler={addPlotQueue}
              modalFields={plotsModalFields}
            />
          }
        />
      }
      DirectoriesDataGrid={
        <DataGridContainer
          rows={directories}
          columns={directoriesGridColumns}
          total={directories.length}
          title="Directories List"
          Toolbox={
            <Toolbox
              title="Add Directory"
              submitHandler={addDirectory}
              modalFields={DirectoriesModalFields}
            />
          }
        />
      }
    />
  ) : null;
};
