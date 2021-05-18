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

export const SingleServerPageContainer: React.FC = () => {
  const [serverData, setServerData] = useState<ServerType>();
  const [locatedPlots, setLocatedPlots] = useState<PlotsArrayType>();
  const [createdPlots, setCreatedPlots] = useState<PlotsArrayType>();

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
    getServerData();
    getLocatedPlots();
    getCreatedPlots();
  }, [id, getServerData, getLocatedPlots, getCreatedPlots]);

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
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "createdServerId",
      headerName: "Created Server ID",
      width: 320,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
      },
    },
    {
      field: "locatedServerId",
      headerName: "Located Server ID",
      width: 320,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/servers/${params.id}/`}>{params.value}</Link>;
      },
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
      field: "status",
      headerName: "Status",
      width: 120,
    },
  ];

  return serverData &&
    locatedPlots !== undefined &&
    createdPlots !== undefined ? (
    <SingleServerPage
      QueuesDataGrid={
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
