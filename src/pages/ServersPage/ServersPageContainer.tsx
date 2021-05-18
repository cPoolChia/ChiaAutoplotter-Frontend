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

  async function addServer(
    fields: ConfigurableServerFieldsType
  ): Promise<void> {
    try {
      const data: ServerType = await ServerService.addServer(fields);
      if (servers) {
        setServers({ ...servers, items: [...servers?.items, data] });
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

  async function updateServer(id: string, fields: any) {
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
      label: "Hostname",
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
  ];

  useEffect(() => {
    getServers();
  }, []);

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 320,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/server/${params.id}/`}>{params.value}</Link>;
      },
    },
    {
      field: "hostname",
      headerName: "Hostname",
      width: 150,
      editable: true,
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
          addHandler={addServer}
          deleteHandler={deleteServer}
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
