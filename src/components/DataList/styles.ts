import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    heading: {
      marginBottom: theme.spacing(2.35),
      fontSize: "2rem",
    },
    breadcrumbs: {
      marginTop: 10,
      marginBottom: 20,
    },
    link: {
      color: "black",
    },
    paper: {
      padding: theme.spacing(1.5),
      marginTop: theme.spacing(3),
    },
    avatar: {
      background: "rgb(54, 173, 88)",
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  })
);
