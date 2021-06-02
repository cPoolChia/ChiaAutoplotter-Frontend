import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AuthService,
  DirectoryService,
  PlotsService,
  ServerService,
} from "../../../services";
import { GlobalStateType } from "../types";
import { GlobalStateContext } from "../context/GlobalStateContext";
import WebsocketService from "../../../services/WebsocketService";

export interface Props {
  children?: ReactNode | ReactNode[] | BrowserRouter;
}

interface WebSocketData {
  table: "directory" | "server" | "plotqueue";
  type: "update" | "create" | "delete";
  obj: any;
}

const init = async () => {
  try {
    const [isAuthenticated, hasLoaded, servers, plotsQueues, directories] = [
      true,
      true,
      (await ServerService.getAllServers()).items,
      (await PlotsService.getAllPlotsQueue()).items,
      (await DirectoryService.getAllDirectories()).items,
    ];
    const result: GlobalStateType = {
      isAuthenticated,
      hasLoaded,
      servers,
      plotsQueues,
      directories,
    };
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GlobalStateProvider: FC<Props> = (props) => {
  const [ws, setWs] = useState<WebSocket>();
  const [globalState, setGlobalState] = useState<GlobalStateType>({
    isAuthenticated: AuthService.getJwtTokenFromStorage() ? true : false,
    hasLoaded: false,
    servers: [],
    plotsQueues: [],
    directories: [],
  });

  const updateStateToWsData = useCallback(
    (data: WebSocketData) => {
      switch (data.type) {
        case "update":
          switch (data.table) {
            case "directory":
              const dirIdx = globalState.directories
                .map((dir) => dir.id)
                .indexOf(data.obj.id);
              const directories = [...globalState.directories];
              directories.splice(dirIdx, 1, data.obj);
              setGlobalState({
                ...globalState,
                directories,
              });
              break;
            case "plotqueue":
              const queueIdx = globalState.plotsQueues
                .map((queue) => queue.id)
                .indexOf(data.obj.id);
              const queues = [...globalState.plotsQueues];
              queues.splice(queueIdx, 1, data.obj);
              setGlobalState({
                ...globalState,
                plotsQueues: queues,
              });
              break;
            case "server":
              const serverIdx = globalState.servers
                .map((server) => server.id)
                .indexOf(data.obj.id);
              const servers = [...globalState.servers];
              servers.splice(serverIdx, 1, data.obj);
              setGlobalState({
                ...globalState,
                servers,
              });
              break;
          }
          break;
        case "delete":
          switch (data.table) {
            case "directory":
              const directories = globalState.directories.filter(
                (dir) => dir.id !== data.obj.id
              );
              setGlobalState({
                ...globalState,
                directories,
              });
              break;
            case "plotqueue":
              const plotsQueues = globalState.plotsQueues.filter(
                (queue) => queue.id !== data.obj.id
              );
              setGlobalState({
                ...globalState,
                plotsQueues,
              });
              break;
            case "server":
              const servers = globalState.servers.filter(
                (server) => server.id !== data.obj.id
              );
              setGlobalState({
                ...globalState,
                servers,
              });
              break;
          }
          break;
        case "create":
          switch (data.table) {
            case "directory":
              setGlobalState({
                ...globalState,
                directories: [...globalState.directories, data.obj],
              });
              break;
            case "plotqueue":
              setGlobalState({
                ...globalState,
                plotsQueues: [...globalState.plotsQueues, data.obj],
              });
              break;
            case "server":
              setGlobalState({
                ...globalState,
                servers: [...globalState.servers, data.obj],
              });
              break;
          }
      }
    },
    [globalState]
  );

  const connectToWs = () => {
    const webSocket = WebsocketService.websocketFactory("/updates/ws/");
    setWs(webSocket);
  };

  const updateDataFromWs = useCallback(() => {
    ws?.addEventListener("message", function (event) {
      console.log(event.data);
      updateStateToWsData(event.data);
    });
  }, [ws, updateStateToWsData]);

  useEffect(() => {
    if (globalState.isAuthenticated) {
      init().then((value) => {
        console.log(value);
        setGlobalState(value);
      });
      connectToWs();
    }
  }, [globalState.isAuthenticated]);

  useEffect(() => {
    updateDataFromWs();
  }, [updateDataFromWs]);

  if (!globalState) return null;

  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
