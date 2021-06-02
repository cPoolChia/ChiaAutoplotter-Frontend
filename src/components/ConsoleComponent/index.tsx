import { Container, Paper } from "@material-ui/core";
import React from "react";
import {
  DataSuccessType,
  LogsType,
  PlotQueuesLogsType,
} from "../../services/WebsocketService/types";
import { useStyles } from "./styles";

interface Props {
  log: LogsType | PlotQueuesLogsType;
}

function isPlotQueuesLogs(input: any): input is PlotQueuesLogsType {
  if (!input.data) {
    return true;
  } else {
    return false;
  }
}

function isDataSuccessType(input: any): input is DataSuccessType {
  if (input.console) {
    return true;
  } else {
    return false;
  }
}

function stdoutParser(input: string): string[] {
  return input.split("\n");
}

export const ConsoleComponent: React.FC<Props> = ({ log }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        {!isPlotQueuesLogs(log) ? (
          <div key={log.timestamp}>
            <p>
              {new Date(log.timestamp * 1000).toLocaleString() +
                " " +
                log.state}
            </p>
            <div>
              {log.data && isDataSuccessType(log.data) ? (
                log.data.console?.map((c, idx) => (
                  <div key={c.time + idx}>
                    <p className={classes.status}>
                      {new Date(c.time * 1000).toLocaleString()}
                    </p>
                    <p className={classes.input}>
                      {"> "}
                      {c.command}
                    </p>
                    <div>
                      {stdoutParser(c.stdout).map((command, idx) => (
                        <p className={classes.success} key={command + idx}>
                          {command}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : log.data && !isDataSuccessType(log.data) ? (
                <>
                  <p className={classes.error}>{log.data.error}</p>
                  <p className={classes.error}>{log.data.type}</p>
                </>
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <p>
              {log.error ? "ERROR: " + log.error : stdoutParser(log.output)}
            </p>
          </div>
        )}
      </Paper>
    </Container>
  );
};
