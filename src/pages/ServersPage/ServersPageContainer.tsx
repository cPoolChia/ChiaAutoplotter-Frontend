import React, { useState, useEffect } from "react";
import {
  GridCellParams,
  GridColumns,
  GridEditCellPropsParams,
} from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import ServerService from "../../services/ServerService";
import {
  ConfigurableServerFieldsType,
  ServersArrayType,
  ServerType,
} from "../../services/ServerService/types";
import { DataGridContainer } from "../../components/EditableDataGrid/DataGridContainer";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import { Toolbox } from "../../components/Toolbox";
import { FieldsType } from "../../components/AddModal/types";
import { ServersPage } from "./ServersPage";

export const ServersPageContainer: React.FC = () => {
  const [servers, setServers] = useState<ServersArrayType>();

  async function getServers(): Promise<void> {
    try {
      const data = await ServerService.getAllServers();
      setServers(data);
    } catch (error) {
      console.error(error);
      NotificationManager.error(error.message);
    }
  }

  async function addServer(fields: { [key: string]: string }): Promise<void> {
    try {
      const directories: string[] = [];
      let i = 1;
      while (fields[`directory${i}`]) {
        directories.push(fields[`directory${i}`]);
        i += 1;
      }
      const newFields = {
        name: fields.name,
        username: fields.username,
        hostname: fields.hostname,
        password: fields.password,
        poolKey: fields.poolKey,
        farmerKey: fields.farmerKey,
      };
      const data: ServerType = await ServerService.addServer({
        ...newFields,
        directories,
      });
      if (servers) {
        setServers({ ...servers, items: [...servers.items, data] });
      } else {
        setServers({ amount: 1, items: [data] });
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }

  async function deleteServer(id: string): Promise<void> {
    try {
      await ServerService.deleteServer(id);
      if (servers)
        setServers({
          ...servers,
          items: servers.items.filter((item) => item.id !== id),
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
      if (servers) {
        const idx = servers.items.map((server) => server.id).indexOf(id);
        const serversItems = [...servers.items];
        serversItems.splice(idx, 1, data);
        setServers({
          ...servers,
          items: serversItems,
        });
      }
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
      name: "directory1",
      id: "directory",
      label: "Directory",
      multiple: true,
    },
  ];

  useEffect(() => {
    getServers();
  }, []);

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
      field: "password",
      headerName: "Password",
      width: 200,
      editable: true,
    },
    {
      field: "poolKey",
      headerName: "Pool Key",
      width: 200,
      editable: true,
    },
    {
      field: "farmerKey",
      headerName: "Farmer Key",
      width: 200,
      editable: true,
    },
    {
      field: "initTaskId",
      headerName: "Task ID",
      width: 330,
    },
    {
      field: "created",
      headerName: "Created",
      width: 200,
      type: "date",
      renderCell: (params: GridCellParams) => {
        const value: any = params.value;
        const date = new Date(value);
        return <>{date.toLocaleString()}</>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
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

  return servers ? (
    <ServersPage
      ServersDataGrid={
        <DataGridContainer
          rows={servers.items}
          columns={columns}
          total={servers.amount}
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
  ) : null;
};
