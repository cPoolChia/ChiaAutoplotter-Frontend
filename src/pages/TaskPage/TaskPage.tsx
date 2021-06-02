import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useParams } from "react-router-dom";
import { ConsoleComponent } from "../../components/ConsoleComponent";
import WebsocketService from "../../services/WebsocketService";
import { LogsType } from "../../services/WebsocketService/types";

export const TaskPage: React.FC = () => {
  const [ws, setWs] = useState<WebSocket>();
  const [log, setLog] = useState<LogsType>();
  const params: any = useParams();

  useEffect((): void => {
    try {
      const ws = WebsocketService.websocketFactory(`/tasks/ws/`, {
        uuid: params.id,
      });
      setWs(ws);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [params.id]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event: MessageEvent<any>) => {
        const data = JSON.parse(event.data);
        setLog(data);
      };
    }
  }, [ws, log]);

  useEffect(() => {
    return () => ws?.close();
  }, [ws]);

  return log ? (
    <div>
      <ConsoleComponent log={log} />
    </div>
  ) : null;
};
