import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2.35),
      fontSize: "1.3rem",
      fontFamily: "'Cutive Mono', monospace",
    },
    paper: {
      padding: theme.spacing(1.5),
      marginTop: 20,
    },
    input: {
      color: theme.palette.primary.main,
    },
    status: {
      color: theme.palette.primary.dark,
    },
    error: {
      color: theme.palette.secondary.main,
    },
    success: {
      color: theme.palette.primary.main,
    },
  })
);
