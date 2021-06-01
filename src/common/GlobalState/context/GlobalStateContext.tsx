import React from "react";
import { AuthService } from "../../../services";
import { GlobalStateType } from "../types";

const initialValues = {
  isAuthenticated: AuthService.getJwtTokenFromStorage() ? true : false,
  hasLoaded: false,
  servers: [],
  plotsQueues: [],
  directories: [],
};

export const GlobalStateContext = React.createContext<
  [GlobalStateType, React.Dispatch<React.SetStateAction<GlobalStateType>>]
>([initialValues, () => initialValues]);
