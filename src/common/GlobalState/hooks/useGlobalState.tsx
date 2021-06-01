import { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext";

export const useGlobalState = () => useContext(GlobalStateContext);
