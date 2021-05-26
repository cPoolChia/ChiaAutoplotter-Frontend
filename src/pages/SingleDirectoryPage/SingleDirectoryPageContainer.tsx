import React, { useState, useEffect, useCallback } from "react";

import { NotificationManager } from "react-notifications";
import { useParams } from "react-router-dom";
import { SingleDirectoryPage } from "./SingleDirectoryPage";
import {
  PlotsArrayType,
  QueuesArrayType,
} from "../../services/PlotsService/types";
import { DirectoryType } from "../../services/DirectoryService/types";
import DirectoryService from "../../services/DirectoryService";

export const SingleDirectoryPageContainer: React.FC = () => {
  const [directoryData, setDirectoryData] = useState<DirectoryType>();
  const [plotsData, setPlotsData] = useState<PlotsArrayType>();
  const [queuesData, setQueuesData] = useState<QueuesArrayType>();

  const { id }: any = useParams();

  const getDirectoryData = useCallback(async (): Promise<void> => {
    try {
      const data = await DirectoryService.getDirectoryData(id);
      setDirectoryData(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const getDirectoryPlotsData = useCallback(async (): Promise<void> => {
    try {
      const data = await DirectoryService.getDirectoryPlots(id);
      setPlotsData(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const getDirectoryQueuesData = useCallback(async (): Promise<void> => {
    try {
      const data = await DirectoryService.getDirectoryQueues(id);
      setQueuesData(data);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [id]);

  const initialRequests = useCallback(
    () =>
      Promise.all([
        getDirectoryData(),
        getDirectoryPlotsData(),
        getDirectoryQueuesData(),
      ]),
    [getDirectoryData, getDirectoryPlotsData, getDirectoryQueuesData]
  );

  useEffect(() => {
    initialRequests();
  }, [initialRequests]);

  return directoryData && plotsData && queuesData ? (
    <SingleDirectoryPage
      directoryData={directoryData}
      plotsData={plotsData}
      queuesData={queuesData}
    />
  ) : null;
};
