import { Container } from "@material-ui/core";
import React from "react";
import {
  LogsType,
  DataSuccessType,
  DataErrorType,
} from "../../pages/TaskPage/TaskPage";
import { useStyles } from "./styles";

interface Props {
  logs: LogsType[];
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

export const ConsoleComponent: React.FC<Props> = ({ logs }) => {
  const classes = useStyles();

  return (
    <Container>
      {logs.map((log, idx) => {
        return (
          <div key={log.timestamp + idx}>
            <p>
              {new Date(log.timestamp * 1000).toLocaleString() +
                " " +
                log.state}
            </p>
            <div>
              {log.data && isDataSuccessType(log.data) ? (
                log.data.console?.map((c, idx) => (
                  <div key={c.time + idx}>
                    <p>{new Date(c.time * 1000).toLocaleString()}</p>
                    <p>
                      {"> "}
                      {c.command}
                    </p>
                    <div>
                      {stdoutParser(c.stdout).map((command, idx) => (
                        <p key={command + idx}>{command}</p>
                      ))}
                    </div>
                  </div>
                ))
              ) : log.data && !isDataSuccessType(log.data) ? (
                <>
                  <p>{log.data.error}</p>
                  <p>{log.data.type}</p>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </Container>
  );
};
