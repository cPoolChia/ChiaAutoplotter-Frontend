import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { useHistory } from "react-router-dom";
import authService from "../../services/AuthService";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DnsIcon from "@material-ui/icons/Dns";
import DescriptionIcon from "@material-ui/icons/Description";
import { ReactComponent as CpoolLogo } from "../../assets/images/cpool-2.svg";
import { useStyles } from "./styles";
import { NotificationManager } from "react-notifications";
import { useGlobalState } from "../../common/GlobalState/hooks/useGlobalState";

interface ListItems {
  name: string;
  path: string;
  icon: any;
}

export const Header: React.VFC = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const classes = useStyles();
  const history = useHistory();

  const listItems: ListItems[] = [
    {
      name: "Servers",
      path: "/servers",
      icon: <DnsIcon style={{ color: "#36AD58" }} />,
    },
    {
      name: "Plots",
      path: "/plots",
      icon: <DescriptionIcon style={{ color: "#36AD58" }} />,
    },
  ];

  const handleIconClick = (idx: number) => {
    history.push(listItems[idx].path);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setGlobalState({
        ...globalState,
        isAuthenticated: false,
      });
      history.push("/login");
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <CpoolLogo width={120} />
        </div>
        <List className={classes.list}>
          {listItems.map((item, idx) => (
            <ListItem
              className={classes.listItem}
              button
              key={item.name}
              onClick={() => {
                handleIconClick(idx);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText style={{ flex: "initial" }} primary={item.name} />
            </ListItem>
          ))}
          <Divider />
          <ListItem
            className={classes.listItem}
            onClick={() => handleLogout()}
            button
            key={"Logout"}
          >
            <ListItemIcon>
              <ExitToAppIcon style={{ color: "#36AD58" }} />
            </ListItemIcon>
            <ListItemText style={{ flex: "initial" }} primary={"Logout"} />
          </ListItem>
        </List>
      </header>
    </div>
  );
};
