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
    list: {
      display: "flex",
      justifyContent: "space-between",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    menuButton: {
      marginRight: 10,
    },
    header: {
      whiteSpace: "nowrap",
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
    },
  })
);
