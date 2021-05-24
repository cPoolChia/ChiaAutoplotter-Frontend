import { UUID } from "../types";

type ServerStatusType = "pending" | "failed" | "approved";

type PlotStatusType = "plotting" | "plotted" | "harvesting" | "transferred";

export interface ServerType {
  id: UUID;
  hostname: string;
  username: string;
  password: string;
  initTaskId: UUID;
  created: Date;
  status: ServerStatusType;
}

export interface PlotType {
  id: UUID;
  name: string;
  createdServerId: UUID;
  locatedServerId: UUID;
  created: Date;
  status: PlotStatusType;
}

export interface PlotsArrayType {
  amount: number;
  items: PlotType[];
}

export interface ServersArrayType {
  amount: number;
  items: ServerType[];
}

export interface ConfigurableServerFieldsType {
  hostname?: string;
  username?: string;
  password?: string;
}

export interface MsgReturnType {
  msg: string;
}
