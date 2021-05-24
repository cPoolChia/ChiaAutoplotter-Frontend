import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    paper: {
      padding: theme.spacing(1.5),
      marginTop: theme.spacing(3),
      height: 600,
    },
    breadcrumbs: { marginTop: 10, marginBottom: 20 },
    breadcrumbsLink: { color: "black", textDecoration: "none" },
  };
});
