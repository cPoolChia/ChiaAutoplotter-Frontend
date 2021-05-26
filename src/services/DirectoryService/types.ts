import { UUID } from "../types";

type DirectoryStatusType = "pending" | "failed" | "approved";

export interface DirectoryType {
  id: UUID;
  location: string;
  serverId: UUID;
  created: Date;
  status: DirectoryStatusType;
  diskSize: number;
  diskTaken: number;
}

export interface DirectoryArrayType {
  amount: number;
  items: DirectoryType[];
}
