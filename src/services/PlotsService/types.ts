import { UUID } from "../ServerService/types";

export interface QueuesArrayType {
  amount: number;
  items: QueueType[];
}

export interface ConfigurableQueueFieldsType {
  create_dir?: string;
  plot_dir?: string;
  pool_key?: string;
  farmer_key?: string;
  plots_amount?: number;
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
