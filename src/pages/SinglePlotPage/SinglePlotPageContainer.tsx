import React, { useState, useEffect, useCallback } from "react";
import {
  GridCellParams,
  GridEditCellPropsParams,
} from "@material-ui/data-grid";
import { NotificationManager } from "react-notifications";
import ServerService from "../../services/ServerService";
import { DataGridContainer } from "../../components/EditableDataGrid/DataGridContainer";
import { Link, useParams } from "react-router-dom";
import { Toolbox } from "../../components/Toolbox";
import { FieldsType } from "../../components/AddModal/types";
import { SinglePlotPage } from "./SinglePlotPage";
import {
  ConfigurableQueueFieldsType,
  QueuesArrayType,
  QueueType,
} from "../../services/PlotsService/types";
import { PlotsArrayType } from "../../services/ServerService/types";
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
