import { FC, ReactNode, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AuthService,
  DirectoryService,
  PlotsService,
  ServerService,
} from "../../../services";
import { GlobalStateType } from "../types";
import { GlobalStateContext } from "../context/GlobalStateContext";

export interface Props {
  children?: ReactNode | ReactNode[] | BrowserRouter;
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
  const [globalState, setGlobalState] = useState<GlobalStateType>({
    isAuthenticated: AuthService.getJwtTokenFromStorage() ? true : false,
    hasLoaded: false,
    servers: [],
    plotsQueues: [],
    directories: [],
  });

  useEffect(() => {
    if (globalState.isAuthenticated) {
      init().then((value) => {
        console.log(value);
        setGlobalState(value);
      });
    }
  }, [globalState.isAuthenticated]);

  if (!globalState) return null;

  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
