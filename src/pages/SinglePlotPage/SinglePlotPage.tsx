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
import { DataGridComponent } from "../../components/DataGrid";
import { QueueType } from "../../services/PlotsService/types";
import { ConsoleComponent } from "../../components/ConsoleComponent";
import { LogsType } from "../../services/WebsocketService/types";
import { EditDataModal } from "../../components/EditDataModal";

const queueColumns = [
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
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "locatedDirectoryId",
    headerName: "Located Directory ID",
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
    width: 150,
  },
];

interface Props {
  queueData: QueueType;
  plotsData: PlotsArrayType;
  log: LogsType | undefined;
  setQueueData: React.Dispatch<React.SetStateAction<QueueType | undefined>>;
  onModalSubmit: (fields: any) => Promise<void>;
}

export const SinglePlotPage: React.FC<Props> = ({
  log,
  queueData,
  plotsData,
  setQueueData,
  onModalSubmit,
}) => {
  const [open, setOpen] = useState(false);

  const submitHandler = async (fields: any) => {
    await onModalSubmit(fields);
    setOpen(false);
  };

  const fields = [
    {
      id: "plotsAmount",
      name: "plotsAmount",
      label: "Plots Amount",
      defaultValue: queueData.plotsAmount,
    },
    {
      id: "tempDirId",
      name: "tempDirId",
      label: "Temp. Dir",
      defaultValue: queueData.tempDirId,
    },
    {
      id: "finalDirId",
      name: "finalDirId",
      label: "Final Dir",
      defaultValue: queueData.finalDirId,
    },
  ];

  return (
    <Container>
      <Breadcrumbs style={{ marginTop: 10, marginBottom: 20 }}>
        <Link style={{ color: "black", textDecoration: "none" }} to="/plots">
          Plots
        </Link>
        <Typography>{queueData.id}</Typography>
      </Breadcrumbs>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        Edit Data
      </Button>
      <EditDataModal
        submitHandler={submitHandler}
        open={open}
        fields={fields}
        setOpen={setOpen}
        title="Edit Plot Queue Data"
      />
      <DataList title="Queue Data" data={queueData} />
      <Paper
        style={{ marginTop: 50, marginBottom: 50, padding: 20, height: 600 }}
      >
        <DataGridComponent
          title="Created Plots"
          style={{ width: "100%", height: 500 }}
          rows={plotsData.items}
          columns={queueColumns}
          total={plotsData.amount}
        />
      </Paper>
      {log && (
        <Paper
          style={{
            marginTop: 50,
            marginBottom: 50,
            padding: 20,
            height: 600,
            overflow: "scroll",
          }}
        >
          <Typography variant="h4" align="center">
            Console
          </Typography>
          <ConsoleComponent log={log} />
        </Paper>
      )}
    </Container>
  );
};
