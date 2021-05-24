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
  createDir?: string;
  plotDir?: string;
  poolKey?: string;
  farmerKey?: string;
  plotsAmount?: number;
  serverId?: string;
}

export interface QueueType {
  id: UUID;
  plotTaskId: UUID;
  serverId: UUID;
  tempDirId: UUID;
  finalDirId: UUID;
  plotsAmount: number;
  created: Date;
  status: QueueStatusType;
}

export interface PlotType {
  id: UUID;
  name: string;
  location: string;
  createdQueueId: UUID;
  locatedDirectoryId: UUID;
  created: Date;
  status: PlotStatusType;
}
