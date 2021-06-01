import { DirectoryType } from "../../services/DirectoryService/types";
import { QueueType } from "../../services/PlotsService/types";
import { ServerType } from "../../services/ServerService/types";

export interface GlobalStateType {
  isAuthenticated: boolean;
  hasLoaded: boolean;
  servers: ServerType[];
  plotsQueues: QueueType[];
  directories: DirectoryType[];
}
