import { UUID } from "../ServerService/types";

export interface QueuesArrayType {
  amount: number;
  items: QueueType[];
}

export interface ConfigurableQueueFieldsType {
  createDir?: string;
  plotDir?: string;
  poolKey?: string;
  farmerKey?: string;
  plotsAmount?: number;
}

export interface QueueType {
  id: UUID;
  plotTaskId: UUID;
  serverId: UUID;
  createDir: string;
  plotDir: string;
  poolKey: string;
  farmerKey: string;
  plotsAmount: number;
  created: Date;
}
