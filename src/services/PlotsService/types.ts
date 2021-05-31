import { UUID } from "../types";

type QueueStatusType = "pending" | "failed" | "approved";

type PlotStatusType = "plotting" | "plotted" | "harvesting" | "transferred";

export interface QueuesArrayType {
  amount: number;
  items: QueueType[];
}

export interface PlotsArrayType {
  amount: number;
  items: PlotType[];
}

export interface ConfigurableQueueFieldsType {
  plotsAmount?: number;
  tempDirId?: UUID;
  finalDirId?: UUID;
}

export interface QueueType {
  id: UUID;
  serverId: UUID;
  tempDirId: UUID;
  finalDirId: UUID;
  autoplot: boolean;
  plottingStarted: Date;
  plotsAmount: number;
  created: Date;
  status: QueueStatusType;
}

export interface PlotType {
  id: UUID;
  serverId: UUID;
  name: string;
  createdQueueId: UUID;
  locatedDirectoryId: UUID;
  created: Date;
  status: PlotStatusType;
}
