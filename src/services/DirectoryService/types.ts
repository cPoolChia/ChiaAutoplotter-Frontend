import { UUID } from "../types";

type DirectoryStatusType = "pending" | "failed" | "approved";

export interface DirectoryType {
  id: UUID;
  location: string;
  serverId: string;
  created: Date;
  status: DirectoryStatusType;
  diskSize: 0;
  diskTaken: 0;
}

export interface DirectoryArrayType {
  amount: number;
  items: DirectoryType[];
}
