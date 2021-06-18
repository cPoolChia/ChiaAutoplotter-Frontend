import React, { useState } from "react";
import {
  Breadcrumbs,
  Button,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DataList } from "../../components/DataList";
import { PlotsArrayType } from "../../services/PlotsService/types";
import { ServerType } from "../../services/ServerService/types";
import { DataGridComponent } from "../../components/DataGrid";
import { useStyles } from "./styles";
import {
  DirectoryArrayType,
  DirectoryType,
} from "../../services/DirectoryService/types";
import { EditDataModal } from "../../components/EditDataModal";
import { ServerService } from "../../services";
import { NotificationManager } from "react-notifications";
import { GlobalStateType } from "../../common/GlobalState/types";

interface Props {
  QueuesDataGrid: React.ReactChild;
  DirectoriesDataGrid: React.ReactChild;
  locatedPlots: PlotsArrayType;
  globalState: GlobalStateType;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
  id: any;
  directories: DirectoryType[];
}

export const SingleServerPage: React.FC<Props> = ({
  QueuesDataGrid,
  DirectoriesDataGrid,
  globalState,
  setGlobalState,
  locatedPlots,
  directories,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [thisServer, setThisServer] = useState(
    globalState.servers.find((server) => server.id === id)
  );

  const plotsColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params: GridCellParams) => {
        return <Link to={`/plots/${params.id}/`}>{params.value}</Link>;
      },
    },
    {
      field: "locatedDirectoryId",
      headerName: "Located Directory",
      width: 250,
      renderCell: (params: GridCellParams) => {
        return (
          <>{directories!.find((dir) => dir.id === params.value)?.location}</>
        );
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
      width: 120,
    },
  ];

  const fields = [
    {
      id: "name",
      label: "Name",
      name: "name",
      defaultValue: thisServer!.name,
    },
    {
      id: "hostname",
      label: "IP",
      name: "hostname",
      defaultValue: thisServer!.hostname,
    },
    {
      id: "username",
      label: "Username",
      name: "username",
      defaultValue: thisServer!.username,
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      defaultValue: thisServer!.password,
    },
    {
      id: "poolKey",
      label: "Pool Key",
      name: "poolKey",
      defaultValue: thisServer!.poolKey,
    },
    {
      id: "farmerKey",
      label: "Farmer Key",
      name: "farmerKey",
      defaultValue: thisServer!.farmerKey,
    },
  ];

  const onModalSubmit = async (fields: any) => {
    try {
      const result = await ServerService.updateServer(id, fields);
      setThisServer(result);
      setGlobalState({
        ...globalState,
        servers: [...globalState.servers, result], //TODO: rewrite this part
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      NotificationManager.error(error.message);
    }
  };

  return thisServer ? (
    <Container>
      <Breadcrumbs className={classes.breadcrumbs}>
        <Link className={classes.breadcrumbsLink} to="/servers">
          Servers
        </Link>
        <Typography>{thisServer.id}</Typography>
      </Breadcrumbs>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Edit Data
      </Button>
      <EditDataModal
        submitHandler={onModalSubmit}
        open={open}
        title="Edit Server Data"
        setOpen={setOpen}
        fields={fields}
      />
      <DataList title="Server Data" data={thisServer} />
      <Paper className={classes.paper}>
        <DataGridComponent
          title="Plots"
          style={{ width: "100%", height: 500 }}
          rows={locatedPlots.items}
          columns={plotsColumns}
          total={locatedPlots.amount}
        />
      </Paper>
      {QueuesDataGrid}
      {DirectoriesDataGrid}
    </Container>
  ) : null;
};
