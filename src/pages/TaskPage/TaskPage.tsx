import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ConsoleComponent } from "../../components/ConsoleComponent";
import WebsocketService from "../../services/WebsocketService";

export type DataSuccessType = {
  console: Array<{
    command: string;
    stdout: string;
    time: number;
  }>;
  info: string;
};

export type DataErrorType = {
  error: string;
  type: string;
};

export interface LogsType {
  clock: number;
  data: null | DataSuccessType | DataErrorType;
  state: "PENDING" | "UPDATE" | "SUCCESS";
  timestamp: number;
  uuid: string;
}

export const TaskPage: React.FC = () => {
  const [ws, setWs] = useState<WebSocket>();
  const [logs, setLogs] = useState<LogsType[]>([]);
  const params: any = useParams();

  useEffect((): void => {
    const ws = WebsocketService.websocketFactory(`/tasks/ws/`, {
      uuid: params.id,
    });
    setWs(ws);
  }, [params.id]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event: MessageEvent<any>) => {
        const data = JSON.parse(event.data);
        console.log(data);
        setLogs([...logs, data]);
      };
    }
  }, [ws, logs]);

  return (
    <div>
      <ConsoleComponent logs={logs} />
    </div>
  );
};
