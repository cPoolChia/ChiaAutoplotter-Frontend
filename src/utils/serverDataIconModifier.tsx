import FingerprintIcon from "@material-ui/icons/Fingerprint";
import InfoIcon from "@material-ui/icons/Info";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";

export const iconMap: { [key: string]: any } = {
  id: <FingerprintIcon />,
  hostname: <HomeIcon />,
  username: <PersonIcon />,
  password: <LockIcon />,
  initTaskId: <AssignmentLateIcon />,
  created: <ScheduleIcon />,
  status: <InfoIcon />,
};
