import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
      padding: 3,
    },
    menuButton: {
      marginRight: 10,
    },
    drawer: {
      width: 240,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: 240,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);
