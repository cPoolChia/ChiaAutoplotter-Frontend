import { UUID } from "../types";

type ServerStatusType = "pending" | "failed" | "approved";

export interface ServerType {
  id: UUID;
  name: string;
  hostname: string;
  username: string;
  password: string;
  poolKey: string;
  farmerKey: string;
  created: Date;
  status: ServerStatusType;
}

export interface ServersArrayType {
  amount: number;
  items: ServerType[];
}

export interface ConfigurableServerFieldsType {
  name?: string;
  hostname?: string;
  username?: string;
  password?: string;
  poolKey?: string;
  farmerKey?: string;
}
export interface AddServerFieldsType extends ConfigurableServerFieldsType {
  directories?: string[];
}

export interface MsgReturnType {
  msg: string;
}
