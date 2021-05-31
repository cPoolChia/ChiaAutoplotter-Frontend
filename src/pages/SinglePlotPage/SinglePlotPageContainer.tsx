import React, { useState, useEffect, useCallback } from "react";

import { NotificationManager } from "react-notifications";
import { useParams } from "react-router-dom";
import { SinglePlotPage } from "./SinglePlotPage";
import { QueueType } from "../../services/PlotsService/types";
import { PlotsArrayType } from "../../services/PlotsService/types";
import PlotsService from "../../services/PlotsService";

export const SinglePlotPageContainer: React.FC = () => {
  const [queueData, setQueueData] = useState<QueueType>();
  const [plotsData, setPlotsData] = useState<PlotsArrayType>();

  const { id }: any = useParams();

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
  }, [initialRequests]);

  return queueData && plotsData ? (
    <SinglePlotPage queueData={queueData} plotsData={plotsData} />
  ) : null;
};
