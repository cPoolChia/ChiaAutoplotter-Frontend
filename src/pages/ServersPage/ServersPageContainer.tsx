import React from "react";
import {
  GridCellParams,
  GridColumns,
  GridEditCellPropsParams,
} from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import ServerService from "../../services/ServerService";
import {
  ConfigurableServerFieldsType,
  ServerType,
} from "../../services/ServerService/types";
import { DataGridContainer } from "../../components/EditableDataGrid/DataGridContainer";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import { Toolbox } from "../../components/Toolbox";
import { FieldsType } from "../../components/AddModal/types";
import { ServersPage } from "./ServersPage";
import { useGlobalState } from "../../common/GlobalState/hooks/useGlobalState";

export const ServersPageContainer: React.FC = () => {
  const [globalState, setGlobalState] = useGlobalState();

  async function addServer(fields: { [key: string]: string }): Promise<void> {
    try {
      const directories: string[] = [];
      let i = 1;
      while (fields[`directory${i}`]) {
        if (fields[`directory${i}`].length) {
          directories.push(fields[`directory${i}`]);
        }
        i += 1;
      }
      const newFields = {
        name: fields.name,
        username: fields.username,
        hostname: fields.hostname,
        password: fields.password,
        poolKey: fields.poolKey,
        farmerKey: fields.farmerKey,
        workerPort: Number(fields.workerPort),
      };
      const data: ServerType = await ServerService.addServer({
        ...newFields,
        directories,
      });
      setGlobalState({
        ...globalState,
        servers: [...globalState.servers, data],
      });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  async function deleteServer(id: string): Promise<void> {
    try {
      await ServerService.deleteServer(id);
      setGlobalState({
        ...globalState,
        servers: globalState.servers.filter((server) => server.id !== id),
      });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  async function updateServer(
    id: string,
    fields: ConfigurableServerFieldsType
  ) {
    try {
      const data = await ServerService.updateServer(id, fields);
      const idx = globalState.servers.map((server) => server.id).indexOf(id);
      const servers = [...globalState.servers];
      servers.splice(idx, 1, data);
      setGlobalState({
        ...globalState,
        servers,
      });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  const editCellHandler = async (params: GridEditCellPropsParams) => {
    try {
      await updateServer(params.id.toString(), {
        [params.field]: params.props.value,
      });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const modalFields: FieldsType[] = [
    {
      name: "hostname",
      id: "hostname",
      label: "IP Address",
    },
    {
      name: "name",
      id: "name",
      label: "Server Name",
    },
    {
      name: "username",
      id: "username",
      label: "Username",
    },
    {
      name: "password",
      id: "password",
      label: "Password",
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
      name: "workerPort",
      id: "workerPort",
      label: "Worker Port",
    },
    {
      name: "directory1",
      id: "directory",
      label: "Directory",
      multiple: true,
    },
  ];

  const columns: GridColumns = [
    {
      field: "hostname",
      headerName: "IP Address",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Server Name",
      width: 200,
      editable: true,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: true,
    },
    {
      field: "poolKey",
      headerName: "Pool Key",
      width: 120,
      editable: true,
      renderCell: (params: GridCellParams) => {
        return <>{params.value}</>;
      },
    },
    {
      field: "farmerKey",
      headerName: "Farmer Key",
      width: 120,
      editable: true,
      renderCell: (params: GridCellParams) => {
        return <>{params.value}</>;
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
      width: 90,
    },
    {
      field: "workerPort",
      headerName: "Port",
      width: 80,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Action",
      width: 100,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Button
            onClick={() => deleteServer(params.row.id)}
            variant="text"
            color="secondary"
            size="small"
          >
            <DeleteForeverIcon />
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <ServersPage
      ServersDataGrid={
        <DataGridContainer
          rows={globalState.servers}
          columns={columns}
          total={globalState.servers.length}
          title="Servers List"
          editHandler={editCellHandler}
          Toolbox={
            <Toolbox
              title="Add Server"
              submitHandler={addServer}
              modalFields={modalFields}
            />
          }
        />
      }
    />
  );
};
