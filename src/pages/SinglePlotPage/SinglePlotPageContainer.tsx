import React, { useState, useEffect, useCallback } from "react";

import { NotificationManager } from "react-notifications";
import { useParams } from "react-router-dom";
import { SinglePlotPage } from "./SinglePlotPage";
import { QueueType } from "../../services/PlotsService/types";
import { PlotsArrayType } from "../../services/PlotsService/types";
import PlotsService from "../../services/PlotsService";
import WebsocketService from "../../services/WebsocketService";
import { LogsType } from "../../services/WebsocketService/types";

export const SinglePlotPageContainer: React.FC = () => {
  const [ws, setWs] = useState<WebSocket>();
  const [log, setLog] = useState<LogsType>();
  const [queueData, setQueueData] = useState<QueueType>();
  const [plotsData, setPlotsData] = useState<PlotsArrayType>();

  const { id }: any = useParams();

  const connectToWs = useCallback(() => {
    try {
      const websocket = WebsocketService.websocketFactory("/plot/queue/ws/", {
        uuid: id,
      });
      setWs(websocket);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

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

  const getQueueData = useCallback(async (): Promise<void> => {
    try {
      const data = await PlotsService.getPlotQueueData(id);
      setQueueData(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const getQueuePlotsData = useCallback(async (): Promise<void> => {
    try {
      const data = await PlotsService.getQueuePlotsData(id);
      setPlotsData(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const initialRequests = useCallback(
    () => Promise.all([getQueueData(), getQueuePlotsData()]),
    [getQueueData, getQueuePlotsData]
  );

  useEffect(() => {
    initialRequests();
    connectToWs();
  }, [initialRequests, connectToWs]);

  return queueData && plotsData ? (
    <SinglePlotPage log={log} queueData={queueData} plotsData={plotsData} />
  ) : null;
};
