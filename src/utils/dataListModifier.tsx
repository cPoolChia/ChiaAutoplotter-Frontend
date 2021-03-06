import FingerprintIcon from "@material-ui/icons/Fingerprint";
import InfoIcon from "@material-ui/icons/Info";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import StorageIcon from "@material-ui/icons/Storage";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import TimerIcon from "@material-ui/icons/Timer";
import FolderIcon from "@material-ui/icons/Folder";
import SaveIcon from "@material-ui/icons/Save";
import PowerIcon from "@material-ui/icons/Power";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import { useGlobalState } from "../common/GlobalState/hooks/useGlobalState";
import { DirectoryType } from "../services/DirectoryService/types";

export const iconMap: { [key: string]: any } = {
  id: <FingerprintIcon />,
  hostname: <HomeIcon />,
  username: <PersonIcon />,
  password: <LockIcon />,
  initTaskId: <AssignmentLateIcon />,
  created: <ScheduleIcon />,
  status: <InfoIcon />,
  plotTaskId: <FileCopyIcon />,
  serverId: <StorageIcon />,
  createDir: <FolderSharedIcon />,
  plotDir: <FolderSpecialIcon />,
  poolKey: <VpnKeyIcon />,
  farmerKey: <VpnKeyIcon />,
  plotsAmount: <LinearScaleIcon />,
  autoplot: <AutorenewIcon />,
  plottingStarted: <TimerIcon />,
  tempDirId: <FolderIcon />,
  finalDirId: <FolderIcon />,
  diskSize: <SaveIcon />,
  diskTaken: <SaveIcon />,
  workerPort: <PowerIcon />,
};

export const dataKeyMap: { [key: string]: string } = {
  id: "ID",
  hostname: "Host Name",
  username: "User Name",
  password: "Password",
  initTaskId: "Init Task ID",
  created: "Created",
  status: "Status",
  plotTaskId: "Plot Task ID",
  serverId: "Server ID",
  createDir: "Create Dir.",
  plotDir: "Plot Dir.",
  poolKey: "Pool Key",
  farmerKey: "Farmer Key",
  plotsAmount: "Plots Amount",
  name: "Name",
  plottingStarted: "Plotting Started",
  autoplot: "Autoplot",
  tempDirId: "Temporary Dir.",
  finalDirId: "Final Dir.",
  location: "Location",
  diskSize: "Disk Size",
  diskTaken: "Taken Disk Size",
  workerPort: "Worker Port",
};

export function valueFormatter(
  key: string,
  value: any
): string | false | JSX.Element {
  switch (key) {
    case "created":
      return new Date(value).toLocaleString();
    case "initTaskId":
      return <Link to={`/tasks/${value}`}>{value}</Link>;
    case "plotTaskId":
      return <Link to={`/tasks/${value}`}>{value}</Link>;
    case "serverId":
      return <Link to={`/servers/${value}`}>{value}</Link>;
    case "poolKey":
      return (
        <>
          {value.slice(0, 8) + "..." + value.slice(-6)}
          <Button
            size="small"
            style={{ marginLeft: 5, width: 50 }}
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
          >
            <FileCopyIcon style={{ color: "#36AD58", fontSize: 16 }} />
          </Button>
        </>
      );
    case "farmerKey":
      return (
        <>
          {value.slice(0, 8) + "..." + value.slice(-6)}
          <Button
            size="small"
            style={{ marginLeft: 5, width: 50 }}
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
          >
            <FileCopyIcon style={{ color: "#36AD58", fontSize: 16 }} />
          </Button>
        </>
      );
    default:
      return false;
  }
}

export function getDirectoryLocationById(
  directories: DirectoryType[],
  id: string
): string | false {
  const result = directories.find((dir) => dir.id === id)?.location;
  if (result) {
    return result;
  } else {
    return false;
  }
}
